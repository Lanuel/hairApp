import CustomOrderForm from "@/components/CustomOrderForm";

export default function CustomOrderPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen page-below-nav">
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif text-white mb-4">
            Custom Order
          </h1>
          <div className="w-16 h-0.5 bg-[#bbe917] mx-auto mb-6" />
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Your perfect unit, built to your exact specifications.
          </p>
        </header>

        <section className="bg-white/5 border border-white/10 rounded-lg p-6 mb-10">
          <h2 className="text-lg font-semibold text-white mb-3">
            Can&apos;t find the exact unit you&apos;re looking for?
          </h2>
          <p className="text-white/70 mb-4">
            No worries — we can customize your request. If you have a specific
            length, color, or texture in mind that isn&apos;t here:
          </p>
          <ol className="list-decimal list-inside text-white/70 space-y-2">
            <li>Send us a request with a reference photo or description.</li>
            <li>
              You&apos;ll receive a tailored quote based on your specifications.
            </li>
          </ol>
        </section>

        <CustomOrderForm />
      </div>
    </div>
  );
}
