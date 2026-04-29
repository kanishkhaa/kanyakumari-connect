export type Speciality = {
  id: string;
  title: string;
  icon: string; // lucide name
  description: string;
};

export const specialities: Speciality[] = [
  {
    id: "three-seas",
    title: "Confluence of three seas",
    icon: "Waves",
    description:
      "The only place in India where the Bay of Bengal, Arabian Sea and Indian Ocean meet — visible from the Triveni Sangam shore.",
  },
  {
    id: "sunrise-sunset",
    title: "Sunrise & sunset over water",
    icon: "Sun",
    description:
      "Witness both phenomena from the same spot — and on Chithra Pournami, see the sunset and full-moon rise simultaneously.",
  },
  {
    id: "vivekananda",
    title: "Spiritual heritage",
    icon: "Sparkles",
    description: "Vivekananda Rock, Thiruvalluvar Statue and Kumari Amman temple form a unique spiritual triad.",
  },
  {
    id: "padmanabhapuram",
    title: "Asia's largest wooden palace",
    icon: "Building2",
    description: "Padmanabhapuram Palace — 16th-century timber architecture, intricate carvings and rosewood ceilings.",
  },
  {
    id: "western-ghats",
    title: "Western Ghats biodiversity",
    icon: "Mountain",
    description: "Tiger reserves, endemic species and the indigenous Kani tribal community in the Pechiparai foothills.",
  },
  {
    id: "handloom",
    title: "Balaramapuram handloom",
    icon: "Shirt",
    description: "Centuries-old cotton-weaving tradition — still practiced on traditional pit looms by master weavers.",
  },
  {
    id: "fish-cuisine",
    title: "Coastal fish cuisine",
    icon: "Fish",
    description: "Tamarind-coconut fish curries, banana-leaf meals and fresh harbour catch — a daily ritual.",
  },
  {
    id: "festivals",
    title: "Living festivals",
    icon: "PartyPopper",
    description: "Margazhi music, beach carnival, regattas and tribal melas — there's something happening every month.",
  },
];
