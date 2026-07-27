"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  size: string | null;
  price: string;
  stock: number;
  is_active: boolean;
  image_url: string | null;
  category: string | null;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number, color?: string | null, size?: string | null) => void;
  cartTotal: number;
  clearCart: () => void;

  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void; // <-- NEW: Added to interface
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Cart Functions
  // Cart Functions
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      // UPDATED: Now it checks if the ID, Color, AND Size are an exact match
      const existingItem = prevCart.find(
        (item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number, color?: string | null, size?: string | null) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.id === productId &&
            item.color === (color ?? item.color) &&
            item.size === (size ?? item.size)
          ),
      ),
    );
  };

  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0,
  );

  // Wishlist Functions
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId);
  };

  // NEW: Function to clear the entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        cartTotal,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
