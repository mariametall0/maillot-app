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
    id: "maillot-real-2026",
    name: "Maillot Real Madrid Domicile 2025/2026",
    category: "MAILLOT",
    club: "Real Madrid",
    season: "2025/2026",
    basePrice: 3500,
    originalPrice: 4500,
    discountPercent: 22,
    personalizable: true,
    imageUrl: "/images/products/maillot_real.jpg",
    sizes: ["S", "M", "L", "XL"],
    sizeType: "taille",
    stock: 45,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "crampons-mercurial-pro",
    name: "Chaussures Nike Mercurial Superfly FG",
    category: "EQUIPEMENT",
    subtype: "CHAUSSURES",
    basePrice: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    personalizable: false,
    imageUrl: "/images/products/crampons_pro.jpg",
    sizes: ["40", "41", "42", "43"],
    sizeType: "pointure",
    stock: 23,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "ballon-champions-league",
    name: "Ballon Officiel UEFA Champions League",
    category: "EQUIPEMENT",
    subtype: "BALLONS",
    basePrice: 1500,
    originalPrice: 2000,
    discountPercent: 25,
    personalizable: false,
    imageUrl: "/images/products/ballon_match.jpg",
    sizes: ["Taille 5"],
    sizeType: "taille",
    stock: 25,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "gants-gardien-pro",
    name: "Gants de Gardien Predator Pro Competition",
    category: "EQUIPEMENT",
    subtype: "GANTS",
    basePrice: 2000,
    originalPrice: 2600,
    discountPercent: 23,
    personalizable: false,
    imageUrl: "/images/grid_equipements_sport.jpg",
    sizes: ["Taille 8", "Taille 9", "Taille 10"],
    sizeType: "taille",
    stock: 19,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "maillot-barca-2026",
    name: "Maillot FC Barcelone Domicile 2025/2026",
    category: "MAILLOT",
    club: "FC Barcelona",
    season: "2025/2026",
    basePrice: 3500,
    originalPrice: 4200,
    discountPercent: 16,
    personalizable: true,
    imageUrl: "/images/products/maillot_barca.jpg",
    sizes: ["S", "M", "L"],
    sizeType: "taille",
    stock: 32,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "maillot-mauritanie-2026",
    name: "Maillot Mauritanie Domicile Officiel",
    category: "MAILLOT",
    club: "Mourabitounes",
    season: "2025/2026",
    basePrice: 3200,
    originalPrice: 3800,
    discountPercent: 15,
    personalizable: true,
    imageUrl: "/images/products/maillot_mauritanie.jpg",
    sizes: ["S", "M", "L"],
    sizeType: "taille",
    stock: 50,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "maillot-barka-ext-2026",
    name: "Maillot FC Barka Extérieur Collector",
    category: "MAILLOT",
    club: "FC Barka",
    season: "2025/2026",
    basePrice: 2800,
    originalPrice: 3500,
    discountPercent: 20,
    personalizable: true,
    imageUrl: "/images/products/maillot_barka_ext.jpg",
    sizes: ["M", "L"],
    sizeType: "taille",
    stock: 15,
    active: true,
    createdAt: new Date().toISOString(),
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
