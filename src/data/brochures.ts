export type Brochure = {
  id: string;
  title: string;
  pages: number;
  size: string;
  category: "Itinerary" | "Map" | "Cultural" | "Adventure";
  description: string;
};

export const brochures: Brochure[] = [
  {
    id: "kk-3day",
    title: "Kanyakumari in 3 Days — Classic Itinerary",
    pages: 16,
    size: "4.2 MB",
    category: "Itinerary",
    description: "Day-by-day plan covering Vivekananda Rock, Suchindram, Padmanabhapuram and beaches.",
  },
  {
    id: "district-map",
    title: "Kanyakumari District — Tourist Map",
    pages: 4,
    size: "2.1 MB",
    category: "Map",
    description: "High-resolution map with all 4 sub-regions, key roads, ferry points and viewpoints.",
  },
  {
    id: "temples-trail",
    title: "Temple Trails of the Southern Tip",
    pages: 24,
    size: "6.8 MB",
    category: "Cultural",
    description: "Heritage circuit covering 12 ancient temples with timings, dress code and history.",
  },
  {
    id: "western-ghats",
    title: "Western Ghats Adventure Guide",
    pages: 20,
    size: "5.4 MB",
    category: "Adventure",
    description: "Trekking routes in Mahendragiri, dam visits and Kani village stays.",
  },
  {
    id: "food-trail",
    title: "Eat Like a Local — Kanyakumari Food Trail",
    pages: 18,
    size: "5.0 MB",
    category: "Cultural",
    description: "Where to find the best fish curry, appam-stew and authentic banana-leaf meals.",
  },
  {
    id: "responsible-travel",
    title: "Responsible Travel Handbook",
    pages: 12,
    size: "1.8 MB",
    category: "Cultural",
    description: "How to travel respectfully, support local artisans and protect coastal ecology.",
  },
];
