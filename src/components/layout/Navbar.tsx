import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/places", label: "Places" },
  { to: "/itinerary", label: "Plan Trip" },
  { to: "/stays", label: "Stays" },
  { to: "/experiences", label: "Experiences" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/food", label: "Food & Events" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-full gradient-sunset shadow-warm group-hover:scale-110 transition-smooth">
            <Sun className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-2xl font-bold">
            Kaniya<span className="text-primary">.</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-smooth",
                  isActive ? "text-primary" : "text-foreground/70 hover:text-foreground hover:bg-muted",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto py-3 flex flex-col">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-3 rounded-md text-sm font-medium",
                    isActive ? "text-primary bg-muted" : "text-foreground/80",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
