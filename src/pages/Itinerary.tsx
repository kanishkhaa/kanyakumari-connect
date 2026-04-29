import { useState } from "react";
import { Sparkles, Calendar, Wallet, Heart, MapPin, Coffee, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { places } from "@/data/places";
import { dishes } from "@/data/food";

type Interest = "Spiritual" | "Nature" | "Heritage" | "Food" | "Beach";
const INTERESTS: Interest[] = ["Spiritual", "Nature", "Heritage", "Food", "Beach"];

type Plan = {
  day: number;
  morning: { name: string; note: string };
  afternoon: { name: string; note: string };
  evening: { name: string; note: string };
  food: { name: string; note: string };
}[];

function buildPlan(days: number, interests: Interest[]): Plan {
  // Match places by category to interests
  const matched = places.filter((p) =>
    interests.length === 0 ? true : interests.includes(p.category as Interest) || (interests.includes("Food") && false),
  );
  const pool = matched.length >= 3 ? matched : places;
  const plan: Plan = [];
  for (let d = 0; d < days; d++) {
    const m = pool[(d * 2) % pool.length];
    const a = pool[(d * 2 + 1) % pool.length];
    const e = pool[(d * 2 + 2) % pool.length];
    const food = dishes[d % dishes.length];
    plan.push({
      day: d + 1,
      morning: { name: m.name, note: `${m.timings.split(",")[0]} • ${m.duration}` },
      afternoon: { name: a.name, note: `${a.distance}` },
      evening: { name: e.name, note: `Sunset spot • ${e.bestTime}` },
      food: { name: food.name, note: food.whereToTry },
    });
  }
  return plan;
}

export default function Itinerary() {
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState(5000);
  const [interests, setInterests] = useState<Interest[]>(["Spiritual", "Heritage"]);
  const [plan, setPlan] = useState<Plan | null>(null);

  const toggle = (i: Interest) =>
    setInterests((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Smart planner</p>
        <h1 className="mt-2 font-display text-5xl font-bold">Build your itinerary</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          A day-wise plan tailored to your trip — places, food and rough timings included.
        </p>
      </header>

      <div className="mt-10 grid lg:grid-cols-[400px_1fr] gap-8">
        <aside className="p-7 rounded-2xl bg-card border border-border h-fit space-y-7 shadow-soft">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3"><Calendar className="h-4 w-4 text-primary" /> Days</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    days === d ? "gradient-sunset text-primary-foreground shadow-warm" : "bg-muted hover:bg-muted/70"
                  }`}
                >{d}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3"><Wallet className="h-4 w-4 text-primary" /> Budget per person: ₹{budget.toLocaleString()}</label>
            <input
              type="range"
              min={2000}
              max={20000}
              step={500}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>₹2k</span><span>₹20k</span>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3"><Heart className="h-4 w-4 text-primary" /> Interests</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((i) => (
                <button
                  key={i}
                  onClick={() => toggle(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${
                    interests.includes(i) ? "gradient-sunset text-primary-foreground" : "bg-muted hover:bg-muted/70"
                  }`}
                >{i}</button>
              ))}
            </div>
          </div>

          <Button variant="hero" className="w-full" onClick={() => setPlan(buildPlan(days, interests))}>
            <Sparkles className="h-4 w-4" /> Generate plan
          </Button>
        </aside>

        <div>
          {!plan ? (
            <div className="h-full min-h-[400px] rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-center p-10">
              <Sparkles className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-display text-2xl">Your plan appears here</h3>
              <p className="text-muted-foreground mt-2 max-w-sm">Choose your preferences on the left and we'll build a tailored Kanyakumari itinerary.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {plan.map((d) => (
                <div key={d.day} className="rounded-2xl bg-card border border-border overflow-hidden shadow-soft">
                  <div className="px-6 py-4 gradient-sunset text-primary-foreground flex items-center justify-between">
                    <h3 className="font-display text-xl font-semibold">Day {d.day}</h3>
                    <span className="text-xs opacity-90">~₹{Math.round(budget / days)} budget</span>
                  </div>
                  <div className="divide-y divide-border">
                    {[
                      { label: "Morning", icon: Clock, item: d.morning },
                      { label: "Afternoon", icon: MapPin, item: d.afternoon },
                      { label: "Evening", icon: Sparkles, item: d.evening },
                      { label: "Try this food", icon: Coffee, item: d.food },
                    ].map((row) => (
                      <div key={row.label} className="px-6 py-4 flex gap-4 items-start">
                        <span className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <row.icon className="h-4 w-4 text-primary" />
                        </span>
                        <div className="flex-1">
                          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{row.label}</p>
                          <p className="font-medium mt-0.5">{row.item.name}</p>
                          <p className="text-sm text-muted-foreground">{row.item.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
