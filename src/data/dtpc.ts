export type DtpcCenter = {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  sourceUrl: string;
};

export const dtpcCenters: DtpcCenter[] = [
  {
    id: "district-tourist-office-kanniyakumari",
    name: "District Tourist Office, Kanniyakumari",
    address: "Tourist Office, Beach Road, Kanniyakumari 629702",
    phone: "04652-246276",
    hours: "Contact office for current working hours",
    services: ["Tourist information", "District guidance", "Official tourism contact", "Visitor assistance"],
    sourceUrl: "https://kanniyakumari.nic.in/tourist-information/",
  },
  {
    id: "tourism-officer-mobile",
    name: "Tourism Department Mobile Help",
    address: "District Tourist Office, Beach Road, Kanniyakumari 629702",
    phone: "+91 91769 95866",
    hours: "Contact before travel for availability",
    services: ["Tourism enquiries", "On-ground guidance", "Escalation support"],
    sourceUrl: "https://kanniyakumari.nic.in/tourist-information/",
  },
  {
    id: "hotel-tamil-nadu-kanniyakumari",
    name: "Hotel Tamil Nadu, Kanniyakumari",
    address: "Hotel Tamil Nadu, Light House Road, Kanniyakumari 629702",
    phone: "04652-246257",
    hours: "Contact reception for room and travel-desk hours",
    services: ["TTDC stay contact", "Visitor support", "Local travel guidance"],
    sourceUrl: "https://kanniyakumari.nic.in/tourist-information/",
  },
  {
    id: "vivekananda-rock-tourism-information-centre",
    name: "Tourism Information Centre, Vivekananda Rock Memorial",
    address: "Seaside Road, Vivekananda Rock Memorial area, Kanniyakumari",
    phone: "04652-246250",
    hours: "Contact centre for current opening hours",
    services: ["Ferry-area guidance", "Rock Memorial visitor information", "Local route assistance"],
    sourceUrl: "https://kanniyakumari.nic.in/tourist-information/",
  },
  {
    id: "district-collectorate-contact",
    name: "District Collectorate, Nagercoil",
    address: "Collectorate, Nagercoil 629001",
    phone: "04652-279090",
    hours: "Government office hours",
    services: ["District administration contact", "Public information", "Escalation contact"],
    sourceUrl: "https://kanniyakumari.nic.in/contact-us/",
  },
];
