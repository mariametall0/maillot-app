import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { CartProvider } from "@/lib/cart-context";
import { SiteHeader } from "@/components/site-header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#111111] selection:bg-black selection:text-white">
        <NextIntlClientProvider>
          <CartProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <footer className="bg-[#071A35] text-white border-t border-[#0F2D5A] pt-16 pb-12 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-14 text-left">
                {/* Column 1: Brand & Bio */}
                <div className="space-y-4">
                  <span className="font-black text-2xl tracking-tight text-white uppercase font-display flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-[#16A34A] text-white flex items-center justify-center text-xs font-black">N°10</span>
                    <span>NUMÉRO <span className="text-[#16A34A]">10</span></span>
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                    La boutique officielle de référence en Mauritanie pour vos maillots de football de grands clubs, crampons professionnels, ballons, gants et flocage officiel nom + numéro. Livraison express dans tout le pays.
                  </p>
                </div>

                {/* Column 2: Navigation Links */}
                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-4">Boutique & Gammes</h5>
                  <ul className="space-y-3 text-xs text-slate-300 font-bold">
                    <li><Link href="/catalogue?category=MAILLOT" className="hover:text-emerald-400 transition-colors">Maillots de Football</Link></li>
                    <li><Link href="/catalogue?subtype=CHAUSSURES" className="hover:text-emerald-400 transition-colors">Chaussures & Crampons</Link></li>
                    <li><Link href="/catalogue?subtype=BALLONS" className="hover:text-emerald-400 transition-colors">Ballons Officiels</Link></li>
                    <li><Link href="/catalogue?subtype=GANTS" className="hover:text-emerald-400 transition-colors">Gants de Gardien</Link></li>
                    <li><Link href="/suivi" className="hover:text-emerald-400 transition-colors">Suivi de Commande</Link></li>
                  </ul>
                </div>

                {/* Column 3: Official App Logos */}
                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-4">Moyens de Paiement Mauritanie</h5>
                  <div className="flex flex-wrap gap-2">
                    {/* Bankily Real Logo */}
                    <div className="flex flex-col items-center gap-1.5 bg-white p-2 rounded-xl border border-emerald-500/30 hover:border-emerald-400 transition-colors shadow-sm flex-1 min-w-[60px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/payment/bankily.png" alt="Bankily BPM" className="h-8 w-auto object-contain" />
                      <p className="text-[9px] font-black text-[#071A35] leading-none text-center">Bankily</p>
                    </div>

                    {/* Masrvi Real Logo */}
                    <div className="flex flex-col items-center gap-1.5 bg-white p-2 rounded-xl border border-rose-500/30 hover:border-rose-400 transition-colors shadow-sm flex-1 min-w-[60px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/payment/masrvi.png" alt="Masrvi BMCI" className="h-8 w-auto object-contain" />
                      <p className="text-[9px] font-black text-[#071A35] leading-none text-center">Masrvi</p>
                    </div>

                    {/* Sedad Real Logo */}
                    <div className="flex flex-col items-center gap-1.5 bg-white p-2 rounded-xl border border-emerald-700/30 hover:border-emerald-600 transition-colors shadow-sm flex-1 min-w-[60px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/payment/sedad.png" alt="Sedad Bank" className="h-8 w-auto object-contain" />
                      <p className="text-[9px] font-black text-[#071A35] leading-none text-center">Sedad</p>
                    </div>

                    {/* Cash Logo */}
                    <div className="flex flex-col items-center gap-1.5 bg-[#0D2850] p-2 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-colors shadow-sm flex-1 min-w-[60px]">
                      <div className="h-8 flex items-center justify-center text-2xl">💵</div>
                      <p className="text-[9px] font-black text-amber-400 leading-none text-center">Cash</p>
                    </div>
                  </div>
                </div>

                {/* Column 4: Newsletter */}
                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-4">Newsletter Officielle</h5>
                  <p className="text-xs text-slate-300 mb-3 font-medium">Inscrivez-vous pour recevoir les nouveautés maillots et promos exclusives.</p>
                  <div className="flex">
                    <input type="email" placeholder="Votre adresse email..." className="bg-[#0D2850] text-xs px-4 py-3 rounded-l-xl border border-slate-700 text-white outline-none w-full placeholder:text-slate-400 focus:border-emerald-500" />
                    <button className="btn-green-action text-xs font-black px-5 py-3 rounded-r-xl hover:bg-[#15803D] transition-all uppercase tracking-wider">OK</button>
                  </div>
                </div>
              </div>
              <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
                <p>© 2026 NUMÉRO 10 — Vente & Flocage de Maillots en Mauritanie. Tous droits réservés.</p>
                <p className="text-[11px] font-semibold text-emerald-400">
                  Livraison à Nouakchott, Nouadhibou & toutes les wilayas
                </p>
              </div>
            </footer>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
