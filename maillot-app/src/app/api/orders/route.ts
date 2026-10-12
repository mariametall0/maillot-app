import { NextRequest, NextResponse } from "next/server";
import { readOrders, writeOrders, type AdminOrder } from "@/lib/admin-data";
import { checkOrderRateLimit } from "@/lib/rate-limiter";

function sanitizeText(val: unknown, maxLen = 200): string {
  if (typeof val !== "string") return "";
  return val
    .replace(/<[^>]*>?/gm, "") // strip HTML tags
    .replace(/[<>'"]/g, "")     // strip injection characters
    .trim()
    .slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";

    // Protection anti-spam par IP (max 10 commandes / 10 minutes)
    if (!checkOrderRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez patienter avant de passer une autre commande." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || !body.customerName || !body.customerPhone || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Données de commande incomplètes." }, { status: 400 });
    }

    // Assainissement des entrées (XSS shield)
    const customerName = sanitizeText(body.customerName, 80);
    const customerAddress = sanitizeText(body.customerAddress || "Nouakchott", 150);
    const notes = body.notes ? sanitizeText(body.notes, 300) : undefined;

    // Validation du numéro de téléphone mauritanien (8 chiffres)
    const rawPhone = String(body.customerPhone).replace(/\s+/g, "").replace(/^\+222/, "");
    if (!/^[0-9]{8}$/.test(rawPhone)) {
      return NextResponse.json(
        { error: "Numéro de téléphone invalide (8 chiffres requis en Mauritanie)." },
        { status: 400 }
      );
    }
    const customerPhone = rawPhone;

    // Validation sécurisée des articles (max 20 types d'articles par commande)
    const items = (body.items as Array<Record<string, unknown>>)
      .slice(0, 20)
      .map((i) => {
        const qty = Math.max(1, Math.min(50, Math.floor(Number(i.quantity) || 1)));
        const price = Math.max(0, Math.min(1000000, Number(i.price) || 0));
        return {
          productId: sanitizeText(i.productId || "prod-1", 50),
          productName: sanitizeText(i.productName || "Article", 80),
          size: sanitizeText(i.size || "M", 10),
          quantity: qty,
          price: price,
          flocage: i.flocage ? sanitizeText(i.flocage, 40) : undefined,
        };
      });

    // Calcul / validation du montant total
    const computedTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalAmount = computedTotal > 0 ? computedTotal : Math.max(0, Math.min(10000000, Number(body.totalAmount) || 0));

    // Méthode de paiement acceptée
    const allowedPayment = ["LIVRAISON", "BANKILY", "MASRIVI", "SEDAD"];
    const paymentMethod = allowedPayment.includes(String(body.paymentMethod)) ? String(body.paymentMethod) : "LIVRAISON";

    const orders = readOrders();

    const newOrder: AdminOrder = {
      id: `CMD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: "EN_ATTENTE",
      customerName: customerName || "Client",
      customerPhone,
      customerAddress: customerAddress || "Nouakchott",
      paymentMethod,
      items,
      totalAmount,
      notes,
    };

    orders.unshift(newOrder);
    writeOrders(orders);

    return NextResponse.json({ success: true, orderId: newOrder.id });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Erreur serveur lors de la commande." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get("phone");
  if (!phone) {
    return NextResponse.json({ error: "Numéro de téléphone requis." }, { status: 400 });
  }

  const cleanPhone = phone.replace(/\s+/g, "").replace(/^\+222/, "").trim();
  const orders = readOrders();
  const customerOrders = orders.filter((o) => o.customerPhone.trim() === cleanPhone);

  return NextResponse.json(customerOrders);
}
