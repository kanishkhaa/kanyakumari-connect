import { useMemo, useState } from "react";
import { operators as fallbackOperators } from "@/data/operators";
import type { Operator } from "@/data/operators";
import { useCollection } from "@/hooks/useCollection";
import { getReviews, getVendorOperators, saveReview } from "@/lib/localMarketplace";
import { useI18n } from "@/i18n/I18nContext";
import { Star, ShieldCheck, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TourOperators() {
  const { t } = useI18n();
  const { data: databaseOperators } = useCollection<Operator[]>("operators", fallbackOperators);
  const [reviewFor, setReviewFor] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);

  const operators = useMemo(() => {
    const merged = [...getVendorOperators(), ...databaseOperators].filter((operator) => operator.verified);
    return Array.from(new Map(merged.map((operator) => [operator.id, operator])).values());
  }, [databaseOperators, refresh]);

  return (
    <div className="container mx-auto py-12">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Operators</p>
        <h1 className="mt-2 font-display text-5xl font-bold">{t("operators_title")}</h1>
        <p className="mt-4 text-muted-foreground text-lg">{t("operators_intro")}</p>
      </header>

      <div className="mt-12 grid md:grid-cols-2 gap-5">
        {operators.map((o) => {
          const reviews = getReviews(o.id);
          return (
            <article key={o.id} className="p-6 rounded-2xl border border-border bg-card hover:shadow-soft transition-smooth">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-semibold">{o.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium mr-2">{o.type}</span>
                    {o.verified && <span className="inline-flex items-center gap-1 text-secondary"><ShieldCheck className="h-3 w-3" /> Verified</span>}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" /> {o.rating} <span className="text-muted-foreground/70">({o.reviews + reviews.length})</span></p>
              </div>
              <p className="text-sm text-muted-foreground mt-3">{o.speciality}</p>
              <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                {reviews.slice(0, 2).map((review) => (
                  <p key={`${review.createdAt}-${review.name}`}>"{review.comment}" - {review.name}</p>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={`tel:${o.phone.replace(/[^0-9]/g, "")}`} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-smooth"><Phone className="h-3.5 w-3.5" /> {o.phone}</a>
                <a href={`mailto:${o.email}`} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-muted/70 transition-smooth"><Mail className="h-3.5 w-3.5" /> Email</a>
                <Button size="sm" variant="outline" onClick={() => setReviewFor(o.id)}>Add review</Button>
              </div>
            </article>
          );
        })}
      </div>

      {reviewFor && (
        <div className="fixed inset-0 z-50 bg-foreground/45 p-4 flex items-center justify-center" onClick={() => setReviewFor(null)}>
          <form
            className="w-full max-w-md rounded-2xl bg-card border border-border shadow-elevated p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              saveReview({
                listingId: reviewFor,
                name: String(form.get("name")),
                rating: Number(form.get("rating")),
                comment: String(form.get("comment")),
                createdAt: new Date().toISOString(),
              });
              setRefresh((value) => value + 1);
              setReviewFor(null);
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
              <Button type="button" variant="ghost" onClick={() => setReviewFor(null)}>Cancel</Button>
              <Button type="submit" variant="hero">Save review</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input {...props} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 outline-none" />
    </label>
  );
}
