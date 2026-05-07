import { Link } from "react-router-dom";
import { Sun, Phone, Mail, MapPin } from "lucide-react";
import { emergencyContacts } from "@/data/food";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="container mx-auto py-14 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-sunset">
              <Sun className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-xl font-bold">Kaniya.</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            One verified platform for everything Kanyakumari — discover, plan, stay and support local communities.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> Beach Road, Kanyakumari, TN 629702</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@kaniya.travel</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/places" className="hover:text-primary">Places</Link></li>
            <li><Link to="/itinerary" className="hover:text-primary">Itinerary planner</Link></li>
            <li><Link to="/stays" className="hover:text-primary">Stays</Link></li>
            <li><Link to="/experiences" className="hover:text-primary">Experiences</Link></li>
            <li><Link to="/food" className="hover:text-primary">Food & events</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold mb-3">Plan</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/travelcare" className="hover:text-primary">TravelCare</Link></li>
            <li><Link to="/hospitality" className="hover:text-primary">Hospitality services</Link></li>
            <li><Link to="/operators" className="hover:text-primary">Tour operators</Link></li>
            <li><Link to="/dtpc" className="hover:text-primary">DTPC centres</Link></li>
            <li><Link to="/ebrochures" className="hover:text-primary">eBrochures</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold mb-3">Discover</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/specialities" className="hover:text-primary">Specialities</Link></li>
            <li><Link to="/events" className="hover:text-primary">Events</Link></li>
            <li><Link to="/things-to-buy" className="hover:text-primary">Things to buy</Link></li>
            <li><Link to="/photo-gallery" className="hover:text-primary">Photo gallery</Link></li>
            <li><Link to="/video-gallery" className="hover:text-primary">Video gallery</Link></li>
            <li><Link to="/onboard" className="hover:text-primary">List your business</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border bg-background/40">
        <div className="container mx-auto py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Kaniya — Made with care for Kanyakumari & its communities.</p>
          <ul className="flex gap-4 text-xs text-muted-foreground">
            {emergencyContacts.slice(0, 3).map((c) => (
              <li key={c.name} className="flex items-center gap-1"><Phone className="h-3 w-3 text-primary" /> {c.name}: <span className="text-foreground">{c.number}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
