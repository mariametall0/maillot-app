"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

const CLUB_THEMES = [
  { name: "Real Madrid", bg: "bg-white", text: "text-[#071A35]", numberColor: "text-amber-500", border: "border-slate-300", badge: "⚪ Domicile" },
  { name: "Paris SG", bg: "bg-[#071A35]", text: "text-white", numberColor: "text-red-500", border: "border-[#0F2D5A]", badge: "🔵 Paris" },
  { name: "Barça", bg: "bg-[#800020]", text: "text-amber-300", numberColor: "text-amber-400", border: "border-blue-900", badge: "🔴 Barça" },
  { name: "Al-Nassr", bg: "bg-amber-400", text: "text-[#071A35]", numberColor: "text-blue-900", border: "border-amber-300", badge: "🟡 Jaune" },
];

export function HeroCustomizerWidget() {
  const [name, setName] = useState("MBAPPÉ");
  const [number, setNumber] = useState("9");
  const [selectedTheme, setSelectedTheme] = useState(0);

  const theme = CLUB_THEMES[selectedTheme];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl text-left space-y-5 hover:shadow-2xl transition-all duration-300 tilt-card">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#16A34A] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping"></span>
            STUDIO FLOCAGE LIVE ✍️
          </span>
          <h3 className="text-lg sm:text-xl font-black text-[#071A35] uppercase font-display">
            Personnalise ton Maillot
          </h3>
        </div>
        <span className="bg-amber-50 text-amber-800 text-[11px] font-black px-3 py-1 rounded-full border border-amber-200 shadow-xs">
          Nom + Numéro
        </span>
      </div>

      {/* Club Theme Selector Pills */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
          Style du Maillot :
        </label>
        <div className="grid grid-cols-4 gap-2">
          {CLUB_THEMES.map((t, idx) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setSelectedTheme(idx)}
              className={`py-1.5 px-2 rounded-xl text-[11px] font-extrabold transition-all duration-200 border ${
                selectedTheme === idx
                  ? "bg-[#071A35] text-white border-[#071A35] shadow-sm scale-105"
                  : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
              }`}
            >
              {t.badge}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
            Nom du Joueur
          </label>
          <input
            type="text"
            value={name}
            maxLength={12}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            placeholder="EX : MBAPPÉ"
            className="w-full bg-slate-50 border border-slate-300 text-[#071A35] rounded-xl px-3.5 py-2.5 text-xs font-black outline-none focus:border-[#16A34A] focus:bg-white transition-all uppercase shadow-inner"
          />
        </div>
        <div>
          <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
            Numéro (0-99)
          </label>
          <input
            type="number"
            min={0}
            max={99}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="9"
            className="w-full bg-slate-50 border border-slate-300 text-[#071A35] rounded-xl px-3.5 py-2.5 text-xs font-black outline-none focus:border-[#16A34A] focus:bg-white transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Live Jersey Render Box with Realistic Jersey Visual */}
      <div className={`rounded-2xl p-6 text-center relative overflow-hidden shadow-lg border transition-all duration-300 ${theme.bg} ${theme.border}`}>
        {/* Subtle Jersey Fabric Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none opacity-40"></div>

        <div className="relative z-10">
          <div className="text-[10px] font-black tracking-widest uppercase opacity-60 mb-2">
            Aperçu Dos · {theme.name}
          </div>

          {/* Jersey Shape & Flocage */}
          <div className="py-2 space-y-1">
            <p className={`text-2xl sm:text-3xl font-black tracking-widest font-display uppercase drop-shadow-sm transition-all duration-300 ${theme.text}`}>
              {name.trim() || "VOTRE NOM"}
            </p>
            <p className={`text-6xl sm:text-7xl font-black font-display drop-shadow-md leading-none transition-all duration-300 transform hover:scale-105 cursor-default ${theme.numberColor}`}>
              {number !== "" ? number : "10"}
            </p>
          </div>

          <p className="text-[10px] opacity-60 font-semibold mt-3">
            Impression thermo-collée officielle haute tenue lavable à 30°C
          </p>
        </div>
      </div>

      {/* CTA Button with Shine */}
      <Link
        href="/catalogue?category=MAILLOT"
        className="w-full inline-flex items-center justify-center gap-2 btn-green-action text-xs font-black uppercase tracking-widest py-3.5 rounded-xl text-center shadow-md transition-all"
      >
        <span>Choisir ce maillot à floquer 🛍️</span>
      </Link>
    </div>
  );
}
