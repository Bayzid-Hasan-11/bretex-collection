"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { trackAddToCart } from "@/lib/meta-pixel";

interface QuickAddModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
  onClose: () => void;
}

export default function QuickAddModal({ product, onClose }: QuickAddModalProps) {
  const { addToCart } = useCart();

  const colors = useMemo(() =>
    Array.isArray(product.colors)
      ? product.colors
      : product.color
        ? product.color.split(",").map((c: string) => c.trim()).filter(Boolean)
        : [],
    [product.colors, product.color],
  );

  const sizes = useMemo(() =>
    Array.isArray(product.sizes)
      ? product.sizes
      : product.size
        ? product.size.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [],
    [product.sizes, product.size],
  );

  const images = useMemo(() =>
    Array.isArray(product.images)
      ? product.images
      : product.image_url
        ? product.image_url.split(",").map((i: string) => i.trim()).filter(Boolean)
        : [],
    [product.images, product.image_url],
  );

  const [selectedColor, setSelectedColor] = useState(colors.length > 0 ? colors[0] : null);
  const [selectedSize, setSelectedSize] = useState(sizes.length > 0 ? sizes[0] : null);

  const previewImage = useMemo(() => {
    if (colors.length > 0 && images.length > 0 && selectedColor) {
      const colorIndex = colors.indexOf(selectedColor);
      if (colorIndex !== -1 && images[colorIndex]) {
        return images[colorIndex];
      }
      return images[0];
    }
    return product.image_url || null;
  }, [selectedColor, colors, images, product.image_url]);

  const handleConfirm = useCallback(() => {
    trackAddToCart();
    addToCart({
      ...product,
      color: selectedColor,
      size: selectedSize,
      image_url: previewImage,
    });
    onClose();
  }, [addToCart, product, selectedColor, selectedSize, previewImage, onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-sm shadow-2xl w-full max-w-md max-h-[90vh] relative animate-in fade-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-white transition-all duration-300 z-10"
        >
          ✕
        </button>

        <div className="w-full h-48 sm:h-56 bg-gray-100 dark:bg-zinc-800/50 overflow-hidden flex-shrink-0">
          {previewImage ? (
            <img
              src={previewImage}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400 dark:text-zinc-600 text-sm tracking-wide">
              No Image
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="p-6 sm:p-7">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-accent mb-1.5">
              {product.category}
            </p>
            <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-zinc-50 leading-snug mb-1">
              {product.name}
            </h2>
            <p className="text-lg font-light tracking-tight text-gray-500 dark:text-zinc-400 mb-6">
              ৳{product.price}
            </p>

            {colors.length > 0 && (
              <div className="mb-5">
                <h3 className="text-[10px] font-semibold text-gray-900 dark:text-zinc-100 uppercase tracking-[0.2em] mb-3">
                  Color — <span className="text-accent normal-case tracking-normal font-medium">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3.5 py-2 rounded-sm text-[11px] font-medium tracking-wide border transition-all duration-300 ${
                        selectedColor === color
                          ? "border-gray-900 dark:border-zinc-100 bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                          : "border-gray-200/80 dark:border-zinc-700/80 bg-transparent text-gray-600 dark:text-zinc-400 hover:border-gray-900 dark:hover:border-zinc-300 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-[10px] font-semibold text-gray-900 dark:text-zinc-100 uppercase tracking-[0.2em] mb-3">
                  Size — <span className="text-accent normal-case tracking-normal font-medium">{selectedSize}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 rounded-sm text-[11px] font-medium tracking-wide border transition-all duration-300 ${
                        selectedSize === size
                          ? "border-gray-900 dark:border-zinc-100 bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                          : "border-gray-200/80 dark:border-zinc-700/80 bg-transparent text-gray-600 dark:text-zinc-400 hover:border-gray-900 dark:hover:border-zinc-300 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 px-6 sm:px-7 py-5 border-t border-gray-100/80 dark:border-zinc-800/60 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 bg-transparent border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 py-3.5 rounded-sm text-[11px] font-semibold tracking-[0.12em] uppercase hover:border-gray-900 dark:hover:border-zinc-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="btn-luxury flex-1 bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3.5 rounded-sm text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-accent dark:hover:bg-accent hover:text-white transition-all duration-300"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
