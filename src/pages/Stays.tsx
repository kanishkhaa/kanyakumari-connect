import { stays } from "@/data/stays";
import { Star, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Stays() {
  return (
    <div className="container mx-auto py-12">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Where to stay</p>
        <h1 className="mt-2 font-display text-5xl font-bold">Verified stays</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Only approved homestays, eco-lodges, hotels and tribal stays — with real photos and transparent pricing.
        </p>
      </header>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {stays.map((s) => (
          <article key={s.id} className="rounded-2xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-smooth group">
            <div className="grid sm:grid-cols-[40%_1fr]">
              <div className="aspect-[4/3] sm:aspect-auto overflow-hidden">
                <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700" />
              </div>
              <div className="p-5 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">{s.type}</span>
                  {s.verified && <span className="inline-flex items-center gap-1 text-secondary"><ShieldCheck className="h-3 w-3" /> Verified</span>}
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold">{s.name}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {s.location}</p>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{s.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="text-[11px] px-2 py-0.5 rounded-full bg-muted">{a}</span>
                  ))}
                </div>
                <div className="mt-auto pt-4 flex items-end justify-between">
                  <div>
                    <p className="font-display text-2xl font-bold">₹{s.pricePerNight.toLocaleString()}<span className="text-xs font-normal text-muted-foreground"> /night</span></p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Star className="h-3 w-3 fill-accent text-accent" /> {s.rating} • {s.reviews} reviews</p>
                  </div>
                  <Button variant="hero" size="sm">Book</Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
