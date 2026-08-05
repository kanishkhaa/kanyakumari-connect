import { useEffect, useState } from "react";
import { Bus, Calendar, CloudSun, Compass, Navigation, Sparkles, Wallet, Loader2, Search, ExternalLink, MapPin, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/i18n/I18nContext";
import { generateGeminiItinerary, ItineraryDay } from "@/lib/gemini";
import { Link } from "react-router-dom";
import { places } from "@/data/places";

type Interest = "Spiritual" | "Nature" | "Heritage" | "Food" | "Beach";
type Pace = "Relaxed" | "Balanced" | "Packed";
type TravelMode = "Cab" | "Bus";

type JourneyLandmark = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  nearby: string[];
};

type SavedTripRoute = {
  start: RouteLocation;
  end: RouteLocation;
  stops: JourneyLandmark[];
};

type RouteLocation = {
  id: string;
  name: string;
  mapQuery: string;
  landmark?: JourneyLandmark;
};

type TripHistoryItem = {
  id: string;
  days: number;
  budget: number;
  route: SavedTripRoute;
  savedAt: string;
  itinerary: ItineraryDay[];
};

const journeyLandmarks: JourneyLandmark[] = [
  { id: "vivekananda-rock-memorial", name: "Vivekananda Rock Memorial", lat: 8.0778, lon: 77.5550, nearby: ["glass-bridge-kanyakumari", "thiruvalluvar-statue"] },
  { id: "glass-bridge-kanyakumari", name: "Kanyakumari Glass Bridge", lat: 8.0777, lon: 77.5540, nearby: ["vivekananda-rock-memorial", "thiruvalluvar-statue"] },
  { id: "thiruvalluvar-statue", name: "Thiruvalluvar Statue", lat: 8.0771, lon: 77.5530, nearby: ["glass-bridge-kanyakumari", "vivekananda-rock-memorial"] },
  { id: "devi-kanyakumari-temple", name: "Kumari Amman Temple", lat: 8.0796, lon: 77.5510, nearby: ["gandhi-mandapam", "vivekananda-rock-memorial"] },
  { id: "gandhi-mandapam", name: "Gandhi Mandapam", lat: 8.0808, lon: 77.5520, nearby: ["devi-kanyakumari-temple", "vivekananda-rock-memorial"] },
  { id: "kamarajar-mani-mandapam", name: "Kamarajar Mani Mandapam", lat: 8.0820, lon: 77.5517, nearby: ["gandhi-mandapam", "devi-kanyakumari-temple"] },
  { id: "vattakottai-fort", name: "Vattakottai Fort", lat: 8.1276, lon: 77.5634, nearby: ["kanyakumari-beach", "vivekananda-rock-memorial"] },
  { id: "padmanabhapuram-palace", name: "Padmanabhapuram Palace", lat: 8.2444, lon: 77.3294, nearby: ["mathur-aqueduct", "thirparappu-falls"] },
  { id: "thirparappu-falls", name: "Thirparappu Falls", lat: 8.3922, lon: 77.2575, nearby: ["mathur-aqueduct", "pechiparai-dam"] },
  { id: "mathur-aqueduct", name: "Mathur Aqueduct", lat: 8.3465, lon: 77.3052, nearby: ["padmanabhapuram-palace", "thirparappu-falls"] },
];

const distanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const radians = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const latDelta = radians(lat2 - lat1);
  const lonDelta = radians(lon2 - lon1);
  const a = Math.sin(latDelta / 2) ** 2 + Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(lonDelta / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const routeLocations: RouteLocation[] = places
  .map((place) => ({
    id: place.id,
    name: place.name,
    mapQuery: place.mapQuery ?? `${place.name}, Kanyakumari, Tamil Nadu`,
    landmark: journeyLandmarks.find((landmark) => landmark.id === place.id),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const resolveRouteLocation = (id: string) => routeLocations.find((location) => location.id === id) ?? null;

const distanceFromRouteKm = (point: JourneyLandmark, start: JourneyLandmark, end: JourneyLandmark) => {
  const latitudeScale = 111;
  const longitudeScale = 111 * Math.cos(((start.lat + end.lat) / 2 * Math.PI) / 180);
  const routeX = (end.lon - start.lon) * longitudeScale;
  const routeY = (end.lat - start.lat) * latitudeScale;
  const pointX = (point.lon - start.lon) * longitudeScale;
  const pointY = (point.lat - start.lat) * latitudeScale;
  const routeLengthSquared = routeX ** 2 + routeY ** 2;
  const progress = routeLengthSquared === 0 ? 0 : Math.max(0, Math.min(1, (pointX * routeX + pointY * routeY) / routeLengthSquared));
  return Math.hypot(pointX - progress * routeX, pointY - progress * routeY);
};

const findRouteStops = (start: JourneyLandmark, end: JourneyLandmark) =>
  journeyLandmarks
    .filter((landmark) => landmark.id !== start.id && landmark.id !== end.id)
    .map((landmark) => ({ landmark, distance: distanceFromRouteKm(landmark, start, end) }))
    .filter(({ distance }) => distance <= 12)
    .sort((a, b) => a.distance - b.distance)
    .map(({ landmark }) => landmark);

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

type BusService = {
  route: string;
  routeNo: string;
  services: number;
  duration: string;
  fare: string;
};

// TNSTC Nagercoil Region - Sectorwise Mofussil Services (source schedule: 2018).
const busServices: BusService[] = [
  ["Nagercoil - Thiruvananthapuram", "451FP", 29, "2h 00m", "Rs. 72"],
  ["Colachel - Thiruvananthapuram", "453", 1, "2h 00m", "Rs. 69"],
  ["Colachel - Thiruvananthapuram", "454", 1, "2h 30m", "Rs. 61"],
  ["Thengapattinam - Thiruvananthapuram", "455", 1, "2h 00m", "Rs. 51"],
  ["Kollencode - Thiruvananthapuram", "456", 1, "2h 00m", "Rs. 42"],
  ["Pechiparai - Thiruvananthapuram", "457", 1, "2h 30m", "Rs. 58"],
  ["Thirparappu - Thiruvananthapuram", "458", 1, "2h 30m", "Rs. 55"],
  ["Manavalakurichy - Thiruvananthapuram", "463", 1, "2h 30m", "Rs. 71"],
  ["Kanyakumari - Thiruvananthapuram", "475", 1, "3h 00m", "Rs. 96"],
  ["Kanyakumari - Nedumangad", "450", 1, "3h 00m", "Rs. 102"],
  ["Nagercoil - Thanjavur (bypass rider)", "505-TAN", 2, "10h 00m", "Rs. 313"],
  ["Marthandam - Coimbatore", "505-CBE", 6, "11h 20m", "Rs. 378"],
  ["Nagercoil - Dindigul", "505-DIN", 5, "7h 25m", "Rs. 248"],
  ["Nagercoil - Tiruppur", "505/TPR", 5, "10h 00m", "Rs. 336"],
  ["Kanyakumari - Rameswaram (via Madurai)", "505/RAME", 1, "9h 50m", "Rs. 339"],
  ["Kanyakumari - Rameswaram (via Thoothukudi)", "579/RAME", 2, "8h 00m", "Rs. 257"],
  ["Nagercoil - Tiruchirappalli (via Madurai)", "505-TRI", 3, "8h 55m", "Rs. 289"],
  ["Kaliakkavilai - Salem (via Madurai)", "505-SLM", 2, "11h 40m", "Rs. 413"],
  ["Nagercoil - Palani (via Madurai)", "505-PAL", 2, "9h 00m", "Rs. 284"],
  ["Nagercoil - Kodaikanal (via Madurai)", "505-KOD", 2, "9h 40m", "Rs. 288"],
  ["Kaliakkavilai - Velankanni (via Thoothukudi)", "505-VKI", 2, "12h 50m", "Rs. 405"],
  ["Nagercoil - Periakulam (via Madurai)", "505/PERI", 1, "7h 30m", "Rs. 261"],
  ["Monday Market - Karaikudi (via Madurai)", "505K", 1, "9h 25m", "Rs. 268"],
  ["Nagercoil - Kumuli (via Rajapalayam, Theni)", "622", 7, "6h 55m", "Rs. 271"],
  ["Nagercoil - Madurai (bypass rider via Tirunelveli)", "505-EXP", 4, "4h 40m", "Rs. 218"],
  ["Nagercoil - Madurai", "505", 11, "5h 00m", "Rs. 192"],
  ["Nagercoil - Papanasam (via Cheranmahadevi)", "567", 2, "4h 00m", "Rs. 80"],
  ["Nagercoil - Sivakasi (via Sattur)", "585X", 2, "4h 30m", "Rs. 141"],
  ["Nagercoil - Tirunelveli (via Eruvadi)", "564-PP", 11, "1h 00m", "Rs. 59"],
  ["Nagercoil - Tirunelveli (end to end)", "565-EE", 20, "1h 15m", "Rs. 66"],
  ["Nagercoil - Tirunelveli (via Nanguneri)", "565-PP", 11, "1h 45m", "Rs. 67"],
  ["Nagercoil - Thoothukudi (via Tirunelveli)", "579", 4, "3h 00m", "Rs. 102"],
  ["Nagercoil - Thiruchendur (via Tirunelveli)", "586", 2, "3h 00m", "Rs. 108"],
  ["Nagercoil - Thiruchendur (via Valliyoor)", "576", 22, "3h 15m", "Rs. 87"],
  ["Nagercoil - Thoothukudi (via Koodankulam)", "570", 10, "4h 00m", "Rs. 117"],
  ["Nagercoil - Thoothukudi (via Valliyoor)", "595", 11, "4h 15m", "Rs. 115"],
  ["Marthandam - Nagercoil", "311-LSS", 9, "1h 00m", "Rs. 24"],
].map(([route, routeNo, services, duration, fare]) => ({ route, routeNo, services, duration, fare }));

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
  const [saveChoice, setSaveChoice] = useState<"idle" | "asking" | "route">("idle");
  const [routeStart, setRouteStart] = useState("vivekananda-rock-memorial");
  const [routeEnd, setRouteEnd] = useState("vattakottai-fort");
  const [savedRoute, setSavedRoute] = useState<SavedTripRoute | null>(null);
  const [tripHistory, setTripHistory] = useState<TripHistoryItem[]>([]);
  const [routeError, setRouteError] = useState("");
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [journeyStatus, setJourneyStatus] = useState("Save your trip to start location-aware recommendations.");
  const [currentLandmark, setCurrentLandmark] = useState<JourneyLandmark | null>(null);
  const [nearbyLandmarks, setNearbyLandmarks] = useState<JourneyLandmark[]>([]);
  const [busQuery, setBusQuery] = useState("");
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
  const matchingBuses = busServices.filter((bus) =>
    `${bus.route} ${bus.routeNo}`.toLowerCase().includes(busQuery.trim().toLowerCase()),
  );

  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem("kanyakumari-trip-history") ?? "[]") as TripHistoryItem[];
      if (Array.isArray(savedHistory)) setTripHistory(savedHistory);
    } catch {
      localStorage.removeItem("kanyakumari-trip-history");
    }
  }, []);

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
      setSaveChoice("asking");
      setSavedRoute(null);
      setJourneyStarted(false);
      setNearbyLandmarks([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  const updateJourneyLocation = (coords: GeolocationCoordinates) => {
    const ranked = journeyLandmarks
      .map((landmark) => ({ landmark, distance: distanceKm(coords.latitude, coords.longitude, landmark.lat, landmark.lon) }))
      .sort((a, b) => a.distance - b.distance);
    const nearest = ranked[0];
    const nearby = nearest && nearest.distance <= 2 ? nearest.landmark : null;
    const suggestions = nearby
      ? nearby.nearby.map((id) => journeyLandmarks.find((landmark) => landmark.id === id)).filter((landmark): landmark is JourneyLandmark => Boolean(landmark))
      : ranked.slice(0, 3).map(({ landmark }) => landmark);

    setCurrentLandmark(nearby);
    setNearbyLandmarks(suggestions);
    setJourneyStatus(nearby
      ? `You're near ${nearby.name}. Your AI concierge has refreshed suggestions for this stop.`
      : "You're on the move. Here are the closest places in your current area.");
  };

  const saveTripRoute = () => {
    const start = resolveRouteLocation(routeStart);
    const end = resolveRouteLocation(routeEnd);
    if (!start || !end) {
      setRouteError("Choose both locations from the list to save your route.");
      return;
    }
    if (start.id === end.id) {
      setRouteError("Choose different start and destination locations.");
      return;
    }
    // Recommendations are only shown from the curated, geocoded landmark set.
    // This avoids presenting an unrelated stop when a selected place has no verified route coordinate yet.
    const stops = start.landmark && end.landmark ? findRouteStops(start.landmark, end.landmark) : [];
    const route = { start, end, stops };
    const trip: TripHistoryItem = {
      id: `${Date.now()}`,
      days,
      budget,
      route,
      savedAt: new Date().toISOString(),
      itinerary: aiDays,
    };
    const nextHistory = [trip, ...tripHistory].slice(0, 10);
    setSavedRoute(route);
    setTripHistory(nextHistory);
    setSaveChoice("route");
    setRouteError("");
    setJourneyStarted(false);
    setNearbyLandmarks(stops);
    setJourneyStatus(stops.length
      ? `Your ${start.name} to ${end.name} route is saved. These curated stops are close to the way.`
      : `Your ${start.name} to ${end.name} route is saved. The map shows the selected route; verified stop suggestions are currently available for our mapped landmark locations.`);
    localStorage.setItem("kanyakumari-active-trip", JSON.stringify(trip));
    localStorage.setItem("kanyakumari-trip-history", JSON.stringify(nextHistory));
  };

  const openSavedTrip = (trip: TripHistoryItem) => {
    setDays(trip.days);
    setBudget(trip.budget);
    setAiDays(trip.itinerary);
    setRouteStart(trip.route.start.id);
    setRouteEnd(trip.route.end.id);
    setSavedRoute(trip.route);
    setNearbyLandmarks(trip.route.stops);
    setGenerated(true);
    setSaveChoice("route");
    setJourneyStarted(false);
    setCurrentLandmark(null);
    setRouteError("");
    setJourneyStatus(`Viewing your saved ${trip.route.start.name} to ${trip.route.end.name} trip.`);
  };

  useEffect(() => {
    if (!journeyStarted || !navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => updateJourneyLocation(coords),
      () => setJourneyStatus("Location access is needed to recommend places as you travel."),
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 15000 },
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [journeyStarted]);

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
                      {lang === "ta" ? "AI உருவாக்குகிறது..." : "Generating with AI..."}
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
                    <h2 className="font-display text-2xl font-bold">{lang === "ta" ? "உங்கள் நாள்வாரியான AI திட்டம் இங்கே தோன்றும்" : "Your AI Custom Trip Plan Appears Here"}</h2>
                    <p className="mt-2 max-w-md text-muted-foreground">{lang === "ta" ? "நாட்கள், பட்ஜெட் மற்றும் விருப்பங்களை தேர்வுசெய்து AI பயண திட்டத்தை உருவாக்குங்கள்." : "Select your preferences and click 'Generate Custom Trip with AI'."}</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <section className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
                      {saveChoice === "asking" ? (
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h2 className="font-display text-xl font-bold">Save this trip and start your journey?</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Save it to get an AI-guided map of worthwhile tourist places along your route.</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="hero" onClick={() => setSaveChoice("route")}><Navigation className="h-4 w-4" /> Yes, save trip</Button>
                            <Button variant="outline" onClick={() => setSaveChoice("idle")}>Not now</Button>
                          </div>
                        </div>
                      ) : saveChoice === "route" && !savedRoute ? (
                        <div>
                          <div className="flex items-center gap-2 text-primary"><Route className="h-5 w-5" /><h2 className="font-display text-xl font-bold">Set up your saved route</h2></div>
                          <p className="mt-1 text-sm text-muted-foreground">Tell us where you are starting and where you are going. The AI route assistant will add tourist stops that are near the way.</p>
                          <div className="mt-4 grid gap-3 md:grid-cols-2">
                            <label className="text-sm font-semibold">Start location
                              <select value={routeStart} onChange={(event) => setRouteStart(event.target.value)} className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 font-normal">
                                {routeLocations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                              </select>
                            </label>
                            <label className="text-sm font-semibold">Destination
                              <select value={routeEnd} onChange={(event) => setRouteEnd(event.target.value)} className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 font-normal">
                                {routeLocations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                              </select>
                            </label>
                          </div>
                          {routeError && <p className="mt-3 text-sm font-medium text-destructive">{routeError}</p>}
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button variant="hero" onClick={saveTripRoute}><MapPin className="h-4 w-4" /> Save trip & show route map</Button>
                            <Button variant="outline" onClick={() => setSaveChoice("asking")}>Back</Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-2 text-primary"><Navigation className="h-5 w-5 animate-pulse" /><h2 className="font-display text-xl font-bold">Journey assistant is active</h2></div>
                          <p className="mt-1 text-sm text-muted-foreground">{journeyStatus}</p>
                          {savedRoute && (
                            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-background">
                              <iframe
                                title="Saved trip route map"
                                className="h-64 w-full border-0"
                                loading="lazy"
                                src={`https://www.google.com/maps?saddr=${encodeURIComponent(savedRoute.start.mapQuery)}&daddr=${encodeURIComponent(savedRoute.end.mapQuery)}&output=embed`}
                              />
                              <div className="border-t border-border p-3 text-xs text-muted-foreground">Route: <span className="font-semibold text-foreground">{savedRoute.start.name}</span> to <span className="font-semibold text-foreground">{savedRoute.end.name}</span>. Pins shown are recommended nearby stops along this route.</div>
                            </div>
                          )}
                          {currentLandmark && <p className="mt-3 text-sm font-semibold">At {currentLandmark.name}? Next, consider these nearby places:</p>}
                          {nearbyLandmarks.length > 0 && (
                            <div className="mt-3 grid gap-2 sm:grid-cols-2">
                              {nearbyLandmarks.map((landmark, index) => (
                                <Link key={landmark.id} to={`/places/${landmark.id}`} className="flex items-center gap-2 rounded-xl border border-primary/30 bg-background px-3 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs">{index + 1}</span>
                                  Visit {landmark.name}
                                </Link>
                              ))}
                            </div>
                          )}
                          {savedRoute && nearbyLandmarks.length === 0 && (
                            <p className="mt-3 rounded-lg border border-border bg-background p-3 text-sm text-muted-foreground">
                              This route is saved and can be revisited below. Stop suggestions are shown only when both selected places have verified coordinates in our curated route data.
                            </p>
                          )}
                        </div>
                      )}
                      {saveChoice === "idle" && <p className="mt-3 text-xs text-muted-foreground">Trip not saved. Generate another plan whenever you are ready.</p>}
                    </section>
                    {tripHistory.length > 0 && (
                      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <div>
                            <h2 className="font-display text-xl font-bold">Saved trip history</h2>
                            <p className="text-sm text-muted-foreground">Your last {tripHistory.length} saved trip{tripHistory.length === 1 ? "" : "s"}.</p>
                          </div>
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                          {tripHistory.map((trip) => (
                            <button key={trip.id} type="button" onClick={() => openSavedTrip(trip)} className="rounded-xl border border-border bg-background p-4 text-left transition-smooth hover:border-primary hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary">
                              <p className="text-xs font-semibold uppercase tracking-wider text-primary">{new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(trip.savedAt))}</p>
                              <h3 className="mt-1 font-semibold">{trip.route.start.name} to {trip.route.end.name}</h3>
                              <p className="mt-1 text-sm text-muted-foreground">{trip.days} days · Rs. {trip.budget.toLocaleString()} budget · {trip.route.stops.length} recommended stop{trip.route.stops.length === 1 ? "" : "s"}</p>
                              <span className="mt-3 inline-flex text-sm font-semibold text-primary">Open saved route →</span>
                            </button>
                          ))}
                        </div>
                      </section>
                    )}
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

              <section className="overflow-hidden bg-card border border-border rounded-2xl shadow-soft">
                <div className="border-b border-border p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <Bus className="h-6 w-6 text-primary" />
                        <h3 className="font-display text-xl font-bold">Available buses</h3>
                      </div>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        TNSTC Nagercoil Region mofussil services from the supplied schedule. Fares, timings and service counts can change - confirm your journey before travel.
                      </p>
                    </div>
                    <a
                      href="https://www.kkbustime.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-primary px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      Check current bus times <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <label className="relative mt-5 block max-w-xl">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="search"
                      value={busQuery}
                      onChange={(event) => setBusQuery(event.target.value)}
                      placeholder="Search a town or route number..."
                      className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm outline-none ring-primary focus:ring-2"
                    />
                  </label>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
                      <tr><th className="px-6 py-3 font-semibold">Route</th><th className="px-4 py-3 font-semibold">No.</th><th className="px-4 py-3 font-semibold">Daily services</th><th className="px-4 py-3 font-semibold">Journey time</th><th className="px-6 py-3 font-semibold text-right">Listed fare</th></tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {matchingBuses.map((bus) => (
                        <tr key={`${bus.routeNo}-${bus.route}`} className="transition-colors hover:bg-muted/40">
                          <td className="px-6 py-3.5 font-medium">{bus.route}</td><td className="px-4 py-3.5 text-muted-foreground">{bus.routeNo}</td><td className="px-4 py-3.5">{bus.services}</td><td className="px-4 py-3.5">{bus.duration}</td><td className="px-6 py-3.5 text-right font-semibold text-primary">{bus.fare}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {matchingBuses.length === 0 && <p className="p-8 text-center text-sm text-muted-foreground">No matching services in this schedule.</p>}
                </div>
                <p className="border-t border-border px-6 py-3 text-xs text-muted-foreground">Schedule source: TNSTC Tirunelveli Limited, Nagercoil Region sectorwise mofussil services (2018).</p>
              </section>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
