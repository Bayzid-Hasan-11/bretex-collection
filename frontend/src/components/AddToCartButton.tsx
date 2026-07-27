"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

// Changed type to 'any' to prevent TypeScript errors with our new static data structure
export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  // Safely handle both the new static arrays and the old comma-separated strings
  const colors = Array.isArray(product.colors)
    ? product.colors
    : product.color
      ? product.color
          .split(",")
          .map((c: string) => c.trim())
          .filter(Boolean)
      : [];

  const sizes = Array.isArray(product.sizes)
    ? product.sizes
    : product.size
      ? product.size
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

  const images = Array.isArray(product.images)
    ? product.images
    : product.image_url
      ? product.image_url
          .split(",")
          .map((i: string) => i.trim())
          .filter(Boolean)
      : [];

  const [selectedColor, setSelectedColor] = useState(
    colors.length > 0 ? colors[0] : null,
  );
  const [selectedSize, setSelectedSize] = useState(
    sizes.length > 0 ? sizes[0] : null,
  );
  const [currentImage, setCurrentImage] = useState(
    images.length > 0 ? images[0] : null,
  );

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
    const singleImage = images.length > 0 ? images[0] : null;
    const configuredProduct = {
      ...product,
      color: selectedColor,
      size: selectedSize,
      image_url: singleImage,
    };
    addToCart(configuredProduct);
  };

  return (
    <>
      <div className="md:w-1/2 bg-gray-50 rounded-3xl overflow-hidden aspect-[4/5] relative">
        {currentImage ? (
          <img
            src={currentImage}
            alt={`${product.name} - ${selectedColor || "default"}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="md:w-1/2 flex flex-col justify-center space-y-6 md:space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
            {product.name}
          </h1>
          <span className="text-2xl md:text-3xl font-light text-gray-700">
            ৳{product.price}
          </span>
        </div>

        {/* STOCK BADGE HAS BEEN COMPLETELY REMOVED */}

        {colors.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
              Color
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {colors.map((color: string) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 md:px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    selectedColor === color
                      ? "border-black bg-black text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
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
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Size
              </h3>
              <button
                onClick={() => setShowSizeChart(true)}
                className="text-sm text-gray-500 underline underline-offset-4 hover:text-black transition-colors"
              >
                Size Guide
              </button>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {sizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 md:px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    selectedSize === size
                      ? "border-black bg-black text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
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
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
              Description
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {/* ADD TO CART BUTTON IS NOW ALWAYS ACTIVE */}
        <button
          onClick={handleAddToCart}
          className="w-full rounded-xl px-8 py-3.5 md:py-4 text-base md:text-lg font-bold text-white shadow-sm transition-colors mt-2 md:mt-4 bg-black hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>

      {/* COMPACT SIZE CHART MODAL POPUP */}
      {showSizeChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full relative overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            <button
              onClick={() => setShowSizeChart(false)}
              className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black transition-colors z-10"
            >
              ✕
            </button>

            <div className="p-4 md:p-8 overflow-y-auto scrollbar-hide">
              <div className="text-center mb-4 md:mb-6 mt-2 relative">
                <div className="flex items-center justify-center gap-2 md:gap-4 mb-1">
                  <div className="w-8 md:w-16 h-[1px] bg-black"></div>
                  <h3 className="text-sm md:text-lg font-bold tracking-[0.3em] uppercase">
                    Bretex
                  </h3>
                  <div className="w-8 md:w-16 h-[1px] bg-black"></div>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-1">
                  SIZE CHART
                </h2>
                <p className="text-[10px] md:text-xs font-medium text-gray-700 tracking-widest uppercase">
                  All Measurements Are In Inches
                </p>
              </div>

              <div className="overflow-x-auto mb-4 md:mb-6 rounded-xl border border-gray-200">
                <table className="w-full text-center whitespace-nowrap">
                  <thead>
                    <tr>
                      <th className="bg-black text-white py-2 md:py-3 px-2 font-semibold uppercase text-xs md:text-sm w-1/4">
                        Size
                      </th>
                      <th className="bg-black text-white py-2 md:py-3 px-2 border-l border-gray-700 font-semibold uppercase text-xs md:text-sm w-1/4">
                        Waist (Inch)
                      </th>
                      <th className="bg-black text-white py-2 md:py-3 px-2 border-l border-gray-700 font-semibold uppercase text-xs md:text-sm w-1/4">
                        Length (Inch)
                      </th>
                      <th className="bg-black text-white py-2 md:py-3 px-2 border-l border-gray-700 font-semibold uppercase text-xs md:text-sm w-1/4 leading-tight">
                        Relaxed Waist
                        <br />
                        <span className="text-[10px] font-normal">
                          (Approx.)
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 text-sm md:text-base">
                    {[
                      {
                        size: "M",
                        waist: '28"',
                        length: '39.5"',
                        relaxed: '33"',
                      },
                      {
                        size: "M",
                        waist: '30"',
                        length: '39.5"',
                        relaxed: '35"',
                      },
                      {
                        size: "L",
                        waist: '32"',
                        length: '39.5"',
                        relaxed: '37"',
                      },
                      {
                        size: "XL",
                        waist: '34"',
                        length: '39.5"',
                        relaxed: '39"',
                      },
                      {
                        size: "XXL",
                        waist: '36"',
                        length: '39.5"',
                        relaxed: '41"',
                      },
                      {
                        size: "XXL",
                        waist: '38"',
                        length: '39.5"',
                        relaxed: '43"',
                      },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                      >
                        <td className="py-1.5 md:py-2 px-2 border-r border-gray-200">
                          <div className="bg-black text-white font-bold py-1 md:py-1.5 rounded text-xs md:text-sm mx-auto w-12 md:w-16">
                            {row.size}
                          </div>
                        </td>
                        <td className="py-2 md:py-3 px-2 border-r border-gray-200">
                          {row.waist}
                        </td>
                        <td className="py-2 md:py-3 px-2 border-r border-gray-200">
                          {row.length}
                        </td>
                        <td className="py-2 md:py-3 px-2">{row.relaxed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto mb-4 md:mb-5">
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-black text-white text-center py-2 font-bold tracking-widest text-[10px] md:text-xs">
                    SIZE LABEL REFERENCE
                  </div>
                  <table className="w-full text-center text-gray-800 text-xs md:text-sm whitespace-nowrap">
                    <tbody>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="py-2 px-3 font-semibold text-left border-r border-gray-200">
                          WAIST SIZE (INCH)
                        </td>
                        <td className="py-2 px-2 border-r border-gray-200">
                          28"
                        </td>
                        <td className="py-2 px-2 border-r border-gray-200">
                          30"
                        </td>
                        <td className="py-2 px-2 border-r border-gray-200">
                          32"
                        </td>
                        <td className="py-2 px-2 border-r border-gray-200">
                          34"
                        </td>
                        <td className="py-2 px-2 border-r border-gray-200">
                          36"
                        </td>
                        <td className="py-2 px-2">38"</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-left border-r border-gray-200">
                          SIZE LABEL
                        </td>
                        <td className="py-2 px-2 border-r border-gray-200 font-bold">
                          M
                        </td>
                        <td className="py-2 px-2 border-r border-gray-200 font-bold">
                          M
                        </td>
                        <td className="py-2 px-2 border-r border-gray-200 font-bold">
                          L
                        </td>
                        <td className="py-2 px-2 border-r border-gray-200 font-bold">
                          XL
                        </td>
                        <td className="py-2 px-2 border-r border-gray-200 font-bold">
                          XXL
                        </td>
                        <td className="py-2 px-2 font-bold">XXL</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-900 font-medium text-xs md:text-sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M6 6v4" />
                  <path d="M10 6v4" />
                  <path d="M14 6v4" />
                  <path d="M18 6v4" />
                  <path d="M8 6v2" />
                  <path d="M12 6v2" />
                  <path d="M16 6v2" />
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
