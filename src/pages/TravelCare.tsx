import { useI18n } from "@/i18n/I18nContext";
import { ShieldCheck, HeartPulse, Phone, Sparkles, AlertTriangle } from "lucide-react";
import { emergencyContacts } from "@/data/food";

const guidelines = [
  { icon: ShieldCheck, title: "Verified hotels & guides", text: "Every stay and guide listed is physically inspected and re-verified every 6 months." },
  { icon: HeartPulse, title: "Hygiene-first kitchens", text: "Partner restaurants follow Safe & Hygienic Tourism (SHT) protocols — daily checks." },
  { icon: Sparkles, title: "Eco-conscious tourism", text: "Single-use plastics avoided at certified properties; reef-safe sunscreen encouraged at beaches." },
  { icon: AlertTriangle, title: "Real-time advisories", text: "Sea conditions, ferry status and weather warnings updated daily by DTPC officers." },
];

const protocols = [
  "Carry a refillable water bottle — refill stations at all DTPC centres.",
  "Respect ferry queue order at the Vivekananda jetty.",
  "Photography restricted inside temple sanctums and Padmanabhapuram palace.",
  "Avoid swimming at the Triveni Sangam — strong undercurrents.",
  "Buy directly from artisans where possible — fair pricing for local communities.",
  "If you see waste, report it on the Onboard portal — local cleanup teams respond within 24h.",
];

export default function TravelCare() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">TravelCare</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("travelcare_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("travelcare_intro")}</p>
      </header>

      <section className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {guidelines.map((g) => (
          <div key={g.title} className="p-6 rounded-2xl border border-border bg-card shadow-soft">
            <span className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <g.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">{g.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{g.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-3xl font-bold">Travel protocols</h2>
          <ul className="mt-6 space-y-3">
            {protocols.map((p) => (
              <li key={p} className="flex gap-3 text-sm">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-muted-foreground leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-3xl font-bold">24×7 helplines</h2>
          <div className="mt-6 grid gap-3">
            {emergencyContacts.map((c) => (
              <a key={c.name} href={`tel:${c.number.replace(/[^0-9]/g, "")}`} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-soft transition-smooth">
                <span className="h-11 w-11 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{c.name}</p>
                  <p className="font-semibold">{c.number}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
