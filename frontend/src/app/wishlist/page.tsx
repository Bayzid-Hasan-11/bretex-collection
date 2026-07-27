"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  // NEW: Pulling in the clearWishlist function
  const { wishlist, addToCart, toggleWishlist, clearWishlist } = useCart();

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* UPDATED: Header now has a flex layout to put the button on the right */}
        <header className="mb-12 border-b border-gray-200 pb-5 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Your Wishlist
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Items you have saved for later.
            </p>
          </div>

          {/* NEW: The Clear Wishlist Button */}
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-sm font-semibold text-red-500 hover:text-red-700 hover:underline transition-colors mb-1"
            >
              Clear Wishlist
            </button>
          )}
        </header>

        {wishlist.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-6xl mb-4 block text-gray-300">♡</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Save your favorite items here to buy them later.
            </p>
            <Link
              href="/"
              className="bg-black text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow relative"
              >
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 bg-white bg-opacity-90 rounded-full shadow hover:scale-110 transition-transform duration-200"
                >
                  <span className="text-red-500 text-xl leading-none pt-1">
                    ♥
                  </span>
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
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${product.stock > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"} ring-1 ring-inset`}
                    >
                      {product.stock > 0
                        ? `${product.stock} left`
                        : "Out of Stock"}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
                  <span className="text-2xl font-bold text-gray-900">
                    ৳{product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors ${product.stock > 0 ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? "Add to Cart" : "Notify Me"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
