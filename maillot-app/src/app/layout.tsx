import type { ReactNode } from "react";

// Layout racine minimal : app/[locale]/layout.tsx fournit <html>/<body>
// (avec la locale/dir corrects). Requis par Next.js même si tout le contenu
// réel vit sous [locale] — voir la doc next-intl "with-i18n-routing".
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
