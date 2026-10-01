"use client";

import { Link } from "@/i18n/navigation";

const STEPS = [
  {
    step: "01",
    icon: "👕",
    title: "Choisis ton Maillot",
    desc: "Sélectionne ton club ou ta nation parmi notre collection officielle 2025/2026 (Real Madrid, Barça, Mauritanie...).",
    badge: "100% Officiel",
  },
  {
    step: "02",
    icon: "✍️",
    title: "Personnalise le Flocage",
    desc: "Ajoute ton nom, le nom de ta star préférée et ton numéro porte-bonheur avec impression officielle haute précision.",
    badge: "Flocage Sur-Mesure",
  },
  {
    step: "03",
    icon: "🚀",
    title: "Livraison Express RIM",
    desc: "Reçois ta commande chez toi en express à Nouakchott, Nouadhibou et toutes les wilayas de Mauritanie.",
    badge: "Paiement à la livraison",
  },
];

export function HowItWorksAnimated() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto text-center space-y-16 relative z-10">
        {/* Section Header with badge */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-black tracking-widest uppercase text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
            RAPIDE & SIMPLE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#071A35] font-display uppercase tracking-tight">
            COMMENT ÇA MARCHE ?
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            Commandez votre équipement officiel floqué en seulement 3 étapes simples
          </p>
        </div>

        {/* 3 Animated Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((s, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-3xl bg-[#F3F4F6] border border-slate-200 hover:border-blue-600 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-2 group text-left space-y-5"
            >
              {/* Step Number Top-Right */}
              <div className="flex items-center justify-between">
                <span className="text-4xl sm:text-5xl group-hover:scale-125 transition-transform duration-300 inline-block">
                  {s.icon}
                </span>
                <span className="text-4xl font-black text-slate-300 group-hover:text-blue-600 transition-colors font-display">
                  {s.step}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h3 className="text-xl font-black text-[#071A35] uppercase font-display group-hover:text-blue-600 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {/* Step Badge */}
              <div className="pt-2">
                <span className="inline-block text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100/60 px-3 py-1 rounded-full border border-blue-200">
                  {s.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-3 btn-blue-action text-white font-black text-sm uppercase tracking-wider px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <span>Démarrer ma commande maintenant</span>
            <span className="text-base font-bold">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
