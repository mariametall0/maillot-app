import { prisma } from "../src/lib/prisma";

async function check() {
  try {
    const count = await prisma.product.count();
    console.log("TOTAL PRODUCTS IN DB:", count);
    const maillots = await prisma.product.count({ where: { category: "MAILLOT" } });
    console.log("MAILLOTS IN DB:", maillots);
    const equip = await prisma.product.count({ where: { category: "EQUIPEMENT" } });
    console.log("EQUIPEMENTS IN DB:", equip);
  } catch (err) {
    console.error("DB ERROR:", err);
  }
}

check();
