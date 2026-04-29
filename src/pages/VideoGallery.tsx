import { useState } from "react";
import { videos } from "@/data/gallery";
import { useI18n } from "@/i18n/I18nContext";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

const cats = ["All", "Highlights", "Drone", "Culture", "Food"] as const;

export default function VideoGallery() {
  const { t } = useI18n();
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [playing, setPlaying] = useState<string | null>(null);
  const list = cat === "All" ? videos : videos.filter((v) => v.category === cat);
  const open = videos.find((v) => v.id === playing);

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Gallery</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("video_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("video_intro")}</p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={cn("px-4 py-2 text-sm rounded-full border transition-smooth", cat === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/40")}>{c}</button>
        ))}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((v) => (
          <button key={v.id} onClick={() => setPlaying(v.id)} className="group text-left">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
              <img src={v.poster} alt={v.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700" />
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/50 transition-smooth flex items-center justify-center">
                <span className="h-14 w-14 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-smooth">
                  <Play className="h-6 w-6 fill-primary text-primary ml-0.5" />
                </span>
              </div>
              <span className="absolute bottom-2 right-2 text-[11px] font-medium px-2 py-0.5 rounded bg-foreground/70 text-background">{v.duration}</span>
            </div>
            <h3 className="mt-3 font-display text-base font-semibold">{v.title}</h3>
            <p className="text-xs text-muted-foreground">{v.category}</p>
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4" onClick={() => setPlaying(null)}>
          <button onClick={() => setPlaying(null)} className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/20 text-background flex items-center justify-center hover:bg-background/30"><X className="h-5 w-5" /></button>
          <div className="max-w-4xl w-full aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe className="w-full h-full rounded-xl" src={`https://www.youtube.com/embed/${open.youtubeId}?autoplay=1`} title={open.title} allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  );
}
