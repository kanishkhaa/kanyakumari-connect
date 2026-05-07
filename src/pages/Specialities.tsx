import { specialities } from "@/data/specialities";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Specialities() {
  return (
    <div className="bg-[#f5f1e8] text-[#242018]">
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b5e2b]">Explore</p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold leading-tight">
              Explore the Specialities of Kanyakumari
            </h1>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-[#5f594e] max-w-3xl">
            Discover Kanyakumari through its three seas, sacred shrines, Travancore heritage, Western Ghats, coastal food and handmade souvenirs. Each tile opens a chapter of the cape's living landscape.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {specialities.map((s, index) => (
            <Link
              key={s.id}
              to={`/specialities/${s.id}`}
              className={`group relative overflow-hidden rounded-none bg-black min-h-[360px] shadow-sm ${
                index === 0 || index === 4 ? "lg:col-span-2" : ""
              }`}
            >
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="mb-4 flex items-center justify-between">
                  <span className="bg-[#e5b85b] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#261b0a]">
                    {s.category}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold leading-tight">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/85">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
