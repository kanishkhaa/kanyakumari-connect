import { experiences } from "@/data/experiences";
import { Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Experiences() {
  return (
    <div className="container mx-auto py-12">
      <header className="max-w-none">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Local experiences</p>
        <h1 className="mt-2 font-display text-5xl font-bold">Live like a local</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Hosted by people from Kanyakumari's villages and tribal communities. Every booking puts revenue directly in their hands.
        </p>
      </header>

      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((e) => (
          <article key={e.id} className="rounded-2xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-smooth group flex flex-col">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-smooth duration-700" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{e.category}</span>
              <h3 className="mt-1 font-display text-lg font-semibold">{e.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">Hosted by {e.host}</p>
              <p className="text-sm text-muted-foreground mt-3 flex-1">{e.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {e.duration}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {e.groupSize}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-display text-xl font-bold">₹{e.price.toLocaleString()}<span className="text-xs font-normal text-muted-foreground"> /person</span></p>
                <Button asChild variant="hero" size="sm"><Link to={`/experiences/${e.id}`}>View now</Link></Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
