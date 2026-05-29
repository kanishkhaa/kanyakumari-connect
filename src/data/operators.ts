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
};

export const operators: Operator[] = [
  {
    id: "khalifa-travels",
    name: "Khalifa Travels",
    type: "General",
    rating: 0,
    reviews: 0,
    phone: "+91 99943 54798",
    email: "info@khalifatravels.com",
    speciality: "Kanyakumari-district travel agency offering car hire, guided group tours and holiday packages.",
    verified: true,
    website: "https://www.khalifatravels.com/",
  },
  {
    id: "kk-tours-travels",
    name: "KK Tours & Travels",
    type: "General",
    rating: 0,
    reviews: 0,
    phone: "+91 98883 94442",
    email: "booking@kktoursntravels.com",
    speciality: "Kanyakumari local sightseeing, holiday packages and cab booking support.",
    verified: true,
    website: "https://www.kktoursntravels.com/",
  },
  {
    id: "fly-memories-travel-tours",
    name: "Fly Memories Travel & Tours",
    type: "General",
    rating: 0,
    reviews: 0,
    phone: "+91 94425 04890",
    email: "info@flymemories.com",
    speciality: "Family-owned Kanyakumari-district operator for Kumari, South India and Sri Lanka tour packages.",
    verified: true,
    website: "https://www.flymemories.com/contactus.php",
  },
  {
    id: "flybook-tours-travels",
    name: "Flybook Tours & Travels",
    type: "General",
    rating: 0,
    reviews: 0,
    phone: "+91 98652 32346",
    email: "info@flybooktoursandtravels.com",
    speciality: "Marthandam/Kanyakumari travel agency for group tours, car hire, air, train and bus ticketing.",
    verified: true,
    website: "https://www.flybooktoursandtravels.com/",
  },
  {
    id: "subash-travels",
    name: "Subash Travels",
    type: "General",
    rating: 0,
    reviews: 0,
    phone: "+91 97892 40405",
    email: "subash9817@gmail.com",
    speciality: "Atchankulam-based Kanyakumari travel agency for sightseeing, vehicle booking, hotels and travel guides.",
    verified: true,
    website: "https://www.subashtravel.in/",
  },
];
