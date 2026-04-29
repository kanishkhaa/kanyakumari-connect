import { regions } from "@/data/regions";
import { useI18n } from "@/i18n/I18nContext";

export default function Districts() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{t("nav_districts")}</p>
        <h1 className="mt-2 font-display text-5xl font-bold">Four landscapes, one district</h1>
        <p className="mt-4 text-muted-foreground text-lg">From the three-seas confluence to the Western Ghats — Kanyakumari packs four worlds into a single district.</p>
      </header>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {regions.map((r) => (
          <article key={r.id} className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-elevated transition-smooth">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={r.image} alt={r.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold">{r.name}</h3>
              <p className="text-muted-foreground mt-1.5">{r.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {r.highlights.map((h) => (
                  <span key={h} className="text-[11px] px-2 py-1 rounded-full bg-muted">{h}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
