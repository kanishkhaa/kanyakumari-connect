import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, Clock, MapPin, Ticket, Sun, Lightbulb, ExternalLink, Bus } from "lucide-react";
import { places as fallbackPlaces } from "@/data/places";
import { useCollection } from "@/hooks/useCollection";
import { Button } from "@/components/ui/button";

const VIRTUAL_TOUR_URL = "https://pixtronicsite.s3.ap-south-1.amazonaws.com/Kanchipuram%20E/English%20NEW%20EXE%2013%2011%202025/Kanyakumari%20E/Web/index.htm";

export default function PlaceDetail() {
  const { id } = useParams();
  const { data: places } = useCollection("places", fallbackPlaces);
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
  const mapQuery = place.mapQuery ?? `${place.name}, Kanyakumari, Tamil Nadu`;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  const virtualTourUrl = place.virtualTourScene
    ? `${VIRTUAL_TOUR_URL}#media=${encodeURIComponent(place.virtualTourScene)}`
    : undefined;

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
            <p className="text-justify text-muted-foreground leading-relaxed text-[17px]">{place.description}</p>
          </section>

          {virtualTourUrl && (
            <section>
              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold">360° virtual tour</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Explore {place.name} without leaving this page.</p>
                </div>
                <a
                  href={virtualTourUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Open full screen <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border bg-muted shadow-soft">
                <iframe
                  title={`360 degree virtual tour of ${place.name}`}
                  src={virtualTourUrl}
                  className="h-[480px] w-full border-0"
                  loading="lazy"
                  allow="fullscreen; gyroscope; accelerometer"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Location map</h2>
            <div className="overflow-hidden rounded-2xl border border-border bg-muted shadow-soft">
              <iframe
                title={`Location map for ${place.name}`}
                src={mapEmbedUrl}
                className="h-[360px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Open {place.name} in Google Maps <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </section>

          {place.busDetails?.length ? (
            <section>
              <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold flex items-center gap-2"><Bus className="h-6 w-6 text-primary" /> Bus details</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Official routes serving this destination.</p>
                </div>
                <a href="https://kanniyakumari.nic.in/ts/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  Source: Kanniyakumari District <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr><th className="px-4 py-3 font-semibold">Bus terminal</th><th className="px-4 py-3 font-semibold">Route no.</th><th className="px-4 py-3 font-semibold">Via</th></tr>
                  </thead>
                  <tbody>
                    {place.busDetails.map((bus) => (
                      <tr key={`${bus.terminal}-${bus.routes}`} className="border-t border-border">
                        <td className="px-4 py-3 font-medium">{bus.terminal}</td>
                        <td className="px-4 py-3 text-primary">{bus.routes}</td>
                        <td className="px-4 py-3 text-muted-foreground">{bus.via}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

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

          <section>
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
            {place.ferryBookingUrl && (
              <Button asChild className="w-full mt-3" variant="outline">
                <a href={place.ferryBookingUrl} target="_blank" rel="noreferrer">
                  Book ferry ride <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}
