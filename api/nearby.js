const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.openstreetmap.ru/api/interpreter",
];

const configs = {
  food: {
    query: (lat, lon) => `
      [out:json][timeout:18];
      (
        node["amenity"~"restaurant|cafe|fast_food"](around:7000,${lat},${lon});
        way["amenity"~"restaurant|cafe|fast_food"](around:7000,${lat},${lon});
      );
      out center tags 24;
    `,
  },
  emergency: {
    query: (lat, lon) => `
      [out:json][timeout:18];
      (
        node["amenity"="hospital"](around:10000,${lat},${lon});
        way["amenity"="hospital"](around:10000,${lat},${lon});
        node["amenity"="police"](around:10000,${lat},${lon});
        way["amenity"="police"](around:10000,${lat},${lon});
      );
      out center tags 24;
    `,
  },
};

function distanceKm(lat1, lon1, lat2, lon2) {
  const r = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function normalize(item, lat, lon, type) {
  const itemLat = item.lat ?? item.center?.lat;
  const itemLon = item.lon ?? item.center?.lon;
  if (!itemLat || !itemLon) return null;

  const tags = item.tags || {};
  return {
    id: `${type}-${item.type}-${item.id}`,
    name: tags.name || "",
    amenity: tags.amenity || "",
    cuisine: tags.cuisine || "",
    phone: tags.phone || tags["contact:phone"] || "",
    address: [tags["addr:housenumber"], tags["addr:street"], tags["addr:city"]].filter(Boolean).join(", "),
    lat: itemLat,
    lon: itemLon,
    distance: distanceKm(lat, lon, itemLat, itemLon),
  };
}

async function fetchWithTimeout(url, options, timeoutMs = 12000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);
  const type = String(req.query.type || "");
  const config = configs[type];

  if (!Number.isFinite(lat) || !Number.isFinite(lon) || !config) {
    res.status(400).json({ error: "Expected lat, lon and type=food|emergency" });
    return;
  }

  const body = config.query(lat, lon);
  let lastError = "Nearby lookup failed";

  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const upstream = await fetchWithTimeout(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
          "User-Agent": "kaniya-kanyakumari-connect/1.0",
        },
        body,
      });

      if (!upstream.ok) {
        lastError = `Overpass returned ${upstream.status}`;
        continue;
      }

      const json = await upstream.json();
      const items = (json.elements || [])
        .map((item) => normalize(item, lat, lon, type))
        .filter(Boolean)
        .filter((item) => item.name)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 24);

      res.status(200).json({ items });
      return;
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Nearby lookup failed";
    }
  }

  res.status(502).json({ error: lastError });
}
