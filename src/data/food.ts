import thaliImg from "@/assets/food-thali.jpg";
import fishImg from "@/assets/food-fishcurry.jpg";
import appamImg from "@/assets/food-appam.jpg";
import chipsImg from "@/assets/market-spices.jpg";
import beachImg from "@/assets/place-beach.jpg";
import danceImg from "@/assets/exp-dance.jpg";
import templeImg from "@/assets/place-temple.jpg";

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
    name: "Meen Kuzhambu / Fish Curry",
    image: fishImg,
    type: "Non-Veg",
    priceRange: "Rs. 180 - Rs. 350",
    whereToTry: "Seafood messes and restaurants around Kanyakumari Beach and Nagercoil",
    description:
      "A coastal staple made with fresh fish, tamarind, coconut and local spice blends, usually served with steamed rice.",
  },
  {
    id: "kothu-parotta",
    name: "Kothu Parotta",
    image: thaliImg,
    type: "Non-Veg",
    priceRange: "Rs. 90 - Rs. 180",
    whereToTry: "Evening street-food stalls in Kanyakumari and Nagercoil",
    description:
      "Minced parotta tossed on a hot griddle with egg or meat, salna, onion and spices. It is one of the most recognizable Tamil street foods.",
  },
  {
    id: "appam",
    name: "Appam with Stew or Curry",
    image: appamImg,
    type: "Veg",
    priceRange: "Rs. 80 - Rs. 180",
    whereToTry: "Breakfast hotels and vegetarian restaurants",
    description:
      "Soft rice-and-coconut appam reflects Kanyakumari's Tamil-Kerala food overlap and pairs well with vegetable stew or spicy curry.",
  },
  {
    id: "idiyappam-puttu",
    name: "Idiyappam and Puttu",
    image: appamImg,
    type: "Veg",
    priceRange: "Rs. 70 - Rs. 150",
    whereToTry: "Morning tiffin shops in Nagercoil and Kanyakumari town",
    description:
      "Rice-based breakfast staples served with coconut milk, kadala curry, vegetable curry or chutney.",
  },
  {
    id: "banana-jackfruit-chips",
    name: "Banana Chips and Jackfruit Fritters",
    image: chipsImg,
    type: "Veg",
    priceRange: "Rs. 80 - Rs. 200",
    whereToTry: "Snack shops, sweet stalls and markets",
    description:
      "Crisp banana chips and jackfruit fritters are widely mentioned as must-try Kanyakumari snacks and easy food souvenirs.",
  },
  {
    id: "palm-fruit-juice",
    name: "Palm Fruit Juice / Nungu Drinks",
    image: beachImg,
    type: "Veg",
    priceRange: "Rs. 40 - Rs. 100",
    whereToTry: "Seasonal juice stalls and market areas",
    description:
      "Refreshing palm fruit drinks are a local summer favorite and a good match for Kanyakumari's hot coastal afternoons.",
  },
];

export type Eventt = {
  id: string;
  name: string;
  month: string;
  location: string;
  image: string;
  description: string;
};

export const events: Eventt[] = [
  {
    id: "vaisakhi",
    name: "Vaisakhi Festival",
    month: "May / June",
    location: "Kumari Amman Temple",
    image: templeImg,
    description:
      "The temple's major 10-day festival includes processions of the utsava idol and special devotional gatherings.",
  },
  {
    id: "navaratri",
    name: "Navaratri",
    month: "September / October",
    location: "Kumari Amman Temple and town",
    image: danceImg,
    description:
      "Nine nights of Devi worship and cultural observance; Incredible India highlights Navratri as a key Kanyakumari festival.",
  },
  {
    id: "cape-festival",
    name: "Cape Festival",
    month: "October",
    location: "Kanyakumari seafront",
    image: beachImg,
    description:
      "A three-day celebration of the cape's natural beauty and culture, with music, dance and Triveni Sangam gatherings.",
  },
  {
    id: "chitra-pournami",
    name: "Chitra Pournami",
    month: "April / May",
    location: "Kanyakumari Beach and View Tower",
    image: beachImg,
    description:
      "Full-moon season is popular for watching sunset and moonrise over the water from the cape.",
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
