import { FormEvent, useEffect, useMemo, useState } from "react";
import { Search, MessageCircle, Eye, UserPlus, LogIn, Send, Phone, CheckCircle2 } from "lucide-react";
import { emergencyContacts } from "@/data/food";

type Query = {
  id: string;
  subject: string;
  author: string;
  email?: string;
  message: string;
  date: string;
  replies: number;
  views: number;
};

const initialQueries: Query[] = [
  {
    id: "cab-suchindram",
    subject: "Need cab for Kanyakumari local sightseeing and Suchindram",
    author: "R. Meenakshi",
    message: "We are a family of four looking for a local cab route covering the beach, Vivekananda ferry and Suchindram.",
    date: "06-05-2026 10:15 AM",
    replies: 2,
    views: 84,
  },
  {
    id: "ferry-seniors",
    subject: "Best time for Vivekananda Rock ferry with senior citizens",
    author: "Amit Sharma",
    message: "What time should we reach the ferry counter to avoid long queues with elderly parents?",
    date: "04-05-2026 07:42 PM",
    replies: 1,
    views: 112,
  },
  {
    id: "palace-aqueduct",
    subject: "Padmanabhapuram Palace and Mathur Aqueduct one day plan",
    author: "S. Pradeep",
    message: "Can Padmanabhapuram Palace, Mathur Aqueduct and Thirparappu Falls be covered in one day from Kanyakumari?",
    date: "29-04-2026 01:08 PM",
    replies: 3,
    views: 156,
  },
  {
    id: "chitra-rooms",
    subject: "Rooms near beach for Chitra Pournami visit",
    author: "Divya Nair",
    message: "Looking for a stay close to the beach for sunrise and full moon viewing.",
    date: "24-04-2026 09:30 AM",
    replies: 1,
    views: 97,
  },
  {
    id: "souvenir-buying",
    subject: "Where to buy authentic seashell craft and palm leaf items",
    author: "Priya Menon",
    message: "Are beach stalls better or should we go to a craft emporium for seashell souvenirs?",
    date: "12-04-2026 11:20 AM",
    replies: 1,
    views: 75,
  },
];

const storageKey = "kaniya-travelcare-queries";

const formatDate = () =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date()).replace(",", "");

export default function TravelCare() {
  const [queries, setQueries] = useState<Query[]>(initialQueries);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        setQueries(JSON.parse(saved) as Query[]);
      } catch {
        setQueries(initialQueries);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(queries));
  }, [queries]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return queries;
    return queries.filter((item) =>
      [item.subject, item.author, item.message].some((value) => value.toLowerCase().includes(q)),
    );
  }, [queries, search]);

  const submitQuery = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.subject.trim() || !form.message.trim()) return;

    const next: Query = {
      id: `${Date.now()}`,
      subject: form.subject.trim(),
      author: form.name.trim(),
      email: form.email.trim() || undefined,
      message: form.message.trim(),
      date: formatDate(),
      replies: 0,
      views: 1,
    };

    setQueries((current) => [next, ...current]);
    setForm({ name: "", email: "", subject: "", message: "" });
    setShowForm(false);
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-[#f7f7f2]">
      <section className="container mx-auto px-4 py-12">
        <div className="text-sm text-muted-foreground">Home / Travel Care</div>
        <div className="mt-6 grid lg:grid-cols-[1fr_340px] gap-8">
          <main className="bg-white border border-border">
            <div className="p-6 md:p-8 border-b border-border">
              <h1 className="font-display text-4xl md:text-5xl font-bold">Travel Care</h1>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
                General queries and answers regarding commonly asked questions can be posted here. Ask about taxi or cab availability, best time to visit, destination routes, activities, ferry timing and local shopping.
              </p>
            </div>

            <div className="p-4 md:p-6 border-b border-border flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 bg-[#1f5f3b] px-4 py-2 text-sm font-semibold text-white">
                  <UserPlus className="h-4 w-4" /> Register
                </button>
                <button className="inline-flex items-center gap-2 border border-border bg-white px-4 py-2 text-sm font-semibold">
                  <LogIn className="h-4 w-4" /> Login
                </button>
              </div>
              <form className="relative w-full md:max-w-sm" onSubmit={(e) => e.preventDefault()}>
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Keyword"
                  className="w-full border border-border bg-[#fafafa] py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#1f5f3b]"
                />
              </form>
            </div>

            <div className="p-4 md:p-6 border-b border-border flex flex-wrap items-center gap-3">
              <button onClick={() => setSearch("")} className="bg-[#e8e0cf] px-4 py-2 text-sm font-semibold text-[#332513]">List All</button>
              <button onClick={() => setShowForm((open) => !open)} className="inline-flex items-center gap-2 bg-[#d9a441] px-4 py-2 text-sm font-semibold text-[#241707]">
                <Send className="h-4 w-4" /> Submit new query
              </button>
              {submitted && (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f5f3b]">
                  <CheckCircle2 className="h-4 w-4" /> Query submitted
                </span>
              )}
            </div>

            {showForm && (
              <form onSubmit={submitQuery} className="border-b border-border bg-[#fbfaf5] p-5 md:p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="text-sm font-semibold">
                    Name *
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5f3b]" />
                  </label>
                  <label className="text-sm font-semibold">
                    Email
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5f3b]" />
                  </label>
                </div>
                <label className="mt-4 block text-sm font-semibold">
                  Subject *
                  <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1 w-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5f3b]" />
                </label>
                <label className="mt-4 block text-sm font-semibold">
                  Query *
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="mt-1 w-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5f3b]" />
                </label>
                <div className="mt-4 flex gap-3">
                  <button type="submit" className="bg-[#1f5f3b] px-5 py-2 text-sm font-semibold text-white">Submit</button>
                  <button type="button" onClick={() => setShowForm(false)} className="border border-border px-5 py-2 text-sm font-semibold">Cancel</button>
                </div>
              </form>
            )}

            <div className="hidden md:grid grid-cols-[1fr_110px_110px] border-b border-border bg-[#f0eadf] px-6 py-3 text-sm font-bold text-[#362b1f]">
              <span>Subject</span>
              <span>Replies</span>
              <span>Views</span>
            </div>

            <div>
              {filtered.map((q) => (
                <article key={q.id} className="grid gap-4 border-b border-border p-5 md:grid-cols-[1fr_110px_110px] md:px-6">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-[#1f5f3b]">{q.subject}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{q.author}</p>
                    <p className="text-xs text-muted-foreground">{q.date}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#5f594e]">{q.message}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <MessageCircle className="h-4 w-4 text-[#1f5f3b]" /> {q.replies} Replies
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Eye className="h-4 w-4 text-[#1f5f3b]" /> {q.views} Views
                  </div>
                </article>
              ))}
              {filtered.length === 0 && <p className="p-8 text-center text-sm text-muted-foreground">No matching queries.</p>}
            </div>

            <p className="p-5 text-sm text-muted-foreground">
              Kindly verify offers by contacting service providers directly before booking.
            </p>
          </main>

          <aside className="space-y-5">
            <div className="bg-white border border-border p-6">
              <h2 className="font-display text-2xl font-bold">Helplines</h2>
              <div className="mt-4 grid gap-2">
                {emergencyContacts.map((c) => (
                  <a key={c.name} href={`tel:${c.number.replace(/[^0-9]/g, "")}`} className="flex items-center gap-3 border border-border p-3 hover:border-[#1f5f3b]">
                    <Phone className="h-4 w-4 text-[#1f5f3b]" />
                    <span className="text-sm">
                      <span className="block text-muted-foreground">{c.name}</span>
                      <span className="font-semibold">{c.number}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-[#1f5f3b] p-6 text-white">
              <h2 className="font-display text-2xl font-bold">Travel Hub</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/85">
                <li>Where to go</li>
                <li>Plan your trip</li>
                <li>Things to buy</li>
                <li>Events</li>
                <li>E-brochures</li>
                <li>FAQs</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
