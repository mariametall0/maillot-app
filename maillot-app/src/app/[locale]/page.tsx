import { Link } from "@/i18n/navigation";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { HeroCustomizerWidget } from "@/components/hero-customizer-widget";

export default async function HomePage() {
  const products = await getAllProducts();
  const featured = products.slice(0, 8);

  return (
    <div className="bg-white min-h-screen text-[#1F2937] overflow-hidden">
      {/* HERO SECTION - Clean, High-End Athletic Design */}
      <section className="relative min-h-[560px] sm:min-h-[600px] flex items-center justify-center py-12 sm:py-16 px-4 sm:px-8 bg-[#F8FAFC] border-b border-slate-200 overflow-hidden">
        {/* Subtle Ambient Background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative mx-auto max-w-7xl w-full grid lg:grid-cols-12 gap-12 items-center z-10">
          {/* Left Column: Bold Typography & Refined Actions */}
          <div className="lg:col-span-7 text-left space-y-6 animate-pop-in">
            {/* Elegant Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white border border-slate-300 text-slate-800 text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>BOUTIQUE OFFICIELLE • FLOCAGE SUR-MESURE</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase font-display leading-[0.95] text-[#0A0F1D]">
              ÉQUIPE-TOI. <br />
              <span className="text-slate-700">JOUE.</span> GAGNE.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed font-sans max-w-xl">
              Tout pour vivre votre passion du football. Maillots officiels de clubs, crampons pros, ballons et accessoires avec livraison express partout en Mauritanie.
            </p>

            {/* Actions: Clean Black Primary + Refined White Secondary */}
            <div className="pt-3 flex flex-wrap gap-4 items-center">
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-3 bg-[#0A0F1D] text-white hover:bg-black font-extrabold text-sm px-8 py-4 tracking-wider uppercase rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>DÉCOUVRIR LA BOUTIQUE</span>
                <span className="text-base transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/catalogue?category=MAILLOT"
                className="inline-flex items-center gap-2 bg-white text-[#0A0F1D] border border-slate-300 hover:border-slate-400 font-bold text-sm px-7 py-4 tracking-wider uppercase rounded-2xl hover:bg-slate-50 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>Maillots Clubs</span>
              </Link>
            </div>

            {/* Trust Features Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <span className="text-slate-800 text-sm">🚚</span>
                <span>Toute la Mauritanie</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-800 text-sm">✍️</span>
                <span>Flocage personnalisé</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-800 text-sm">💳</span>
                <span>Paiement sécurisé</span>
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
            <p className="text-2xl sm:text-3xl font-black text-white font-display">+5 000</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Maillots Livrés</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-white font-display">100%</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Qualité Officielle</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-white font-display">Toute la RIM</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Livraison Nationale</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-display">4.9 / 5</p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Satisfaction Client</p>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION - "NOS CATÉGORIES" */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold tracking-widest uppercase text-slate-600 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
            COLLECTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A0F1D] font-display uppercase tracking-tight">
            NOS CATÉGORIES
          </h2>
          <p className="text-sm font-medium text-slate-500 max-w-md mx-auto">
            Trouvez votre équipement officiel par univers de jeu
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Category 1: MAILLOTS */}
          <Link
            href="/catalogue?category=MAILLOT"
            className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-slate-800 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1 text-center"
          >
            <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">👕</span>
            <h3 className="text-sm sm:text-base font-black text-[#0A0F1D] uppercase font-display">
              Maillots
            </h3>
            <span className="text-[11px] font-bold text-slate-600 mt-1 group-hover:text-black transition-colors inline-block">
              Voir tout →
            </span>
          </Link>

          {/* Category 2: CHAUSSURES */}
          <Link
            href="/catalogue?subtype=CHAUSSURES"
            className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-slate-800 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1 text-center"
          >
            <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">👟</span>
            <h3 className="text-sm sm:text-base font-black text-[#0A0F1D] uppercase font-display">
              Chaussures
            </h3>
            <span className="text-[11px] font-bold text-slate-600 mt-1 group-hover:text-black transition-colors inline-block">
              Crampons Pro →
            </span>
          </Link>

          {/* Category 3: BALLONS */}
          <Link
            href="/catalogue?subtype=BALLONS"
            className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-slate-800 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1 text-center"
          >
            <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">⚽</span>
            <h3 className="text-sm sm:text-base font-black text-[#0A0F1D] uppercase font-display">
              Ballons
            </h3>
            <span className="text-[11px] font-bold text-slate-600 mt-1 group-hover:text-black transition-colors inline-block">
              Match & Entraînement →
            </span>
          </Link>

          {/* Category 4: GANTS */}
          <Link
            href="/catalogue?subtype=GANTS"
            className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-slate-800 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1 text-center"
          >
            <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">🧤</span>
            <h3 className="text-sm sm:text-base font-black text-[#0A0F1D] uppercase font-display">
              Gants
            </h3>
            <span className="text-[11px] font-bold text-slate-600 mt-1 group-hover:text-black transition-colors inline-block">
              Gardiens de But →
            </span>
          </Link>
        </div>
      </section>

      {/* POPULAR PRODUCTS SECTION - "PRODUITS POPULAIRES" */}
      <section className="bg-slate-50 py-16 sm:py-20 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-slate-700 bg-white px-3.5 py-1.5 rounded-full border border-slate-300 shadow-xs inline-flex items-center gap-2">
                SÉLECTION
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0A0F1D] font-display uppercase tracking-tight mt-2">
                PRODUITS POPULAIRES
              </h2>
            </div>
            <Link
              href="/catalogue"
              className="text-xs font-bold uppercase tracking-widest text-[#0A0F1D] hover:underline underline-offset-8 transition-colors group flex items-center gap-1"
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

