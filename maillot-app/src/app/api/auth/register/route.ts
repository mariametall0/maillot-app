import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findCustomerByPhone, createCustomer } from "@/lib/customer-data";
import { createCustomerSession, CUSTOMER_COOKIE_NAME, CUSTOMER_SESSION_DURATION } from "@/lib/customer-auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const { name, phone, password, address } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "Le nom complet est requis (au moins 2 caractères)." }, { status: 400 });
    }

    const cleanPhone = (phone || "").trim();
    if (!/^[0-9]{8}$/.test(cleanPhone)) {
      return NextResponse.json({ error: "Le numéro de téléphone doit comporter exactement 8 chiffres." }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ error: "Le mot de passe doit comporter au moins 6 caractères." }, { status: 400 });
    }

    // Vérifier si le numéro existe déjà
    const existing = findCustomerByPhone(cleanPhone);
    if (existing) {
      return NextResponse.json({ error: "Ce numéro de téléphone est déjà associé à un compte. Veuillez vous connecter." }, { status: 409 });
    }

    // Hacher le mot de passe
    const passwordHash = await bcrypt.hash(password, 10);

    // Créer le client
    const customer = createCustomer({
      name: name.trim(),
      phone: cleanPhone,
      passwordHash,
      address: (address || "").trim(),
    });

    // Créer le token de session
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
    console.error("Register error:", error);
    return NextResponse.json({ error: "Erreur serveur lors de l'inscription." }, { status: 500 });
  }
}
