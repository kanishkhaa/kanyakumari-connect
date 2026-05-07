import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Sun, Search, Phone, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { emergencyContacts } from "@/data/food";
import { useI18n } from "@/i18n/I18nContext";

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [q, setQ] = useState("");
  const nav = useNavigate();

  const links = [
    { to: "/places", label: t("nav_where") },
    { to: "/experiences", label: t("nav_experiences") },
    { to: "/itinerary", label: t("nav_plan") },
    { to: "/stays", label: t("nav_stays") },
    { to: "/food", label: t("nav_food") },
  ];

  const moreLinks = [
    { to: "/travelcare", label: t("nav_travelcare") },
    { to: "/events", label: t("nav_events") },
    { to: "/ebrochures", label: t("nav_brochures") },
    { to: "/dtpc", label: t("nav_dtpc") },
    { to: "/photo-gallery", label: t("nav_photo") },
    { to: "/video-gallery", label: t("nav_video") },
    { to: "/things-to-buy", label: t("nav_buy") },
    { to: "/specialities", label: t("nav_specialities") },
    { to: "/hospitality", label: t("nav_hospitality") },
    { to: "/operators", label: t("nav_operators") },
    { to: "/faq", label: t("nav_faq") },
  ];

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      nav(`/search?q=${encodeURIComponent(q.trim())}`);
      setShowSearch(false);
      setQ("");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-sunset shadow-warm group-hover:scale-110 transition-smooth">
              <Sun className="h-5 w-5 text-primary-foreground" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-xl font-bold">Kaniya<span className="text-primary">.</span></p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground -mt-1">Discover Kanyakumari</p>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-smooth",
                    isActive ? "text-primary" : "text-foreground/70 hover:text-foreground hover:bg-muted",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button className="px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted inline-flex items-center gap-1">
                {t("nav_more")} <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {moreOpen && (
                <div className="absolute top-full right-0 pt-2 w-[640px]">
                  <div className="bg-card border border-border rounded-2xl shadow-elevated p-4 grid grid-cols-2 gap-1">
                    {moreLinks.map((m) => (
                      <Link key={m.to} to={m.to} onClick={() => setMoreOpen(false)} className="px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-primary transition-smooth">
                        {m.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowSearch(true)}
              aria-label="Search"
              className="h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center transition-smooth"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              onClick={() => setLang(lang === "en" ? "ta" : "en")}
              className="hidden sm:flex h-9 px-3 rounded-full hover:bg-muted items-center gap-1 text-xs font-semibold transition-smooth"
              aria-label="Language"
            >
              <Globe className="h-3.5 w-3.5" /> {lang === "en" ? "EN" : "தமிழ்"}
            </button>
            <button
              onClick={() => setShowEmergency(true)}
              className="hidden sm:flex h-9 px-3 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 items-center gap-1.5 text-xs font-semibold transition-smooth"
            >
              <Phone className="h-3.5 w-3.5" /> SOS
            </button>
            <button
              aria-label="Toggle menu"
              className="xl:hidden h-9 w-9 rounded-md hover:bg-muted flex items-center justify-center"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="xl:hidden border-t border-border bg-background max-h-[80vh] overflow-y-auto">
            <div className="container mx-auto py-3 flex flex-col">
              {[...links, ...moreLinks].map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-3 rounded-md text-sm font-medium",
                      isActive ? "text-primary bg-muted" : "text-foreground/80",
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/onboard" onClick={() => setOpen(false)} className="px-3 py-3 text-sm font-medium text-primary">
                {t("list_business")} →
              </Link>
              <button onClick={() => setLang(lang === "en" ? "ta" : "en")} className="px-3 py-3 text-sm font-medium text-left">
                🌐 {lang === "en" ? "தமிழில் காண" : "View in English"}
              </button>
            </div>
          </nav>
        )}
      </header>

      {showSearch && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-start justify-center pt-32 px-4" onClick={() => setShowSearch(false)}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={submitSearch}
            className="w-full max-w-xl bg-card rounded-2xl shadow-elevated border border-border p-4 animate-fade-in-up"
          >
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("search_placeholder")}
                className="flex-1 bg-transparent text-lg focus:outline-none"
              />
              <button type="button" onClick={() => setShowSearch(false)} className="text-xs text-muted-foreground px-2 py-1 rounded border border-border">ESC</button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Try: "vivekananda", "fish curry", "homestay", "weather"</p>
          </form>
        </div>
      )}

      {showEmergency && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setShowEmergency(false)}>
          <div className="absolute inset-0 bg-foreground/40" />
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-sm bg-card border-l border-border h-full overflow-y-auto p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-destructive font-semibold">{t("emergency")}</p>
                <h3 className="font-display text-2xl font-bold">Quick contacts</h3>
              </div>
              <button onClick={() => setShowEmergency(false)} className="h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center"><X className="h-4 w-4" /></button>
            </div>
            <ul className="space-y-2">
              {emergencyContacts.map((c) => (
                <a key={c.name} href={`tel:${c.number.replace(/[^0-9]/g, "")}`} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-destructive/40 hover:bg-destructive/5 transition-smooth">
                  <span className="h-10 w-10 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{c.name}</p>
                    <p className="font-semibold">{c.number}</p>
                  </div>
                </a>
              ))}
            </ul>
            <div className="mt-6 p-4 rounded-xl gradient-warm border border-border text-sm text-muted-foreground">
              Save this page offline before you travel — access these numbers without network.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
