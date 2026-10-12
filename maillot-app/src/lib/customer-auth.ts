import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { findCustomerById, type Customer } from "./customer-data";

import crypto from "crypto";

function getSecretKey(rawSecret: string): Uint8Array {
  return crypto.createHash("sha256").update(rawSecret).digest();
}

const JWT_SECRET = getSecretKey(
  process.env.CUSTOMER_JWT_SECRET || "halwarkits-sport-secure-customer-auth-salt-2026-mr"
);
const CUSTOMER_COOKIE_NAME = "halwarkits_customer_session";
const CUSTOMER_SESSION_DURATION = 30 * 24 * 60 * 60; // 30 jours en secondes

export async function createCustomerSession(customerId: string) {
  const token = await new SignJWT({ sub: customerId, role: "customer" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${CUSTOMER_SESSION_DURATION}s`)
    .sign(JWT_SECRET);
  return token;
}

export async function verifyCustomerSession(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return (payload.sub as string) || null;
  } catch {
    return null;
  }
}

export async function getCurrentCustomer(): Promise<Customer | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(CUSTOMER_COOKIE_NAME)?.value;
    if (!token) return null;
    const customerId = await verifyCustomerSession(token);
    if (!customerId) return null;
    return findCustomerById(customerId);
  } catch {
    return null;
  }
}

export { CUSTOMER_COOKIE_NAME, CUSTOMER_SESSION_DURATION };
