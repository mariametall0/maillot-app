import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MaillotF — Maillots & équipements de sport",
  description: "Vente de maillots de clubs personnalisables (flocage) et d'équipements de sport.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-50 text-black">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-black/10 py-6 text-center text-sm text-black/50">
            MaillotF — Nouakchott, Mauritanie
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
