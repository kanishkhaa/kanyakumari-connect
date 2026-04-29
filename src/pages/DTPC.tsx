import { dtpcCenters } from "@/data/dtpc";
import { useI18n } from "@/i18n/I18nContext";
import { MapPin, Phone, Clock } from "lucide-react";

export default function DTPC() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">DTPC</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("dtpc_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("dtpc_intro")}</p>
      </header>

      <div className="mt-12 grid md:grid-cols-2 gap-5">
        {dtpcCenters.map((c) => (
          <article key={c.id} className="p-6 rounded-2xl border border-border bg-card hover:shadow-soft transition-smooth">
            <h3 className="font-display text-xl font-semibold">{c.name}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{c.address}</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><a href={`tel:${c.phone.replace(/[^0-9]/g, "")}`} className="hover:text-primary">{c.phone}</a></li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /><span className="text-muted-foreground">{c.hours}</span></li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {c.services.map((s) => (
                <span key={s} className="text-[11px] px-2 py-1 rounded-full bg-muted">{s}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
