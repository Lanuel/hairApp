import type { Metadata } from "next";
import Link from "next/link";
import CartLineItemRow from "@/components/CartLineItemRow";
import { formatPrice } from "@/lib/products";
import { getCartSummary } from "@/lib/cart.server";

export const metadata: Metadata = {
  title: "Shopping Cart | GraceT Hair",
};

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cart = await getCartSummary();

  return (
    <div className="bg-black min-h-screen page-below-nav">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 pb-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl text-white font-serif">
              Shopping Cart
            </h1>
            <p className="text-white/60 mt-2">
              {cart.itemCount === 0
                ? "Your cart is empty."
                : `${cart.itemCount} item${cart.itemCount === 1 ? "" : "s"}`}
            </p>
          </div>
          <Link
            href="/store"
            className="text-sm text-gold hover:underline shrink-0"
          >
            Continue shopping
          </Link>
        </div>

        {cart.items.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-10 text-center">
            <p className="text-white/70 mb-6">
              Browse our collection and add your favorite pieces.
            </p>
            <Link
              href="/store"
              className="inline-flex rounded-md bg-accent px-6 py-3 text-sm text-white hover:bg-accent/90"
            >
              Shop wigs
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <section>
              {cart.items.map((item) => (
                <CartLineItemRow key={item.id} item={item} />
              ))}
            </section>

            <aside className="h-fit rounded-lg border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-lg text-white mb-4">Order summary</h2>
              <div className="flex items-center justify-between text-sm text-white/70 mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(cart.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/70 mb-6">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex items-center justify-between text-white font-medium border-t border-white/10 pt-4 mb-6">
                <span>Total</span>
                <span>{formatPrice(cart.subtotal)}</span>
              </div>
              <Link
                href="/account/login?callbackUrl=/cart"
                className="inline-flex w-full items-center justify-center rounded-md bg-accent px-4 py-3 text-sm text-white hover:bg-accent/90"
              >
                Proceed to checkout
              </Link>
              <p className="text-xs text-white/50 mt-4 text-center">
                Sign in or create an account to complete your order.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
