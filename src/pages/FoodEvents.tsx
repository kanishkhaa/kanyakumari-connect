import { dishes, events, emergencyContacts } from "@/data/food";
import { Calendar, MapPin, Phone } from "lucide-react";

export default function FoodEvents() {
  return (
    <div className="container mx-auto py-12 space-y-20">
      <section>
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Food discovery</p>
          <h1 className="mt-2 font-display text-5xl font-bold">Must-try dishes</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Authentic Kanyakumari cuisine — verified restaurants and price ranges so you order with confidence.
          </p>
        </header>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {dishes.map((d) => (
            <article key={d.id} className="rounded-2xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-smooth group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-smooth duration-700" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${d.type === "Veg" ? "text-secondary" : "text-primary"}`}>{d.type}</span>
                  <span className="text-xs font-medium text-muted-foreground">{d.priceRange}</span>
                </div>
                <h3 className="mt-1 font-display text-xl font-semibold">{d.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{d.description}</p>
                <p className="text-xs text-muted-foreground mt-3"><span className="font-semibold text-foreground">Where:</span> {d.whereToTry}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Festivals & events</p>
          <h2 className="mt-2 font-display text-4xl font-bold">Plan around the calendar</h2>
        </header>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {events.map((e) => (
            <article key={e.id} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-smooth">
              <div className="flex items-start gap-4">
                <span className="h-12 w-12 rounded-xl gradient-sunset flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-primary-foreground" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{e.name}</h3>
                  <p className="text-xs text-primary font-medium mt-0.5">{e.month}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {e.location}</p>
                  <p className="text-sm text-muted-foreground mt-3">{e.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl gradient-warm p-8 md:p-12 border border-border">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Stay safe</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Emergency contacts</h2>
          <p className="mt-2 text-muted-foreground">Keep these handy. Save offline before you travel.</p>
        </header>
        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {emergencyContacts.map((c) => (
            <li key={c.name} className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border">
              <span className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="h-4 w-4 text-primary" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{c.name}</p>
                <p className="font-semibold">{c.number}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
