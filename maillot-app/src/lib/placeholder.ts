// Génère une image placeholder en SVG inline (data URI) — évite toute dépendance
// réseau externe tant que les vraies photos (Supabase Storage) ne sont pas en place.
export function placeholderImage(label: string, color = "#1d4ed8") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
    <rect width="100%" height="100%" fill="${color}"/>
    <text x="50%" y="50%" font-family="sans-serif" font-size="42" fill="white"
      text-anchor="middle" dominant-baseline="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
