import { useEffect, useState } from "react";
import { dishes, events, emergencyContacts, restaurants } from "@/data/food";
import type { Restaurant } from "@/data/food";
import { Calendar, MapPin, Phone, Navigation, UtensilsCrossed, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

type NearbyRestaurant = Restaurant & {
  distance?: number;
  osm?: boolean;
};

export default function FoodEvents() {
  const [nearby, setNearby] = useState<NearbyRestaurant[]>(restaurants);
  const [status, setStatus] = useState("Use your location to suggest nearby restaurants and food hotels.");

  const detectRestaurants = () => {
    if (!navigator.geolocation) {
      setStatus("Location is not supported in this browser. Showing Kanyakumari favourites.");
      return;
    }

    setStatus("Requesting your location...");
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        setStatus("Searching OpenStreetMap for nearby restaurants...");
        try {
          const query = `
            [out:json][timeout:25];
            (
              node["amenity"~"restaurant|cafe|fast_food"](around:7000,${coords.latitude},${coords.longitude});
              way["amenity"~"restaurant|cafe|fast_food"](around:7000,${coords.latitude},${coords.longitude});
            );
            out center tags 24;
          `;
          const res = await fetch("https://overpass-api.de/api/interpreter", { method: "POST", body: query });
          const json = await res.json();
          const items = (json.elements || [])
            .map((item: any): NearbyRestaurant => {
              const lat = item.lat ?? item.center?.lat;
              const lon = item.lon ?? item.center?.lon;
              return {
                id: `osm-${item.id}`,
                name: item.tags?.name || "Local food hotel",
                type: item.tags?.cuisine?.toLowerCase().includes("vegetarian") ? "Veg" : "Multi-cuisine",
                location: [item.tags?.["addr:street"], item.tags?.["addr:city"]].filter(Boolean).join(", "),
                lat,
                lon,
                phone: item.tags?.phone || item.tags?.["contact:phone"],
                rating: 4.1,
                description: item.tags?.cuisine ? `Cuisine: ${item.tags.cuisine}.` : "",
                distance: getDistance(coords.latitude, coords.longitude, lat, lon),
                osm: true,
              };
            })
            .filter((item: NearbyRestaurant) => item.lat && item.lon)
            .sort((a: NearbyRestaurant, b: NearbyRestaurant) => (a.distance || 0) - (b.distance || 0));
          setNearby(items.length ? items : restaurants);
          setStatus(items.length ? "Showing nearby restaurants from OpenStreetMap." : "No nearby OpenStreetMap restaurants found. Showing Kanyakumari favourites.");
        } catch {
          setNearby(restaurants);
          setStatus("Restaurant lookup failed. Showing Kanyakumari favourites.");
        }
      },
      () => {
        setNearby(restaurants);
        setStatus("Location permission was not granted. Showing Kanyakumari favourites.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  useEffect(() => {
    detectRestaurants();
  }, []);

  return (
    <div className="container mx-auto py-12 space-y-20">
      <section>
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Food discovery</p>
          <h1 className="mt-2 font-display text-5xl font-bold">Must-try dishes</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Authentic Kanyakumari cuisine with suggested nearby restaurants and food hotels based on your location.
          </p>
        </header>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {dishes.map((d) => (
            <article key={d.id} className="rounded-2xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-smooth group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-smooth duration-700" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${d.type === "Veg" ? "text-secondary" : "text-primary"}`}>{d.type}</span>
                  <span className="text-xs font-medium text-muted-foreground">{d.priceRange}</span>
                </div>
                <h3 className="mt-1 font-display text-xl font-semibold">{d.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{d.description}</p>
                <p className="text-xs text-muted-foreground mt-3"><span className="font-semibold text-foreground">Where:</span> {d.whereToTry}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <header className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Nearby food hotels</p>
            <h2 className="mt-2 font-display text-4xl font-bold">Restaurants suggested for your location</h2>
            <p className="mt-2 text-muted-foreground">{status}</p>
          </header>
          <Button variant="hero" onClick={detectRestaurants}><Navigation className="h-4 w-4" /> Refresh location</Button>
        </div>

        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {nearby.slice(0, 9).map((r) => (
            <article key={r.id} className="rounded-xl border border-border p-5">
              <div className="flex items-start gap-3">
                <span className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <UtensilsCrossed className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{r.type}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" /> {r.rating}</p>
                  </div>
                  <h3 className="mt-1 font-display text-xl font-semibold">{r.name}</h3>
                  {r.location && <p className="mt-1 text-sm text-muted-foreground">{r.location}</p>}
                  {r.description && <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>}
                  {r.distance && <p className="mt-2 text-xs text-muted-foreground">{r.distance.toFixed(1)} km away</p>}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {r.phone && <a className="rounded-full bg-primary/10 px-3 py-1.5 text-sm text-primary" href={`tel:${r.phone.replace(/[^0-9]/g, "")}`}>Call</a>}
                    <a className="rounded-full bg-muted px-3 py-1.5 text-sm" target="_blank" rel="noreferrer" href={`https://www.openstreetmap.org/?mlat=${r.lat}&mlon=${r.lon}#map=17/${r.lat}/${r.lon}`}>Map</a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Festivals & events</p>
          <h2 className="mt-2 font-display text-4xl font-bold">Plan around the calendar</h2>
        </header>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {events.map((e) => (
            <article key={e.id} className="overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/40 transition-smooth group">
              <div className="grid sm:grid-cols-[180px_1fr]">
                <img src={e.image} alt={e.name} loading="lazy" className="h-full min-h-[180px] w-full object-cover transition-smooth duration-700 group-hover:scale-105" />
                <div className="p-6">
                  <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl gradient-sunset">
                    <Calendar className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <h3 className="font-display text-xl font-semibold">{e.name}</h3>
                  <p className="text-xs text-primary font-medium mt-0.5">{e.month}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {e.location}</p>
                  <p className="text-sm text-muted-foreground mt-3">{e.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl gradient-warm p-8 md:p-12 border border-border">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Stay safe</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Emergency contacts</h2>
          <p className="mt-2 text-muted-foreground">Keep these handy. Save offline before you travel.</p>
        </header>
        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {emergencyContacts.map((c) => (
            <li key={c.name} className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border">
              <span className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="h-4 w-4 text-primary" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{c.name}</p>
                <p className="font-semibold">{c.number}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const r = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
