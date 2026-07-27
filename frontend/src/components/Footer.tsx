import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-extrabold tracking-tight text-gray-900 mb-4">
              BreTex Collection
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Premium quality apparel directly synced from our live inventory.
              Style and comfort delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-500 hover:text-black transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-sm text-gray-500 hover:text-black transition-colors"
                >
                  Your Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-500 hover:text-black transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-500 hover:text-black transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-gray-500 cursor-not-allowed">
                  FAQ
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-500 cursor-not-allowed">
                  Shipping Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-500 cursor-not-allowed">
                  Returns & Exchanges
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} BreTex Collection. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-gray-400 hover:text-black cursor-pointer transition-colors">
              Facebook
            </span>
            <span className="text-gray-400 hover:text-black cursor-pointer transition-colors">
              Instagram
            </span>
            <span className="text-gray-400 hover:text-black cursor-pointer transition-colors">
              Twitter
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
