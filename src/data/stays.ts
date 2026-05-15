import { imageFor, stayImages } from "@/data/imageRegistry";
import stayPlaceholder from "@/assets/stay-hotel.jpg";

export type Stay = {
  id: string;
  name: string;
  type: "Homestay" | "Eco Lodge" | "Hotel" | "Tribal Stay";
  image: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  amenities: string[];
  verified: boolean;
  description: string;
};

const makeStay = (stay: Omit<Stay, "image"> & { image?: string }): Stay => ({
  ...stay,
  image: stay.image ?? imageFor(stayImages, stay.id, stayPlaceholder),
});

export const stays: Stay[] = [
  makeStay({
    id: "annai-resorts-spa",
    name: "Annai Resorts & Spa",
    type: "Hotel",
    location: "Kovalam Road, Kanyakumari",
    pricePerNight: 5200,
    rating: 4.6,
    reviews: 1240,
    amenities: ["Sea view villas", "Pool", "Spa", "Restaurant"],
    verified: true,
    description:
      "A well-known resort close to the seafront with sea-facing rooms and easy access to sunrise, sunset and ferry attractions.",
  }),
  makeStay({
    id: "sparsa-resorts-kanyakumari",
    name: "Sparsa Resorts Kanyakumari",
    type: "Eco Lodge",
    location: "Beach Road near Sunset Point, Kanyakumari",
    pricePerNight: 4800,
    rating: 4.5,
    reviews: 980,
    amenities: ["Ocean views", "Eco-friendly", "Restaurant", "Parking"],
    verified: true,
    description:
      "A popular resort near the ocean and sunset viewing area, known for comfortable rooms and proximity to the main town sights.",
  }),
  makeStay({
    id: "hotel-sea-view",
    name: "Hotel Sea View",
    type: "Hotel",
    location: "East Car Street / Beach area, Kanyakumari",
    pricePerNight: 3600,
    rating: 4.3,
    reviews: 860,
    amenities: ["Sea-facing rooms", "Restaurant", "Family rooms", "Walkable location"],
    verified: true,
    description:
      "A central hotel option for travellers who want quick access to Kumari Amman Temple, the ferry point and beach viewpoints.",
  }),
  makeStay({
    id: "hotel-temple-citi",
    name: "Hotel Temple Citi",
    type: "Hotel",
    location: "Near Kanyakumari Temple and railway station",
    pricePerNight: 2400,
    rating: 4.2,
    reviews: 640,
    amenities: ["Family rooms", "Restaurant", "Parking", "Budget friendly"],
    verified: true,
    description:
      "A popular town hotel for temple visits, short stays and budget-conscious families who prefer central access.",
  }),
  makeStay({
    id: "hotel-sangam",
    name: "Hotel Sangam",
    type: "Hotel",
    location: "Main Road, Kanyakumari",
    pricePerNight: 3000,
    rating: 4.2,
    reviews: 710,
    amenities: ["Restaurant", "AC rooms", "Central location", "Travel desk"],
    verified: true,
    description:
      "A long-running hotel choice in Kanyakumari town with convenient road access to beaches, ferry services and local shopping.",
  }),
];
