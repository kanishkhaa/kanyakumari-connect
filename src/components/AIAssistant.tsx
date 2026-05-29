import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

type Msg = { role: "bot" | "user"; text: string; links?: { label: string; to: string }[] };

const intents: { match: RegExp; reply: Msg }[] = [
  {
    match: /sunrise|sunset/i,
    reply: {
      role: "bot",
      text: "The Triveni Sangam beach is the spot — it's the only place in India to see both sunrise and sunset over the sea. Reach 30 min before for the best view.",
      links: [{ label: "View beach details", to: "/places/triveni-sangam-beach" }],
    },
  },
  {
    match: /vivek|rock|memorial/i,
    reply: {
      role: "bot",
      text: "Vivekananda Rock Memorial opens 8 AM – 4 PM (closed Mon). Take the government ferry from the mainland jetty. Tickets ₹50.",
      links: [{ label: "See the place", to: "/places/vivekananda-rock-memorial" }],
    },
  },
  {
    match: /food|eat|restaurant|dish/i,
    reply: {
      role: "bot",
      text: "Don't miss the Meen Kuzhambu (fish curry) and banana-leaf meals. I've curated the must-try dishes for you.",
      links: [{ label: "Food guide", to: "/food" }],
    },
  },
  {
    match: /stay|hotel|homestay/i,
    reply: {
      role: "bot",
      text: "We list only verified stays — homestays, eco-lodges, hotels and tribal stays. Prices start at ₹1,500/night.",
      links: [{ label: "Browse stays", to: "/stays" }],
    },
  },
  {
    match: /plan|itiner|days|trip/i,
    reply: {
      role: "bot",
      text: "Tell me your days, budget and interests in the planner — I'll build a day-wise plan in seconds.",
      links: [{ label: "Open planner", to: "/itinerary" }],
    },
  },
  {
    match: /weather|when|month|season/i,
    reply: {
      role: "bot",
      text: "Best season: October to February. Cool 20–28°C and clear skies. Avoid April–May (hot) unless you're here for Chitra Pournami.",
    },
  },
  {
    match: /emerg|police|hospital|help/i,
    reply: {
      role: "bot",
      text: "Quick numbers — National Emergency: 112, Police: 100, Fire: 101, Ambulance: 108, District Control Centre: 1077. Full list is in the SOS drawer.",
      links: [{ label: "Emergency contacts", to: "/food" }],
    },
  },
];

const fallback: Msg = {
  role: "bot",
  text: "I can help with places, planning, food, stays, weather and emergency info. What would you like to know?",
};

const greeting: Msg = {
  role: "bot",
  text: "Vanakkam! 🌅 I'm your Kanyakumari assistant. Ask me about places, food, the best time to visit, or how to plan your trip.",
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const reply = intents.find((i) => i.match.test(text))?.reply ?? fallback;
    setMsgs((m) => [...m, { role: "user", text }, reply]);
    setInput("");
  };

  return (
    <>
      <button
        aria-label="Open assistant"
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full gradient-sunset shadow-warm flex items-center justify-center text-primary-foreground hover:scale-110 transition-bounce ${open ? "opacity-0 pointer-events-none" : ""}`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 pointer-events-none">
          <div className="absolute inset-0 bg-background/40 backdrop-blur-sm pointer-events-auto" onClick={() => setOpen(false)} />
          <div className="relative pointer-events-auto w-full max-w-sm h-[550px] max-h-[80vh] bg-card rounded-2xl shadow-elevated border border-border flex flex-col overflow-hidden animate-fade-in-up">
            <div className="px-4 py-3 gradient-sunset text-primary-foreground flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <div>
                  <p className="font-semibold leading-tight">Kaniya Assistant</p>
                  <p className="text-[11px] opacity-90">Always here, even offline</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-background/20 rounded">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                    m.role === "user" ? "gradient-sunset text-primary-foreground rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"
                  }`}>
                    <p className="leading-relaxed">{m.text}</p>
                    {m.links && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.links.map((l) => (
                          <Link
                            key={l.to}
                            to={l.to}
                            onClick={() => setOpen(false)}
                            className="text-xs px-2 py-1 rounded-full bg-background text-primary font-medium hover:bg-background/80"
                          >
                            {l.label} →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask anything..."
                className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button onClick={send} className="h-9 w-9 rounded-lg gradient-sunset text-primary-foreground flex items-center justify-center hover:scale-105 transition-smooth">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
