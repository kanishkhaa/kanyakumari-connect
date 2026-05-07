import weavingImg from "@/assets/exp-weaving.jpg";
import fishingImg from "@/assets/exp-fishing.jpg";
import cookingImg from "@/assets/exp-cooking.jpg";
import danceImg from "@/assets/exp-dance.jpg";
import beachImg from "@/assets/place-beach.jpg";
import waterfallImg from "@/assets/place-waterfall.jpg";
import vattakottaiImg from "@/assets/place-vattakottai.jpg";

export type Experience = {
  id: string;
  title: string;
  host: string;
  image: string;
  duration: string;
  price: number;
  groupSize: string;
  category: "Cultural" | "Food" | "Nature" | "Craft" | "Wellness" | "Adventure";
  description: string;
};

export const experiences: Experience[] = [
  {
    id: "beachfront-meditation-retreat",
    title: "Beachfront Meditation Retreat",
    host: "Local wellness guide near Triveni Sangam",
    image: beachImg,
    duration: "2 hours",
    price: 900,
    groupSize: "1-12 people",
    category: "Wellness",
    description:
      "Begin before sunrise with guided breathing, silent meditation and a reflective walk along the Kanyakumari seafront near the three-sea confluence.",
  },
  {
    id: "coastal-culinary-adventure",
    title: "Coastal Culinary Adventure",
    host: "Home cooks and seafood specialists",
    image: cookingImg,
    duration: "4 hours",
    price: 1600,
    groupSize: "2-10 people",
    category: "Food",
    description:
      "Cook tamarind-coconut fish curry, appam, banana-leaf sides and market-fresh coastal dishes inspired by Kanyakumari's Tamil, Kerala and seafaring food traditions.",
  },
  {
    id: "wildlife-safari-excursion",
    title: "Wildlife Safari Excursion",
    host: "Western Ghats nature guide",
    image: waterfallImg,
    duration: "6 hours",
    price: 2200,
    groupSize: "2-8 people",
    category: "Nature",
    description:
      "Explore Pechiparai, Keeriparai and Kanyakumari Wildlife Sanctuary routes with forest views, birdwatching stops and responsible nature interpretation.",
  },
  {
    id: "water-sports-extravaganza",
    title: "Water Sports Extravaganza",
    host: "Certified coastal activity team",
    image: vattakottaiImg,
    duration: "3 hours",
    price: 1800,
    groupSize: "2-12 people",
    category: "Adventure",
    description:
      "Plan a beach-focused adventure day around approved seasonal activities, sea-view points and safe coastal recreation near Kanyakumari's beaches.",
  },
  {
    id: "fisherman-sunrise",
    title: "Sunrise with Kanyakumari Fishermen",
    host: "Selvam, local fisherman",
    image: fishingImg,
    duration: "4 hours",
    price: 1500,
    groupSize: "1-4 people",
    category: "Cultural",
    description:
      "Join the dawn harbour rhythm, watch the morning catch and understand the everyday work behind Kanyakumari's coastal food culture.",
  },
  {
    id: "balaramapuram-handloom",
    title: "Balaramapuram Handloom Weaving Workshop",
    host: "Murugan, master weaver",
    image: weavingImg,
    duration: "3 hours",
    price: 1200,
    groupSize: "1-6 people",
    category: "Craft",
    description:
      "Learn the basics of cotton handloom weaving in a working cooperative and discover the textile craft traditions connected to the region.",
  },
  {
    id: "heritage-faith-trail",
    title: "Faith and Heritage Trail",
    host: "Kanyakumari storyteller guide",
    image: danceImg,
    duration: "5 hours",
    price: 1400,
    groupSize: "2-10 people",
    category: "Cultural",
    description:
      "Trace the district's living faith map through temples, churches, memorials and stories around Vivekananda Rock, Kumari Amman Temple and the town seafront.",
  },
];
