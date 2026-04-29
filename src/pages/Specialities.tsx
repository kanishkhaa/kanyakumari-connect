import { specialities } from "@/data/specialities";
import { useI18n } from "@/i18n/I18nContext";
import * as Icons from "lucide-react";

export default function Specialities() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Specialities</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("specialities_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("specialities_intro")}</p>
      </header>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {specialities.map((s) => {
          const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[s.icon] || Icons.Sparkles;
          return (
            <article key={s.id} className="p-6 rounded-2xl bg-card border border-border hover:shadow-elevated transition-smooth">
              <span className="h-12 w-12 rounded-xl gradient-sunset text-primary-foreground flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
