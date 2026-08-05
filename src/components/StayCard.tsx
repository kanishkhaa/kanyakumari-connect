import type { Stay } from "@/data/stays";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  BedDouble,
  ExternalLink,
  MapPin,
  Phone,
  Star,
  TrainFront,
  Waves,
} from "lucide-react";

type StayCardProps = {
  stay: Stay;
  reviewCount?: number;
  onReview: () => void;
  onEnquire: () => void;
};

export function StayCard({
  stay,
  reviewCount = 0,
  onReview,
  onEnquire,
}: StayCardProps) {
  const totalReviews = stay.reviews + reviewCount;

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:shadow-xl">
      <div className="grid sm:grid-cols-[40%_1fr]">
        {/* Hotel Image */}
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
          <img
            src={stay.image}
            alt={stay.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {stay.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Featured
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col p-6">

          {/* Type */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-secondary/10 px-2 py-0.5 font-medium text-secondary">
              {stay.type}
            </span>

            {stay.verified && (
              <span className="inline-flex items-center gap-1 text-secondary">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified
              </span>
            )}
          </div>

          {/* Name */}
          <h2 className="mt-2 font-display text-xl font-semibold">
            {stay.name}
          </h2>

          {/* Location */}
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {stay.location}
          </p>

          {/* Description */}
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
            {stay.description}
          </p>

          {/* Info */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">

            {stay.roomType && (
              <span className="inline-flex items-center gap-1">
                <BedDouble className="h-3.5 w-3.5 text-primary" />
                {stay.roomType}
              </span>
            )}

            {stay.distanceFromBeach && (
              <span className="inline-flex items-center gap-1">
                <Waves className="h-3.5 w-3.5 text-primary" />
                {stay.distanceFromBeach} from beach
              </span>
            )}

            {stay.distanceFromStation && (
              <span className="inline-flex items-center gap-1">
                <TrainFront className="h-3.5 w-3.5 text-primary" />
                {stay.distanceFromStation} from station
              </span>
            )}
          </div>

          {/* Amenities */}
          <div className="mt-3 flex flex-wrap gap-2">
            {stay.amenities.slice(0, 6).map((amenity) => (
              <span
                key={amenity}
                className="rounded-full bg-muted px-2 py-1 text-[11px]"
              >
                {amenity}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="mt-5 border-t border-border pt-4">
            <p className="font-display text-2xl font-bold">
              ₹{stay.pricePerNight.toLocaleString()}
              <span className="text-xs font-normal text-muted-foreground">
                {" "}
                / night
              </span>
            </p>

            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              {stay.rating.toFixed(1)} • {totalReviews} reviews
            </p>
          </div>

          {/* All Buttons */}
        {/* All Buttons */}
<div className="mt-5 border-t border-border pt-4">
  <div className="flex flex-wrap items-center gap-2">

    {stay.mapLink && (
      <Button asChild variant="outline" size="sm">
        <a href={stay.mapLink} target="_blank" rel="noreferrer">
          <MapPin className="h-4 w-4 mr-1" />
          Maps
        </a>
      </Button>
    )}

    {stay.website && (
      <Button asChild variant="outline" size="sm">
        <a href={stay.website} target="_blank" rel="noreferrer">
          <ExternalLink className="h-4 w-4 mr-1" />
          Website
        </a>
      </Button>
    )}

    {stay.phone && (
      <Button asChild variant="outline" size="sm">
        <a href={`tel:${stay.phone}`}>
          <Phone className="h-4 w-4 mr-1" />
          Call
        </a>
      </Button>
    )}

    <Button
      variant="outline"
      size="sm"
      onClick={onReview}
    >
      Review
    </Button>

    <Button
      variant="hero"
      size="sm"
      onClick={onEnquire}
    >
      Enquire
    </Button>

    {stay.bookingLink && (
      <Button asChild variant="hero" size="sm">
        <a href={stay.bookingLink} target="_blank" rel="noreferrer">
          <ExternalLink className="h-4 w-4 mr-1" />
          Book Now
        </a>
      </Button>
    )}

  </div>
</div>
        </div>
      </div>
    </article>
  );
}