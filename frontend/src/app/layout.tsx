import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import Footer from "@/components/Footer"; // <-- NEW: Import the Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BreTex Collection",
  description: "Live inventory synced from Google Sheets",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50 text-gray-900 overflow-x-hidden flex flex-col min-h-screen`}
      >
        {/* We added flex-col and min-h-screen to the body to ensure the footer always stays at the bottom */}
        <CartProvider>
          <Navbar />
          {/* Main content expands to fill available space */}
          <div className="flex-grow">{children}</div>
          <Footer /> {/* <-- NEW: Added Footer here */}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
