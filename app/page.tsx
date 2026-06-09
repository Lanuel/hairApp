"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import type { SVGProps } from "react";

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.188L24 22.847h-7.406l-5.8-7.584-6.639 7.584H.472l8.599-9.827L0 1.153h7.594l5.243 6.932L18.901 1.153zM17.61 20.645h2.039L6.486 3.24H4.298L17.61 20.645z" />
    </svg>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
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
        {/* ── STICKY NAV WRAPPER ── */}
        <div className={`nav-wrapper${scrolled ? " scrolled" : ""}`}>
          <div className={`promo-bar${scrolled ? " hidden" : ""}`}>
            Free Shipping on Orders Over ₦150,000 &nbsp;•&nbsp; Code:{" "}
            <strong>WELCOME150</strong>
          </div>

          <header className="navbar">
            <nav className="nav-inner">
              <button data-testid="nav-menu-button" className="nav-menu-btn">
                <div className="hamburger">
                  <span />
                  <span />
                  <span />
                </div>
                <span>Menu</span>
              </button>

              {/* <a href="/us" className="nav-logo">
                <Image
                  src="/logo-white.webp"
                  alt="GraceT Hair"
                  width={180}
                  height={70}
                  priority
                />
              </a> */}

              <div className="nav-links">
                <a href="/us/store" className="nav-link">
                  Shop
                </a>
                <a href="/us/account" className="nav-link">
                  Login
                </a>
                <a href="/us/cart" className="nav-cart">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Cart
                  <span className="cart-badge">{cartCount}</span>
                </a>
              </div>
            </nav>
          </header>
        </div>

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
              <a href="/us/store" className="btn-primary">
                Shop Now
              </a>
              <a href="/us/custom-order" className="btn-outline">
                Custom Order
              </a>
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
              <a href="/us/store" className="view-all">
                View All <span>→</span>
              </a>
            </div>

            <div className="products-grid">
              {[
                {
                  name: "Bone Straight 613 Blonde",
                  price: "₦145,000",
                  detail: '18" • 100% Virgin Hair',
                },
                {
                  name: "Deep Wave Lace Front",
                  price: "₦128,000",
                  detail: '22" • Natural Black',
                },
                {
                  name: "Body Wave 180% Density",
                  price: "₦162,000",
                  detail: '20" • Shiny Brown',
                },
              ].map((product, i) => (
                <div key={i} className="reveal-card">
                  <div className="product-card">
                    <div className="product-image-wrap">
                      <Image
                        src="/hair.webp"
                        alt={product.name}
                        fill
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
                        className="object-cover"
                      />
                      <span className="product-badge">Best Seller</span>
                      <span className="product-quick-view">Quick View</span>
                    </div>

                    <div className="product-body">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-meta">
                        <p className="product-price">{product.price}</p>
                        <div className="rating">
                          {[...Array(5)].map((_, j) => (
                            <span key={j} className="star" />
                          ))}
                        </div>
                      </div>
                      <p className="product-detail">{product.detail}</p>
                      <button className="add-to-cart">
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
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
            <a href="/us/custom-order" className="btn-dark">
              Start Custom Order →
            </a>
          </div>
        </section>
      </main>
      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-white text-xl font-semibold tracking-[0.25em]">
                GRACE-T HAIR
              </h3>

              <p className="mt-3 text-white/50 max-w-sm text-sm leading-relaxed">
                Premium luxury hair extensions crafted for confidence, elegance,
                and timeless beauty.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <a
                href="/us/store"
                className="text-white/60 hover:text-[#BBE917] transition-colors"
              >
                Shop
              </a>

              <a
                href="/us/contact"
                className="text-white/60 hover:text-[#BBE917] transition-colors"
              >
                Contact
              </a>

              <a
                href="/us/faq"
                className="text-white/60 hover:text-[#BBE917] transition-colors"
              >
                FAQ
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#BBE917] transition-all duration-300 hover:scale-110"
                aria-label="X"
              >
                <FaXTwitter size={18} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#BBE917] transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#BBE917] transition-all duration-300 hover:scale-110"
                aria-label="TikTok"
              >
                <FaTiktok size={18} />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#BBE917] transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} GRACE-T HAIR. All rights reserved.
            </p>

            <div className="flex gap-6 text-xs text-white/40">
              <a
                href="/privacy"
                className="hover:text-[#BBE917] transition-colors"
              >
                Privacy Policy
              </a>

              <a
                href="/terms"
                className="hover:text-[#BBE917] transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
          {/* Decorative Gradient Line */}
          <div className="mt-6 h-px bg-linear-to-r from-transparent via-[#BBE917]/20 to-transparent" />
        </div>
      </footer>
    </>
  );
}
