"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { trackInitiateCheckout, trackContact, sendCAPIEvent } from "@/lib/meta-pixel";
import PriceDisplay from "@/components/PriceDisplay";
import { formatPrice } from "@/lib/utils";

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    division: "Dhaka",
    deliveryArea: "inside",
  });
  const [phoneError, setPhoneError] = useState("");

  const deliveryCharge = formData.deliveryArea === "inside" ? 70 : 130;
  const finalTotal = cartTotal + deliveryCharge;

  const normalizePhone = (value: string): string => {
    const banglaToEnglish: Record<string, string> = {
      "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
      "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
    };
    return value
      .split("")
      .map((ch) => banglaToEnglish[ch] ?? ch)
      .join("")
      .replace(/\D/g, "")
      .slice(0, 11);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneError("");
    setFormData({ ...formData, phone: normalizePhone(e.target.value) });
  };

  if (!isCartOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length !== 11) {
      setPhoneError("Please enter exactly 11 digits.");
      return;
    }
    const BUSINESS_PHONE_NUMBER = "8801516501537";
    const itemsText = cart
      .map((item, index) => {
        const colorText = item.color ? `Color: ${item.color} | ` : "";
        const sizeText = item.size ? `Size: ${item.size}` : "";
        const priceInfo = item.originalPrice ? ` (Was ${formatPrice(item.originalPrice)} / -${item.discountPercent}%)` : "";
        return `${index + 1}. *${item.name}*\n   ${colorText}${sizeText}\n   Qty: ${item.quantity} x ${formatPrice(item.price)}${priceInfo} = ৳${(parseFloat(item.price) * item.quantity).toFixed(2)}`;
      })
      .join("\n\n");
    const deliveryText = formData.deliveryArea === "inside" ? "Inside Dhaka (৳70)" : "Outside Dhaka (৳130)";
    const message = `*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\nDistrict: ${formData.district}\nDivision: ${formData.division}\nDelivery: ${deliveryText}\n\n*Order Items:*\n${itemsText}\n\nSubtotal: ৳${cartTotal.toFixed(2)}\nDelivery Charge: ৳${deliveryCharge.toFixed(2)}\n*Total Amount:* ৳${finalTotal.toFixed(2)}\n\nPlease confirm my order!`;

    // Fire Contact pixel + CAPI before redirect
    trackContact();
    sendCAPIEvent("Contact", { phone: formData.phone });

    window.open(`https://wa.me/${BUSINESS_PHONE_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    clearCart();
    setIsCheckout(false);
    setIsCartOpen(false);
    setFormData({ name: "", phone: "", address: "", district: "", division: "Dhaka", deliveryArea: "inside" });
    setPhoneError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => { setIsCartOpen(false); setIsCheckout(false); }} />

      <div className="w-full max-w-md bg-white dark:bg-zinc-950 h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-100/50 dark:border-zinc-800/50">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-gray-100/80 dark:border-zinc-800/60 flex-shrink-0">
          <div>
            <h2 className="text-lg font-black tracking-tighter text-gray-900 dark:text-zinc-50">
              {isCheckout ? "Checkout" : "Your Bag"}
            </h2>
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent mt-0.5">
              {isCheckout ? "Delivery Details" : `${cart.length} item${cart.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <button onClick={() => { setIsCartOpen(false); setIsCheckout(false); }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-all duration-300">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto px-7 py-6 scrollbar-hide">
          {cart.length === 0 ? (
            <div className="text-center mt-16">
              <div className="w-8 h-[1px] bg-accent mx-auto mb-5" />
              <p className="text-sm text-gray-400 dark:text-zinc-500 tracking-wide">Your bag is empty</p>
            </div>
          ) : !isCheckout ? (
            <div className="space-y-5">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${item.color}-${item.size}-${idx}`} className="flex gap-4 pb-5 border-b border-gray-100/60 dark:border-zinc-800/40 last:border-b-0">
                  <div className="w-20 h-24 bg-gray-100 dark:bg-zinc-800/50 rounded-sm overflow-hidden flex-shrink-0">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 dark:text-zinc-600">No Img</div>
                    )}
                  </div>
                  <div className="flex-grow flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-sm font-bold tracking-tight text-gray-900 dark:text-zinc-100 leading-snug pr-1">{item.name}</h3>
                      <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1 tracking-wide uppercase">
                        {item.color && <span>{item.color}</span>}
                        {item.color && item.size && <span className="mx-1">·</span>}
                        {item.size && <span>{item.size}</span>}
                      </p>
                      <div className="mt-1.5">
                        <PriceDisplay price={item.price} originalPrice={item.originalPrice} discountPercent={item.discountPercent} size="sm" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 dark:border-zinc-700 rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200 text-sm leading-none"
                        >
                          −
                        </button>
                        <span className="w-8 h-7 flex items-center justify-center text-[12px] font-semibold text-gray-900 dark:text-zinc-100 border-x border-gray-200 dark:border-zinc-700 select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200 text-sm leading-none"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-zinc-100">
                          ৳{(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id, item.color, item.size)}
                          className="text-gray-300 dark:text-zinc-600 hover:text-red-500 transition-colors duration-300 text-sm leading-none"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="bg-gray-50/80 dark:bg-zinc-900/50 p-5 rounded-sm border border-gray-200/60 dark:border-zinc-800/40 mb-5">
                <label className="block text-[11px] font-semibold text-gray-900 dark:text-zinc-100 uppercase tracking-[0.2em] mb-3">
                  Delivery Area
                </label>
                <div className="space-y-1.5">
                  {[
                    { value: "inside", label: "Inside Dhaka — ৳70" },
                    { value: "outside", label: "Outside Dhaka — ৳130" },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 p-2.5 rounded-sm hover:bg-white dark:hover:bg-zinc-800/50 cursor-pointer transition-colors duration-200">
                      <input type="radio" name="deliveryArea" value={opt.value} checked={formData.deliveryArea === opt.value} onChange={(e) => setFormData({ ...formData, deliveryArea: e.target.value })} className="w-3.5 h-3.5 accent-accent" />
                      <span className="text-[13px] font-medium text-gray-600 dark:text-zinc-300 tracking-wide">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-[0.15em] mb-2">Full Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-700 py-2.5 text-sm text-gray-900 dark:text-zinc-100 placeholder-gray-300 dark:placeholder-zinc-600 focus:border-accent outline-none transition-colors duration-300" placeholder="John Doe" />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-[0.15em] mb-2">Phone Number</label>
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={11}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={`w-full bg-transparent border-b py-2.5 text-sm text-gray-900 dark:text-zinc-100 placeholder-gray-300 dark:placeholder-zinc-600 focus:border-accent outline-none transition-colors duration-300 ${
                    phoneError
                      ? "border-red-400 dark:border-red-500"
                      : "border-gray-200 dark:border-zinc-700"
                  }`}
                  placeholder="017XXXXXXXX"
                />
                {phoneError && (
                  <p className="mt-2 text-[11px] text-red-500 dark:text-red-400 tracking-wide">{phoneError}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-[0.15em] mb-2">Division</label>
                  <select required value={formData.division} onChange={(e) => setFormData({ ...formData, division: e.target.value })} className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-700 py-2.5 text-sm text-gray-900 dark:text-zinc-100 focus:border-accent outline-none transition-colors duration-300">
                    {["Dhaka","Chattogram","Rajshahi","Khulna","Barishal","Sylhet","Rangpur","Mymensingh"].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-[0.15em] mb-2">District</label>
                  <input required type="text" value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-700 py-2.5 text-sm text-gray-900 dark:text-zinc-100 placeholder-gray-300 dark:placeholder-zinc-600 focus:border-accent outline-none transition-colors duration-300" placeholder="e.g., Gazipur" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-[0.15em] mb-2">Full Delivery Address</label>
                <textarea required rows={2} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-700 py-2.5 text-sm text-gray-900 dark:text-zinc-100 placeholder-gray-300 dark:placeholder-zinc-600 focus:border-accent outline-none resize-none transition-colors duration-300" placeholder="House 12, Road 5, Block C, Banani" />
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-7 py-6 border-t border-gray-100/80 dark:border-zinc-800/60 flex-shrink-0">
            {isCheckout ? (
              <div className="mb-5 space-y-2.5">
                <div className="flex justify-between items-center text-[12px] text-gray-500 dark:text-zinc-400 tracking-wide">
                  <span>Subtotal</span>
                  <span>৳{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[12px] text-gray-500 dark:text-zinc-400 tracking-wide">
                  <span>Delivery</span>
                  <span>+ ৳{deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100/80 dark:border-zinc-800/60">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-900 dark:text-zinc-100">Total</span>
                  <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-zinc-50">৳{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center mb-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-zinc-400">Subtotal</span>
                <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-zinc-50">৳{cartTotal.toFixed(2)}</span>
              </div>
            )}

            {!isCheckout ? (
              <button onClick={() => {
                trackInitiateCheckout();
                sendCAPIEvent("InitiateCheckout");
                setIsCheckout(true);
              }} className="btn-luxury w-full bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-4 rounded-sm text-[12px] font-semibold tracking-[0.15em] uppercase hover:bg-accent dark:hover:bg-accent hover:text-white transition-all duration-300">
                Proceed to Checkout
              </button>
            ) : (
              <div className="flex gap-3">
                <button type="button" onClick={() => setIsCheckout(false)} className="w-1/3 bg-transparent border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 py-4 rounded-sm text-[11px] font-semibold tracking-[0.12em] uppercase hover:border-gray-900 dark:hover:border-zinc-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300">
                  Back
                </button>
                <button type="submit" form="checkout-form" className="btn-luxury w-2/3 bg-green-600 text-white py-4 rounded-sm text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-green-700 transition-all duration-300 flex justify-center items-center gap-2">
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
