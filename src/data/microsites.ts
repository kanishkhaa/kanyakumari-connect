export type Microsite = {
  id: string;
  title: string;
  tagline: string;
  category: "Festival" | "Heritage" | "Eco" | "Spiritual";
  highlights: string[];
};

export const microsites: Microsite[] = [
  {
    id: "sunrise-sunset",
    title: "Sunrise & Sunset Festival",
    tagline: "The only place in India where you can watch both over the same horizon",
    category: "Festival",
    highlights: ["Daily ritual viewings", "Photography contest", "Beachside concerts"],
  },
  {
    id: "padmanabhapuram-circuit",
    title: "Padmanabhapuram Heritage Circuit",
    tagline: "Walk through the largest wooden palace in Asia",
    category: "Heritage",
    highlights: ["Audio-guided tour", "Living-history reenactments", "Conservation insights"],
  },
  {
    id: "vivekananda-trail",
    title: "Swami Vivekananda Spiritual Trail",
    tagline: "From the meditation rock to the legacy of his message",
    category: "Spiritual",
    highlights: ["Guided meditation sessions", "Lecture series", "Heritage walk"],
  },
  {
    id: "western-ghats-eco",
    title: "Western Ghats Ecotourism",
    tagline: "Forests, dams and Kani tribal villages",
    category: "Eco",
    highlights: ["Pechiparai dam stays", "Forest treks with Kani guides", "Endemic species spotting"],
  },
  {
    id: "coastal-living",
    title: "Coastal Living Microsite",
    tagline: "Inside the daily lives of Kanyakumari's fishing communities",
    category: "Heritage",
    highlights: ["Fish-auction visits", "Catamaran rides", "Community kitchens"],
  },
  {
    id: "margazhi-music",
    title: "Margazhi Music & Dance",
    tagline: "A month of Carnatic music in temples and beaches",
    category: "Festival",
    highlights: ["Free kutcheris", "Bharatanatyam evenings", "Temple-courtyard concerts"],
  },
];
