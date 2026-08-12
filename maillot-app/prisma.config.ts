// Le CLI Prisma ne bénéficie pas du chargement automatique de .env.local par
// Next.js : on le charge nous-mêmes (comme le fait Next côté app).
import { config } from "dotenv";
config({ path: ".env.local" });
config(); // fallback .env si présent

import { defineConfig, env } from "prisma/config";

// Prisma 7 : la config de connexion (utilisée par `prisma migrate`/`prisma db push`)
// vit ici, séparée du runtime de l'app. On utilise la connexion directe (non
// poolée) pour les migrations — voir README.md pour DATABASE_URL vs DIRECT_URL.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
