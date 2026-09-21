import { prisma } from "./prisma";
import type { Prisma } from "@/generated/prisma/client";
import type { Product, ProductVariant, EquipmentSubtype } from "./types";
import { readProducts } from "./admin-data";

export const OFFICIAL_PRODUCTS: Product[] = [
  {
    id: "maillot-real-2026",
    category: "MAILLOT",
    club: "Real Madrid",
    season: "2025/2026",
    name: "Maillot Real Madrid Domicile 2025/2026",
    description: "Maillot officiel domicile Real Madrid. Tissu respirant HEAT.RDY haute performance. Flocage officiel Nom + Numéro au choix (Mbappé, Vinicius Jr, Bellingham...).",
    basePrice: 3500,
    originalPrice: 4500,
    discountPercent: 22,
    rating: 5,
    reviewCount: 48,
    personalizable: true,
    images: [
      { id: "rm-1", url: "/images/products/maillot_real.jpg", kit: "DOMICILE", position: 0 },
    ],
    variants: [
      { id: "rm-v1", kit: "DOMICILE", sizeLabel: "S", sizeType: "taille", stock: 10, priceOverride: null },
      { id: "rm-v2", kit: "DOMICILE", sizeLabel: "M", sizeType: "taille", stock: 15, priceOverride: null },
      { id: "rm-v3", kit: "DOMICILE", sizeLabel: "L", sizeType: "taille", stock: 12, priceOverride: null },
      { id: "rm-v4", kit: "DOMICILE", sizeLabel: "XL", sizeType: "taille", stock: 8, priceOverride: null },
    ],
  },
  {
    id: "crampons-mercurial-pro",
    category: "EQUIPEMENT",
    subtype: "CHAUSSURES",
    name: "Chaussures Nike Mercurial Superfly FG",
    description: "Crampons professionnels avec col Dynamic Fit et semelle haute vitesse pour terrains secs et synthétiques.",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    rating: 5,
    reviewCount: 36,
    personalizable: false,
    images: [
      { id: "mer-1", url: "/images/products/crampons_pro.jpg", kit: null, position: 0 },
    ],
    variants: [
      { id: "mer-v1", kit: null, sizeLabel: "40", sizeType: "pointure", stock: 4, priceOverride: null },
      { id: "mer-v2", kit: null, sizeLabel: "41", sizeType: "pointure", stock: 6, priceOverride: null },
      { id: "mer-v3", kit: null, sizeLabel: "42", sizeType: "pointure", stock: 8, priceOverride: null },
      { id: "mer-v4", kit: null, sizeLabel: "43", sizeType: "pointure", stock: 5, priceOverride: null },
    ],
  },
  {
    id: "ballon-champions-league",
    category: "EQUIPEMENT",
    subtype: "BALLONS",
    name: "Ballon Officiel UEFA Champions League",
    description: "Ballon de match officiel homologué FIFA Quality Pro. Structure thermo-collée sans coutures pour une précision chirurgicale.",
    basePrice: 1500,
    originalPrice: 2000,
    discountPercent: 25,
    rating: 5,
    reviewCount: 29,
    personalizable: false,
    images: [
      { id: "ucl-1", url: "/images/products/ballon_match.jpg", kit: null, position: 0 },
    ],
    variants: [
      { id: "ucl-v1", kit: null, sizeLabel: "Taille 5", sizeType: "taille", stock: 25, priceOverride: null },
    ],
  },
  {
    id: "gants-gardien-pro",
    category: "EQUIPEMENT",
    subtype: "GANTS",
    name: "Gants de Gardien Predator Pro Competition",
    description: "Gants de gardien professionnels avec latex URG 2.0 extra accroche et barrettes de protection anti-retournement des doigts.",
    basePrice: 2000,
    originalPrice: 2600,
    discountPercent: 23,
    rating: 5,
    reviewCount: 19,
    personalizable: false,
    images: [
      { id: "gants-1", url: "/images/grid_equipements_sport.jpg", kit: null, position: 0 },
    ],
    variants: [
      { id: "g-v1", kit: null, sizeLabel: "Taille 8", sizeType: "taille", stock: 5, priceOverride: null },
      { id: "g-v2", kit: null, sizeLabel: "Taille 9", sizeType: "taille", stock: 8, priceOverride: null },
      { id: "g-v3", kit: null, sizeLabel: "Taille 10", sizeType: "taille", stock: 6, priceOverride: null },
    ],
  },
  {
    id: "maillot-barca-2026",
    category: "MAILLOT",
    club: "FC Barcelona",
    season: "2025/2026",
    name: "Maillot FC Barcelone Domicile 2025/2026",
    description: "Maillot officiel Blaugrana du FC Barcelone. Technologie Nike Dri-FIT ADV. Flocage officiel disponible (Lamine Yamal, Lewandowski...).",
    basePrice: 3500,
    originalPrice: 4200,
    discountPercent: 16,
    rating: 5,
    reviewCount: 42,
    personalizable: true,
    images: [
      { id: "fcb-1", url: "/images/products/maillot_barca.jpg", kit: "DOMICILE", position: 0 },
    ],
    variants: [
      { id: "fcb-v1", kit: "DOMICILE", sizeLabel: "S", sizeType: "taille", stock: 8, priceOverride: null },
      { id: "fcb-v2", kit: "DOMICILE", sizeLabel: "M", sizeType: "taille", stock: 14, priceOverride: null },
      { id: "fcb-v3", kit: "DOMICILE", sizeLabel: "L", sizeType: "taille", stock: 10, priceOverride: null },
    ],
  },
  {
    id: "maillot-mauritanie-2026",
    category: "MAILLOT",
    club: "Mourabitounes",
    season: "2025/2026",
    name: "Maillot Mauritanie Domicile Officiel",
    description: "Maillot officiel des Mourabitounes de Mauritanie. Coupe athlétique, écusson FFRIM brodé. Personnalisation nom + numéro offerte.",
    basePrice: 3200,
    originalPrice: 3800,
    discountPercent: 15,
    rating: 5,
    reviewCount: 65,
    personalizable: true,
    images: [
      { id: "mrt-1", url: "/images/products/maillot_mauritanie.jpg", kit: "DOMICILE", position: 0 },
    ],
    variants: [
      { id: "mrt-v1", kit: "DOMICILE", sizeLabel: "S", sizeType: "taille", stock: 12, priceOverride: null },
      { id: "mrt-v2", kit: "DOMICILE", sizeLabel: "M", sizeType: "taille", stock: 20, priceOverride: null },
      { id: "mrt-v3", kit: "DOMICILE", sizeLabel: "L", sizeType: "taille", stock: 18, priceOverride: null },
    ],
  },
  {
    id: "maillot-barka-ext-2026",
    category: "MAILLOT",
    club: "FC Barka",
    season: "2025/2026",
    name: "Maillot FC Barka Extérieur Collector",
    description: "Maillot officiel extérieur FC Barka, édition collector. Personnalisation nom + numéro au choix.",
    basePrice: 2800,
    originalPrice: 3500,
    discountPercent: 20,
    rating: 5,
    reviewCount: 22,
    personalizable: true,
    images: [
      { id: "fbk-ext", url: "/images/products/maillot_barka_ext.jpg", kit: "EXTERIEUR", position: 0 },
    ],
    variants: [
      { id: "fbk-v1", kit: "EXTERIEUR", sizeLabel: "M", sizeType: "taille", stock: 6, priceOverride: null },
      { id: "fbk-v2", kit: "EXTERIEUR", sizeLabel: "L", sizeType: "taille", stock: 9, priceOverride: null },
    ],
  },
  {
    id: "maillot-psg-2026",
    category: "MAILLOT",
    club: "PSG",
    season: "2025/2026",
    name: "Maillot Paris Saint-Germain Domicile",
    description: "Maillot officiel du Paris Saint-Germain avec la bande classique Hechter. Tissu respirant Dri-FIT.",
    basePrice: 3500,
    originalPrice: 4500,
    discountPercent: 22,
    rating: 5,
    reviewCount: 31,
    personalizable: true,
    images: [
      { id: "psg-1", url: "/images/products/maillot_domicile.jpg", kit: "DOMICILE", position: 0 },
    ],
    variants: [
      { id: "psg-v1", kit: "DOMICILE", sizeLabel: "S", sizeType: "taille", stock: 7, priceOverride: null },
      { id: "psg-v2", kit: "DOMICILE", sizeLabel: "M", sizeType: "taille", stock: 12, priceOverride: null },
    ],
  },
];

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
    if (adminProducts && adminProducts.length > 0) {
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
    console.error("Notice: Using official products catalog:", err);
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
    console.error("Database fetch notice (using official catalog):", error);
  }
  return OFFICIAL_PRODUCTS;
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
