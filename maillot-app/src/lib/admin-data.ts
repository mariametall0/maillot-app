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
};

const INITIAL_PRODUCTS: AdminProduct[] = [
  {
    id: "maillot-crystal-palace-away-2025",
    name: "Crystal Palace – Maillot Extérieur 2024/2025",
    category: "MAILLOT",
    club: "Crystal Palace",
    season: "2024/2025",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/crystal_palace_away.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 25,
    active: true,
    createdAt: "2026-11-02T15:30:00.000Z",
  },
  {
    id: "maillot-chelsea-special-edition",
    name: "Chelsea FC – Maillot Domicile Édition Spéciale",
    category: "MAILLOT",
    club: "Chelsea FC",
    season: "2024/2025",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/chelsea_special_edition.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 30,
    active: true,
    createdAt: "2026-11-02T15:30:00.000Z",
  },
  {
    id: "maillot-manchester-united-home-2025",
    name: "Manchester United – Maillot Domicile 2024/2025",
    category: "MAILLOT",
    club: "Manchester United",
    season: "2024/2025",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/manchester_united_home.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 35,
    active: true,
    createdAt: "2026-11-02T15:30:00.000Z",
  },
  {
    id: "maillot-inter-milan-home-2025",
    name: "Inter Milan – Maillot Domicile 2 Étoiles 2024/2025",
    category: "MAILLOT",
    club: "Inter Milan",
    season: "2024/2025",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/inter_milan_home.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 28,
    active: true,
    createdAt: "2026-11-02T15:30:00.000Z",
  },
  {
    id: "maillot-ol-lyon-home-2025",
    name: "Olympique Lyonnais – Maillot Domicile 2024/2025",
    category: "MAILLOT",
    club: "Olympique Lyonnais",
    season: "2024/2025",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/ol_lyon_home.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 25,
    active: true,
    createdAt: "2026-11-02T15:30:00.000Z",
  },
  {
    id: "maillot-real-madrid-home-2025",
    name: "Real Madrid – Maillot Domicile 2024/2025",
    category: "MAILLOT",
    club: "Real Madrid",
    season: "2024/2025",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/real_madrid_home.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 40,
    active: true,
    createdAt: "2026-11-02T15:30:00.000Z",
  },
  {
    id: "maillot-barca-third-turquoise-2025",
    name: "FC Barcelone – Maillot Third Turquoise 2024/2025",
    category: "MAILLOT",
    club: "FC Barcelona",
    season: "2024/2025",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/barca_third_turquoise.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 30,
    active: true,
    createdAt: "2026-11-02T15:30:00.000Z",
  },
  {
    id: "maillot-barca-home-125-2025",
    name: "FC Barcelone – Maillot Domicile 125e Anniversaire",
    category: "MAILLOT",
    club: "FC Barcelona",
    season: "2024/2025",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/barca_home_125.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 45,
    active: true,
    createdAt: "2026-11-02T15:30:00.000Z",
  },
  {
    id: "maillot-bayern-heritage-2025",
    name: "Bayern Munich – Maillot Spécial Heritage Originals",
    category: "MAILLOT",
    club: "Bayern Munich",
    season: "2024/2025",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/bayern_heritage.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 25,
    active: true,
    createdAt: "2026-11-02T15:30:00.000Z",
  },
  {
    id: "maillot-barca-kobe-bryant-mamba",
    name: "FC Barcelone – Édition Kobe Bryant Mamba Special",
    category: "MAILLOT",
    club: "FC Barcelona",
    season: "2024/2025",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: true,
    imageUrl: "/images/products/barca_kobe_mamba.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "taille",
    stock: 35,
    active: true,
    createdAt: "2026-11-02T15:30:00.000Z",
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
