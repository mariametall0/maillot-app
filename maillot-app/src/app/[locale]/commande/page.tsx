"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import type { PaymentMethod } from "@/lib/types";

const DELIVERY_FEE = 1000; // Nouakchott uniquement — à valider (voir SPEC.md §8)

export default function CommandePage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const t = useTranslations("Checkout");

  const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
    { value: "BANKILY", label: "Bankily" },
    { value: "MASRVI", label: "Masrvi" },
    { value: "SEDAD", label: "Sedad" },
    { value: "LIVRAISON", label: t("paymentDelivery") },
  ];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ville, setVille] = useState("Nouakchott");
  const [quartier, setQuartier] = useState("");
  const [method, setMethod] = useState<PaymentMethod | "">("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.customer) {
          if (data.customer.name) setName(data.customer.name);
          if (data.customer.phone) setPhone(data.customer.phone);
          if (data.customer.address) setQuartier(data.customer.address);
        }
      })
      .catch(() => {});
  }, []);

  const phoneValid = /^[0-9]{8}$/.test(phone.trim());
  const nameValid = name.trim().length >= 2;
  const quartierValid = quartier.trim().length >= 2;

  const canSubmit =
    items.length > 0 &&
    nameValid &&
    phoneValid &&
    quartierValid &&
    !!method;

  const total = subtotal + DELIVERY_FEE;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          customerPhone: phone.trim(),
          customerAddress: `${ville.trim()}, ${quartier.trim()}`,
          paymentMethod: method,
          items: items.map((i) => ({
            productId: i.productId,
            productName: i.productName,
            size: i.sizeLabel || "Standard",
            quantity: i.quantity,
            price: i.unitPrice,
            flocage: i.personalizationName ? `${i.personalizationName} #${i.personalizationNumber || ""}` : undefined,
          })),
          totalAmount: total,
        }),
      });

      if (res.ok) {
        clear();
        router.push("/commande/confirmation");
      } else {
        alert("Erreur lors de la validation de la commande. Veuillez réessayer.");
        setSubmitting(false);
      }
    } catch {
      alert("Erreur réseau. Vérifiez votre connexion.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">{t("emptyTitle")}</h1>
        <Link href="/catalogue" className="text-blue-700 underline">
          {t("backToCatalogue")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-black text-[#071A35] uppercase tracking-tight mb-2">Finaliser ma commande</h1>
      <p className="text-sm text-slate-500 mb-8 font-medium">
        Renseignez vos coordonnées de livraison. Tous les champs marqués d&apos;un astérisque (*) sont obligatoires.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact info */}
        <div className="rounded-3xl border border-slate-200 bg-[#F3F4F6] p-6 space-y-4 shadow-xs">
          <h2 className="font-black text-sm text-[#071A35] uppercase tracking-wider">👤 Vos Coordonnées</h2>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1 uppercase">Nom & Prénom *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl bg-white border border-slate-300 px-4 py-3 text-sm font-bold text-[#071A35] outline-none focus:border-[#16A34A]"
              placeholder="Ex: Mohamed Ould Ahmed"
            />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1 uppercase">Numéro de Téléphone (8 chiffres) *</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              maxLength={8}
              inputMode="numeric"
              className="w-full rounded-xl bg-white border border-slate-300 px-4 py-3 text-sm font-bold text-[#071A35] outline-none focus:border-[#16A34A]"
              placeholder="Ex: 22345678"
            />
            {phone.length > 0 && !phoneValid && (
              <p className="text-xs text-red-600 mt-1 font-bold">⚠️ Le numéro doit comporter exactement 8 chiffres.</p>
            )}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="rounded-3xl border border-slate-200 bg-[#F3F4F6] p-6 space-y-4 shadow-xs">
          <h2 className="font-black text-sm text-[#071A35] uppercase tracking-wider">📍 Adresse de Livraison (Mauritanie)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1 uppercase">Ville / Wilaya *</label>
              <select
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                required
                className="w-full rounded-xl bg-white border border-slate-300 px-4 py-3 text-sm font-bold text-[#071A35] outline-none focus:border-[#16A34A] cursor-pointer"
              >
                <option value="Nouakchott">Nouakchott</option>
                <option value="Nouadhibou">Nouadhibou</option>
                <option value="Rosso">Rosso</option>
                <option value="Kiffa">Kiffa</option>
                <option value="Kaédi">Kaédi</option>
                <option value="Atar">Atar</option>
                <option value="Zouerate">Zouerate</option>
                <option value="Néma">Néma</option>
                <option value="Sélibaby">Sélibaby</option>
                <option value="Akjoujt">Akjoujt</option>
                <option value="Tidjikja">Tidjikja</option>
                <option value="Aioun">Aioun</option>
                <option value="Autre ville">Autre région en Mauritanie</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1 uppercase">Quartier ou Adresse précise *</label>
              <input
                value={quartier}
                onChange={(e) => setQuartier(e.target.value)}
                required
                placeholder="Ex: Tevragh Zeina / Cansado / Centre-ville..."
                className="w-full rounded-xl bg-white border border-slate-300 px-4 py-3 text-sm font-bold text-[#071A35] outline-none focus:border-[#16A34A]"
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="rounded-3xl border border-slate-200 bg-[#F3F4F6] p-6 space-y-3 shadow-xs">
          <h2 className="font-black text-sm text-[#071A35] uppercase tracking-wider">💳 Mode de Paiement *</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PAYMENT_METHODS.map((m) => (
              <label
                key={m.value}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 cursor-pointer font-bold text-sm transition-all ${
                  method === m.value
                    ? "bg-[#071A35] text-white border-[#071A35] shadow-xs"
                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                }`}
              >
                <input
                  type="radio"
                  name="method"
                  value={m.value}
                  checked={method === m.value}
                  onChange={() => setMethod(m.value)}
                  className="accent-[#16A34A] w-4 h-4"
                />
                {m.label}
              </label>
            ))}
          </div>
        </div>

        {/* Total Summary */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-2 text-sm shadow-xs">
          <div className="flex justify-between text-slate-600 font-medium"><span>Sous-total articles :</span><span>{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between text-slate-600 font-medium"><span>Frais de livraison express (Mauritanie) :</span><span>{formatPrice(DELIVERY_FEE)}</span></div>
          <div className="flex justify-between font-black text-lg text-[#071A35] pt-3 border-t border-slate-100 mt-2">
            <span>Total TTC :</span><span className="text-[#16A34A]">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Missing fields warning */}
        {!canSubmit && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 space-y-1 font-semibold">
            <p className="font-bold flex items-center gap-1.5">⚠️ Veuillez compléter les informations suivantes pour commander :</p>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-700">
              {!nameValid && <li>Nom & Prénom (au moins 2 caractères)</li>}
              {!phoneValid && <li>Numéro de téléphone valide (exactement 8 chiffres)</li>}
              {!quartierValid && <li>Quartier de livraison</li>}
              {!method && <li>Choisissez un moyen de paiement</li>}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className={`w-full rounded-2xl text-white font-black text-sm uppercase tracking-wider py-4 shadow-md transition-all ${
            canSubmit
              ? "btn-green-action cursor-pointer"
              : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-60"
          }`}
        >
          {submitting
            ? "Validation en cours..."
            : canSubmit
            ? `Confirmer & Valider la commande (${formatPrice(total)}) →`
            : "🔒 Remplir tous les champs obligatoires (*)"}
        </button>
      </form>
    </div>
  );
}
