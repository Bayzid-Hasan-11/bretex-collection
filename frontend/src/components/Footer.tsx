import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-gray-100/60 dark:border-zinc-800/40 mt-24 transition-colors">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-black tracking-tighter text-gray-900 dark:text-zinc-50 mb-4">
              BreTex
            </h3>
            <p className="text-[13px] text-gray-400 dark:text-zinc-500 leading-relaxed tracking-wide">
              Premium quality apparel. Style and comfort delivered to your doorstep.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-gray-900 dark:text-zinc-100 uppercase tracking-[0.25em] mb-5">
              Shop
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/" className="text-[13px] text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 tracking-wide">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-[13px] text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 tracking-wide">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-gray-900 dark:text-zinc-100 uppercase tracking-[0.25em] mb-5">
              Company
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/about" className="text-[13px] text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 tracking-wide">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[13px] text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 tracking-wide">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-gray-900 dark:text-zinc-100 uppercase tracking-[0.25em] mb-5">
              Support
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/faq" className="text-[13px] text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 tracking-wide">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[13px] text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 tracking-wide">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[13px] text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 tracking-wide">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-gray-100/60 dark:border-zinc-800/40 flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-[11px] text-gray-400 dark:text-zinc-600 tracking-wide">
            &copy; {new Date().getFullYear()} BreTex Collection. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="https://www.facebook.com/share/193iSReoFC/" target="_blank" rel="noopener noreferrer" className="text-[11px] text-gray-400 dark:text-zinc-600 hover:text-accent cursor-pointer transition-colors duration-300 tracking-wide">
              Facebook
            </a>
            {["Instagram", "Twitter"].map((s) => (
              <span key={s} className="text-[11px] text-gray-400 dark:text-zinc-600 hover:text-accent cursor-pointer transition-colors duration-300 tracking-wide">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
