"use client";

import { useEffect, useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { formatPrice } from "@/lib/format";

type CustomerProfile = {
  id: string;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
};

type OrderItem = {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
  flocage?: string;
};

type Order = {
  id: string;
  createdAt: string;
  status: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  paymentMethod: string;
  items: OrderItem[];
  totalAmount: number;
};

const STATUS_LABELS: Record<string, string> = {
  EN_ATTENTE: "⏳ En attente",
  CONFIRMEE: "✅ Confirmée",
  EXPEDIEE: "🚚 Expédiée",
  LIVREE: "📦 Livrée",
  ANNULEE: "❌ Annulée",
};

export default function CustomerAccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (data.authenticated && data.customer) {
          setCustomer(data.customer);
          setOrders(data.orders || []);
        } else {
          router.push("/compte/login");
        }
      } catch {
        router.push("/compte/login");
      }
      setLoading(false);
    }
    loadData();
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-slate-500 font-bold text-sm">Chargement de votre compte...</div>
      </div>
    );
  }

  if (!customer) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Header Profile */}
      <div className="bg-[#071A35] rounded-3xl p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md mb-8">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#16A34A] bg-[#16A34A]/10 px-3.5 py-1.5 rounded-full border border-[#16A34A]/20">
            Espace Client
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-3">
            Bonjour, {customer.name} 👋
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            📞 {customer.phone} · 📍 {customer.address || "Mauritanie"}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/catalogue"
            className="rounded-2xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-black uppercase px-5 py-3 transition-all shadow-xs"
          >
            Boutique ⚽
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-3 transition-all"
          >
            Déconnexion 🚪
          </button>
        </div>
      </div>

      {/* Orders History */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#071A35] uppercase tracking-tight">
            📦 Mes Commandes ({orders.length})
          </h2>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-[#F3F4F6] p-12 text-center text-slate-500 space-y-4">
            <div className="text-4xl">🛍️</div>
            <p className="font-bold text-sm">Vous n&apos;avez pas encore passé de commande.</p>
            <Link
              href="/catalogue"
              className="inline-block rounded-2xl btn-green-action text-white font-black text-xs uppercase px-6 py-3.5 shadow-xs"
            >
              Découvrir les maillots →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="font-black text-sm text-[#071A35]">{o.id}</span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Commandé le {new Date(o.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <span className="self-start sm:self-auto text-xs font-black px-3.5 py-1.5 rounded-full bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30 uppercase">
                    {STATUS_LABELS[o.status] || o.status}
                  </span>
                </div>

                <div className="space-y-2">
                  {o.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1F2937]">{item.productName}</span>
                        <span className="text-slate-500 ml-2">Taille {item.size} × {item.quantity}</span>
                        {item.flocage && (
                          <p className="text-[11px] text-[#16A34A] font-semibold mt-0.5">
                            Flocage officiel : {item.flocage}
                          </p>
                        )}
                      </div>
                      <span className="font-black text-[#071A35]">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">💳 Paiement : {o.paymentMethod}</span>
                  <span className="font-black text-sm text-[#071A35]">
                    Total : {formatPrice(o.totalAmount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
