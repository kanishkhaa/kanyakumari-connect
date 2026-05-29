import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import beachImg from "@/assets/place-capecomorin.jpg";
import natureImg from "@/assets/region-hills.jpg";
import spiritualImg from "@/assets/place-kumariammantemple.jpg";
import heritageImg from "@/assets/place-padmanabhapurampalace.jpg";

const slides = [
  {
    key: "spiritual",
    eyebrow: "Spiritual",
    title: "Where the goddess watches the sea",
    body: "From Bhagavathy Amman's seaside shrine to the meditation rock of Vivekananda — Kanyakumari is a land where stone, ocean and devotion meet.",
    image: spiritualImg,
    cta: { label: "Sacred places", to: "/places" },
  },
  {
    key: "beach",
    eyebrow: "Beaches",
    title: "Watch the same ocean rise and set",
    body: "Stand on the only shore in India where you can see sunrise and sunset over the sea — and three water bodies meet in tri-coloured sand.",
    image: beachImg,
    cta: { label: "Explore the coast", to: "/places" },
  },
  {
    key: "heritage",
    eyebrow: "Heritage",
    title: "Carved in teak, told in stone",
    body: "The wooden palaces of Travancore, granite forts on the cliffs, and aqueducts through the hills — centuries of craft await.",
    image: heritageImg,
    cta: { label: "Heritage trail", to: "/places" },
  },
  {
    key: "nature",
    eyebrow: "Nature",
    title: "Forests of the Western Ghats",
    body: "Drive an hour inland and the air cools, the canopy closes in. Waterfalls, tribal villages and silent forests at the southern tip of India.",
    image: natureImg,
    cta: { label: "Wild Kanyakumari", to: "/places" },
  },
];

export default function CinematicHero() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [playing]);

  const slide = slides[idx];

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Slides */}
      {slides.map((s, i) => (
        <img
          key={s.key}
          src={s.image}
          alt={s.title}
          width={1920}
          height={1080}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === idx ? "opacity-100 scale-105" : "opacity-0"
          }`}
          style={{ transition: "opacity 1.2s ease, transform 8s ease" }}
        />
      ))}
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/40 via-transparent to-ocean-deep/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/70 via-ocean-deep/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 container mx-auto flex flex-col justify-end pb-44 md:pb-52">
        <div key={slide.key} className="max-w-2xl text-background animate-fade-in-up">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-background/15 backdrop-blur border border-background/30">
            {slide.eyebrow}
          </span>
          <h1 className="mt-5 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] drop-shadow-lg">
            {slide.title}
          </h1>
          <p className="mt-5 text-base md:text-lg text-background/85 max-w-xl leading-relaxed drop-shadow">
            {slide.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to={slide.cta.to}>{slide.cta.label} <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-background/10 backdrop-blur border-background/40 text-background hover:bg-background/20 hover:text-background">
              <Link to="/itinerary">Plan my trip</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-24 right-6 md:bottom-28 md:right-10 flex items-center gap-2 z-10">
        <button
          aria-label="Previous"
          onClick={() => setIdx((i) => (i - 1 + slides.length) % slides.length)}
          className="h-10 w-10 rounded-full bg-background/15 backdrop-blur border border-background/30 text-background hover:bg-background/25 transition-smooth flex items-center justify-center"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((p) => !p)}
          className="h-10 w-10 rounded-full bg-background/15 backdrop-blur border border-background/30 text-background hover:bg-background/25 transition-smooth flex items-center justify-center"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          aria-label="Next"
          onClick={() => setIdx((i) => (i + 1) % slides.length)}
          className="h-10 w-10 rounded-full bg-background/15 backdrop-blur border border-background/30 text-background hover:bg-background/25 transition-smooth flex items-center justify-center"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="absolute bottom-24 md:bottom-28 left-4 right-28 md:left-auto md:right-44 md:w-auto z-10 flex gap-1 overflow-x-auto p-1 rounded-full bg-background/15 backdrop-blur border border-background/30">
        {slides.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setIdx(i)}
            className={`flex-shrink-0 px-3 md:px-4 py-1.5 rounded-full text-xs font-medium transition-smooth ${
              i === idx ? "bg-background text-foreground" : "text-background hover:bg-background/15"
            }`}
          >
            {s.eyebrow}
          </button>
        ))}
      </div>
    </section>
  );
}
