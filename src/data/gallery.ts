import vivek from "@/assets/place-vivekananda.jpg";
import thiru from "@/assets/place-thiruvalluvar.jpg";
import temple from "@/assets/place-temple.jpg";
import beach from "@/assets/place-beach.jpg";
import palace from "@/assets/place-palace.jpg";
import waterfall from "@/assets/place-waterfall.jpg";
import vatta from "@/assets/place-vattakottai.jpg";
import aqueduct from "@/assets/place-aqueduct.jpg";
import heroBeach from "@/assets/hero-beach.jpg";
import heroSpiritual from "@/assets/hero-spiritual.jpg";
import heroNature from "@/assets/hero-nature.jpg";
import heroHeritage from "@/assets/hero-heritage.jpg";
import dance from "@/assets/exp-dance.jpg";
import weaving from "@/assets/exp-weaving.jpg";
import fishing from "@/assets/exp-fishing.jpg";
import village from "@/assets/region-village.jpg";

export type Photo = {
  id: string;
  title: string;
  category: "Landscapes" | "Heritage" | "People" | "Spiritual";
  image: string;
};

export const photos: Photo[] = [
  { id: "p1", title: "Vivekananda Rock at dawn", category: "Spiritual", image: vivek },
  { id: "p2", title: "Thiruvalluvar Statue", category: "Heritage", image: thiru },
  { id: "p3", title: "Suchindram temple gopuram", category: "Heritage", image: temple },
  { id: "p4", title: "Sothavilai beach", category: "Landscapes", image: beach },
  { id: "p5", title: "Padmanabhapuram palace", category: "Heritage", image: palace },
  { id: "p6", title: "Thirparappu Falls", category: "Landscapes", image: waterfall },
  { id: "p7", title: "Vattakottai Fort", category: "Heritage", image: vatta },
  { id: "p8", title: "Mathur Aqueduct", category: "Heritage", image: aqueduct },
  { id: "p9", title: "Sunrise on the Bay of Bengal", category: "Landscapes", image: heroBeach },
  { id: "p10", title: "Spiritual triad at sunrise", category: "Spiritual", image: heroSpiritual },
  { id: "p11", title: "Western Ghats foothills", category: "Landscapes", image: heroNature },
  { id: "p12", title: "Heritage palace courtyard", category: "Heritage", image: heroHeritage },
  { id: "p13", title: "Bharatanatyam at the temple", category: "People", image: dance },
  { id: "p14", title: "Master weaver at the loom", category: "People", image: weaving },
  { id: "p15", title: "Sunrise with fishermen", category: "People", image: fishing },
  { id: "p16", title: "A coastal fishing village", category: "People", image: village },
];

export type Video = {
  id: string;
  title: string;
  duration: string;
  category: "Highlights" | "Drone" | "Culture" | "Food";
  poster: string;
  // Use YouTube embeds for demo content
  youtubeId: string;
};

export const videos: Video[] = [
  { id: "v1", title: "Kanyakumari in 60 seconds", duration: "1:02", category: "Highlights", poster: heroBeach, youtubeId: "ScMzIvxBSi4" },
  { id: "v2", title: "Aerial — Vivekananda Rock & Thiruvalluvar", duration: "2:34", category: "Drone", poster: vivek, youtubeId: "ScMzIvxBSi4" },
  { id: "v3", title: "Kani tribal kitchen", duration: "4:18", category: "Food", poster: village, youtubeId: "ScMzIvxBSi4" },
  { id: "v4", title: "Margazhi at the temple", duration: "3:45", category: "Culture", poster: dance, youtubeId: "ScMzIvxBSi4" },
  { id: "v5", title: "Padmanabhapuram walkthrough", duration: "5:12", category: "Culture", poster: palace, youtubeId: "ScMzIvxBSi4" },
  { id: "v6", title: "Drone over Sothavilai beach", duration: "2:01", category: "Drone", poster: beach, youtubeId: "ScMzIvxBSi4" },
];
