import { useMemo, useState } from "react";
import { places as fallbackPlaces, getTranslatedPlace } from "@/data/places";
import { useCollection } from "@/hooks/useCollection";
import PlaceCard from "@/components/PlaceCard";
import { useI18n } from "@/i18n/I18nContext";
import { Search } from "lucide-react";

const categories = ["All", "Spiritual", "Heritage", "Nature", "Beach"] as const;

export default function Places() {
  const { t, lang } = useI18n();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const { data: storedPlaces } = useCollection("places", fallbackPlaces);
  const places = useMemo(() => {
    const storedIds = new Set(storedPlaces.map((place) => place.id));
    return [...storedPlaces, ...fallbackPlaces.filter((place) => !storedIds.has(place.id))];
  }, [storedPlaces]);

  const filtered = useMemo(() => {
    return places.map((p) => getTranslatedPlace(p, lang)).filter((p) => {
      const matchCat = cat === "All" || p.category === cat;
      const matchQ = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.tagline.toLowerCase().includes(q.toLowerCase());
      return matchCat && matchQ;
    });
  }, [q, cat, places, lang]);

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-none">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{t("nav_where")}</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("explore_places")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          {t("home_hero_subtitle")}
        </p>
      </header>

      <div className="mt-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search_placeholder")}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                cat === c ? "gradient-sunset text-primary-foreground shadow-warm" : "bg-muted text-foreground hover:bg-muted/70"
              }`}
            >
              {c === "All" ? t("filter_all") : c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => <PlaceCard key={p.id} place={p} />)}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-20">
          {lang === "ta" ? "உங்கள் தேடலுக்கு ஏற்ற இடங்கள் எதுவும் கிடைக்கவில்லை." : "No places match your search."}
        </p>
      )}
    </div>
  );
}
