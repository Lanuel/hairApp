"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            >
              <div className="hamburger">
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
              <Link href={user ? "/account" : "/account/login"} className="nav-link account-link">
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
    </>
  );
}
