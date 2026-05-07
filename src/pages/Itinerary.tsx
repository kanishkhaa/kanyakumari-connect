import { useMemo, useState } from "react";
import { Bus, Calendar, Car, CloudSun, Compass, Hotel, MapPin, Sparkles, Train, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { places } from "@/data/places";
import { dishes } from "@/data/food";
import { experiences } from "@/data/experiences";
import { events } from "@/data/events";

type Interest = "Spiritual" | "Nature" | "Heritage" | "Food" | "Beach";
type Pace = "Relaxed" | "Balanced" | "Packed";
type TravelMode = "Cab" | "Bus" | "Train";

const INTERESTS: Interest[] = ["Spiritual", "Nature", "Heritage", "Food", "Beach"];
const monthWeather = [
  { month: "Jan", temp: "22/34°C", aqi: "48", note: "Clear, peak season" },
  { month: "Feb", temp: "22/34°C", aqi: "50", note: "Good for sightseeing" },
  { month: "Mar", temp: "23/34°C", aqi: "61", note: "Warm, manageable" },
  { month: "Apr", temp: "24/35°C", aqi: "49", note: "Hot, Chitra Pournami season" },
  { month: "May", temp: "25/37°C", aqi: "38", note: "Hot and dry" },
  { month: "Jun", temp: "24/35°C", aqi: "36", note: "Monsoon begins" },
  { month: "Jul", temp: "23/34°C", aqi: "37", note: "Green interiors" },
  { month: "Aug", temp: "24/36°C", aqi: "42", note: "Humid, lush" },
  { month: "Sep", temp: "23/32°C", aqi: "32", note: "Post-monsoon starts" },
  { month: "Oct", temp: "23/31°C", aqi: "44", note: "Best season starts" },
  { month: "Nov", temp: "23/32°C", aqi: "38", note: "Great for families" },
  { month: "Dec", temp: "24/31°C", aqi: "46", note: "Cooler, festive" },
];

const howToReach = [
  { icon: CloudSun, mode: "Air", text: "Nearest major airport is Thiruvananthapuram, around 90 km away." },
  { icon: Train, mode: "Rail", text: "Kanyakumari Railway Station connects the town with many Indian cities." },
  { icon: Bus, mode: "Road", text: "Road links connect Kanyakumari with Nagercoil, Madurai, Tirunelveli and Thiruvananthapuram." },
];

function pickPlaces(interests: Interest[], count: number) {
  const matched = places.filter((p) => interests.includes(p.category as Interest));
  const pool = matched.length >= count ? matched : places;
  return pool.slice(0, Math.max(count, 1));
}

function buildDayPlan(days: number, interests: Interest[], pace: Pace) {
  const slots = pace === "Packed" ? 4 : pace === "Balanced" ? 3 : 2;
  const selectedPlaces = pickPlaces(interests, days * slots + 2);

  return Array.from({ length: days }, (_, dayIndex) => {
    const start = dayIndex * slots;
    const dayPlaces = selectedPlaces.slice(start, start + slots);
    const food = dishes[dayIndex % dishes.length];
    const experience = experiences[dayIndex % experiences.length];
    return {
      day: dayIndex + 1,
      title: dayIndex === 0 ? "Cape icons and town core" : dayIndex === 1 ? "Heritage or nature day trip" : "Slow coast and local life",
      places: dayPlaces,
      food,
      experience,
    };
  });
}

export default function Itinerary() {
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(8000);
  const [month, setMonth] = useState("Oct");
  const [pace, setPace] = useState<Pace>("Balanced");
  const [travelMode, setTravelMode] = useState<TravelMode>("Cab");
  const [interests, setInterests] = useState<Interest[]>(["Spiritual", "Heritage", "Beach"]);
  const [generated, setGenerated] = useState(false);

  const plan = useMemo(() => buildDayPlan(days, interests, pace), [days, interests, pace]);
  const chosenWeather = monthWeather.find((w) => w.month === month) ?? monthWeather[9];
  const perDayBudget = Math.round(budget / days);
  const transportCost = travelMode === "Cab" ? 2200 : travelMode === "Bus" ? 300 : 700;
  const stayCost = Math.round(perDayBudget * 0.45);
  const foodCost = Math.round(perDayBudget * 0.25);
  const activityCost = Math.max(perDayBudget - stayCost - foodCost - transportCost, 0);

  const toggleInterest = (interest: Interest) => {
    setInterests((current) =>
      current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest],
    );
  };

  return (
    <div className="bg-[#f8f7f2]">
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Plan your trip</p>
            <h1 className="mt-2 font-display text-5xl font-bold">Kanyakumari trip planner</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Build a day-wise plan with places to visit, weather context, how to reach, local food, experiences, rough budget and transport style. A 2-3 day trip is ideal for the rock memorial, Thiruvalluvar Statue, beaches, temples and one inland day trip.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Southernmost Tip", "Spectacular Sunsets", "Vivekananda Rock", "Thiruvalluvar Statue", "Cape Festival", "Padmanabhapuram Palace"].map((tag) => (
                <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#4d463b] shadow-sm">{tag}</span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 shadow-soft">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Best time</p>
              <p className="mt-2 font-display text-2xl font-bold">Oct - Mar</p>
              <p className="mt-1 text-sm text-muted-foreground">Clearer skies and easier sightseeing.</p>
            </div>
            <div className="bg-white p-5 shadow-soft">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Usual duration</p>
              <p className="mt-2 font-display text-2xl font-bold">2-3 days</p>
              <p className="mt-1 text-sm text-muted-foreground">Town core plus one day trip.</p>
            </div>
            <div className="bg-white p-5 shadow-soft">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Current plan</p>
              <p className="mt-2 font-display text-2xl font-bold">{days} days</p>
              <p className="mt-1 text-sm text-muted-foreground">Rs. {budget.toLocaleString()} per person.</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="builder" className="mt-10">
          <TabsList className="h-auto flex-wrap justify-start rounded-none bg-transparent p-0">
            {[
              ["builder", "Create trip"],
              ["weather", "Weather"],
              ["reach", "How to reach"],
              ["ideas", "Things to do"],
            ].map(([value, label]) => (
              <TabsTrigger key={value} value={value} className="rounded-none border border-border bg-white px-5 py-3 data-[state=active]:bg-[#1f5f3b] data-[state=active]:text-white">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="builder" className="mt-8">
            <div className="grid gap-8 lg:grid-cols-[390px_1fr]">
              <aside className="h-fit space-y-6 bg-white p-6 shadow-soft">
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold"><Calendar className="h-4 w-4 text-primary" /> Days</label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((day) => (
                      <button key={day} onClick={() => setDays(day)} className={`py-2 text-sm font-semibold ${days === day ? "bg-[#1f5f3b] text-white" : "bg-muted"}`}>{day}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold"><CloudSun className="h-4 w-4 text-primary" /> Travel month</label>
                  <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full border border-border bg-white px-3 py-2 text-sm">
                    {monthWeather.map((w) => <option key={w.month} value={w.month}>{w.month} - {w.note}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold"><Wallet className="h-4 w-4 text-primary" /> Budget: Rs. {budget.toLocaleString()}</label>
                  <input type="range" min={3000} max={30000} step={500} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full accent-primary" />
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground"><span>Rs. 3k</span><span>Rs. 30k</span></div>
                </div>

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold"><Compass className="h-4 w-4 text-primary" /> Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map((interest) => (
                      <button key={interest} onClick={() => toggleInterest(interest)} className={`px-3 py-1.5 text-xs font-semibold ${interests.includes(interest) ? "bg-[#d9a441] text-[#241707]" : "bg-muted"}`}>{interest}</button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="text-sm font-semibold">
                    Pace
                    <select value={pace} onChange={(e) => setPace(e.target.value as Pace)} className="mt-1 w-full border border-border bg-white px-3 py-2 text-sm">
                      <option>Relaxed</option>
                      <option>Balanced</option>
                      <option>Packed</option>
                    </select>
                  </label>
                  <label className="text-sm font-semibold">
                    Transport
                    <select value={travelMode} onChange={(e) => setTravelMode(e.target.value as TravelMode)} className="mt-1 w-full border border-border bg-white px-3 py-2 text-sm">
                      <option>Cab</option>
                      <option>Bus</option>
                      <option>Train</option>
                    </select>
                  </label>
                </div>

                <Button variant="hero" className="w-full" onClick={() => setGenerated(true)}>
                  <Sparkles className="h-4 w-4" /> Create trip
                </Button>
              </aside>

              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    ["Weather", `${chosenWeather.temp}`, chosenWeather.note],
                    ["Stay/day", `Rs. ${stayCost.toLocaleString()}`, "Hotel or homestay estimate"],
                    ["Food/day", `Rs. ${foodCost.toLocaleString()}`, "Meals and snacks"],
                    ["Activities/day", `Rs. ${activityCost.toLocaleString()}`, "Tickets, ferry, local stops"],
                  ].map(([label, value, note]) => (
                    <div key={label} className="bg-white p-4 shadow-soft">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className="mt-1 font-display text-xl font-bold">{value}</p>
                      <p className="text-xs text-muted-foreground">{note}</p>
                    </div>
                  ))}
                </div>

                {!generated ? (
                  <div className="min-h-[360px] border-2 border-dashed border-border bg-white p-10 text-center">
                    <Sparkles className="mx-auto h-10 w-10 text-primary" />
                    <h2 className="mt-3 font-display text-2xl font-bold">Your day-wise plan appears here</h2>
                    <p className="mx-auto mt-2 max-w-md text-muted-foreground">Set days, month, budget, pace and interests, then create a trip.</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {plan.map((day) => (
                      <article key={day.day} className="overflow-hidden bg-white shadow-soft">
                        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1f5f3b] px-6 py-4 text-white">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-white/75">Day {day.day}</p>
                            <h2 className="font-display text-2xl font-bold">{day.title}</h2>
                          </div>
                          <span className="text-sm font-semibold">~ Rs. {perDayBudget.toLocaleString()} / person</span>
                        </div>
                        <div className="grid md:grid-cols-[1fr_280px]">
                          <div className="divide-y divide-border">
                            {day.places.map((place, index) => (
                              <div key={`${day.day}-${place.id}`} className="flex gap-4 p-5">
                                <img src={place.image} alt={place.name} className="h-20 w-24 flex-shrink-0 object-cover" />
                                <div>
                                  <p className="text-xs font-bold uppercase tracking-wider text-primary">{index === 0 ? "Morning" : index === 1 ? "Afternoon" : index === 2 ? "Evening" : "Extra stop"}</p>
                                  <h3 className="font-display text-lg font-semibold">{place.name}</h3>
                                  <p className="text-sm text-muted-foreground">{place.tagline}</p>
                                  <p className="mt-1 text-xs text-muted-foreground">{place.distance} · {place.duration}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <aside className="border-t border-border p-5 md:border-l md:border-t-0">
                            <h3 className="font-display text-lg font-bold">Add-ons</h3>
                            <p className="mt-3 text-sm"><span className="font-semibold">Food:</span> {day.food.name}</p>
                            <p className="text-xs text-muted-foreground">{day.food.whereToTry}</p>
                            <p className="mt-4 text-sm"><span className="font-semibold">Experience:</span> {day.experience.title}</p>
                            <p className="text-xs text-muted-foreground">{day.experience.duration} · {day.experience.category}</p>
                          </aside>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weather" className="mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {monthWeather.map((w) => (
                <button key={w.month} onClick={() => setMonth(w.month)} className={`bg-white p-5 text-left shadow-soft ${month === w.month ? "ring-2 ring-[#1f5f3b]" : ""}`}>
                  <p className="font-display text-2xl font-bold uppercase">{w.month}</p>
                  <p className="mt-1 text-lg font-semibold">{w.temp}</p>
                  <p className="text-xs text-muted-foreground">AQI {w.aqi}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{w.note}</p>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reach" className="mt-8">
            <div className="grid md:grid-cols-3 gap-5">
              {howToReach.map((item) => (
                <div key={item.mode} className="bg-white p-6 shadow-soft">
                  <item.icon className="h-8 w-8 text-primary" />
                  <h2 className="mt-4 font-display text-2xl font-bold">By {item.mode}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-white p-6 shadow-soft">
              <h2 className="font-display text-2xl font-bold">Local transport</h2>
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                {[
                  [Car, "Cab / taxi", "Best for Padmanabhapuram, Thirparappu, Mathur and Pechiparai day trips."],
                  [Bus, "TNSTC buses", "Budget option for Nagercoil, Suchindram and several district routes."],
                  [Train, "Rail", "Useful for arrival and onward travel; Kanyakumari is a major rail terminus."],
                ].map(([Icon, title, text]) => {
                  const TransportIcon = Icon as typeof Car;
                  return (
                    <div key={title as string} className="border border-border p-4">
                      <TransportIcon className="h-5 w-5 text-primary" />
                      <p className="mt-2 font-semibold">{title as string}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{text as string}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ideas" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {experiences.slice(0, 6).map((experience) => (
                <article key={experience.id} className="overflow-hidden bg-white shadow-soft">
                  <img src={experience.image} alt={experience.title} className="h-48 w-full object-cover" />
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">{experience.category}</p>
                    <h2 className="mt-1 font-display text-xl font-bold">{experience.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{experience.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 bg-white p-6 shadow-soft">
              <h2 className="font-display text-2xl font-bold">Upcoming festival ideas</h2>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                {events.slice(0, 4).map((event) => (
                  <div key={event.id} className="flex gap-4 border border-border p-4">
                    <img src={event.image} alt={event.title} className="h-20 w-24 object-cover" />
                    <div>
                      <p className="text-xs font-semibold text-primary">{event.month}</p>
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-xs text-muted-foreground"><MapPin className="mr-1 inline h-3 w-3" /> {event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
