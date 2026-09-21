import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { getFilteredProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

type SearchParams = {
  category?: string;
  subtype?: string;
  club?: string;
  flocage?: string;
};

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { category, subtype, club, flocage } = params;

  const isFlocage = flocage === "true";

  const products = await getFilteredProducts({
    category,
    subtype,
    club,
    flocage: isFlocage ? true : undefined,
  });

  const hasActiveFilter = !!(category || subtype || club || flocage);

  return (
    <div className="bg-white min-h-screen text-[#1F2937] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="text-left mb-10">
          <span className="text-xs font-black tracking-widest uppercase text-[#16A34A] bg-[#16A34A]/10 px-4 py-1.5 rounded-full border border-[#16A34A]/20">
            BOUTIQUE & CATALOGUE OFFICIEL
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-[#071A35] font-display uppercase tracking-tight mt-3">
            {category?.toUpperCase() === "MAILLOT"
              ? "Maillots de Football & Clubs"
              : category?.toUpperCase() === "EQUIPEMENT"
              ? "Équipements & Accessoires Pro"
              : subtype?.toUpperCase() === "CHAUSSURES"
              ? "Chaussures & Crampons Pro"
              : subtype?.toUpperCase() === "BALLONS"
              ? "Ballons de Match Officiels"
              : subtype?.toUpperCase() === "GANTS"
              ? "Gants de Gardien de But"
              : club?.toLowerCase() === "mourabitounes"
              ? "Équipe Nationale de Mauritanie"
              : isFlocage
              ? "Promotions & Flocage Offert"
              : "Tous nos maillots & équipements"}
          </h1>
          <p className="text-sm font-semibold text-slate-500 mt-2">
            Flocage Nom + Numéro officiel. Expédition express partout en Mauritanie (Nouakchott, Nouadhibou et toutes les wilayas).
          </p>
        </div>

        {/* Filter Pills Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 text-xs sm:text-sm font-bold">
          <FilterLink href="/catalogue" active={!hasActiveFilter}>
            Tous les produits
          </FilterLink>
          <FilterLink
            href="/catalogue?category=MAILLOT"
            active={category?.toUpperCase() === "MAILLOT"}
          >
            ⚽ Maillots
          </FilterLink>
          <FilterLink
            href="/catalogue?subtype=CHAUSSURES"
            active={subtype?.toUpperCase() === "CHAUSSURES"}
          >
            👟 Chaussures
          </FilterLink>
          <FilterLink
            href="/catalogue?subtype=BALLONS"
            active={subtype?.toUpperCase() === "BALLONS"}
          >
            ⚽ Ballons
          </FilterLink>
          <FilterLink
            href="/catalogue?subtype=GANTS"
            active={subtype?.toUpperCase() === "GANTS"}
          >
            🧤 Gants
          </FilterLink>
          <FilterLink
            href="/catalogue?club=Mourabitounes"
            active={club?.toLowerCase() === "mourabitounes"}
          >
            🇲🇷 Mauritanie
          </FilterLink>
          <FilterLink href="/catalogue?flocage=true" active={isFlocage}>
            ✍️ Promotions
          </FilterLink>
        </div>

        {/* Products Count & Filter Reset */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 text-xs font-bold text-slate-500">
          <span>
            {products.length} produit{products.length > 1 ? "s" : ""} trouvé{products.length > 1 ? "s" : ""}
          </span>
          {hasActiveFilter && (
            <Link
              href="/catalogue"
              className="text-[#16A34A] hover:text-[#071A35] uppercase tracking-wider underline underline-offset-4 font-black"
            >
              Réinitialiser les filtres ✕
            </Link>
          )}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-24 bg-[#F3F4F6] rounded-3xl border border-slate-200 space-y-4">
            <div className="text-5xl">🔍</div>
            <h3 className="text-xl font-black text-[#071A35] font-display uppercase">
              Aucun produit trouvé dans cette catégorie
            </h3>
            <p className="text-sm text-slate-500 font-medium max-w-md mx-auto">
              Essayez de sélectionner un autre filtre ou découvrez tout notre catalogue.
            </p>
            <Link
              href="/catalogue"
              className="inline-block btn-green-action text-white text-xs font-black uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-md"
            >
              Voir tout le catalogue
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-2xl px-6 py-3 transition-all text-xs sm:text-sm font-extrabold ${
        active
          ? "bg-[#071A35] text-white shadow-md scale-105"
          : "bg-[#F3F4F6] text-slate-700 border border-slate-200 hover:border-slate-400 hover:text-[#071A35]"
      }`}
    >
      {children}
    </Link>
  );
}

