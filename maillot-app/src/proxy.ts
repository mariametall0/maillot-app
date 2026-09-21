import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "./lib/admin-auth";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Protection des routes admin (/fr/admin, /en/admin, /ar/admin) ──────────
  const isAdminRoute = /^\/[a-z]{2}\/admin/.test(pathname);
  const isAdminLoginPage = /^\/[a-z]{2}\/admin\/login/.test(pathname);

  if (isAdminRoute && !isAdminLoginPage) {
    const token = req.cookies.get("footzone_admin_session")?.value;
    const isValid = token ? await verifyAdminSession(token) : false;

    if (!isValid) {
      // Extraire le locale de l'URL
      const locale = pathname.split("/")[1] || "fr";
      const loginUrl = new URL(`/${locale}/admin/login`, req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ── Middleware i18n pour le reste ─────────────────────────────────────────
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)" ],
};
