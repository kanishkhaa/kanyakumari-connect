import templeImg from "@/assets/place-temple.jpg";
import beachImg from "@/assets/place-beach.jpg";
import palaceImg from "@/assets/place-palace.jpg";
import waterfallImg from "@/assets/place-waterfall.jpg";
import { imageFor, placeImages } from "@/data/imageRegistry";

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
  mapQuery?: string;
};

const categoryImage: Record<Place["category"], string> = {
  Spiritual: templeImg,
  Heritage: palaceImg,
  Nature: waterfallImg,
  Beach: beachImg,
};

type PlaceSeed = Omit<Place, "image" | "rating" | "ticket" | "timings" | "bestTime" | "duration" | "howToReach" | "nearbyBus" | "tips"> &
  Partial<Pick<Place, "image" | "rating" | "ticket" | "timings" | "bestTime" | "duration" | "howToReach" | "nearbyBus" | "tips">>;

const categoryDefaults: Record<Place["category"], Pick<Place, "ticket" | "timings" | "bestTime" | "duration" | "tips">> = {
  Spiritual: {
    ticket: "Free or nominal entry",
    timings: "Morning and evening hours vary by shrine",
    bestTime: "Early morning or festival season",
    duration: "1-2 hours",
    tips: ["Dress modestly", "Check puja timings before travelling", "Photography may be restricted inside sanctums"],
  },
  Heritage: {
    ticket: "Free or nominal entry",
    timings: "Usually daylight hours",
    bestTime: "October to March",
    duration: "1-2 hours",
    tips: ["Carry water and sun protection", "Hire a local guide for deeper context", "Confirm weekly holidays before visiting"],
  },
  Nature: {
    ticket: "Free or nominal entry",
    timings: "Daylight hours recommended",
    bestTime: "Post-monsoon and winter",
    duration: "2-3 hours",
    tips: ["Wear comfortable walking shoes", "Avoid isolated trails after dark", "Carry water and basic rain protection in monsoon"],
  },
  Beach: {
    ticket: "Free",
    timings: "Open; sunrise and sunset are best",
    bestTime: "October to March",
    duration: "1-2 hours",
    tips: ["Avoid swimming where currents are strong", "Reach early for sunrise or sunset spots", "Keep beaches clean and plastic-free"],
  },
};

const makePlace = (place: PlaceSeed, index: number): Place => {
  const defaults = categoryDefaults[place.category];
  return {
    ...place,
    image: place.image ?? imageFor(placeImages, place.id, categoryImage[place.category]),
    rating: place.rating ?? Number((4.3 + (index % 5) * 0.1).toFixed(1)),
    ticket: place.ticket ?? defaults.ticket,
    timings: place.timings ?? defaults.timings,
    bestTime: place.bestTime ?? defaults.bestTime,
    duration: place.duration ?? defaults.duration,
    howToReach: place.howToReach ?? "Reach from Kanyakumari town by local bus, auto, taxi or a day-trip cab depending on distance.",
    nearbyBus: place.nearbyBus ?? "Kanyakumari or Nagercoil bus links connect onward to the nearest town stop.",
    tips: place.tips ?? defaults.tips,
  };
};

const placeSeeds: PlaceSeed[] = [
  {
    id: "vivekananda-rock-memorial",
    name: "Vivekananda Rock Memorial",
    tagline: "Where Swami Vivekananda meditated offshore before his Chicago journey",
    category: "Spiritual",
    rating: 4.8,
    ticket: "Ferry ticket required",
    timings: "8:00 AM - 4:00 PM",
    distance: "500 m offshore from mainland",
    description:
      "A landmark memorial built on the rock where Swami Vivekananda is believed to have meditated in 1892. The complex includes the Dhyana Mandapam meditation hall and views of the three seas.",
    highlights: ["Dhyana Mandapam meditation hall", "Sripada Mandapam", "Ferry ride from the mainland", "Panoramic sea views"],
  },
  {
    id: "devi-kanyakumari-temple",
    name: "Devi Kanyakumari / Kumari Amman Temple",
    tagline: "Ancient seaside Shakti shrine dedicated to the virgin goddess",
    category: "Spiritual",
    rating: 4.7,
    ticket: "Free entry",
    timings: "4:30 AM - 12:30 PM, 4:00 PM - 8:30 PM",
    distance: "200 m from Kanyakumari Beach",
    description:
      "One of Kanyakumari's most sacred landmarks, this ancient temple is dedicated to Goddess Kanya Kumari and is closely tied to the town's spiritual identity and coastal legends.",
    highlights: ["Ancient Shakti shrine", "Seaside temple setting", "Traditional rituals", "Walkable from the beach"],
  },
  {
    id: "thiruvalluvar-statue",
    name: "Saint Thiruvalluvar Statue",
    tagline: "133-foot granite tribute to the Tamil poet-philosopher",
    category: "Heritage",
    rating: 4.7,
    ticket: "Usually included with ferry access",
    timings: "9:00 AM - 4:00 PM",
    distance: "Offshore islet beside Vivekananda Rock",
    description:
      "The towering statue honors Thiruvalluvar, author of the Thirukkural. Its 133-foot height represents the 133 chapters of the classic Tamil text.",
    highlights: ["133-foot statue", "Thirukkural symbolism", "Sea-facing photo point", "Ferry-access monument"],
  },
  {
    id: "gandhi-mandapam",
    name: "Mahatma Gandhi Memorial (Gandhi Mandapam)",
    tagline: "Memorial marking the place where Gandhi's ashes were kept for public homage",
    category: "Heritage",
    ticket: "Free entry",
    timings: "7:00 AM - 7:00 PM",
    distance: "Near Kanyakumari Beach",
    description:
      "A quiet memorial built in honor of Mahatma Gandhi. Its architecture is designed so sunlight falls on the central spot on Gandhi Jayanti.",
    highlights: ["Gandhi tribute", "Distinct memorial architecture", "Central town location", "Close to the seafront"],
  },
  {
    id: "mathur-aqueduct",
    name: "Mathur Aqueduct Hanging Trough / Mathoor Hanging Bridge",
    tagline: "High aqueduct walkway above a green valley",
    category: "Heritage",
    rating: 4.5,
    ticket: "Nominal entry",
    timings: "6:00 AM - 7:00 PM",
    distance: "Around 50-60 km from Kanyakumari",
    description:
      "A long irrigation aqueduct and elevated walkway known for its height, valley views and lush rural surroundings. It pairs well with a Thirparappu Falls day trip.",
    highlights: ["Elevated trough walk", "Valley viewpoints", "Irrigation heritage", "Nearby picnic spaces"],
  },
  {
    id: "thanumalayan-suchindram-temple",
    name: "Thanumalayan / Suchindram Anjaneyar Temple",
    tagline: "Historic temple known for Trimurti worship and a tall Hanuman statue",
    category: "Spiritual",
    rating: 4.7,
    ticket: "Free entry",
    timings: "4:30 AM - 11:30 AM, 5:00 PM - 8:30 PM",
    distance: "Around 13 km from Kanyakumari",
    description:
      "A major pilgrimage stop at Suchindram, revered for Shiva, Vishnu and Brahma worship, musical pillars and the celebrated Anjaneyar shrine.",
    highlights: ["Trimurti shrine", "Anjaneyar statue", "Temple inscriptions", "Musical pillars"],
  },
  {
    id: "kanyakumari-beach",
    name: "Kanyakumari Beach / Cape Comorin Beach",
    tagline: "The shore where the Arabian Sea, Bay of Bengal and Indian Ocean meet",
    category: "Beach",
    rating: 4.6,
    ticket: "Free",
    distance: "In Kanyakumari town",
    description:
      "The town's iconic seafront is known for sunrise, sunset, full-moon views and the symbolic meeting of three seas at Triveni Sangam.",
    highlights: ["Triveni Sangam", "Sunrise and sunset", "Multi-colored sand", "Temple and memorial access"],
    tips: ["Arrive 30-45 minutes before sunrise", "Sunset is best from the western-facing viewpoint in clear weather", "Avoid swimming in rough currents"],
    mapQuery: "Kanyakumari Beach Triveni Sangam Tamil Nadu",
  },
  {
    id: "sunrise-sunset-viewing",
    name: "Sunrise and Sunset Viewing Points",
    tagline: "Rare cape views where sunrise, sunset and moonrise can all shape the same journey",
    category: "Beach",
    rating: 4.8,
    ticket: "Free; View Tower may have nominal entry",
    timings: "Best 5:30 AM - 6:30 AM and 5:15 PM - 6:30 PM by season",
    bestTime: "October to March; Chitra Pournami for full-moon views",
    duration: "1-2 hours",
    distance: "Kanyakumari seafront",
    description:
      "Kanyakumari's seafront is famous for sunrise over the Bay of Bengal and sunset toward the Arabian Sea. On clear full-moon evenings, travellers gather for the special sight of sunset and moonrise over the waters.",
    highlights: ["Sunrise over the three-sea confluence", "Sunset Point", "View Tower angles", "Full-moon Chitra Pournami crowds"],
    howToReach: "Walk from Kanyakumari town, Beach Road stays, Kumari Amman Temple or the ferry jetty.",
    nearbyBus: "Kanyakumari bus stand and railway station are close to the main seafront.",
    tips: ["Check cloud cover before leaving", "Use the View Tower for cleaner sightlines", "Keep extra time on festival and weekend evenings"],
    mapQuery: "Sunrise View Point Kanyakumari Tamil Nadu",
  },
  {
    id: "poovar-backwater-boating",
    name: "Backwater Boating near Thengapattinam / Poovar Route",
    tagline: "Slow boat rides where river, backwater and sea landscapes meet",
    category: "Nature",
    rating: 4.5,
    ticket: "Boat charges vary by operator",
    timings: "Daylight hours; morning and late afternoon are best",
    bestTime: "October to March",
    duration: "1-2 hours",
    distance: "Around 45-55 km from Kanyakumari depending on jetty",
    description:
      "The western coast near Thengapattinam and the Poovar backwater route offers calm boating through estuary scenery, coconut-fringed channels and fishing-village landscapes.",
    highlights: ["Estuary scenery", "Backwater boat rides", "Fishing village views", "Golden-hour photography"],
    howToReach: "Book a taxi from Kanyakumari or Nagercoil toward Thengapattinam or the Poovar backwater jetties.",
    nearbyBus: "Thengapattinam and nearby coastal towns have bus links from Nagercoil.",
    tips: ["Confirm life jackets before boarding", "Negotiate route and duration first", "Avoid boating during heavy rain or rough wind"],
    mapQuery: "Thengapattinam backwater boating Kanyakumari Tamil Nadu",
  },
  {
    id: "mayiladi-kal-sirpangal",
    name: "Mayiladi Kal Sirpangal (Stone Sculpture Workshops)",
    tagline: "Traditional stone carving cluster known for temple icons and granite craft",
    category: "Heritage",
    ticket: "Free to visit workshops; purchases vary",
    timings: "Usually working daylight hours",
    bestTime: "Morning, when workshops are active",
    duration: "1 hour",
    distance: "Around 10-12 km from Kanyakumari",
    description:
      "Mayiladi is associated with skilled stone sculptors who carve temple icons, pillars and decorative forms. A visit gives travellers a close look at the patient handwork behind Tamil stone sculpture traditions.",
    highlights: ["Granite carving workshops", "Temple icon craft", "Meet local artisans", "Souvenir and commission options"],
    howToReach: "Reach Mayiladi by taxi, auto or local bus from Kanyakumari or Nagercoil.",
    nearbyBus: "Mayiladi bus stops connect with Kanyakumari and Nagercoil routes.",
    tips: ["Ask before photographing artisans", "Buy directly from verified workshops", "Carry cash for small purchases"],
    mapQuery: "Mayiladi stone sculpture Kanyakumari Tamil Nadu",
  },
  {
    id: "deventhra-malai",
    name: "Deventhra Malai",
    tagline: "Quiet hill-country detour for views, village roads and green air",
    category: "Nature",
    ticket: "Free",
    timings: "Daylight hours recommended",
    bestTime: "Post-monsoon and winter",
    duration: "1-2 hours",
    distance: "Interior Kanyakumari district",
    description:
      "Deventhra Malai is a lesser-known hill stop suited to travellers who want a quiet rural viewpoint away from the main seafront circuit. The appeal is the approach road, greenery and slower village rhythm.",
    highlights: ["Hill views", "Rural landscape", "Quiet nature stop", "Photography at golden hour"],
    howToReach: "Use a local taxi from Nagercoil or Kanyakumari and confirm the exact access route with residents.",
    nearbyBus: "Nearest bus access depends on the chosen approach village.",
    tips: ["Travel with a local driver", "Avoid isolated hill roads after dark", "Carry water and basic snacks"],
    mapQuery: "Deventhra Malai Kanyakumari Tamil Nadu",
  },
  {
    id: "kumarakovil",
    name: "Kumarakovil / Velimalai Murugan Temple",
    tagline: "Ancient Murugan shrine at the foot of Velimalai",
    category: "Spiritual",
    rating: 4.7,
    ticket: "Free entry",
    timings: "Morning and evening temple hours",
    bestTime: "Festival days and early morning",
    duration: "1-2 hours",
    distance: "Around 35 km from Kanyakumari",
    description:
      "Kumarakovil is a revered Murugan temple set against the Velimalai landscape. It is known for its scenic setting, long-standing devotional traditions and a calm atmosphere outside peak festival periods.",
    highlights: ["Murugan temple", "Velimalai backdrop", "Temple festivals", "Peaceful hill-foot setting"],
    howToReach: "Reach by road from Nagercoil, Thuckalay or Kanyakumari using bus, taxi or auto connections.",
    nearbyBus: "Kumarakovil bus stop is close to the temple approach.",
    tips: ["Dress modestly", "Check festival crowd days", "Combine with Padmanabhapuram Palace or nearby heritage stops"],
    mapQuery: "Kumarakovil Murugan Temple Velimalai Kanyakumari",
  },
  {
    id: "wandering-monk-museum",
    name: "The Wandering Monk Museum",
    tagline: "Museum experience themed around Swami Vivekananda's journey",
    category: "Heritage",
    distance: "In Kanyakumari town",
    description:
      "A museum-style stop that introduces visitors to Vivekananda's life, travels and spiritual connection with Kanyakumari.",
    highlights: ["Vivekananda exhibits", "Educational displays", "Good rainy-day stop", "Close to town attractions"],
  },
  {
    id: "padmanabhapuram-palace",
    name: "Padmanabhapuram Palace",
    tagline: "Travancore-era wooden palace with murals, carvings and courtyards",
    category: "Heritage",
    rating: 4.7,
    ticket: "Ticketed entry",
    timings: "9:00 AM - 4:30 PM; closed Mondays",
    duration: "2-3 hours",
    distance: "Around 35 km from Kanyakumari",
    description:
      "A large timber palace complex once associated with the Travancore rulers, admired for teak architecture, carved ceilings, murals and period rooms.",
    highlights: ["Wooden palace architecture", "Historic murals", "Travancore royal history", "Courtyards and carved interiors"],
  },
  {
    id: "vattakottai-fort",
    name: "Vattakottai Fort",
    tagline: "Seaside Travancore fort with views of sea and hills",
    category: "Heritage",
    rating: 4.6,
    ticket: "Nominal entry",
    timings: "8:00 AM - 5:00 PM",
    distance: "Around 6 km from Kanyakumari",
    description:
      "An 18th-century coastal defense fort built of stone, now a popular viewpoint for the Bay of Bengal, nearby beach and Western Ghats backdrop.",
    highlights: ["Coastal ramparts", "Bay of Bengal views", "Historic defense walls", "Nearby black-sand beach"],
  },
  {
    id: "bharat-mata-temple",
    name: "Bharat Mata Temple",
    tagline: "Patriotic and devotional stop celebrating Mother India",
    category: "Spiritual",
    distance: "In Kanyakumari town",
    description:
      "A temple-style attraction centered on Bharat Mata, often visited as part of a town circuit with the beach, memorials and local museums.",
    highlights: ["Bharat Mata shrine", "Central town stop", "Patriotic theme", "Easy to combine with nearby sights"],
  },
  {
    id: "sunset-point",
    name: "Sunset Point",
    tagline: "Evening viewpoint for the cape's famous ocean sunsets",
    category: "Beach",
    distance: "Near Kanyakumari seafront",
    description:
      "A popular evening gathering spot where visitors watch the sun dip over the sea, especially vivid during clear winter months.",
    highlights: ["Sunset photography", "Sea breeze", "Evening promenade", "Close to town stays"],
  },
  {
    id: "view-tower",
    name: "View Tower",
    tagline: "Elevated lookout for sunrise, sunset and the offshore monuments",
    category: "Heritage",
    distance: "Near Kanyakumari Beach",
    description:
      "A simple viewing tower that helps visitors frame the coastline, Vivekananda Rock, Thiruvalluvar Statue and changing sea colors.",
    highlights: ["Elevated views", "Sunrise and sunset angles", "Offshore monument views", "Quick town stop"],
  },
  {
    id: "mayapuri-wonder-wax",
    name: "Mayapuri Wonder Wax",
    tagline: "Family-friendly wax museum in Kanyakumari",
    category: "Heritage",
    distance: "In Kanyakumari town",
    description:
      "A light indoor attraction with wax figures and photo-friendly displays, useful for families looking for a break between outdoor sightseeing stops.",
    highlights: ["Wax figures", "Indoor attraction", "Photo stop", "Family-friendly visit"],
  },
  {
    id: "tsunami-memorial-park",
    name: "Tsunami Memorial Park",
    tagline: "Seafront memorial remembering the 2004 Indian Ocean tsunami",
    category: "Heritage",
    distance: "Near Kanyakumari shore",
    description:
      "A solemn coastal memorial and park dedicated to those affected by the 2004 tsunami, located close to the town's main seafront.",
    highlights: ["Memorial sculpture", "Quiet reflection", "Coastal setting", "Short stop near the beach"],
  },
  {
    id: "baywatch-park",
    name: "Baywatch Park",
    tagline: "Amusement and water park for families",
    category: "Heritage",
    ticket: "Ticketed entry",
    distance: "Around 2 km from Kanyakumari town",
    description:
      "A family entertainment park with rides and water-based fun, often added to itineraries for children after temple and heritage sightseeing.",
    highlights: ["Family rides", "Water park activities", "Kid-friendly stop", "Half-day entertainment"],
  },
  {
    id: "government-museum",
    name: "Government Museum",
    tagline: "Local history, culture and archaeology exhibits",
    category: "Heritage",
    distance: "In Kanyakumari town",
    description:
      "A compact museum presenting regional artifacts, cultural objects and history displays for visitors who want context beyond the major monuments.",
    highlights: ["Regional artifacts", "Cultural exhibits", "Indoor learning stop", "Useful for students"],
  },
  {
    id: "kanyakumari-eco-park",
    name: "Kanyakumari Eco Park",
    tagline: "Green leisure space for relaxed walks and family time",
    category: "Nature",
    distance: "In or near Kanyakumari town",
    description:
      "A landscaped ecological park suited to slow walks, family outings and a quieter break from the main sightseeing circuit.",
    highlights: ["Green walking space", "Family-friendly", "Relaxed pacing", "Nature-themed stop"],
  },
  {
    id: "udayagiri-fort",
    name: "Udayagiri Fort",
    tagline: "Historic hill fort and biodiversity park near Nagercoil",
    category: "Heritage",
    ticket: "Nominal entry",
    timings: "9:00 AM - 5:00 PM; closed Mondays",
    distance: "Around 34 km from Kanyakumari",
    description:
      "A former Travancore fort associated with De Lannoy, now known for historic remains, shaded grounds and a biodiversity park atmosphere.",
    highlights: ["Fort remains", "De Lannoy history", "Biodiversity park", "Shaded walking trails"],
  },
  {
    id: "nagaraja-temple",
    name: "Nagaraja Temple",
    tagline: "Nagercoil shrine dedicated to the serpent deity Nagaraja",
    category: "Spiritual",
    distance: "Around 18 km from Kanyakumari",
    description:
      "A distinctive temple in Nagercoil linked with serpent worship, local legends and a unique sanctum tradition.",
    highlights: ["Serpent deity shrine", "Nagercoil heritage", "Traditional rituals", "Local legends"],
  },
  {
    id: "st-xavier-church",
    name: "St Xavier Church",
    tagline: "Historic cathedral church at Kottar",
    category: "Spiritual",
    distance: "Around 16 km from Kanyakumari",
    description:
      "A historic Catholic church in Kottar associated with St. Francis Xavier and the region's long coastal Christian heritage.",
    highlights: ["Historic church", "Kottar landmark", "Christian heritage", "Pilgrim stop"],
  },
  {
    id: "sanguthurai-beach",
    name: "Sanguthurai Beach",
    tagline: "Quieter beach near Nagercoil with open sands",
    category: "Beach",
    distance: "Around 15 km from Kanyakumari",
    description:
      "A relatively calm beach option with wide views, suited for an unhurried coastal walk away from the busiest Kanyakumari seafront.",
    highlights: ["Quieter shoreline", "Coastal walks", "Photo-friendly sands", "Easy Nagercoil access"],
  },
  {
    id: "kalikesam-waterfall",
    name: "Kalikesam Waterfall",
    tagline: "Forest-side waterfall in the Western Ghats foothills",
    category: "Nature",
    distance: "Around 45 km from Kanyakumari",
    description:
      "A nature escape near the foothills, known for forest scenery, fresh water and a quieter setting for travelers who enjoy green day trips.",
    highlights: ["Foothill scenery", "Waterfall visit", "Forest drive", "Monsoon freshness"],
  },
  {
    id: "pechiparai-dam",
    name: "Pechiparai Dam",
    tagline: "Reservoir landscape surrounded by green hills",
    category: "Nature",
    distance: "Around 55 km from Kanyakumari",
    description:
      "A scenic dam and reservoir area in the hilly interior of the district, often combined with forest, waterfall and wildlife routes.",
    highlights: ["Reservoir views", "Hill backdrop", "Picnic route", "Gateway to forest areas"],
  },
  {
    id: "muttom-beach",
    name: "Muttom Beach",
    tagline: "Rocky fishing coast with lighthouse views",
    category: "Beach",
    distance: "Around 35 km from Kanyakumari",
    description:
      "A dramatic beach known for rocks, fishing village scenes and a lighthouse backdrop, best visited in calm weather and golden light.",
    highlights: ["Rocky shoreline", "Fishing village atmosphere", "Lighthouse views", "Sunset photography"],
  },
  {
    id: "marunthuvazh-malai",
    name: "Marunthuvazh Malai",
    tagline: "Medicinal hill linked with Ramayana legends and local herbs",
    category: "Nature",
    distance: "Around 11 km from Kanyakumari",
    description:
      "A hill associated with medicinal plants, mythology and sunrise treks, offering broad views of the coast and countryside.",
    highlights: ["Hill trek", "Medicinal plant lore", "Sunrise views", "Mythological connection"],
  },
  {
    id: "thengapattinam-beach",
    name: "Thengapattinam Beach",
    tagline: "Estuary beach where backwater and sea meet",
    category: "Beach",
    distance: "Around 50 km from Kanyakumari",
    description:
      "A scenic coastal village area known for the meeting of river, backwater and sea, with boating ambience and a relaxed shoreline.",
    highlights: ["Estuary views", "Backwater setting", "Village coast", "Evening breeze"],
  },
  {
    id: "kanyakumari-wildlife-sanctuary",
    name: "Kanyakumari Wildlife Sanctuary",
    tagline: "Western Ghats habitat for forest drives and biodiversity",
    category: "Nature",
    distance: "Interior forest belt of Kanyakumari district",
    description:
      "A protected landscape in the southern Western Ghats, valued for biodiversity, forest routes, reservoirs and nature-based excursions.",
    highlights: ["Western Ghats biodiversity", "Forest landscapes", "Birding potential", "Eco-tour routes"],
  },
  {
    id: "chitharal-jain-monuments",
    name: "Chitharal Jain Monuments",
    tagline: "Rock-cut Jain heritage on a hilltop",
    category: "Heritage",
    distance: "Around 45 km from Kanyakumari",
    description:
      "A hilltop monument complex with Jain rock-cut reliefs and later temple layers, reached by a short climb through a quiet rural setting.",
    highlights: ["Jain rock-cut reliefs", "Hilltop views", "Short climb", "Archaeological heritage"],
  },
  {
    id: "our-lady-of-ransom-church",
    name: "Our Lady of Ransom Church",
    tagline: "White Gothic-style church close to the Kanyakumari shore",
    category: "Spiritual",
    distance: "In Kanyakumari town",
    description:
      "A striking coastal church with tall spires and a strong place in Kanyakumari's living faith landscape.",
    highlights: ["Gothic-style facade", "Coastal parish", "Evening lighting", "Town landmark"],
  },
  {
    id: "sripada-parai",
    name: "Sripada Parai Sacred Temple",
    tagline: "Sacred footprint shrine on the offshore rock",
    category: "Spiritual",
    distance: "Beside Vivekananda Rock Memorial",
    description:
      "A sacred shrine associated with the footprint of Goddess Kanya Kumari, commonly visited along with the Vivekananda Rock Memorial.",
    highlights: ["Sacred footprint", "Offshore shrine", "Linked to Kumari Amman legend", "Ferry circuit stop"],
  },
  {
    id: "guganathaswamy-temple",
    name: "Guganathaswamy Temple",
    tagline: "Ancient Shiva temple in Kanyakumari town",
    category: "Spiritual",
    distance: "In Kanyakumari town",
    description:
      "A historic temple dedicated to Lord Shiva, offering a quieter devotional stop near the main town circuit.",
    highlights: ["Ancient Shiva shrine", "Local worship", "Town access", "Calm temple visit"],
  },
  {
    id: "kamarajar-mani-mandapam",
    name: "Kamarajar Mani Mandapam",
    tagline: "Memorial honoring leader K. Kamaraj",
    category: "Heritage",
    distance: "In Kanyakumari town",
    description:
      "A memorial space dedicated to K. Kamaraj, the respected Tamil Nadu leader, suited to visitors interested in modern political history.",
    highlights: ["Kamaraj memorial", "Public history", "Short town stop", "Educational visit"],
  },
  {
    id: "mukkadal-dam",
    name: "Mukkadal Dam",
    tagline: "Quiet reservoir near Nagercoil",
    category: "Nature",
    distance: "Around 25 km from Kanyakumari",
    description:
      "A peaceful dam and reservoir landscape close to Nagercoil, often chosen for short scenic drives and relaxed views.",
    highlights: ["Reservoir scenery", "Short drive from Nagercoil", "Quiet nature stop", "Hill views"],
  },
  {
    id: "peer-mohammed-dargah",
    name: "Peer Mohammed Dargah",
    tagline: "Sufi shrine reflecting the district's faith diversity",
    category: "Spiritual",
    distance: "In Kanyakumari district",
    description:
      "A dargah associated with Sufi tradition and local devotion, adding another thread to the district's multi-faith pilgrimage map.",
    highlights: ["Sufi shrine", "Local devotion", "Multi-faith heritage", "Peaceful prayer stop"],
  },
  {
    id: "olakaruvi-waterfalls",
    name: "Olakaruvi / Ullakaarvi Waterfalls",
    tagline: "Trek-friendly waterfall in a green hill setting",
    category: "Nature",
    distance: "Around 35 km from Kanyakumari",
    description:
      "A waterfall reached through a nature route, rewarding visitors with forest ambience and seasonal cascades.",
    highlights: ["Waterfall trek", "Forest ambience", "Seasonal flow", "Nature photography"],
  },
  {
    id: "thirunanthikarai-cave-temple",
    name: "Thirunanthikarai Cave Temple",
    tagline: "Rock-cut cave temple with ancient art traces",
    category: "Heritage",
    distance: "Around 45 km from Kanyakumari",
    description:
      "An old cave temple site in the district's interior, known for rock-cut architecture and links to early sacred art traditions.",
    highlights: ["Rock-cut shrine", "Ancient heritage", "Interior day trip", "Quiet archaeological stop"],
  },
  {
    id: "thiruchendur-murugan-temple",
    name: "Thiruchendur Murugan Temple",
    tagline: "Major seaside Murugan temple often paired with south Tamil Nadu pilgrimages",
    category: "Spiritual",
    distance: "Around 90 km from Kanyakumari",
    description:
      "A celebrated coastal Murugan temple outside Kanyakumari district, popular with pilgrims extending their itinerary along the Tamil Nadu coast.",
    highlights: ["Seaside Murugan shrine", "Major pilgrimage center", "Coastal temple architecture", "Full-day trip option"],
  },
  {
    id: "mahavirswami-jain-temple-dadawadi",
    name: "Mahavirswami Jain Temple Dadawadi",
    tagline: "Jain devotional stop in the Kanyakumari circuit",
    category: "Spiritual",
    distance: "In Kanyakumari district",
    description:
      "A Jain temple and community shrine that complements the district's better-known Chitharal Jain heritage.",
    highlights: ["Jain temple", "Community shrine", "Quiet worship", "Heritage extension"],
  },
  {
    id: "sothavilai-beach",
    name: "Chothavilai Beach / Sothavilai Beach",
    tagline: "Long sandy beach ideal for a quieter coastal evening",
    category: "Beach",
    distance: "Around 10 km from Kanyakumari",
    description:
      "A spacious, less-crowded beach stretch near Kanyakumari, good for walks, sunset time and simple coastal relaxation.",
    highlights: ["Long sandy stretch", "Less crowded coast", "Sunset walks", "Easy town access"],
  },
  {
    id: "thirparappu-falls",
    name: "Thiruparrapu Falls / Tirparappu Water Falls",
    tagline: "Popular cascade on the Kodayar river",
    category: "Nature",
    rating: 4.5,
    ticket: "Nominal entry",
    timings: "8:00 AM - 6:00 PM",
    distance: "Around 55 km from Kanyakumari",
    description:
      "A broad waterfall and picnic spot where the Kodayar river drops across a rocky ledge, commonly combined with nearby temples and Mathur Aqueduct.",
    highlights: ["Waterfall bathing area", "Picnic grounds", "Nearby Mahadeva temple", "Post-monsoon flow"],
  },
  {
    id: "keeriparai-reserve-forest",
    name: "Keeriparai Reserve Forest / Keeriparai Wildlife Sanctuary",
    tagline: "Forest route for nature lovers and birdwatchers",
    category: "Nature",
    distance: "Around 40 km from Kanyakumari",
    description:
      "A green reserve-forest area in the Western Ghats foothills, best approached as a guided nature drive or birding-oriented day trip.",
    highlights: ["Reserve forest route", "Birding and greenery", "Western Ghats foothills", "Nature day trip"],
  },
];

export const places: Place[] = placeSeeds.map(makePlace);
