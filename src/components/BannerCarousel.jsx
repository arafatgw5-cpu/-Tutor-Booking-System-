"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image"; // Next.js Image Component
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Star, Sparkles } from "lucide-react";

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
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(0);
  const lastTimeRef = useRef(0);

  const DURATION = 5000;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
    progressRef.current = 0;
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
    progressRef.current = 0;
  };

  const goToSlide = (index) => {
    setCurrent(index);
    setProgress(0);
    progressRef.current = 0;
  };

  useEffect(() => {
    let frameId;

    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!isPaused) {
        progressRef.current += deltaTime;
        const percentage = Math.min((progressRef.current / DURATION) * 100, 100);
        setProgress(percentage);

        if (progressRef.current >= DURATION) {
          nextSlide();
        }
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      lastTimeRef.current = 0;
    };
  }, [isPaused, nextSlide]);

  return (
    <section 
      className="relative h-[92vh] min-h-[650px] w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images - Fully Optimized */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current
              ? "scale-105 opacity-100 z-0"
              : "scale-100 opacity-0 -z-10"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="100vw"
            priority={index === 0} // First image loads instantly
            className="object-cover"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>
      ))}

      {/* Glow Effects */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-blue-500/20 blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-12">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Tag */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
              >
                <Sparkles size={16} className="text-cyan-400" />
                <span className="text-sm font-semibold tracking-wide text-white">
                  {slides[current].tag}
                </span>
              </motion.div>

              {/* Title */}
              <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl drop-shadow-lg">
                {slides[current].title}
              </h1>

              {/* Subtitle */}
              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl drop-shadow-md">
                {slides[current].subtitle}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-5">
                <Link
                  href={slides[current].href}
                  className={`group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r px-8 py-4 text-sm font-bold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/25 ${slides[current].accent}`}
                >
                  {slides[current].cta}
                  <ChevronRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <button className="group inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-110">
                    <Play size={14} fill="black" className="ml-1" />
                  </div>
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap gap-12 border-t border-white/10 pt-8">
            <div>
              <h3 className="text-3xl font-black text-white">10K+</h3>
              <p className="text-sm font-medium text-slate-400">Active Students</p>
            </div>
            <div>
              <h3 className="text-3xl font-black text-white">500+</h3>
              <p className="text-sm font-medium text-slate-400">Expert Tutors</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Star size={20} fill="currentColor" className="text-yellow-400" />
                <h3 className="text-3xl font-black text-white">4.9</h3>
              </div>
              <p className="text-sm font-medium text-slate-400">Student Rating</p>
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
            aria-label={`Go to slide ${index + 1}`}
            className={`relative h-2 overflow-hidden rounded-full transition-all duration-500 ease-in-out ${
              index === current
                ? "w-24 bg-white/20"
                : "w-8 bg-white/20 hover:bg-white/40"
            }`}
          >
            {index === current && (
              <div
                className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${slide.accent}`}
                style={{
                  width: `${progress}%`,
                  transition: isPaused ? "none" : "width 0.1s linear",
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 z-20 hidden items-center gap-4 md:flex">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-lg"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute right-8 top-8 z-20 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md shadow-lg">
        <span className="text-sm font-bold tracking-widest text-white/90">
          0{current + 1} <span className="text-white/40">/</span> 0{slides.length}
        </span>
      </div>

      {/* Side Thumbnails - Fully Optimized */}
      <div className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 xl:flex">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            aria-label={`Show slide ${index + 1}`}
            className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
              index === current
                ? "scale-110 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                : "border-transparent opacity-50 hover:opacity-100 hover:scale-105"
            }`}
          >
            <div className="relative h-16 w-16">
              <Image
                src={slide.image}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {index !== current && (
              <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/10" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}