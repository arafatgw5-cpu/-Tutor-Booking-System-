"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  Sparkles,
} from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Learn from Expert Tutors",
    subtitle:
      "Personalized 1-on-1 sessions designed to match your learning goals and study style.",
    cta: "Find a Tutor",
    href: "/tutors",
    tag: "Top Rated",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85",
    accent: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    title: "Master Any Subject",
    subtitle:
      "Explore programming, science, languages, business, math, and hundreds of other topics.",
    cta: "Explore Subjects",
    href: "/tutors",
    tag: "500+ Subjects",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1400&q=85",
    accent: "from-violet-500 to-indigo-600",
  },
  {
    id: 3,
    title: "Flexible Learning Experience",
    subtitle:
      "Book sessions anytime from anywhere and learn comfortably at your own pace.",
    cta: "Book Session",
    href: "/tutors",
    tag: "Flexible Schedule",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85",
    accent: "from-emerald-500 to-teal-600",
  },
];

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const DURATION = 5000;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const goToSlide = (index) => {
    setCurrent(index);
    setProgress(0);
  };

  useEffect(() => {
    const start = performance.now();
    let frame;

    const animate = (time) => {
      const elapsed = time - start;
      const percentage = Math.min((elapsed / DURATION) * 100, 100);

      setProgress(percentage);

      if (elapsed < DURATION) {
        frame = requestAnimationFrame(animate);
      } else {
        nextSlide();
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [current, nextSlide]);

  return (
    <section className="relative h-[92vh] min-h-[650px] w-full overflow-hidden bg-black">
      
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === current
              ? "scale-105 opacity-100"
              : "scale-100 opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>
      ))}

      {/* Glow Effects */}
      <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-blue-500/20 blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-12">
        <div className="max-w-3xl">

          {/* Tag */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
            <Sparkles size={16} className="text-cyan-400" />

            <span className="text-sm font-semibold tracking-wide text-white">
              {slides[current].tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
            {slides[current].title}
          </h1>

          {/* Subtitle */}
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            {slides[current].subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href={slides[current].href}
              className={`group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r px-7 py-4 text-sm font-bold text-white shadow-2xl transition duration-300 hover:scale-105 ${slides[current].accent}`}
            >
              {slides[current].cta}

              <ChevronRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <button className="group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
                <Play size={15} fill="black" />
              </div>

              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap gap-10">
            <div>
              <h3 className="text-3xl font-black text-white">10K+</h3>
              <p className="text-sm text-slate-400">
                Active Students
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-white">500+</h3>
              <p className="text-sm text-slate-400">
                Expert Tutors
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1">
                <Star
                  size={18}
                  fill="gold"
                  className="text-yellow-400"
                />
                <h3 className="text-3xl font-black text-white">
                  4.9
                </h3>
              </div>

              <p className="text-sm text-slate-400">
                Student Rating
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 ${
              index === current
                ? "w-20 bg-white/20"
                : "w-8 bg-white/20 hover:bg-white/40"
            }`}
          >
            {index === current && (
              <div
                className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${slide.accent}`}
                style={{
                  width: `${progress}%`,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 right-8 z-20 hidden items-center gap-3 md:flex">
        <button
          onClick={prevSlide}
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/20"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/20"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute right-8 top-8 z-20 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-md">
        <span className="text-sm font-semibold tracking-widest text-white">
          0{current + 1} / 0{slides.length}
        </span>
      </div>

      {/* Side Thumbnails */}
      <div className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 xl:flex">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`overflow-hidden rounded-2xl border-2 transition duration-300 ${
              index === current
                ? "scale-105 border-white opacity-100"
                : "border-transparent opacity-50 hover:opacity-80"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-16 w-16 object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}