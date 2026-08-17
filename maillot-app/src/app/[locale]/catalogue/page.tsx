import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllProducts, getProductsByCategory } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import type { ProductCategory } from "@/lib/types";

type SearchParams = { category?: string };

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { category } = await searchParams;
  const activeCategory = category as ProductCategory | undefined;

  const [products, t] = await Promise.all([
    activeCategory ? getProductsByCategory(activeCategory) : getAllProducts(),
    getTranslations("Catalogue"),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
      <p className="text-black/60 mb-6">
        {/* Filtres avancés (club, équipe, taille, prix) à brancher une fois le catalogue connecté à la base */}
        {t("subtitle")}
      </p>

      <div className="flex gap-2 mb-8 text-sm font-medium">
        <FilterLink href="/catalogue" active={!activeCategory}>
          {t("all")}
        </FilterLink>
        <FilterLink href="/catalogue?category=MAILLOT" active={activeCategory === "MAILLOT"}>
          {t("jerseys")}
        </FilterLink>
        <FilterLink href="/catalogue?category=EQUIPEMENT" active={activeCategory === "EQUIPEMENT"}>
          {t("equipment")}
        </FilterLink>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
          return (
            <Link
              key={product.id}
              href={`/produit/${product.id}`}
              className="group rounded-lg border border-black/10 bg-white overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square relative bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element -- placeholder SVG data URI */}
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform"
                />
                {totalStock === 0 && (
                  <span className="absolute top-2 left-2 rounded bg-black/70 text-white text-xs px-2 py-1">
                    {t("outOfStock")}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                {product.club && <p className="text-xs text-black/50">{product.club}</p>}
                <p className="text-sm text-black/60 mt-1">{formatPrice(product.basePrice)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function FilterLink({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 border ${
        active ? "bg-blue-700 text-white border-blue-700" : "border-black/10 hover:bg-black/5"
      }`}
    >
      {children}
    </Link>
  );
}
