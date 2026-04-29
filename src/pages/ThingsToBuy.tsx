import { products } from "@/data/marketplace";
import { useI18n } from "@/i18n/I18nContext";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ThingsToBuy() {
  const { t } = useI18n();
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Souvenirs</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("buy_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("buy_intro")}</p>
      </header>

      {categories.map((cat) => (
        <section key={cat} className="mt-14">
          <div className="flex items-end justify-between mb-5">
            <h2 className="font-display text-2xl font-bold">{cat}</h2>
            <Link to="/marketplace" className="text-sm text-primary hover:underline">{t("view_all")} →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.filter((p) => p.category === cat).map((p) => (
              <article key={p.id} className="group rounded-2xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-smooth">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-smooth duration-700" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium leading-snug line-clamp-2">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.village}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="font-display text-lg font-bold">₹{p.price.toLocaleString()}</p>
                    <Button size="sm" variant="hero">Buy</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
