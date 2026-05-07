import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, MapPin } from "lucide-react";
import { specialities } from "@/data/specialities";

export default function SpecialityDetail() {
  const { id } = useParams();
  const speciality = specialities.find((s) => s.id === id);

  if (!speciality) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Speciality not found</h1>
        <Link to="/specialities" className="mt-4 inline-flex items-center gap-2 text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to specialities
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-[#f5f1e8] text-[#242018]">
      <section className="relative min-h-[520px] overflow-hidden">
        <img src={speciality.image} alt={speciality.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="relative container mx-auto flex min-h-[520px] flex-col justify-end px-4 pb-12 text-white">
          <Link to="/specialities" className="mb-6 inline-flex w-fit items-center gap-2 bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
            <ArrowLeft className="h-4 w-4" /> Specialities
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#e5b85b]">{speciality.category}</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl">{speciality.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/85">{speciality.intro}</p>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-14 lg:grid-cols-[280px_1fr]">
        <aside>
          <div className="sticky top-24 border-l-4 border-[#1f5f3b] bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b5e2b]">Highlights</p>
            <ul className="mt-4 space-y-3">
              {speciality.highlights.map((h) => (
                <li key={h} className="text-sm font-semibold text-[#3f382e]">{h}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-6">
            {speciality.sections.map((section) => (
              <section key={section.title} className="bg-white p-6 shadow-sm">
                <h2 className="font-display text-2xl font-bold">{section.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#655f55]">{section.description}</p>
                <ul className="mt-5 grid gap-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span className="h-2 w-2 bg-[#d9a441]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8b5e2b]">Packages</p>
                <h2 className="mt-2 font-display text-3xl font-bold">Suggested experiences</h2>
              </div>
              <Link to="/itinerary" className="hidden items-center gap-2 text-sm font-bold text-[#1f5f3b] md:inline-flex">
                Plan with this <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid md:grid-cols-2 gap-5">
              {speciality.packages.map((pkg) => (
                <article key={pkg.title} className="border border-[#ded3bd] bg-white p-6 shadow-sm">
                  <h3 className="font-display text-xl font-bold">{pkg.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider text-[#655f55]">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-[#1f5f3b]" /> {pkg.location}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#1f5f3b]" /> {pkg.duration}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#655f55]">{pkg.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </article>
  );
}
