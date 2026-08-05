import { useState } from "react";
import { faqs } from "@/data/faq";
import { useI18n } from "@/i18n/I18nContext";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const cats = ["All", "General", "Travel", "Stay", "Safety", "Culture"] as const;

export default function FAQ() {
  const { t } = useI18n();
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [open, setOpen] = useState<number | null>(0);
  const list = cat === "All" ? faqs : faqs.filter((f) => f.category === cat);

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-none">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">FAQ</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("faq_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("faq_intro")}</p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => { setCat(c); setOpen(null); }} className={cn("px-4 py-2 text-sm rounded-full border transition-smooth", cat === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40")}>{c}</button>
        ))}
      </div>

      <div className="mt-10 max-w-3xl space-y-3">
        {list.map((f, i) => (
          <div key={f.q} className="rounded-2xl border border-border bg-card overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full p-5 flex items-center justify-between gap-4 text-left hover:bg-muted/30 transition-smooth">
              <span className="font-medium">{f.q}</span>
              <ChevronDown className={cn("h-5 w-5 text-muted-foreground flex-shrink-0 transition-smooth", open === i && "rotate-180")} />
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
