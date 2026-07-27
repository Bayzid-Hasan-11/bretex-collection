export default function AboutPage() {
  return (
    <main className="p-5 sm:p-8 lg:p-12 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-3xl mx-auto py-16 sm:py-24">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-[1px] bg-accent" />
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-accent">Our Story</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-gray-900 dark:text-zinc-50 mb-12 leading-none">
          About BreTex
        </h1>

        <div className="bg-white dark:bg-zinc-900/50 p-8 sm:p-10 rounded-sm border border-gray-100/60 dark:border-zinc-800/40 transition-colors">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 mb-5">Our Story</h2>
          <p className="mb-8 text-gray-500 dark:text-zinc-400 leading-relaxed tracking-wide">
            Welcome to BreTex, your ultimate destination for premium apparel. We
            believe that fashion should be high-quality, comfortable, and
            seamlessly integrated into your daily life.
          </p>

          <div className="w-full h-[1px] bg-gray-100 dark:bg-zinc-800 mb-8" />

          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 mb-5">
            The Tech Behind the Store
          </h2>
          <p className="mb-8 text-gray-500 dark:text-zinc-400 leading-relaxed tracking-wide">
            What makes BreTex unique is our lightning-fast, live-synced
            inventory system. By connecting our storefront directly to our
            secure database, we ensure that what you see online is exactly what
            is sitting in our warehouse, ready to ship to your door.
          </p>

          <div className="w-full h-[1px] bg-gray-100 dark:bg-zinc-800 mb-8" />

          <p className="text-gray-900 dark:text-zinc-100 font-bold tracking-tight text-lg text-center">
            Thank you for choosing BreTex.
          </p>
        </div>
      </div>
    </main>
  );
}
