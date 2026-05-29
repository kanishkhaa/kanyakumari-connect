export type Brochure = {
  id: string;
  title: string;
  pages: number;
  size: string;
  category: "Itinerary" | "Map" | "Cultural" | "Adventure" | "Official";
  description: string;
  sourceUrl: string;
  actionLabel: string;
};

export const brochures: Brochure[] = [
  {
    id: "district-tourist-information",
    title: "Kanniyakumari District Tourist Information",
    pages: 1,
    size: "Govt portal",
    category: "Official",
    description: "Official district tourism contact page with Tourist Office, Hotel Tamil Nadu and Vivekananda Rock information-centre details.",
    sourceUrl: "https://kanniyakumari.nic.in/tourist-information/",
    actionLabel: "Open",
  },
  {
    id: "official-kumari-tourism",
    title: "Kanniyakumari Official Tourism Website",
    pages: 1,
    size: "Govt portal",
    category: "Official",
    description: "District-linked official tourism portal for places, routes, visitor information and local tourism discovery.",
    sourceUrl: "https://www.kumaritourism.com/",
    actionLabel: "Open",
  },
  {
    id: "vivekananda-rock-visitor-info",
    title: "Vivekananda Rock Memorial Visitor Information",
    pages: 1,
    size: "Govt portal",
    category: "Cultural",
    description: "Official attraction page with timings, emergency contacts, bus route details and ferry booking reference.",
    sourceUrl: "https://kanniyakumari.nic.in/tspot_vrm/",
    actionLabel: "Open",
  },
  {
    id: "tamil-nadu-tourism-guide",
    title: "Tamil Nadu Tourism Guide",
    pages: 1,
    size: "PDF",
    category: "Itinerary",
    description: "Government of India tourism PDF covering Tamil Nadu tours and travel circuits, including South India routes.",
    sourceUrl: "https://tourism.gov.in/sites/default/files/2019-10/tamilnadu.pdf",
    actionLabel: "PDF",
  },
  {
    id: "ttdc-virtual-tour",
    title: "TTDC Virtual Tours",
    pages: 1,
    size: "Govt portal",
    category: "Map",
    description: "Tamil Nadu Tourism / TTDC virtual-tour portal for official destination previews and planning support.",
    sourceUrl: "https://www.tntourismvirtualtour.com/",
    actionLabel: "Open",
  },
  {
    id: "district-contact-directory",
    title: "Kanniyakumari District Contact Directory",
    pages: 1,
    size: "Govt portal",
    category: "Official",
    description: "Official district contact directory useful for verified public-office, police, fire and utility contacts.",
    sourceUrl: "https://kanniyakumari.nic.in/contactdirectorydatatable/",
    actionLabel: "Open",
  },
];
