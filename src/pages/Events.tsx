import { useState } from "react";
import { events as fallbackEvents } from "@/data/events";
import { useCollection } from "@/hooks/useCollection";
import { useI18n } from "@/i18n/I18nContext";
import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const cats = ["All", "Festival", "Cultural", "Spiritual", "Fair"] as const;

export default function Events() {
  const { t } = useI18n();
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const { data: events } = useCollection("events", fallbackEvents);
  const list = cat === "All" ? events : events.filter((e) => e.category === cat);

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-none">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Events</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("events_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">Explore festivals, cultural celebrations and temple events across Kanniyakumari district.</p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={cn("px-4 py-2 text-sm rounded-full border transition-smooth", cat === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40")}>{c}</button>
        ))}
      </div>

      <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {list.map((e) => (
          <article key={e.id} className="overflow-hidden rounded-xl border border-border bg-card hover:shadow-elevated transition-smooth group">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover transition-smooth duration-700 group-hover:scale-105" />
              <div className="absolute left-4 top-4 bg-background/95 px-3 py-2 text-center shadow-soft">
                <p className="text-xs uppercase tracking-widest font-semibold text-primary">{e.month}</p>
                <p className="font-display text-lg font-bold">{e.date}</p>
              </div>
            </div>
            <div className="p-5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">{e.category}</span>
              <h3 className="mt-1 font-display text-xl font-semibold">{e.title}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5"><MapPin className="h-3 w-3" /> {e.location}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{e.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary"><Calendar className="h-4 w-4" /> {e.date}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
