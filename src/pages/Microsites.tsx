import { microsites } from "@/data/microsites";
import { useI18n } from "@/i18n/I18nContext";
import { ArrowUpRight } from "lucide-react";

export default function Microsites() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Microsites</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("microsites_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("microsites_intro")}</p>
      </header>

      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {microsites.map((m) => (
          <article key={m.id} className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-elevated transition-smooth">
            <div className="h-32 gradient-sunset relative">
              <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-background/90 text-foreground">{m.category}</span>
              <ArrowUpRight className="absolute top-3 right-3 h-5 w-5 text-primary-foreground opacity-80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-smooth" />
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl font-semibold">{m.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5">{m.tagline}</p>
              <ul className="mt-4 space-y-1.5">
                {m.highlights.map((h) => (
                  <li key={h} className="text-sm flex gap-2"><span className="text-primary">•</span> {h}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
