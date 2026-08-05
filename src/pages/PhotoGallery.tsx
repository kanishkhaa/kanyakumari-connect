import { useState } from "react";
import { photos } from "@/data/gallery";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const cats = ["All", "Landscapes", "Heritage", "People", "Spiritual"] as const;

export default function PhotoGallery() {
  const { t } = useI18n();
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [open, setOpen] = useState<string | null>(null);
  const list = cat === "All" ? photos : photos.filter((p) => p.category === cat);
  const opened = photos.find((p) => p.id === open);

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-none">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Gallery</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("photo_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("photo_intro")}</p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={cn("px-4 py-2 text-sm rounded-full border transition-smooth", cat === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40")}>{c}</button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {list.map((p) => (
          <button key={p.id} onClick={() => setOpen(p.id)} className="group relative aspect-square overflow-hidden rounded-xl bg-muted">
            <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-smooth duration-700" />
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth">
              <p className="text-xs font-medium text-background line-clamp-2 text-left">{p.title}</p>
            </div>
          </button>
        ))}
      </div>

      {opened && (
        <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4 animate-fade-in-up" onClick={() => setOpen(null)}>
          <button onClick={() => setOpen(null)} className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/20 text-background flex items-center justify-center hover:bg-background/30"><X className="h-5 w-5" /></button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={opened.image} alt={opened.title} className="w-full max-h-[80vh] object-contain rounded-xl" />
            <p className="mt-3 text-center text-background font-medium">{opened.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
