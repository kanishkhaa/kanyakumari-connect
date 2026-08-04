import weavingImg from "@/assets/exp-weaving.jpg";
import fishingImg from "@/assets/exp-fishing.jpg";
import cookingImg from "@/assets/exp-cooking.jpg";
import danceImg from "@/assets/exp-dance.jpg";
import meditationRetreatImg from "@/assets/place-muttombeach.jpg";
import waterfallImg from "@/assets/place-waterfall.jpg";
import vattakottaiImg from "@/assets/place-vattakottai.jpg";

export type Experience = {
  id: string;
  title: string;
  host: string;
  image: string;
  duration: string;
  price: number;
  groupSize: string;
  category: "Cultural" | "Food" | "Nature" | "Craft" | "Wellness" | "Adventure";
  description: string;
  bookingUrl: string;
  bookingProvider: string;
  bookingNote: string;
  details?: Array<{ heading: string; items: string[] }>;
};

export const experiences: Experience[] = [
  {
    id: "beachfront-meditation-retreat",
    title: "Beachfront Meditation Retreat",
    host: "Vivekananda Kendra, Vivekanandapuram",
    image: meditationRetreatImg,
    duration: "2 hours",
    price: 900,
    groupSize: "1-12 people",
    category: "Wellness",
    description:
      "Find a peaceful base close to Kanyakumari Beach and Vivekananda Rock Memorial, with meditation halls, exhibitions and green surroundings at Vivekanandapuram.",
    bookingUrl: "https://yatra.vrmvk.org/",
    bookingProvider: "Vivekananda Kendra",
    bookingNote: "Complete availability and payment through the provider's official reservation portal.",
    details: [{
      heading: "Vivekanandapuram stay information",
      items: [
        "The campus is near Kanyakumari Beach and Vivekananda Rock Memorial, with meditation halls and exhibitions.",
        "The official portal supports online room reservations and payment confirmation.",
        "Carry a valid government photo ID for check-in; foreign nationals also need passport and visa documents.",
      ],
    }],
  },
  {
    id: "coastal-culinary-adventure",
    title: "Coastal Culinary Adventure",
    host: "Home cooks and seafood specialists",
    image: cookingImg,
    duration: "4 hours",
    price: 1600,
    groupSize: "2-10 people",
    category: "Food",
    description:
      "Use this food-focused stop to choose a restaurant near Kanyakumari Beach, with Indian, Asian, seafood and vegetarian-friendly options listed by the provider.",
    bookingUrl: "https://www.tripadvisor.in/RestaurantsNear-g608476-d2155348-Kanyakumari_Beach-Kanyakumari_Kanyakumari_District_Tamil_Nadu.html",
    bookingProvider: "Tripadvisor restaurant guide",
    bookingNote: "Restaurant availability, reservations and payment are handled by the individual restaurant or its linked booking service.",
    details: [
      {
        heading: "Nearby restaurant guide",
        items: [
          "The Curry — 4.2/5 from 467 reviews; Indian and Asian cuisine; about 0.6 km from the beach.",
          "Sea View Restaurant — 3.9/5 from 231 reviews; Indian and seafood; about 0.6 km away.",
          "The Ocean Restaurant — 3.9/5 from 205 reviews; an upscale option about 0.5 km from the beach.",
          "Zam Zam Restaurant — 4.1/5 from 19 reviews; Indian and Arabic cuisine; about 0.6 km away.",
          "Hotel Saravana — 3.4/5 from 337 reviews; Indian and Asian cuisine; about 0.8 km away.",
          "Triveni — 3.6/5 from 87 reviews; Indian and Asian cuisine; about 0.7 km away.",
          "The provider lists 33 restaurants within a 16 km radius, with filters for meal type, cuisine, price, dietary needs, takeaway, table service and delivery.",
        ],
      },
    ],
  },
  {
    id: "wildlife-safari-excursion",
    title: "Wildlife Safari Excursion",
    host: "Kanyakumari Wildlife Sanctuary information guide",
    image: waterfallImg,
    duration: "6 hours",
    price: 2200,
    groupSize: "2-8 people",
    category: "Nature",
    description:
      "Use the sanctuary guide to plan a responsible nature visit in the Veerapuli Reserved Forest area, with map access and links to Kanyakumari sightseeing packages.",
    bookingUrl: "https://kanyakumaritourism.in/kanyakumari-wildlife-sanctuary",
    bookingProvider: "Kanyakumari Tourism",
    bookingNote: "Confirm permitted activities, access conditions and any applicable fees directly with the provider before travelling.",
    details: [
      {
        heading: "Sanctuary information",
        items: [
          "Listed address: Veerapuli R.F., Kanyakumari, Tamil Nadu 629851.",
          "The provider lists entry fee and phone information as not available, so confirm both before you travel.",
          "The listing shows a 4/5 rating based on 64 reviews and provides map and website links.",
          "Use the provider page to explore its Kanyakumari sightseeing and multi-day tour package options.",
        ],
      },
    ],
  },
  {
    id: "water-sports-extravaganza",
    title: "Water Sports Extravaganza",
    host: "RAS Water Sports, Manavalapuram",
    image: vattakottaiImg,
    duration: "3 hours",
    price: 1800,
    groupSize: "2-12 people",
    category: "Adventure",
    description:
      "Explore boating and water activities near Manakudy, including boat rides, jet skis, paddle boats and towable tube rides; confirm current availability directly with the provider.",
    bookingUrl: "https://raswatersports.in/",
    bookingProvider: "RAS Water Sports",
    bookingNote: "Choose an activity and complete any booking or payment directly with RAS Water Sports.",
    details: [{
      heading: "RAS Water Sports information",
      items: [
        "Activities listed include boat rides, jet skis, paddle boats and several towable tube rides.",
        "The provider describes life jackets, rescue equipment, lifeguards and a lifeboat as part of its safety measures.",
        "Location: Manavalapuram, Puthalam P.O., Kanyakumari district. Contact the provider to confirm a slot.",
      ],
    }],
  },
  {
    id: "fisherman-sunrise",
    title: "Sunrise with Kanyakumari Fishermen",
    host: "Trawell.in Sunrise Point guide",
    image: fishingImg,
    duration: "4 hours",
    price: 1500,
    groupSize: "1-4 people",
    category: "Cultural",
    description:
      "Plan an early-morning visit around Sunrise Point and combine it with Kanyakumari Beach, Vivekananda Rock and other nearby landmarks.",
    bookingUrl: "https://www.trawell.in/tamilnadu/kanyakumari/sunrise-point",
    bookingProvider: "Trawell.in",
    bookingNote: "Use the provider's tour enquiry or online package flow to arrange your visit.",
    details: [{
      heading: "Sunrise Point planning",
      items: [
        "The guide places Sunrise Point within a circuit that includes Kanyakumari Beach, Vivekananda Rock Memorial and Thiruvalluvar Statue.",
        "Trawell.in lists regional packages and a quote-request form for customised travel.",
        "Check the provider's current package availability and pricing before making arrangements.",
      ],
    }],
  },
  {
    id: "balaramapuram-handloom",
    title: "Balaramapuram Handloom Weaving Workshop",
    host: "VSC Porto Marina guided handloom tour",
    image: weavingImg,
    duration: "3 hours",
    price: 1200,
    groupSize: "1-6 people",
    category: "Craft",
    description:
      "Discover Balaramapuram's handwoven cotton sarees and mundus, known for their kasavu borders, and arrange a guided visit to Kerala's traditional weaving village.",
    bookingUrl: "https://vscportomarina.com/destination-balaramapuram-handloom-tour.php",
    bookingProvider: "VSC Porto Marina",
    bookingNote: "Send an enquiry directly to VSC Porto Marina to arrange its guided Balaramapuram handloom tour.",
    details: [{
      heading: "Balaramapuram handloom information",
      items: [
        "Balaramapuram is known for soft off-white cotton sarees and mundus with gold-plated silver zari kasavu borders.",
        "The weaving tradition was established for Travancore's royal family in the early 19th century.",
        "VSC Porto Marina offers guided tours; enquiries: +91 92070 61000.",
      ],
    }],
  },
  {
    id: "heritage-faith-trail",
    title: "Faith and Heritage Trail",
    host: "Incredible India: Kumari Amman Temple",
    image: danceImg,
    duration: "5 hours",
    price: 1400,
    groupSize: "2-10 people",
    category: "Cultural",
    description:
      "Explore Kanyakumari's spiritual and heritage circuit, centred on Kumari Amman Temple and the seafront landmarks around Vivekananda Rock and Thiruvalluvar Statue.",
    bookingUrl: "https://www.incredibleindia.gov.in/en/tamil-nadu/kanniyakumari/kumari-amman-temple",
    bookingProvider: "Incredible India",
    bookingNote: "Use the official destination page to plan the temple visit; it provides visitor information rather than a direct ticket checkout.",
    details: [{
      heading: "Faith and heritage planning",
      items: [
        "Kumari Amman Temple is a key stop in Kanyakumari's faith and heritage circuit.",
        "Pair the visit with nearby seafront landmarks, including Vivekananda Rock and Thiruvalluvar Statue.",
        "Use the official destination guide for current visitor information before planning your trip.",
      ],
    }],
  },
];
