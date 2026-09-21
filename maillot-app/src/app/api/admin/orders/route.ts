import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { readOrders, updateOrderStatus, type OrderStatus } from "@/lib/admin-data";

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  return NextResponse.json(readOrders());
}

export async function PATCH(req: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body?.id || !body?.status) {
    return NextResponse.json({ error: "Données manquantes." }, { status: 400 });
  }
  const validStatuses: OrderStatus[] = ["EN_ATTENTE", "CONFIRMEE", "EXPEDIEE", "LIVREE", "ANNULEE"];
  if (!validStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }
  const ok = updateOrderStatus(body.id, body.status);
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
}
