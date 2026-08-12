"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import type { CartItem } from "./types";
import * as cartStore from "./cart-store";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string, personalizationKey?: string) => void;
  updateQuantity: (variantId: string, personalizationKey: string | undefined, quantity: number) => void;
  clear: () => void;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, it) => sum + (it.unitPrice + it.personalizationFee) * it.quantity, 0);
    const itemCount = items.reduce((sum, it) => sum + it.quantity, 0);
    return {
      items,
      addItem: cartStore.addItem,
      removeItem: cartStore.removeItem,
      updateQuantity: cartStore.updateQuantity,
      clear: cartStore.clearCart,
      subtotal,
      itemCount,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé sous CartProvider");
  return ctx;
}
