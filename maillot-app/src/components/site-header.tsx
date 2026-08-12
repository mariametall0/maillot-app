"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function SiteHeader() {
  const { itemCount } = useCart();

  return (
    <header className="border-b border-black/10 bg-white sticky top-0 z-10">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="font-bold text-lg tracking-tight">
          Maillot<span className="text-blue-700">F</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-black/70">
          <Link href="/catalogue" className="hover:text-black">Catalogue</Link>
          <Link href="/catalogue?category=MAILLOT" className="hover:text-black">Maillots</Link>
          <Link href="/catalogue?category=EQUIPEMENT" className="hover:text-black">Équipements</Link>
          <Link href="/suivi" className="hover:text-black">Suivi de commande</Link>
        </nav>
        <Link
          href="/panier"
          className="relative inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5"
        >
          Panier
          {itemCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-700 px-1 text-xs font-semibold text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
