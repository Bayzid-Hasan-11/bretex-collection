"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  const colors = Array.isArray(product.colors)
    ? product.colors
    : product.color
      ? product.color.split(",").map((c: string) => c.trim()).filter(Boolean)
      : [];

  const sizes = Array.isArray(product.sizes)
    ? product.sizes
    : product.size
      ? product.size.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

  const images = Array.isArray(product.images)
    ? product.images
    : product.image_url
      ? product.image_url.split(",").map((i: string) => i.trim()).filter(Boolean)
      : [];

  const [selectedColor, setSelectedColor] = useState(colors.length > 0 ? colors[0] : null);
  const [selectedSize, setSelectedSize] = useState(sizes.length > 0 ? sizes[0] : null);
  const [currentImage, setCurrentImage] = useState(images.length > 0 ? images[0] : null);
  const [showSizeChart, setShowSizeChart] = useState(false);

  useEffect(() => {
    if (colors.length > 0 && images.length > 0 && selectedColor) {
      const colorIndex = colors.indexOf(selectedColor);
      if (colorIndex !== -1 && images[colorIndex]) {
        setCurrentImage(images[colorIndex]);
      } else {
        setCurrentImage(images[0]);
      }
    }
  }, [selectedColor, colors, images]);

  const handleAddToCart = () => {
    addToCart({ ...product, color: selectedColor, size: selectedSize, image_url: currentImage });
  };

  return (
    <>
      {/* Product Image */}
      <div className="md:w-1/2 bg-gray-100 dark:bg-zinc-800/50 rounded-sm overflow-hidden aspect-[4/5] relative">
        {currentImage ? (
          <img
            src={currentImage}
            alt={`${product.name} - ${selectedColor || "default"}`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 dark:text-zinc-600 text-sm tracking-wide">
            No Image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 flex flex-col justify-center space-y-7 md:space-y-9 md:pl-8 lg:pl-12">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-accent mb-3">
            {product.category}
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-gray-900 dark:text-zinc-50 mb-3 leading-tight">
            {product.name}
          </h1>
          <span className="text-2xl md:text-3xl font-light tracking-tight text-gray-500 dark:text-zinc-400">
            ৳{product.price}
          </span>
        </div>

        {colors.length > 0 && (
          <div>
            <h3 className="text-[11px] font-semibold text-gray-900 dark:text-zinc-100 uppercase tracking-[0.2em] mb-4">
              Color — <span className="text-accent normal-case tracking-normal font-medium">{selectedColor}</span>
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {colors.map((color: string) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2.5 rounded-sm text-[12px] font-medium tracking-wide border transition-all duration-300 ${
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
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-semibold text-gray-900 dark:text-zinc-100 uppercase tracking-[0.2em]">
                Size — <span className="text-accent normal-case tracking-normal font-medium">{selectedSize}</span>
              </h3>
              <button
                onClick={() => setShowSizeChart(true)}
                className="text-[11px] font-semibold tracking-[0.15em] uppercase text-accent hover:text-accent-hover transition-colors duration-300 accent-underline"
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {sizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2.5 rounded-sm text-[12px] font-medium tracking-wide border transition-all duration-300 ${
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

        {product.description && (
          <div>
            <h3 className="text-[11px] font-semibold text-gray-900 dark:text-zinc-100 uppercase tracking-[0.2em] mb-3">
              Description
            </h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed tracking-wide">
              {product.description}
            </p>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="btn-luxury w-full rounded-sm px-8 py-4 text-[12px] font-semibold tracking-[0.15em] uppercase text-white bg-gray-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-accent dark:hover:bg-accent hover:text-white transition-all duration-300 mt-2"
        >
          Add to Bag
        </button>
      </div>

      {/* SIZE CHART MODAL */}
      {showSizeChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 dark:bg-black/80 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-sm shadow-2xl max-w-2xl w-full relative overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            <button
              onClick={() => setShowSizeChart(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-white transition-all duration-300 z-10"
            >
              ✕
            </button>

            <div className="p-6 md:p-8 overflow-y-auto scrollbar-hide">
              <div className="text-center mb-6 md:mb-8 mt-2 relative">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="w-12 h-[1px] bg-accent" />
                  <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-gray-900 dark:text-zinc-100">
                    Bretex
                  </h3>
                  <div className="w-12 h-[1px] bg-accent" />
                </div>
                <h2 className="text-3xl font-black tracking-tighter text-gray-900 dark:text-zinc-50 mb-2">
                  SIZE CHART
                </h2>
                <p className="text-[10px] font-medium text-gray-500 dark:text-zinc-400 tracking-[0.2em] uppercase">
                  All Measurements Are In Inches
                </p>
              </div>

              <div className="overflow-x-auto mb-6 rounded-sm border border-gray-200/80 dark:border-zinc-700/80">
                <table className="w-full text-center whitespace-nowrap">
                  <thead>
                    <tr>
                      <th className="bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3 px-3 font-semibold uppercase text-[10px] tracking-[0.15em] w-1/4">
                        Size
                      </th>
                      <th className="bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3 px-3 border-l border-zinc-700 dark:border-zinc-400 font-semibold uppercase text-[10px] tracking-[0.15em] w-1/4">
                        Waist
                      </th>
                      <th className="bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3 px-3 border-l border-zinc-700 dark:border-zinc-400 font-semibold uppercase text-[10px] tracking-[0.15em] w-1/4">
                        Length
                      </th>
                      <th className="bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3 px-3 border-l border-zinc-700 dark:border-zinc-400 font-semibold uppercase text-[10px] tracking-[0.15em] w-1/4 leading-tight">
                        Relaxed Waist
                        <br />
                        <span className="text-[9px] font-normal opacity-70">(Approx.)</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 dark:text-zinc-200 text-sm">
                    {[
                      { size: "M", waist: '28"', length: '39.5"', relaxed: '33"' },
                      { size: "M", waist: '30"', length: '39.5"', relaxed: '35"' },
                      { size: "L", waist: '32"', length: '39.5"', relaxed: '37"' },
                      { size: "XL", waist: '34"', length: '39.5"', relaxed: '39"' },
                      { size: "XXL", waist: '36"', length: '39.5"', relaxed: '41"' },
                      { size: "XXL", waist: '38"', length: '39.5"', relaxed: '43"' },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-200/60 dark:border-zinc-700/60 last:border-b-0 hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                      >
                        <td className="py-2.5 px-3 border-r border-gray-200/60 dark:border-zinc-700/60">
                          <div className="bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold py-1 rounded-sm text-xs mx-auto w-14">
                            {row.size}
                          </div>
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200/60 dark:border-zinc-700/60">{row.waist}</td>
                        <td className="py-3 px-3 border-r border-gray-200/60 dark:border-zinc-700/60">{row.length}</td>
                        <td className="py-3 px-3">{row.relaxed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto mb-5">
                <div className="border border-gray-200/80 dark:border-zinc-700/80 rounded-sm overflow-hidden">
                  <div className="bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-center py-2.5 font-bold tracking-[0.2em] text-[10px] uppercase">
                    Size Label Reference
                  </div>
                  <table className="w-full text-center text-gray-800 dark:text-zinc-200 text-xs whitespace-nowrap">
                    <tbody>
                      <tr className="border-b border-gray-200/60 dark:border-zinc-700/60 bg-gray-50/50 dark:bg-zinc-800/30">
                        <td className="py-2.5 px-3 font-semibold text-left border-r border-gray-200/60 dark:border-zinc-700/60 tracking-wide">
                          WAIST SIZE (INCH)
                        </td>
                        {['28"', '30"', '32"', '34"', '36"', '38"'].map((s) => (
                          <td key={s} className="py-2.5 px-2.5 border-r border-gray-200/60 dark:border-zinc-700/60 last:border-r-0">{s}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-left border-r border-gray-200/60 dark:border-zinc-700/60 tracking-wide">
                          SIZE LABEL
                        </td>
                        {['M', 'M', 'L', 'XL', 'XXL', 'XXL'].map((s, i) => (
                          <td key={i} className="py-2.5 px-2.5 border-r border-gray-200/60 dark:border-zinc-700/60 last:border-r-0 font-bold">{s}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2.5 text-gray-600 dark:text-zinc-400 font-medium text-xs tracking-wide">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M6 6v4" /><path d="M10 6v4" /><path d="M14 6v4" /><path d="M18 6v4" />
                  <path d="M8 6v2" /><path d="M12 6v2" /><path d="M16 6v2" />
                </svg>
                <span>Relaxed waist is approx. +5 inch per size.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
