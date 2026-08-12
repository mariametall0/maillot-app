import { placeholderImage } from "./placeholder";
import type { Product } from "./types";

// Données de démonstration, le temps que le catalogue soit branché sur Supabase/Prisma.
// Structure alignée sur prisma/schema.prisma (voir SPEC.md section 6).
export const mockProducts: Product[] = [
  {
    id: "maillot-fcbk-dom",
    category: "MAILLOT",
    club: "FC Barka",
    season: "2025/2026",
    name: "Maillot FC Barka Domicile",
    description:
      "Maillot officiel domicile FC Barka, saison 2025/2026. Personnalisation nom + numéro disponible.",
    basePrice: 12000,
    personalizable: true,
    images: [
      { id: "img-1", url: placeholderImage("FC Barka\nDomicile", "#0f766e"), kit: "DOMICILE", position: 0 },
      { id: "img-2", url: placeholderImage("Dos", "#115e59"), kit: "DOMICILE", position: 1 },
    ],
    variants: [
      { id: "var-1", kit: "DOMICILE", sizeLabel: "S", sizeType: "taille", stock: 8, priceOverride: null },
      { id: "var-2", kit: "DOMICILE", sizeLabel: "M", sizeType: "taille", stock: 12, priceOverride: null },
      { id: "var-3", kit: "DOMICILE", sizeLabel: "L", sizeType: "taille", stock: 10, priceOverride: null },
      { id: "var-4", kit: "DOMICILE", sizeLabel: "XL", sizeType: "taille", stock: 4, priceOverride: null },
      { id: "var-5", kit: "DOMICILE", sizeLabel: "Enfant", sizeType: "taille", stock: 6, priceOverride: 9000 },
    ],
  },
  {
    id: "maillot-fcbk-ext",
    category: "MAILLOT",
    club: "FC Barka",
    season: "2025/2026",
    name: "Maillot FC Barka Extérieur",
    description: "Maillot officiel extérieur FC Barka, saison 2025/2026.",
    basePrice: 12000,
    personalizable: true,
    images: [
      { id: "img-3", url: placeholderImage("FC Barka\nExterieur", "#7c2d12"), kit: "EXTERIEUR", position: 0 },
    ],
    variants: [
      { id: "var-6", kit: "EXTERIEUR", sizeLabel: "M", sizeType: "taille", stock: 7, priceOverride: null },
      { id: "var-7", kit: "EXTERIEUR", sizeLabel: "L", sizeType: "taille", stock: 5, priceOverride: null },
      { id: "var-8", kit: "EXTERIEUR", sizeLabel: "XL", sizeType: "taille", stock: 0, priceOverride: null },
    ],
  },
  {
    id: "chaussures-x-speed",
    category: "EQUIPEMENT",
    subtype: "CHAUSSURES",
    name: "Chaussures X-Speed",
    description: "Chaussures de football, crampons FG, terrain sec.",
    basePrice: 18000,
    personalizable: false,
    images: [{ id: "img-4", url: placeholderImage("X-Speed", "#78350f"), kit: null, position: 0 }],
    variants: [
      { id: "var-9", kit: null, sizeLabel: "40", sizeType: "pointure", stock: 3, priceOverride: null },
      { id: "var-10", kit: null, sizeLabel: "42", sizeType: "pointure", stock: 5, priceOverride: null },
      { id: "var-11", kit: null, sizeLabel: "43", sizeType: "pointure", stock: 2, priceOverride: null },
    ],
  },
  {
    id: "ballon-match",
    category: "EQUIPEMENT",
    subtype: "BALLONS",
    name: "Ballon de match",
    description: "Ballon officiel taille 5, homologué compétition.",
    basePrice: 6000,
    personalizable: false,
    images: [{ id: "img-5", url: placeholderImage("Ballon", "#1e3a8a"), kit: null, position: 0 }],
    variants: [{ id: "var-12", kit: null, sizeLabel: "Taille 5", sizeType: "taille", stock: 20, priceOverride: null }],
  },
];

export function getProductById(id: string) {
  return mockProducts.find((p) => p.id === id) ?? null;
}
