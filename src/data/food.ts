import thaliImg from "@/assets/food-thali.jpg";
import fishImg from "@/assets/food-fishcurry.jpg";
import appamImg from "@/assets/food-appam.jpg";
import idiyappamImg from "@/assets/food-idiyappam.jpg";
import chipsImg from "@/assets/food-bananachips.jpeg";
import juiceImg from "@/assets/food-juice.jpg";
import kothuParottaImg from "@/assets/food-kothuparotta.jpg";
import bakeryImg from "@/assets/food-bakery.jpg";
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

export type Restaurant = {
  id: string;
  name: string;
  type: "Veg" | "Non-Veg" | "Multi-cuisine" | "Cafe";
  location: string;
  lat: number;
  lon: number;
  phone?: string;
  rating: number;
  description: string;
};

export const restaurants: Restaurant[] = [
  {
    id: "sea-view-restaurant",
    name: "Sea View Restaurant",
    type: "Multi-cuisine",
    location: "Hotel Sea View, Kanyakumari beach area",
    lat: 8.0882,
    lon: 77.5482,
    rating: 4.3,
    description: "Known for central beach access, sea-facing ambience and South Indian, North Indian and seafood options.",
  },
  {
    id: "arafa-restaurant",
    name: "Arafa Restaurant",
    type: "Multi-cuisine",
    location: "Kanyakumari town",
    lat: 8.0877,
    lon: 77.5465,
    rating: 4.2,
    description: "A popular casual dining choice for South Indian, North Indian and Arabian-style dishes.",
  },
  {
    id: "saravana-bhavan-kanyakumari",
    name: "Saravana Bhavan",
    type: "Veg",
    location: "Near Kanyakumari temple and beach circuit",
    lat: 8.0889,
    lon: 77.5469,
    rating: 4.1,
    description: "A familiar vegetarian stop for tiffin, meals, coffee and family-friendly quick dining.",
  },
  {
    id: "prabhu-hotel-nagercoil",
    name: "Prabhu Hotel",
    type: "Non-Veg",
    location: "Nagercoil",
    lat: 8.1833,
    lon: 77.4119,
    rating: 4.4,
    description: "A local Nagercoil favourite often recommended for parotta and non-vegetarian meals.",
  },
];

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
    image: kothuParottaImg,
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
    image: idiyappamImg,
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
    image: juiceImg,
    type: "Veg",
    priceRange: "Rs. 40 - Rs. 100",
    whereToTry: "Seasonal juice stalls and market areas",
    description:
      "Refreshing palm fruit drinks are a local summer favorite and a good match for Kanyakumari's hot coastal afternoons.",
  },
  {
    id: "local-bakery",
    name: "Local Bakery Snacks",
    image: bakeryImg,
    type: "Veg",
    priceRange: "Rs. 40 - Rs. 160",
    whereToTry: "Town bakeries, tea shops and market streets in Kanyakumari and Nagercoil",
    description:
      "Fresh bakery snacks and tea-time bites are easy to find across the district, especially around bus stands, markets and evening streets.",
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
  { name: "National Emergency Response", number: "112" },
  { name: "Police", number: "100" },
  { name: "Fire and Rescue", number: "101" },
  { name: "Ambulance", number: "108" },
  { name: "District Control Centre", number: "1077" },
  { name: "Kanniyakumari Municipality", number: "04652-246279" },
  { name: "Tourism Department", number: "+91 91769 95866" },
];
