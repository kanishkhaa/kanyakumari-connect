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

const event = (id: string, title: string, date: string, month: string, location: string, category: EventItem["category"], description: string): EventItem => ({
  id, title, date, month, location, category, image: imageFor(eventImages, id, placePlaceholder), description,
});

// Existing Kanyakumari Connect events, retained as requested.
const featuredEvents: EventItem[] = [
  event("suchindram-margazhi-car-festival", "Suchindram Margazhi Car Festival", "December / January", "January", "Thanumalayan Temple, Suchindram", "Spiritual", "The famous 10-day Margazhi festival at Suchindram features temple processions and the car festival."),
  event("thai-pongal-coastal-harvest", "Thai Pongal and Coastal Harvest Celebrations", "Mid-January / February village follow-ups", "February", "Villages across Kanniyakumari district", "Cultural", "Pongal season brings community gatherings, temple visits and harvest-linked village observances."),
  event("mahashivaratri-temple-night", "Maha Shivaratri Temple Night", "February / March", "March", "Suchindram and district Shiva shrines", "Spiritual", "Night-long Shiva worship, special pujas and devotional music are observed at major Shiva shrines."),
  event("chitra-pournami", "Chitra Pournami Full-Moon Viewing", "April / May", "April", "Kanniyakumari Beach and View Tower", "Festival", "Travellers gather at the cape to watch the seasonal spectacle of sunset and moonrise over the waters."),
  event("vaisakhi-kumari-amman", "Vaisakhi Festival at Kumari Amman Temple", "May / June", "May", "Kumari Amman Temple, Kanniyakumari", "Spiritual", "A major annual festival with special rituals and processions of the utsava idol of Goddess Kumari."),
  event("southwest-monsoon-waterfall-season", "Monsoon Waterfall Season", "June", "June", "Thirparappu Falls and Western Ghats foothills", "Cultural", "The southwest monsoon refreshes hill routes and waterfalls for cautious day trips."),
  event("kalabham-sandal-festival", "Kalabham Sandal Festival", "Temple calendar", "July", "Kumari Amman Temple, Kanniyakumari", "Spiritual", "A sandal-paste festival with special adornment and worship rituals."),
  event("adi-amman-observances", "Aadi Amman Observances", "July / August", "August", "Amman temples across Kanniyakumari district", "Festival", "Aadi season brings special Amman worship, community offerings and local temple gatherings."),
  event("onam-padmanabhapuram-cultural-season", "Onam and Travancore Heritage Season", "August / September", "September", "Padmanabhapuram Palace, Thuckalay and Nagercoil belt", "Cultural", "The district's Travancore links are especially visible around Padmanabhapuram and Kerala-border communities."),
  event("navaratri-kumari-amman", "Navaratri at Kumari Amman Temple", "September / October", "October", "Kumari Amman Temple and Kanniyakumari town", "Festival", "Nine nights of Devi worship, music and processions make Navaratri a key pilgrimage period."),
  event("cape-festival", "Cape Festival", "October / November", "November", "Kanniyakumari seafront and Triveni Sangam", "Cultural", "A cultural celebration of the cape with music, dance and public programmes near the three-sea confluence."),
  event("christmas-coastal-celebrations", "Christmas and Year-End Coastal Celebrations", "December", "December", "Our Lady of Ransom Church and coastal parishes", "Festival", "Coastal churches become focal points for Christmas services, lights and community gatherings."),
];

// Additional listings from the Kanniyakumari District Administration's Events & Festivals page.
const officialEvents: EventItem[] = [
  event("pongal-festival", "Pongal Festival", "15 January", "January", "Across Kanniyakumari district", "Festival", "Annual Pongal celebrations are held across the district on 15 January."),
  event("kumari-thiruvizha", "Kumari Thiruvizha", "May", "May", "Kanniyakumari", "Cultural", "An annual May festival with cultural activities for residents and visitors."),
  event("vavubali-exhibition", "Vavubali Exhibition", "Annual", "Annual", "Kuzhithurai", "Fair", "A Tourism Department pavilion exhibits photographs of important tourist places in Tamil Nadu and Kanniyakumari."),
  event("bagavathiamman-festival", "Kanniyakumari Bagavathiamman Festival", "Temple calendar", "Annual", "Kanniyakumari", "Spiritual", "A major temple festival dedicated to Bhagavathi Amman at Kanniyakumari."),
  event("vaikasi-visagam", "Vaikasi Visagam", "10 days", "Vaikasi", "Kanniyakumari district", "Spiritual", "Vaikasi Visagam is celebrated for ten days."),
  event("thirukarthigai", "Thirukarthigai", "1 day", "Karthigai", "Kanniyakumari district", "Festival", "Thirukarthigai is celebrated as a one-day festival."),
  event("aadi-ammavasai", "Aadi Ammavasai", "1 day", "Aadi", "Kanniyakumari district", "Spiritual", "Aadi Ammavasai is celebrated as a one-day observance."),
  event("thai-ammavasai", "Thai Ammavasai", "1 day", "Thai", "Kanniyakumari district", "Spiritual", "Thai Ammavasai is celebrated as a one-day observance."),
  event("mandaikadu-kodai", "Mandaikadu Kodai Festival", "10 days before the last Tuesday of Masi", "Masi", "Mandaikadu Temple", "Spiritual", "Begins with flag hoisting and includes nightly processions, Valiya Padukkai, Odukku Pooja, Ettam Kodai and Bharani Kodai."),
  event("francis-xavier-cathedral-festival", "St. Francis Xavier's Cathedral Festival", "10 days", "November / December", "Kottar, Nagercoil", "Spiritual", "The annual cathedral festival is celebrated for ten days during November and December."),
];

export const events: EventItem[] = [...featuredEvents, ...officialEvents];
