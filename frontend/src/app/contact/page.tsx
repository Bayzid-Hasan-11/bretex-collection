export default function ContactPage() {
  return (
    <main className="p-8 bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-500">
            Have a question? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">
                  Email
                </h3>
                <p className="text-gray-600 text-lg">bretexbdwear@gmail.com</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">
                  Phone
                </h3>
                <p className="text-gray-600 text-lg">+8801815931153</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">
                  Office
                </h3>
                <p className="text-gray-600 text-lg">
                  House-28, Road-08, Sector-11, Uttara, Dhaka, Bangladesh
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">
                  Business Hours
                </h3>
                <p className="text-gray-600 text-lg">Always Open</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Send a Message
            </h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full border border-gray-300 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we help you today?"
                  className="w-full border border-gray-300 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors mt-4"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
