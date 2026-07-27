import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { products } from "@/data/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return notFound();
  }

  return (
    <main className="bg-white">
      {/* The flex container splits the child elements perfectly 50/50 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-16 flex flex-col md:flex-row gap-8 sm:gap-16">
        {/* The AddToCartButton component contains both the image half and the details half */}
        <AddToCartButton product={product as any} />
      </div>
    </main>
  );
}
