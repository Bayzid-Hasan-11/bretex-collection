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

  // Ensure we grab the first image to display
  const displayImage = product.image_url?.split(",")[0].trim() || "";

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-16 flex flex-col md:flex-row gap-8 sm:gap-16">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="aspect-[4/5] w-full bg-gray-100 rounded-2xl overflow-hidden shadow-md">
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {product.name}
          </h1>
          <p className="text-2xl font-bold text-gray-900 mt-4">
            ৳{product.price}
          </p>
          <p className="text-gray-600 mt-4 text-lg">{product.description}</p>

          <div className="mt-8 border-t pt-8">
            {/* Pass the product into the cart button component */}
            <AddToCartButton product={product as any} />
          </div>
        </div>
      </div>
    </main>
  );
}
