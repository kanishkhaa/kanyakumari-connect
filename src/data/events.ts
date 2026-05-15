import { eventImages, imageFor } from "@/data/imageRegistry";
import placePlaceholder from "@/assets/place-beach.jpg";

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
    id: "suchindram-margazhi-car-festival",
    title: "Suchindram Margazhi Car Festival",
    date: "December / January",
    month: "January",
    location: "Thanumalayan Temple, Suchindram",
    category: "Spiritual",
    image: imageFor(eventImages, "suchindram-margazhi-car-festival", placePlaceholder),
    description:
      "The famous 10-day Margazhi festival at Suchindram features temple processions and the car festival that draws devotees from across Kanyakumari district.",
  },
  {
    id: "thai-pongal-coastal-harvest",
    title: "Thai Pongal and Coastal Harvest Celebrations",
    date: "Mid-January / February village follow-ups",
    month: "February",
    location: "Villages across Kanyakumari district",
    category: "Cultural",
    image: imageFor(eventImages, "thai-pongal-coastal-harvest", placePlaceholder),
    description:
      "Pongal season continues through community gatherings, temple visits and harvest-linked village observances, especially in agrarian and coastal settlements.",
  },
  {
    id: "mahashivaratri-temple-night",
    title: "Maha Shivaratri Temple Night",
    date: "February / March",
    month: "March",
    location: "Suchindram, Guganathaswamy Temple and district Shiva shrines",
    category: "Spiritual",
    image: imageFor(eventImages, "mahashivaratri-temple-night", placePlaceholder),
    description:
      "Night-long Shiva worship, special pujas and devotional music are observed at major Shiva shrines, with Suchindram among the important stops.",
  },
  {
    id: "chitra-pournami",
    title: "Chitra Pournami Full-Moon Viewing",
    date: "April / May",
    month: "April",
    location: "Kanyakumari Beach and View Tower",
    category: "Festival",
    image: imageFor(eventImages, "chitra-pournami", placePlaceholder),
    description:
      "Travellers gather at the cape to watch the rare seasonal spectacle of sunset and moonrise over the waters during the Chitra Pournami full moon.",
  },
  {
    id: "vaisakhi-kumari-amman",
    title: "Vaisakhi Festival at Kumari Amman Temple",
    date: "May / June",
    month: "May",
    location: "Kumari Amman Temple, Kanyakumari",
    category: "Spiritual",
    image: imageFor(eventImages, "vaisakhi-kumari-amman", placePlaceholder),
    description:
      "One of the temple's major annual festivals, celebrated over multiple days with special rituals and processions of the utsava idol of Goddess Kumari.",
  },
  {
    id: "southwest-monsoon-waterfall-season",
    title: "Monsoon Waterfall Season",
    date: "June",
    month: "June",
    location: "Thirparappu Falls and Western Ghats foothills",
    category: "Cultural",
    image: imageFor(eventImages, "southwest-monsoon-waterfall-season", placePlaceholder),
    description:
      "The southwest monsoon refreshes Kanyakumari's hill routes and waterfalls. Visitors plan cautious day trips to Thirparappu, Kalikesam and reservoir landscapes.",
  },
  {
    id: "kalabham-sandal-festival",
    title: "Kalabham Sandal Festival",
    date: "Temple calendar, often monsoon season",
    month: "July",
    location: "Kumari Amman Temple, Kanyakumari",
    category: "Spiritual",
    image: imageFor(eventImages, "kalabham-sandal-festival", placePlaceholder),
    description:
      "A sandal-paste festival listed among Kumari Amman Temple's important observances, drawing devotees for special adornment and worship rituals.",
  },
  {
    id: "adi-amman-observances",
    title: "Aadi Amman Observances",
    date: "July / August",
    month: "August",
    location: "Amman temples across Kanyakumari district",
    category: "Festival",
    image: imageFor(eventImages, "adi-amman-observances", placePlaceholder),
    description:
      "Aadi season brings special Amman worship, community offerings and local temple gatherings across the district's villages and coastal towns.",
  },
  {
    id: "onam-padmanabhapuram-cultural-season",
    title: "Onam and Travancore Heritage Season",
    date: "August / September",
    month: "September",
    location: "Padmanabhapuram Palace, Thuckalay and Nagercoil belt",
    category: "Cultural",
    image: imageFor(eventImages, "onam-padmanabhapuram-cultural-season", placePlaceholder),
    description:
      "Kanyakumari's historic Travancore links are visible during Onam season, especially around Padmanabhapuram, Thuckalay and Kerala-border communities.",
  },
  {
    id: "navaratri-kumari-amman",
    title: "Navaratri at Kumari Amman Temple",
    date: "September / October",
    month: "October",
    location: "Kumari Amman Temple and Kanyakumari town",
    category: "Festival",
    image: imageFor(eventImages, "navaratri-kumari-amman", placePlaceholder),
    description:
      "Nine nights of Devi worship, music and processions make Navaratri one of the most important festival windows for Kanyakumari pilgrims.",
  },
  {
    id: "cape-festival",
    title: "Cape Festival",
    date: "October / November",
    month: "November",
    location: "Kanyakumari seafront and Triveni Sangam",
    category: "Cultural",
    image: imageFor(eventImages, "cape-festival", placePlaceholder),
    description:
      "A cultural celebration of the cape with music, dance and public programmes near the three-sea confluence, traditionally promoted as a signature Kanyakumari festival.",
  },
  {
    id: "christmas-coastal-celebrations",
    title: "Christmas and Year-End Coastal Celebrations",
    date: "December",
    month: "December",
    location: "Our Lady of Ransom Church and coastal parishes",
    category: "Festival",
    image: imageFor(eventImages, "christmas-coastal-celebrations", placePlaceholder),
    description:
      "Kanyakumari's coastal churches, especially Our Lady of Ransom near the shore, become focal points for Christmas services, lights and community gatherings.",
  },
];
