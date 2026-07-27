"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { cart, setIsCartOpen, wishlist } = useCart();
  const { theme, toggleTheme } = useTheme();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b border-gray-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 sm:px-8 lg:px-12 py-4 sm:py-5">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl sm:text-2xl font-extrabold tracking-tighter text-gray-900 dark:text-zinc-50 hover:text-gray-600 dark:hover:text-zinc-400 transition-colors duration-300"
        >
          <img
            src="/logo.jpg"
            alt="BreTex Logo"
            className="w-16 h-8 sm:w-24 sm:h-12 object-contain rounded-md"
          />
          <span className="hidden sm:block font-black tracking-tighter">BreTex</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200/80 dark:border-zinc-700/80 bg-transparent hover:bg-gray-100 dark:hover:bg-zinc-800/80 transition-all duration-300"
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <Link
            href="/wishlist"
            className="hidden sm:flex items-center gap-1.5 text-[13px] font-medium tracking-wide text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >
            <span className="text-red-500/80 text-lg leading-none">♥</span>
            <span className="uppercase text-[11px] tracking-[0.15em]">Wishlist</span>
            <span className="text-[11px] text-gray-400 dark:text-zinc-500">({wishlist.length})</span>
          </Link>

          <Link
            href="/wishlist"
            className="sm:hidden text-red-500/80 text-xl leading-none"
          >
            ♥
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className="btn-luxury relative rounded-full bg-gray-900 dark:bg-zinc-100 px-5 sm:px-6 py-2.5 text-[12px] font-semibold tracking-[0.1em] uppercase text-white dark:text-zinc-900 hover:bg-gray-800 dark:hover:bg-white transition-all duration-300"
          >
            Bag ({cartCount})
          </button>
        </div>
      </div>
      <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </header>
  );
}
