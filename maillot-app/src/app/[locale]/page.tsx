import { Link } from "@/i18n/navigation";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { HeroCustomizerWidget } from "@/components/hero-customizer-widget";

export default async function HomePage() {
  const products = await getAllProducts();
  const featured = products.slice(0, 8);

  return (
    <div className="bg-white min-h-screen text-[#1F2937] overflow-hidden">
      {/* HERO SECTION - Clean White & Navy #071A35 Split Theme with Ambient Glow */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center py-12 px-4 sm:px-8 bg-gradient-to-b from-slate-50 via-emerald-50/20 to-white border-b border-slate-200 overflow-hidden">
        {/* Ambient Decorative Background Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#071A35]/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Floating Sports Particles (Subtle) */}
        <div className="absolute top-12 left-8 text-2xl opacity-30 select-none animate-float hidden lg:block">⚽</div>
        <div className="absolute bottom-16 left-1/3 text-2xl opacity-20 select-none animate-float-slow hidden lg:block">⚡</div>
        <div className="absolute top-24 right-1/4 text-2xl opacity-25 select-none animate-float hidden lg:block">🏆</div>

        <div className="relative mx-auto max-w-7xl w-full grid lg:grid-cols-12 gap-12 items-center z-10">
          {/* Left Column: Big Bold Text & Green Action Button */}
          <div className="lg:col-span-7 text-left space-y-6 animate-pop-in">
            {/* Live Badge with Pulse */}
            <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-md border border-emerald-500/30 text-[#071A35] text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-xs hover:border-emerald-500 transition-colors">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16A34A]"></span>
              </span>
              <span>BOUTIQUE OFFICIELLE & FLOCAGE SUR-MESURE</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase font-display leading-[0.95] text-[#071A35]">
              ÉQUIPE-TOI. <br />
              <span className="text-[#16A34A] inline-block hover:scale-105 transition-transform origin-left">JOUE.</span> GAGNE.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl font-semibold text-slate-600 leading-relaxed font-sans max-w-xl">
              Tout pour vivre ta passion du football. Maillots officiels de clubs, crampons pros, ballons et gants avec livraison express partout en Mauritanie.
            </p>

            {/* SHOP NOW Button & Quick Links */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-3 btn-green-action text-white font-black text-sm px-9 py-4 tracking-widest uppercase rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <span>SHOP NOW</span>
                <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/catalogue?category=MAILLOT"
                className="inline-flex items-center gap-2 bg-[#F3F4F6] text-[#071A35] border border-slate-300 font-extrabold text-sm px-7 py-4 tracking-wider uppercase rounded-2xl hover:bg-[#071A35] hover:text-white hover:border-[#071A35] transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>⚽ Maillots Clubs</span>
              </Link>
            </div>

            {/* Trust Features Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 text-xs font-extrabold text-slate-600">
              <div className="flex items-center gap-2 group cursor-default">
                <span className="text-[#16A34A] text-base group-hover:scale-125 transition-transform inline-block">⚡</span>
                <span>Toute la Mauritanie</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <span className="text-[#16A34A] text-base group-hover:scale-125 transition-transform inline-block">✍️</span>
                <span>Flocage Offert</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <span className="text-[#16A34A] text-base group-hover:scale-125 transition-transform inline-block">💳</span>
                <span>Bankily / Cash</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Flocage Live Tester Widget */}
          <div className="lg:col-span-5 w-full">
            <HeroCustomizerWidget />
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="bg-[#071A35] text-white py-6 border-b border-[#0A254C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-display">+5 000</p>
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300">Maillots Livrés</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-amber-300 font-display">100%</p>
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300">Qualité Officielle</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-white font-display">Toute la RIM</p>
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300">Livraison Nationale</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-display">4.9 / 5 ⭐</p>
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300">Satisfaction Client</p>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION - "NOS CATÉGORIES" */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-black tracking-widest uppercase text-[#16A34A] bg-[#16A34A]/10 px-4 py-1.5 rounded-full border border-[#16A34A]/20">
            COLLECTIONS EXCLUSIVES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#071A35] font-display uppercase tracking-tight">
            NOS CATÉGORIES
          </h2>
          <p className="text-sm font-semibold text-slate-500 max-w-md mx-auto">
            Trouve ton équipement parfait par univers de jeu
          </p>
        </div>

        {/* 4 Category Cards Grid with Hover Lift & Glow */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Category 1: MAILLOTS */}
          <Link
            href="/catalogue?category=MAILLOT"
            className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-[#F3F4F6] rounded-3xl border border-slate-200 hover:border-[#16A34A] hover:bg-white transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-2 text-center"
          >
            <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-300 inline-block">👕</span>
            <h3 className="text-sm sm:text-base font-black text-[#071A35] uppercase font-display group-hover:text-[#16A34A] transition-colors">
              Maillots
            </h3>
            <span className="text-[11px] font-extrabold text-[#16A34A] mt-1 group-hover:translate-x-1 transition-transform inline-block">
              Voir tout →
            </span>
          </Link>

          {/* Category 2: CHAUSSURES */}
          <Link
            href="/catalogue?subtype=CHAUSSURES"
            className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-[#F3F4F6] rounded-3xl border border-slate-200 hover:border-[#16A34A] hover:bg-white transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-2 text-center"
          >
            <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300 inline-block">👟</span>
            <h3 className="text-sm sm:text-base font-black text-[#071A35] uppercase font-display group-hover:text-[#16A34A] transition-colors">
              Chaussures
            </h3>
            <span className="text-[11px] font-extrabold text-[#16A34A] mt-1 group-hover:translate-x-1 transition-transform inline-block">
              Crampons Pro →
            </span>
          </Link>

          {/* Category 3: BALLONS */}
          <Link
            href="/catalogue?subtype=BALLONS"
            className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-[#F3F4F6] rounded-3xl border border-slate-200 hover:border-[#16A34A] hover:bg-white transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-2 text-center"
          >
            <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 inline-block">⚽</span>
            <h3 className="text-sm sm:text-base font-black text-[#071A35] uppercase font-display group-hover:text-[#16A34A] transition-colors">
              Ballons
            </h3>
            <span className="text-[11px] font-extrabold text-[#16A34A] mt-1 group-hover:translate-x-1 transition-transform inline-block">
              Match & Entraînement →
            </span>
          </Link>

          {/* Category 4: GANTS */}
          <Link
            href="/catalogue?subtype=GANTS"
            className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-[#F3F4F6] rounded-3xl border border-slate-200 hover:border-[#16A34A] hover:bg-white transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-2 text-center"
          >
            <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-300 inline-block">🧤</span>
            <h3 className="text-sm sm:text-base font-black text-[#071A35] uppercase font-display group-hover:text-[#16A34A] transition-colors">
              Gants
            </h3>
            <span className="text-[11px] font-extrabold text-[#16A34A] mt-1 group-hover:translate-x-1 transition-transform inline-block">
              Gardiens de But →
            </span>
          </Link>
        </div>
      </section>

      {/* POPULAR PRODUCTS SECTION - "PRODUITS POPULAIRES" */}
      <section className="bg-[#F3F4F6] py-16 sm:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-black tracking-widest uppercase text-[#16A34A] bg-white px-3.5 py-1.5 rounded-full border border-slate-300 shadow-xs inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping"></span>
                OFFRES EXCLUSIVES
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#071A35] font-display uppercase tracking-tight mt-2">
                PRODUITS POPULAIRES
              </h2>
            </div>
            <Link
              href="/catalogue"
              className="text-xs font-black uppercase tracking-widest text-[#16A34A] hover:text-[#071A35] underline underline-offset-8 transition-colors group flex items-center gap-1"
            >
              <span>Voir toute la boutique ({products.length})</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Product Cards Grid matching user design */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST REASSURANCE BAR */}
      <section className="bg-white text-[#1F2937] py-16 px-4 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-[#F3F4F6] p-6 rounded-3xl border border-slate-200 space-y-2 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg hover:border-emerald-500 group">
            <div className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-300 inline-block">🚚</div>
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#071A35]">
              Livraison Express
            </h4>
            <p className="text-xs text-slate-500 font-medium">Partout en Mauritanie (toutes les wilayas)</p>
          </div>
          <div className="bg-[#F3F4F6] p-6 rounded-3xl border border-slate-200 space-y-2 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg hover:border-emerald-500 group">
            <div className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-300 inline-block">✍️</div>
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#071A35]">
              Flocage Pro
            </h4>
            <p className="text-xs text-slate-500 font-medium">Impression nom & numéro sur-mesure</p>
          </div>
          <div className="bg-[#F3F4F6] p-6 rounded-3xl border border-slate-200 space-y-2 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg hover:border-emerald-500 group">
            <div className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-300 inline-block">💳</div>
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#071A35]">
              Paiement Sécurisé
            </h4>
            <p className="text-xs text-slate-500 font-medium">Bankily, Masrvi, Sedad & Cash</p>
          </div>
          <div className="bg-[#F3F4F6] p-6 rounded-3xl border border-slate-200 space-y-2 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg hover:border-emerald-500 group">
            <div className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-300 inline-block">📞</div>
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#071A35]">
              Service Client 7j/7
            </h4>
            <p className="text-xs text-slate-500 font-medium">Support téléphonique & WhatsApp</p>
          </div>
        </div>
      </section>
    </div>
  );
}

