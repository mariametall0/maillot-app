// Peuple la base avec les produits de démonstration (mêmes données que
// src/lib/mock-data.ts, utilisées le temps que le vrai catalogue existe).
// Lancer avec : npm run db:seed

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.DATABASE_URL ?? "");
const prisma = new PrismaClient({ adapter });

function placeholderImage(label: string, color = "#1d4ed8") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
    <rect width="100%" height="100%" fill="${color}"/>
    <text x="50%" y="50%" font-family="sans-serif" font-size="42" fill="white"
      text-anchor="middle" dominant-baseline="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

async function main() {
  console.log("Nettoyage des données existantes...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();

  console.log("Création des produits de démonstration...");

  await prisma.product.create({
    data: {
      id: "maillot-fcbk-dom",
      category: "MAILLOT",
      club: "FC Barka",
      season: "2025/2026",
      name: "Maillot FC Barka Domicile",
      description:
        "Maillot officiel domicile FC Barka, saison 2025/2026. Personnalisation nom + numéro disponible.",
      basePrice: 12000,
      personalizable: true,
      images: {
        create: [
          { url: placeholderImage("FC Barka\nDomicile", "#0f766e"), kit: "DOMICILE", position: 0 },
          { url: placeholderImage("Dos", "#115e59"), kit: "DOMICILE", position: 1 },
        ],
      },
      variants: {
        create: [
          { kit: "DOMICILE", sizeLabel: "S", sizeType: "taille", stock: 8 },
          { kit: "DOMICILE", sizeLabel: "M", sizeType: "taille", stock: 12 },
          { kit: "DOMICILE", sizeLabel: "L", sizeType: "taille", stock: 10 },
          { kit: "DOMICILE", sizeLabel: "XL", sizeType: "taille", stock: 4 },
          { kit: "DOMICILE", sizeLabel: "Enfant", sizeType: "taille", stock: 6, priceOverride: 9000 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      id: "maillot-fcbk-ext",
      category: "MAILLOT",
      club: "FC Barka",
      season: "2025/2026",
      name: "Maillot FC Barka Extérieur",
      description: "Maillot officiel extérieur FC Barka, saison 2025/2026.",
      basePrice: 12000,
      personalizable: true,
      images: {
        create: [{ url: placeholderImage("FC Barka\nExterieur", "#7c2d12"), kit: "EXTERIEUR", position: 0 }],
      },
      variants: {
        create: [
          { kit: "EXTERIEUR", sizeLabel: "M", sizeType: "taille", stock: 7 },
          { kit: "EXTERIEUR", sizeLabel: "L", sizeType: "taille", stock: 5 },
          { kit: "EXTERIEUR", sizeLabel: "XL", sizeType: "taille", stock: 0 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      id: "chaussures-x-speed",
      category: "EQUIPEMENT",
      subtype: "CHAUSSURES",
      name: "Chaussures X-Speed",
      description: "Chaussures de football, crampons FG, terrain sec.",
      basePrice: 18000,
      personalizable: false,
      images: { create: [{ url: placeholderImage("X-Speed", "#78350f"), position: 0 }] },
      variants: {
        create: [
          { sizeLabel: "40", sizeType: "pointure", stock: 3 },
          { sizeLabel: "42", sizeType: "pointure", stock: 5 },
          { sizeLabel: "43", sizeType: "pointure", stock: 2 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      id: "ballon-match",
      category: "EQUIPEMENT",
      subtype: "BALLONS",
      name: "Ballon de match",
      description: "Ballon officiel taille 5, homologué compétition.",
      basePrice: 6000,
      personalizable: false,
      images: { create: [{ url: placeholderImage("Ballon", "#1e3a8a"), position: 0 }] },
      variants: { create: [{ sizeLabel: "Taille 5", sizeType: "taille", stock: 20 }] },
    },
  });

  console.log("Seed terminé ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
