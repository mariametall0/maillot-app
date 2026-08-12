# MaillotF — App de vente de maillots (V1)

Voir [`../SPEC.md`](../SPEC.md) pour la spécification complète du produit.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Prisma ORM 7 + PostgreSQL (hébergé sur Supabase), via `@prisma/adapter-pg`
- Supabase Storage (photos) + Supabase Auth (admin uniquement)

## État actuel

Le catalogue, le panier, le tunnel de commande et l'espace admin sont en place avec des
**données mock** (`src/lib/mock-data.ts`), pour développer l'UI sans dépendre d'un projet
Supabase déjà configuré. Rien n'est encore persisté en base — voir "Prochaines étapes"
ci-dessous pour brancher la vraie base de données.

## Setup

### 1. Installer les dépendances

```bash
npm install
```

### 2. Créer un projet Supabase

1. Créer un compte / projet sur [supabase.com](https://supabase.com)
2. Dans **Project Settings > Database**, récupérer :
   - la chaîne de connexion "Connection pooling" → `DATABASE_URL`
   - la chaîne de connexion directe → `DIRECT_URL`
3. Dans **Project Settings > API**, récupérer `NEXT_PUBLIC_SUPABASE_URL`, la clé `anon`
   et la clé `service_role`

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Puis remplir `.env.local` avec les valeurs récupérées à l'étape précédente (remplace le
`.env.local` local de développement, actuellement rempli de valeurs *placeholder* pour que
`npm run build` fonctionne sans projet Supabase réel).

### 4. Appliquer le schéma à la base

```bash
npx prisma migrate dev --name init
```

> **Prisma 7** : la connexion DB n'est plus déclarée dans `schema.prisma` mais dans
> [`prisma.config.ts`](./prisma.config.ts) (utilisé par `prisma migrate`/`generate`, via
> `DIRECT_URL`) et dans [`src/lib/prisma.ts`](./src/lib/prisma.ts) (runtime de l'app, via un
> adapter `@prisma/adapter-pg` sur `DATABASE_URL` poolée). Le client généré vit dans
> `src/generated/prisma` (gitignoré, régénéré par `prisma generate`, appelé automatiquement
> après `npm install` via le script `postinstall`).

### 5. Lancer le serveur de développement

```bash
npm run dev
```

L'app est disponible sur [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
src/
  app/
    page.tsx                 accueil
    catalogue/                liste produits + filtres
    produit/[id]/              fiche produit + personnalisation (flocage)
    panier/                   panier (client-side, localStorage)
    commande/                  tunnel de commande (nom + téléphone, adresse, paiement)
    commande/confirmation/     écran de confirmation
    suivi/                    suivi de commande par numéro de téléphone
    admin/                    espace admin (catalogue + commandes)
  components/                 composants partagés (header, ...)
  lib/
    types.ts                  types partagés (Product, CartItem, ...)
    mock-data.ts               données de démonstration
    cart-context.tsx           état panier (React Context + localStorage)
    prisma.ts                  client Prisma singleton
    format.ts                  formatage prix (MRU)
prisma/
  schema.prisma                modèle de données (voir SPEC.md §6)
prisma.config.ts                config connexion DB pour le CLI Prisma (migrate/generate)
```

## Prochaines étapes (non faites dans ce scaffold initial)

- [ ] Brancher les pages catalogue/produit sur Prisma au lieu de `mock-data.ts`
- [ ] Créer les routes API (`/api/orders`, `/api/products`, ...) pour la création de
      commande, la mise à jour de stock et le suivi par téléphone
- [ ] Protéger `/admin` avec Supabase Auth (email + mot de passe, admin unique)
- [ ] Upload de photos vers Supabase Storage depuis l'espace admin
- [ ] Intégration paiement mobile (Bankily / Masrvi / Sedad) — voir SPEC.md §5.4 et §8
      pour les points à valider
- [ ] Notifications SMS/WhatsApp sur changement de statut (optionnel V1)
- [ ] Script de seed Prisma pour remplacer `mock-data.ts` en base réelle
