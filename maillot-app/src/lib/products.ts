import { prisma } from "./prisma";
import type { Prisma } from "@/generated/prisma/client";
import type { Product, ProductVariant, EquipmentSubtype } from "./types";
import { readProducts } from "./admin-data";

export const OFFICIAL_PRODUCTS: Product[] = [];

const productInclude = {
  images: { orderBy: { position: "asc" as const } },
  variants: true,
} satisfies Prisma.ProductInclude;

type ProductRow = Prisma.ProductGetPayload<{ include: typeof productInclude }>;

function getProductPhotoUrl(productId: string, rawUrl: string): string {
  if (rawUrl && !rawUrl.startsWith("data:image/svg") && rawUrl.startsWith("http")) {
    return rawUrl;
  }
  if (rawUrl && rawUrl.startsWith("/images/")) {
    return rawUrl;
  }
  // Mapping fallback product photos
  if (productId.includes("ballon")) return "/images/products/ballon_match.jpg";
  if (productId.includes("chaussure") || productId.includes("crampon")) return "/images/products/crampons_pro.jpg";
  if (productId.includes("barca")) return "/images/products/maillot_barca.jpg";
  if (productId.includes("real")) return "/images/products/maillot_real.jpg";
  if (productId.includes("mauritanie") || productId.includes("ffrim")) return "/images/products/maillot_mauritanie.jpg";
  if (productId.includes("ext")) return "/images/products/maillot_barka_ext.jpg";
  return "/images/products/maillot_domicile.jpg";
}

function toVariant(v: ProductRow["variants"][number]): ProductVariant {
  return {
    id: v.id,
    kit: v.kit,
    sizeLabel: v.sizeLabel,
    sizeType: v.sizeType as "taille" | "pointure",
    stock: v.stock,
    priceOverride: v.priceOverride ? v.priceOverride.toNumber() : null,
  };
}

function toProduct(p: ProductRow): Product {
  return {
    id: p.id,
    category: p.category,
    subtype: p.subtype ?? undefined,
    club: p.club ?? undefined,
    season: p.season ?? undefined,
    name: p.name,
    description: p.description ?? "",
    basePrice: p.basePrice.toNumber(),
    personalizable: p.personalizable,
    images: p.images.length > 0
      ? p.images.map((i) => ({ id: i.id, url: getProductPhotoUrl(p.id, i.url), kit: i.kit, position: i.position }))
      : [{ id: "default", url: getProductPhotoUrl(p.id, ""), kit: null, position: 0 }],
    variants: p.variants.map(toVariant),
  };
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const adminProducts = readProducts();
    if (Array.isArray(adminProducts)) {
      return adminProducts.filter((p) => p.active !== false).map((ap) => ({
        id: ap.id,
        category: ap.category,
        subtype: ap.subtype as EquipmentSubtype | undefined,
        club: ap.club,
        season: ap.season,
        name: ap.name,
        description: ap.category === "MAILLOT"
          ? `Maillot officiel ${ap.name}. Tissu haute performance. Flocage disponible.`
          : `${ap.name} haute performance.`,
        basePrice: ap.basePrice,
        originalPrice: ap.originalPrice,
        discountPercent: ap.discountPercent,
        rating: 5,
        reviewCount: 25,
        personalizable: ap.personalizable,
        images: [{ id: `${ap.id}-img`, url: ap.imageUrl, kit: null, position: 0 }],
        variants: ap.sizes.map((size, idx) => ({
          id: `${ap.id}-v-${idx}`,
          kit: null,
          sizeLabel: size,
          sizeType: ap.sizeType,
          stock: Math.max(1, Math.floor(ap.stock / (ap.sizes.length || 1))),
          priceOverride: null,
        })),
      }));
    }
  } catch (err) {
    console.error("Notice: Could not read admin products:", err);
  }

  try {
    const rows = await prisma.product.findMany({
      where: { active: true },
      include: productInclude,
      orderBy: { createdAt: "desc" },
    });
    if (rows && rows.length > 0) {
      return rows.map(toProduct);
    }
  } catch (error) {
    console.error("Database fetch notice:", error);
  }
  return [];
}

export type ProductFilterOptions = {
  category?: string;
  subtype?: string;
  club?: string;
  flocage?: boolean;
};

export async function getFilteredProducts(options: ProductFilterOptions): Promise<Product[]> {
  const products = await getAllProducts();

  return products.filter((p) => {
    if (options.category) {
      const cat = options.category.toUpperCase();
      if (cat === "MAILLOT" || cat === "MAILLOTS") {
        if (p.category !== "MAILLOT") return false;
      } else if (cat === "EQUIPEMENT" || cat === "EQUIPEMENTS") {
        if (p.category !== "EQUIPEMENT") return false;
      } else if (p.category.toUpperCase() !== cat) {
        return false;
      }
    }

    if (options.subtype) {
      if (!p.subtype || p.subtype.toUpperCase() !== options.subtype.toUpperCase()) {
        return false;
      }
    }

    if (options.club) {
      if (!p.club || !p.club.toLowerCase().includes(options.club.toLowerCase())) {
        return false;
      }
    }

    if (options.flocage !== undefined) {
      if (p.personalizable !== options.flocage) {
        return false;
      }
    }

    return true;
  });
}

export async function getProductsByCategory(category: "MAILLOT" | "EQUIPEMENT"): Promise<Product[]> {
  return getFilteredProducts({ category });
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((p) => p.id === id) || null;
}
