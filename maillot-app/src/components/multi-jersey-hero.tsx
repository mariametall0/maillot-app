"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const JERSEYS = [
  {
    id: "maillot-mauritanie-2026",
    name: "Mauritanie Mourabitounes",
    sub: "Édition Nationale Officielle",
    tag: "🇲🇷 Fierté RIM",
    price: "3 200 MRU",
    image: "/images/products/maillot_mauritanie.jpg",
    position: "left",
    rotation: "-rotate-6 sm:-rotate-12",
    translate: "-translate-x-12 sm:-translate-x-16 hover:-translate-y-4",
    zIndex: 10,
    accent: "border-emerald-500/40 bg-emerald-50/10",
  },
  {
    id: "maillot-real-2026",
    name: "Real Madrid 2025/2026",
    sub: "Domicile • Mbappé #9",
    tag: "🔥 Top Vente",
    price: "3 500 MRU",
    image: "/images/products/maillot_real.jpg",
    position: "center",
    rotation: "rotate-0",
    translate: "translate-y-0 scale-105 sm:scale-110",
    zIndex: 30,
    accent: "border-slate-400/50 bg-white shadow-2xl ring-2 ring-slate-900/10",
  },
  {
    id: "maillot-barca-2026",
    name: "FC Barcelone 2025/2026",
    sub: "Domicile • Yamal #19",
    tag: "⚡ Nouveau",
    price: "3 500 MRU",
    image: "/images/products/maillot_barca.jpg",
    position: "right",
    rotation: "rotate-6 sm:rotate-12",
    translate: "translate-x-12 sm:translate-x-16 hover:-translate-y-4",
    zIndex: 10,
    accent: "border-blue-500/40 bg-blue-50/10",
  },
];

export function MultiJerseyHero() {
  const [activeJersey, setActiveJersey] = useState<string>("maillot-real-2026");

  return (
    <section className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[720px] flex items-center justify-center py-12 sm:py-16 px-4 sm:px-8 bg-gradient-to-b from-slate-100/90 via-slate-50 to-white border-b border-slate-200 overflow-hidden select-none">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-300/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Left Column: Bold Titles & CTA */}
        <div className="lg:col-span-6 text-left space-y-6 animate-pop-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white border border-slate-300 text-slate-900 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span>BOUTIQUE OFFICIELLE • NOUVELLE COLLECTION 2025/2026</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase font-display leading-[0.98] text-[#0A0F1D]">
            TON MAILLOT. <br />
            <span className="text-slate-700">TON NOM.</span> <br />
            TON HISTOIRE.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed font-sans max-w-xl">
            Tous les maillots officiels des plus grands clubs et sélections, disponibles avec flocage officiel sur-mesure et livraison express partout en Mauritanie.
          </p>

          {/* Actions: Clean Black Primary + Refined White Secondary */}
          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-3 bg-[#0A0F1D] text-white hover:bg-black font-extrabold text-sm px-8 py-4 tracking-wider uppercase rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>DÉCOUVRIR LA BOUTIQUE</span>
              <span className="text-base transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/catalogue?category=MAILLOT"
              className="inline-flex items-center gap-2 bg-white text-[#0A0F1D] border border-slate-300 hover:border-slate-400 font-bold text-sm px-7 py-4 tracking-wider uppercase rounded-2xl hover:bg-slate-50 transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-xs"
            >
              <span>Maillots Clubs</span>
            </Link>
          </div>

          {/* Trust Features Bar */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-slate-800 text-base">🚚</span>
              <span>Toute la Mauritanie</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-800 text-base">✍️</span>
              <span>Flocage personnalisé</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-800 text-base">💳</span>
              <span>Bankily / Masrvi / Cash</span>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Jersey 3D Showcase Composition */}
        <div className="lg:col-span-6 w-full flex items-center justify-center relative min-h-[460px] sm:min-h-[520px]">
          {/* Floating Top Badge */}
          <div className="absolute -top-4 sm:top-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-xl flex items-center gap-2 z-40 animate-float-slow">
            <span className="text-sm">✨</span>
            <span className="text-xs font-black uppercase tracking-wider text-[#0A0F1D]">
              Collection Officielle 2025 / 2026
            </span>
          </div>

          {/* Floating Bottom Badge */}
          <div className="absolute -bottom-4 sm:bottom-2 bg-[#0A0F1D] text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 z-40 animate-float">
            <span className="text-sm">✍️</span>
            <span className="text-xs font-black uppercase tracking-wider">
              Flocage Nom + Numéro Offert
            </span>
          </div>

          {/* The Multi-Jersey Cards Stage */}
          <div className="relative w-full max-w-md h-[400px] sm:h-[460px] flex items-center justify-center">
            {JERSEYS.map((jersey) => {
              const isSelected = activeJersey === jersey.id;

              return (
                <div
                  key={jersey.id}
                  onClick={() => setActiveJersey(jersey.id)}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[260px] rounded-3xl p-4 sm:p-5 border transition-all duration-500 cursor-pointer ${
                    jersey.accent
                  } ${
                    isSelected
                      ? "scale-110 sm:scale-115 z-30 shadow-2xl rotate-0"
                      : `${jersey.rotation} ${jersey.translate} opacity-85 hover:opacity-100 hover:scale-100 z-10 shadow-lg`
                  }`}
                >
                  {/* Card Header Tag */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full text-slate-800">
                      {jersey.tag}
                    </span>
                    <span className="text-xs font-black text-[#0A0F1D]">
                      {jersey.price}
                    </span>
                  </div>

                  {/* Jersey Image */}
                  <div className="relative aspect-square w-full rounded-2xl bg-slate-50/80 overflow-hidden flex items-center justify-center p-3 border border-slate-100 group">
                    <Image
                      src={jersey.image}
                      alt={jersey.name}
                      fill
                      sizes="(max-width: 768px) 220px, 260px"
                      priority
                      className="object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Card Footer info */}
                  <div className="mt-3 text-center">
                    <h3 className="text-xs sm:text-sm font-black text-[#0A0F1D] truncate font-display">
                      {jersey.name}
                    </h3>
                    <p className="text-[10px] font-semibold text-slate-500 truncate">
                      {jersey.sub}
                    </p>
                    {isSelected && (
                      <Link
                        href={`/produit/${jersey.id}`}
                        className="inline-block mt-2 text-[10px] font-black uppercase tracking-wider text-white bg-[#0A0F1D] hover:bg-black px-3.5 py-1.5 rounded-lg transition-all"
                      >
                        Voir la fiche →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
