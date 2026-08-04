import { useEffect, useMemo, useState } from "react";
import { operators as fallbackOperators } from "@/data/operators";
import type { Operator } from "@/data/operators";
import { useCollection } from "@/hooks/useCollection";
import { getReviews, getVendorOperators, initMarketplaceFromSupabase, saveReview, subscribeToReviews } from "@/lib/localMarketplace";
import type { Review } from "@/lib/localMarketplace";
import { useI18n } from "@/i18n/I18nContext";
import { ChevronDown, ChevronUp, ExternalLink, Info, Mail, MessageSquare, Phone, ShieldCheck, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TourOperators() {
  const { t } = useI18n();
  const { data: databaseOperators } = useCollection<Operator[]>("operators", fallbackOperators);
  const [reviewFor, setReviewFor] = useState<string | null>(null);
  const [, setReviewVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToReviews(() => setReviewVersion((value) => value + 1));
    void initMarketplaceFromSupabase();
    return unsubscribe;
  }, []);

  const operators = useMemo(() => {
    const merged = [...getVendorOperators(), ...databaseOperators].filter((operator) => operator.verified);
    return Array.from(new Map(merged.map((operator) => [operator.id, operator])).values());
  }, [databaseOperators]);

  return <div className="container mx-auto py-12">
    <header className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-wider text-primary">Operators</p><h1 className="mt-2 font-display text-5xl font-bold">{t("operators_title")}</h1><p className="mt-4 text-lg text-muted-foreground">{t("operators_intro")}</p></header>

    <div className="mt-12 grid gap-5 md:grid-cols-2">{operators.map((operator) => {
      const reviews = getReviews(operator.id);
      const reviewSummary = makeReviewSummary(operator.rating, operator.reviews, reviews);
      const totalReviews = reviewSummary.total;
      return <article key={operator.id} className="rounded-2xl border border-border bg-card p-6 transition-smooth hover:shadow-soft"><div className="flex items-start justify-between gap-3"><div><h3 className="font-display text-xl font-semibold">{operator.name}</h3><p className="mt-1 text-xs text-muted-foreground"><span className="mr-2 rounded-full bg-secondary/10 px-2 py-0.5 font-medium text-secondary">{operator.type}</span>{operator.verified && <span className="inline-flex items-center gap-1 text-secondary"><ShieldCheck className="h-3 w-3" /> Verified</span>}</p></div><p className="text-xs text-muted-foreground">{totalReviews ? <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent text-accent" />{reviewSummary.average.toFixed(1)} · {totalReviews} reviews</span> : "No reviews yet"}</p></div><p className="mt-3 text-sm text-muted-foreground">{operator.speciality}</p><div className="mt-5 flex flex-wrap gap-2"><a href={`tel:${operator.phone.replace(/[^0-9]/g, "")}`} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm text-primary transition-smooth hover:bg-primary/20"><Phone className="h-3.5 w-3.5" /> {operator.phone}</a><a href={`mailto:${operator.email}`} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm transition-smooth hover:bg-muted/70"><Mail className="h-3.5 w-3.5" /> Email</a>{operator.website && <a href={operator.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm transition-smooth hover:bg-muted/70"><ExternalLink className="h-3.5 w-3.5" /> Website</a>}<Button size="sm" variant="outline" onClick={() => setReviewFor(operator.id)}>View reviews</Button><Button size="sm" variant="outline" onClick={() => setReviewFor(operator.id)}>Write a review</Button></div></article>;
    })}</div>

    {reviewFor && <OperatorReviewModal operator={operators.find((operator) => operator.id === reviewFor)!} onClose={() => setReviewFor(null)} onSaved={() => setReviewFor(null)} />}
  </div>;
}

function OperatorReviewModal({ operator, onClose, onSaved }: { operator: Operator; onClose: () => void; onSaved: () => void }) {
  const [rating, setRating] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const reviews = getReviews(operator.id);
  const reviewSummary = makeReviewSummary(operator.rating, operator.reviews, reviews);

  const submitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rating || isSaving) return;
    const form = new FormData(event.currentTarget);
    setIsSaving(true);
    try {
      await saveReview({ listingId: operator.id, name: String(form.get("name")).trim(), rating, comment: String(form.get("comment")).trim(), createdAt: new Date().toISOString() });
      onSaved();
    } finally { setIsSaving(false); }
  };

  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-foreground/50 p-4 sm:p-6" onClick={onClose}><form className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-elevated" onClick={(event) => event.stopPropagation()} onSubmit={submitReview}><div className="flex items-start justify-between border-b border-border px-5 py-4 sm:px-7"><div><p className="text-xs font-semibold uppercase tracking-widest text-primary">Traveller reviews</p><h2 className="mt-1 font-display text-2xl font-bold">{operator.name}</h2></div><Button type="button" variant="ghost" size="icon" aria-label="Close reviews" onClick={onClose}><X /></Button></div><div className="max-h-[72vh] overflow-y-auto px-5 py-5 sm:px-7"><section aria-label="Review summary" className="rounded-xl border border-border bg-muted/30 p-4 sm:p-5"><div className="flex items-center gap-2 text-lg font-semibold"><span>Review summary</span><Info className="h-4 w-4 text-muted-foreground" aria-label="Ratings include published traveller reviews" /></div><div className="mt-4 grid gap-5 sm:grid-cols-[130px_1fr] sm:items-center"><div className="text-center sm:border-r sm:border-border sm:pr-5"><p className="font-display text-5xl font-bold leading-none">{reviewSummary.average.toFixed(1)}</p><StarRating rating={reviewSummary.average} size="sm" className="mt-2 justify-center" /><p className="mt-1 text-xs text-muted-foreground">{reviewSummary.total.toLocaleString()} reviews</p></div><div className="space-y-1.5">{[5, 4, 3, 2, 1].map((score) => <div key={score} className="grid grid-cols-[42px_1fr_28px] items-center gap-2 text-xs text-muted-foreground"><span>{score} star</span><div className="h-2.5 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-accent" style={{ width: `${reviewSummary.total ? (reviewSummary.distribution[score] / reviewSummary.total) * 100 : 0}%` }} /></div><span className="text-right">{reviewSummary.distribution[score]}</span></div>)}</div></div></section><section className="mt-5 border-t border-border pt-5"><div className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /><h3 className="font-display text-xl font-semibold">Write a review</h3></div><p className="mt-1 text-sm text-muted-foreground">Share your tour experience to help future travellers.</p><div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"><ReviewField name="name" label="Your name" placeholder="Enter your name" required /><div><p className="text-sm font-semibold">Your rating</p><StarPicker value={rating} onChange={setRating} /></div></div><label className="mt-4 block text-sm font-semibold">Your review<textarea name="comment" rows={3} required minLength={5} placeholder="Tell travellers about your tour experience..." className="mt-1.5 w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 font-normal outline-none ring-offset-background focus:border-primary focus:ring-2 focus:ring-primary/20" /></label></section><section className="mt-6 border-t border-border pt-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-display text-xl font-semibold">People's reviews</h3><p className="mt-0.5 text-sm text-muted-foreground">Reviews shared by travellers who used this operator.</p></div>{reviews.length > 4 && <Button type="button" variant="link" className="px-0" onClick={() => setShowAllReviews((value) => !value)}>{showAllReviews ? <>Show fewer <ChevronUp /></> : <>View all {reviews.length} reviews <ChevronDown /></>}</Button>}</div>{reviews.length > 0 ? <div className="mt-4 grid gap-4 sm:grid-cols-2">{reviews.slice(0, showAllReviews ? undefined : 4).map((review, index) => <ReviewCard key={`${review.createdAt}-${index}`} review={review} />)}</div> : <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">No traveller reviews have been posted yet. Be the first to share your tour experience.</div>}</section></div><div className="flex justify-end gap-2 border-t border-border bg-card px-5 py-4 sm:px-7"><Button type="button" variant="ghost" onClick={onClose}>Cancel</Button><Button type="submit" variant="hero" disabled={!rating || isSaving}>{isSaving ? "Saving..." : "Post review"}</Button></div></form></div>;
}

function ReviewField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) { return <label className="block text-sm font-semibold">{label}<span className="mt-1 flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2"><input {...props} className="min-w-0 flex-1 bg-transparent font-normal outline-none" /></span></label>; }
function StarPicker({ value, onChange }: { value: number; onChange: (rating: number) => void }) { return <div className="mt-1.5 flex gap-1" role="radiogroup" aria-label="Your rating">{[1, 2, 3, 4, 5].map((score) => <button key={score} type="button" role="radio" aria-checked={value === score} aria-label={`${score} star${score === 1 ? "" : "s"}`} onClick={() => onChange(score)} className="rounded p-0.5 focus:outline-none focus:ring-2 focus:ring-primary"><Star className={`h-7 w-7 transition-colors ${score <= value ? "fill-accent text-accent" : "text-border"}`} /></button>)}</div>; }
function StarRating({ rating, size = "xs", className = "" }: { rating: number; size?: "xs" | "sm"; className?: string }) { const iconClass = size === "sm" ? "h-4 w-4" : "h-3.5 w-3.5"; return <div className={`flex ${className}`} aria-label={`${rating.toFixed(1)} out of 5 stars`}>{[1, 2, 3, 4, 5].map((score) => <Star key={score} className={`${iconClass} ${score <= Math.round(rating) ? "fill-accent text-accent" : "text-border"}`} />)}</div>; }
function ReviewCard({ review }: { review: Review }) { const initial = review.name.trim().charAt(0).toUpperCase() || "G"; return <article className="rounded-xl border border-border bg-background p-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{initial}</span><div className="min-w-0"><p className="truncate font-semibold">{review.name}</p><StarRating rating={review.rating} /></div></div><p className="mt-3 text-sm leading-relaxed text-foreground">{review.comment}</p></article>; }
function makeReviewSummary(baseRating: number, baseTotal: number, submittedReviews: Review[]) { const submittedTotal = submittedReviews.length; const submittedRatingTotal = submittedReviews.reduce((total, review) => total + review.rating, 0); const total = baseTotal + submittedTotal; const average = total ? ((baseRating * baseTotal) + submittedRatingTotal) / total : 0; const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }; const fiveStar = Math.round(baseTotal * Math.max(0.1, Math.min(0.9, (baseRating - 3.2) / 1.8))); const fourStar = Math.round((baseTotal - fiveStar) * 0.72); const threeStar = Math.round((baseTotal - fiveStar - fourStar) * 0.7); distribution[5] = fiveStar; distribution[4] = fourStar; distribution[3] = threeStar; distribution[2] = Math.max(0, baseTotal - fiveStar - fourStar - threeStar); submittedReviews.forEach((review) => { distribution[review.rating] += 1; }); return { average, total, distribution }; }
