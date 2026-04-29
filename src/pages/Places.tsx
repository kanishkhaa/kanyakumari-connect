import { useMemo, useState } from "react";
import { places } from "@/data/places";
import PlaceCard from "@/components/PlaceCard";
import { Search } from "lucide-react";

const categories = ["All", "Spiritual", "Heritage", "Nature", "Beach"] as const;

export default function Places() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    return places.filter((p) => {
      const matchCat = cat === "All" || p.category === cat;
      const matchQ = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.tagline.toLowerCase().includes(q.toLowerCase());
      return matchCat && matchQ;
    });
  }, [q, cat]);

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Explore</p>
        <h1 className="mt-2 font-display text-5xl font-bold">Places to visit</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Verified attractions across Kanyakumari with accurate timings, ticket costs and how-to-reach details.
        </p>
      </header>

      <div className="mt-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search places..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                cat === c ? "gradient-sunset text-primary-foreground shadow-warm" : "bg-muted text-foreground hover:bg-muted/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => <PlaceCard key={p.id} place={p} />)}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-20">No places match your search.</p>
      )}
    </div>
  );
}
