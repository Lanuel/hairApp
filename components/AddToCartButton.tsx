"use client";

import { useActionState, useEffect } from "react";
import { addToCart, type CartActionState } from "@/lib/cart/actions";
import { useCart } from "@/components/CartProvider";

type AddToCartButtonProps = {
  productId: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  quantity?: number;
};

const initialState: CartActionState = {};

export default function AddToCartButton({
  productId,
  disabled = false,
  className = "add-to-cart",
  label = "Add to Cart",
  quantity = 1,
}: AddToCartButtonProps) {
  const { setItemCount } = useCart();
  const [state, formAction, pending] = useActionState(addToCart, initialState);

  useEffect(() => {
    if (state.itemCount !== undefined) {
      setItemCount(state.itemCount);
    }
  }, [state.itemCount, setItemCount]);

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value={quantity} />
      {state.error ? (
        <p className="text-red-400 text-xs mb-2" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="text-emerald-400 text-xs mb-2" role="status">
          {state.success}
        </p>
      ) : null}
      <button
        type="submit"
        className={`${className} cursor-pointer`}
        disabled={disabled || pending}
      >
        <span>{pending ? "Adding..." : label}</span>
      </button>
    </form>
  );
}
