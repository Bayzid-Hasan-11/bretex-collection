"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart, setIsCartOpen, wishlist } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-8 py-4 sm:py-5">
        {/* BRAND: Hide text on mobile, show logo */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 hover:text-gray-600 transition-colors"
        >
          <img
            src="/logo.jpg"
            alt="BreTex Logo"
            className="w-16 h-8 sm:w-24 sm:h-12 object-contain rounded-md"
          />
          <span className="hidden sm:block">BreTex Collection</span>
        </Link>

        {/* ACTIONS: Hide 'Wishlist' text on mobile, keep heart and number */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/wishlist"
            className="text-sm font-semibold text-gray-700 hover:text-black transition-colors flex items-center gap-1.5"
          >
            <span className="text-red-500 text-xl leading-none pt-0.5">♥</span>
            <span className="hidden sm:inline">Wishlist</span>
            <span>({wishlist.length})</span>
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative rounded-full bg-black px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
          >
            Cart ({cartCount})
          </button>
        </div>
      </div>
    </header>
  );
}
