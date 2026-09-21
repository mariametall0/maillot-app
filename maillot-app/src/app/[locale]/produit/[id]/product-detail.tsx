"use client";

import { useMemo, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import type { Product, PaymentMethod } from "@/lib/types";

const PERSONALIZATION_FEE = 1500;
const MAX_NAME_LENGTH = 12;

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const t = useTranslations("Product");

  const [activeImage, setActiveImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [variantId, setVariantId] = useState(
    product.variants.find((v) => v.stock > 0)?.id ?? product.variants[0]?.id ?? ""
  );
  const [personalize, setPersonalize] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [added, setAdded] = useState(false);

  // Formulaire commande rapide 1-Clic
  const [showQuickOrder, setShowQuickOrder] = useState(false);
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custQuartier, setCustQuartier] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("BANKILY");
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.customer) {
          if (data.customer.name) setCustName(data.customer.name);
          if (data.customer.phone) setCustPhone(data.customer.phone);
          if (data.customer.address) setCustQuartier(data.customer.address);
        }
      })
      .catch(() => {});
  }, []);

  const variant = useMemo(
    () => product.variants.find((v) => v.id === variantId),
    [product, variantId]
  );
  const unitPrice = variant?.priceOverride ?? product.basePrice;
  const personalizationFee = personalize ? PERSONALIZATION_FEE : 0;
  const total = unitPrice + personalizationFee;

  const numberValue = Number(number);
  const numberValid =
    number === "" || (Number.isInteger(numberValue) && numberValue >= 0 && numberValue <= 99);

  const canAddToCart =
    !!variant &&
    variant.stock > 0 &&
    (!personalize || (name.trim().length > 0 && number !== "" && numberValid));

  const phoneValid = /^[0-9]{8}$/.test(custPhone.trim());
  const canSubmitQuickOrder =
    canAddToCart &&
    custName.trim().length > 0 &&
    phoneValid &&
    custQuartier.trim().length > 0;

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

  async function handleQuickOrderSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmitQuickOrder || !variant) return;
    setOrdering(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: custName.trim(),
          customerPhone: custPhone.trim(),
          customerAddress: `Nouakchott, ${custQuartier.trim()}`,
          paymentMethod: paymentMethod,
          items: [
            {
              productId: product.id,
              productName: product.name,
              size: variant.sizeLabel,
              quantity: 1,
              price: total,
              flocage: personalize ? `${name.trim()} #${number}` : undefined,
            },
          ],
          totalAmount: total + 1000, // + livraison
        }),
      });

      if (res.ok) {
        router.push("/commande/confirmation");
      } else {
        alert("Erreur lors de la commande. Réessayez.");
        setOrdering(false);
      }
    } catch {
      alert("Erreur réseau. Vérifiez votre connexion.");
      setOrdering(false);
    }
  }

  return (
    <div className="bg-white min-h-screen text-[#1F2937] py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Galerie Photos */}
        <div>
          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="block w-full aspect-square rounded-3xl overflow-hidden bg-[#F3F4F6] border border-slate-200 shadow-md relative group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[activeImage]?.url}
              alt={product.name}
              className="h-full w-full object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute bottom-4 right-4 bg-[#071A35]/90 text-white text-[11px] font-black px-4 py-2 rounded-full backdrop-blur-md shadow-xs">
              🔍 Zoom HD
            </span>
          </button>

          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-20 rounded-2xl border-2 overflow-hidden transition-all ${
                    i === activeImage ? "border-[#16A34A] scale-105 shadow-md" : "border-slate-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {zoomed && (
            <div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 backdrop-blur-md"
              onClick={() => setZoomed(false)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[activeImage]?.url}
                alt={product.name}
                className="max-h-[90vh] max-w-[90vw] rounded-3xl shadow-2xl object-contain border border-slate-700"
              />
            </div>
          )}
        </div>

        {/* Formulaire & Choix des Informations */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            {product.club && (
              <span className="text-xs font-black uppercase tracking-widest text-[#16A34A] bg-[#16A34A]/10 px-3.5 py-1.5 rounded-full border border-[#16A34A]/20">
                {product.club} {product.season && `· ${product.season}`}
              </span>
            )}
            <h1 className="text-3xl sm:text-5xl font-black text-[#071A35] font-display uppercase tracking-tight mt-3">
              {product.name}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {product.description}
            </p>

            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-4xl font-black text-[#071A35] font-display">{formatPrice(total)}</span>
              {personalize && (
                <span className="text-xs font-black text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-lg border border-[#16A34A]/20">
                  (Flocage officiel inclus +{formatPrice(PERSONALIZATION_FEE)})
                </span>
              )}
            </div>
          </div>

          {/* 1. Sélection de la Taille */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-black uppercase tracking-wider text-[#071A35] block">
              1. Choisir la {t(`sizeType.${variant?.sizeType ?? "taille"}`)} * :
            </label>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  disabled={v.stock === 0}
                  onClick={() => setVariantId(v.id)}
                  className={`rounded-2xl border px-6 py-3.5 text-sm font-black transition-all ${
                    v.id === variantId
                      ? "bg-[#071A35] text-white border-[#071A35] shadow-md scale-105"
                      : "bg-[#F3F4F6] text-slate-700 border-slate-200 hover:border-slate-400 hover:text-[#071A35]"
                  } ${v.stock === 0 ? "opacity-30 cursor-not-allowed line-through bg-slate-100" : ""}`}
                >
                  {v.sizeLabel}
                </button>
              ))}
            </div>
            {variant && variant.stock > 0 && variant.stock <= 3 && (
              <p className="text-xs font-black text-amber-600">
                ⚠️ {t("stockLow", { count: variant.stock })}
              </p>
            )}
          </div>

          {/* 2. Personnalisation Flocage (Nom + Numéro) */}
          {product.personalizable && (
            <div className="bg-[#F3F4F6] rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={personalize}
                  onChange={(e) => setPersonalize(e.target.checked)}
                  className="w-5 h-5 accent-[#16A34A] rounded cursor-pointer"
                />
                <span className="text-sm font-extrabold text-[#071A35]">
                  ✍️ Personnaliser avec Flocage Nom + Numéro (+{formatPrice(PERSONALIZATION_FEE)})
                </span>
              </label>

              {personalize && (
                <div className="space-y-4 pt-4 border-t border-slate-200 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-1">
                        Nom à floquer
                      </label>
                      <input
                        type="text"
                        value={name}
                        maxLength={MAX_NAME_LENGTH}
                        onChange={(e) => setName(e.target.value.toUpperCase())}
                        placeholder="Ex : BARRY"
                        className="w-full rounded-xl bg-white border border-slate-300 text-[#071A35] px-4 py-3 text-sm font-black outline-none focus:border-[#16A34A] uppercase"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-1">
                        Numéro (0–99)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={99}
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Ex : 10"
                        className="w-full rounded-xl bg-white border border-slate-300 text-[#071A35] px-4 py-3 text-sm font-black outline-none focus:border-[#16A34A]"
                      />
                    </div>
                  </div>

                  {/* Aperçu Flocage Visuel */}
                  <div className="rounded-2xl bg-[#071A35] p-6 text-center border border-[#0F2D5A] relative overflow-hidden shadow-inner">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#16A34A] mb-1">
                      Aperçu Flocage Officiel Dos
                    </p>
                    <p className="font-black tracking-widest text-3xl text-white uppercase font-display">
                      {name.trim() || "VOTRE NOM"}
                    </p>
                    <p className="font-black text-5xl text-[#16A34A] mt-1 font-display">
                      {number !== "" ? number : "10"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. Boutons d'Action (Ajout Panier & Commande Rapide Directe) */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className="w-full rounded-2xl btn-green-action text-white font-black text-sm uppercase tracking-wider py-4 shadow-md disabled:opacity-40 disabled:cursor-not-allowed active:scale-98"
              >
                {variant?.stock === 0 ? "Rupture de stock" : "Ajouter au panier 🛒"}
              </button>

              <button
                onClick={() => setShowQuickOrder(!showQuickOrder)}
                disabled={!canAddToCart}
                className="w-full rounded-2xl bg-[#071A35] hover:bg-[#0A2346] text-white font-black text-sm uppercase tracking-wider py-4 shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-98"
              >
                ⚡ Commander directement
              </button>
            </div>

            {added && (
              <div className="flex items-center justify-between rounded-2xl bg-[#16A34A]/10 border border-[#16A34A]/30 p-4 text-xs font-black text-[#16A34A] animate-in fade-in duration-200">
                <span>✅ Produit ajouté au panier avec succès !</span>
                <button
                  onClick={() => router.push("/panier")}
                  className="underline text-[#071A35] font-black hover:text-[#16A34A]"
                >
                  Voir mon panier →
                </button>
              </div>
            )}
          </div>

          {/* Formulaire de Commande Rapide Directe (1-Clic) */}
          {showQuickOrder && (
            <div className="bg-[#F3F4F6] rounded-3xl border border-slate-300 p-6 space-y-4 shadow-md animate-in slide-in-from-top duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-300">
                <h3 className="font-black text-base text-[#071A35] uppercase tracking-tight flex items-center gap-2">
                  ⚡ Commande Rapide en 1-Clic
                </h3>
                <button onClick={() => setShowQuickOrder(false)} className="text-slate-500 hover:text-black font-black">
                  ✕
                </button>
              </div>

              <form onSubmit={handleQuickOrderSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase text-slate-700 block mb-1">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    placeholder="Ex: Mohamed Ould Ahmed"
                    className="w-full rounded-xl bg-white border border-slate-300 text-[#071A35] px-4 py-3 text-sm font-bold outline-none focus:border-[#16A34A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-black uppercase text-slate-700 block mb-1">
                    Téléphone (8 chiffres) *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={8}
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    placeholder="Ex: 22345678"
                    className="w-full rounded-xl bg-white border border-slate-300 text-[#071A35] px-4 py-3 text-sm font-bold outline-none focus:border-[#16A34A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-black uppercase text-slate-700 block mb-1">
                      Ville / Wilaya *
                    </label>
                    <input
                      type="text"
                      required
                      value={custQuartier}
                      onChange={(e) => setCustQuartier(e.target.value)}
                      placeholder="Ex: Nouakchott / Nouadhibou / Rosso..."
                      className="w-full rounded-xl bg-white border border-slate-300 text-[#071A35] px-4 py-3 text-sm font-bold outline-none focus:border-[#16A34A]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase text-slate-700 block mb-1">
                      Quartier / Adresse précise *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Tevragh Zeina, Cansado, Médina..."
                      className="w-full rounded-xl bg-white border border-slate-300 text-[#071A35] px-4 py-3 text-sm font-bold outline-none focus:border-[#16A34A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase text-slate-700 block mb-2">
                    Moyen de Paiement *
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-extrabold">
                    {[
                      ["BANKILY", "🟢 Bankily"],
                      ["MASRVI", "🔴 Masrvi"],
                      ["SEDAD", "🔵 Sedad"],
                      ["LIVRAISON", "💵 Cash à la livraison"],
                    ].map(([val, label]) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setPaymentMethod(val as PaymentMethod)}
                        className={`p-3 rounded-xl border transition-all text-left ${
                          paymentMethod === val
                            ? "bg-[#071A35] text-white border-[#071A35] shadow-xs"
                            : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Validation status feedback */}
                {!canSubmitQuickOrder && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 space-y-1 font-semibold">
                    <p className="font-bold flex items-center gap-1.5">⚠️ Informations obligatoires manquantes :</p>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-700">
                      {custName.trim().length < 2 && <li>Nom & Prénom (au moins 2 caractères)</li>}
                      {!phoneValid && <li>Numéro de téléphone valide (exactement 8 chiffres)</li>}
                      {custQuartier.trim().length < 2 && <li>Ville et quartier de livraison en Mauritanie</li>}
                      {personalize && (name.trim().length === 0 || number === "" || !numberValid) && (
                        <li>Flocage complet : Nom et Numéro valide (0-99)</li>
                      )}
                    </ul>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!canSubmitQuickOrder || ordering}
                  className={`w-full rounded-2xl text-white font-black text-sm uppercase tracking-wider py-4 shadow-md transition-all ${
                    canSubmitQuickOrder
                      ? "btn-green-action cursor-pointer"
                      : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60"
                  }`}
                >
                  {ordering
                    ? "Validation en cours..."
                    : canSubmitQuickOrder
                    ? `Confirmer & Valider ma commande (${formatPrice(total + 1000)}) →`
                    : "🔒 Remplir tous les champs pour commander"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

