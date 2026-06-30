"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

type FeaturedProductsSectionProps = {
  products: Product[];
};

export default function FeaturedProductsSection({
  products,
}: FeaturedProductsSectionProps) {
  const featuredRef = useRef<HTMLElement>(null);

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
  }, [products]);

  return (
    <section className="featured" ref={featuredRef}>
      <div className="featured-inner">
        <div className="section-header">
          <h2 className="section-title">
            Featured Wigs
            <span>Editor&apos;s Picks</span>
          </h2>
          <Link href="/store" className="view-all">
            View All <span>→</span>
          </Link>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="reveal-card">
              <ProductCard product={product} variant="featured" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
