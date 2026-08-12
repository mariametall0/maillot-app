"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { lineKeyOf } from "@/lib/cart-line-key";

export default function PanierPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Ton panier est vide</h1>
        <p className="text-black/60 mb-6">Parcours le catalogue pour trouver ton maillot.</p>
        <Link href="/catalogue" className="inline-block rounded-full bg-blue-700 text-white font-semibold px-6 py-3">
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Panier</h1>

      <div className="space-y-4">
        {items.map((item) => {
          const key = lineKeyOf(item);
          const personalizationKey = `${item.personalizationName ?? ""}::${item.personalizationNumber ?? ""}`;
          return (
            <div key={key} className="flex gap-4 rounded-lg border border-black/10 bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- placeholder SVG data URI */}
              <img src={item.imageUrl} alt="" className="h-20 w-20 rounded object-cover bg-neutral-100" />
              <div className="flex-1">
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-black/50">Taille : {item.sizeLabel}</p>
                {item.personalizationName && (
                  <p className="text-sm text-black/50">
                    Flocage : {item.personalizationName} · {item.personalizationNumber}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <label className="text-sm text-black/50">Qté</label>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.variantId, personalizationKey, Number(e.target.value))
                    }
                    className="w-16 rounded border border-black/15 px-2 py-1 text-sm"
                  />
                  <button
                    onClick={() => removeItem(item.variantId, personalizationKey)}
                    className="ml-auto text-sm text-red-600 hover:underline"
                  >
                    Retirer
                  </button>
                </div>
              </div>
              <p className="font-semibold whitespace-nowrap">
                {formatPrice((item.unitPrice + item.personalizationFee) * item.quantity)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-lg border border-black/10 bg-white p-4">
        <div>
          <p className="text-sm text-black/50">Sous-total (livraison calculée à la commande)</p>
          <p className="text-xl font-bold">{formatPrice(subtotal)}</p>
        </div>
        <Link
          href="/commande"
          className="rounded-full bg-blue-700 text-white font-semibold px-6 py-3 hover:bg-blue-800"
        >
          Passer commande
        </Link>
      </div>
    </div>
  );
}
