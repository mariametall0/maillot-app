"use client";

import { useState, type FormEvent } from "react";

// Statuts définis en SPEC.md §5.5
const STATUS_LABELS: Record<string, string> = {
  RECUE: "Reçue",
  EN_ATTENTE_CONFIRMATION_CLIENT: "En attente de confirmation (on va t'appeler)",
  CONFIRMEE: "Confirmée",
  EN_PREPARATION: "En préparation",
  EXPEDIEE: "Expédiée",
  LIVREE: "Livrée",
  ANNULEE: "Annulée",
};

export default function SuiviPage() {
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
      <h1 className="text-2xl font-bold mb-2">Suivre ma commande</h1>
      <p className="text-black/60 mb-6">
        Entre le numéro de téléphone utilisé lors de la commande — pas besoin de compte.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          inputMode="numeric"
          placeholder="Ex : 22345678"
          required
          className="flex-1 rounded-md border border-black/15 px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-700 text-white font-semibold px-5 py-2 disabled:opacity-40"
        >
          {loading ? "..." : "Rechercher"}
        </button>
      </form>

      {searched && (
        <div className="mt-8 rounded-lg border border-black/10 bg-white p-6 text-center text-black/60">
          Aucune commande trouvée pour ce numéro pour l&apos;instant — le suivi en temps réel sera actif dès
          que le catalogue et les commandes seront connectés à la base de données (Supabase).
        </div>
      )}

      <div className="mt-10 text-sm text-black/50">
        <p className="font-medium mb-2">Statuts possibles :</p>
        <ul className="space-y-1">
          {Object.values(STATUS_LABELS).map((label) => (
            <li key={label}>· {label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
