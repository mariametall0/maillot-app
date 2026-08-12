"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

// Supplément de flocage (5.2) — à terme configurable depuis l'admin
const PERSONALIZATION_FEE = 1500;
const MAX_NAME_LENGTH = 12;

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [variantId, setVariantId] = useState(product.variants.find((v) => v.stock > 0)?.id ?? product.variants[0]?.id ?? "");
  const [personalize, setPersonalize] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [added, setAdded] = useState(false);

  const variant = useMemo(() => product.variants.find((v) => v.id === variantId), [product, variantId]);
  const unitPrice = variant?.priceOverride ?? product.basePrice;
  const personalizationFee = personalize ? PERSONALIZATION_FEE : 0;
  const total = unitPrice + personalizationFee;

  const numberValue = Number(number);
  const numberValid = number === "" || (Number.isInteger(numberValue) && numberValue >= 0 && numberValue <= 99);

  const canAddToCart =
    !!variant &&
    variant.stock > 0 &&
    (!personalize || (name.trim().length > 0 && number !== "" && numberValid));

  function handleAddToCart() {
    if (!variant || !canAddToCart) return;
    addItem({
      productId: product.id,
      variantId: variant.id,
      productName: product.name,
      imageUrl: product.images[0]?.url ?? "",
      sizeLabel: variant.sizeLabel,
      kit: variant.kit,
      quantity: 1,
      unitPrice,
      personalizationFee,
      personalizationName: personalize ? name.trim() : undefined,
      personalizationNumber: personalize ? numberValue : undefined,
    });
    setAdded(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* Galerie photos (5.1) */}
      <div>
        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="block w-full aspect-square rounded-lg overflow-hidden bg-neutral-100 border border-black/10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- placeholder SVG data URI */}
          <img
            src={product.images[activeImage]?.url}
            alt={product.name}
            className="h-full w-full object-cover cursor-zoom-in"
          />
        </button>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(i)}
                className={`h-16 w-16 rounded border overflow-hidden ${
                  i === activeImage ? "border-blue-700" : "border-black/10"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- placeholder SVG data URI */}
                <img src={img.url} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {zoomed && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
            onClick={() => setZoomed(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- placeholder SVG data URI */}
            <img
              src={product.images[activeImage]?.url}
              alt={product.name}
              className="max-h-full max-w-full rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Infos produit + personnalisation */}
      <div>
        {product.club && <p className="text-sm text-black/50">{product.club} · {product.season}</p>}
        <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
        <p className="mt-3 text-black/70">{product.description}</p>

        <p className="mt-4 text-2xl font-bold">{formatPrice(total)}</p>

        {/* Sélection de variante */}
        <div className="mt-6">
          <p className="text-sm font-medium mb-2 capitalize">{variant?.sizeType ?? "taille"}</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                disabled={v.stock === 0}
                onClick={() => setVariantId(v.id)}
                className={`rounded-md border px-3 py-2 text-sm ${
                  v.id === variantId ? "border-blue-700 bg-blue-50" : "border-black/15"
                } ${v.stock === 0 ? "opacity-40 cursor-not-allowed line-through" : "hover:border-black/40"}`}
              >
                {v.sizeLabel}
              </button>
            ))}
          </div>
          {variant && variant.stock > 0 && variant.stock <= 3 && (
            <p className="mt-2 text-xs text-orange-600">Plus que {variant.stock} en stock</p>
          )}
        </div>

        {/* Personnalisation (5.2) */}
        {product.personalizable && (
          <div className="mt-6 rounded-lg border border-black/10 p-4">
            <label className="flex items-center gap-2 font-medium">
              <input
                type="checkbox"
                checked={personalize}
                onChange={(e) => setPersonalize(e.target.checked)}
              />
              Personnaliser (flocage nom + numéro) — +{formatPrice(PERSONALIZATION_FEE)}
            </label>

            {personalize && (
              <div className="mt-4 space-y-3">
                <div>
                  <label className="text-sm font-medium block mb-1">Nom</label>
                  <input
                    type="text"
                    value={name}
                    maxLength={MAX_NAME_LENGTH}
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                    placeholder="Ex : BARRY"
                    className="w-full rounded-md border border-black/15 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Numéro (0–99)</label>
                  <input
                    type="number"
                    min={0}
                    max={99}
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Ex : 10"
                    className="w-full rounded-md border border-black/15 px-3 py-2"
                  />
                  {!numberValid && <p className="text-xs text-red-600 mt-1">Le numéro doit être entre 0 et 99.</p>}
                </div>

                {/* Aperçu texte simple (5.2) */}
                <div className="rounded-md bg-neutral-100 p-3 text-center">
                  <p className="text-xs text-black/50 mb-1">Aperçu du flocage</p>
                  <p className="font-bold tracking-widest text-lg">
                    {name.trim() || "NOM"} · {number !== "" ? number : "N°"}
                  </p>
                </div>
                <p className="text-xs text-black/50">
                  Délai de préparation plus long pour les articles personnalisés — le flocage démarre après
                  confirmation du paiement.
                </p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className="mt-6 w-full rounded-full bg-blue-700 text-white font-semibold py-3 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-800"
        >
          {variant?.stock === 0 ? "Rupture de stock" : "Ajouter au panier"}
        </button>

        {added && (
          <div className="mt-3 flex items-center justify-between rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm">
            <span>Ajouté au panier ✅</span>
            <button onClick={() => router.push("/panier")} className="font-semibold text-blue-700 underline">
              Voir le panier
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
