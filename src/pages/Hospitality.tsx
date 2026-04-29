import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nContext";
import { Bed, UtensilsCrossed, Bus, ShieldCheck, Headphones, Wifi } from "lucide-react";

const services = [
  { icon: Bed, title: "Where to Stay", desc: "Verified homestays, eco lodges, hotels and tribal stays — transparent pricing.", link: "/stays", cta: "Find a stay" },
  { icon: Bus, title: "Find a Tour Operator", desc: "Licensed local operators for district circuits and South India journeys.", link: "/operators", cta: "Browse operators" },
  { icon: UtensilsCrossed, title: "Restaurants & Food Trails", desc: "Hygiene-certified restaurants and curated banana-leaf experiences.", link: "/food", cta: "See food guide" },
  { icon: ShieldCheck, title: "Safe Tourism (TravelCare)", desc: "Verified properties, hygiene protocols, advisories and helplines.", link: "/travelcare", cta: "Read TravelCare" },
  { icon: Headphones, title: "DTPC Information Centres", desc: "Government-run info centres across the district — guides and tickets.", link: "/dtpc", cta: "Find a centre" },
  { icon: Wifi, title: "Connectivity & Wi-Fi", desc: "Free Wi-Fi zones at major sights and most certified properties.", link: "/faq", cta: "FAQ" },
];

export default function Hospitality() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Hospitality</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("hospitality_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("hospitality_intro")}</p>
      </header>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s) => (
          <Link key={s.title} to={s.link} className="group p-6 rounded-2xl border border-border bg-card hover:shadow-elevated hover:border-primary/40 transition-smooth">
            <span className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <s.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
            <p className="mt-4 text-sm font-medium text-primary group-hover:translate-x-1 transition-smooth">{s.cta} →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
