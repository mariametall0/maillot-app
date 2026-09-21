import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "");
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Nettoyage des données existantes...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();

  console.log("Création des produits avec de VRAIES photos de haute qualité...");

  // 1. Maillot FC Barka Domicile
  await prisma.product.create({
    data: {
      id: "maillot-fcbk-dom",
      category: "MAILLOT",
      club: "FC Barka",
      season: "2025/2026",
      name: "Maillot FC Barka Domicile",
      description:
        "Maillot officiel domicile FC Barka, saison 2025/2026. Tissu respirant Dri-FIT haute performance. Flocage nom + numéro disponible.",
      basePrice: 12000,
      personalizable: true,
      images: {
        create: [
          { url: "/images/products/maillot_domicile.jpg", kit: "DOMICILE", position: 0 },
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

  // 2. Maillot FC Barka Extérieur
  await prisma.product.create({
    data: {
      id: "maillot-fcbk-ext",
      category: "MAILLOT",
      club: "FC Barka",
      season: "2025/2026",
      name: "Maillot FC Barka Extérieur",
      description: "Maillot officiel extérieur FC Barka, édition collector. Personnalisation nom + numéro au choix.",
      basePrice: 12000,
      personalizable: true,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80",
            kit: "EXTERIEUR",
            position: 0,
          },
        ],
      },
      variants: {
        create: [
          { kit: "EXTERIEUR", sizeLabel: "M", sizeType: "taille", stock: 7 },
          { kit: "EXTERIEUR", sizeLabel: "L", sizeType: "taille", stock: 5 },
          { kit: "EXTERIEUR", sizeLabel: "XL", sizeType: "taille", stock: 3 },
        ],
      },
    },
  });

  // 3. Chaussures X-Speed
  await prisma.product.create({
    data: {
      id: "chaussures-x-speed",
      category: "EQUIPEMENT",
      subtype: "CHAUSSURES",
      name: "Chaussures X-Speed Pro",
      description: "Crampons de football professionnels FG pour terrains secs et synthétiques. Accélération explosive.",
      basePrice: 18000,
      personalizable: false,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&auto=format&fit=crop&q=80",
            position: 0,
          },
        ],
      },
      variants: {
        create: [
          { sizeLabel: "40", sizeType: "pointure", stock: 3 },
          { sizeLabel: "41", sizeType: "pointure", stock: 4 },
          { sizeLabel: "42", sizeType: "pointure", stock: 5 },
          { sizeLabel: "43", sizeType: "pointure", stock: 2 },
        ],
      },
    },
  });

  // 4. Ballon de match Officiel
  await prisma.product.create({
    data: {
      id: "ballon-match",
      category: "EQUIPEMENT",
      subtype: "BALLONS",
      name: "Ballon de Match Pro",
      description: "Ballon officiel taille 5 thermo-collé pour une trajectoire parfaite et une étanchéité optimale.",
      basePrice: 6000,
      personalizable: false,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&auto=format&fit=crop&q=80",
            position: 0,
          },
        ],
      },
      variants: { create: [{ sizeLabel: "Taille 5", sizeType: "taille", stock: 20 }] },
    },
  });

  // 5. Maillot Équipe Nationale Mauritanie (FFRIM)
  await prisma.product.create({
    data: {
      id: "maillot-ffrim-dom",
      category: "MAILLOT",
      club: "Mourabitounes",
      season: "2025/2026",
      name: "Maillot Mauritanie Domicile",
      description: "Maillot officiel des Mourabitounes de Mauritanie. Flocage disponible avec vos joueurs préférés.",
      basePrice: 14000,
      personalizable: true,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&auto=format&fit=crop&q=80",
            position: 0,
          },
        ],
      },
      variants: {
        create: [
          { sizeLabel: "S", sizeType: "taille", stock: 6 },
          { sizeLabel: "M", sizeType: "taille", stock: 10 },
          { sizeLabel: "L", sizeType: "taille", stock: 8 },
          { sizeLabel: "XL", sizeType: "taille", stock: 5 },
        ],
      },
    },
  });

  // 6. Maillot Real White Edition
  await prisma.product.create({
    data: {
      id: "maillot-real-dom",
      category: "MAILLOT",
      club: "Real Edition",
      season: "2025/2026",
      name: "Maillot White Edition Pro",
      description: "Édition blanche épurée avec détails dorés. Tissu ultra-léger respirant.",
      basePrice: 13500,
      personalizable: true,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&auto=format&fit=crop&q=80",
            position: 0,
          },
        ],
      },
      variants: {
        create: [
          { sizeLabel: "M", sizeType: "taille", stock: 5 },
          { sizeLabel: "L", sizeType: "taille", stock: 7 },
        ],
      },
    },
  });

  console.log("Seed avec vraies photos terminé ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
