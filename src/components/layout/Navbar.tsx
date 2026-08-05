import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDown, Globe, Menu, Phone, Search, Sun, X, Shield, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { emergencyContacts } from "@/data/food";
import { useI18n } from "@/i18n/I18nContext";
import AdminLoginModal from "@/components/AdminLoginModal";
import { fetchCollection, saveCollection } from "@/lib/supabaseContent";

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [q, setQ] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    async function checkAdminSession() {
      const session = await fetchCollection<{ authenticated: boolean } | null>("admin_session", null);
      if (session?.authenticated) {
        setIsAdminLoggedIn(true);
      }
    }
    checkAdminSession();
  }, []);

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAdminLoggedIn) {
      nav("/admin");
    } else {
      setShowAdminModal(true);
    }
  };

  const handleAdminLogout = async () => {
    await saveCollection("admin_session", { authenticated: false });
    setIsAdminLoggedIn(false);
    nav("/");
  };

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
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4">
          <Link to="/" className="group flex flex-shrink-0 items-center gap-2">
            <span className="gradient-sunset shadow-warm flex h-9 w-9 items-center justify-center rounded-full transition-smooth group-hover:scale-110">
              <Sun className="h-5 w-5 text-primary-foreground" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-xl font-bold">Kaniya<span className="text-primary">.</span></p>
              <p className="-mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">Discover Kanyakumari</p>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-smooth",
                    isActive ? "text-primary" : "text-foreground/70 hover:bg-muted hover:text-foreground",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
              <button className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground">
                {t("nav_more")} <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full w-[640px] pt-2">
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-card p-4 shadow-elevated">
                    {moreLinks.map((m) => (
                      <Link key={m.to} to={m.to} onClick={() => setMoreOpen(false)} className="rounded-md px-3 py-2 text-sm transition-smooth hover:bg-muted hover:text-primary">
                        {m.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-1">
            <Link to="/onboard" className="hidden h-9 items-center rounded-full bg-secondary px-3 text-xs font-semibold text-secondary-foreground transition-smooth hover:bg-secondary/80 sm:flex">
              Host
            </Link>
            {isAdminLoggedIn ? (
              <div className="hidden items-center gap-1 sm:flex">
                <Link to="/admin" className="h-9 items-center gap-1.5 rounded-full bg-primary/10 px-3 text-xs font-semibold text-primary transition-smooth hover:bg-primary/20 flex">
                  <Shield className="h-3.5 w-3.5" /> Admin Dashboard
                </Link>
                <button onClick={handleAdminLogout} title="Logout Admin" className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button onClick={handleAdminClick} className="hidden h-9 items-center rounded-full bg-primary/10 px-3 text-xs font-semibold text-primary transition-smooth hover:bg-primary/20 sm:flex">
                Admin
              </button>
            )}
            <button onClick={() => setShowSearch(true)} aria-label="Search" className="flex h-9 w-9 items-center justify-center rounded-full transition-smooth hover:bg-muted">
              <Search className="h-4 w-4" />
            </button>
            <button onClick={() => setLang(lang === "en" ? "ta" : "en")} className="hidden h-9 items-center gap-1 rounded-full px-3 text-xs font-semibold transition-smooth hover:bg-muted sm:flex" aria-label="Language">
              <Globe className="h-3.5 w-3.5" /> {lang === "en" ? "EN" : "தமிழ்"}
            </button>
            <button onClick={() => setShowEmergency(true)} className="hidden h-9 items-center gap-1.5 rounded-full bg-destructive/10 px-3 text-xs font-semibold text-destructive transition-smooth hover:bg-destructive/20 sm:flex">
              <Phone className="h-3.5 w-3.5" /> SOS
            </button>
            <button aria-label="Toggle menu" className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted xl:hidden" onClick={() => setOpen(!open)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="max-h-[80vh] overflow-y-auto border-t border-border bg-background xl:hidden">
            <div className="container mx-auto flex flex-col py-3">
              {[...links, ...moreLinks].map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn("rounded-md px-3 py-3 text-sm font-medium", isActive ? "bg-muted text-primary" : "text-foreground/80")
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/onboard" onClick={() => setOpen(false)} className="px-3 py-3 text-sm font-medium text-primary">
                Host - {t("list_business")}
              </Link>
              <button onClick={(e) => { setOpen(false); handleAdminClick(e); }} className="px-3 py-3 text-left text-sm font-medium text-primary">
                {isAdminLoggedIn ? "Admin Dashboard" : "Admin Login"}
              </button>
              <button onClick={() => setLang(lang === "en" ? "ta" : "en")} className="px-3 py-3 text-left text-sm font-medium">
                {lang === "en" ? "தமிழ் பதிப்பிற்கு மாறவும் (Tamil)" : "Switch to English"}
              </button>
            </div>
          </nav>
        )}
      </header>

      <AdminLoginModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSuccess={() => {
          setIsAdminLoggedIn(true);
          nav("/admin");
        }}
      />


      {showSearch && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 px-4 pt-32 backdrop-blur-md" onClick={() => setShowSearch(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={submitSearch} className="w-full max-w-xl animate-fade-in-up rounded-2xl border border-border bg-card p-4 shadow-elevated">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search_placeholder")} className="flex-1 bg-transparent text-lg focus:outline-none" />
              <button type="button" onClick={() => setShowSearch(false)} className="rounded border border-border px-2 py-1 text-xs text-muted-foreground">ESC</button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Try: "vivekananda", "fish curry", "homestay", "weather"</p>
          </form>
        </div>
      )}

      {showEmergency && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setShowEmergency(false)}>
          <div className="absolute inset-0 bg-foreground/40" />
          <div onClick={(e) => e.stopPropagation()} className="relative h-full w-full max-w-sm animate-fade-in-up overflow-y-auto border-l border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-destructive">{t("emergency")}</p>
                <h3 className="font-display text-2xl font-bold">Quick contacts</h3>
              </div>
              <button onClick={() => setShowEmergency(false)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>
            <ul className="space-y-2">
              {emergencyContacts.map((c) => (
                <a key={c.name} href={`tel:${c.number.replace(/[^0-9]/g, "")}`} className="flex items-center gap-3 rounded-xl border border-border p-3 transition-smooth hover:border-destructive/40 hover:bg-destructive/5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{c.name}</p>
                    <p className="font-semibold">{c.number}</p>
                  </div>
                </a>
              ))}
            </ul>
            <div className="gradient-warm mt-6 rounded-xl border border-border p-4 text-sm text-muted-foreground">
              Save this page offline before you travel - access these numbers without network.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
