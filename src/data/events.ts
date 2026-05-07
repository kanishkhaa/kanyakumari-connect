import templeImg from "@/assets/place-temple.jpg";
import beachImg from "@/assets/place-beach.jpg";
import vivekanandaImg from "@/assets/place-vivekananda.jpg";
import danceImg from "@/assets/exp-dance.jpg";
import palaceImg from "@/assets/place-palace.jpg";

export type EventItem = {
  id: string;
  title: string;
  date: string;
  month: string;
  location: string;
  category: "Festival" | "Cultural" | "Spiritual" | "Fair";
  image: string;
  description: string;
};

export const events: EventItem[] = [
  {
    id: "vaisakhi-festival",
    title: "Vaisakhi Festival at Kumari Amman Temple",
    date: "May / June",
    month: "May",
    location: "Kumari Amman Temple, Kanyakumari",
    category: "Spiritual",
    image: templeImg,
    description:
      "The temple's important annual festival is celebrated for 10 days, with the utsava idol of Goddess Kumari taken in processions.",
  },
  {
    id: "navaratri",
    title: "Navaratri at Kumari Amman Temple",
    date: "September / October",
    month: "Sep-Oct",
    location: "Kumari Amman Temple and Kanyakumari town",
    category: "Festival",
    image: templeImg,
    description:
      "Nine nights of Devi worship, music, processions and temple visits. Incredible India lists Navratri among Kanyakumari's key fairs and festivals.",
  },
  {
    id: "cape-festival",
    title: "Cape Festival",
    date: "October",
    month: "October",
    location: "Kanyakumari seafront / Triveni Sangam",
    category: "Cultural",
    image: beachImg,
    description:
      "A three-day cultural celebration of Kanyakumari's beauty and culture, with music, dance and visitors gathering near the three-sea confluence.",
  },
  {
    id: "chitra-pournami",
    title: "Chitra Pournami Full-Moon Viewing",
    date: "April / May",
    month: "April",
    location: "Kanyakumari Beach and View Tower",
    category: "Festival",
    image: vivekanandaImg,
    description:
      "A popular full-moon occasion for watching the cape's rare sunset and moonrise views over the water, one of Kanyakumari's most loved seasonal experiences.",
  },
  {
    id: "car-festival",
    title: "Car Festival",
    date: "Temple calendar",
    month: "Varies",
    location: "Kumari Amman Temple, Kanyakumari",
    category: "Spiritual",
    image: danceImg,
    description:
      "One of the important Kumari Amman Temple observances, associated with processions and devotional gatherings around the temple streets.",
  },
  {
    id: "kalabham-festival",
    title: "Kalabham Sandal Festival",
    date: "Temple calendar",
    month: "Varies",
    location: "Kumari Amman Temple, Kanyakumari",
    category: "Spiritual",
    image: templeImg,
    description:
      "A sandal-paste festival listed among the temple's important observances, drawing devotees to special rituals at the ancient shrine.",
  },
  {
    id: "navaratri-procession",
    title: "Padmanabhapuram Navaratri Procession",
    date: "September / October",
    month: "Sep-Oct",
    location: "Padmanabhapuram Palace route",
    category: "Cultural",
    image: palaceImg,
    description:
      "A historic Navaratri-linked procession tradition connects Padmanabhapuram with the wider Travancore cultural route during the festival season.",
  },
];
