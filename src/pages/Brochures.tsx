import { brochures } from "@/data/brochures";
import { useI18n } from "@/i18n/I18nContext";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

export default function Brochures() {
  const { t } = useI18n();

  const handleDownload = (title: string) => {
    toast(`${title} — sample brochure`, { description: "PDF download will be available in production." });
  };

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">eBrochures</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("brochures_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("brochures_intro")}</p>
      </header>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {brochures.map((b) => (
          <article key={b.id} className="p-5 rounded-2xl border border-border bg-card flex gap-4 hover:shadow-soft transition-smooth">
            <span className="h-14 w-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <FileText className="h-6 w-6" />
            </span>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">{b.category}</span>
              <h3 className="mt-1 font-display text-base font-semibold leading-snug">{b.title}</h3>
              <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{b.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{b.pages} pages • {b.size}</p>
                <Button size="sm" variant="hero" onClick={() => handleDownload(b.title)} className="gap-1"><Download className="h-3.5 w-3.5" /> PDF</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
