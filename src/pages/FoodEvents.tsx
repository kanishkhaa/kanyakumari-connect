import { useEffect, useState } from "react";
import { dishes, emergencyContacts, restaurants } from "@/data/food";
import type { Restaurant } from "@/data/food";
import { Phone, Navigation, UtensilsCrossed, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";

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
        setStatus("Searching nearby restaurants...");
        try {
          const res = await fetchWithTimeout(`/api/nearby?type=food&lat=${coords.latitude}&lon=${coords.longitude}`);
          if (!res.ok) throw new Error("Nearby lookup failed");
          const json = await res.json();
          const items = (json.items || [])
            .map((item: any): NearbyRestaurant => {
              return {
                id: item.id,
                name: item.name,
                type: item.cuisine?.toLowerCase().includes("vegetarian") ? "Veg" : "Multi-cuisine",
                location: item.address || "",
                lat: item.lat,
                lon: item.lon,
                phone: item.phone,
                rating: 4.1,
                description: item.cuisine ? `Cuisine: ${item.cuisine}.` : "",
                distance: item.distance,
                osm: true,
              };
            })
            .filter((item: NearbyRestaurant) => item.name && item.lat && item.lon)
            .sort((a: NearbyRestaurant, b: NearbyRestaurant) => (a.distance || 0) - (b.distance || 0));
          setNearby(items.length ? items : restaurants);
          setStatus(items.length ? "Showing nearby restaurants." : "No nearby restaurants found. Showing Kanyakumari favourites.");
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
