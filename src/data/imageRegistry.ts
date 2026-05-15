import placePlaceholder from "@/assets/place-beach.jpg";
import stayPlaceholder from "@/assets/stay-hotel.jpg";
import foodPlaceholder from "@/assets/food-thali.jpg";

// Single image registry.
// Add your local files under src/assets, import them here, then replace the placeholder value.
// Suggested filenames: use the matching id, for example src/assets/vivekananda-rock-memorial.jpg.

export const placeImages: Record<string, string> = {
  "vivekananda-rock-memorial": placePlaceholder,
  "thiruvalluvar-statue": placePlaceholder,
  "devi-kanyakumari-temple": placePlaceholder,
  "gandhi-mandapam": placePlaceholder,
  "mathur-aqueduct": placePlaceholder,
  "thanumalayan-suchindram-temple": placePlaceholder,
  "kanyakumari-beach": placePlaceholder,
  "sunrise-sunset-viewing": placePlaceholder,
  "poovar-backwater-boating": placePlaceholder,
  "mayiladi-kal-sirpangal": placePlaceholder,
  "deventhra-malai": placePlaceholder,
  "kumarakovil": placePlaceholder,
  "wandering-monk-museum": placePlaceholder,
  "padmanabhapuram-palace": placePlaceholder,
  "vattakottai-fort": placePlaceholder,
  "bharat-mata-temple": placePlaceholder,
  "sunset-point": placePlaceholder,
  "view-tower": placePlaceholder,
  "mayapuri-wonder-wax": placePlaceholder,
  "tsunami-memorial-park": placePlaceholder,
  "baywatch-park": placePlaceholder,
  "government-museum": placePlaceholder,
  "kanyakumari-eco-park": placePlaceholder,
  "udayagiri-fort": placePlaceholder,
  "nagaraja-temple": placePlaceholder,
  "st-xavier-church": placePlaceholder,
  "sanguthurai-beach": placePlaceholder,
  "kalikesam-waterfall": placePlaceholder,
  "pechiparai-dam": placePlaceholder,
  "muttom-beach": placePlaceholder,
  "marunthuvazh-malai": placePlaceholder,
  "thengapattinam-beach": placePlaceholder,
  "kanyakumari-wildlife-sanctuary": placePlaceholder,
  "chitharal-jain-monuments": placePlaceholder,
  "our-lady-of-ransom-church": placePlaceholder,
  "sripada-parai": placePlaceholder,
  "guganathaswamy-temple": placePlaceholder,
  "kamarajar-mani-mandapam": placePlaceholder,
  "mukkadal-dam": placePlaceholder,
  "peer-mohammed-dargah": placePlaceholder,
  "olakaruvi-waterfalls": placePlaceholder,
  "thirunanthikarai-cave-temple": placePlaceholder,
  "thiruchendur-murugan-temple": placePlaceholder,
  "mahavirswami-jain-temple-dadawadi": placePlaceholder,
  "sothavilai-beach": placePlaceholder,
  "thirparappu-falls": placePlaceholder,
  "keeriparai-reserve-forest": placePlaceholder,
};

export const stayImages: Record<string, string> = {
  "annai-resorts-spa": stayPlaceholder,
  "sparsa-resorts-kanyakumari": stayPlaceholder,
  "hotel-sea-view": stayPlaceholder,
  "hotel-temple-citi": stayPlaceholder,
  "hotel-sangam": stayPlaceholder,
  "sea-breeze-homestay": stayPlaceholder,
};

export const foodImages: Record<string, string> = {
  "nearby-restaurant": foodPlaceholder,
};

export const eventImages: Record<string, string> = {
  "suchindram-margazhi-car-festival": placePlaceholder,
  "thai-pongal-coastal-harvest": placePlaceholder,
  "mahashivaratri-temple-night": placePlaceholder,
  "chitra-pournami": placePlaceholder,
  "vaisakhi-kumari-amman": placePlaceholder,
  "southwest-monsoon-waterfall-season": placePlaceholder,
  "kalabham-sandal-festival": placePlaceholder,
  "adi-amman-observances": placePlaceholder,
  "onam-padmanabhapuram-cultural-season": placePlaceholder,
  "navaratri-kumari-amman": placePlaceholder,
  "cape-festival": placePlaceholder,
  "christmas-coastal-celebrations": placePlaceholder,
};

export function imageFor(registry: Record<string, string>, id: string, fallback: string) {
  return registry[id] ?? fallback;
}
