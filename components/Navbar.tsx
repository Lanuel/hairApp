"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useCart } from "@/components/CartProvider";

type NavbarUser = {
  name?: string | null;
  email?: string | null;
};

type NavbarProps = {
  user?: NavbarUser | null;
};

export default function Navbar({ user = null }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const accountLabel = user?.name ?? user?.email ?? "Account";

  return (
    <>
      <div className={`nav-wrapper ${scrolled ? "scrolled" : ""}`}>
        <div className={`promo-bar ${scrolled ? "promo-hidden" : ""}`}>
          24 - 48 Hours delivery for orders within Abuja &nbsp;•&nbsp; Code:{" "}
          <strong>ABV</strong>
        </div>

        <header className="navbar">
          <nav className="nav-inner">
            <button
              data-testid="nav-menu-button"
              className="nav-menu-btn"
              aria-label="Toggle Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <div className={`hamburger${menuOpen ? " is-open" : ""}`}>
                <span />
                <span />
                <span />
              </div>
              <span>Menu</span>
            </button>

            <div className="nav-links">
              <Link href="/store" className="nav-link shop-link">
                Shop
              </Link>
              <Link href="/contact" className="nav-link contact-link">
                Contact
              </Link>
              <Link
                href={user ? "/account" : "/account/login"}
                className="nav-link account-link"
              >
                {user ? accountLabel : "Login"}
              </Link>
              <Link
                href="/cart"
                className="nav-cart"
                aria-label={`Cart with ${itemCount} items`}
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
                {itemCount > 0 ? (
                  <span className="cart-badge">{itemCount}</span>
                ) : null}
              </Link>
            </div>
          </nav>
        </header>
      </div>

      {/* ── MOBILE MENU OVERLAY ── */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── MOBILE MENU DRAWER ── */}
      <nav
        className={`mobile-menu-drawer${menuOpen ? " is-open" : ""}`}
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-header">
          <span className="mobile-menu-brand">GraceT HAIR</span>
          <button
            className="mobile-menu-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mobile-menu-links">
          <Link
            href="/store"
            className="mobile-menu-link"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/contact"
            className="mobile-menu-link"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href={user ? "/account" : "/account/login"}
            className="mobile-menu-link"
            onClick={() => setMenuOpen(false)}
          >
            {user ? accountLabel : "Login"}
          </Link>
          <Link
            href="/cart"
            className="mobile-menu-link mobile-menu-cart"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Cart
            {itemCount > 0 && (
              <span className="mobile-menu-badge">{itemCount}</span>
            )}
          </Link>
        </div>

        <div className="mobile-menu-footer">
          <p className="mobile-menu-footer-text">
            Premium luxury hair &nbsp;·&nbsp; Abuja delivery 24–48 hrs
          </p>
        </div>
      </nav>
    </>
  );
}
