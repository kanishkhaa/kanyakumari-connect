import vivek from "@/assets/place-vivekanandharock.jpg";
import thiru from "@/assets/place-thiruvalluvar.jpg";
import temple from "@/assets/place-suchindram.jpg";
import beach from "@/assets/place-capecomorin.jpg";
import palace from "@/assets/place-padmanabhapurampalace.jpg";
import waterfall from "@/assets/place-waterfall.jpg";
import vatta from "@/assets/place-vattakottaifort.jpg";
import aqueduct from "@/assets/place-mathurhanging.jpg";
import sunset from "@/assets/place-sunsetpoint.jpg";
import spiritual from "@/assets/place-kumariammantemple.jpg";
import nature from "@/assets/region-hills.jpg";
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
  { id: "p9", title: "Sunrise on the Bay of Bengal", category: "Landscapes", image: sunset },
  { id: "p10", title: "Kumari Amman Temple", category: "Spiritual", image: spiritual },
  { id: "p11", title: "Western Ghats foothills", category: "Landscapes", image: nature },
  { id: "p12", title: "Heritage palace courtyard", category: "Heritage", image: palace },
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
  { id: "v1", title: "Kanyakumari in 60 sec", duration: "1:02", category: "Highlights", poster: beach, youtubeId: "VBlrMG2eSbo" },
  { id: "v2", title: "Aerial — Vivekananda Rock & Thiruvalluvar", duration: "2:34", category: "Drone", poster: vivek, youtubeId: "zPI5RSMiLCM" },
  { id: "v3", title: "Kani tribal kitchen Food", duration: "4:18", category: "Food", poster: village, youtubeId: "6kgm9PkN7dQ" },
  { id: "v4", title: "Margazhi at the temple", duration: "3:45", category: "Culture", poster: dance, youtubeId: "cp16Eya0CeQ" },
  { id: "v5", title: "Padmanabhapuram walkthrough", duration: "5:12", category: "Culture", poster: palace, youtubeId: "0UUYDc-BOTQ" },
  { id: "v6", title: "Drone over Sothavilai beach", duration: "2:01", category: "Drone", poster: beach, youtubeId: "wMV3cjRMV3E" },
];
