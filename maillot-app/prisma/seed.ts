// Peuple la base avec les produits de démonstration (mêmes données que
// src/lib/mock-data.ts, utilisées le temps que le vrai catalogue existe).
// Lancer avec : npm run db:seed

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.DATABASE_URL ?? "");
const prisma = new PrismaClient({ adapter });

// Illustrations placeholder (silhouettes, pas de logo de marque réelle) —
// en attendant de vraies photos uploadées depuis l'admin (Supabase Storage).
// Volontairement des pictogrammes plutôt que des photos de vrais clubs
// (Arsenal, Man United, ...) : utiliser une vraie photo de maillot d'un
// autre club pour représenter "FC Barka" serait trompeur.
function toDataUri(svg: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function jerseyImage(mainColor: string, trimColor = "#ffffff") {
  return toDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="600" height="600">
    <rect width="240" height="240" fill="#f4f4f5"/>
    <polygon points="80,50 40,70 55,110 80,95" fill="${mainColor}" stroke="#111827" stroke-width="3" stroke-linejoin="round"/>
    <polygon points="160,50 200,70 185,110 160,95" fill="${mainColor}" stroke="#111827" stroke-width="3" stroke-linejoin="round"/>
    <rect x="80" y="50" width="80" height="150" rx="8" fill="${mainColor}" stroke="#111827" stroke-width="3"/>
    <polygon points="110,50 120,68 130,50" fill="#f4f4f5"/>
    <rect x="80" y="66" width="80" height="8" fill="${trimColor}"/>
  </svg>`);
}

function ballImage() {
  return toDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="600" height="600">
    <rect width="240" height="240" fill="#f4f4f5"/>
    <circle cx="120" cy="120" r="90" fill="#ffffff" stroke="#111827" stroke-width="4"/>
    <polygon points="120,90 138,103 131,124 109,124 102,103" fill="#111827"/>
    <line x1="120" y1="90" x2="120" y2="55" stroke="#111827" stroke-width="3"/>
    <line x1="138" y1="103" x2="170" y2="85" stroke="#111827" stroke-width="3"/>
    <line x1="131" y1="124" x2="155" y2="155" stroke="#111827" stroke-width="3"/>
    <line x1="109" y1="124" x2="85" y2="155" stroke="#111827" stroke-width="3"/>
    <line x1="102" y1="103" x2="70" y2="85" stroke="#111827" stroke-width="3"/>
  </svg>`);
}

function shoeImage(mainColor: string) {
  return toDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="600" height="600">
    <rect width="240" height="240" fill="#f4f4f5"/>
    <path d="M40,150 C40,120 70,100 110,95 L170,80 C190,75 205,90 205,110 C205,125 195,140 175,145 L45,160 C33,160 30,157 40,150 Z"
      fill="${mainColor}" stroke="#111827" stroke-width="3" stroke-linejoin="round"/>
    <path d="M38,150 L200,148 L207,166 L34,166 Z" fill="#111827"/>
    <circle cx="90" cy="112" r="3" fill="#ffffff"/>
    <circle cx="106" cy="105" r="3" fill="#ffffff"/>
    <circle cx="122" cy="99" r="3" fill="#ffffff"/>
  </svg>`);
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
          { url: jerseyImage("#0f766e"), kit: "DOMICILE", position: 0 },
          { url: jerseyImage("#115e59", "#f4f4f5"), kit: "DOMICILE", position: 1 },
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
        create: [{ url: jerseyImage("#7c2d12"), kit: "EXTERIEUR", position: 0 }],
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
      images: { create: [{ url: shoeImage("#78350f"), position: 0 }] },
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
      images: { create: [{ url: ballImage(), position: 0 }] },
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
