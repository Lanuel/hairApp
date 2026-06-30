import Image from "next/image";
import Link from "next/link";
import FeaturedProductsSection from "@/components/FeaturedProductsSection";
import { getFeaturedProducts } from "@/lib/products.server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <main className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-media">
            <Image
              src="/wigbanner.webp"
              alt="GraceT HAIR – Luxury Wigs"
              width={1920}
              height={2368}
              priority
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div className="hero-overlay" />

          <div className="hero-content">
            <h1 className="hero-title">
              Hair That Defines
              <br />
              <em>You</em>
            </h1>

            <p className="hero-sub">
              Premium virgin hair &nbsp;·&nbsp; Handcrafted wigs &nbsp;·&nbsp;
              Timeless elegance
            </p>

            <div className="hero-cta">
              <Link href="/store" className="btn-primary">
                Shop Now
              </Link>
              <Link href="/custom-order" className="btn-outline">
                Custom Order
              </Link>
            </div>
          </div>
        </section>

        {/* ── TICKER ── */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[...Array(2)].flatMap((_, loopIndex) =>
              [
                "100% Virgin Hair",
                "Handcrafted Wigs",
                "Abuja Delivery 24–48 Hrs",
                "Custom Orders Welcome",
                "Premium Quality Guaranteed",
                "Outside Abuja 3–7 Days",
              ].map((item, i) => (
                <span key={`${loopIndex}-${i}-${item}`} className="ticker-item">
                  {item}
                  <span className="ticker-sep">✦</span>
                </span>
              )),
            )}
          </div>
        </div>

        {/* ── TRUST STRIP ── */}
        <div className="trust">
          <div className="trust-inner">
            {[
              { icon: "✦", label: "Virgin Hair Only", sub: "100% unprocessed" },
              { icon: "◈", label: "Custom Orders", sub: "Built to your spec" },
              { icon: "⬡", label: "Delivery", sub: "Abuja 24–48 hrs" },
              { icon: "◆", label: "Nationwide", sub: "Outside Abuja 3–7 days" },
              { icon: "◇", label: "Secure Payment", sub: "All cards accepted" },
            ].map((t) => (
              <div key={t.label} className="trust-item">
                <div className="trust-icon">{t.icon}</div>
                <p className="trust-label">{t.label}</p>
                <p className="trust-sub">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURED PRODUCTS ── */}
        <FeaturedProductsSection products={featuredProducts} />

        {/* ── SPLIT FEATURE ── */}
        <section className="split-feature">
          <div className="split-image">
            <Image
              src="/blonde.webp"
              alt="Custom Order Service"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
              className="object-cover"
            />
          </div>
          <div className="split-content">
            <p className="split-eyebrow">Bespoke Service</p>
            <h2 className="split-title">
              Your Vision,
              <br />
              Our Craft
            </h2>
            <p className="split-body">
              Work directly with our master stylists to create a wig that&apos;s
              uniquely yours — custom length, density, colour, and texture.
            </p>
            <Link href="/custom-order" className="btn-dark">
              Start Custom Order →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
