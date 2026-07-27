export default function ContactPage() {
  return (
    <main className="p-5 sm:p-8 lg:p-12 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-5xl mx-auto py-16 sm:py-24">
        <div className="text-center mb-14 sm:mb-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-accent">Get in Touch</span>
            <div className="w-8 h-[1px] bg-accent" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-gray-900 dark:text-zinc-50 mb-4 leading-none">
            Contact Us
          </h1>
          <p className="text-[13px] text-gray-400 dark:text-zinc-500 tracking-wide">
            Have a question? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Info */}
          <div className="bg-white dark:bg-zinc-900/50 p-8 sm:p-10 rounded-sm border border-gray-100/60 dark:border-zinc-800/40 h-full transition-colors">
            <h2 className="text-lg font-black tracking-tighter text-gray-900 dark:text-zinc-50 mb-10">
              Reach Out
            </h2>
            <div className="space-y-7">
              {[
                { label: "Email", value: "bretexbdwear@gmail.com" },
                { label: "Phone", value: "+8801815931153" },
                { label: "Office", value: "House-28, Road-08, Sector-11, Uttara, Dhaka, Bangladesh" },
                { label: "Hours", value: "Always Open" },
              ].map((item) => (
                <div key={item.label}>
                  <h3 className="text-[10px] font-semibold text-accent uppercase tracking-[0.25em] mb-1.5">
                    {item.label}
                  </h3>
                  <p className="text-gray-600 dark:text-zinc-400 tracking-wide text-[15px]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-zinc-900/50 p-8 sm:p-10 rounded-sm border border-gray-100/60 dark:border-zinc-800/40 h-full transition-colors">
            <h2 className="text-lg font-black tracking-tighter text-gray-900 dark:text-zinc-50 mb-10">
              Send a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-[0.2em] mb-2">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-700 py-3 text-sm text-gray-900 dark:text-zinc-100 placeholder-gray-300 dark:placeholder-zinc-600 focus:border-accent outline-none transition-colors duration-300" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-[0.2em] mb-2">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-700 py-3 text-sm text-gray-900 dark:text-zinc-100 placeholder-gray-300 dark:placeholder-zinc-600 focus:border-accent outline-none transition-colors duration-300" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-[0.2em] mb-2">Message</label>
                <textarea rows={4} placeholder="How can we help you today?" className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-700 py-3 text-sm text-gray-900 dark:text-zinc-100 placeholder-gray-300 dark:placeholder-zinc-600 focus:border-accent outline-none resize-none transition-colors duration-300" />
              </div>
              <button type="button" className="btn-luxury w-full bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-4 rounded-sm text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-accent dark:hover:bg-accent hover:text-white transition-all duration-300 mt-2">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
