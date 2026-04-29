import { operators } from "@/data/operators";
import { useI18n } from "@/i18n/I18nContext";
import { Star, ShieldCheck, Phone, Mail } from "lucide-react";

export default function TourOperators() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Operators</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("operators_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("operators_intro")}</p>
      </header>

      <div className="mt-12 grid md:grid-cols-2 gap-5">
        {operators.map((o) => (
          <article key={o.id} className="p-6 rounded-2xl border border-border bg-card hover:shadow-soft transition-smooth">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-semibold">{o.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium mr-2">{o.type}</span>
                  {o.verified && <span className="inline-flex items-center gap-1 text-secondary"><ShieldCheck className="h-3 w-3" /> Verified</span>}
                </p>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" /> {o.rating} <span className="text-muted-foreground/70">({o.reviews})</span></p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">{o.speciality}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={`tel:${o.phone.replace(/[^0-9]/g, "")}`} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-smooth"><Phone className="h-3.5 w-3.5" /> {o.phone}</a>
              <a href={`mailto:${o.email}`} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-muted/70 transition-smooth"><Mail className="h-3.5 w-3.5" /> Email</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
