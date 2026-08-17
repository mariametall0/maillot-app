import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 : ce fichier s'appelait middleware.ts avant la v16 (toujours
// supporté mais déprécié) — on utilise directement la nouvelle convention.
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
