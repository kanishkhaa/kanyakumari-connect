export type EventItem = {
  id: string;
  title: string;
  date: string;
  month: string;
  location: string;
  category: "Festival" | "Cultural" | "Sports" | "Spiritual" | "Fair";
  description: string;
};

export const events: EventItem[] = [
  {
    id: "chithra-pournami",
    title: "Chithra Pournami at Kumari Amman Temple",
    date: "Apr 22, 2026",
    month: "April",
    location: "Bhagavathy Amman Temple, Kanyakumari",
    category: "Spiritual",
    description:
      "Full-moon festival when sunset and moonrise occur simultaneously over the three seas — witnessed only at Kanyakumari.",
  },
  {
    id: "vaikasi-visakam",
    title: "Vaikasi Visakam — Suchindram",
    date: "May 30, 2026",
    month: "May",
    location: "Thanumalayan Temple, Suchindram",
    category: "Festival",
    description: "Ten-day temple festival with chariot procession and classical music concerts.",
  },
  {
    id: "kanyakumari-beach-fest",
    title: "Kanyakumari Beach Festival",
    date: "Oct 10–14, 2026",
    month: "October",
    location: "Sangam Beach & Sothavilai",
    category: "Cultural",
    description: "Five-day beach carnival with folk dance, sand art, food stalls and water sports.",
  },
  {
    id: "kanya-margazhi",
    title: "Margazhi Music Festival",
    date: "Dec 15–31, 2026",
    month: "December",
    location: "Various venues, Kanyakumari district",
    category: "Cultural",
    description: "Carnatic music kutcheris and bharatanatyam performances during the holy Margazhi month.",
  },
  {
    id: "kovalam-regatta",
    title: "Kovalam Catamaran Regatta",
    date: "Feb 8, 2026",
    month: "February",
    location: "Kovalam–Muttom coast",
    category: "Sports",
    description: "Traditional fishermen's catamaran race — community-organised, century-old tradition.",
  },
  {
    id: "kani-mela",
    title: "Kani Tribal Honey & Herb Mela",
    date: "Mar 5–7, 2026",
    month: "March",
    location: "Pechiparai, Western Ghats",
    category: "Fair",
    description: "Annual fair where the Kani tribal community sells forest honey, herbs and crafts directly.",
  },
];
