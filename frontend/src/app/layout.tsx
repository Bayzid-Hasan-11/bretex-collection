import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BreTex Collection",
  description: "Live inventory synced from Google Sheets",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("bretex-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 overflow-x-hidden flex flex-col min-h-screen transition-colors duration-200`}
      >
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <div className="flex-grow">{children}</div>
            <Footer />
            <CartSidebar />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
