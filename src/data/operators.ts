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
  website?: string;
  location: string;
  mapLink: string;
  logo: string;
  featured?: boolean;
};

export const operators: Operator[] = [
  {
    id: "khalifa-travels", name: "Khalifa Travels", type: "General", rating: 4.7, reviews: 48,
    phone: "+91 99943 54798", email: "info@khalifatravels.com",
    speciality: "Private Kanyakumari sightseeing, airport transfers and tailored South India holiday itineraries.",
    verified: true, website: "https://www.khalifatravels.com/", location: "Nagercoil, Kanyakumari district",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Khalifa+Travels+Nagercoil",
    logo: "/images/operators/khalifa-travels.png", featured: true,
  },
  {
    id: "kk-tours-travels", name: "KK Tours & Travels", type: "General", rating: 4.9, reviews: 60,
    phone: "+91 98883 94442", email: "booking@kktoursntravels.com",
    speciality: "Custom holiday packages, local sightseeing, pilgrimage circuits and cab or coach hire.",
    verified: true, website: "https://www.kktoursntravels.com/", location: "West Car Street, Kanyakumari",
    mapLink: "https://www.google.com/maps/search/?api=1&query=KK+Tours+%26+Travels+West+Car+Street+Kanyakumari",
    logo: "/images/operators/kk-tours-travels.png", featured: true,
  },
  {
    id: "fly-memories-travel-tours", name: "Fly Memories Travel & Tours", type: "General", rating: 4.8, reviews: 42,
    phone: "+91 94425 04890", email: "info@flymemories.com",
    speciality: "Family-run travel planning for Kanyakumari, South India, Sri Lanka and multi-day family tours.",
    verified: true, website: "https://flymemories.com/", location: "Kanyakumari district, Tamil Nadu",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Fly+Memories+Travel+%26+Tours+Kanyakumari",
    logo: "/images/operators/fly-memories-travel-tours.png",
  },
  {
    id: "flybook-tours-travels", name: "Flybook Tours & Travels", type: "General", rating: 4.7, reviews: 54,
    phone: "+91 98652 32346", email: "info@flybooktoursandtravels.com",
    speciality: "Group tours, luxury vehicle hire, ticketing and bespoke South India holiday packages.",
    verified: true, website: "https://www.flybooktoursandtravels.com/", location: "North Street Road, Marthandam",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Flybook+Tours+%26+Travels+Marthandam",
    logo: "/images/operators/flybook-tours-travels.png",
  },
  {
    id: "subash-travels", name: "Subash Travels", type: "General", rating: 4.6, reviews: 31,
    phone: "+91 97892 40405", email: "subash9817@gmail.com",
    speciality: "Kanyakumari sightseeing, vehicle and hotel arrangements, local guides and flexible travel support.",
    verified: true, website: "https://www.subashtravel.in/", location: "Atchankulam, Kanyakumari district",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Subash+Travels+Atchankulam+Kanyakumari",
    logo: "/images/operators/subash-travels.png",
  },
  {
    id: "kanyakumari-travels", name: "Kanyakumari Travels", type: "General", rating: 4.8, reviews: 73,
    phone: "+91 94898 03300", email: "contact@kanyakumaritravels.in",
    speciality: "Local cab tours, sunrise and sightseeing trips, plus Kanyakumari–Rameswaram–Trivandrum packages.",
    verified: true, website: "https://www.kanyakumaritravels.in/", location: "Swamynathapuram, Kanyakumari",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Kanyakumari+Travels+Swamynathapuram+Kanyakumari",
    logo: "https://www.google.com/s2/favicons?domain=kanyakumaritravels.in&sz=128",
  },
];
