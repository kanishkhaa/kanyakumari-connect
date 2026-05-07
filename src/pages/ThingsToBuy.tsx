import { products } from "@/data/marketplace";
import { MapPin, ShoppingBag } from "lucide-react";

export default function ThingsToBuy() {
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Souvenirs</p>
        <h1 className="mt-2 font-display text-5xl font-bold">Things to buy in Kanyakumari</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Real local buys from Kanyakumari include seashell craft, palm-leaf articles, wood and bamboo handicrafts, brass idols, banana chips, spices and handloom textiles.
        </p>
      </header>

      {categories.map((cat) => (
        <section key={cat} className="mt-14">
          <h2 className="font-display text-2xl font-bold">{cat}</h2>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter((p) => p.category === cat).map((p) => (
              <article key={p.id} className="group overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-smooth hover:shadow-elevated">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-smooth duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    <ShoppingBag className="h-3.5 w-3.5" /> From Rs. {p.price}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span><span className="font-semibold text-foreground">Where to buy:</span> {p.whereToBuy}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
