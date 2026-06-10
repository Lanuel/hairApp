// C:\Users\Lanuel\my-app\components\Navbar.tsx
"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── STICKY NAV WRAPPER ── */}
      <div className={`nav-wrapper ${scrolled ? "scrolled" : ""}`}>
        <div className={`promo-bar ${scrolled ? "promo-hidden" : ""}`}>
          Free Shipping on Orders Over ₦150,000 &nbsp;•&nbsp; Code:{" "}
          <strong>WELCOME150</strong>
        </div>

        <header className="navbar">
          <nav className="nav-inner">
            <button
              data-testid="nav-menu-button"
              className="nav-menu-btn"
              aria-label="Toggle Menu"
            >
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
              <a href="/store" className="nav-link shop-link">
                Shop
              </a>
              <a href="/us/account" className="nav-link account-link">
                Login
              </a>
              <a
                href="/us/cart"
                className="nav-cart"
                aria-label={`Cart with ${cartCount} items`}
              >
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
                <span className="cart-text">Cart</span>
                <span className="cart-badge">{cartCount}</span>
              </a>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}
