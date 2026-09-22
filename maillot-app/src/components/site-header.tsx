"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useCart } from "@/lib/cart-context";

const LOCALE_LABELS: Record<string, string> = { fr: "FR", en: "EN", ar: "AR" };

export function SiteHeader() {
  const { itemCount } = useCart();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Secret shortcut: Ctrl + Shift + A opens admin login
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        router.push("/admin");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  // Secret triple-click on logo ⚽ opens admin login
  function handleLogoClick(e: React.MouseEvent) {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        e.preventDefault();
        router.push("/admin");
        return 0;
      }
      return next;
    });
    setTimeout(() => setClickCount(0), 1200);
  }

  const [customerName, setCustomerName] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.customer) {
          setCustomerName(data.customer.name.split(" ")[0]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      {/* Top Banner - Clean, Minimalist & Elegant Ticker Marquee */}
      <div className="bg-[#0A0F1D] text-slate-200 text-[11px] font-semibold tracking-wider py-2 border-b border-slate-800 overflow-hidden whitespace-nowrap select-none">
        <div className="animate-marquee flex items-center gap-8">
          <span className="flex items-center gap-2"><span>⚡</span> <span className="font-bold text-white">LIVRAISON PARTOUT EN MAURITANIE</span> (NOUAKCHOTT & TOUTES LES RÉGIONS)</span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-2"><span>✍️</span> <span>FLOCAGE OFFICIEL NOM + NUMÉRO SUR-MESURE</span></span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-2"><span>💳</span> <span>PAIEMENT SÉCURISÉ : BANKILY, MASRVI, SEDAD & CASH</span></span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-2"><span>🏆</span> <span className="font-bold text-white">100% PRODUITS AUTHENTIQUES & QUALITÉ PRO</span></span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-2"><span>⚽</span> <span>COLLECTION SAISON 2024 / 2025</span></span>
          <span className="text-slate-600">•</span>
          {/* Loop repetition */}
          <span className="flex items-center gap-2"><span>⚡</span> <span className="font-bold text-white">LIVRAISON PARTOUT EN MAURITANIE</span> (NOUAKCHOTT & TOUTES LES RÉGIONS)</span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-2"><span>✍️</span> <span>FLOCAGE OFFICIEL NOM + NUMÉRO SUR-MESURE</span></span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-2"><span>💳</span> <span>PAIEMENT SÉCURISÉ : BANKILY, MASRVI, SEDAD & CASH</span></span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-2"><span>🏆</span> <span className="font-bold text-white">100% PRODUITS AUTHENTIQUES & QUALITÉ PRO</span></span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-2"><span>⚽</span> <span>COLLECTION SAISON 2024 / 2025</span></span>
          <span className="text-slate-600">•</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 h-20 flex items-center justify-between gap-6">
        {/* Left: Brand Logo NUMÉRO 10 */}
        <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#0A0F1D] flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-sm border border-slate-700 group-hover:scale-105 transition-transform">
            N°10
          </div>
          <div className="relative flex items-center">
            <span className="font-black text-2xl sm:text-3xl tracking-tighter text-[#0A0F1D] font-display uppercase group-hover:tracking-tight transition-all">
              NUMÉRO <span className="text-slate-700">10</span>
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-[13px] font-extrabold uppercase tracking-wider text-[#1F2937]">
          <Link
            href="/"
            className={`px-4 py-2 rounded-full transition-all ${
              pathname === "/"
                ? "bg-[#071A35] text-white shadow-xs"
                : "hover:bg-slate-100 text-slate-800"
            }`}
          >
            Accueil
          </Link>
          <Link
            href="/catalogue"
            className={`px-4 py-2 rounded-full transition-all ${
              pathname === "/catalogue"
                ? "bg-[#071A35] text-white shadow-xs"
                : "hover:bg-slate-100 text-slate-800"
            }`}
          >
            Boutique
          </Link>
          <Link
            href="/catalogue?category=MAILLOT"
            className={`px-4 py-2 rounded-full transition-all ${
              pathname.includes("category=")
                ? "bg-[#071A35] text-white shadow-xs"
                : "hover:bg-slate-100 text-slate-800"
            }`}
          >
            Catégories
          </Link>
          <Link
            href="/catalogue?flocage=true"
            className={`px-4 py-2 rounded-full transition-all ${
              pathname.includes("flocage=true")
                ? "bg-[#071A35] text-white shadow-xs"
                : "hover:bg-slate-100 text-slate-800"
            }`}
          >
            Promotions
          </Link>
          <Link
            href="/suivi"
            className={`px-4 py-2 rounded-full transition-all ${
              pathname === "/suivi"
                ? "bg-[#071A35] text-white shadow-xs"
                : "hover:bg-slate-100 text-slate-800"
            }`}
          >
            Suivi Commande
          </Link>
        </nav>

        {/* Right: Tools, Search, Wishlist, Cart & Account */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-black text-slate-600 mr-1 bg-[#F3F4F6] px-3 py-1.5 rounded-full border border-slate-200">
            {routing.locales.map((loc, i) => (
              <span key={loc} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-slate-300">·</span>}
                <Link
                  href={pathname}
                  locale={loc}
                  className={`hover:text-[#071A35] transition-colors ${
                    loc === locale ? "text-[#071A35] font-black underline underline-offset-4" : ""
                  }`}
                >
                  {LOCALE_LABELS[loc]}
                </Link>
              </span>
            ))}
          </div>

          {/* Search Button 🔍 */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2.5 rounded-full hover:bg-slate-100 text-[#071A35] transition-colors border border-slate-200"
            title="Rechercher"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Wishlist Icon ♡ */}
          <Link
            href="/catalogue"
            className="p-2.5 rounded-full hover:bg-slate-100 text-[#071A35] transition-colors border border-slate-200 hidden sm:flex"
            title="Favoris"
          >
            <svg className="w-5 h-5 text-slate-700 hover:text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </Link>

          {/* Account Profile Icon / Connexion Client */}
          <Link
            href={customerName ? "/compte" : "/compte/login"}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-extrabold text-[#071A35] hover:text-[#16A34A] px-3.5 py-2 rounded-full border border-slate-200 transition-colors"
            title={customerName ? "Mon Compte" : "Connexion"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>{customerName ? customerName : "Connexion"}</span>
          </Link>

          {/* Cart Pill Button 🛒 */}
          <Link
            href="/panier"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#16A34A] text-white px-5 py-2.5 text-xs sm:text-sm font-black hover:bg-[#15803D] transition-all shadow-md active:scale-95"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span>Panier</span>
            {itemCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#071A35] text-white px-1.5 text-xs font-black ml-0.5">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Quick Search Drawer */}
      {searchOpen && (
        <div className="bg-slate-100 border-t border-slate-200 py-4 px-4 sm:px-8 shadow-inner animate-in slide-in-from-top duration-200">
          <div className="mx-auto max-w-4xl flex items-center gap-3 bg-white border border-slate-300 rounded-2xl px-4 py-3 shadow-xs">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Rechercher un maillot (ex: Real Madrid, FC Barcelone), crampons, ballon..."
              className="w-full bg-transparent border-none text-sm outline-none text-[#1F2937] placeholder:text-slate-400 font-medium"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs font-extrabold uppercase tracking-wider text-slate-500 hover:text-black"
            >
              Fermer ✕
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

