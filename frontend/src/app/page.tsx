"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import QuickAddModal from "@/components/QuickAddModal";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quickAddProduct, setQuickAddProduct] = useState<any>(null);

  const { toggleWishlist, isInWishlist } = useCart();

  const categories = [
    "All",
    ...Array.from(
      new Set(products.map((p: any) => p.category).filter(Boolean)),
    ),
  ];

  const filteredProducts = products.filter((product: any) => {
    const searchLower = searchQuery.toLowerCase();
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
    <main className="px-5 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-8 h-[1px] bg-accent" />
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent">
            Collection
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-gray-900 dark:text-zinc-50 leading-none">
            All Products
          </h1>
          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 dark:border-zinc-600 py-3 text-sm tracking-wide text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:border-accent outline-none transition-colors duration-300"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2.5 mb-10 sm:mb-14 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category as string}
            onClick={() => setSelectedCategory(category as string)}
            className={`px-6 py-2.5 rounded-full text-[12px] font-semibold tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300 ${
              selectedCategory === category
                ? "bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                : "bg-transparent text-gray-500 dark:text-zinc-400 border border-gray-200/80 dark:border-zinc-700/80 hover:border-gray-900 dark:hover:border-zinc-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {category as string}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product: any) => (
          <div
            key={product.id}
            className="card-luxury bg-white dark:bg-zinc-900/50 rounded-lg overflow-hidden flex flex-col border border-gray-100/80 dark:border-zinc-800/60 relative group"
          >
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-5 right-5 z-10 flex items-center justify-center w-9 h-9 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
            >
              {isInWishlist(product.id) ? (
                <span className="text-red-500 text-lg leading-none">♥</span>
              ) : (
                <span className="text-gray-400 dark:text-zinc-500 text-lg leading-none">♡</span>
              )}
            </button>

            <Link
              href={`/product/${product.slug}`}
              className="h-80 sm:h-96 w-full bg-gray-100 dark:bg-zinc-800 relative overflow-hidden block cursor-pointer"
            >
              {product.image_url ? (
                <img
                  src={product.image_url.split(",")[0].trim()}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400 dark:text-zinc-600 text-sm tracking-wide">
                  No Image
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            <div className="p-6 sm:p-7 flex-grow flex flex-col">
              <div className="flex-grow">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-accent mb-2">
                  {product.category}
                </p>
                <Link href={`/product/${product.slug}`}>
                  <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-zinc-100 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors duration-300 leading-snug">
                    {product.name}
                  </h2>
                </Link>
              </div>
              <div className="mt-5 pt-5 border-t border-gray-100/80 dark:border-zinc-800/60 flex items-center justify-between">
                <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">
                  ৳{product.price}
                </span>
                <button
                  onClick={() => setQuickAddProduct(product)}
                  className="btn-luxury px-6 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-white bg-gray-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-accent dark:hover:bg-accent hover:text-white transition-all duration-300"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-32">
          <div className="w-12 h-[1px] bg-accent mx-auto mb-6" />
          <h3 className="text-2xl font-black tracking-tight text-gray-900 dark:text-zinc-100 mb-3">
            No products found
          </h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400 tracking-wide mb-8">
            Try adjusting your category or search.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-[12px] font-semibold tracking-[0.15em] uppercase text-accent hover:text-accent-hover transition-colors duration-300 border-b border-accent/40 hover:border-accent pb-0.5"
          >
            Clear Filters
          </button>
        </div>
      )}
      {/* Quick Add Modal */}
      {quickAddProduct && (
        <QuickAddModal
          product={quickAddProduct}
          onClose={() => setQuickAddProduct(null)}
        />
      )}
    </main>
  );
}
