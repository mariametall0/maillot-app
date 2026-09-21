import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const CUSTOMERS_FILE = path.join(DATA_DIR, "customers.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export type Customer = {
  id: string;
  name: string;
  phone: string;
  passwordHash: string;
  address: string;
  createdAt: string;
};

export function readCustomers(): Customer[] {
  ensureDataDir();
  if (!fs.existsSync(CUSTOMERS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(CUSTOMERS_FILE, "utf-8")) as Customer[];
  } catch {
    return [];
  }
}

export function writeCustomers(customers: Customer[]): void {
  ensureDataDir();
  fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(customers, null, 2), "utf-8");
}

export function findCustomerByPhone(phone: string): Customer | null {
  const customers = readCustomers();
  return customers.find((c) => c.phone.trim() === phone.trim()) || null;
}

export function findCustomerById(id: string): Customer | null {
  const customers = readCustomers();
  return customers.find((c) => c.id === id) || null;
}

export function createCustomer(data: Omit<Customer, "id" | "createdAt">): Customer {
  const customers = readCustomers();
  const newCust: Customer = {
    ...data,
    id: `cust-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  customers.push(newCust);
  writeCustomers(customers);
  return newCust;
}

export function updateCustomer(id: string, data: Partial<Omit<Customer, "id" | "createdAt">>): boolean {
  const customers = readCustomers();
  const idx = customers.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  customers[idx] = { ...customers[idx], ...data };
  writeCustomers(customers);
  return true;
}
