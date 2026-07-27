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
    <main className="bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-20 flex flex-col md:flex-row gap-10 sm:gap-16 lg:gap-20">
        <AddToCartButton product={product as any} />
      </div>
    </main>
  );
}
