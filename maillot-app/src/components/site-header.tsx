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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Close menus on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

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
      {/* Top Banner - Clean, Static & Elegant Announcement Bar */}
      <div className="bg-[#0A0F1D] text-slate-200 text-[11px] sm:text-xs font-semibold py-2 px-4 border-b border-slate-800 text-center flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="text-blue-400">⚡</span>
          <span className="font-bold text-white">Livraison Express</span> en Mauritanie (Nouakchott & wilayas)
        </span>
        <span className="hidden sm:inline text-slate-600">•</span>
        <span className="hidden sm:flex items-center gap-1.5">
          <span className="text-blue-400">✍️</span>
          <span>Flocage Officiel Nom + Numéro</span>
        </span>
        <span className="hidden md:inline text-slate-600">•</span>
        <span className="hidden md:flex items-center gap-1.5">
          <span className="text-blue-400">💳</span>
          <span>Bankily, Masrvi, Sedad & Cash</span>
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-3 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Mobile Menu Toggle + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-[#071A35] transition-colors border border-slate-200 focus:outline-none"
            aria-label="Menu de navigation"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Brand Logo Halwarkits Sport */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2.5 sm:gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Halwarkits Sport"
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain group-hover:scale-105 transition-all duration-300 drop-shadow-xs"
            />
            <span className="font-black text-lg sm:text-2xl tracking-tight text-[#071A35] font-display uppercase leading-tight">
              HALWARKITS <span className="text-blue-600">SPORT</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
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
            Flocage Offert
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

        {/* Right: Tools, Search, Cart & Account */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher (Desktop) */}
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
            className="p-2 sm:p-2.5 rounded-full hover:bg-slate-100 text-[#071A35] transition-colors border border-slate-200"
            title="Rechercher"
            aria-label="Rechercher"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Account Profile Icon / Connexion Client */}
          <Link
            href={customerName ? "/compte" : "/compte/login"}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-extrabold text-[#071A35] hover:text-blue-600 px-3.5 py-2 rounded-full border border-slate-200 transition-colors"
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
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-black hover:bg-blue-700 transition-all shadow-md active:scale-95"
            aria-label="Voir mon panier"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="hidden xs:inline">Panier</span>
            {itemCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#071A35] text-white px-1.5 text-xs font-black">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-xl animate-in slide-in-from-top-2 duration-200 px-4 py-5 space-y-4">
          <nav className="flex flex-col space-y-1.5 text-sm font-black uppercase tracking-wider text-[#071A35]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl transition-colors ${
                pathname === "/" ? "bg-[#071A35] text-white" : "hover:bg-slate-100"
              }`}
            >
              🏠 Accueil
            </Link>
            <Link
              href="/catalogue"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl transition-colors ${
                pathname === "/catalogue" ? "bg-[#071A35] text-white" : "hover:bg-slate-100"
              }`}
            >
              ⚽ Boutique Complète
            </Link>
            <Link
              href="/catalogue?category=MAILLOT"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              👕 Maillots Officiels
            </Link>
            <Link
              href="/catalogue?flocage=true"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-blue-600"
            >
              ✍️ Flocage Sur-Mesure
            </Link>
            <Link
              href="/suivi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              📦 Suivi de Commande
            </Link>
          </nav>

          {/* Mobile User Profile & Languages */}
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-3">
            <Link
              href={customerName ? "/compte" : "/compte/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#071A35] font-black text-xs uppercase tracking-wider py-2.5 rounded-xl transition-colors"
            >
              <span>👤</span>
              <span>{customerName ? `Mon Compte (${customerName})` : "Connexion Client"}</span>
            </Link>

            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-center gap-3 text-xs font-black text-slate-600 bg-slate-50 py-2 rounded-xl">
              <span className="text-[11px] text-slate-400 uppercase">Langue :</span>
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    loc === locale ? "bg-[#071A35] text-white" : "text-slate-700 hover:text-black"
                  }`}
                >
                  {LOCALE_LABELS[loc]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

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

