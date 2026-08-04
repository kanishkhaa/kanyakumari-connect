import type { Stay } from "@/data/stays";
import { Button } from "@/components/ui/button";
import { BadgeCheck, BedDouble, ExternalLink, MapPin, Phone, Star, TrainFront, Waves } from "lucide-react";

type StayCardProps = {
  stay: Stay;
  reviewCount?: number;
  onReview: () => void;
  onViewReviews: () => void;
  onEnquire: () => void;
};

export function StayCard({ stay, reviewCount = 0, onReview, onViewReviews, onEnquire }: StayCardProps) {
  const totalReviews = stay.reviews + reviewCount;

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-smooth hover:shadow-elevated">
      <div className="grid sm:grid-cols-[38%_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
          <img src={stay.image} alt={stay.name} loading="lazy" className="h-full w-full object-cover transition-smooth duration-700 group-hover:scale-105" />
          {stay.featured && <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">Featured</span>}
        </div>

        <div className="flex min-w-0 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-secondary/10 px-2 py-0.5 font-medium text-secondary">{stay.type}</span>
            {stay.verified && <span className="inline-flex items-center gap-1 text-secondary"><BadgeCheck className="h-3.5 w-3.5" /> Verified</span>}
          </div>

          <h2 className="mt-2 font-display text-xl font-semibold">{stay.name}</h2>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{stay.location}</p>
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{stay.description}</p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            {stay.roomType && <span className="inline-flex items-center gap-1"><BedDouble className="h-3.5 w-3.5 text-primary" />{stay.roomType}</span>}
            {stay.distanceFromBeach && <span className="inline-flex items-center gap-1"><Waves className="h-3.5 w-3.5 text-primary" />{stay.distanceFromBeach} from beach</span>}
            {stay.distanceFromStation && <span className="inline-flex items-center gap-1"><TrainFront className="h-3.5 w-3.5 text-primary" />{stay.distanceFromStation} from station</span>}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {stay.amenities.slice(0, 4).map((amenity) => <span key={amenity} className="rounded-full bg-muted px-2 py-0.5 text-[11px]">{amenity}</span>)}
          </div>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-border pt-4">
            <div>
              <p className="font-display text-2xl font-bold">₹{stay.pricePerNight.toLocaleString()}<span className="text-xs font-normal text-muted-foreground"> / night</span></p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3.5 w-3.5 fill-accent text-accent" />{stay.rating.toFixed(1)} · {totalReviews} reviews</p>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button variant="outline" size="sm" onClick={onViewReviews}>View reviews</Button>
              <Button variant="outline" size="sm" onClick={onReview}>Write a review</Button>
              <Button variant="hero" size="sm" onClick={onEnquire}>Enquire</Button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {stay.mapLink && <Button asChild variant="outline" size="sm"><a href={stay.mapLink} target="_blank" rel="noreferrer"><MapPin className="h-3.5 w-3.5" />Maps</a></Button>}
            {stay.website && <Button asChild variant="outline" size="sm"><a href={stay.website} target="_blank" rel="noreferrer"><ExternalLink className="h-3.5 w-3.5" />Website</a></Button>}
            {stay.phone && <Button asChild variant="outline" size="sm"><a href={`tel:${stay.phone}`}><Phone className="h-3.5 w-3.5" />Call</a></Button>}
            {stay.bookingLink && <Button asChild size="sm" variant="hero"><a href={stay.bookingLink} target="_blank" rel="noreferrer"><ExternalLink className="h-3.5 w-3.5" />Book now</a></Button>}
          </div>
        </div>
      </div>
    </article>
  );
}
