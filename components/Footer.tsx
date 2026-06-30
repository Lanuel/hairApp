//C:\Users\Lanuel\my-app\components\Footer.tsx
"use client";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 bg-black backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-white text-xl font-semibold tracking-[0.25em]">
                <a href="/">GraceT HAIR</a>
              </h3>

              <p className="mt-3 text-white/50 max-w-sm text-sm leading-relaxed">
                Premium luxury hair extensions crafted for confidence, elegance,
                and timeless beauty.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <Link
                href="/store"
                className="text-white/60 hover:text-accent transition-colors"
              >
                Shop
              </Link>

              <Link
                href="/contact"
                className="text-white/60 hover:text-accent transition-colors"
              >
                Contact
              </Link>

              <Link
                href="/contact#faq"
                className="text-white/60 hover:text-accent transition-colors"
              >
                FAQ
              </Link>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300"
                aria-label="X"
              >
                <FaXTwitter size={18} />
              </a>

              <a
                href="https://www.instagram.com/gracet_hair"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300"
                aria-label="TikTok"
              >
                <FaTiktok size={18} />
              </a>

              <a
                href="https://www.facebook.com/Gracethair"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} GraceT HAIR. All rights reserved.
            </p>

            <div className="flex gap-6 text-xs text-white/40">
              <a
                href="/privacy"
                className="hover:text-accent transition-colors"
              >
                Privacy Policy
              </a>

              <a href="/terms" className="hover:text-accent transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
          {/* Decorative Gradient Line */}
          <div className="mt-6 h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />
        </div>
      </footer>
    </>
  );
}
