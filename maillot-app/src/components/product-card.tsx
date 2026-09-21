"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const mainImage = product.images[0]?.url || "/images/products/maillot_domicile.jpg";
  const firstVariant = product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!firstVariant) return;

    addItem({
      productId: product.id,
      variantId: firstVariant.id,
      productName: product.name,
      imageUrl: mainImage,
      sizeLabel: firstVariant.sizeLabel,
      kit: firstVariant.kit,
      quantity: 1,
      unitPrice: product.basePrice,
      personalizationFee: 0,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWished(!wished);
  };

  const discount = product.discountPercent || (product.originalPrice ? Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100) : null);

  return (
    <div className="numero10-card group flex flex-col justify-between overflow-hidden relative bg-white border border-slate-200 rounded-3xl transition-all duration-300 hover:shadow-xl hover:border-emerald-600">
      {/* Top Image Container with Light Gray Background */}
      <div className="aspect-square relative bg-[#F3F4F6] overflow-hidden flex items-center justify-center p-4">
        {/* Discount Badge */}
        {discount ? (
          <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-lg tracking-wider shadow-sm animate-pulse-glow">
            -{discount}%
          </div>
        ) : product.personalizable ? (
          <div className="absolute top-3 left-3 z-10 bg-[#071A35] text-emerald-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg tracking-wider border border-emerald-500/30">
            ✍️ FLOCAGE
          </div>
        ) : null}

        {/* Wishlist Heart Button with Bounce */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-red-500 transition-all shadow-xs hover:scale-115 active:scale-90"
          title="Ajouter aux favoris"
        >
          {wished ? (
            <span className="text-red-500 text-base animate-pop-in">❤️</span>
          ) : (
            <span className="text-slate-400 text-base hover:text-red-500">♡</span>
          )}
        </button>

        {/* Product Image with Zoom on Card Hover */}
        <Link href={`/produit/${product.id}`} className="w-full h-full flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-1 transition-transform duration-500 ease-out"
          />
        </Link>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div>
          {/* Category / Subtitle */}
          <p className="text-[11px] font-extrabold text-[#16A34A] uppercase tracking-wider group-hover:tracking-widest transition-all">
            {product.club || product.subtype || product.category}
          </p>

          {/* Product Name */}
          <Link href={`/produit/${product.id}`}>
            <h3 className="text-xs sm:text-sm font-black text-[#1F2937] group-hover:text-[#16A34A] transition-colors line-clamp-2 mt-0.5 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Star Ratings */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex text-amber-400 text-xs tracking-tighter">
              ★★★★★
            </div>
            <span className="text-[10px] font-bold text-slate-600">
              ({product.reviewCount || 24})
            </span>
          </div>
        </div>

        {/* Price & Action Section */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          {/* Prices */}
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-[#1F2937]">
              {formatPrice(product.basePrice)}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-bold text-slate-600 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Green Quick Add Button with Pop Animation */}
          <button
            onClick={handleQuickAdd}
            className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              added
                ? "bg-[#071A35] text-emerald-400 scale-102 shadow-lg"
                : "btn-green-action shadow-md active:scale-95"
            }`}
          >
            <span className={added ? "animate-bounce" : ""}>🛒</span>
            <span>{added ? "Ajouté au panier ! ✓" : "Ajouter au panier"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
