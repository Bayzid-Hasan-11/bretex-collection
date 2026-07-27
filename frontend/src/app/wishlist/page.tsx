"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlist, addToCart, toggleWishlist, clearWishlist } = useCart();

  return (
    <main className="min-h-screen p-5 sm:p-8 lg:p-12 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 sm:mb-16 pb-6 border-b border-gray-100/60 dark:border-zinc-800/40 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-accent">Saved</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-gray-900 dark:text-zinc-50 leading-none">
              Your Wishlist
            </h1>
          </div>
          {wishlist.length > 0 && (
            <button onClick={clearWishlist} className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-400 dark:text-zinc-500 hover:text-red-500 transition-colors duration-300 border-b border-transparent hover:border-red-500 pb-0.5">
              Clear All
            </button>
          )}
        </header>

        {wishlist.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-zinc-900/50 rounded-sm border border-gray-100/60 dark:border-zinc-800/40 transition-colors">
            <span className="text-5xl mb-6 block text-gray-200 dark:text-zinc-700">♡</span>
            <h2 className="text-2xl font-black tracking-tighter text-gray-900 dark:text-zinc-100 mb-3">
              Nothing saved yet
            </h2>
            <p className="text-[13px] text-gray-400 dark:text-zinc-500 mb-10 tracking-wide">
              Save your favorite items to revisit them later.
            </p>
            <Link href="/" className="btn-luxury inline-block bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-10 py-3.5 rounded-sm text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-accent dark:hover:bg-accent hover:text-white transition-all duration-300">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((product) => (
              <div key={product.id} className="card-luxury bg-white dark:bg-zinc-900/50 rounded-sm overflow-hidden flex flex-col border border-gray-100/60 dark:border-zinc-800/40 relative group transition-colors">
                <button onClick={() => toggleWishlist(product)} className="absolute top-5 right-5 z-10 flex items-center justify-center w-9 h-9 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-red-500 text-lg leading-none">♥</span>
                </button>

                <Link href={`/product/${product.slug}`} className="h-80 sm:h-96 w-full bg-gray-100 dark:bg-zinc-800/50 relative overflow-hidden block cursor-pointer">
                  {product.image_url ? (
                    <img src={product.image_url.split(",")[0].trim()} alt={product.name} className="object-cover w-full h-full group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400 dark:text-zinc-600 text-sm tracking-wide">No Image</div>
                  )}
                </Link>

                <div className="p-6 sm:p-7 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-accent mb-2">{product.category}</p>
                    <Link href={`/product/${product.slug}`}>
                      <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-zinc-100 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors duration-300 leading-snug">
                        {product.name}
                      </h2>
                    </Link>
                  </div>
                  <div className="mt-5 pt-5 border-t border-gray-100/60 dark:border-zinc-800/40 flex items-center justify-between">
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">৳{product.price}</span>
                    <button onClick={() => addToCart(product)} className={`btn-luxury px-6 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 ${product.stock > 0 ? "text-white bg-gray-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-accent dark:hover:bg-accent hover:text-white" : "bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400 cursor-not-allowed"}`} disabled={product.stock === 0}>
                      {product.stock > 0 ? "Add to Bag" : "Notify Me"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
