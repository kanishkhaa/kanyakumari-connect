import beachImg from "@/assets/place-beach.jpg";
import vivekanandaImg from "@/assets/place-vivekananda.jpg";
import thiruvalluvarImg from "@/assets/place-thiruvalluvar.jpg";
import templeImg from "@/assets/place-temple.jpg";
import palaceImg from "@/assets/place-palace.jpg";
import waterfallImg from "@/assets/place-waterfall.jpg";
import shellsImg from "@/assets/market-shells.jpg";
import fishImg from "@/assets/food-fishcurry.jpg";

export type Speciality = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  intro: string;
  highlights: string[];
  sections: {
    title: string;
    description: string;
    items: string[];
  }[];
  packages: {
    title: string;
    location: string;
    duration: string;
    description: string;
  }[];
};

export const specialities: Speciality[] = [
  {
    id: "three-seas",
    title: "Three-Sea Confluence",
    category: "Nature",
    image: beachImg,
    description:
      "Triveni Sangam is Kanyakumari's signature sight, where the Arabian Sea, Bay of Bengal and Indian Ocean meet beside Cape Comorin Beach.",
    intro:
      "The southern tip of mainland India is defined by the meeting of the Arabian Sea, Bay of Bengal and Indian Ocean. This is the landscape behind Kanyakumari's sunrise rituals, full-moon views and Cape Festival gatherings.",
    highlights: ["Triveni Sangam", "Sunrise and sunset", "Cape Comorin Beach", "View Tower"],
    sections: [
      {
        title: "What to experience",
        description: "The seafront is best explored slowly, starting before sunrise and returning at sunset.",
        items: ["Sunrise at the main beach", "Sunset Point evening walk", "View Tower photography", "Full-moon moonrise viewing"],
      },
      {
        title: "Nearby stops",
        description: "Most of the town's core landmarks are close enough to combine on foot or by auto.",
        items: ["Kumari Amman Temple", "Gandhi Mandapam", "Vivekananda ferry jetty", "Tsunami Memorial Park"],
      },
    ],
    packages: [
      {
        title: "Cape Sunrise Walk",
        location: "Kanyakumari Beach",
        duration: "2 hours",
        description: "Start at dawn, watch the confluence light change and finish with breakfast near the seafront.",
      },
      {
        title: "Sunset and Full-Moon Trail",
        location: "Sunset Point and View Tower",
        duration: "3 hours",
        description: "An evening route designed around Kanyakumari's famous sunset and seasonal moonrise views.",
      },
    ],
  },
  {
    id: "sunrise-sunset",
    title: "Sunrise, Sunset and Moonrise",
    category: "Viewpoints",
    image: thiruvalluvarImg,
    description:
      "The cape is loved for sunrise and sunset over water, and on select full-moon days visitors watch sunset and moonrise together.",
    intro:
      "Kanyakumari's horizon is its theatre. Clear-season mornings and evenings create the best conditions for viewing the sun, sea and offshore monuments together.",
    highlights: ["Sunrise", "Sunset Point", "Chitra Pournami", "Offshore skyline"],
    sections: [
      {
        title: "Best viewpoints",
        description: "Choose a viewpoint by light direction, crowd level and whether you want the monuments in frame.",
        items: ["Main beach for sunrise", "Sunset Point for evenings", "View Tower for elevation", "Vattakottai for a quieter coastal view"],
      },
      {
        title: "When to go",
        description: "October to March generally gives clearer skies and more comfortable weather.",
        items: ["Reach 30 minutes early", "Carry a light shawl for breezy mornings", "Avoid risky rock edges", "Check monsoon sea conditions"],
      },
    ],
    packages: [
      {
        title: "Photo Morning",
        location: "Beach, View Tower, ferry jetty",
        duration: "3 hours",
        description: "A short photography route focused on dawn light, the Thiruvalluvar Statue and the beach promenade.",
      },
      {
        title: "Vattakottai Golden Hour",
        location: "Vattakottai Fort",
        duration: "Half day",
        description: "Combine the seaside fort, quiet beach views and late-afternoon coastal light.",
      },
    ],
  },
  {
    id: "spiritual-landmarks",
    title: "Spiritual Landmarks",
    category: "Pilgrimage",
    image: templeImg,
    description:
      "Kumari Amman Temple, Suchindram Temple, Sripada Parai, Nagaraja Temple, churches and dargahs make the district a multi-faith pilgrimage route.",
    intro:
      "Kanyakumari is a living pilgrimage destination, not just a sightseeing stop. Ancient temple traditions, Christian coastal churches, Jain heritage and Sufi devotion all sit within the district's travel map.",
    highlights: ["Kumari Amman Temple", "Suchindram Temple", "Nagaraja Temple", "Our Lady of Ransom Church"],
    sections: [
      {
        title: "Temple circuit",
        description: "The classic route begins in Kanyakumari town and extends to Suchindram and Nagercoil.",
        items: ["Kumari Amman Temple", "Guganathaswamy Temple", "Suchindram Thanumalayan Temple", "Nagaraja Temple"],
      },
      {
        title: "Faith diversity",
        description: "The district's sacred landscape includes churches, dargahs and Jain monuments.",
        items: ["Our Lady of Ransom Church", "St Xavier Church", "Peer Mohammed Dargah", "Chitharal Jain Monuments"],
      },
    ],
    packages: [
      {
        title: "Kanyakumari Temple Morning",
        location: "Town temple circuit",
        duration: "4 hours",
        description: "Visit Kumari Amman Temple, Guganathaswamy Temple and nearby memorials before the afternoon heat.",
      },
      {
        title: "Suchindram and Nagercoil Pilgrim Route",
        location: "Suchindram and Nagercoil",
        duration: "Full day",
        description: "Cover Thanumalayan Temple, Nagaraja Temple and St Xavier Church with local transport breaks.",
      },
    ],
  },
  {
    id: "vivekananda-rock",
    title: "Vivekananda Rock Legacy",
    category: "Heritage",
    image: vivekanandaImg,
    description:
      "The ferry circuit to Vivekananda Rock Memorial and the Thiruvalluvar Statue gives Kanyakumari its most recognizable skyline.",
    intro:
      "The offshore rocks are Kanyakumari's most photographed landmarks. The ferry trip combines Vivekananda's meditation legacy, Sripada Parai and the monumental Thiruvalluvar Statue.",
    highlights: ["Vivekananda Rock Memorial", "Thiruvalluvar Statue", "Sripada Parai", "Ferry ride"],
    sections: [
      {
        title: "Core landmarks",
        description: "Plan the offshore circuit early in the day to reduce queue time and heat exposure.",
        items: ["Vivekananda Rock Memorial", "Dhyana Mandapam", "Sripada Mandapam", "Thiruvalluvar Statue"],
      },
      {
        title: "Visitor notes",
        description: "Ferry operations depend on sea conditions and queues grow during holidays.",
        items: ["Arrive early", "Carry water", "Keep footwear practical", "Respect silence in meditation areas"],
      },
    ],
    packages: [
      {
        title: "Offshore Icons Circuit",
        location: "Ferry jetty and rock memorial",
        duration: "3 hours",
        description: "A guided ferry-based visit covering Vivekananda Rock, Sripada Parai and Thiruvalluvar Statue views.",
      },
      {
        title: "Vivekananda Reflection Session",
        location: "Dhyana Mandapam",
        duration: "2 hours",
        description: "A slower visit focused on meditation, architecture and the story of Vivekananda's Kanyakumari stay.",
      },
    ],
  },
  {
    id: "travancore-heritage",
    title: "Travancore Heritage",
    category: "History",
    image: palaceImg,
    description:
      "Padmanabhapuram Palace, Vattakottai Fort, Udayagiri Fort and Mathur Aqueduct show palace, defense and irrigation history.",
    intro:
      "Beyond the beach, Kanyakumari district preserves a strong Travancore-era layer through wooden palace architecture, coastal defense forts and irrigation engineering.",
    highlights: ["Padmanabhapuram Palace", "Vattakottai Fort", "Udayagiri Fort", "Mathur Aqueduct"],
    sections: [
      {
        title: "Built heritage",
        description: "These sites work best as a day route because several are outside Kanyakumari town.",
        items: ["Padmanabhapuram Palace", "Vattakottai Fort", "Udayagiri Fort", "Mathur Hanging Trough"],
      },
      {
        title: "How to plan",
        description: "Start with the palace on open days, then combine fort or aqueduct stops depending on route.",
        items: ["Check Monday closures", "Use a cab for distant sites", "Carry water", "Hire a guide at the palace if available"],
      },
    ],
    packages: [
      {
        title: "Travancore Heritage Day",
        location: "Padmanabhapuram, Udayagiri, Vattakottai",
        duration: "Full day",
        description: "A heritage circuit linking palace interiors, fort grounds and the coastal ramparts.",
      },
      {
        title: "Mathur and Thirparappu Combo",
        location: "Mathur Aqueduct and Thirparappu Falls",
        duration: "Full day",
        description: "A green inland route combining irrigation history, valley views and waterfall time.",
      },
    ],
  },
  {
    id: "western-ghats",
    title: "Western Ghats Escapes",
    category: "Eco",
    image: waterfallImg,
    description:
      "Thirparappu, Kalikesam, Pechiparai, Keeriparai and Marunthuvazh Malai balance the coast with forest, waterfall and hill trips.",
    intro:
      "The district rises quickly from coast to Western Ghats foothills. Waterfalls, dams, reserve forests and medicinal hill lore make nature routes a strong second half of a Kanyakumari trip.",
    highlights: ["Thirparappu Falls", "Pechiparai Dam", "Keeriparai Reserve Forest", "Marunthuvazh Malai"],
    sections: [
      {
        title: "Water and forest routes",
        description: "Post-monsoon months are ideal for waterfalls and reservoir scenery.",
        items: ["Thirparappu Falls", "Kalikesam Waterfall", "Pechiparai Dam", "Keeriparai Reserve Forest"],
      },
      {
        title: "Soft adventure",
        description: "Pick realistic routes by season and avoid isolated forest sections without local guidance.",
        items: ["Marunthuvazh Malai sunrise hike", "Birding near forest edges", "Dam viewpoint drive", "Rubber plantation scenery"],
      },
    ],
    packages: [
      {
        title: "Waterfall and Dam Day",
        location: "Thirparappu and Pechiparai",
        duration: "Full day",
        description: "A family-friendly nature route with waterfall time, reservoir views and lunch in the interior.",
      },
      {
        title: "Marunthuvazh Malai Sunrise",
        location: "Marunthuvazh Malai",
        duration: "3 hours",
        description: "An early hill walk focused on coastal views, medicinal plant lore and sunrise light.",
      },
    ],
  },
  {
    id: "coastal-cuisine",
    title: "Coastal Cuisine",
    category: "Food",
    image: fishImg,
    description:
      "Fish curry, appam, kothu parotta, banana chips, jackfruit fritters and palm fruit juice reflect Kanyakumari's sea-and-spice table.",
    intro:
      "Kanyakumari's food reflects Tamil coastal cooking, Kerala influence and the district's everyday fish markets. Meals are direct, spicy, coconut-rich and easy to explore through breakfast shops, seafood messes and snack stalls.",
    highlights: ["Fish curry", "Kothu parotta", "Appam", "Banana chips"],
    sections: [
      {
        title: "Must-try dishes",
        description: "Start with the dishes most commonly associated with Kanyakumari's coast and street-food culture.",
        items: ["Meen kuzhambu", "Kothu parotta", "Appam with stew", "Idiyappam and puttu"],
      },
      {
        title: "Snacks and drinks",
        description: "Carry-home food souvenirs are easy to find around markets and snack shops.",
        items: ["Banana chips", "Jackfruit fritters", "Palm fruit juice", "Local spice packets"],
      },
    ],
    packages: [
      {
        title: "Breakfast to Beach Food Trail",
        location: "Kanyakumari town",
        duration: "Half day",
        description: "Try appam, idiyappam, fish curry lunch and evening snacks around the beach road.",
      },
      {
        title: "Nagercoil Snack Run",
        location: "Nagercoil markets",
        duration: "3 hours",
        description: "A short food-shopping route for banana chips, spice packets and local sweets.",
      },
    ],
  },
  {
    id: "sea-crafts",
    title: "Sea Crafts and Palm Leaf Work",
    category: "Craft",
    image: shellsImg,
    description:
      "Beachfront stalls and local emporiums are known for seashell souvenirs, palm-leaf articles, wood craft, bamboo items and framed keepsakes.",
    intro:
      "Shopping in Kanyakumari is souvenir-led rather than mall-led. Beach stalls and craft outlets are known for seashell items, palm-leaf work, wood, bamboo, brass idols and small keepsakes.",
    highlights: ["Seashell craft", "Palm-leaf articles", "Wood and bamboo craft", "Co-op textiles"],
    sections: [
      {
        title: "What to buy",
        description: "Look for compact, travel-friendly items that reflect the coast and local craft traditions.",
        items: ["Shell jewellery", "Decorative conch shells", "Palm-leaf drawings", "Wooden showpieces"],
      },
      {
        title: "Where to browse",
        description: "Beachfront stalls are lively in the evening; emporiums are better for fixed-price craft shopping.",
        items: ["Beach Road stalls", "Poompuhar Handicrafts Emporium", "Tamil Nadu craft outlets", "Co-op textile stores"],
      },
    ],
    packages: [
      {
        title: "Beach Souvenir Walk",
        location: "Kanyakumari Beach Road",
        duration: "2 hours",
        description: "Browse shell craft, sea-sand keepsakes, palm-leaf items and small gifts after sunset.",
      },
      {
        title: "Craft and Textile Browse",
        location: "Kanyakumari and Nagercoil",
        duration: "Half day",
        description: "Visit craft outlets and textile stores for better-quality souvenirs and handloom pieces.",
      },
    ],
  },
];
