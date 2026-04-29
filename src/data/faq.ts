export type Faq = { q: string; a: string; category: "General" | "Travel" | "Stay" | "Safety" | "Culture" };

export const faqs: Faq[] = [
  {
    category: "General",
    q: "What is the best time to visit Kanyakumari?",
    a: "October to March offers cool, dry weather and clear sunrise/sunset views. Avoid May–June (very hot) and the monsoon spells in October–November on the eastern coast.",
  },
  {
    category: "General",
    q: "How many days do I need?",
    a: "2–3 days cover the main sights (Vivekananda Rock, Thiruvalluvar Statue, Suchindram, Padmanabhapuram, Vattakottai). Add 2 more days for the Western Ghats and beach villages.",
  },
  {
    category: "Travel",
    q: "How do I reach Kanyakumari?",
    a: "Nearest airport: Trivandrum (90 km, 2 hours). Kanyakumari has a railway station with direct trains from Chennai, Mumbai and Delhi. Frequent buses from all Tamil Nadu and Kerala cities.",
  },
  {
    category: "Travel",
    q: "Is local transport easy?",
    a: "Yes — auto-rickshaws, app cabs and shared vans connect main sights. For the district, hire a car or join a DTPC day tour.",
  },
  {
    category: "Stay",
    q: "Are homestays safe and verified?",
    a: "All stays listed on this platform are verified — physically inspected, with transparent pricing and real reviews.",
  },
  {
    category: "Safety",
    q: "Is Kanyakumari safe for solo female travellers?",
    a: "Generally yes, especially around the main town and ferry area. Avoid isolated beach stretches after sunset and keep emergency contacts handy (available in the SOS drawer).",
  },
  {
    category: "Safety",
    q: "What about the ferry to Vivekananda Rock?",
    a: "Operated by Poompuhar Shipping, with life jackets. Ferries pause during rough sea (mostly June–September). Buy tickets early — long queues by 10 AM.",
  },
  {
    category: "Culture",
    q: "What's the dress code for temples?",
    a: "Modest clothing — covered shoulders and knees. Men remove shirts at Suchindram sanctum. No leather inside temple premises.",
  },
  {
    category: "Culture",
    q: "Can I photograph everywhere?",
    a: "Sunrise/sunset points and beaches are open. Inside temple sanctums and the Padmanabhapuram palace, photography is restricted — look for posted signs.",
  },
];
