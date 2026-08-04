import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock, ExternalLink, MapPin, Users } from "lucide-react";
import { experiences } from "@/data/experiences";
import { Button } from "@/components/ui/button";

const today = new Date().toISOString().slice(0, 10);

export default function ExperienceDetail() {
  const { id } = useParams();
  const experience = experiences.find((item) => item.id === id);
  const [guests, setGuests] = useState(1);
  const maxGuests = useMemo(() => Number(experience?.groupSize.match(/(\d+)\s*people$/)?.[1] ?? 12), [experience]);

  if (!experience) {
    return <div className="container mx-auto py-20 text-center"><h1 className="font-display text-3xl">Experience not found</h1><Button asChild variant="ghost" className="mt-4"><Link to="/experiences">All experiences</Link></Button></div>;
  }

  const total = experience.price * guests;

  const submitBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.assign(experience.bookingUrl);
  };

  return (
    <div className="container mx-auto py-10 md:py-12">
      <Button asChild variant="ghost" size="sm"><Link to="/experiences"><ArrowLeft className="h-4 w-4" /> All experiences</Link></Button>
      <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,.9fr)]">
        <section>
          <img src={experience.image} alt={experience.title} className="aspect-[16/10] w-full rounded-2xl object-cover shadow-elevated" />
          <p className="mt-7 text-sm font-semibold uppercase tracking-wider text-primary">{experience.category}</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">{experience.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">Hosted by {experience.host}</p>
          <p className="mt-6 text-[17px] leading-relaxed text-muted-foreground">{experience.description}</p>
          <dl className="mt-7 grid gap-3 sm:grid-cols-3">
            <Fact icon={Clock} label="Duration" value={experience.duration} />
            <Fact icon={Users} label="Group size" value={experience.groupSize} />
            <Fact icon={MapPin} label="Area" value="Kanyakumari district" />
          </dl>
          {experience.details?.map((detail) => (
            <section key={detail.heading} className="mt-8 rounded-2xl border border-border bg-muted/40 p-6">
              <h2 className="font-display text-2xl font-bold">{detail.heading}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {detail.items.map((item) => <li key={item} className="flex gap-3"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />{item}</li>)}
              </ul>
            </section>
          ))}
        </section>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-20">
          <form onSubmit={submitBooking} className="space-y-5">
            <div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Continue to booking</p><p className="mt-1 text-sm text-muted-foreground">Tell us your plans, then continue to {experience.bookingProvider} to complete the booking.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="date" label="Experience date" type="date" min={today} required />
              <label className="block text-sm font-semibold">Guests<input name="guests" type="number" min="1" max={maxGuests} value={guests} onChange={(event) => setGuests(Math.min(maxGuests, Math.max(1, Number(event.target.value) || 1)))} required className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 font-normal outline-none" /></label>
              <Field name="name" label="Full name" autoComplete="name" required />
              <Field name="phone" label="Mobile number" type="tel" autoComplete="tel" required />
            </div>
            <Field name="email" label="Email" type="email" autoComplete="email" required />
            <label className="block text-sm font-semibold">Preferred start time<select name="time" required className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 font-normal outline-none"><option value="Morning">Morning</option><option value="Afternoon">Afternoon</option><option value="Evening">Evening</option></select></label>
            <label className="block text-sm font-semibold">Notes <span className="font-normal text-muted-foreground">(optional)</span><textarea name="notes" rows={3} placeholder="Accessibility needs, dietary requirements, or anything the provider should know" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 font-normal outline-none" /></label>
            <div className="rounded-xl bg-muted/50 p-4 text-sm"><div className="flex items-center justify-between font-semibold"><span>Local estimate</span><span>₹{total.toLocaleString()}</span></div><p className="mt-1 text-muted-foreground">{experience.bookingNote} Final price and availability are set by the provider.</p></div>
            <Button type="submit" variant="hero" className="w-full"><CalendarDays className="h-4 w-4" /> Continue to {experience.bookingProvider} <ExternalLink className="h-3.5 w-3.5" /></Button>
          </form>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <label className="block text-sm font-semibold">{label}<input {...props} className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 font-normal outline-none" /></label>;
}

function Fact({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return <div className="rounded-xl bg-muted/50 p-4"><Icon className="h-4 w-4 text-primary" /><dt className="mt-2 text-xs text-muted-foreground">{label}</dt><dd className="text-sm font-semibold">{value}</dd></div>;
}
