"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  removeFromCart,
  updateCartItemQuantity,
  type CartActionState,
} from "@/lib/cart/actions";
import { formatPrice } from "@/lib/products";
import type { CartLineItem } from "@/lib/cart/types";
import { useCart } from "@/components/CartProvider";

type CartLineItemRowProps = {
  item: CartLineItem;
};

const initialState: CartActionState = {};

export default function CartLineItemRow({ item }: CartLineItemRowProps) {
  const { setItemCount } = useCart();
  const [updateState, updateAction, updatePending] = useActionState(
    updateCartItemQuantity,
    initialState,
  );
  const [removeState, removeAction, removePending] = useActionState(
    removeFromCart,
    initialState,
  );

  useEffect(() => {
    if (updateState.itemCount !== undefined) {
      setItemCount(updateState.itemCount);
    }
  }, [updateState.itemCount, setItemCount]);

  useEffect(() => {
    if (removeState.itemCount !== undefined) {
      setItemCount(removeState.itemCount);
    }
  }, [removeState.itemCount, setItemCount]);

  const error = updateState.error ?? removeState.error;
  const pending = updatePending || removePending;

  return (
    <article className="flex gap-4 sm:gap-6 py-6 border-b border-white/10">
      <Link
        href={`/products/${item.slug}`}
        className="relative w-24 sm:w-28 aspect-3/4 shrink-0 overflow-hidden rounded border border-white/10 bg-white/5"
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xs">
            No image
          </div>
        )}
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href={`/products/${item.slug}`}
              className="text-white text-sm sm:text-base hover:text-gold transition-colors"
            >
              {item.name}
            </Link>
            <p className="text-white/60 text-sm mt-1">
              {formatPrice(item.unitPrice)} each
            </p>
            {!item.inStock ? (
              <p className="text-red-400 text-xs mt-2">Out of stock</p>
            ) : item.stock > 0 && item.quantity > item.stock ? (
              <p className="text-amber-400 text-xs mt-2">
                Only {item.stock} available
              </p>
            ) : null}
          </div>

          <p className="text-white font-medium text-sm sm:text-base shrink-0">
            {formatPrice(item.lineTotal)}
          </p>
        </div>

        {error ? (
          <p className="text-red-400 text-xs mt-2" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-white/10 rounded overflow-hidden">
            <form action={updateAction}>
              <input type="hidden" name="itemId" value={item.id} />
              <input
                type="hidden"
                name="quantity"
                value={Math.max(1, item.quantity - 1)}
              />
              <button
                type="submit"
                className="px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                aria-label="Decrease quantity"
                disabled={pending || item.quantity <= 1}
              >
                <Minus size={14} />
              </button>
            </form>

            <span className="px-4 py-2 text-sm text-white min-w-10 text-center">
              {item.quantity}
            </span>

            <form action={updateAction}>
              <input type="hidden" name="itemId" value={item.id} />
              <input type="hidden" name="quantity" value={item.quantity + 1} />
              <button
                type="submit"
                className="px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                aria-label="Increase quantity"
                disabled={
                  pending || (item.stock > 0 && item.quantity >= item.stock)
                }
              >
                <Plus size={14} />
              </button>
            </form>
          </div>

          <form action={removeAction}>
            <input type="hidden" name="itemId" value={item.id} />
            <button
              type="submit"
              className="inline-flex items-center gap-2 text-white/50 hover:text-red-400 text-sm transition-colors disabled:opacity-50 cursor-pointer"
              disabled={pending}
            >
              <Trash2 size={14} />
              Remove
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
