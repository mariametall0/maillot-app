// Types partagés côté front. Formes volontairement simples (indépendantes des
// types générés par Prisma) — voir src/lib/products.ts pour le mapping depuis
// les modèles Prisma (Decimal -> number, etc.)

export type ProductCategory = "MAILLOT" | "EQUIPEMENT";
export type EquipmentSubtype = "CHAUSSURES" | "BALLONS" | "GANTS" | "ACCESSOIRES" | "AUTRE";
export type JerseyKit = "DOMICILE" | "EXTERIEUR" | "THIRD";

export type ProductVariant = {
  id: string;
  kit: JerseyKit | null;
  sizeLabel: string;
  sizeType: "taille" | "pointure";
  stock: number;
  priceOverride: number | null;
};

export type ProductImage = {
  id: string;
  url: string;
  kit: JerseyKit | null;
  position: number;
};

export type Product = {
  id: string;
  category: ProductCategory;
  subtype?: EquipmentSubtype;
  club?: string;
  season?: string;
  name: string;
  description: string;
  basePrice: number;
  originalPrice?: number;
  discountPercent?: number;
  rating?: number;
  reviewCount?: number;
  personalizable: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
};

export type CartItem = {
  productId: string;
  variantId: string;
  productName: string;
  imageUrl: string;
  sizeLabel: string;
  kit: JerseyKit | null;
  quantity: number;
  unitPrice: number;
  personalizationFee: number;
  personalizationName?: string;
  personalizationNumber?: number;
};

export type PaymentMethod = "BANKILY" | "MASRVI" | "SEDAD" | "LIVRAISON";
