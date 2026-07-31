import { FormEvent, useEffect, useMemo, useState } from "react";
import { CheckCircle2, LogIn, LogOut, MessageCircle, Search, Send, UserPlus } from "lucide-react";

type Priority = "High" | "Normal";
type Category = "Emergency" | "Transport" | "Stay" | "Places" | "Shopping" | "General";

type TravelCareUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
};

type TravelCareReply = {
  id: string;
  message: string;
  date: string;
};

type TravelCareQuery = {
  id: string;
  subject: string;
  author: string;
  email: string;
  phone: string;
  message: string;
  category: Category;
  priority: Priority;
  date: string;
  replies: TravelCareReply[];
};

import { fetchCollection, saveCollection, insertRow, fetchTableRows } from "@/lib/supabaseContent";

const formatDate = () =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date())
    .replace(",", "");

const classifyQuery = (subject: string, message: string): { category: Category; priority: Priority } => {
  const text = `${subject} ${message}`.toLowerCase();
  const highPriorityWords = ["emergency", "urgent", "accident", "unsafe", "lost", "missing", "medical", "hospital", "police", "fraud", "stranded", "harassment", "theft", "injury"];

  if (highPriorityWords.some((word) => text.includes(word))) {
    return { category: "Emergency", priority: "High" };
  }

  if (["cab", "taxi", "bus", "train", "ferry", "route", "transport", "parking"].some((word) => text.includes(word))) {
    return { category: "Transport", priority: "Normal" };
  }

  if (["hotel", "stay", "room", "homestay", "resort", "booking"].some((word) => text.includes(word))) {
    return { category: "Stay", priority: "Normal" };
  }

  if (["shop", "buy", "souvenir", "craft", "market"].some((word) => text.includes(word))) {
    return { category: "Shopping", priority: "Normal" };
  }

  if (["visit", "place", "temple", "beach", "palace", "falls", "sightseeing"].some((word) => text.includes(word))) {
    return { category: "Places", priority: "Normal" };
  }

  return { category: "General", priority: "Normal" };
};

export default function TravelCare() {
  const [queries, setQueries] = useState<TravelCareQuery[]>([]);
  const [users, setUsers] = useState<TravelCareUser[]>([]);
  const [currentUser, setCurrentUser] = useState<TravelCareUser | null>(null);
  const [authMode, setAuthMode] = useState<"register" | "login" | null>(null);
  const [authMessage, setAuthMessage] = useState("");
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [authForm, setAuthForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [queryForm, setQueryForm] = useState({ subject: "", message: "" });

  useEffect(() => {
    async function loadData() {
      // Fetch users from DB
      const dbUsers = await fetchTableRows<TravelCareUser>("travelcare_users");
      const fetchedUsers = dbUsers.length > 0 ? dbUsers : await fetchCollection<TravelCareUser[]>("travelcare_users", []);
      setUsers(fetchedUsers);

      // Fetch queries from DB
      const dbQueries = await fetchTableRows<TravelCareQuery>("travelcare_queries");
      const fetchedQueries = dbQueries.length > 0 ? dbQueries : await fetchCollection<TravelCareQuery[]>("travelcare_queries", []);
      setQueries(fetchedQueries.filter((q) => q.category && q.priority && Array.isArray(q.replies)));

      // Check current session from Supabase app_content user session
      const savedUser = await fetchCollection<TravelCareUser | null>("current_user_session", null);
      if (savedUser) {
        setCurrentUser(savedUser);
      }
    }
    loadData();
  }, []);


  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return queries;
    return queries.filter((item) =>
      [item.subject, item.author, item.message].some((value) => value.toLowerCase().includes(q)),
    );
  }, [queries, search]);

  const submitAuth = async (event: FormEvent) => {
    event.preventDefault();
    setAuthMessage("");
    const email = authForm.email.trim().toLowerCase();
    const password = authForm.password.trim();

    if (authMode === "register") {
      if (!authForm.name.trim() || !email || !authForm.phone.trim() || !password) return;
      if (users.some((user) => user.email === email)) {
        setAuthMessage("An account already exists for this email.");
        return;
      }

      const nextUser: TravelCareUser = {
        id: `${Date.now()}`,
        name: authForm.name.trim(),
        email,
        phone: authForm.phone.trim(),
        password,
      };
      const updatedUsers = [...users, nextUser];
      setUsers(updatedUsers);
      setCurrentUser(nextUser);
      await saveCollection("travelcare_users", updatedUsers);
      await saveCollection("current_user_session", nextUser);
      await insertRow("travelcare_users", nextUser);

      setAuthForm({ name: "", email: "", phone: "", password: "" });
      setAuthMode(null);
      return;
    }

    const match = users.find((user) => user.email === email && user.password === password);
    if (!match) {
      setAuthMessage("Email or password does not match.");
      return;
    }

    setCurrentUser(match);
    await saveCollection("current_user_session", match);
    setAuthForm({ name: "", email: "", phone: "", password: "" });
    setAuthMode(null);
  };

  const submitQuery = async (event: FormEvent) => {
    event.preventDefault();
    if (!currentUser || !queryForm.subject.trim() || !queryForm.message.trim()) return;

    const classification = classifyQuery(queryForm.subject, queryForm.message);
    const next: TravelCareQuery = {
      id: `${Date.now()}`,
      subject: queryForm.subject.trim(),
      author: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      message: queryForm.message.trim(),
      category: classification.category,
      priority: classification.priority,
      date: formatDate(),
      replies: [],
    };

    const nextQueries = [next, ...queries];
    setQueries(nextQueries);
    await saveCollection("travelcare_queries", nextQueries);
    await insertRow("travelcare_queries", next);

    setQueryForm({ subject: "", message: "" });
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  const logout = async () => {
    setCurrentUser(null);
    await saveCollection("current_user_session", null);
  };


  return (
    <div className="bg-[#f7f7f2]">
      <section className="container mx-auto px-4 py-12">
        <div className="text-sm text-muted-foreground">Home / Travel Care</div>
        <div className="mt-6">
          <main className="border border-border bg-white">
            <div className="border-b border-border p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-4xl font-bold md:text-5xl">Travel Care</h1>
                  <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                    Register or login, submit a travel query, and track official replies from the TravelCare admin desk.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-border p-4 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  {currentUser ? (
                    <>
                      <span className="bg-[#e8e0cf] px-4 py-2 text-sm font-semibold text-[#332513]">Signed in as {currentUser.name}</span>
                      <button onClick={logout} className="inline-flex items-center gap-2 border border-border bg-white px-4 py-2 text-sm font-semibold">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setAuthMode("register")} className="inline-flex items-center gap-2 bg-[#1f5f3b] px-4 py-2 text-sm font-semibold text-white">
                        <UserPlus className="h-4 w-4" /> Register
                      </button>
                      <button onClick={() => setAuthMode("login")} className="inline-flex items-center gap-2 border border-border bg-white px-4 py-2 text-sm font-semibold">
                        <LogIn className="h-4 w-4" /> Login
                      </button>
                    </>
                  )}
                </div>
                <form className="relative w-full md:max-w-sm" onSubmit={(e) => e.preventDefault()}>
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search queries"
                    className="w-full border border-border bg-[#fafafa] py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#1f5f3b]"
                  />
                </form>
              </div>
            </div>

            {authMode && (
              <form onSubmit={submitAuth} className="border-b border-border bg-[#fbfaf5] p-5 md:p-6">
                <h2 className="font-display text-2xl font-bold">{authMode === "register" ? "Register" : "Login"}</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {authMode === "register" && (
                    <label className="text-sm font-semibold">
                      Name *
                      <input value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} className="mt-1 w-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5f3b]" />
                    </label>
                  )}
                  <label className="text-sm font-semibold">
                    Email *
                    <input type="email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} className="mt-1 w-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5f3b]" />
                  </label>
                  {authMode === "register" && (
                    <label className="text-sm font-semibold">
                      Phone *
                      <input value={authForm.phone} onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })} className="mt-1 w-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5f3b]" />
                    </label>
                  )}
                  <label className="text-sm font-semibold">
                    Password *
                    <input type="password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} className="mt-1 w-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5f3b]" />
                  </label>
                </div>
                {authMessage && <p className="mt-3 text-sm font-semibold text-red-700">{authMessage}</p>}
                <div className="mt-4 flex gap-3">
                  <button type="submit" className="bg-[#1f5f3b] px-5 py-2 text-sm font-semibold text-white">Continue</button>
                  <button type="button" onClick={() => setAuthMode(null)} className="border border-border px-5 py-2 text-sm font-semibold">Cancel</button>
                </div>
              </form>
            )}

            <form onSubmit={submitQuery} className="border-b border-border p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold">Submit a query</h2>
                {submitted && (
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f5f3b]">
                    <CheckCircle2 className="h-4 w-4" /> Query submitted
                  </span>
                )}
              </div>
              {!currentUser ? (
                <p className="mt-3 text-sm text-muted-foreground">Please register or login to post a TravelCare query.</p>
              ) : (
                <>
                  <label className="mt-4 block text-sm font-semibold">
                    Subject *
                    <input value={queryForm.subject} onChange={(e) => setQueryForm({ ...queryForm, subject: e.target.value })} className="mt-1 w-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5f3b]" />
                  </label>
                  <label className="mt-4 block text-sm font-semibold">
                    Query *
                    <textarea value={queryForm.message} onChange={(e) => setQueryForm({ ...queryForm, message: e.target.value })} rows={4} className="mt-1 w-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5f3b]" />
                  </label>
                  <button type="submit" className="mt-4 inline-flex items-center gap-2 bg-[#d9a441] px-5 py-2 text-sm font-semibold text-[#241707]">
                    <Send className="h-4 w-4" /> Submit
                  </button>
                </>
              )}
            </form>

            <div className="hidden grid-cols-[1fr_110px] border-b border-border bg-[#f0eadf] px-6 py-3 text-sm font-bold text-[#362b1f] md:grid">
              <span>Subject</span>
              <span>Replies</span>
            </div>

            <div>
              {filtered.map((q) => (
                <article key={q.id} className="grid gap-4 border-b border-border p-5 md:grid-cols-[1fr_110px] md:px-6">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-[#1f5f3b]">{q.subject}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{q.author} - {q.date}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#5f594e]">{q.message}</p>
                    {q.replies.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {q.replies.map((reply) => (
                          <div key={reply.id} className="border-l-4 border-[#1f5f3b] bg-[#f7f7f2] p-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#1f5f3b]">Admin reply - {reply.date}</p>
                            <p className="mt-1 text-sm text-[#4d463b]">{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <MessageCircle className="h-4 w-4 text-[#1f5f3b]" /> {q.replies.length}
                  </div>
                </article>
              ))}
              {filtered.length === 0 && <p className="p-8 text-center text-sm text-muted-foreground">No queries have been submitted yet.</p>}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
