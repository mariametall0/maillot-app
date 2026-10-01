"use client";

export function AnimatedSloganTicker() {
  const row1 = [
    "⚡ NOUVELLE COLLECTION 2025 / 2026",
    "🇲🇷 MAILLOTS OFFICIELS MOURABITOUNES",
    "✍️ FLOCAGE NOM + NUMÉRO SUR-MESURE",
    "🚚 LIVRAISON EXPRESS TOUTE LA MAURITANIE",
    "🏆 100% PRODUITS AUTHENTIQUES",
    "⚽ CRAMPONS & BALLONS DE COMPÉTITION",
  ];

  const row2 = [
    "⚪ REAL MADRID",
    "🔴🔵 FC BARCELONE",
    "🇲🇷 SÉLECTION NATIONALE",
    "🔵 MANCHESTER CITY",
    "🔴 ARSENAL",
    "🔵 PARIS SAINT-GERMAIN",
    "🟡 AL NASSR",
    "⚪ BAYERN MUNICH",
  ];

  return (
    <section className="bg-[#071A35] text-white py-6 overflow-hidden border-y border-[#0A254C] relative select-none">
      {/* Glow backgrounds */}
      <div className="absolute top-0 left-1/4 w-96 h-24 bg-blue-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-24 bg-blue-600/10 blur-3xl pointer-events-none"></div>

      <div className="space-y-3">
        {/* Ticker Row 1 - Left to Right */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-black tracking-widest uppercase">
            {[...row1, ...row1, ...row1].map((text, i) => (
              <span key={i} className="flex items-center gap-8 shrink-0">
                <span className="text-white hover:text-blue-400 transition-colors">{text}</span>
                <span className="text-blue-500 text-base">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Ticker Row 2 - Bold Outline Club Names */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-black tracking-widest uppercase" style={{ animationDirection: "reverse", animationDuration: "28s" }}>
            {[...row2, ...row2, ...row2].map((text, i) => (
              <span key={i} className="flex items-center gap-8 shrink-0">
                <span className="text-blue-300 font-display hover:text-white transition-colors">{text}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
