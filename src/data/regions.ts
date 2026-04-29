import villageImg from "@/assets/region-village.jpg";
import hillsImg from "@/assets/region-hills.jpg";
import beachImg from "@/assets/place-beach.jpg";
import templeImg from "@/assets/place-temple.jpg";

export type Region = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  highlights: string[];
};

export const regions: Region[] = [
  {
    id: "coast",
    name: "The Coast",
    tagline: "Where three seas meet — golden sand, sunrise & sunset",
    image: beachImg,
    highlights: ["Triveni Sangam", "Sunset Point", "Sothavilai Beach"],
  },
  {
    id: "temple-town",
    name: "Temple Town",
    tagline: "Living traditions, ancient shrines and festival processions",
    image: templeImg,
    highlights: ["Kumari Amman", "Suchindram Temple", "Nagaraja Temple"],
  },
  {
    id: "western-ghats",
    name: "Western Ghats Foothills",
    tagline: "Rolling hills, waterfalls and tribal heartland",
    image: hillsImg,
    highlights: ["Pechiparai Dam", "Maramalai", "Olakaruvi Falls"],
  },
  {
    id: "fishing-villages",
    name: "Fishing Villages",
    tagline: "Wooden catamarans, dawn auctions, coastal kitchens",
    image: villageImg,
    highlights: ["Manakudy", "Muttom", "Colachel"],
  },
];

export type TransportOption = {
  mode: string;
  description: string;
  cost: string;
  bestFor: string;
};

export const transport: TransportOption[] = [
  { mode: "Local Bus (TNSTC)", description: "Frequent buses from Kanyakumari Bus Stand to all major spots in the district.", cost: "₹10 – ₹40", bestFor: "Budget travel & locals" },
  { mode: "Auto Rickshaw", description: "Easy short-distance rides; share-autos run on fixed routes.", cost: "₹40 – ₹250", bestFor: "Town & temple hopping" },
  { mode: "Cab / Taxi", description: "Pre-paid taxis at the railway station; app cabs limited.", cost: "₹12 – ₹15 / km", bestFor: "Day trips to Padmanabhapuram, Thirparappu" },
  { mode: "Train", description: "Kanyakumari is a major terminus on Southern Railway.", cost: "Varies", bestFor: "Arriving from Chennai / Trivandrum" },
  { mode: "Ferry", description: "Government ferry to Vivekananda Rock & Thiruvalluvar Statue.", cost: "₹50 round-trip", bestFor: "Island visits" },
];

export type WeatherSlot = {
  month: string;
  temp: string;
  rain: string;
  vibe: string;
  recommended: boolean;
};

export const weather: WeatherSlot[] = [
  { month: "Oct – Feb", temp: "20–28°C", rain: "Low", vibe: "Cool, clear skies — peak season", recommended: true },
  { month: "Mar – May", temp: "27–35°C", rain: "Low", vibe: "Hot but festive — Chitra Pournami", recommended: false },
  { month: "Jun – Sep", temp: "24–30°C", rain: "Moderate", vibe: "Lush green hills, fewer crowds", recommended: false },
];

export const stats = [
  { value: "60+", label: "Verified attractions" },
  { value: "120+", label: "Local hosts & vendors" },
  { value: "4", label: "Languages supported" },
  { value: "100%", label: "Community-owned listings" },
];
