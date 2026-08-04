import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, User, CreditCard, ChevronDown, ChevronUp, Info, MessageSquare, Star, X } from "lucide-react";
import { stays as fallbackStays } from "@/data/stays";
import type { Stay, StayType } from "@/data/stays";
import { StayCard } from "@/components/stayCard";
import { Button } from "@/components/ui/button";
import { useCollection } from "@/hooks/useCollection";
import { getReviews, getVendorStays, initMarketplaceFromSupabase, saveReview, subscribeToReviews } from "@/lib/localMarketplace";
import type { Review } from "@/lib/localMarketplace";
import { insertRow } from "@/lib/supabaseContent";

type SortOption = "recommended" | "price-low" | "price-high" | "rating" | "reviews" | "name";
const stayTypes: Array<StayType | "All"> = ["All", "Hotel", "Eco Lodge", "Homestay", "Tribal Stay"];

export default function Stays() {
  const { data: databaseStays } = useCollection<Stay[]>("stays", fallbackStays);
  const [selected, setSelected] = useState<Stay | null>(null);
  const [reviewFor, setReviewFor] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [, setReviewVersion] = useState(0);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<StayType | "All">("All");
  const [minimumRating, setMinimumRating] = useState("0");
  const [maximumPrice, setMaximumPrice] = useState("0");
  const [sort, setSort] = useState<SortOption>("recommended");

  useEffect(() => {
    const unsubscribe = subscribeToReviews(() => setReviewVersion((value) => value + 1));
    void initMarketplaceFromSupabase();
    return unsubscribe;
  }, []);

  const allStays = useMemo(() => {
    const merged = [...getVendorStays(), ...databaseStays].filter((stay) => stay.verified);
    return Array.from(new Map(merged.map((stay) => [stay.id, stay])).values());
  }, [databaseStays]);

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
          {visibleStays.map((stay) => <StayCard key={stay.id} stay={stay} reviewCount={getReviews(stay.id).length} onViewReviews={() => setReviewFor(stay.id)} onReview={() => setReviewFor(stay.id)} onEnquire={() => { setSelected(stay); setBooked(false); }} />)}
        </div>
      )}

      {selected && <BookingModal stay={selected} booked={booked} onClose={() => setSelected(null)} onSubmit={submitBooking} />}
      {reviewFor && <ReviewModal stay={allStays.find((stay) => stay.id === reviewFor)!} onClose={() => setReviewFor(null)} onSaved={() => setReviewFor(null)} />}
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

function ReviewModal({ stay, onClose, onSaved }: { stay: Stay; onClose: () => void; onSaved: () => void }) {
  const [rating, setRating] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const reviews = getReviews(stay.id);
  const reviewSummary = makeReviewSummary(stay.rating, stay.reviews, reviews);

  const submitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rating || isSaving) return;
    const form = new FormData(event.currentTarget);
    setIsSaving(true);
    try {
      await saveReview({ listingId: stay.id, name: String(form.get("name")).trim(), rating, comment: String(form.get("comment")).trim(), createdAt: new Date().toISOString() });
      onSaved();
    } finally {
      setIsSaving(false);
    }
  };

  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-foreground/50 p-4 sm:p-6" onClick={onClose}>
    <form className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-elevated" onClick={(event) => event.stopPropagation()} onSubmit={submitReview}>
      <div className="flex items-start justify-between border-b border-border px-5 py-4 sm:px-7">
        <div><p className="text-xs font-semibold uppercase tracking-widest text-primary">Guest reviews</p><h2 className="mt-1 font-display text-2xl font-bold">{stay.name}</h2></div>
        <Button type="button" variant="ghost" size="icon" aria-label="Close reviews" onClick={onClose}><X /></Button>
      </div>

      <div className="max-h-[72vh] overflow-y-auto px-5 py-5 sm:px-7">
        <section aria-label="Review summary" className="rounded-xl border border-border bg-muted/30 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-lg font-semibold"><span>Review summary</span><Info className="h-4 w-4 text-muted-foreground" aria-label="Ratings include published guest reviews" /></div>
          <div className="mt-4 grid gap-5 sm:grid-cols-[130px_1fr] sm:items-center">
            <div className="text-center sm:border-r sm:border-border sm:pr-5"><p className="font-display text-5xl font-bold leading-none">{reviewSummary.average.toFixed(1)}</p><StarRating rating={reviewSummary.average} size="sm" className="mt-2 justify-center" /><p className="mt-1 text-xs text-muted-foreground">{reviewSummary.total.toLocaleString()} reviews</p></div>
            <div className="space-y-1.5">{[5, 4, 3, 2, 1].map((score) => <div key={score} className="grid grid-cols-[42px_1fr_28px] items-center gap-2 text-xs text-muted-foreground"><span>{score} star</span><div className="h-2.5 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-accent" style={{ width: `${reviewSummary.total ? (reviewSummary.distribution[score] / reviewSummary.total) * 100 : 0}%` }} /></div><span className="text-right">{reviewSummary.distribution[score]}</span></div>)}</div>
          </div>
        </section>

        <section className="mt-5 border-t border-border pt-5"><div className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /><h3 className="font-display text-xl font-semibold">Write a review</h3></div><p className="mt-1 text-sm text-muted-foreground">Share your experience to help future travellers.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"><Field name="name" label="Your name" placeholder="Enter your name" required /><div><p className="text-sm font-semibold">Your rating</p><StarPicker value={rating} onChange={setRating} /></div></div>
          <label className="mt-4 block text-sm font-semibold">Your review<textarea name="comment" rows={3} required minLength={5} placeholder="Tell travellers what you liked about your stay..." className="mt-1.5 w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 font-normal outline-none ring-offset-background focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
        </section>

        <section className="mt-6 border-t border-border pt-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-display text-xl font-semibold">People's reviews</h3><p className="mt-0.5 text-sm text-muted-foreground">Reviews shared by travellers who stayed here.</p></div>{reviews.length > 4 && <Button type="button" variant="link" className="px-0" onClick={() => setShowAllReviews((value) => !value)}>{showAllReviews ? <>Show fewer <ChevronUp /></> : <>View all {reviews.length} reviews <ChevronDown /></>}</Button>}</div>{reviews.length > 0 ? <div className="mt-4 grid gap-4 sm:grid-cols-2">{reviews.slice(0, showAllReviews ? undefined : 4).map((review, index) => <ReviewCard key={`${review.createdAt}-${index}`} review={review} />)}</div> : <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">No traveller reviews have been posted yet. Be the first to share your stay experience.</div>}</section>
      </div>

      <div className="flex justify-end gap-2 border-t border-border bg-card px-5 py-4 sm:px-7"><Button type="button" variant="ghost" onClick={onClose}>Cancel</Button><Button type="submit" variant="hero" disabled={!rating || isSaving}>{isSaving ? "Saving..." : "Post review"}</Button></div>
    </form>
  </div>;
}

function StarPicker({ value, onChange }: { value: number; onChange: (rating: number) => void }) {
  return <div className="mt-1.5 flex gap-1" role="radiogroup" aria-label="Your rating">{[1, 2, 3, 4, 5].map((score) => <button key={score} type="button" role="radio" aria-checked={value === score} aria-label={`${score} star${score === 1 ? "" : "s"}`} onClick={() => onChange(score)} className="rounded p-0.5 focus:outline-none focus:ring-2 focus:ring-primary"><Star className={`h-7 w-7 transition-colors ${score <= value ? "fill-accent text-accent" : "text-border"}`} /></button>)}</div>;
}

function StarRating({ rating, size = "xs", className = "" }: { rating: number; size?: "xs" | "sm"; className?: string }) {
  const iconClass = size === "sm" ? "h-4 w-4" : "h-3.5 w-3.5";
  return <div className={`flex ${className}`} aria-label={`${rating.toFixed(1)} out of 5 stars`}>{[1, 2, 3, 4, 5].map((score) => <Star key={score} className={`${iconClass} ${score <= Math.round(rating) ? "fill-accent text-accent" : "text-border"}`} />)}</div>;
}

function ReviewCard({ review }: { review: Review }) {
  const initial = review.name.trim().charAt(0).toUpperCase() || "G";
  return <article className="rounded-xl border border-border bg-background p-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{initial}</span><div className="min-w-0"><p className="truncate font-semibold">{review.name}</p><StarRating rating={review.rating} /></div></div><p className="mt-3 text-sm leading-relaxed text-foreground">{review.comment}</p></article>;
}

function makeReviewSummary(baseRating: number, baseTotal: number, submittedReviews: Review[]) {
  const submittedTotal = submittedReviews.length;
  const submittedRatingTotal = submittedReviews.reduce((total, review) => total + review.rating, 0);
  const total = baseTotal + submittedTotal;
  const average = total ? ((baseRating * baseTotal) + submittedRatingTotal) / total : 0;
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const fiveStar = Math.round(baseTotal * Math.max(0.1, Math.min(0.9, (baseRating - 3.2) / 1.8)));
  const fourStar = Math.round((baseTotal - fiveStar) * 0.72);
  const threeStar = Math.round((baseTotal - fiveStar - fourStar) * 0.7);
  distribution[5] = fiveStar;
  distribution[4] = fourStar;
  distribution[3] = threeStar;
  distribution[2] = Math.max(0, baseTotal - fiveStar - fourStar - threeStar);
  submittedReviews.forEach((review) => { distribution[review.rating] += 1; });
  return { average, total, distribution };
}
