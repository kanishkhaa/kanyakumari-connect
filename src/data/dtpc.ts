export type DtpcCenter = {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
};

export const dtpcCenters: DtpcCenter[] = [
  {
    id: "dtpc-kk-main",
    name: "DTPC Kanyakumari — Main Information Centre",
    address: "Beach Road, opposite Vivekananda Ferry, Kanyakumari 629702",
    phone: "+91 4652 246 276",
    hours: "Mon–Sun, 8:00 AM – 8:00 PM",
    services: ["Maps & brochures", "Licensed guides", "Tour bookings", "Lost & found"],
  },
  {
    id: "dtpc-nagercoil",
    name: "DTPC Nagercoil",
    address: "Collectorate Campus, Nagercoil 629001",
    phone: "+91 4652 279 200",
    hours: "Mon–Sat, 10:00 AM – 5:30 PM",
    services: ["District tours", "Homestay registration", "Vendor onboarding"],
  },
  {
    id: "dtpc-marthandam",
    name: "DTPC Marthandam",
    address: "Bus Stand Road, Marthandam 629165",
    phone: "+91 4651 270 333",
    hours: "Mon–Sat, 10:00 AM – 5:00 PM",
    services: ["Padmanabhapuram tours", "Western Ghats info", "Bus passes"],
  },
  {
    id: "dtpc-thingalsanthai",
    name: "DTPC Information Kiosk — Thingalsanthai",
    address: "Near Suchindram Temple, Thingalsanthai 629704",
    phone: "+91 4652 235 800",
    hours: "Tue–Sun, 9:00 AM – 6:00 PM",
    services: ["Temple guides", "Cultural tour bookings"],
  },
];
