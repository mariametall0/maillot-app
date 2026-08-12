import { prisma } from "./prisma";
import type { Prisma } from "@/generated/prisma/client";
import type { Product, ProductImage, ProductVariant } from "./types";

// Inclusion partagée : images triées par position, variantes complètes.
const productInclude = {
  images: { orderBy: { position: "asc" as const } },
  variants: true,
} satisfies Prisma.ProductInclude;

type ProductRow = Prisma.ProductGetPayload<{ include: typeof productInclude }>;

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

function toImage(i: ProductRow["images"][number]): ProductImage {
  return { id: i.id, url: i.url, kit: i.kit, position: i.position };
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
    images: p.images.map(toImage),
    variants: p.variants.map(toVariant),
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { active: true },
    include: productInclude,
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toProduct);
}

export async function getProductsByCategory(category: "MAILLOT" | "EQUIPEMENT"): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { active: true, category },
    include: productInclude,
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({
    where: { id },
    include: productInclude,
  });
  return row ? toProduct(row) : null;
}
