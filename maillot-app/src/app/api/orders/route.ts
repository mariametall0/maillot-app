import { NextRequest, NextResponse } from "next/server";
import { readOrders, writeOrders, type AdminOrder } from "@/lib/admin-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.customerName || !body.customerPhone || !body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Données de commande incomplètes." }, { status: 400 });
    }

    const orders = readOrders();

    const newOrder: AdminOrder = {
      id: `CMD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: "EN_ATTENTE",
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerAddress: body.customerAddress || "Nouakchott",
      paymentMethod: body.paymentMethod || "LIVRAISON",
      items: (body.items as Array<Record<string, unknown>>).map((i) => ({
        productId: String(i.productId || "prod-1"),
        productName: String(i.productName || "Article"),
        size: String(i.size || "M"),
        quantity: Number(i.quantity) || 1,
        price: Number(i.price) || 0,
        flocage: i.flocage ? String(i.flocage) : undefined,
      })),
      totalAmount: Number(body.totalAmount) || 0,
      notes: body.notes || undefined,
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

  const orders = readOrders();
  const customerOrders = orders.filter((o) => o.customerPhone.trim() === phone.trim());

  return NextResponse.json(customerOrders);
}
