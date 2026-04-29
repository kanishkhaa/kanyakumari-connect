import vivekanandaImg from "@/assets/place-vivekananda.jpg";
import thiruvalluvarImg from "@/assets/place-thiruvalluvar.jpg";
import templeImg from "@/assets/place-temple.jpg";
import beachImg from "@/assets/place-beach.jpg";
import palaceImg from "@/assets/place-palace.jpg";
import waterfallImg from "@/assets/place-waterfall.jpg";
import vattakottaiImg from "@/assets/place-vattakottai.jpg";
import aqueductImg from "@/assets/place-aqueduct.jpg";

export type Place = {
  id: string;
  name: string;
  tagline: string;
  category: "Spiritual" | "Heritage" | "Nature" | "Beach";
  image: string;
  rating: number;
  ticket: string;
  timings: string;
  bestTime: string;
  duration: string;
  distance: string;
  description: string;
  highlights: string[];
  howToReach: string;
  nearbyBus: string;
  tips: string[];
};

export const places: Place[] = [
  {
    id: "vivekananda-rock-memorial",
    name: "Vivekananda Rock Memorial",
    tagline: "Where Swami Vivekananda meditated in 1892",
    category: "Spiritual",
    image: vivekanandaImg,
    rating: 4.8,
    ticket: "₹50 (incl. ferry)",
    timings: "8:00 AM – 4:00 PM (Tue–Sun)",
    bestTime: "October to March, early morning",
    duration: "2–3 hours",
    distance: "500 m offshore from mainland",
    description:
      "Built in 1970 on the rocky island where Swami Vivekananda is said to have attained enlightenment. The memorial blends architectural styles from across India and houses a meditation hall (Dhyana Mandapam) and a statue of Vivekananda in standing posture.",
    highlights: [
      "Sripada Mandapam with footprint of Goddess Kanyakumari",
      "Dhyana Mandapam — silent meditation hall",
      "Panoramic 360° view of three seas converging",
      "Ferry ride from Kanyakumari mainland jetty",
    ],
    howToReach: "Government ferry from the mainland jetty near the bus stand. Tickets sold from 8 AM.",
    nearbyBus: "Kanyakumari Bus Stand — 600 m walk to ferry jetty.",
    tips: [
      "Reach the jetty by 7:30 AM to avoid long ferry queues",
      "Photography allowed only outside the meditation hall",
      "Carry light cotton clothing and water",
    ],
  },
  {
    id: "thiruvalluvar-statue",
    name: "Thiruvalluvar Statue",
    tagline: "133-foot stone tribute to the Tamil poet-saint",
    category: "Heritage",
    image: thiruvalluvarImg,
    rating: 4.7,
    ticket: "Included with ferry ticket",
    timings: "8:00 AM – 4:00 PM (Tue–Sun)",
    bestTime: "October to February",
    duration: "1–2 hours",
    distance: "Adjacent island to Vivekananda Rock",
    description:
      "Standing 133 feet tall on a small islet beside Vivekananda Rock, the statue honors Thiruvalluvar, author of the Thirukkural. The 133 feet symbolize the 133 chapters of the Thirukkural; the three fingers of the raised hand represent virtue, wealth and pleasure (aram, porul, inbam).",
    highlights: [
      "One of the tallest statues in Asia",
      "Carved from 7000+ tons of granite",
      "Stunning at sunrise and sunset",
      "Walkway connects from Vivekananda Rock",
    ],
    howToReach: "Same ferry as Vivekananda Rock Memorial — both islands are connected by a walkway.",
    nearbyBus: "Kanyakumari Bus Stand — ferry jetty 600 m away.",
    tips: [
      "Best photographed from the mainland at sunrise",
      "Slippery in monsoon — wear grip footwear",
    ],
  },
  {
    id: "kumari-amman-temple",
    name: "Kumari Amman Temple",
    tagline: "Ancient seaside shrine to the virgin goddess",
    category: "Spiritual",
    image: templeImg,
    rating: 4.6,
    ticket: "Free entry",
    timings: "4:30 AM – 12:00 PM, 4:00 PM – 8:15 PM",
    bestTime: "Year-round; festivals in May & October",
    duration: "1 hour",
    distance: "200 m from Kanyakumari beach",
    description:
      "A 3000-year-old shrine dedicated to Devi Kanya Kumari, an avatar of Parvati. Listed among the 51 Shakti Peethas. The deity's diamond nose-ring is famously said to be visible from the sea.",
    highlights: [
      "One of 51 Shakti Peethas",
      "Eastern gate opens only on special occasions",
      "Stunning Bay of Bengal view from temple complex",
    ],
    howToReach: "Walking distance from Kanyakumari Bus Stand (5 minutes).",
    nearbyBus: "Kanyakumari Town Bus Stand.",
    tips: [
      "Men must remove shirts before entering sanctum",
      "No cameras or mobile phones inside",
      "Modest dress code applies",
    ],
  },
  {
    id: "triveni-sangam-beach",
    name: "Triveni Sangam Beach",
    tagline: "Where three seas meet — Bay of Bengal, Arabian Sea, Indian Ocean",
    category: "Beach",
    image: beachImg,
    rating: 4.5,
    ticket: "Free",
    timings: "Open 24 hours (sunrise/sunset best)",
    bestTime: "Sunrise (5:45 AM) and sunset (6:15 PM)",
    duration: "1–2 hours",
    distance: "Town beach",
    description:
      "Kanyakumari's iconic beach — the only place in India where you can witness sunrise and sunset over the ocean from the same spot, where three water bodies meet. Distinct sand colors mark the confluence.",
    highlights: [
      "Tri-colored sand from three seas",
      "Watch sunrise and sunset over ocean",
      "Sound of converging waves",
    ],
    howToReach: "Adjacent to Kumari Amman Temple — walkable from town.",
    nearbyBus: "Kanyakumari Town Bus Stand (5 min walk).",
    tips: [
      "Avoid swimming — strong currents",
      "Reach 30 minutes before sunrise for best photos",
    ],
  },
  {
    id: "padmanabhapuram-palace",
    name: "Padmanabhapuram Palace",
    tagline: "Largest wooden palace complex in Asia",
    category: "Heritage",
    image: palaceImg,
    rating: 4.7,
    ticket: "₹35 adults / ₹100 camera",
    timings: "9:00 AM – 4:30 PM (closed Mon)",
    bestTime: "November to February",
    duration: "2–3 hours",
    distance: "35 km from Kanyakumari",
    description:
      "16th-century palace of the Travancore kings, built entirely of teak and rosewood. Famous for intricate floral carvings, a 17th-century clock tower, and a single-piece granite musical pillar.",
    highlights: [
      "Hand-painted murals from 17th–18th centuries",
      "Polished black granite floor — 'Egg-white floor'",
      "King's bedroom with medicinal Ayurvedic bed",
    ],
    howToReach: "Bus from Kanyakumari to Thuckalay (1 hr), then 2 km to palace.",
    nearbyBus: "Thuckalay Bus Stand — 2 km from palace.",
    tips: [
      "Closed on Mondays and public holidays",
      "Guides available at entrance for ₹200",
    ],
  },
  {
    id: "thirparappu-falls",
    name: "Thirparappu Falls",
    tagline: "50-foot waterfall on the Kodayar river",
    category: "Nature",
    image: waterfallImg,
    rating: 4.4,
    ticket: "₹10 entry",
    timings: "8:00 AM – 6:00 PM",
    bestTime: "October to January (post-monsoon)",
    duration: "2 hours",
    distance: "55 km from Kanyakumari",
    description:
      "A man-made waterfall created by a small dam on the Kodayar river. The water cascades over a rocky bed for nearly seven months a year, surrounded by lush forest. A 1000-year-old Mahadeva temple sits nearby.",
    highlights: [
      "Safe shallow pool for bathing",
      "Ancient Mahadeva (Shiva) temple nearby",
      "Picnic-friendly grounds",
    ],
    howToReach: "Bus from Kanyakumari to Kuzhithurai, then local bus/auto to falls.",
    nearbyBus: "Kuzhithurai Bus Stand — 12 km away.",
    tips: [
      "Carry change of clothes for bathing",
      "Visit early to avoid crowds on weekends",
    ],
  },
];
