import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Compass, Calendar, Heart, ShoppingBag, Cloud, Sparkles, Bus, Coffee, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import CinematicHero from "@/components/CinematicHero";
import PlaceCard from "@/components/PlaceCard";
import { places } from "@/data/places";
import { dishes, events } from "@/data/food";
import { experiences } from "@/data/experiences";
import { stays } from "@/data/stays";
import { weather, stats } from "@/data/regions";
import danceImg from "@/assets/exp-dance.jpg";

export default function Home() {
  return (
    <>
      <CinematicHero />

      {/* Quick action strip */}
      <section className="relative -mt-14 z-20 container mx-auto px-4">
        <div className="rounded-2xl bg-card shadow-elevated border border-border grid grid-cols-2 md:grid-cols-4 overflow-hidden">
          {[
            { icon: Compass, label: "Where to go", to: "/places" },
            { icon: Calendar, label: "Plan a trip", to: "/itinerary" },
            { icon: Heart, label: "Local experiences", to: "/experiences" },
            { icon: ShoppingBag, label: "Things to buy", to: "/things-to-buy" },
          ].map((a, i) => (
            <Link
              key={a.label}
              to={a.to}
              className={`group flex items-center gap-3 p-5 hover:bg-muted/50 transition-smooth ${i < 3 ? "md:border-r border-border" : ""} ${i < 2 ? "border-b md:border-b-0 border-border" : ""} ${i === 2 ? "border-r md:border-r border-border" : ""}`}
            >
              <span className="h-11 w-11 rounded-xl gradient-sunset flex items-center justify-center shadow-warm group-hover:scale-110 transition-bounce flex-shrink-0">
                <a.icon className="h-5 w-5 text-primary-foreground" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm md:text-base">{a.label}</p>
                <p className="text-xs text-muted-foreground hidden md:block">Start here →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Where to go — Regions */}
      <section className="hidden">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Where to go</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold leading-tight">
              Four landscapes, one district
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Kanyakumari is more than a single point on the map. Coast, temple town, foothills and fishing villages — each unfolds its own rhythm.
            </p>
          </div>
          <Button asChild variant="ghost" className="font-semibold">
            <Link to="/places">All places <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div />
      </section>

      {/* Iconic places */}
      <section className="bg-muted/40 border-y border-border py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Iconic places</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">Sights that define the cape</h2>
            <p className="mt-4 text-muted-foreground text-lg">From the meditation rock to the wooden palace — start with the unmissable.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.slice(0, 6).map((p) => <PlaceCard key={p.id} place={p} />)}
          </div>
        </div>
      </section>

      {/* Experiences editorial */}
      <section className="hidden">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={danceImg} alt="Folk performance" loading="lazy" className="rounded-2xl shadow-elevated w-full aspect-[4/5] object-cover" />
            <div className="hidden md:block absolute -bottom-8 -right-8 p-6 rounded-2xl bg-card shadow-warm border border-border max-w-xs animate-float">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold">Hosted experience</p>
              <p className="mt-1 font-display text-lg font-semibold leading-tight">Spend a morning with the women of Manakudy weaving palm baskets</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Experiences</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">Live the place, not just see it</h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Our experiences are hosted by local fisher-folk, weavers, cooks and tribal elders. Every booking is a paycheck delivered straight to a household.
            </p>
            <ul className="mt-8 space-y-4">
              {experiences.map((e) => (
                <Link
                  key={e.id}
                  to="/experiences"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/40 hover:shadow-soft transition-smooth"
                >
                  <img src={e.image} alt={e.title} loading="lazy" className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">{e.category}</p>
                    <p className="font-medium leading-tight line-clamp-1">{e.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{e.host}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-smooth" />
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="container mx-auto px-4">
        <div className="rounded-3xl gradient-ocean p-10 md:p-14 text-background grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl md:text-5xl font-bold text-gradient-sunset">{s.value}</p>
              <p className="text-sm uppercase tracking-widest text-background/80 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plan your trip — tools */}
      <section className="container mx-auto py-24 px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Plan your trip</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">Travel-ready in minutes</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Sparkles, title: "Smart itinerary", desc: "Day-wise plans tailored to days, budget and interests.", to: "/itinerary" },
            { icon: Bus, title: "Local transport", desc: "Buses, autos, ferries and approximate fares.", to: "/itinerary" },
            { icon: Cloud, title: "Best time", desc: "Weather, monsoon and festival calendar.", to: "/food" },
            { icon: ShieldCheck, title: "Verified stays", desc: "Only approved homestays, eco-lodges & tribal stays.", to: "/stays" },
          ].map((t) => (
            <Link
              key={t.title}
              to={t.to}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-warm transition-smooth"
            >
              <div className="h-11 w-11 rounded-xl gradient-sunset flex items-center justify-center shadow-warm mb-4 group-hover:scale-110 transition-bounce">
                <t.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold">{t.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5">{t.desc}</p>
            </Link>
          ))}
        </div>

        {/* Weather mini */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {weather.map((w) => (
            <div key={w.month} className={`p-5 rounded-2xl border ${w.recommended ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{w.month}</p>
                {w.recommended && <span className="text-[10px] px-2 py-0.5 rounded-full gradient-sunset text-primary-foreground font-semibold uppercase tracking-wider">Best</span>}
              </div>
              <p className="text-2xl font-display font-bold mt-2">{w.temp}</p>
              <p className="text-xs text-muted-foreground mt-1">Rain: {w.rain}</p>
              <p className="text-sm mt-3 leading-relaxed">{w.vibe}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stays preview */}
      <section className="bg-muted/40 border-y border-border py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Stays</p>
              <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">Sleep close to the sea</h2>
            </div>
            <Button asChild variant="ghost"><Link to="/stays">All stays <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {stays.map((s) => (
              <Link key={s.id} to="/stays" className="group rounded-2xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-elevated transition-smooth">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-smooth duration-700" />
                </div>
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-wider text-secondary font-semibold">{s.type}</p>
                  <p className="font-display text-lg font-semibold leading-tight mt-0.5 line-clamp-1">{s.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> {s.location.split(",")[0]}</p>
                  <p className="mt-3 font-display text-lg font-bold">₹{s.pricePerNight.toLocaleString()}<span className="text-xs font-normal text-muted-foreground"> /night</span></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Festivals timeline */}
      <section className="container mx-auto py-24 px-4">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Live calendar</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">Festivals, all year long</h2>
          <p className="mt-4 text-muted-foreground text-lg">Plan around temple festivals and cultural fairs to experience Kanyakumari at its most alive.</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          <div className="space-y-6">
            {events.map((e, i) => (
              <div key={e.id} className={`md:grid md:grid-cols-2 md:gap-12 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className={`p-6 rounded-2xl bg-card border border-border shadow-soft ${i % 2 === 0 ? "md:text-right" : ""}`}>
                  <p className="text-xs font-semibold text-primary uppercase tracking-widest">{e.month}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold">{e.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{e.location}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{e.description}</p>
                </div>
                <div className="hidden md:flex justify-center">
                  <span className="h-4 w-4 rounded-full gradient-sunset shadow-warm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food */}
      <section className="container mx-auto py-12 px-4">
        <div className="rounded-3xl gradient-warm p-8 md:p-14 border border-border">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Food discovery</p>
              <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">A coast you can taste</h2>
              <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
                Tangy meen kuzhambu in clay pots. Lacy appams with coconut stew. Banana-leaf meals at noon. Eat where locals eat — verified, mapped and rated.
              </p>
              <Button asChild variant="hero" className="mt-7"><Link to="/food">Discover food <ArrowRight className="h-4 w-4" /></Link></Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {dishes.map((d, i) => (
                <div key={d.id} className={`relative rounded-2xl overflow-hidden shadow-soft ${i === 1 ? "row-span-2 aspect-[3/5]" : "aspect-square"}`}>
                  <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover hover:scale-110 transition-smooth duration-700" />
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-ocean-deep/90 to-transparent">
                    <p className="text-[10px] font-semibold text-background line-clamp-1">{d.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace */}
      <section className="hidden">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">From local hands</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">Marketplace</h2>
          </div>
          <Button asChild variant="ghost"><Link to="/marketplace">Shop all <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {([] as Array<{ id: string; name: string; image: string; price: number; category: string }>).map((p) => (
            <Link key={p.id} to="/marketplace" className="group rounded-2xl bg-card overflow-hidden border border-border shadow-soft hover:shadow-elevated transition-smooth">
              <div className="aspect-square overflow-hidden bg-muted">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-smooth duration-700" />
              </div>
              <div className="p-4">
                <p className="text-[10px] uppercase tracking-widest text-primary font-semibold">{p.category}</p>
                <p className="font-medium text-sm leading-snug mt-1 line-clamp-2">{p.name}</p>
                <p className="mt-2 font-display text-lg font-bold">₹{p.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Plan & services strip */}
      <section className="container mx-auto py-20 px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Hospitality services</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-1">Everything you need for the trip</h2>
          </div>
          <Link to="/hospitality" className="text-sm text-primary hover:underline hidden sm:block">All services →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { to: "/travelcare", label: "TravelCare" },
            { to: "/operators", label: "Tour Operators" },
            { to: "/dtpc", label: "DTPC Centres" },
            { to: "/ebrochures", label: "eBrochures" },
            { to: "/specialities", label: "Specialities" },
            { to: "/things-to-buy", label: "Things to Buy" },
            { to: "/photo-gallery", label: "Photo Gallery" },
            { to: "/video-gallery", label: "Video Gallery" },
            { to: "/events", label: "Events" },
            { to: "/faq", label: "FAQ" },
          ].map((s) => (
            <Link key={s.to} to={s.to} className="p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-soft transition-smooth text-center">
              <p className="text-sm font-medium">{s.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Community / Vendor onboarding */}
      <section className="container mx-auto pb-24 px-4">
        <div className="rounded-3xl gradient-ocean p-10 md:p-16 text-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, hsl(var(--primary-glow)) 0%, transparent 45%)" }} />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">For locals</p>
              <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">List your homestay, craft or tour</h2>
              <p className="mt-5 text-background/85 text-lg leading-relaxed">
                We help homestay owners, guides, fisher-folk and artisan collectives reach travellers directly — no middlemen, transparent pricing.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg"><Link to="/onboard">Become a host <ArrowRight className="h-4 w-4" /></Link></Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: "Community-owned" },
                { icon: ShieldCheck, label: "Verified by team" },
                { icon: Coffee, label: "Direct payouts" },
                { icon: Sparkles, label: "Free to list" },
              ].map((b) => (
                <div key={b.label} className="p-5 rounded-2xl bg-background/10 backdrop-blur border border-background/20">
                  <b.icon className="h-5 w-5 text-accent mb-2" />
                  <p className="font-semibold text-sm">{b.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
