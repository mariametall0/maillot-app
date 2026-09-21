import Link from "next/link";

// Filet de sécurité pour les routes hors [locale] (rare — le proxy redirige
// normalement tout vers /fr, /en ou /ar). Fournit son propre <html>/<body>
// puisque le layout racine n'en fournit pas.
export default function RootNotFound() {
  return (
    <html lang="fr">
      <body>
        <div style={{ padding: "4rem", textAlign: "center", fontFamily: "sans-serif" }}>
          <h1>Page introuvable</h1>
          <Link href="/fr">Retour à l&apos;accueil</Link>
        </div>
      </body>
    </html>
  );
}
