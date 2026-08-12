# Spécification — Application de vente de maillots (V1)

## 1. Vision du produit

Application web de vente en ligne de maillots de clubs/équipes (foot, etc.), avec possibilité de **personnalisation (flocage nom + numéro)**. Gestion assurée par un **admin unique** en V1, avec paiement mobile local et paiement à la livraison.

## 2. Périmètre de la V1

### Inclus
- Catalogue de maillots (par club, équipe, saison, taille) **et d'équipements de sport** (chaussures, ballons, accessoires, etc.)
- Personnalisation : ajout d'un nom et d'un numéro floqué sur le maillot
- Panier et tunnel de commande
- Paiement mobile (Bankily, Masrvi, Sedad) + paiement à la livraison
- Compte administrateur unique (gestion catalogue + commandes)
- Suivi basique de commande (statuts)
- Identification client simplifiée par numéro de téléphone (historique de commandes, coordonnées) — pas de compte formel avec mot de passe en V1

### Hors périmètre V1 (à prévoir en V2)
- Multi-vendeurs / marketplace
- Comptes admin multiples avec rôles différenciés
- Programme de fidélité / promotions avancées
- Application mobile native

## 3. Utilisateurs et rôles

| Rôle | Description |
|---|---|
| Visiteur | Parcourt le catalogue, peut créer un panier sans compte |
| Client | Identifié par son numéro de téléphone dès la commande (pas de compte formel en V1), peut consulter son historique via ce numéro |
| Admin | Gère catalogue, stocks, commandes, paiements, livraisons |

## 4. Parcours utilisateur principal

1. Le client arrive sur la page d'accueil (mise en avant nouveautés/clubs populaires)
2. Il parcourt le catalogue (filtres : club, équipe, taille, prix)
3. Il sélectionne un maillot → choisit la taille → active la personnalisation (nom + numéro) si souhaité
4. Il ajoute au panier
5. Il passe au tunnel de commande : **nom + numéro de téléphone**, adresse de livraison (obligatoire si paiement mobile, sinon collectée par téléphone lors de la confirmation), mode de paiement
6. Il choisit paiement mobile (Bankily/Masrvi/Sedad) ou paiement à la livraison
7. Confirmation de commande + numéro de suivi
8. L'admin reçoit la commande, met à jour le statut jusqu'à la livraison (avec, pour le paiement à la livraison, un appel de confirmation qui sert aussi à récupérer l'adresse précise si elle n'a pas été saisie en ligne)

## 5. Fonctionnalités détaillées

### 5.1 Catalogue produits
- Deux grandes catégories de produits : **maillots** (personnalisables) et **équipements de sport** (chaussures, ballons, accessoires — non personnalisables, logique catalogue classique)
- Fiche produit : club, saison, description, prix de base
- **Photos du maillot** : plusieurs photos par produit (recto, verso, détail floqué), affichées en galerie sur la fiche produit avec zoom au clic
- Une photo principale par variante (domicile/extérieur/third) si le visuel change
- Vignette photo affichée aussi dans la liste du catalogue et le panier (pas seulement sur la fiche produit)
- Upload des photos géré depuis l'espace admin (ajout/suppression/réordonnancement)
- Variantes : tailles disponibles (S, M, L, XL, XXL, enfant), déclinaison domicile/extérieur/third pour les maillots ; pointures/tailles pour les équipements
- Stock par taille/variante
- Recherche et filtres (catégorie, club, équipe, prix, disponibilité)

### 5.2 Personnalisation (flocage)
- Champ "Nom" (texte libre, limite de caractères)
- Champ "Numéro" (0–99, validation numérique)
- Aperçu visuel simple du rendu (texte superposé sur l'image du maillot, ou simple récapitulatif texte en V1 si l'aperçu visuel est trop complexe)
- Supplément de prix pour la personnalisation
- Délai de préparation plus long affiché pour les articles personnalisés
- **Workflow stock vs flocage à la demande** : le maillot est un article de stock générique (`ProductVariant`), le flocage est une opération réalisée *après* la commande — il n'y a pas de "stock de maillots déjà floqués". Deux options possibles à trancher :
  - Stock de maillots vierges en boutique, floqués à la commande (délai court)
  - Commande auprès d'un fournisseur seulement après achat confirmé (délai plus long)
- **Règle : le flocage ne démarre qu'après confirmation du paiement.** Pour les commandes en paiement mobile, la confirmation est automatique/rapide. Pour les commandes en paiement à la livraison, le flocage n'est lancé qu'après une confirmation manuelle (ex. appel téléphonique) du client, afin d'éviter de personnaliser un maillot pour une commande finalement non honorée

### 5.3 Panier & commande
- Ajout/suppression/modification de quantité
- Récapitulatif prix (produit + personnalisation + livraison)
- **Formulaire client simplifié** : nom + numéro de téléphone (seuls champs obligatoires pour passer commande)
- **Adresse de livraison (quartier/ville)** :
  - Obligatoire à la commande si paiement mobile choisi, car la commande est confirmée automatiquement dès le paiement validé et peut partir directement en préparation/expédition sans appel préalable
  - Optionnelle en ligne si paiement à la livraison choisi : peut être récupérée lors de l'appel de confirmation client prévu en 5.5, pour garder un tunnel de commande le plus court possible
- Choix du mode de paiement
- Pas de mot de passe requis pour commander : le numéro de téléphone sert d'identifiant client (voir 5.7)

### 5.4 Paiement
- **Paiement mobile** : intégration Bankily / Masrvi / Sedad (selon API/passerelle disponible en Mauritanie — à valider techniquement, certains fonctionnent par confirmation manuelle de transaction si pas d'API publique)
- **Paiement à la livraison** : commande confirmée, paiement encaissé par le livreur
- Statut de paiement associé à chaque commande (en attente / payé / échoué)

### 5.5 Suivi de commande
Statuts proposés :
`Reçue → Confirmée (paiement validé) → En préparation (flocage, si applicable) → Expédiée → Livrée → (Annulée)`
- Pour le paiement à la livraison : un sous-statut "En attente de confirmation client" précède "Confirmée". Cet appel sert à la fois à valider la commande avant de lancer un éventuel flocage **et** à récupérer l'adresse de livraison précise si elle n'a pas été saisie en ligne
- Le client peut consulter le statut de sa commande en entrant son numéro de téléphone (pas de connexion à un compte requise)
- Notification par SMS ou WhatsApp à chaque changement de statut (optionnel V1, recommandé)

### 5.6 Espace admin
- Gestion catalogue : ajout/modif/suppression de maillots, gestion des stocks par taille
- Gestion des commandes : liste, filtres par statut, changement de statut
- Vue des paiements (mode, statut)
- Statistiques simples : ventes du jour/semaine/mois, produits les plus vendus

### 5.7 Compte client (simplifié, sans mot de passe)
- Pas d'inscription formelle en V1 : le client est identifié par son **numéro de téléphone**, créé ou retrouvé automatiquement dès la première commande (pas de mot de passe)
- Historique de commandes consultable en saisissant son numéro de téléphone (option : code de vérification envoyé par SMS pour sécuriser l'accès, optionnel en V1)
- Adresses de livraison rattachées au numéro de téléphone et réutilisables sur les commandes suivantes
- Objectif : réduire au maximum la friction d'achat pour un client ponctuel, en cohérence avec les usages locaux (commande par téléphone/WhatsApp plutôt que création de compte web classique)
- Le mot de passe reste réservé à l'espace admin (accès unique, sécurisé)

## 6. Architecture technique proposée

### Stack
- **Frontend** : React / Next.js (cohérent avec ton projet [[cadre-mr-clone]])
- **Backend** : Next.js API routes (ou backend séparé Node.js/Express si tu préfères découpler)
- **Base de données** : PostgreSQL **managé via Supabase**, accédé via Prisma ORM (schéma/migrations Prisma, hébergement Supabase)
- **Stockage images** : **Supabase Storage** pour les photos de maillots/équipements (au lieu d'un service séparé type Cloudinary/S3 — un seul prestataire à gérer)
- **Authentification** : téléphone comme identifiant client (sans mot de passe, logique custom) ; **Supabase Auth** (email + mot de passe) réservé au compte admin unique
- **Paiement** : module dédié par prestataire (Bankily/Masrvi/Sedad), avec fallback "paiement à la livraison" toujours disponible

> Choix retenu : Supabase regroupe DB + Storage + Auth admin dans un seul service/compte, avec un free tier suffisant pour démarrer un MVP à faible volume — évite de gérer 2-3 prestataires séparés.

### Modèle de données (entités principales)
- `User` — client (identifié par `téléphone`, `nom`, mot de passe **nul**) ou admin (email + mot de passe)
- `Category` — maillots / équipements de sport
- `Product` (maillot ou équipement) — catégorie, club, saison, description, prix de base
- `ProductImage` — produit associé, URL image, ordre d'affichage
- `ProductVariant` — taille, stock, prix ajusté si besoin
- `Order` — client (téléphone), statut, total, mode de paiement, **adresse (obligatoire si paiement mobile, nullable sinon — renseignée après coup lors de l'appel de confirmation)**
- `OrderItem` — produit, variante, quantité, personnalisation (nom/numéro), prix unitaire
- `Payment` — commande, mode, statut, référence transaction

## 7. Roadmap suggérée

| Phase | Contenu |
|---|---|
| V1 (MVP) | Catalogue, personnalisation, panier, commande, paiement mobile + à la livraison, admin unique |
| V2 | Comptes admin multiples, notifications automatiques, promotions |
| V3 | Marketplace multi-vendeurs, appli mobile |

## 8. Points à valider avant le développement
- Disponibilité d'une API pour Bankily/Masrvi/Sedad, ou processus manuel de confirmation de paiement
- Mode de gestion du flocage : aperçu visuel en temps réel ou simple champ texte en V1
- Zones de livraison couvertes (Nouakchott uniquement au départ ou plus large)
- Fournisseur/mode d'approvisionnement des maillots ET des équipements de sport (stock propre vs commande à la demande)
- Sécurisation de l'accès à l'historique de commande par téléphone (code SMS ou accès libre par numéro)
