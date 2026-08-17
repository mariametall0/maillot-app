import { getTranslations } from "next-intl/server";
import { getAllProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";

// Espace admin (5.6) — placeholder non protégé pour l'instant.
// TODO : brancher Supabase Auth (email/mot de passe) pour restreindre l'accès à /admin
// avant toute mise en production (voir SPEC.md §6).
export default async function AdminPage() {
  const [products, t] = await Promise.all([getAllProducts(), getTranslations("Admin")]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-1">{t("title")}</h1>
      <p className="text-black/60 mb-8 text-sm">{t("unprotectedWarning")}</p>

      <section className="mb-10">
        <h2 className="font-semibold mb-3">{t("catalogueHeading", { count: products.length })}</h2>
        <div className="overflow-x-auto rounded-lg border border-black/10 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-black/50">
              <tr>
                <th className="px-4 py-2">{t("product")}</th>
                <th className="px-4 py-2">{t("category")}</th>
                <th className="px-4 py-2">{t("basePrice")}</th>
                <th className="px-4 py-2">{t("totalStock")}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const stock = p.variants.reduce((s, v) => s + v.stock, 0);
                return (
                  <tr key={p.id} className="border-t border-black/5">
                    <td className="px-4 py-2 font-medium">{p.name}</td>
                    <td className="px-4 py-2">{p.category === "MAILLOT" ? t("categoryJersey") : t("categoryEquipment")}</td>
                    <td className="px-4 py-2">{formatPrice(p.basePrice)}</td>
                    <td className="px-4 py-2">
                      {stock === 0 ? <span className="text-red-600">{t("outOfStock")}</span> : stock}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-3">{t("ordersHeading")}</h2>
        <div className="rounded-lg border border-black/10 bg-white p-6 text-center text-black/50 text-sm">
          {t("ordersEmpty")}
        </div>
      </section>
    </div>
  );
}
