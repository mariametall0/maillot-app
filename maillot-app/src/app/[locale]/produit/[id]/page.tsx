import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { ProductDetail } from "./product-detail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
