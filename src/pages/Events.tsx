import { useState } from "react";
import { events } from "@/data/events";
import { useI18n } from "@/i18n/I18nContext";
import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const cats = ["All", "Festival", "Cultural", "Sports", "Spiritual", "Fair"] as const;

export default function Events() {
  const { t } = useI18n();
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = cat === "All" ? events : events.filter((e) => e.category === cat);

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Events</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("events_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("events_intro")}</p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={cn("px-4 py-2 text-sm rounded-full border transition-smooth", cat === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40")}>{c}</button>
        ))}
      </div>

      <div className="mt-10 space-y-4">
        {list.map((e) => (
          <article key={e.id} className="grid sm:grid-cols-[120px_1fr_auto] gap-5 p-5 rounded-2xl border border-border bg-card hover:shadow-soft transition-smooth">
            <div className="flex sm:flex-col items-center sm:items-start justify-center sm:justify-start gap-2 sm:gap-0 p-3 rounded-xl gradient-warm text-center">
              <p className="text-xs uppercase tracking-widest font-semibold">{e.month}</p>
              <p className="font-display text-2xl font-bold">{e.date.split(",")[0]}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">{e.category}</span>
              <h3 className="mt-1 font-display text-xl font-semibold">{e.title}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5"><MapPin className="h-3 w-3" /> {e.location}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{e.description}</p>
            </div>
            <div className="flex items-center">
              <a href="#" className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"><Calendar className="h-4 w-4" /> Add to calendar</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
