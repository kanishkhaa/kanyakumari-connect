import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, User, CreditCard } from "lucide-react";
import { stays as fallbackStays } from "@/data/stays";
import type { Stay, StayType } from "@/data/stays";
import { StayCard } from "@/components/StayCard";
import { Button } from "@/components/ui/button";
import { useCollection } from "@/hooks/useCollection";
import { getReviews, getVendorStays, saveReview } from "@/lib/localMarketplace";
import { insertRow } from "@/lib/supabaseContent";

type SortOption = "recommended" | "price-low" | "price-high" | "rating" | "reviews" | "name";
const stayTypes: Array<StayType | "All"> = ["All", "Hotel", "Eco Lodge", "Homestay", "Tribal Stay"];

export default function Stays() {
  const { data: databaseStays } = useCollection<Stay[]>("stays", fallbackStays);
  const [selected, setSelected] = useState<Stay | null>(null);
  const [reviewFor, setReviewFor] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<StayType | "All">("All");
  const [minimumRating, setMinimumRating] = useState("0");
  const [maximumPrice, setMaximumPrice] = useState("0");
  const [sort, setSort] = useState<SortOption>("recommended");

  const allStays = useMemo(() => {
    const merged = [...getVendorStays(), ...databaseStays].filter((stay) => stay.verified);
    return Array.from(new Map(merged.map((stay) => [stay.id, stay])).values());
  }, [databaseStays, refresh]);

  const visibleStays = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = allStays.filter((stay) => {
      const matchesQuery = !normalizedQuery || [stay.name, stay.location, stay.type, stay.description, ...stay.amenities]
        .join(" ").toLowerCase().includes(normalizedQuery);
      return matchesQuery && (type === "All" || stay.type === type)
        && stay.rating >= Number(minimumRating)
        && (!Number(maximumPrice) || stay.pricePerNight <= Number(maximumPrice));
    });
    return filtered.sort((a, b) => {
      if (sort === "price-low") return a.pricePerNight - b.pricePerNight;
      if (sort === "price-high") return b.pricePerNight - a.pricePerNight;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "reviews") return b.reviews - a.reviews;
      if (sort === "name") return a.name.localeCompare(b.name);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.rating - a.rating;
    });
  }, [allStays, query, type, minimumRating, maximumPrice, sort]);

  const submitBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    const form = new FormData(event.currentTarget);
    await insertRow("bookings", {
      listing_type: "stay", listing_id: selected.id, listing_name: selected.name,
      guest_name: form.get("name"), guest_email: form.get("email"), guest_phone: form.get("phone"),
      check_in: form.get("checkIn"), check_out: form.get("checkOut"), payment_status: "dummy_paid", amount: selected.pricePerNight,
    });
    setBooked(true);
  };

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Where to stay</p>
        <h1 className="mt-2 font-display text-5xl font-bold">Find your Kanyakumari stay</h1>
        <p className="mt-4 text-lg text-muted-foreground">Browse verified properties with planning information, direct map links and official contact options where available.</p>
      </header>

      <section aria-label="Stay filters" className="mt-8 rounded-2xl border border-border bg-card p-4 shadow-soft">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_repeat(4,minmax(130px,auto))]">
          <label className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search hotels, locations or amenities" className="min-w-0 flex-1 bg-transparent outline-none" />
          </label>
          <FilterSelect label="Type" value={type} onChange={(value) => setType(value as StayType | "All")} options={stayTypes.map((item) => [item, item])} />
          <FilterSelect label="Minimum rating" value={minimumRating} onChange={setMinimumRating} options={[["0", "Any rating"], ["4", "4.0+"], ["4.2", "4.2+"], ["4.5", "4.5+"]]} />
          <FilterSelect label="Max price" value={maximumPrice} onChange={setMaximumPrice} options={[["0", "Any price"], ["2500", "Up to ₹2,500"], ["4000", "Up to ₹4,000"], ["6000", "Up to ₹6,000"]]} />
          <FilterSelect label="Sort" value={sort} onChange={(value) => setSort(value as SortOption)} options={[["recommended", "Recommended"], ["rating", "Highest rated"], ["price-low", "Lowest price"], ["price-high", "Highest price"], ["reviews", "Most reviewed"], ["name", "Name A–Z"]]} />
        </div>
      </section>

      <div className="mt-7 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">{visibleStays.length} {visibleStays.length === 1 ? "stay" : "stays"} found</p>
        <p className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex"><SlidersHorizontal className="h-3.5 w-3.5" />Prices are planning estimates, not live rates.</p>
      </div>

      {visibleStays.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-8 text-center"><h2 className="font-display text-2xl font-semibold">No stays match these filters</h2><p className="mt-2 text-muted-foreground">Try a broader search or clear one of the filters.</p></div>
      ) : (
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          {visibleStays.map((stay) => <StayCard key={stay.id} stay={stay} reviewCount={getReviews(stay.id).length} onReview={() => setReviewFor(stay.id)} onEnquire={() => { setSelected(stay); setBooked(false); }} />)}
        </div>
      )}

      {selected && <BookingModal stay={selected} booked={booked} onClose={() => setSelected(null)} onSubmit={submitBooking} />}
      {reviewFor && <ReviewModal listingId={reviewFor} onClose={() => setReviewFor(null)} onSaved={() => { setRefresh((value) => value + 1); setReviewFor(null); }} />}
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<[string, string]> }) {
  return <label className="text-xs font-medium text-muted-foreground"><span className="sr-only">{label}</span><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} className="h-full w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none">{options.map(([optionValue, name]) => <option key={optionValue} value={optionValue}>{name}</option>)}</select></label>;
}

function BookingModal({ stay, booked, onClose, onSubmit }: { stay: Stay; booked: boolean; onClose: () => void; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/45 p-4" onClick={onClose}><div className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-elevated" onClick={(event) => event.stopPropagation()}>{booked ? <div className="py-8 text-center"><CreditCard className="mx-auto h-10 w-10 text-primary" /><h2 className="mt-3 font-display text-3xl font-bold">Booking request saved</h2><p className="mt-2 text-muted-foreground">Your demonstration payment was completed and the request was recorded.</p><Button className="mt-6" variant="hero" onClick={onClose}>Done</Button></div> : <form onSubmit={onSubmit} className="space-y-4"><div><p className="text-xs font-semibold uppercase tracking-widest text-primary">Booking request</p><h2 className="font-display text-3xl font-bold">{stay.name}</h2><p className="text-sm text-muted-foreground">Send your stay request through the project’s existing demo booking flow.</p></div><div className="grid gap-4 sm:grid-cols-2"><Field name="name" label="Full name" icon required /><Field name="email" label="Email" type="email" required /><Field name="phone" label="Mobile number" type="tel" required /><Field name="checkIn" label="Check-in" type="date" required /><Field name="checkOut" label="Check-out" type="date" required /></div><div className="rounded-xl bg-muted/50 p-4 text-sm"><p className="font-semibold">Demo payment</p><p className="text-muted-foreground">Use card 4242 4242 4242 4242, any future date and any CVC.</p></div><div className="flex justify-end gap-2"><Button type="button" variant="ghost" onClick={onClose}>Cancel</Button><Button type="submit" variant="hero"><CreditCard className="h-4 w-4" />Pay ₹{stay.pricePerNight.toLocaleString()}</Button></div></form>}</div></div>;
}

function Field({ label, icon, ...props }: { label: string; icon?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <label className="block text-sm font-semibold">{label}<span className="mt-1 flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2">{icon && <User className="h-4 w-4 text-muted-foreground" />}<input {...props} className="min-w-0 flex-1 bg-transparent font-normal outline-none" /></span></label>;
}

function ReviewModal({ listingId, onClose, onSaved }: { listingId: string; onClose: () => void; onSaved: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/45 p-4" onClick={onClose}><form className="w-full max-w-md space-y-4 rounded-2xl border border-border bg-card p-6 shadow-elevated" onClick={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); saveReview({ listingId, name: String(form.get("name")), rating: Number(form.get("rating")), comment: String(form.get("comment")), createdAt: new Date().toISOString() }); onSaved(); }}><h2 className="font-display text-2xl font-bold">Add a review</h2><Field name="name" label="Name" required /><Field name="rating" label="Rating" type="number" min={1} max={5} defaultValue={5} required /><label className="block text-sm font-semibold">Comment<textarea name="comment" rows={4} required className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 font-normal outline-none" /></label><div className="flex justify-end gap-2"><Button type="button" variant="ghost" onClick={onClose}>Cancel</Button><Button type="submit" variant="hero">Save review</Button></div></form></div>;
}
