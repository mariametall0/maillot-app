"use client";

import { Link } from "@/i18n/navigation";

const CLUBS = [
  { name: "Mauritanie", flag: "🇲🇷", link: "/catalogue?club=Mourabitounes", tag: "Mourabitounes" },
  { name: "Real Madrid", flag: "⚪", link: "/catalogue?club=Real%20Madrid", tag: "La Liga" },
  { name: "FC Barcelone", flag: "🔴🔵", link: "/catalogue?club=FC%20Barcelone", tag: "La Liga" },
  { name: "Manchester City", flag: "🔵", link: "/catalogue?category=MAILLOT", tag: "Premier League" },
  { name: "Paris SG", flag: "🔴🔵", link: "/catalogue?category=MAILLOT", tag: "Ligue 1" },
  { name: "Arsenal", flag: "🔴", link: "/catalogue?category=MAILLOT", tag: "Premier League" },
  { name: "Bayern Munich", flag: "🔴⚪", link: "/catalogue?category=MAILLOT", tag: "Bundesliga" },
  { name: "Al Nassr", flag: "🟡", link: "/catalogue?category=MAILLOT", tag: "Saudi Pro" },
];

export function ClubsScrollMarquee() {
  return (
    <section className="py-8 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
          <span className="text-xs font-black uppercase tracking-widest text-[#071A35]">
            Clubs & Sélections les plus demandés
          </span>
        </div>
        <Link
          href="/catalogue?category=MAILLOT"
          className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-wider hidden sm:inline-block"
        >
          Voir tous les clubs →
        </Link>
      </div>

      {/* Scrolling Row */}
      <div className="flex overflow-hidden py-2">
        <div className="animate-marquee flex items-center gap-4">
          {[...CLUBS, ...CLUBS, ...CLUBS].map((club, idx) => (
            <Link
              key={idx}
              href={club.link}
              className="flex items-center gap-3 bg-[#F3F4F6] hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-2xl border border-slate-200 hover:border-blue-600 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 shrink-0 group"
            >
              <span className="text-xl group-hover:scale-125 transition-transform duration-300">
                {club.flag}
              </span>
              <div className="text-left">
                <p className="text-xs font-black uppercase text-[#071A35] group-hover:text-white leading-tight">
                  {club.name}
                </p>
                <p className="text-[10px] font-bold text-slate-500 group-hover:text-blue-100">
                  {club.tag}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
