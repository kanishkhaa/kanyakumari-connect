import { Link } from "react-router-dom";
import { Sun, Phone, Mail, MapPin } from "lucide-react";
import { emergencyContacts } from "@/data/food";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="container mx-auto py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-sunset">
              <Sun className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-xl font-bold">Kaniya.</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            One verified platform for everything Kanyakumari — discover, plan, stay and support local communities.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/places" className="hover:text-primary">Places</Link></li>
            <li><Link to="/itinerary" className="hover:text-primary">Itinerary Planner</Link></li>
            <li><Link to="/stays" className="hover:text-primary">Stays</Link></li>
            <li><Link to="/experiences" className="hover:text-primary">Local Experiences</Link></li>
            <li><Link to="/marketplace" className="hover:text-primary">Marketplace</Link></li>
            <li><Link to="/onboard" className="hover:text-primary">List your business</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3">Emergency</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {emergencyContacts.slice(0, 4).map((c) => (
              <li key={c.name} className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>{c.name}: <span className="text-foreground font-medium">{c.number}</span></span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3">Reach us</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> Beach Road, Kanyakumari, TN 629702</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@kaniya.travel</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kaniya — Made with care for Kanyakumari & its communities.
      </div>
    </footer>
  );
}
