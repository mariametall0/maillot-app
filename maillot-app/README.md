# MaillotF — App de vente de maillots (V1)

Voir [`../SPEC.md`](../SPEC.md) pour la spécification complète du produit.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Prisma ORM 7 + PostgreSQL (hébergé sur Supabase), via `@prisma/adapter-pg`
- Supabase Storage (photos) + Supabase Auth (admin uniquement)
- `next-intl` pour le multilingue (français / anglais / arabe, avec RTL)

## État actuel

Le catalogue, la fiche produit, l'accueil et l'espace admin lisent désormais de vraies
données Postgres via Prisma (`src/lib/products.ts`), sur un projet Supabase déjà connecté et
migré. Le panier reste client-side (localStorage) et le tunnel de commande n'écrit pas encore
en base — voir "Prochaines étapes" ci-dessous.

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

## Multilingue (FR / EN / AR)

Toutes les routes vivent sous `src/app/[locale]/` (`/fr`, `/en`, `/ar` — `/` redirige vers
`/fr`, la langue par défaut). `src/proxy.ts` gère la détection/redirection de langue.
Les textes sont dans `messages/{fr,en,ar}.json`. L'arabe s'affiche en RTL (`dir="rtl"` posé
automatiquement sur `<html>` par `src/app/[locale]/layout.tsx`). Le sélecteur de langue est
dans le header (`src/components/site-header.tsx`).

Pour ajouter un texte : ajouter la clé dans les 3 fichiers `messages/*.json`, puis
`useTranslations("Namespace")` (Client Component) ou `getTranslations("Namespace")`
(Server Component).

## Structure du projet

```
src/
  app/
    layout.tsx                 layout racine minimal (requis par Next, pas de <html>)
    not-found.tsx               404 hors [locale] (filet de sécurité)
    [locale]/
      layout.tsx                 layout principal : <html lang/dir>, header, footer, providers
      page.tsx                   accueil
      catalogue/                  liste produits + filtres
      produit/[id]/                fiche produit + personnalisation (flocage)
      panier/                     panier (client-side, localStorage)
      commande/                    tunnel de commande (nom + téléphone, adresse, paiement)
      commande/confirmation/       écran de confirmation
      suivi/                      suivi de commande par numéro de téléphone
      admin/                      espace admin (catalogue + commandes)
  components/                   composants partagés (header, ...)
  i18n/
    routing.ts                   locales supportées (fr/en/ar), locale par défaut
    navigation.ts                 Link/useRouter/... conscients de la locale
    request.ts                    résolution locale + chargement des messages
  lib/
    types.ts                    types partagés (Product, CartItem, ...)
    products.ts                   requêtes Prisma -> Product (catalogue)
    cart-context.tsx             état panier (React Context + localStorage)
    cart-store.ts                 store panier externe (localStorage), via useSyncExternalStore
    prisma.ts                    client Prisma singleton (adapter @prisma/adapter-pg)
    format.ts                    formatage prix (MRU)
  proxy.ts                      détection/redirection de langue (ex-"middleware.ts")
messages/
  fr.json, en.json, ar.json      textes de l'interface par langue
prisma/
  schema.prisma                  modèle de données (voir SPEC.md §6)
  seed.ts                        données de démonstration (npm run db:seed)
prisma.config.ts                  config connexion DB pour le CLI Prisma (migrate/generate)
```

## Prochaines étapes

- [ ] Créer les routes API (`/api/orders`, ...) pour que le tunnel de commande écrive
      vraiment en base (création commande, décrément de stock, suivi par téléphone)
- [ ] Protéger `/admin` avec Supabase Auth (email + mot de passe, admin unique)
- [ ] Upload de photos vers Supabase Storage depuis l'espace admin (remplacer les
      images placeholder SVG générées par `prisma/seed.ts`)
- [ ] Intégration paiement mobile (Bankily / Masrvi / Sedad) — voir SPEC.md §5.4 et §8
      pour les points à valider
- [ ] Notifications SMS/WhatsApp sur changement de statut (optionnel V1)
