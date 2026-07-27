"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartSidebar() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();

  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    division: "Dhaka",
    deliveryArea: "inside",
  });

  const deliveryCharge = formData.deliveryArea === "inside" ? 70 : 130;
  const finalTotal = cartTotal + deliveryCharge;

  if (!isCartOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Replace this with your actual business WhatsApp number (Include Country Code, no + or spaces)
    const BUSINESS_PHONE_NUMBER = "8801516501537";

    const itemsText = cart
      .map((item, index) => {
        const colorText = item.color ? `Color: ${item.color} | ` : "";
        const sizeText = item.size ? `Size: ${item.size}` : "";
        return `${index + 1}. *${item.name}*
   ${colorText}${sizeText}
   Qty: ${item.quantity} x ৳${item.price} = ৳${(parseFloat(item.price) * item.quantity).toFixed(2)}`;
      })
      .join("\n\n");

    const deliveryText =
      formData.deliveryArea === "inside"
        ? "Inside Dhaka (৳70)"
        : "Outside Dhaka (৳130)";

    // Top line and Emojis removed to prevent the  rendering issue
    const message = `*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
District: ${formData.district}
Division: ${formData.division}
Delivery: ${deliveryText}

*Order Items:*
${itemsText}

Subtotal: ৳${cartTotal.toFixed(2)}
Delivery Charge: ৳${deliveryCharge.toFixed(2)}
*Total Amount:* ৳${finalTotal.toFixed(2)}

Please confirm my order!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BUSINESS_PHONE_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    clearCart();
    setIsCheckout(false);
    setIsCartOpen(false);
    setFormData({
      name: "",
      phone: "",
      address: "",
      district: "",
      division: "Dhaka",
      deliveryArea: "inside",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => {
          setIsCartOpen(false);
          setIsCheckout(false);
        }}
      ></div>

      <div className="w-full max-w-md bg-white h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">
            {isCheckout ? "Checkout Details" : "Your Cart"}
          </h2>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsCheckout(false);
            }}
            className="text-gray-400 hover:text-black transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Your cart is currently empty.
            </div>
          ) : !isCheckout ? (
            <div className="space-y-6">
              {cart.map((item, idx) => (
                <div
                  key={`${item.id}-${item.color}-${item.size}-${idx}`}
                  className="flex gap-4 border-b border-gray-50 pb-4"
                >
                  <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No Img
                      </div>
                    )}
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.color && <span>Color: {item.color} </span>}
                        {item.size && <span>| Size: {item.size}</span>}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-semibold">
                        Qty: {item.quantity}
                      </span>
                      <span className="font-bold">
                        ৳{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors self-start"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <form
              id="checkout-form"
              onSubmit={handlePlaceOrder}
              className="space-y-4"
            >
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Select Delivery Area
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="deliveryArea"
                      value="inside"
                      checked={formData.deliveryArea === "inside"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deliveryArea: e.target.value,
                        })
                      }
                      className="w-4 h-4 text-black accent-black"
                    />
                    <span className="text-sm font-medium">
                      Inside Dhaka (৳70)
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="deliveryArea"
                      value="outside"
                      checked={formData.deliveryArea === "outside"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deliveryArea: e.target.value,
                        })
                      }
                      className="w-4 h-4 text-black accent-black"
                    />
                    <span className="text-sm font-medium">
                      Outside Dhaka (৳130)
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none"
                  placeholder="017XXXXXXXX"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Division
                  </label>
                  <select
                    required
                    value={formData.division}
                    onChange={(e) =>
                      setFormData({ ...formData, division: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none bg-white"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.district}
                    onChange={(e) =>
                      setFormData({ ...formData, district: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none"
                    placeholder="e.g., Gazipur"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Delivery Address
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none resize-none"
                  placeholder="House 12, Road 5, Block C, Banani"
                ></textarea>
              </div>
            </form>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
            {isCheckout ? (
              <div className="mb-4 space-y-2">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>৳{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Delivery Charge</span>
                  <span>+ ৳{deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">
                    ৳{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="text-2xl font-bold text-gray-900">
                  ৳{cartTotal.toFixed(2)}
                </span>
              </div>
            )}

            {!isCheckout ? (
              <button
                onClick={() => setIsCheckout(true)}
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors"
              >
                Proceed to Checkout
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCheckout(false)}
                  className="w-1/3 bg-white border border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-2/3 bg-green-600 text-white py-4 rounded-xl font-bold text-sm md:text-base hover:bg-green-700 transition-colors flex justify-center items-center gap-2"
                >
                  Order via WhatsApp
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
