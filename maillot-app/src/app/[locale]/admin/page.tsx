"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { AdminProduct, AdminOrder } from "@/lib/admin-data";

type Tab = "dashboard" | "products" | "orders";
type OrderStatus = "EN_ATTENTE" | "CONFIRMEE" | "EXPEDIEE" | "LIVREE" | "ANNULEE";

const STATUS_LABELS: Record<OrderStatus, string> = {
  EN_ATTENTE: "⏳ En attente",
  CONFIRMEE: "✅ Confirmée",
  EXPEDIEE: "🚚 Expédiée",
  LIVREE: "📦 Livrée",
  ANNULEE: "❌ Annulée",
};
const STATUS_COLORS: Record<OrderStatus, string> = {
  EN_ATTENTE: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  CONFIRMEE: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  EXPEDIEE: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  LIVREE: "bg-green-500/20 text-green-400 border-green-500/30",
  ANNULEE: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState<AdminProduct | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Formulaire produit
  const emptyForm = {
    name: "", category: "MAILLOT" as "MAILLOT" | "EQUIPEMENT",
    subtype: "", club: "", season: "", basePrice: "", originalPrice: "",
    personalizable: false, imageUrl: "", sizes: "S,M,L,XL", sizeType: "taille" as "taille" | "pointure", stock: "0",
  };
  const [form, setForm] = useState(emptyForm);

  const fetchProducts = async () => {
    const r = await fetch("/api/admin/products");
    if (r.ok) {
      const data = await r.json();
      setProducts(data);
    }
  };
  const fetchOrders = async () => {
    const r = await fetch("/api/admin/orders");
    if (r.ok) {
      const data = await r.json();
      setOrders(data);
    }
  };

  useEffect(() => {
    let active = true;
    async function init() {
      const [pRes, oRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/orders"),
      ]);
      if (active && pRes.ok) setProducts(await pRes.json());
      if (active && oRes.ok) setOrders(await oRes.json());
    }
    init();
    return () => { active = false; };
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/fr/admin/login");
  }

  async function handleImageUpload(file: File) {
    setUploadingImg(true);
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (r.ok) {
      const { url } = await r.json();
      setForm((f) => ({ ...f, imageUrl: url }));
      setPreviewUrl(url);
    } else {
      const { error } = await r.json();
      alert(error);
    }
    setUploadingImg(false);
  }

  function openEdit(p: AdminProduct) {
    setEditProduct(p);
    setForm({
      name: p.name, category: p.category, subtype: p.subtype || "",
      club: p.club || "", season: p.season || "",
      basePrice: String(p.basePrice), originalPrice: String(p.originalPrice || ""),
      personalizable: p.personalizable, imageUrl: p.imageUrl,
      sizes: p.sizes.join(","), sizeType: p.sizeType, stock: String(p.stock),
    });
    setPreviewUrl(p.imageUrl);
    setShowAddProduct(true);
  }

  async function handleSaveProduct(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...(editProduct ? { id: editProduct.id } : {}),
      name: form.name, category: form.category,
      subtype: form.subtype || undefined, club: form.club || undefined,
      season: form.season || undefined,
      basePrice: Number(form.basePrice),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      discountPercent: form.originalPrice && form.basePrice
        ? Math.round((1 - Number(form.basePrice) / Number(form.originalPrice)) * 100)
        : undefined,
      personalizable: form.personalizable,
      imageUrl: form.imageUrl || "/images/products/maillot_domicile.jpg",
      sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      sizeType: form.sizeType,
      stock: Number(form.stock),
    };
    const method = editProduct ? "PATCH" : "POST";
    const r = await fetch("/api/admin/products", {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (r.ok) {
      setShowAddProduct(false);
      setEditProduct(null);
      setForm(emptyForm);
      setPreviewUrl("");
      await fetchProducts();
    } else {
      const { error } = await r.json();
      alert(error);
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce produit ?")) return;
    await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    await fetchProducts();
  }

  async function handleStatusChange(orderId: string, status: OrderStatus) {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: orderId, status }),
    });
    await fetchOrders();
  }

  return (
    <div className="min-h-screen bg-[#071A35] text-white flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[#050F1F] border-r border-slate-800 flex flex-col py-8 px-4">
        <div className="mb-8 text-center">
          <div className="text-2xl mb-1">⚽</div>
          <div className="font-black text-lg text-white uppercase tracking-tight">
            FOOT<span className="text-[#16A34A]">ZONE</span>
          </div>
          <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-0.5">Admin</div>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {([["dashboard", "📊", "Tableau de bord"], ["products", "🛍️", "Produits"], ["orders", "📦", "Commandes"]] as const).map(([t, icon, label]) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${tab === t ? "bg-[#16A34A] text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
              <span>{icon}</span>{label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all mt-4">
          🚪 Déconnexion
        </button>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 overflow-auto">
        {/* Tableau de bord */}
        {tab === "dashboard" && (
          <div className="p-8">
            <h1 className="text-2xl font-black uppercase tracking-tight mb-8">📊 Tableau de bord</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {[
                { label: "Produits", value: products.length, icon: "🛍️", color: "emerald" },
                { label: "Commandes", value: orders.length, icon: "📦", color: "blue" },
                { label: "En attente", value: orders.filter((o) => o.status === "EN_ATTENTE").length, icon: "⏳", color: "amber" },
                { label: "Livrées", value: orders.filter((o) => o.status === "LIVREE").length, icon: "✅", color: "green" },
              ].map((s) => (
                <div key={s.label} className="bg-[#0D2850] rounded-2xl border border-slate-700 p-6">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="text-3xl font-black">{s.value}</div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-[#0D2850] rounded-2xl border border-slate-700 p-6">
              <h2 className="font-black uppercase tracking-widest text-emerald-400 text-xs mb-4">Dernières commandes</h2>
              {orders.length === 0 ? (
                <p className="text-slate-500 text-sm">Aucune commande pour l&apos;instant.</p>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map((o) => (
                    <div key={o.id} className="flex items-center justify-between py-2 border-b border-slate-800">
                      <div>
                        <p className="text-sm font-bold">{o.customerName}</p>
                        <p className="text-xs text-slate-400">{o.customerPhone} · {o.totalAmount.toLocaleString()} MRU</p>
                      </div>
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-full border ${STATUS_COLORS[o.status]}`}>
                        {STATUS_LABELS[o.status]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Produits */}
        {tab === "products" && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-black uppercase tracking-tight">🛍️ Produits ({products.length})</h1>
              <button onClick={() => { setEditProduct(null); setForm(emptyForm); setPreviewUrl(""); setShowAddProduct(true); }}
                className="bg-[#16A34A] hover:bg-[#15803D] text-white font-black text-sm uppercase px-6 py-3 rounded-xl transition-all">
                ➕ Ajouter un produit
              </button>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <div className="text-5xl mb-4">📦</div>
                <p className="font-semibold">Aucun produit. Cliquez sur &quot;Ajouter&quot; pour commencer.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((p) => (
                  <div key={p.id} className="bg-[#0D2850] rounded-2xl border border-slate-700 overflow-hidden group">
                    <div className="aspect-square bg-slate-900 relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      {p.discountPercent && (
                        <span className="absolute top-2 left-2 bg-[#16A34A] text-white text-[10px] font-black px-2 py-1 rounded-full">-{p.discountPercent}%</span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-emerald-400 font-black uppercase">{p.category}{p.club ? ` · ${p.club}` : ""}</p>
                      <p className="text-sm font-bold text-white leading-tight mt-0.5 line-clamp-2">{p.name}</p>
                      <p className="text-sm font-black text-white mt-2">{p.basePrice.toLocaleString()} MRU</p>
                      <p className="text-xs text-slate-400 mt-1">Stock : {p.stock}</p>
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => openEdit(p)}
                          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold py-2 rounded-lg transition-all">
                          ✏️ Modifier
                        </button>
                        <button onClick={() => handleDelete(p.id)}
                          className="flex-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 text-xs font-bold py-2 rounded-lg transition-all border border-red-500/30">
                          🗑️ Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Commandes */}
        {tab === "orders" && (
          <div className="p-8">
            <h1 className="text-2xl font-black uppercase tracking-tight mb-8">📦 Commandes ({orders.length})</h1>
            {orders.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <div className="text-5xl mb-4">📭</div>
                <p className="font-semibold">Aucune commande reçue pour l&apos;instant.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="bg-[#0D2850] rounded-2xl border border-slate-700 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-black text-white">{o.customerName}</p>
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${STATUS_COLORS[o.status]}`}>
                            {STATUS_LABELS[o.status]}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">📞 {o.customerPhone} · 📍 {o.customerAddress}</p>
                        <p className="text-xs text-slate-400 mt-1">💳 {o.paymentMethod}</p>
                        <div className="mt-3 space-y-1">
                          {o.items.map((item, i) => (
                            <p key={i} className="text-xs text-slate-300">
                              • {item.productName} — Taille {item.size} × {item.quantity} = {(item.price * item.quantity).toLocaleString()} MRU
                              {item.flocage && <span className="text-emerald-400"> (Flocage: {item.flocage})</span>}
                            </p>
                          ))}
                        </div>
                        <p className="text-sm font-black text-white mt-3">Total : {o.totalAmount.toLocaleString()} MRU</p>
                      </div>
                      <div className="shrink-0">
                        <p className="text-[10px] text-slate-500 font-semibold mb-2 uppercase tracking-widest">Changer statut</p>
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                          className="bg-slate-800 border border-slate-700 text-white text-xs font-bold px-3 py-2 rounded-xl outline-none focus:border-emerald-500">
                          {Object.entries(STATUS_LABELS).map(([k, v]) => (
                            <option key={k} value={k}>{v}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-3">
                      Reçue le {new Date(o.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal Ajout / Modification Produit */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D2850] border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-[#0D2850] border-b border-slate-700 px-6 py-4 flex items-center justify-between">
              <h2 className="font-black text-lg uppercase tracking-tight">
                {editProduct ? "✏️ Modifier le produit" : "➕ Nouveau produit"}
              </h2>
              <button onClick={() => setShowAddProduct(false)} className="text-slate-400 hover:text-white text-2xl">✕</button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 space-y-5">
              {/* Upload image */}
              <div>
                <label className="block text-xs font-black text-slate-300 uppercase tracking-widest mb-2">📸 Photo du produit</label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleImageUpload(f); }}
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-slate-600 hover:border-[#16A34A] rounded-xl p-6 text-center cursor-pointer transition-colors">
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={previewUrl} alt="preview" className="h-32 object-contain mx-auto rounded-lg" />
                  ) : (
                    <div className="text-slate-500">
                      {uploadingImg ? "⏳ Upload en cours..." : "🖼️ Glissez une photo ici ou cliquez pour choisir"}
                      <p className="text-xs mt-1">JPG, PNG, WebP · Max 5 MB</p>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }} />
              </div>

              {/* Champs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="field-label">Nom du produit *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ex: Maillot Real Madrid Domicile" className="admin-input" />
                </div>
                <div>
                  <label className="field-label">Catégorie *</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as "MAILLOT" | "EQUIPEMENT" })} className="admin-input">
                    <option value="MAILLOT">⚽ Maillots</option>
                    <option value="EQUIPEMENT">👟 Équipements</option>
                  </select>
                </div>
                <div>
                  <label className="field-label">Sous-catégorie</label>
                  <select value={form.subtype} onChange={(e) => setForm({ ...form, subtype: e.target.value })} className="admin-input">
                    <option value="">— Aucune —</option>
                    <option value="CHAUSSURES">👟 Chaussures</option>
                    <option value="BALLONS">⚽ Ballons</option>
                    <option value="GANTS">🧤 Gants</option>
                  </select>
                </div>
                <div>
                  <label className="field-label">Club / Équipe</label>
                  <input value={form.club} onChange={(e) => setForm({ ...form, club: e.target.value })}
                    placeholder="Ex: Real Madrid" className="admin-input" />
                </div>
                <div>
                  <label className="field-label">Saison</label>
                  <input value={form.season} onChange={(e) => setForm({ ...form, season: e.target.value })}
                    placeholder="Ex: 2025/2026" className="admin-input" />
                </div>
                <div>
                  <label className="field-label">Prix de vente (MRU) *</label>
                  <input required type="number" min="0" value={form.basePrice} onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
                    placeholder="3500" className="admin-input" />
                </div>
                <div>
                  <label className="field-label">Prix original / Ancien prix (MRU)</label>
                  <input type="number" min="0" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                    placeholder="4500 (laissez vide si pas de promo)" className="admin-input" />
                </div>
                <div>
                  <label className="field-label">Stock disponible</label>
                  <input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="admin-input" />
                </div>
                <div>
                  <label className="field-label">Type de taille</label>
                  <select value={form.sizeType} onChange={(e) => setForm({ ...form, sizeType: e.target.value as "taille" | "pointure" })} className="admin-input">
                    <option value="taille">Taille (S, M, L, XL...)</option>
                    <option value="pointure">Pointure (40, 41, 42...)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="field-label">Tailles disponibles (séparées par des virgules)</label>
                  <input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                    placeholder="S,M,L,XL ou 40,41,42,43" className="admin-input" />
                </div>
                <div className="sm:col-span-2 flex items-center gap-3">
                  <input type="checkbox" id="personalizable" checked={form.personalizable}
                    onChange={(e) => setForm({ ...form, personalizable: e.target.checked })}
                    className="w-4 h-4 accent-[#16A34A]" />
                  <label htmlFor="personalizable" className="text-sm font-bold text-slate-300 cursor-pointer">
                    ✍️ Flocage personnalisé disponible (Nom + Numéro)
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddProduct(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm py-3.5 rounded-xl transition-all">
                  Annuler
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-50 text-white font-black text-sm uppercase py-3.5 rounded-xl transition-all">
                  {saving ? "Enregistrement..." : editProduct ? "💾 Mettre à jour" : "✅ Ajouter le produit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .field-label { display: block; font-size: 11px; font-weight: 800; color: rgb(148 163 184); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; }
        .admin-input { width: 100%; background: #071A35; border: 1px solid rgb(51 65 85); color: white; font-size: 13px; padding: 10px 14px; border-radius: 10px; outline: none; transition: border-color 0.2s; }
        .admin-input:focus { border-color: #16A34A; }
        .admin-input::placeholder { color: rgb(100 116 139); }
      `}</style>
    </div>
  );
}
