import { useEffect, useState } from "react";
import { Bus, Calendar, CloudSun, Compass, Navigation, Sparkles, Wallet, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/i18n/I18nContext";
import { generateGeminiItinerary, ItineraryDay } from "@/lib/gemini";

type Interest = "Spiritual" | "Nature" | "Heritage" | "Food" | "Beach";
type Pace = "Relaxed" | "Balanced" | "Packed";
type TravelMode = "Cab" | "Bus";

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
  {
    icon: Bus,
    mode: "Road",
    text:
      "Kanyakumari is well connected by road through Nagercoil, Tirunelveli, Madurai and Thiruvananthapuram. TNSTC and SETC buses operate regular services to Kanyakumari, with Nagercoil as the strongest district hub for onward local buses.",
  },
];

type LiveWeather = {
  status: string;
  place: string;
  temperature?: number;
  feelsLike?: number;
  humidity?: number;
  wind?: number;
  code?: number;
  forecast?: Array<{ date: string; max: number; min: number; rain: number; code: number }>;
};

function weatherLabel(code?: number) {
  if (code === undefined) return "Seasonal weather";
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy / hazy";
  if (code <= 67) return "Rainy showers";
  if (code <= 82) return "Heavy rain";
  return "Thunderstorm";
}

export default function Itinerary() {
  const { lang, t } = useI18n();
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(8000);
  const [month, setMonth] = useState("Oct");
  const [pace, setPace] = useState<Pace>("Balanced");
  const [travelMode, setTravelMode] = useState<TravelMode>("Cab");
  const [interests, setInterests] = useState<Interest[]>(["Spiritual", "Heritage", "Beach"]);
  const [aiDays, setAiDays] = useState<ItineraryDay[]>([]);
  const [loadingAi, setLoadingAi] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [liveWeather, setLiveWeather] = useState<LiveWeather>({
    status: "Detecting your location for live weather...",
    place: "Your location",
  });

  const chosenWeather = monthWeather.find((w) => w.month === month) ?? monthWeather[9];
  const perDayBudget = Math.round(budget / days);
  const transportCost = travelMode === "Cab" ? 2200 : 300;
  const stayCost = Math.round(perDayBudget * 0.45);
  const foodCost = Math.round(perDayBudget * 0.25);
  const activityCost = Math.max(perDayBudget - stayCost - foodCost - transportCost, 0);

  const toggleInterest = (interest: Interest) => {
    setInterests((current) =>
      current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest],
    );
  };

  const generateTrip = async () => {
    setLoadingAi(true);
    try {
      const res = await generateGeminiItinerary({
        days,
        budget: `Rs. ${budget}`,
        pace,
        interests,
        travelMode,
        lang,
      });
      setAiDays(res);
      setGenerated(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  const loadWeather = (coords?: GeolocationCoordinates) => {
    const lat = coords?.latitude ?? 8.0883;
    const lon = coords?.longitude ?? 77.5385;
    const place = coords ? "Your current location" : "Kanyakumari fallback";
    setLiveWeather((current) => ({ ...current, status: "Loading live weather...", place }));

    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", String(lat));
    url.searchParams.set("longitude", String(lon));
    url.searchParams.set("current", "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m");
    url.searchParams.set("daily", "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max");
    url.searchParams.set("forecast_days", "4");
    url.searchParams.set("timezone", "auto");

    fetch(url.toString())
      .then((res) => {
        if (!res.ok) throw new Error("Weather request failed");
        return res.json();
      })
      .then((data) => {
        const current = data.current;
        const daily = data.daily;
        setLiveWeather({
          status: "Live data updated",
          place,
          temperature: current?.temperature_2m,
          feelsLike: current?.apparent_temperature,
          humidity: current?.relative_humidity_2m,
          wind: current?.wind_speed_10m,
          code: current?.weather_code,
          forecast: daily?.time?.map((date: string, index: number) => ({
            date,
            max: daily.temperature_2m_max?.[index],
            min: daily.temperature_2m_min?.[index],
            rain: daily.precipitation_probability_max?.[index],
            code: daily.weather_code?.[index],
          })),
        });
      })
      .catch(() => setLiveWeather((curr) => ({ ...curr, status: "Could not fetch live weather. Using monthly averages." })));
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      loadWeather();
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => loadWeather(coords),
      () => loadWeather(),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{t("nav_plan")}</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">{t("itinerary_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("itinerary_subtitle")}</p>
      </header>

      <div className="mt-10">
        <Tabs defaultValue="builder">
          <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-none border-b border-border bg-transparent p-0">
            {[
              ["builder", lang === "ta" ? "AI பயண திட்டம்" : "AI Trip Planner"],
              ["weather", lang === "ta" ? "வானிலை தகவல்" : "Live Weather"],
              ["reach", lang === "ta" ? "போக்குவரத்து விவரம்" : "How to Reach"],
            ].map(([value, label]) => (
              <TabsTrigger
                key={value}
                value={value}
                className="rounded-none border border-border bg-card px-5 py-3 data-[state=active]:gradient-sunset data-[state=active]:text-primary-foreground font-semibold"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="builder" className="mt-8">
            <div className="grid gap-8 lg:grid-cols-[390px_1fr]">
              <aside className="h-fit space-y-6 bg-card p-6 shadow-soft border border-border rounded-2xl">
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold"><Calendar className="h-4 w-4 text-primary" /> {t("days")}</label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((day) => (
                      <button key={day} onClick={() => setDays(day)} className={`py-2 text-sm font-semibold rounded-lg ${days === day ? "gradient-sunset text-primary-foreground shadow-warm" : "bg-muted"}`}>{day}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold"><CloudSun className="h-4 w-4 text-primary" /> Travel month</label>
                  <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full border border-border bg-background px-3 py-2 text-sm rounded-lg">
                    {monthWeather.map((w) => <option key={w.month} value={w.month}>{w.month} - {w.note}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold"><Wallet className="h-4 w-4 text-primary" /> {t("budget")}: Rs. {budget.toLocaleString()}</label>
                  <input type="range" min={3000} max={30000} step={500} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full accent-primary" />
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground"><span>Rs. 3k</span><span>Rs. 30k</span></div>
                </div>

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold"><Compass className="h-4 w-4 text-primary" /> {t("interests")}</label>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map((interest) => (
                      <button key={interest} onClick={() => toggleInterest(interest)} className={`px-3 py-1.5 text-xs font-semibold rounded-full ${interests.includes(interest) ? "gradient-sunset text-primary-foreground shadow-warm" : "bg-muted text-foreground"}`}>{interest}</button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="text-sm font-semibold">
                    {t("pace")}
                    <select value={pace} onChange={(e) => setPace(e.target.value as Pace)} className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm rounded-lg">
                      <option>Relaxed</option>
                      <option>Balanced</option>
                      <option>Packed</option>
                    </select>
                  </label>
                  <label className="text-sm font-semibold">
                    {t("travel_mode")}
                    <select value={travelMode} onChange={(e) => setTravelMode(e.target.value as TravelMode)} className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm rounded-lg">
                      <option>Cab</option>
                      <option>Bus</option>
                    </select>
                  </label>
                </div>

                <Button variant="hero" size="lg" className="w-full" onClick={generateTrip} disabled={loadingAi}>
                  {loadingAi ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      {lang === "ta" ? "Gemini AI உருவாக்குகிறது..." : "Generating with Gemini AI..."}
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      {t("itinerary_generate_ai")}
                    </>
                  )}
                </Button>
              </aside>

              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    ["Weather", liveWeather.temperature !== undefined ? `${liveWeather.temperature}°C now` : `${chosenWeather.temp}`, liveWeather.temperature !== undefined ? weatherLabel(liveWeather.code) : chosenWeather.note],
                    ["Stay/day", `Rs. ${stayCost.toLocaleString()}`, "Hotel or homestay estimate"],
                    ["Food/day", `Rs. ${foodCost.toLocaleString()}`, "Meals and snacks"],
                    ["Activities/day", `Rs. ${activityCost.toLocaleString()}`, "Tickets, ferry, local stops"],
                  ].map(([label, value, note]) => (
                    <div key={label} className="bg-card p-4 shadow-soft border border-border rounded-xl">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className="mt-1 font-display text-xl font-bold text-primary">{value}</p>
                      <p className="text-xs text-muted-foreground">{note}</p>
                    </div>
                  ))}
                </div>

                {!generated ? (
                  <div className="min-h-[360px] border-2 border-dashed border-border bg-card p-10 text-center rounded-2xl flex flex-col items-center justify-center">
                    <Sparkles className="h-12 w-12 text-primary mb-3 animate-pulse" />
                    <h2 className="font-display text-2xl font-bold">{lang === "ta" ? "உங்கள் நாள்வாரியான AI திட்டம் இங்கே தோன்றும்" : "Your Gemini AI Custom Trip Plan Appears Here"}</h2>
                    <p className="mt-2 max-w-md text-muted-foreground">{lang === "ta" ? "நாட்கள், பட்ஜெட் மற்றும் விருப்பங்களை தேர்வுசெய்து AI பயண திட்டத்தை உருவாக்குங்கள்." : "Select your preferences and click 'Generate Custom Trip with AI'."}</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {aiDays.map((day) => (
                      <article key={day.day} className="overflow-hidden bg-card shadow-soft border border-border rounded-2xl">
                        <div className="flex flex-wrap items-center justify-between gap-3 gradient-sunset px-6 py-4 text-primary-foreground">
                          <div>
                            <p className="text-xs uppercase tracking-widest opacity-90">{lang === "ta" ? `நாள் ${day.day}` : `Day ${day.day}`}</p>
                            <h2 className="font-display text-2xl font-bold">{day.title}</h2>
                          </div>
                          <span className="text-sm font-semibold bg-background/20 backdrop-blur px-3 py-1 rounded-full">~ Rs. {perDayBudget.toLocaleString()} / person</span>
                        </div>
                        <div className="p-6 space-y-4">
                          <div className="grid gap-3">
                            <div className="p-3 bg-muted/50 rounded-xl">
                              <p className="text-xs font-bold uppercase tracking-wider text-primary">{lang === "ta" ? "காலை நேரம்" : "Morning"}</p>
                              <p className="text-sm mt-1">{day.morning}</p>
                            </div>
                            <div className="p-3 bg-muted/50 rounded-xl">
                              <p className="text-xs font-bold uppercase tracking-wider text-primary">{lang === "ta" ? "மதிய நேரம்" : "Afternoon"}</p>
                              <p className="text-sm mt-1">{day.afternoon}</p>
                            </div>
                            <div className="p-3 bg-muted/50 rounded-xl">
                              <p className="text-xs font-bold uppercase tracking-wider text-primary">{lang === "ta" ? "மாலை நேரம்" : "Evening"}</p>
                              <p className="text-sm mt-1">{day.evening}</p>
                            </div>
                          </div>
                          {day.tip && (
                            <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl">
                              <p className="text-xs font-semibold text-primary">💡 {lang === "ta" ? "உள்ளூர் குறிப்பு:" : "Traveler Tip:"}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{day.tip}</p>
                            </div>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weather" className="mt-8">
            <section className="mb-8 bg-card p-6 shadow-soft border border-border rounded-2xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Live weather</p>
                  <h2 className="mt-1 font-display text-3xl font-bold">{liveWeather.place}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{liveWeather.status}</p>
                </div>
                <Button variant="hero" onClick={() => loadWeather()}>
                  <Navigation className="h-4 w-4 mr-2" /> Refresh location
                </Button>
              </div>

              {liveWeather.temperature !== undefined && (
                <div className="mt-6 grid sm:grid-cols-4 gap-4">
                  {[
                    ["Now", `${liveWeather.temperature}°C`, weatherLabel(liveWeather.code)],
                    ["Feels like", `${liveWeather.feelsLike}°C`, "Apparent temperature"],
                    ["Humidity", `${liveWeather.humidity}%`, "Relative humidity"],
                    ["Wind", `${liveWeather.wind} km/h`, "10 m wind speed"],
                  ].map(([label, value, note]) => (
                    <div key={label} className="border border-border p-4 rounded-xl bg-background">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className="mt-1 font-display text-2xl font-bold">{value}</p>
                      <p className="text-xs text-muted-foreground">{note}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </TabsContent>

          <TabsContent value="reach" className="mt-8">
            <div className="space-y-4">
              {howToReach.map((item) => (
                <div key={item.mode} className="bg-card p-6 border border-border rounded-2xl shadow-soft">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-6 w-6 text-primary" />
                    <h3 className="font-display text-xl font-bold">{item.mode}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
