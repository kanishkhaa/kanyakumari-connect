import { FormEvent, useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Home, MessageSquareReply, Search, ShieldCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getHostApplications, type HostApplication } from "@/lib/localMarketplace";
import { fetchCollection, saveCollection, fetchTableRows, updateRow } from "@/lib/supabaseContent";
import AdminLoginModal from "@/components/AdminLoginModal";
import { Lock, LogOut } from "lucide-react";

type Priority = "High" | "Normal";
type Category = "Emergency" | "Transport" | "Stay" | "Places" | "Shopping" | "General";

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

const demoQueries: TravelCareQuery[] = [
  { id: "demo-query-1", subject: "Ferry timing for Vivekananda Rock", author: "Priya Nair", email: "priya@example.com", phone: "+91 98765 21001", message: "Could you share the first ferry timing for this Saturday?", category: "Transport", priority: "Normal", date: "03/08/2026 10:15 am", replies: [{ id: "reply-1", date: "03/08/2026 11:00 am", message: "Ferry services usually begin in the morning; please confirm at the jetty on the day because weather can affect timings." }] },
  { id: "demo-query-2", subject: "Need help finding a clinic", author: "Ravi Menon", email: "ravi@example.com", phone: "+91 98765 21002", message: "My father feels unwell near Kanyakumari beach and we need a nearby clinic.", category: "Emergency", priority: "High", date: "02/08/2026 05:40 pm", replies: [] },
  { id: "demo-query-3", subject: "Family stay near the beach", author: "Anitha S", email: "anitha@example.com", phone: "+91 98765 21003", message: "Looking for a clean two-night stay for four people near the beach.", category: "Stay", priority: "Normal", date: "01/08/2026 09:20 am", replies: [{ id: "reply-3", date: "01/08/2026 10:05 am", message: "You can browse verified stays in our Stay section and filter by location and amenities." }] },
  { id: "demo-query-4", subject: "Best stop between Kanyakumari and Thirparappu", author: "Kavin R", email: "kavin@example.com", phone: "+91 98765 21004", message: "Which tourist place is worth visiting while driving to Thirparappu Falls?", category: "Places", priority: "Normal", date: "31/07/2026 02:10 pm", replies: [] },
];

const queryStorageKey = "kaniya-travelcare-queries";

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

export default function TravelCareAdmin() {
  const [applications, setApplications] = useState<HostApplication[]>([]);
  const [queries, setQueries] = useState<TravelCareQuery[]>([]);
  const [querySearch, setQuerySearch] = useState("");
  const [applicationSearch, setApplicationSearch] = useState("");
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [savedReplyId, setSavedReplyId] = useState<string | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminData() {
      const session = await fetchCollection<{ authenticated: boolean } | null>("admin_session", null);
      if (session?.authenticated) {
        setIsAdminAuthenticated(true);
      }
      setApplications(getHostApplications());
      const dbQueries = await fetchTableRows<TravelCareQuery>("travelcare_queries");
      const fetchedQueries = dbQueries.length > 0 ? dbQueries : await fetchCollection<TravelCareQuery[]>("travelcare_queries", []);
      const validQueries = fetchedQueries.filter((q) => q.category && q.priority && Array.isArray(q.replies));
      setQueries(validQueries.length ? validQueries : demoQueries);
      setLoading(false);
    }
    loadAdminData();
  }, []);

  // All hooks must be called unconditionally (before any early returns)
  const filteredApplications = useMemo(() => {
    const q = applicationSearch.trim().toLowerCase();
    if (!q) return applications;
    return applications.filter((item) =>
      [item.owner, item.business, item.listingType, item.town, item.phone, item.email, item.status].some((value) =>
        value.toLowerCase().includes(q),
      ),
    );
  }, [applications, applicationSearch]);

  const filteredQueries = useMemo(() => {
    const q = querySearch.trim().toLowerCase();
    const sorted = [...queries].sort((a, b) => Number(b.priority === "High") - Number(a.priority === "High"));
    if (!q) return sorted;
    return sorted.filter((item) =>
      [item.subject, item.author, item.email, item.phone, item.message, item.category, item.priority].some((value) =>
        value.toLowerCase().includes(q),
      ),
    );
  }, [queries, querySearch]);

  const handleLogout = async () => {
    await saveCollection("admin_session", { authenticated: false });
    setIsAdminAuthenticated(false);
  };

  const replyToQuery = async (event: FormEvent, queryId: string) => {
    event.preventDefault();
    const message = replyText[queryId]?.trim();
    if (!message) return;

    const newReply = { id: `${Date.now()}`, message, date: formatDate() };
    const updatedQueries = queries.map((query) =>
      query.id === queryId
        ? {
            ...query,
            replies: [...query.replies, newReply],
          }
        : query,
    );

    setQueries(updatedQueries);
    await saveCollection("travelcare_queries", updatedQueries);
    const targetQuery = updatedQueries.find((q) => q.id === queryId);
    if (targetQuery) {
      await updateRow("travelcare_queries", "id", queryId, { replies: targetQuery.replies });
    }

    setReplyText((current) => ({ ...current, [queryId]: "" }));
    setSavedReplyId(queryId);
    window.setTimeout(() => setSavedReplyId(null), 2500);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#f7f7f2]">
        <p className="text-sm font-semibold text-muted-foreground">Checking Admin Authentication...</p>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f7f7f2] p-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 text-center shadow-soft">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Lock className="h-8 w-8" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold">Admin Portal Access</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please log in with the predefined admin credentials to access the admin dashboard.
          </p>
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-left text-xs">
            <p className="font-semibold text-primary">Predefined Admin Credentials:</p>
            <p className="mt-1 font-mono text-foreground/80">Username: admin@kaniya.com (or admin)</p>
            <p className="font-mono text-foreground/80">Password: admin123</p>
          </div>
          <button
            onClick={() => setShowLoginModal(true)}
            className="mt-6 w-full rounded-xl bg-[#1f5f3b] py-3 text-sm font-semibold text-white shadow-soft transition-smooth hover:bg-[#184d2f]"
          >
            Log In as Admin
          </button>
          <AdminLoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onSuccess={() => setIsAdminAuthenticated(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f7f2]">
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#1f5f3b]">Admin</p>
            <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Admin Dashboard</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">Review host applications and respond to TravelCare queries from one place.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            <div className="border border-border bg-white p-4">
              <Home className="mr-2 inline h-4 w-4 text-[#1f5f3b]" /> {applications.length} hosts
            </div>
            <div className="border border-border bg-white p-4">
              <ShieldCheck className="mr-2 inline h-4 w-4 text-[#1f5f3b]" /> {queries.length} queries
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-4 py-4 text-xs font-semibold text-destructive hover:bg-destructive/20"
            >
              <LogOut className="h-4 w-4" /> Admin Logout
            </button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="mt-8">
          <TabsList className="h-auto flex-wrap justify-start rounded-none bg-transparent p-0">
            <TabsTrigger
              value="dashboard"
              className="rounded-none border border-border bg-white px-5 py-3 data-[state=active]:bg-[#1f5f3b] data-[state=active]:text-white"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="queries"
              className="rounded-none border border-border bg-white px-5 py-3 data-[state=active]:bg-[#1f5f3b] data-[state=active]:text-white"
            >
              Queries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <div className="border border-border bg-white">
              <div className="border-b border-border p-4 md:p-6">
                <SearchBox value={applicationSearch} onChange={setApplicationSearch} placeholder="Search host applications" />
              </div>
              <div className="hidden grid-cols-[1fr_150px_160px_150px] border-b border-border bg-[#f0eadf] px-6 py-3 text-sm font-bold text-[#362b1f] lg:grid">
                <span>Application</span>
                <span>Type</span>
                <span>Status</span>
                <span>Contact</span>
              </div>
              {filteredApplications.map((app) => (
                <article key={app.id} className="grid gap-4 border-b border-border p-5 lg:grid-cols-[1fr_150px_160px_150px] lg:px-6">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-[#1f5f3b]">{app.business}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Owner: {app.owner} - {app.town}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#5f594e]">{app.description}</p>
                    <p className="mt-3 text-xs text-muted-foreground">Submitted {app.submittedAt}</p>
                  </div>
                  <div className="text-sm font-semibold text-muted-foreground">{app.listingType}</div>
                  <div>
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-bold ${
                        app.status === "approved" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {app.status === "approved" ? "Approved" : "Needs review"}
                    </span>
                    <div className="mt-3 grid gap-1 text-xs text-muted-foreground">
                      <span>ID: {app.documents.idProof ? "Yes" : "No"}</span>
                      <span>Ownership: {app.documents.ownership ? "Yes" : "No"}</span>
                      <span>License: {app.documents.license ? "Yes" : "No"}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>{app.phone}</p>
                    <p>{app.email}</p>
                  </div>
                </article>
              ))}
              {filteredApplications.length === 0 && (
                <p className="p-8 text-center text-sm text-muted-foreground">No host applications yet.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="queries" className="mt-6">
            <div className="border border-border bg-white">
              <div className="border-b border-border p-4 md:p-6">
                <SearchBox value={querySearch} onChange={setQuerySearch} placeholder="Search TravelCare queries" />
              </div>
              <div className="hidden grid-cols-[1fr_140px_120px_180px] border-b border-border bg-[#f0eadf] px-6 py-3 text-sm font-bold text-[#362b1f] lg:grid">
                <span>Query</span>
                <span>Category</span>
                <span>Priority</span>
                <span>User</span>
              </div>

              {filteredQueries.map((query) => (
                <article key={query.id} className="border-b border-border p-5 md:p-6">
                  <div className="grid gap-4 lg:grid-cols-[1fr_140px_120px_180px]">
                    <div>
                      <h2 className="font-display text-xl font-semibold text-[#1f5f3b]">{query.subject}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-[#5f594e]">{query.message}</p>
                      <p className="mt-2 text-xs text-muted-foreground">Submitted {query.date}</p>
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground">{query.category}</div>
                    <div>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold ${
                          query.priority === "High" ? "bg-red-100 text-red-800" : "bg-[#e8e0cf] text-[#332513]"
                        }`}
                      >
                        {query.priority === "High" && <AlertTriangle className="h-3 w-3" />}
                        {query.priority}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold text-[#362b1f]">{query.author}</p>
                      <p>{query.email}</p>
                      <p>{query.phone}</p>
                    </div>
                  </div>

                  {query.replies.length > 0 && (
                    <div className="mt-5 space-y-2">
                      {query.replies.map((reply) => (
                        <div key={reply.id} className="border-l-4 border-[#1f5f3b] bg-[#f7f7f2] p-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#1f5f3b]">
                            Reply sent - {reply.date}
                          </p>
                          <p className="mt-1 text-sm text-[#4d463b]">{reply.message}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <form onSubmit={(event) => replyToQuery(event, query.id)} className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
                    <textarea
                      value={replyText[query.id] ?? ""}
                      onChange={(e) => setReplyText((current) => ({ ...current, [query.id]: e.target.value }))}
                      placeholder="Write a reply for the user"
                      rows={3}
                      className="w-full border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[#1f5f3b]"
                    />
                    <button
                      type="submit"
                      className="inline-flex h-fit items-center justify-center gap-2 bg-[#1f5f3b] px-5 py-2 text-sm font-semibold text-white"
                    >
                      <MessageSquareReply className="h-4 w-4" /> Reply
                    </button>
                  </form>
                  {savedReplyId === query.id && (
                    <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#1f5f3b]">
                      <CheckCircle2 className="h-4 w-4" /> Reply saved for user
                    </p>
                  )}
                </article>
              ))}

              {filteredQueries.length === 0 && (
                <p className="p-8 text-center text-sm text-muted-foreground">No TravelCare queries yet.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <form className="relative max-w-md" onSubmit={(event) => event.preventDefault()}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border border-border bg-[#fafafa] py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#1f5f3b]"
      />
    </form>
  );
}
