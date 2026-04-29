import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const types = ["Homestay", "Hotel", "Tour Guide", "Restaurant", "Artisan", "Experience host"];

export default function Onboard() {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState(types[0]);

  if (submitted) {
    return (
      <div className="container mx-auto py-24 max-w-lg text-center">
        <div className="h-20 w-20 mx-auto rounded-full gradient-sunset flex items-center justify-center shadow-warm mb-6">
          <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="font-display text-4xl font-bold">Application received</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Our verification team will visit you within 7 days. Once verified, your listing goes live on Kaniya — completely free.
        </p>
        <Button variant="hero" className="mt-8" onClick={() => setSubmitted(false)}>Submit another</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4 max-w-3xl">
      <header className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Vendor onboarding</p>
        <h1 className="mt-2 font-display text-5xl font-bold">List your business on Kaniya</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Free to list, verified by our team, paid out directly to you. Built for the people of Kanyakumari.
        </p>
      </header>

      <form
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        className="mt-12 p-8 rounded-2xl bg-card border border-border shadow-soft space-y-6"
      >
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
              >{t}</button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Your name" placeholder="As per ID" required />
          <Field label="Business / Listing name" placeholder="e.g. Sea Breeze Homestay" required />
          <Field label="Village / Town" placeholder="e.g. Manakudy" required />
          <Field label="Mobile (WhatsApp)" placeholder="+91 9XXXX XXXXX" type="tel" required />
          <Field label="Email" placeholder="optional" type="email" />
          <Field label="Years of experience" placeholder="e.g. 5" type="number" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Tell travellers about yourself</label>
          <textarea
            rows={4}
            placeholder="Your story, what makes your offering unique, what guests can expect..."
            className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 text-sm">
          <input type="checkbox" required className="mt-1 accent-primary" />
          <p className="text-muted-foreground">I agree to a verification visit by the Kaniya team and to provide proof of identity, ownership or community endorsement.</p>
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full">
          Submit application <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}{props.required && <span className="text-primary">*</span>}</label>
      <input {...props} className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}
