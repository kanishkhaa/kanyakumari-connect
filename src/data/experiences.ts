import weavingImg from "@/assets/exp-weaving.jpg";
import fishingImg from "@/assets/exp-fishing.jpg";
import cookingImg from "@/assets/exp-cooking.jpg";

export type Experience = {
  id: string;
  title: string;
  host: string;
  image: string;
  duration: string;
  price: number;
  groupSize: string;
  category: "Cultural" | "Food" | "Nature" | "Craft";
  description: string;
};

export const experiences: Experience[] = [
  {
    id: "handloom-weaving",
    title: "Balaramapuram Handloom Weaving Workshop",
    host: "Murugan, master weaver",
    image: weavingImg,
    duration: "3 hours",
    price: 1200,
    groupSize: "1–6 people",
    category: "Craft",
    description:
      "Learn the basics of cotton handloom weaving in a working cooperative. Take home a handwoven cotton stole.",
  },
  {
    id: "fisherman-sunrise",
    title: "Sunrise with Kanyakumari Fishermen",
    host: "Selvam, local fisherman",
    image: fishingImg,
    duration: "4 hours (5 AM start)",
    price: 1500,
    groupSize: "1–4 people",
    category: "Cultural",
    description:
      "Join a traditional catamaran crew at dawn, watch the catch land at the morning auction, then enjoy fresh fish breakfast.",
  },
  {
    id: "tribal-cooking",
    title: "Kani Tribal Forest Cooking",
    host: "Lakshmi, Kani community elder",
    image: cookingImg,
    duration: "5 hours",
    price: 1800,
    groupSize: "2–8 people",
    category: "Food",
    description:
      "Forage forest greens and tubers with the Kani community, cook on a wood fire in clay pots, and share a traditional meal on banana leaves.",
  },
];
