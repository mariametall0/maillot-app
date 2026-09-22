"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const HERO_SLIDES = [
  {
    id: 1,
    badge: "NOUVELLE COLLECTION 2025/2026",
    title: "TON MAILLOT.\nTON NOM.\nTON HISTOIRE.",
    subtitle: "Maillots officiels de grands clubs, crampons haute performance et flocage personnalisé avec livraison express partout en Mauritanie.",
    image: "/images/hero_sports_jersey.jpg",
    primaryLink: "/catalogue",
    primaryLabel: "SHOP NOW",
    secondaryLink: "/catalogue?category=MAILLOT",
    secondaryLabel: "MAILLOTS CLUBS",
  },
  {
    id: 2,
    badge: "COLLECTIONS ÉQUIPEMENTS & MATCH",
    title: "JOUE AVEC\nLES MEILLEURS\nÉQUIPEMENTS.",
    subtitle: "Crampons Nike & Adidas Pro, ballons officiels de compétition et gants de gardien pour dominer chaque match.",
    image: "/images/grid_equipements_sport.jpg",
    primaryLink: "/catalogue?category=EQUIPEMENT",
    primaryLabel: "DÉCOUVRIR LES ÉQUIPEMENTS",
    secondaryLink: "/catalogue?subtype=CHAUSSURES",
    secondaryLabel: "CRAMPONS PRO",
  },
  {
    id: 3,
    badge: "ÉDITIONS NATIONALES & COLLECTORS",
    title: "PORTE HAUT\nLES COULEURS DE\nTON ÉQUIPE.",
    subtitle: "Maillots authentiques des Mourabitounes de Mauritanie et des plus grandes nations du football mondial.",
    image: "/images/grid_maillots_nationaux.jpg",
    primaryLink: "/catalogue?category=MAILLOT",
    primaryLabel: "VOIR LES SÉLECTIONS",
    secondaryLink: "/catalogue?flocage=true",
    secondaryLabel: "FLOCAGE SUR-MESURE",
  },
];

export function CinematicHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = HERO_SLIDES[current];

  return (
    <section
      className="relative w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex items-end justify-start bg-black text-white overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Cross-Fade */}
      {HERO_SLIDES.map((item, idx) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "1000ms" }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority={idx === 0}
            className="object-cover object-center brightness-75"
            sizes="100vw"
          />
          {/* Cinematic Dark Gradient Overlays (bottom & left shadow for perfect text readability) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-16 sm:pb-20 pt-32">
        <div className="max-w-2xl text-left space-y-6 animate-pop-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{slide.badge}</span>
          </div>

          {/* Big Bold Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase font-display leading-[0.95] text-white whitespace-pre-line drop-shadow-2xl">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-200 font-medium leading-relaxed max-w-xl drop-shadow-md">
            {slide.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <Link
              href={slide.primaryLink}
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm px-8 py-4 tracking-widest uppercase rounded-xl shadow-2xl transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>{slide.primaryLabel}</span>
              <span className="text-base transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href={slide.secondaryLink}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-bold text-xs sm:text-sm px-7 py-4 tracking-wider uppercase rounded-xl transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>{slide.secondaryLabel}</span>
            </Link>
          </div>
        </div>

        {/* Bottom Right Slider Progress Controls (Like STACK design) */}
        <div className="absolute right-6 sm:right-10 bottom-8 sm:bottom-12 flex items-center gap-3 z-20">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrent(idx)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  current === idx ? "w-8 bg-red-500" : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
                title={`Slide ${idx + 1}`}
              />
            ))}
            <span className="text-[11px] font-bold text-slate-300 ml-2">
              0{current + 1} / 0{HERO_SLIDES.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center text-xs backdrop-blur-md transition-all border border-white/10"
              title="Précédent"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center text-xs backdrop-blur-md transition-all border border-white/10"
              title="Suivant"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
