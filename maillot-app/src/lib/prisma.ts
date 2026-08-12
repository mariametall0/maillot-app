import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 : le client ne lit plus l'URL de connexion depuis schema.prisma —
// on lui passe un adapter explicite (voir prisma.config.ts pour les migrations,
// qui utilise une connexion distincte). On utilise ici l'URL poolée (pgbouncer)
// adaptée au runtime serverless de l'app.
const adapter = new PrismaPg(process.env.DATABASE_URL ?? "");

// Évite de recréer une instance de PrismaClient à chaque hot-reload en dev
// (voir https://www.prisma.io/docs/guides/nextjs)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
