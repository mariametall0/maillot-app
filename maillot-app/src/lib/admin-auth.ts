import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

import crypto from "crypto";

function getSecretKey(rawSecret: string): Uint8Array {
  return crypto.createHash("sha256").update(rawSecret).digest();
}

const JWT_SECRET = getSecretKey(
  process.env.ADMIN_JWT_SECRET || "halwarkits-sport-secure-admin-session-salt-2026-mr"
);
const COOKIE_NAME = "halwarkits_admin_session";
const SESSION_DURATION = 8 * 60 * 60; // 8 heures en secondes

export async function createAdminSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(JWT_SECRET);
  return token;
}

export async function verifyAdminSession(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyAdminSession(token);
}

export { COOKIE_NAME, SESSION_DURATION };
