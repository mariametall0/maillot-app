import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { createAdminSession, COOKIE_NAME, SESSION_DURATION } from "@/lib/admin-auth";
import { checkRateLimit, recordFailedAttempt, clearAttempts } from "@/lib/rate-limiter";

function getPasswordHash(): string | null {
  // Lire depuis le fichier .admin-hash (évite les problèmes d'échappement $ dans .env)
  const hashFile = path.join(process.cwd(), ".admin-hash");
  if (fs.existsSync(hashFile)) {
    return fs.readFileSync(hashFile, "utf-8").trim();
  }
  // Fallback sur la variable d'environnement
  return process.env.ADMIN_PASSWORD_HASH ?? null;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";

  // Vérification rate limiting
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: `Trop de tentatives. Réessayez dans ${rateCheck.resetIn} minute(s).` },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const { password } = body as { password?: string };

  if (!password) {
    return NextResponse.json({ error: "Mot de passe requis." }, { status: 400 });
  }

  const hash = getPasswordHash();
  if (!hash) {
    return NextResponse.json({ error: "Configuration serveur manquante." }, { status: 500 });
  }

  const valid = await bcrypt.compare(password, hash);

  if (!valid) {
    recordFailedAttempt(ip);
    const remaining = rateCheck.remaining - 1;
    const msg = remaining > 0
      ? `Mot de passe incorrect. ${remaining} tentative(s) restante(s).`
      : "Mot de passe incorrect. Compte bloqué 15 minutes.";
    return NextResponse.json({ error: msg }, { status: 401 });
  }

  // Succès — créer la session
  clearAttempts(ip);
  const token = await createAdminSession();

  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_DURATION,
    path: "/",
  });

  return response;
}
