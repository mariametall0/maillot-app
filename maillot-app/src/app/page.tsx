import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export default async function HomePage() {
  const products = await getAllProducts();
  const featured = products.slice(0, 4);

  return (
    <div>
      <section className="bg-blue-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ton maillot, ton nom, ton numéro
          </h1>
          <p className="mt-3 text-blue-100 max-w-xl mx-auto">
            Maillots de clubs personnalisables et équipements de sport, livrés à Nouakchott.
            Paiement mobile (Bankily, Masrvi, Sedad) ou à la livraison.
          </p>
          <Link
            href="/catalogue"
            className="mt-6 inline-block rounded-full bg-white text-blue-700 font-semibold px-6 py-3 hover:bg-blue-50"
          >
            Voir le catalogue
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-semibold mb-6">Nouveautés</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/produit/${product.id}`}
              className="group rounded-lg border border-black/10 bg-white overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square relative bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element -- placeholder SVG data URI, remplacé par de vraies photos Supabase Storage */}
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                <p className="text-sm text-black/60">{formatPrice(product.basePrice)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
