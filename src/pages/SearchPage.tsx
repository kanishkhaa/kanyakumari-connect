import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, MapPin, Coffee, Home, ShoppingBag, Heart } from "lucide-react";
import { places } from "@/data/places";
import { dishes } from "@/data/food";
import { stays } from "@/data/stays";
import { products } from "@/data/marketplace";
import { experiences } from "@/data/experiences";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase().trim();

  const matches = (s: string) => s.toLowerCase().includes(q);

  const placeR = q ? places.filter((p) => matches(p.name) || matches(p.tagline) || matches(p.description) || matches(p.category)) : [];
  const dishR = q ? dishes.filter((d) => matches(d.name) || matches(d.description)) : [];
  const stayR = q ? stays.filter((s) => matches(s.name) || matches(s.location) || matches(s.type)) : [];
  const prodR = q ? products.filter((p) => matches(p.name) || matches(p.category)) : [];
  const expR = q ? experiences.filter((e) => matches(e.title) || matches(e.category) || matches(e.description)) : [];

  const total = placeR.length + dishR.length + stayR.length + prodR.length + expR.length;

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Search</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold flex items-center gap-3">
          <SearchIcon className="h-8 w-8 text-primary" /> "{q}"
        </h1>
        <p className="mt-3 text-muted-foreground">{total} results across places, food, stays, experiences and marketplace.</p>
      </header>

      <div className="mt-12 space-y-12">
        <Group icon={MapPin} label="Places" results={placeR.map((p) => ({ to: `/places/${p.id}`, title: p.name, sub: p.category, img: p.image }))} />
        <Group icon={Coffee} label="Food" results={dishR.map((d) => ({ to: "/food", title: d.name, sub: d.type, img: d.image }))} />
        <Group icon={Home} label="Stays" results={stayR.map((s) => ({ to: "/stays", title: s.name, sub: s.location, img: s.image }))} />
        <Group icon={Heart} label="Experiences" results={expR.map((e) => ({ to: "/experiences", title: e.title, sub: e.host, img: e.image }))} />
        <Group icon={ShoppingBag} label="Things to buy" results={prodR.map((p) => ({ to: "/things-to-buy", title: p.name, sub: p.category, img: p.image }))} />

        {total === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No results. Try "vivekananda", "fish curry", "homestay" or "weather".</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Group({
  icon: Icon, label, results,
}: { icon: typeof MapPin; label: string; results: { to: string; title: string; sub: string; img: string }[] }) {
  if (results.length === 0) return null;
  return (
    <section>
      <h2 className="font-display text-2xl font-bold mb-5 flex items-center gap-2"><Icon className="h-5 w-5 text-primary" /> {label} <span className="text-sm font-normal text-muted-foreground">({results.length})</span></h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((r) => (
          <Link key={r.to + r.title} to={r.to} className="group flex gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-soft transition-smooth">
            <img src={r.img} alt={r.title} loading="lazy" className="h-16 w-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-smooth">{r.title}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{r.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
