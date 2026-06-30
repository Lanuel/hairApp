"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {
  SORT_OPTIONS,
  sortProducts,
  type Product,
  type SortOption,
} from "@/lib/products";

type StoreProductListProps = {
  products: Product[];
};

export default function StoreProductList({ products }: StoreProductListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("created_at");

  const sortedProducts = useMemo(
    () => sortProducts(products, sortBy),
    [products, sortBy],
  );

  return (
    <div
      className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-12"
      data-testid="category-container"
    >
      <aside className="lg:min-w-55 lg:shrink-0">
        <p className="text-white/50 text-sm mb-3">Sort by</p>
        <div
          role="radiogroup"
          aria-label="Sort products"
          className="grid gap-3"
        >
          {SORT_OPTIONS.map((option) => {
            const isActive = sortBy === option.value;

            return (
              <label
                key={option.value}
                className={`flex items-center gap-3 cursor-pointer text-sm transition-colors ${
                  isActive ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={isActive}
                  onChange={() => setSortBy(option.value)}
                  className="sr-only"
                />
                <span
                  className={`h-2 w-2 rounded-full ${
                    isActive ? "bg-accent" : "bg-white/20"
                  }`}
                  aria-hidden
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </aside>

      <div className="w-full min-w-0">
        <header className="mb-10">
          <h1
            className="font-serif text-4xl text-white"
            data-testid="store-page-title"
          >
            All Products
          </h1>
          <p className="text-white/60 mt-2">Discover our luxury collection</p>
        </header>

        <Link
          href="/custom-order"
          className="block mb-10 p-5 bg-white/5 border border-white/10 rounded-lg hover:border-accent/40 transition-colors group"
        >
          <p className="text-white/80 text-sm">
            Can&apos;t find what you&apos;re looking for?{" "}
            <span className="font-semibold text-gold group-hover:underline">
              Request a custom order →
            </span>
          </p>
        </Link>

        <ul
          className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6"
          data-testid="products-list"
        >
          {sortedProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} variant="store" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
