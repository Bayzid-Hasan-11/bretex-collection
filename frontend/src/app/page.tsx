"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products"; // Pulling directly from local static data

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const categories = [
    "All",
    // FIX: Added 'any' here so TypeScript ignores strict checking on p.category
    ...Array.from(
      new Set(products.map((p: any) => p.category).filter(Boolean)),
    ),
  ];

  const filteredProducts = products.filter((product: any) => {
    const searchLower = searchQuery.toLowerCase();

    // Safety check for color arrays or strings
    const colorString = Array.isArray(product.colors)
      ? product.colors.join(" ")
      : product.color || "";

    const matchesSearch =
      product?.name?.toLowerCase().includes(searchLower) ||
      colorString.toLowerCase().includes(searchLower) ||
      (product?.description &&
        product.description.toLowerCase().includes(searchLower));

    const matchesCategory =
      selectedCategory === "All" || product?.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="px-4 py-6 sm:p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">All Products</h2>
        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="Search by name, color, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category as string}
            onClick={() => setSelectedCategory(category as string)}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-gray-900"
            }`}
          >
            {category as string}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* FIX: Added 'any' here so TypeScript allows product.id, product.name, etc. */}
        {filteredProducts.map((product: any) => {
          // Default to 100 stock if the static data doesn't explicitly define it
          const currentStock = product.stock ?? 100;

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow relative"
            >
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 bg-white bg-opacity-90 rounded-full shadow hover:scale-110 transition-transform duration-200"
              >
                {isInWishlist(product.id) ? (
                  <span className="text-red-500 text-xl leading-none pt-1">
                    ♥
                  </span>
                ) : (
                  <span className="text-gray-400 text-xl leading-none pt-1">
                    ♡
                  </span>
                )}
              </button>

              <Link
                href={`/product/${product.slug}`}
                className="h-72 w-full bg-gray-100 relative overflow-hidden group block cursor-pointer"
              >
                {product.image_url ? (
                  <img
                    src={product.image_url.split(",")[0].trim()}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </Link>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <Link href={`/product/${product.slug}`}>
                    <h2 className="text-xl font-bold text-gray-900 hover:text-gray-600 transition-colors">
                      {product.name}
                    </h2>
                  </Link>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${currentStock > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"} ring-1 ring-inset`}
                  >
                    {currentStock > 0 ? `${currentStock} left` : "Out of Stock"}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
                <span className="text-2xl font-bold text-gray-900">
                  ৳{product.price}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors ${currentStock > 0 ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}
                  disabled={currentStock === 0}
                >
                  {currentStock > 0 ? "Add to Cart" : "Notify Me"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-24">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            Try adjusting your category or search.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-6 text-black font-semibold underline underline-offset-4 hover:text-gray-600"
          >
            Clear Filters
          </button>
        </div>
      )}
    </main>
  );
}
