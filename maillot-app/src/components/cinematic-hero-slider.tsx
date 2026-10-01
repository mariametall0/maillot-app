"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const HERO_SLIDES = [
  {
    id: 1,
    badge: "🇲🇷 ÉDITION OFFICIELLE MOURABITOUNES",
    title: "PORTE HAUT\nLES COULEURS DE\nTON ÉQUIPE.",
    subtitle: "Maillots authentiques des Mourabitounes de Mauritanie et des plus grands clubs mondiaux avec flocage officiel sur-mesure.",
    image: "/images/hero_mauritanie_champions.jpg",
    primaryLink: "/catalogue?category=MAILLOT",
    primaryLabel: "COMMANDER LE MAILLOT",
    secondaryLink: "/catalogue",
    secondaryLabel: "VOIR LA BOUTIQUE",
  },
  {
    id: 2,
    badge: "⭐ NOUVELLE SAISON 2025/2026",
    title: "TON MAILLOT.\nTON NOM.\nTON HISTOIRE.",
    subtitle: "Les maillots des plus grandes stars mondiales avec flocage nom + numéro personnalisé et livraison express toute la Mauritanie.",
    image: "/images/hero_star_players.jpg",
    primaryLink: "/catalogue?category=MAILLOT",
    primaryLabel: "MAILLOTS CLUBS",
    secondaryLink: "/catalogue?flocage=true",
    secondaryLabel: "FLOCAGE SUR-MESURE",
  },
  {
    id: 3,
    badge: "⚡ PERFORMANCE & MATCH PRO",
    title: "JOUE AVEC\nLES MEILLEURS\nÉQUIPEMENTS.",
    subtitle: "Crampons pro, ballons officiels de compétition et gants de gardien pour faire la différence sur le terrain.",
    image: "/images/hero_players_action.jpg",
    primaryLink: "/catalogue?category=EQUIPEMENT",
    primaryLabel: "DÉCOUVRIR LES ÉQUIPEMENTS",
    secondaryLink: "/catalogue?subtype=CHAUSSURES",
    secondaryLabel: "CRAMPONS PRO",
  },
];

export function CinematicHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = HERO_SLIDES[current];

  return (
    <section
      className="relative w-full min-h-[640px] sm:min-h-[760px] lg:min-h-[850px] flex items-end justify-start bg-black text-white overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Slow Cinematic Ken-Burns Zoom & Fade */}
      {HERO_SLIDES.map((item, idx) => {
        const isActive = idx === current;
        return (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-0" : "opacity-0 pointer-events-none -z-10"
            }`}
          >
            <div
              className={`relative w-full h-full transform transition-transform ease-out ${
                isActive ? "scale-108 duration-[9000ms]" : "scale-100 duration-1000"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={idx === 0}
                className="object-cover object-center brightness-[0.78] contrast-[1.08]"
                sizes="100vw"
              />
            </div>

            {/* Cinematic Gradient Overlays for maximum contrast & punch */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
            
            {/* Top Atmospheric Radial Glow */}
            <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
          </div>
        );
      })}

      {/* Floating Top-Right Animated Live Badge */}
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-20 hidden md:flex items-center gap-3 bg-black/50 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-2xl animate-fade-in">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
        </span>
        <span className="text-xs font-black uppercase tracking-wider text-white">
          Stock Officiel Disponible • Mauritanie
        </span>
      </div>

      {/* Main Content Overlay with Staggered Animations */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-16 sm:pb-24 pt-32">
        <div key={current} className="max-w-2xl text-left space-y-6 animate-pop-in">
          {/* Animated Category Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white text-[11px] sm:text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-xl transition-all">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>{slide.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase font-display leading-[0.94] text-white whitespace-pre-line drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-200 font-medium leading-relaxed max-w-xl drop-shadow-md">
            {slide.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-wrap gap-4 items-center">
            <Link
              href={slide.primaryLink}
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm px-8 py-4 tracking-widest uppercase rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.45)] transition-all transform hover:-translate-y-1 active:scale-95 border border-blue-400/40"
            >
              <span>{slide.primaryLabel}</span>
              <span className="text-base transition-transform group-hover:translate-x-1 font-bold">→</span>
            </Link>
            <Link
              href={slide.secondaryLink}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-bold text-xs sm:text-sm px-7 py-4 tracking-wider uppercase rounded-2xl transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg"
            >
              <span>{slide.secondaryLabel}</span>
            </Link>
          </div>
        </div>

        {/* Bottom Right Slider Progress Controls */}
        <div className="absolute right-6 sm:right-10 bottom-8 sm:bottom-12 flex items-center gap-3 z-20">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 shadow-xl">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  current === idx ? "w-8 bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.9)]" : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
                title={`Slide ${idx + 1}`}
              />
            ))}
            <span className="text-[11px] font-black text-slate-300 ml-2 font-display">
              0{current + 1} / 0{HERO_SLIDES.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 hover:text-white text-white flex items-center justify-center text-sm backdrop-blur-md transition-all border border-white/15 shadow-lg"
              title="Précédent"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 hover:text-white text-white flex items-center justify-center text-sm backdrop-blur-md transition-all border border-white/15 shadow-lg"
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
