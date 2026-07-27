import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { products } from "@/data/products"; // Pulling directly from local static data

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  // Instantly grab the product from the static file
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return notFound();
  }

  return (
    <main className="bg-white">
      {/* RESPONSIVE UPDATE: Tighter padding and gap on mobile (px-4, py-8, gap-8) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-16 flex flex-col md:flex-row gap-8 sm:gap-16">
        {/* Pass the static product into your existing cart component */}
        <AddToCartButton product={product as any} />
      </div>
    </main>
  );
}
