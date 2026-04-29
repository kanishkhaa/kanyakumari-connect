export type Operator = {
  id: string;
  name: string;
  type: "Heritage" | "Adventure" | "Spiritual" | "General";
  rating: number;
  reviews: number;
  phone: string;
  email: string;
  speciality: string;
  verified: boolean;
};

export const operators: Operator[] = [
  {
    id: "tip-of-india-tours",
    name: "Tip of India Tours",
    type: "General",
    rating: 4.8,
    reviews: 412,
    phone: "+91 94422 11122",
    email: "info@tipofindiatours.com",
    speciality: "Full district circuit + South India extensions",
    verified: true,
  },
  {
    id: "heritage-trails",
    name: "Heritage Trails Kanyakumari",
    type: "Heritage",
    rating: 4.9,
    reviews: 187,
    phone: "+91 98423 55667",
    email: "hello@heritagetrails.in",
    speciality: "Padmanabhapuram, Suchindram & temple circuits",
    verified: true,
  },
  {
    id: "ghats-trekkers",
    name: "Ghats Trekkers Co.",
    type: "Adventure",
    rating: 4.7,
    reviews: 96,
    phone: "+91 90030 88991",
    email: "book@ghatstrekkers.com",
    speciality: "Mahendragiri trek + Kani village stays",
    verified: true,
  },
  {
    id: "kanya-spiritual",
    name: "Kanyakumari Spiritual Journeys",
    type: "Spiritual",
    rating: 4.8,
    reviews: 233,
    phone: "+91 96550 12340",
    email: "yatra@kkspiritual.org",
    speciality: "Vivekananda trail + temple yatras",
    verified: true,
  },
];
