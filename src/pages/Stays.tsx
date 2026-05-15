import { useMemo, useState } from "react";
import { stays as fallbackStays } from "@/data/stays";
import type { Stay } from "@/data/stays";
import { useCollection } from "@/hooks/useCollection";
import { getReviews, getVendorStays, saveReview } from "@/lib/localMarketplace";
import { insertRow } from "@/lib/supabaseContent";
import { Star, MapPin, ShieldCheck, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Stays() {
  const { data: databaseStays } = useCollection<Stay[]>("stays", fallbackStays);
  const [selected, setSelected] = useState<Stay | null>(null);
  const [reviewFor, setReviewFor] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const stays = useMemo(() => {
    const merged = [...getVendorStays(), ...databaseStays].filter((stay) => stay.verified);
    return Array.from(new Map(merged.map((stay) => [stay.id, stay])).values());
  }, [databaseStays, refresh]);

  const submitBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selected) return;
    const form = new FormData(e.currentTarget);
    await insertRow("bookings", {
      listing_type: "stay",
      listing_id: selected.id,
      listing_name: selected.name,
      guest_name: form.get("name"),
      guest_email: form.get("email"),
      guest_phone: form.get("phone"),
      check_in: form.get("checkIn"),
      check_out: form.get("checkOut"),
      payment_status: "dummy_paid",
      amount: selected.pricePerNight,
    });
    setBooked(true);
  };

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Where to stay</p>
        <h1 className="mt-2 font-display text-5xl font-bold">Verified stays</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Only approved stays submitted through vendor onboarding, with real photos and transparent pricing.
        </p>
      </header>

      {stays.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-8">
          <h2 className="font-display text-2xl font-semibold">No verified stay listings yet</h2>
          <p className="mt-2 text-muted-foreground">
            Stays now appear only after the vendor onboarding verification flow. Submit one from the onboarding page to preview it here.
          </p>
          <Button asChild variant="hero" className="mt-5"><a href="/onboard">Onboard a stay</a></Button>
        </div>
      )}

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {stays.map((s) => {
          const reviews = getReviews(s.id);
          return (
            <article key={s.id} className="rounded-2xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-smooth group">
              <div className="grid sm:grid-cols-[40%_1fr]">
                <div className="aspect-[4/3] sm:aspect-auto overflow-hidden">
                  <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700" />
                </div>
                <div className="p-5 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">{s.type}</span>
                    {s.verified && <span className="inline-flex items-center gap-1 text-secondary"><ShieldCheck className="h-3 w-3" /> Verified</span>}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold">{s.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {s.location}</p>
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{s.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.amenities.slice(0, 3).map((a) => (
                      <span key={a} className="text-[11px] px-2 py-0.5 rounded-full bg-muted">{a}</span>
                    ))}
                  </div>
                  <div className="mt-3 min-h-8 text-xs text-muted-foreground">
                    {reviews.slice(0, 2).map((review) => (
                      <p key={`${review.createdAt}-${review.name}`} className="line-clamp-1">"{review.comment}" - {review.name}</p>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 flex items-end justify-between">
                    <div>
                      <p className="font-display text-2xl font-bold">₹{s.pricePerNight.toLocaleString()}<span className="text-xs font-normal text-muted-foreground"> /night</span></p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Star className="h-3 w-3 fill-accent text-accent" /> {s.rating} - {s.reviews + reviews.length} reviews</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setReviewFor(s.id)}>Review</Button>
                      <Button variant="hero" size="sm" onClick={() => { setSelected(s); setBooked(false); }}>Book</Button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-foreground/45 p-4 flex items-center justify-center" onClick={() => setSelected(null)}>
          <div className="w-full max-w-xl rounded-2xl bg-card border border-border shadow-elevated p-6" onClick={(e) => e.stopPropagation()}>
            {booked ? (
              <div className="text-center py-8">
                <CreditCard className="mx-auto h-10 w-10 text-primary" />
                <h2 className="mt-3 font-display text-3xl font-bold">Booking confirmed</h2>
                <p className="mt-2 text-muted-foreground">Dummy payment completed. Your booking request has been saved.</p>
                <Button className="mt-6" variant="hero" onClick={() => setSelected(null)}>Done</Button>
              </div>
            ) : (
              <form onSubmit={submitBooking} className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary font-semibold">Login / Signup</p>
                  <h2 className="font-display text-3xl font-bold">{selected.name}</h2>
                  <p className="text-sm text-muted-foreground">Enter guest details to continue to dummy payment.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field name="name" label="Full name" icon required />
                  <Field name="email" label="Email" type="email" required />
                  <Field name="phone" label="Mobile number" type="tel" required />
                  <Field name="checkIn" label="Check-in" type="date" required />
                  <Field name="checkOut" label="Check-out" type="date" required />
                </div>
                <div className="rounded-xl bg-muted/50 p-4 text-sm">
                  <p className="font-semibold">Dummy payment</p>
                  <p className="text-muted-foreground">Use card 4242 4242 4242 4242, any future date, any CVC.</p>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="ghost" onClick={() => setSelected(null)}>Cancel</Button>
                  <Button type="submit" variant="hero"><CreditCard className="h-4 w-4" /> Pay ₹{selected.pricePerNight.toLocaleString()}</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {reviewFor && (
        <ReviewModal
          listingId={reviewFor}
          onClose={() => setReviewFor(null)}
          onSaved={() => {
            setRefresh((value) => value + 1);
            setReviewFor(null);
          }}
        />
      )}
    </div>
  );
}

function Field({ label, icon, ...props }: { label: string; icon?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <span className="mt-1 flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2">
        {icon && <User className="h-4 w-4 text-muted-foreground" />}
        <input {...props} className="min-w-0 flex-1 bg-transparent outline-none font-normal" />
      </span>
    </label>
  );
}

function ReviewModal({ listingId, onClose, onSaved }: { listingId: string; onClose: () => void; onSaved: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-foreground/45 p-4 flex items-center justify-center" onClick={onClose}>
      <form
        className="w-full max-w-md rounded-2xl bg-card border border-border shadow-elevated p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          saveReview({
            listingId,
            name: String(form.get("name")),
            rating: Number(form.get("rating")),
            comment: String(form.get("comment")),
            createdAt: new Date().toISOString(),
          });
          onSaved();
        }}
      >
        <h2 className="font-display text-2xl font-bold">Add a review</h2>
        <Field name="name" label="Name" required />
        <Field name="rating" label="Rating" type="number" min={1} max={5} defaultValue={5} required />
        <label className="block text-sm font-semibold">
          Comment
          <textarea name="comment" rows={4} required className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 outline-none" />
        </label>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="hero">Save review</Button>
        </div>
      </form>
    </div>
  );
}
