import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findCustomerByPhone } from "@/lib/customer-data";
import { createCustomerSession, CUSTOMER_COOKIE_NAME, CUSTOMER_SESSION_DURATION } from "@/lib/customer-auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const { phone, password } = body;
    const cleanPhone = (phone || "").trim();

    if (!cleanPhone || !password) {
      return NextResponse.json({ error: "Numéro de téléphone et mot de passe requis." }, { status: 400 });
    }

    const customer = findCustomerByPhone(cleanPhone);
    if (!customer) {
      return NextResponse.json({ error: "Aucun compte trouvé avec ce numéro de téléphone." }, { status: 404 });
    }

    const valid = await bcrypt.compare(password, customer.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
    }

    const token = await createCustomerSession(customer.id);

    const response = NextResponse.json({
      success: true,
      customer: {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
      },
    });

    response.cookies.set(CUSTOMER_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: CUSTOMER_SESSION_DURATION,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Erreur serveur lors de la connexion." }, { status: 500 });
  }
}
