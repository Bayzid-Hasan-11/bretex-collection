"use client";

import { useState } from "react";

const faqSections = [
  {
    title: "Shipping & Delivery",
    items: [
      { question: "Do you deliver inside Dhaka?", answer: "Yes! We deliver all across Bangladesh. Inside Dhaka delivery is ৳70 and takes 1–2 business days after order confirmation." },
      { question: "Do you deliver outside Dhaka?", answer: "Absolutely. Outside Dhaka delivery is ৳130 and typically takes 3–5 business days depending on your district and courier availability." },
      { question: "How do I track my order?", answer: "Once your order is confirmed via WhatsApp, we send you the courier tracking info. You can also message us anytime on WhatsApp with your order name for a live update." },
      { question: "Which courier service do you use?", answer: "We partner with reputed couriers like Pathao Courier, Sundarban, and SA Paribahan to ensure fast and safe delivery across Bangladesh." },
    ],
  },
  {
    title: "Sizing & Fit",
    items: [
      { question: "How do I find the right size?", answer: "Every product page has a Size Guide button next to the size selector. It shows exact measurements (waist, length, relaxed waist) in inches so you can pick the perfect fit." },
      { question: "What if I am between two sizes?", answer: "We recommend going one size up if you are between sizes. Our wide-leg pants are designed for a relaxed, comfortable fit. You can also WhatsApp us your measurements and we will help you decide." },
      { question: "Are the sizes unisex?", answer: "Our current collection is designed primarily for women, but the relaxed wide-leg style can suit a variety of body types. Check the size chart for exact measurements." },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      { question: "What is your return policy?", answer: "We accept returns within 3 days of delivery if the item is unworn, unwashed, and has the original tags intact. Please message us on WhatsApp with your order details to initiate a return." },
      { question: "Can I exchange for a different size or color?", answer: "Yes! Exchanges are available within 3 days of delivery. Simply WhatsApp us with your order name, the item you want to exchange, and the new size or color you prefer." },
      { question: "Who pays for return shipping?", answer: "If the return is due to a defect or wrong item sent by us, we cover the shipping. For size or preference exchanges, the customer covers the return shipping cost." },
    ],
  },
  {
    title: "Ordering via WhatsApp",
    items: [
      { question: "How does the WhatsApp checkout work?", answer: "After adding items to your cart, click 'Proceed to Checkout' and fill in your delivery details. Then tap 'Order via WhatsApp' — a pre-filled message with your order summary will open in WhatsApp. Just hit send and we will confirm your order within minutes." },
      { question: "Do I need a WhatsApp account to order?", answer: "Yes, our checkout is powered by WhatsApp for quick and personal order confirmation. If you don't have WhatsApp, you can also message us directly at +8801516501537 with your order details." },
      { question: "Can I modify my order after sending on WhatsApp?", answer: "Yes! Simply send us another message on WhatsApp with the changes you need (add/remove items, change size/color, update address) before we dispatch your order." },
    ],
  },
  {
    title: "Payment",
    items: [
      { question: "What payment methods do you accept?", answer: "We accept bKash, Nagad, and Rocket. Cash on Delivery (COD) is also available for orders inside Dhaka. Payment details are shared after order confirmation on WhatsApp." },
      { question: "Is Cash on Delivery available?", answer: "COD is available for deliveries inside Dhaka. For outside Dhaka orders, we require advance payment via bKash, Nagad, or Rocket before dispatching." },
    ],
  },
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100/60 dark:border-zinc-800/40 last:border-b-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-6 text-left group">
        <span className="text-[15px] font-medium text-gray-900 dark:text-zinc-100 pr-6 group-hover:text-accent dark:group-hover:text-accent transition-colors duration-300 tracking-wide">
          {question}
        </span>
        <span className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? "bg-accent border-accent text-white rotate-0" : "border-gray-200 dark:border-zinc-700 text-gray-400 dark:text-zinc-500 group-hover:border-accent group-hover:text-accent"}`}>
          <svg className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? "max-h-40 opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
        <p className="text-[13px] text-gray-500 dark:text-zinc-400 leading-relaxed tracking-wide pl-0">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-24">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-accent">Support</span>
            <div className="w-8 h-[1px] bg-accent" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-gray-900 dark:text-zinc-50 mb-4 leading-none">
            Frequently Asked Questions
          </h1>
          <p className="text-[13px] text-gray-400 dark:text-zinc-500 max-w-md mx-auto tracking-wide leading-relaxed">
            Everything you need to know about ordering, shipping, sizing, and returns at BreTex.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-10 sm:space-y-12">
          {faqSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-5 px-1">
                {section.title}
              </h2>
              <div className="bg-white dark:bg-zinc-900/50 rounded-sm border border-gray-100/60 dark:border-zinc-800/40 px-6 sm:px-7 transition-colors">
                {section.items.map((item) => (
                  <AccordionItem key={item.question} question={item.question} answer={item.answer} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center bg-white dark:bg-zinc-900/50 rounded-sm border border-gray-100/60 dark:border-zinc-800/40 p-10 sm:p-12 transition-colors">
          <div className="w-8 h-[1px] bg-accent mx-auto mb-6" />
          <h3 className="text-xl sm:text-2xl font-black tracking-tighter text-gray-900 dark:text-zinc-50 mb-3">
            Still have questions?
          </h3>
          <p className="text-[13px] text-gray-400 dark:text-zinc-500 mb-8 tracking-wide">
            We are always happy to help.
          </p>
          <a
            href="https://wa.me/8801516501537"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury inline-flex items-center gap-2.5 bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-3.5 rounded-sm text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-accent dark:hover:bg-accent hover:text-white transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
