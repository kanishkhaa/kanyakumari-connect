import thaliImg from "@/assets/food-thali.jpg";
import fishImg from "@/assets/food-fishcurry.jpg";
import appamImg from "@/assets/food-appam.jpg";

export type Dish = {
  id: string;
  name: string;
  image: string;
  type: "Veg" | "Non-Veg";
  priceRange: string;
  whereToTry: string;
  description: string;
};

export const dishes: Dish[] = [
  {
    id: "meen-kuzhambu",
    name: "Meen Kuzhambu (Fish Curry)",
    image: fishImg,
    type: "Non-Veg",
    priceRange: "₹180 – ₹350",
    whereToTry: "Hotel Saravana, Sangam Restaurant",
    description:
      "Tangy tamarind-based fish curry with kingfish or seer fish, ground coconut and curry leaves. The signature dish of coastal Kanyakumari.",
  },
  {
    id: "appam-stew",
    name: "Appam with Vegetable Stew",
    image: appamImg,
    type: "Veg",
    priceRange: "₹80 – ₹160",
    whereToTry: "Sri Krishna Bhavan, Annapoorna",
    description:
      "Lacy fermented rice pancakes served with a mild coconut-milk vegetable stew. Classic breakfast across Kanyakumari district.",
  },
  {
    id: "banana-leaf-meals",
    name: "Banana Leaf Meals (Sappadu)",
    image: thaliImg,
    type: "Veg",
    priceRange: "₹120 – ₹250",
    whereToTry: "Hotel Archana, Ariya Bhavan",
    description:
      "Unlimited rice with sambar, rasam, three vegetable poriyals, kootu, appalam, curd and payasam — all served on a fresh banana leaf.",
  },
];

export type Eventt = {
  id: string;
  name: string;
  month: string;
  location: string;
  description: string;
};

export const events: Eventt[] = [
  {
    id: "chitra-pournami",
    name: "Chitra Pournami Festival",
    month: "April – May",
    location: "Kumari Amman Temple",
    description:
      "Full moon festival when the goddess is taken in procession. The diamond nose-ring is said to glow visibly from the sea.",
  },
  {
    id: "vaisakha",
    name: "Vaisakha Festival",
    month: "May – June (10 days)",
    location: "Kumari Amman Temple",
    description: "Annual ten-day temple festival with cultural performances, processions and special poojas.",
  },
  {
    id: "navaratri",
    name: "Navaratri",
    month: "September – October",
    location: "Kumari Amman Temple & town",
    description: "Nine nights of music, dance and devotional offerings. The town comes alive with golu doll displays.",
  },
  {
    id: "cape-festival",
    name: "Cape Festival",
    month: "October",
    location: "Kanyakumari beach",
    description: "Tourism department's cultural festival with folk performances, food stalls and crafts from across Tamil Nadu.",
  },
];

export const emergencyContacts = [
  { name: "Police (Kanyakumari)", number: "04652-246224" },
  { name: "Govt Hospital", number: "04652-246135" },
  { name: "Tourist Helpline", number: "1363" },
  { name: "Ambulance", number: "108" },
  { name: "Coast Guard", number: "1554" },
  { name: "Fire", number: "101" },
];
