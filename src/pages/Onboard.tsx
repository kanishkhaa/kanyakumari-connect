import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveHostApplication, saveVendorOperator, saveVendorStay } from "@/lib/localMarketplace";
import { insertRow } from "@/lib/supabaseContent";
import type { Stay } from "@/data/stays";
import type { Operator } from "@/data/operators";

const types = ["Homestay", "Eco Lodge", "Hotel", "Tribal Stay", "Tour Operator"] as const;

export default function Onboard() {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState<(typeof types)[number]>(types[0]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const business = String(form.get("business"));
    const verified = Boolean(form.get("license") && form.get("idProof") && form.get("ownership"));
    const common = {
      id: business.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      name: business,
      verified,
    };

    saveHostApplication({
      id: `${Date.now()}`,
      owner: String(form.get("owner")),
      business,
      listingType: type,
      town: String(form.get("town")),
      phone: String(form.get("phone")),
      email: String(form.get("email") || "pending@kaniya.local"),
      description: String(form.get("description")),
      status: verified ? "approved" : "needs_review",
      submittedAt: new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date()).replace(",", ""),
      documents: {
        idProof: Boolean(form.get("idProof")),
        ownership: Boolean(form.get("ownership")),
        license: Boolean(form.get("license")),
      },
    });

    if (type === "Tour Operator") {
      const operator: Operator = {
        ...common,
        type: String(form.get("operatorType") || "General") as Operator["type"],
        rating: 4.6,
        reviews: 0,
        phone: String(form.get("phone")),
        email: String(form.get("email") || "pending@kaniya.local"),
        speciality: String(form.get("description")),
      };
      saveVendorOperator(operator);
      await insertRow("vendor_applications", { listing_type: "operator", payload: operator, status: operator.verified ? "approved" : "needs_review" });
    } else {
      const stay: Stay = {
        ...common,
        type,
        image: String(form.get("image") || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"),
        location: String(form.get("town")),
        pricePerNight: Number(form.get("price") || 1800),
        rating: 4.6,
        reviews: 0,
        amenities: String(form.get("amenities") || "").split(",").map((item) => item.trim()).filter(Boolean),
        description: String(form.get("description")),
      };
      saveVendorStay(stay);
      await insertRow("vendor_applications", { listing_type: "stay", payload: stay, status: stay.verified ? "approved" : "needs_review" });
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mx-auto py-24 max-w-lg text-center">
        <div className="h-20 w-20 mx-auto rounded-full gradient-sunset flex items-center justify-center shadow-warm mb-6">
          <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="font-display text-4xl font-bold">Application verified</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Listings with all verification checks now appear on Stays or Tour Operators. Missing documents are saved for review.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button variant="outline" onClick={() => setSubmitted(false)}>Submit another</Button>
          <Button asChild variant="hero"><Link to={type === "Tour Operator" ? "/operators" : "/stays"}>View listing</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4 max-w-3xl">
      <header className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Vendor onboarding</p>
        <h1 className="mt-2 font-display text-5xl font-bold">List your business on Kaniya</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Stays and tour operators go live only after required verification details are provided.
        </p>
      </header>

      <form onSubmit={submit} className="mt-12 p-8 rounded-2xl bg-card border border-border shadow-soft space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">What do you offer?</label>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                  type === t ? "gradient-sunset text-primary-foreground shadow-warm" : "bg-muted hover:bg-muted/70"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Field name="owner" label="Owner name" placeholder="As per ID" required />
          <Field name="business" label="Business / Listing name" placeholder="e.g. Sea Breeze Homestay" required />
          <Field name="town" label="Full address / town" placeholder="e.g. Beach Road, Kanyakumari" required />
          <Field name="phone" label="Mobile (WhatsApp)" placeholder="+91 9XXXX XXXXX" type="tel" required />
          <Field name="email" label="Email" placeholder="name@example.com" type="email" />
          {type === "Tour Operator" ? (
            <label className="block text-sm font-semibold">
              Operator category
              <select name="operatorType" className="mt-2 w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option>General</option>
                <option>Heritage</option>
                <option>Adventure</option>
                <option>Spiritual</option>
              </select>
            </label>
          ) : (
            <>
              <Field name="price" label="Price per night" placeholder="2500" type="number" required />
              <Field name="image" label="Image URL" placeholder="https://..." type="url" />
              <Field name="amenities" label="Amenities" placeholder="Sea view, AC, Breakfast" />
            </>
          )}
        </div>

        <label className="block text-sm font-semibold">
          Description / speciality
          <textarea
            name="description"
            rows={4}
            required
            placeholder="What travellers can expect, nearby attractions, inclusions and host story..."
            className="mt-2 w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </label>

        <div className="rounded-xl bg-muted/50 p-4">
          <div className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4 text-secondary" /> Verification checklist</div>
          <div className="mt-3 grid sm:grid-cols-3 gap-3 text-sm">
            <Check name="idProof" label="Government ID" />
            <Check name="ownership" label="Ownership / lease proof" />
            <Check name="license" label="Local licence / endorsement" />
          </div>
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full">
          Submit and verify <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm font-semibold">
      {label}{props.required && <span className="text-primary">*</span>}
      <input {...props} className="mt-2 w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}

function Check({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-center gap-2 rounded-lg border border-border bg-background p-3">
      <input name={name} type="checkbox" className="accent-primary" />
      {label}
    </label>
  );
}
