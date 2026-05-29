import { Button } from "@/components/ui/button";
import { productImage, products as fallbackProducts } from "@/data/marketplace";
import { useCollection } from "@/hooks/useCollection";
import { MapPin } from "lucide-react";

export default function Marketplace() {
  const { data: products } = useCollection("products", fallbackProducts);

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Artisan marketplace</p>
        <h1 className="mt-2 font-display text-5xl font-bold">From local hands</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Handicrafts, textiles and spices from Kanyakumari's artisans, weavers and tribal collectives. Buy directly from the source.
        </p>
      </header>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <article key={p.id} className="group rounded-2xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-smooth">
            <div className="aspect-square overflow-hidden bg-muted">
              <img src={productImage(p)} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-smooth duration-700" />
            </div>
            <div className="p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">{p.category}</span>
              <h3 className="mt-1 font-medium leading-snug line-clamp-2">{p.name}</h3>
              <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {p.artisan} - {p.village}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <p className="font-display text-lg font-bold">Rs. {p.price.toLocaleString()}</p>
                <Button size="sm" variant="hero">Add</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
