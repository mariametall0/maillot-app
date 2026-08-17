// Filet de sécurité pour les routes hors [locale] (rare — le proxy redirige
// normalement tout vers /fr, /en ou /ar). Fournit son propre <html>/<body>
// puisque le layout racine n'en fournit pas.
export default function RootNotFound() {
  return (
    <html lang="fr">
      <body>
        <div style={{ padding: "4rem", textAlign: "center", fontFamily: "sans-serif" }}>
          <h1>Page introuvable</h1>
          <a href="/fr">Retour à l&apos;accueil</a>
        </div>
      </body>
    </html>
  );
}
