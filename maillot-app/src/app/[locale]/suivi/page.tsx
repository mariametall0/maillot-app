"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

const STATUS_KEYS = [
  "RECUE",
  "EN_ATTENTE_CONFIRMATION_CLIENT",
  "CONFIRMEE",
  "EN_PREPARATION",
  "EXPEDIEE",
  "LIVREE",
  "ANNULEE",
] as const;

export default function SuiviPage() {
  const t = useTranslations("Tracking");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSearched(false);
    // TODO: brancher sur GET /api/orders?phone=... une fois Supabase/Prisma connectés.
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
    setSearched(true);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
      <p className="text-black/60 mb-6">{t("subtitle")}</p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          inputMode="numeric"
          placeholder={t("phonePlaceholder")}
          required
          className="flex-1 rounded-md border border-black/15 px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-700 text-white font-semibold px-5 py-2 disabled:opacity-40"
        >
          {loading ? t("searching") : t("search")}
        </button>
      </form>

      {searched && (
        <div className="mt-8 rounded-lg border border-black/10 bg-white p-6 text-center text-black/60">
          {t("notFound")}
        </div>
      )}

      <div className="mt-10 text-sm text-black/50">
        <p className="font-medium mb-2">{t("statusesHeading")}</p>
        <ul className="space-y-1">
          {STATUS_KEYS.map((key) => (
            <li key={key}>· {t(`status.${key}`)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
