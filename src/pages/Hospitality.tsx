import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nContext";
import { Bed, UtensilsCrossed, Bus, ShieldCheck, Headphones, Hospital, Siren, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";

type NearbyPlace = {
  id: number;
  name: string;
  type: "Hospital" | "Police";
  phone?: string;
  address?: string;
  lat: number;
  lon: number;
  distance?: number;
};

const services = [
  { icon: Bed, title: "Where to Stay", desc: "Verified homestays, eco lodges, hotels and tribal stays with transparent pricing.", link: "/stays", cta: "Find a stay" },
  { icon: Bus, title: "Find a Tour Operator", desc: "Licensed local operators for district circuits and South India journeys.", link: "/operators", cta: "Browse operators" },
  { icon: UtensilsCrossed, title: "Restaurants & Food Trails", desc: "Hygiene-certified restaurants and curated banana-leaf experiences.", link: "/food", cta: "See food guide" },
  { icon: ShieldCheck, title: "Safe Tourism (TravelCare)", desc: "Verified properties, hygiene protocols, advisories and helplines.", link: "/travelcare", cta: "Read TravelCare" },
  { icon: Headphones, title: "DTPC Information Centres", desc: "Government-run info centres across the district, guides and tickets.", link: "/dtpc", cta: "Find a centre" },
];

const fallbackNearby: NearbyPlace[] = [
  { id: 1, name: "Government Medical College Hospital, Asaripallam", type: "Hospital", phone: "04652 223201", address: "Asaripallam, Nagercoil", lat: 8.194, lon: 77.421 },
  { id: 2, name: "Government Hospital, Kanyakumari", type: "Hospital", phone: "108", address: "Kanyakumari town", lat: 8.088, lon: 77.546 },
  { id: 3, name: "Kanyakumari Police Station", type: "Police", phone: "100", address: "Kanyakumari town", lat: 8.087, lon: 77.548 },
  { id: 4, name: "Nagercoil Police Station", type: "Police", phone: "100", address: "Nagercoil", lat: 8.183, lon: 77.411 },
];

export default function Hospitality() {
  const { t } = useI18n();
  const [nearby, setNearby] = useState<NearbyPlace[]>(fallbackNearby);
  const [status, setStatus] = useState("Use location to find nearby hospitals and police stations.");

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Location is not supported in this browser. Showing Kanyakumari defaults.");
      return;
    }

    setStatus("Requesting your location...");
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        setStatus("Searching nearby emergency services...");
        try {
          const res = await fetchWithTimeout(`/api/nearby?type=emergency&lat=${coords.latitude}&lon=${coords.longitude}`);
          if (!res.ok) throw new Error("Nearby lookup failed");
          const json = await res.json();
          const items = (json.items || []).map((item: any) => ({
            id: item.id,
            name: item.name,
            type: item.amenity === "police" ? "Police" : "Hospital",
            phone: item.phone,
            address: item.address || "",
            lat: item.lat,
            lon: item.lon,
            distance: item.distance,
          })).filter((item: NearbyPlace) => item.name && item.lat && item.lon);
          setNearby(items.length ? items.sort((a: NearbyPlace, b: NearbyPlace) => (a.distance || 0) - (b.distance || 0)) : fallbackNearby);
          setStatus(items.length ? "Showing nearby emergency services." : "No nearby emergency services found. Showing Kanyakumari defaults.");
        } catch {
          setNearby(fallbackNearby);
          setStatus("Emergency lookup failed. Showing Kanyakumari defaults.");
        }
      },
      () => setStatus("Location permission was not granted. Showing Kanyakumari defaults."),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Hospitality</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("hospitality_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("hospitality_intro")}</p>
      </header>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s) => (
          <Link key={s.title} to={s.link} className="group p-6 rounded-2xl border border-border bg-card hover:shadow-elevated hover:border-primary/40 transition-smooth">
            <span className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <s.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
            <p className="mt-4 text-sm font-medium text-primary group-hover:translate-x-1 transition-smooth">{s.cta} &gt;</p>
          </Link>
        ))}
      </div>

      <section className="mt-12 rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Nearby help</p>
            <h2 className="mt-1 font-display text-3xl font-bold">Hospitals and police stations near you</h2>
            <p className="mt-2 text-sm text-muted-foreground">{status}</p>
          </div>
          <Button variant="hero" onClick={detectLocation}><Navigation className="h-4 w-4" /> Refresh location</Button>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {nearby.map((place) => (
            <article key={`${place.type}-${place.id}`} className="rounded-xl border border-border p-4">
              <div className="flex items-start gap-3">
                <span className={`h-10 w-10 rounded-lg flex items-center justify-center ${place.type === "Hospital" ? "bg-secondary/10 text-secondary" : "bg-destructive/10 text-destructive"}`}>
                  {place.type === "Hospital" ? <Hospital className="h-5 w-5" /> : <Siren className="h-5 w-5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{place.type}</p>
                  <h3 className="font-display text-xl font-semibold">{place.name}</h3>
                  {place.address && <p className="mt-1 text-sm text-muted-foreground">{place.address}</p>}
                  {place.distance && <p className="mt-1 text-xs text-muted-foreground">{place.distance.toFixed(1)} km away</p>}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {place.phone && <a className="rounded-full bg-primary/10 px-3 py-1.5 text-sm text-primary" href={`tel:${place.phone.replace(/[^0-9]/g, "")}`}>Call {place.phone}</a>}
                    <a className="rounded-full bg-muted px-3 py-1.5 text-sm" target="_blank" rel="noreferrer" href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}#map=17/${place.lat}/${place.lon}`}>Map</a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
