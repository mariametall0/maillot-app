"use client";

import { useState, type FormEvent } from "react";
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

  // Adresse obligatoire uniquement pour le paiement mobile (5.3) : la commande
  // part directement en préparation/expédition sans appel de confirmation.
  const isMobilePayment = method === "BANKILY" || method === "MASRVI" || method === "SEDAD";
  const addressRequired = isMobilePayment;

  const phoneValid = /^[0-9]{8}$/.test(phone.trim());
  const canSubmit =
    items.length > 0 &&
    name.trim().length > 0 &&
    phoneValid &&
    !!method &&
    (!addressRequired || (ville.trim().length > 0 && quartier.trim().length > 0));

  const total = subtotal + DELIVERY_FEE;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);

    // TODO: brancher sur l'API (POST /api/orders) une fois Supabase/Prisma connectés.
    // Le statut initial dépend du mode de paiement (voir SPEC.md §5.5) :
    // - paiement mobile  -> RECUE puis CONFIRMEE dès validation du paiement
    // - paiement livraison -> RECUE puis EN_ATTENTE_CONFIRMATION_CLIENT (appel admin)
    setTimeout(() => {
      clear();
      router.push("/commande/confirmation");
    }, 600);
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
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-lg border border-black/10 bg-white p-4 space-y-4">
          <h2 className="font-semibold">{t("contactHeading")}</h2>
          <div>
            <label className="text-sm font-medium block mb-1">{t("nameLabel")}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md border border-black/15 px-3 py-2"
              placeholder={t("namePlaceholder")}
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">{t("phoneLabel")}</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              inputMode="numeric"
              className="w-full rounded-md border border-black/15 px-3 py-2"
              placeholder={t("phonePlaceholder")}
            />
            {phone.length > 0 && !phoneValid && (
              <p className="text-xs text-red-600 mt-1">{t("phoneInvalid")}</p>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-4 space-y-4">
          <h2 className="font-semibold">
            {t("addressHeading")} {addressRequired ? "" : <span className="text-black/40 font-normal">{t("optional")}</span>}
          </h2>
          <p className="text-xs text-black/50">
            {addressRequired ? t("addressNoteRequired") : t("addressNoteOptional")}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium block mb-1">{t("cityLabel")}</label>
              <input
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                required={addressRequired}
                className="w-full rounded-md border border-black/15 px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">{t("districtLabel")}</label>
              <input
                value={quartier}
                onChange={(e) => setQuartier(e.target.value)}
                required={addressRequired}
                className="w-full rounded-md border border-black/15 px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-4 space-y-3">
          <h2 className="font-semibold">{t("paymentHeading")}</h2>
          {PAYMENT_METHODS.map((m) => (
            <label key={m.value} className="flex items-center gap-3 rounded-md border border-black/10 px-3 py-2 cursor-pointer has-[:checked]:border-blue-700 has-[:checked]:bg-blue-50">
              <input
                type="radio"
                name="method"
                value={m.value}
                checked={method === m.value}
                onChange={() => setMethod(m.value)}
              />
              {m.label}
            </label>
          ))}
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-4 space-y-1 text-sm">
          <div className="flex justify-between"><span>{t("subtotal")}</span><span>{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between"><span>{t("delivery")}</span><span>{formatPrice(DELIVERY_FEE)}</span></div>
          <div className="flex justify-between font-bold text-base pt-1 border-t border-black/10 mt-1">
            <span>{t("total")}</span><span>{formatPrice(total)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="w-full rounded-full bg-blue-700 text-white font-semibold py-3 disabled:opacity-40"
        >
          {submitting ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}
