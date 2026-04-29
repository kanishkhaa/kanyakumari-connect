import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Home, Sparkles, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-kanyakumari.jpg";
import { places } from "@/data/places";
import { dishes } from "@/data/food";
import PlaceCard from "@/components/PlaceCard";

const features = [
  { icon: MapPin, title: "Verified Places", desc: "Accurate timings, tickets and routes for every attraction.", to: "/places" },
  { icon: Calendar, title: "Smart Itinerary", desc: "Day-wise plans tailored to your days, budget and interests.", to: "/itinerary" },
  { icon: Home, title: "Trusted Stays", desc: "Approved homestays, eco-lodges and tribal stays only.", to: "/stays" },
  { icon: Heart, title: "Local Experiences", desc: "Authentic village tours, crafts and cuisine with hosts.", to: "/experiences" },
  { icon: ShoppingBag, title: "Artisan Marketplace", desc: "Buy directly from Kanyakumari's artisans and weavers.", to: "/marketplace" },
  { icon: Sparkles, title: "Events & Festivals", desc: "Plan around temple festivals and cultural fairs.", to: "/food" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Sunrise over Vivekananda Rock and Thiruvalluvar Statue, Kanyakumari"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/30 via-ocean-deep/20 to-background" />
        <div className="container mx-auto relative z-10 py-24">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/90 backdrop-blur text-sm font-medium text-foreground shadow-soft">
              <Sparkles className="h-4 w-4 text-primary" /> Where three seas meet
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05] text-background drop-shadow-lg">
              Discover the soul of <span className="text-gradient-sunset">Kanyakumari</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-background/90 max-w-2xl leading-relaxed drop-shadow">
              One verified platform for places, stays, itineraries and authentic local experiences — built with the people of India's southernmost tip.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/itinerary">Plan my trip <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-background/90 backdrop-blur border-background/40">
                <Link to="/places">Explore places</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto py-20">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Everything in one place</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">
            One trusted ecosystem
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            From the first ferry ticket to the last banana-leaf meal — Kaniya brings together verified information and direct support for local livelihoods.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="group p-7 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-warm transition-smooth"
            >
              <div className="h-12 w-12 rounded-xl gradient-sunset flex items-center justify-center shadow-warm mb-5 group-hover:scale-110 transition-bounce">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-smooth">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured places */}
      <section className="container mx-auto py-12">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Iconic places</p>
            <h2 className="mt-2 font-display text-4xl font-bold">Where to begin</h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/places">View all <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.slice(0, 3).map((p) => <PlaceCard key={p.id} place={p} />)}
        </div>
      </section>

      {/* Food strip */}
      <section className="container mx-auto py-20">
        <div className="rounded-3xl gradient-warm p-8 md:p-14 border border-border">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Taste of the coast</p>
              <h2 className="mt-2 font-display text-4xl font-bold">Eat where the locals eat</h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                From fiery meen kuzhambu to lacy appams — explore verified restaurants and must-try dishes mapped to every neighborhood.
              </p>
              <Button asChild variant="hero" className="mt-6">
                <Link to="/food">Discover food <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {dishes.map((d) => (
                <div key={d.id} className="aspect-square rounded-2xl overflow-hidden shadow-soft">
                  <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover hover:scale-110 transition-smooth duration-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto pb-20">
        <div className="rounded-3xl gradient-ocean p-10 md:p-16 text-center text-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, hsl(var(--primary-glow)) 0%, transparent 40%)" }} />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Your trip, planned in minutes</h2>
            <p className="mt-4 text-background/80 max-w-xl mx-auto text-lg">
              Tell us your days, budget and interests. We'll build a day-wise plan with places, food, transport and stays.
            </p>
            <Button asChild variant="hero" size="lg" className="mt-8">
              <Link to="/itinerary">Build my itinerary <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
