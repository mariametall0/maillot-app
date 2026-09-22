"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const SHOWCASE_ITEMS = [
  {
    id: "maillot-real-2026",
    title: "Maillot Real Madrid 2025/2026",
    subtitle: "Collection Officielle Domicile",
    tag: "Top Vente",
    image: "/images/products/maillot_real.jpg",
    price: "3 500 MRU",
    oldPrice: "4 500 MRU",
    flocage: "Mbappé #9 • Vinicius #7",
    badgeColor: "bg-slate-900 text-white",
  },
  {
    id: "maillot-mauritanie-2026",
    title: "Maillot Mauritanie Officiel",
    subtitle: "Mourabitounes • Édition Nationale",
    tag: "Fierté Nationale",
    image: "/images/products/maillot_mauritanie.jpg",
    price: "3 200 MRU",
    oldPrice: "3 800 MRU",
    flocage: "Flocage Personnalisé Offert",
    badgeColor: "bg-emerald-900 text-emerald-100",
  },
  {
    id: "maillot-barca-2026",
    title: "Maillot FC Barcelone 2025/2026",
    subtitle: "Collection Officielle Domicile",
    tag: "Nouveauté",
    image: "/images/products/maillot_barca.jpg",
    price: "3 500 MRU",
    oldPrice: "4 200 MRU",
    flocage: "Lamine Yamal #19 • Raphinha #11",
    badgeColor: "bg-blue-950 text-blue-100",
  },
  {
    id: "crampons-mercurial-pro",
    title: "Nike Mercurial Superfly FG",
    subtitle: "Crampons Haute Performance Pro",
    tag: "Équipement Pro",
    image: "/images/products/crampons_pro.jpg",
    price: "4 500 MRU",
    oldPrice: "5 500 MRU",
    flocage: "Adhérence & Vitesse Élite",
    badgeColor: "bg-slate-900 text-white",
  },
];

export function HeroSportShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = SHOWCASE_ITEMS[currentIndex];

  return (
    <div
      className="relative w-full max-w-lg mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient background glow behind visual */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-slate-200 to-slate-100 rounded-3xl blur-2xl opacity-70 -z-10"></div>

      {/* Main Showcase Card */}
      <div className="relative bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-6 sm:p-7 overflow-hidden transition-all">
        {/* Top Header with Live Badge and Indicators */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">
              {current.tag}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {SHOWCASE_ITEMS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-7 bg-[#0A0F1D]"
                    : "w-2 bg-slate-200 hover:bg-slate-400"
                }`}
                title={`Maillot ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Image Container with smooth floating animation */}
        <div className="relative aspect-square w-full rounded-2xl bg-slate-50 flex items-center justify-center p-6 border border-slate-100 overflow-hidden group">
          {/* Subtle sport grid texture in card */}
          <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

          {/* Floating Product Image with hover scale */}
          <div className="relative w-full h-full flex items-center justify-center transition-all duration-700 ease-out transform group-hover:scale-105">
            <Image
              src={current.image}
              alt={current.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              priority
              className="object-contain drop-shadow-xl transition-all duration-500 animate-pop-in"
            />
          </div>

          {/* Floating Floating Badge 1: 100% Officiel */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-md flex items-center gap-1.5 animate-float-slow">
            <span className="text-xs">🏆</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">
              100% Officiel
            </span>
          </div>

          {/* Floating Badge 2: Flocage Express */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-md flex items-center gap-1.5 animate-float">
            <span className="text-xs">✍️</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">
              Flocage Pro
            </span>
          </div>
        </div>

        {/* Product Details & Action */}
        <div className="mt-5 space-y-3 text-left">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {current.subtitle}
            </p>
            <h3 className="text-lg sm:text-xl font-black text-[#0A0F1D] font-display leading-snug">
              {current.title}
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              ⭐ {current.flocage}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <span className="text-lg font-black text-[#0A0F1D]">
                {current.price}
              </span>
              <span className="text-xs font-semibold text-slate-600 line-through ml-2">
                {current.oldPrice}
              </span>
            </div>

            <Link
              href={`/produit/${current.id}`}
              className="inline-flex items-center gap-2 bg-[#0A0F1D] hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <span>Commander</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Thumbnail Selector bar */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-100">
          {SHOWCASE_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`p-1.5 rounded-xl border transition-all text-center flex flex-col items-center ${
                currentIndex === idx
                  ? "border-[#0A0F1D] bg-slate-50 shadow-xs"
                  : "border-slate-200 bg-white hover:border-slate-300 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="relative w-8 h-8">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <span className="text-[9px] font-black text-[#0A0F1D] uppercase truncate w-full mt-1">
                {item.id === "crampons-mercurial-pro"
                  ? "Crampons"
                  : item.title.replace("Maillot ", "").split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
