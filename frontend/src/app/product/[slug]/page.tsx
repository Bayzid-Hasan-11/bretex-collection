import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { Product } from "@/context/CartContext";

async function getProduct(slug: string): Promise<Product> {
  const res = await fetch(`http://127.0.0.1:8000/api/products/${slug}/`, {
    cache: "no-store",
  });
  if (!res.ok) return notFound();
  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  return (
    <main className="bg-white">
      {/* RESPONSIVE UPDATE: Tighter padding and gap on mobile (px-4, py-8, gap-8) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-16 flex flex-col md:flex-row gap-8 sm:gap-16">
        <AddToCartButton product={product} />
      </div>
    </main>
  );
}
