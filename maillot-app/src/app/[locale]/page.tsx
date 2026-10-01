import { Link } from "@/i18n/navigation";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { CinematicHeroSlider } from "@/components/cinematic-hero-slider";

export default async function HomePage() {
  const products = await getAllProducts();
  const featured = products.slice(0, 8);

  return (
    <div className="bg-white min-h-screen text-[#1F2937] overflow-hidden">
      {/* CINEMATIC HERO BANNER WITH REAL PLAYERS & JERSEYS */}
      <CinematicHeroSlider />

      {/* AUTHENTIC SERVICE GUARANTEES */}
      <section className="bg-[#071A35] text-white py-4 sm:py-5 border-b border-[#0A254C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2.5 py-1">
            <span className="text-xl">🚚</span>
            <div className="text-left">
              <p className="text-xs font-black text-white uppercase tracking-wider">Livraison Express</p>
              <p className="text-[10px] text-slate-300 font-medium">Toutes les wilayas de RIM</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 py-1">
            <span className="text-xl">✍️</span>
            <div className="text-left">
              <p className="text-xs font-black text-white uppercase tracking-wider">Flocage Officiel</p>
              <p className="text-[10px] text-slate-300 font-medium">Nom & Numéro au choix</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 py-1">
            <span className="text-xl">💳</span>
            <div className="text-left">
              <p className="text-xs font-black text-white uppercase tracking-wider">Paiement Sécurisé</p>
              <p className="text-[10px] text-slate-300 font-medium">Bankily, Masrvi, Sedad & Cash</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 py-1">
            <span className="text-xl">🏆</span>
            <div className="text-left">
              <p className="text-xs font-black text-blue-400 uppercase tracking-wider">Qualité Pro</p>
              <p className="text-[10px] text-slate-300 font-medium">Maillots & Équipements</p>
            </div>
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
            className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-blue-600 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1 text-center"
          >
            <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">👕</span>
            <h3 className="text-sm sm:text-base font-black text-[#0A0F1D] uppercase font-display">
              Maillots
            </h3>
            <span className="text-[11px] font-bold text-slate-600 mt-1 group-hover:text-blue-600 transition-colors inline-block">
              Voir tout →
            </span>
          </Link>

          {/* Category 2: CHAUSSURES */}
          <Link
            href="/catalogue?subtype=CHAUSSURES"
            className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-blue-600 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1 text-center"
          >
            <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">👟</span>
            <h3 className="text-sm sm:text-base font-black text-[#0A0F1D] uppercase font-display">
              Chaussures
            </h3>
            <span className="text-[11px] font-bold text-slate-600 mt-1 group-hover:text-blue-600 transition-colors inline-block">
              Crampons Pro →
            </span>
          </Link>

          {/* Category 3: BALLONS */}
          <Link
            href="/catalogue?subtype=BALLONS"
            className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-blue-600 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1 text-center"
          >
            <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">⚽</span>
            <h3 className="text-sm sm:text-base font-black text-[#0A0F1D] uppercase font-display">
              Ballons
            </h3>
            <span className="text-[11px] font-bold text-slate-600 mt-1 group-hover:text-blue-600 transition-colors inline-block">
              Match & Entraînement →
            </span>
          </Link>

          {/* Category 4: GANTS */}
          <Link
            href="/catalogue?subtype=GANTS"
            className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-blue-600 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1 text-center"
          >
            <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">🧤</span>
            <h3 className="text-sm sm:text-base font-black text-[#0A0F1D] uppercase font-display">
              Gants
            </h3>
            <span className="text-[11px] font-bold text-slate-600 mt-1 group-hover:text-blue-600 transition-colors inline-block">
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
          <div className="bg-[#F3F4F6] p-6 rounded-3xl border border-slate-200 space-y-2 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg hover:border-blue-500 group">
            <div className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-300 inline-block">🚚</div>
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#071A35]">
              Livraison Express
            </h4>
            <p className="text-xs text-slate-500 font-medium">Partout en Mauritanie (toutes les wilayas)</p>
          </div>
          <div className="bg-[#F3F4F6] p-6 rounded-3xl border border-slate-200 space-y-2 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg hover:border-blue-500 group">
            <div className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-300 inline-block">✍️</div>
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#071A35]">
              Flocage Pro
            </h4>
            <p className="text-xs text-slate-500 font-medium">Impression nom & numéro sur-mesure</p>
          </div>
          <div className="bg-[#F3F4F6] p-6 rounded-3xl border border-slate-200 space-y-2 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg hover:border-blue-500 group">
            <div className="text-3xl mb-1 group-hover:scale-125 transition-transform duration-300 inline-block">💳</div>
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#071A35]">
              Paiement Sécurisé
            </h4>
            <p className="text-xs text-slate-500 font-medium">Bankily, Masrvi, Sedad & Cash</p>
          </div>
          <div className="bg-[#F3F4F6] p-6 rounded-3xl border border-slate-200 space-y-2 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg hover:border-blue-500 group">
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

