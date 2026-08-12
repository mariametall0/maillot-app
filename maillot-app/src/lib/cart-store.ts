// Store panier externe (localStorage), consommé via useSyncExternalStore côté React
// (voir cart-context.tsx). Évite de calquer l'hydratation localStorage sur un
// setState() dans useEffect, ce que React 19 déconseille désormais.
import type { CartItem } from "./types";
import { lineKeyOf } from "./cart-line-key";

const STORAGE_KEY = "maillot-app.cart";

type Listener = () => void;

let items: CartItem[] = [];
let hydrated = false;
const listeners = new Set<Listener>();

function persist() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function emit() {
  for (const listener of listeners) listener();
}

// Appelée uniquement côté client, depuis subscribe() (donc après le rendu initial
// côté serveur) — évite tout écart de rendu entre le HTML serveur et l'hydratation.
function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    items = JSON.parse(raw);
    emit();
  } catch {
    // panier corrompu, on repart d'un panier vide
  }
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  hydrate();
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  return items;
}

export function getServerSnapshot() {
  return items; // toujours [] côté serveur (pas de localStorage)
}

export function addItem(newItem: CartItem) {
  const key = lineKeyOf(newItem);
  const existing = items.find((it) => lineKeyOf(it) === key);
  items = existing
    ? items.map((it) => (lineKeyOf(it) === key ? { ...it, quantity: it.quantity + newItem.quantity } : it))
    : [...items, newItem];
  persist();
  emit();
}

export function removeItem(variantId: string, personalizationKey?: string) {
  items = items.filter(
    (it) =>
      !(
        it.variantId === variantId &&
        `${it.personalizationName ?? ""}::${it.personalizationNumber ?? ""}` === (personalizationKey ?? "::")
      )
  );
  persist();
  emit();
}

export function updateQuantity(variantId: string, personalizationKey: string | undefined, quantity: number) {
  items = items
    .map((it) => {
      const matches =
        it.variantId === variantId &&
        `${it.personalizationName ?? ""}::${it.personalizationNumber ?? ""}` === (personalizationKey ?? "::");
      return matches ? { ...it, quantity } : it;
    })
    .filter((it) => it.quantity > 0);
  persist();
  emit();
}

export function clearCart() {
  items = [];
  persist();
  emit();
}
