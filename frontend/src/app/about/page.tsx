export default function AboutPage() {
  return (
    <main className="p-8 bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto py-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8">
          About bretex
        </h1>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="mb-6 text-gray-600 leading-relaxed text-lg">
            Welcome to bretex, your ultimate destination for premium apparel. We
            believe that fashion should be high-quality, comfortable, and
            seamlessly integrated into your daily life.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            The Tech Behind the Store
          </h2>
          <p className="mb-6 text-gray-600 leading-relaxed text-lg">
            What makes bretex unique is our lightning-fast, live-synced
            inventory system. By connecting our storefront directly to our
            secure database, we ensure that what you see online is exactly what
            is sitting in our warehouse, ready to ship to your door.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-gray-900 font-semibold text-xl text-center">
              Thank you for choosing BreTex. We are excited to be part of your
              style journey!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
