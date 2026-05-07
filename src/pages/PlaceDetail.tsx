import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, Clock, MapPin, Ticket, Sun, Bus, Lightbulb, ExternalLink } from "lucide-react";
import { places } from "@/data/places";
import { Button } from "@/components/ui/button";

export default function PlaceDetail() {
  const { id } = useParams();
  const place = places.find((p) => p.id === id);

  if (!place) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="font-display text-3xl">Place not found</h1>
        <Button asChild variant="ghost" className="mt-4"><Link to="/places">Back to places</Link></Button>
      </div>
    );
  }

  const facts = [
    { icon: Ticket, label: "Ticket", value: place.ticket },
    { icon: Clock, label: "Timings", value: place.timings },
    { icon: Sun, label: "Best time", value: place.bestTime },
    { icon: MapPin, label: "Location", value: place.distance },
  ];
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, Kanyakumari, Tamil Nadu`)}`;

  return (
    <article>
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 container mx-auto flex flex-col justify-end pb-10">
          <Button asChild variant="ghost" size="sm" className="self-start mb-4 bg-background/80 backdrop-blur">
            <Link to="/places"><ArrowLeft className="h-4 w-4" /> All places</Link>
          </Button>
          <span className="inline-flex w-fit items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
            {place.category} • <Star className="h-3 w-3 fill-current" /> {place.rating}
          </span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold max-w-3xl">{place.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl">{place.tagline}</p>
        </div>
      </div>

      <div className="container mx-auto py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="font-display text-2xl font-semibold mb-3">About</h2>
            <p className="text-muted-foreground leading-relaxed text-[17px]">{place.description}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Highlights</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {place.highlights.map((h) => (
                <li key={h} className="flex gap-3 p-4 rounded-xl bg-muted/50">
                  <span className="h-6 w-6 rounded-full gradient-sunset flex-shrink-0" />
                  <span className="text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-border">
              <div className="flex items-center gap-2 mb-3 text-secondary"><Bus className="h-5 w-5" /><h3 className="font-semibold">How to reach</h3></div>
              <p className="text-sm text-muted-foreground">{place.howToReach}</p>
              <p className="text-sm mt-3"><span className="font-medium">Nearby bus:</span> {place.nearbyBus}</p>
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <MapPin className="h-4 w-4" /> View on Google Maps <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="p-6 rounded-2xl border border-border">
              <div className="flex items-center gap-2 mb-3 text-primary"><Lightbulb className="h-5 w-5" /><h3 className="font-semibold">Local tips</h3></div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {place.tips.map((t) => <li key={t}>• {t}</li>)}
              </ul>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="p-6 rounded-2xl gradient-warm border border-border sticky top-20">
            <h3 className="font-display text-lg font-semibold mb-4">Quick facts</h3>
            <ul className="space-y-4">
              {facts.map((f) => (
                <li key={f.label} className="flex gap-3">
                  <span className="h-9 w-9 rounded-lg bg-background flex items-center justify-center shadow-soft">
                    <f.icon className="h-4 w-4 text-primary" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">{f.label}</p>
                    <p className="text-sm font-medium">{f.value}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button asChild variant="hero" className="w-full mt-6">
              <Link to="/itinerary">Add to itinerary</Link>
            </Button>
          </div>
        </aside>
      </div>
    </article>
  );
}
