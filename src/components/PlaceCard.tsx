import { Link } from "react-router-dom";
import { Star, MapPin, Clock } from "lucide-react";
import type { Place } from "@/data/places";

export default function PlaceCard({ place }: { place: Place }) {
  return (
    <Link
      to={`/places/${place.id}`}
      className="group block overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-elevated transition-smooth"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-110 transition-smooth duration-700"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-background/90 backdrop-blur text-foreground">
          {place.category}
        </span>
        <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
          <Star className="h-3 w-3 fill-current" /> {place.rating}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-smooth">
          {place.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{place.tagline}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {place.duration}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {place.distance}</span>
        </div>
      </div>
    </Link>
  );
}
