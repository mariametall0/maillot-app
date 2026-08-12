import type { CartItem } from "./types";

// Une même variante peut apparaître plusieurs fois dans le panier avec des
// personnalisations différentes (nom/numéro) : la clé de ligne combine
// variantId + personnalisation pour identifier une ligne panier de façon unique.
export function lineKeyOf(item: Pick<CartItem, "variantId" | "personalizationName" | "personalizationNumber">) {
  return `${item.variantId}::${item.personalizationName ?? ""}::${item.personalizationNumber ?? ""}`;
}
