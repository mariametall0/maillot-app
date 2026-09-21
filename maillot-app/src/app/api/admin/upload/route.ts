import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { writeFile } from "fs/promises";
import path from "path";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const formData = await req.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Fichier manquant." }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }

  // Vérification type MIME
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Type de fichier non autorisé. Utilisez JPG, PNG ou WebP." },
      { status: 400 }
    );
  }

  // Vérification taille
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Fichier trop grand. Maximum 5 MB." },
      { status: 400 }
    );
  }

  // Générer un nom de fichier unique et sécurisé
  const ext = file.type === "image/webp" ? "webp" : file.type === "image/png" ? "png" : "jpg";
  const filename = `product-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const savePath = path.join(process.cwd(), "public", "images", "products", filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(savePath, buffer);

  return NextResponse.json({ url: `/images/products/${filename}` });
}
