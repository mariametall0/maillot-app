import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { readProducts, addProduct, updateProduct, deleteProduct } from "@/lib/admin-data";

// GET — liste tous les produits
export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  return NextResponse.json(readProducts());
}

// POST — ajouter un produit
export async function POST(req: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body || !body.name || !body.category || !body.basePrice) {
    return NextResponse.json({ error: "Données manquantes." }, { status: 400 });
  }
  const product = addProduct({
    name: body.name,
    category: body.category,
    subtype: body.subtype,
    club: body.club,
    season: body.season,
    basePrice: Number(body.basePrice),
    originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
    discountPercent: body.discountPercent ? Number(body.discountPercent) : undefined,
    personalizable: Boolean(body.personalizable),
    imageUrl: body.imageUrl || "/images/products/maillot_domicile.jpg",
    sizes: body.sizes || ["S", "M", "L", "XL"],
    sizeType: body.sizeType || "taille",
    stock: Number(body.stock) || 0,
    active: true,
  });
  return NextResponse.json(product, { status: 201 });
}

// PATCH — modifier un produit
export async function PATCH(req: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body?.id) {
    return NextResponse.json({ error: "ID manquant." }, { status: 400 });
  }
  const ok = updateProduct(body.id, body);
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
}

// DELETE — supprimer un produit
export async function DELETE(req: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID manquant." }, { status: 400 });
  const ok = deleteProduct(id);
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
}
