"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

const POPULAR_NAMES = [
  { name: "MBAPPÉ", number: "9", club: "Real Madrid" },
  { name: "YAMAL", number: "19", club: "FC Barcelone" },
  { name: "KAMARA", number: "7", club: "Mauritanie" },
  { name: "VINICIUS", number: "7", club: "Real Madrid" },
  { name: "HAALAND", number: "9", club: "Man City" },
];

export function InteractiveCustomizerBanner() {
  const [customName, setCustomName] = useState("VOTRE NOM");
  const [customNumber, setCustomNumber] = useState("10");

  const displayName = customName.trim().toUpperCase() || "NUMÉRO 10";
  const displayNumber = customNumber !== "" ? customNumber : "10";

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden border-t border-slate-200">
      {/* Dynamic ambient backdrops */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Left Column: Interactive Inputs & Slogans */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-widest text-blue-700">
              STUDIO FLOCAGE EN DIRECT
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#071A35] font-display uppercase tracking-tight leading-[1.02]">
            IMPRIME TON NOM. <br />
            <span className="text-blue-600">DEVIENS LA STAR.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
            Testez votre flocage officiel en temps réel ! Personnalisez n&apos;importe quel maillot avec vos nom, prénom et numéro de prédilection avec une typographie officielle de haute précision.
          </p>

          {/* Quick presets buttons */}
          <div className="space-y-2 pt-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              ⚡ Exemples populaires en 1-clic :
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_NAMES.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setCustomName(item.name);
                    setCustomNumber(item.number);
                  }}
                  className="px-3.5 py-1.5 bg-white hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 rounded-xl text-xs font-bold text-slate-700 transition-all shadow-xs active:scale-95"
                >
                  {item.name} #{item.number}
                </button>
              ))}
            </div>
          </div>

          {/* Controls Form Inputs */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">
                  Nom à floquer
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                  placeholder="EX: MOHAMED"
                  className="w-full bg-[#F3F4F6] border border-slate-300 focus:border-blue-600 px-4 py-3 rounded-xl text-sm font-black text-[#071A35] outline-none uppercase transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-black uppercase text-slate-500 block mb-1">
                  Numéro
                </label>
                <input
                  type="number"
                  min={0}
                  max={99}
                  value={customNumber}
                  onChange={(e) => setCustomNumber(e.target.value)}
                  placeholder="10"
                  className="w-full bg-[#F3F4F6] border border-slate-300 focus:border-blue-600 px-4 py-3 rounded-xl text-sm font-black text-[#071A35] outline-none text-center transition-colors"
                />
              </div>
            </div>

            <Link
              href="/catalogue?flocage=true"
              className="w-full flex items-center justify-center gap-3 btn-blue-action text-white font-black text-xs sm:text-sm uppercase tracking-wider py-4 rounded-2xl shadow-lg transition-all"
            >
              <span>Commander un maillot avec ce flocage →</span>
            </Link>
          </div>
        </div>

        {/* Right Column: 3D Interactive Animated Mock Jersey View */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          {/* Glowing Aura Ring */}
          <div className="absolute inset-0 max-w-md mx-auto aspect-square bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>

          {/* Jersey Card Mockup */}
          <div className="relative w-full max-w-md bg-[#071A35] rounded-3xl p-8 sm:p-10 border border-[#0F2D5A] shadow-2xl text-center text-white space-y-6 transform hover:scale-102 transition-all duration-300">
            {/* Top Brand & Authentic Badge */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-400/20">
                🇲🇷 FLOCAGE PRO OFFICIEL
              </span>
              <span className="text-xs font-black text-slate-300">NUMÉRO 10</span>
            </div>

            {/* Visual Jersey Back Simulation */}
            <div className="relative py-8 px-4 rounded-2xl bg-gradient-to-b from-[#0A254C] to-[#071A35] border border-blue-500/20 shadow-inner flex flex-col items-center justify-center min-h-[260px] overflow-hidden">
              {/* Dynamic Animated Name */}
              <div className="relative z-10 font-display font-black text-3xl sm:text-4xl text-white tracking-[0.2em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] transition-all duration-300 transform scale-100">
                {displayName}
              </div>

              {/* Dynamic Animated Big Number */}
              <div className="relative z-10 font-display font-black text-7xl sm:text-8xl text-blue-400 tracking-tight mt-2 drop-shadow-[0_4px_20px_rgba(37,99,235,0.6)] transition-all duration-300">
                {displayNumber}
              </div>

              {/* Sub-text badge */}
              <p className="relative z-10 text-[9px] font-bold tracking-widest text-slate-400 uppercase mt-4">
                AUTHENTIC MATCH SPECIFICATION • 2025/2026
              </p>
            </div>

            {/* Reassurance Footer */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-slate-300 pt-2 border-t border-slate-800">
              <div>
                <p className="text-blue-400 font-black">✓ Thermo-collé</p>
                <p className="text-slate-400">Qualité Pro</p>
              </div>
              <div>
                <p className="text-blue-400 font-black">✓ Lavable 40°</p>
                <p className="text-slate-400">Ultra-résistant</p>
              </div>
              <div>
                <p className="text-blue-400 font-black">✓ Expédition 24h</p>
                <p className="text-slate-400">Toute la RIM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
