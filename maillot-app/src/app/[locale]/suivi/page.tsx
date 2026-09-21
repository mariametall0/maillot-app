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

interface OrderItem {
  productName: string;
  size: string;
  quantity: number;
  flocage?: string;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerAddress: string;
  paymentMethod: string;
  status: string;
  totalAmount: number;
  items: OrderItem[];
}

export default function SuiviPage() {
  const t = useTranslations("Tracking");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSearched(false);
    try {
      const res = await fetch(`/api/orders?phone=${encodeURIComponent(phone.trim())}`);
      if (res.ok) {
        setOrders(await res.json());
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    }
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
        <div className="mt-8 space-y-4">
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-500 font-semibold">
              Aucune commande trouvée pour ce numéro.
            </div>
          ) : (
            orders.map((o) => (
              <div key={o.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#071A35]">{o.id}</span>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30 uppercase">
                    {o.status === "EN_ATTENTE" ? "⏳ En attente" : o.status === "CONFIRMEE" ? "✅ Confirmée" : o.status === "EXPEDIEE" ? "🚚 Expédiée" : o.status === "LIVREE" ? "📦 Livrée" : o.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">📍 Adresse : {o.customerAddress} · 💳 Paiement : {o.paymentMethod}</p>
                <div className="border-t border-slate-100 pt-3 space-y-1">
                  {o.items?.map((item: OrderItem, idx: number) => (
                    <p key={idx} className="text-xs font-bold text-[#1F2937]">
                      • {item.productName} (Taille {item.size}) × {item.quantity}
                      {item.flocage && <span className="text-[#16A34A]"> — Flocage: {item.flocage}</span>}
                    </p>
                  ))}
                </div>
                <p className="text-sm font-black text-[#071A35] pt-2 border-t border-slate-100">
                  Total : {o.totalAmount?.toLocaleString()} MRU
                </p>
              </div>
            ))
          )}
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
