import { notFound } from "next/navigation";
import { getProductById } from "@/lib/mock-data";
import { ProductDetail } from "./product-detail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
