"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useCart } from "@/lib/cart-context";

const LOCALE_LABELS: Record<string, string> = { fr: "FR", en: "EN", ar: "AR" };

export function SiteHeader() {
  const { itemCount } = useCart();
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className="border-b border-black/10 bg-white sticky top-0 z-10">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="font-bold text-lg tracking-tight">
          Maillot<span className="text-blue-700">F</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-black/70">
          <Link href="/catalogue" className="hover:text-black">{t("catalogue")}</Link>
          <Link href="/catalogue?category=MAILLOT" className="hover:text-black">{t("jerseys")}</Link>
          <Link href="/catalogue?category=EQUIPEMENT" className="hover:text-black">{t("equipment")}</Link>
          <Link href="/suivi" className="hover:text-black">{t("tracking")}</Link>
        </nav>
        <div className="flex items-center gap-3">
          {/* Sélecteur de langue (5.1 hors périmètre spec, ajouté sur demande) */}
          <div className="flex items-center gap-1 text-xs font-semibold text-black/50">
            {routing.locales.map((loc, i) => (
              <span key={loc} className="flex items-center gap-1">
                {i > 0 && <span className="text-black/20">·</span>}
                <Link
                  href={pathname}
                  locale={loc}
                  className={loc === locale ? "text-blue-700" : "hover:text-black"}
                >
                  {LOCALE_LABELS[loc]}
                </Link>
              </span>
            ))}
          </div>
          <Link
            href="/panier"
            className="relative inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5"
          >
            {t("cart")}
            {itemCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-700 px-1 text-xs font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
