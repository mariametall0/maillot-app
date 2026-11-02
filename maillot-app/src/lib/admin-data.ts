import fs from "fs";
import path from "path";

// Fichier de données hors du dossier public (non accessible en HTTP)
const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// ─── PRODUITS ────────────────────────────────────────────────────────────────

export type AdminProduct = {
  id: string;
  name: string;
  category: "MAILLOT" | "EQUIPEMENT";
  subtype?: string;
  club?: string;
  season?: string;
  basePrice: number;
  originalPrice?: number;
  discountPercent?: number;
  personalizable: boolean;
  imageUrl: string;
  sizes: string[];
  sizeType: "taille" | "pointure";
  stock: number;
  active: boolean;
  createdAt: string;
  description?: string;
};

const INITIAL_PRODUCTS: AdminProduct[] = [
  {
    id: "maillot-grenat-or-collector",
    name: "Maillot Spécial Collector Grenat & Or",
    category: "MAILLOT",
    club: "Édition Spéciale",
    season: "2024/2025",
    description: "Maillot collector haute performance bordeaux et or avec détails dorés haute précision, flocage officiel et coupe athlétique sur mannequin studio.",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/maillot_grenat_or.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 35,
    active: true,
    createdAt: "2026-11-02T16:00:00.000Z",
  },
  {
    id: "maillot-crystal-palace-away-2025",
    name: "Crystal Palace – Maillot Extérieur 2024/2025",
    category: "MAILLOT",
    club: "Crystal Palace",
    season: "2024/2025",
    description: "Maillot extérieur Crystal Palace aux couleurs bleu royal et rouge vif avec motif graphique éclairs et vagues dynamiques, équipementier Macron et sponsor Net88.",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/crystal_palace_away.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 25,
    active: true,
    createdAt: "2026-11-02T16:00:00.000Z",
  },
  {
    id: "maillot-chelsea-special-edition",
    name: "Chelsea FC – Maillot Domicile Édition Spéciale",
    category: "MAILLOT",
    club: "Chelsea FC",
    season: "2024/2025",
    description: "Maillot concept édition spéciale Chelsea FC bleu électrique avec accents jaune fluo haute visibilité, lion rampant et sponsor USDC BY CIRCLE.",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/chelsea_special_edition.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 30,
    active: true,
    createdAt: "2026-11-02T16:00:00.000Z",
  },
  {
    id: "maillot-manchester-united-home-2025",
    name: "Manchester United – Maillot Domicile 2024/2025",
    category: "MAILLOT",
    club: "Manchester United",
    season: "2024/2025",
    description: "Maillot domicile officiel Manchester United rouge éclatant avec col polo rabattable noir et blanc, trois bandes Adidas et sponsor Snapdragon.",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/manchester_united_home.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 35,
    active: true,
    createdAt: "2026-11-02T16:00:00.000Z",
  },
  {
    id: "maillot-inter-milan-home-2025",
    name: "Inter Milan – Maillot Domicile 2 Étoiles 2024/2025",
    category: "MAILLOT",
    club: "Inter Milan",
    season: "2024/2025",
    description: "Maillot domicile Inter Milan rayé bleu et noir orné des 2 étoiles dorées historiques du 20e Scudetto, logo Nike et sponsor Betsson.sport dorés.",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/inter_milan_home.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 28,
    active: true,
    createdAt: "2026-11-02T16:00:00.000Z",
  },
  {
    id: "maillot-benfica-special-gris-rouge",
    name: "Maillot spécial Benfica - Gris à Motifs et Rouge",
    category: "MAILLOT",
    club: "Benfica",
    season: "2024/2025",
    description: "Maillot de football du Benfica à fond gris clair doté d'un motif damassé/baroque ton sur ton, contrasté par un col polo, des bordures de manches et des logos rouges, incluant le sponsor « Emirates Fly Better ».",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/benfica_third_grey.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 30,
    active: true,
    createdAt: "2026-11-02T16:25:00.000Z",
  },
];

export function readProducts(): AdminProduct[] {
  ensureDataDir();
  if (!fs.existsSync(PRODUCTS_FILE)) {
    writeProducts(INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  }
  try {
    return JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf-8")) as AdminProduct[];
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function writeProducts(products: AdminProduct[]): void {
  ensureDataDir();
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
}

export function addProduct(product: Omit<AdminProduct, "id" | "createdAt">): AdminProduct {
  const products = readProducts();
  const newProduct: AdminProduct = {
    ...product,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  products.unshift(newProduct);
  writeProducts(products);
  return newProduct;
}

export function updateProduct(id: string, data: Partial<AdminProduct>): boolean {
  const products = readProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  products[idx] = { ...products[idx], ...data };
  writeProducts(products);
  return true;
}

export function deleteProduct(id: string): boolean {
  const products = readProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  writeProducts(filtered);
  return true;
}

// ─── COMMANDES ───────────────────────────────────────────────────────────────

export type OrderStatus = "EN_ATTENTE" | "CONFIRMEE" | "EXPEDIEE" | "LIVREE" | "ANNULEE";

export type AdminOrder = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  paymentMethod: string;
  items: {
    productId: string;
    productName: string;
    size: string;
    quantity: number;
    price: number;
    flocage?: string;
  }[];
  totalAmount: number;
  notes?: string;
};

export function readOrders(): AdminOrder[] {
  ensureDataDir();
  if (!fs.existsSync(ORDERS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf-8")) as AdminOrder[];
  } catch {
    return [];
  }
}

export function writeOrders(orders: AdminOrder[]): void {
  ensureDataDir();
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

export function updateOrderStatus(id: string, status: OrderStatus): boolean {
  const orders = readOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return false;
  orders[idx].status = status;
  writeOrders(orders);
  return true;
}
