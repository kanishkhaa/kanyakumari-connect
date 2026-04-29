import homestayImg from "@/assets/stay-homestay.jpg";
import ecoImg from "@/assets/stay-ecolodge.jpg";
import hotelImg from "@/assets/stay-hotel.jpg";

export type Stay = {
  id: string;
  name: string;
  type: "Homestay" | "Eco Lodge" | "Hotel" | "Tribal Stay";
  image: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  amenities: string[];
  verified: boolean;
  description: string;
};

export const stays: Stay[] = [
  {
    id: "sea-breeze-homestay",
    name: "Sea Breeze Homestay",
    type: "Homestay",
    image: homestayImg,
    location: "Kovalam Road, Kanyakumari",
    pricePerNight: 1800,
    rating: 4.7,
    reviews: 142,
    amenities: ["Sea view", "Home-cooked meals", "Free WiFi", "Family run"],
    verified: true,
    description:
      "Run by the Pillai family for over 20 years. Wake up to the sound of waves and home-cooked Tamil breakfast on the rooftop.",
  },
  {
    id: "palmyra-eco-lodge",
    name: "Palmyra Eco Lodge",
    type: "Eco Lodge",
    image: ecoImg,
    location: "Muttom Beach, 12 km from Kanyakumari",
    pricePerNight: 2500,
    rating: 4.8,
    reviews: 89,
    amenities: ["Solar powered", "Organic farm", "Bicycle hire", "Yoga deck"],
    verified: true,
    description:
      "Thatched cottages built with palmyra and coconut wood. Zero plastic, rainwater harvested, organic meals from the on-site farm.",
  },
  {
    id: "sangam-beach-resort",
    name: "Sangam Beach Resort",
    type: "Hotel",
    image: hotelImg,
    location: "Beach Road, Kanyakumari",
    pricePerNight: 4200,
    rating: 4.5,
    reviews: 318,
    amenities: ["Pool", "AC rooms", "Restaurant", "Sunrise balcony"],
    verified: true,
    description:
      "Mid-range beachfront hotel with private balconies facing the Bay of Bengal. Walking distance to Vivekananda ferry.",
  },
  {
    id: "kani-tribal-stay",
    name: "Kani Tribal Village Stay",
    type: "Tribal Stay",
    image: ecoImg,
    location: "Pechiparai foothills, 50 km from Kanyakumari",
    pricePerNight: 1500,
    rating: 4.9,
    reviews: 47,
    amenities: ["Forest trek", "Tribal cuisine", "Cultural night", "Guided"],
    verified: true,
    description:
      "Stay with the Kani tribal community in the Western Ghats. Includes guided forest walks, herbal medicine demos and traditional kanji dinner.",
  },
];
