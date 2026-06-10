"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const featuredRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-reveal for featured cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 },
    );

    const cards = featuredRef.current?.querySelectorAll(".reveal-card");
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* ── HERO ── */}
        <section className="hero" ref={heroRef}>
          <div className="hero-media">
            <Image
              src="/wigbanner.webp"
              alt="GraceT HAIR – Luxury Wigs"
              width={1920}
              height={2368}
              priority
              onLoad={(e) => e.currentTarget.classList.add("loaded")}
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
            {/* <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              New Collection — SS25
            </div> */}

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

          {/* <div className="hero-scroll">
            <span>Scroll to explore</span>
            <div className="scroll-line" />
          </div> */}
        </section>

        {/* ── TICKER ── */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[...Array(2)].flatMap((_, loopIndex) =>
              [
                "100% Virgin Hair",
                "Handcrafted Wigs",
                "Free Express Delivery",
                "Custom Orders Welcome",
                "Premium Quality Guaranteed",
                "Same-Day Dispatch",
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
              { icon: "⬡", label: "Fast Delivery", sub: "Lagos same-day" },
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
        <section className="featured" ref={featuredRef}>
          <div className="featured-inner">
            <div className="section-header">
              <h2 className="section-title">
                Featured Wigs
                <span>Editor's Picks</span>
              </h2>
              <Link href="/store" className="view-all">
                View All <span>→</span>
              </Link>
            </div>

            <div className="products-grid">
              {getFeaturedProducts().map((product) => (
                <div key={product.id} className="reveal-card">
                  <ProductCard product={product} variant="featured" />
                </div>
              ))}
            </div>
          </div>
        </section>

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
              Work directly with our master stylists to create a wig that's
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
