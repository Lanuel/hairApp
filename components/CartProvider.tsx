"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getCartCountAction } from "@/lib/cart/actions";

type CartContextValue = {
  itemCount: number;
  setItemCount: (count: number) => void;
  refreshCartCount: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  children: ReactNode;
  initialItemCount: number;
};

export function CartProvider({ children, initialItemCount }: CartProviderProps) {
  const [cartState, setCartState] = useState(() => ({
    initialItemCount,
    itemCount: initialItemCount,
  }));

  if (cartState.initialItemCount !== initialItemCount) {
    setCartState({
      initialItemCount,
      itemCount: initialItemCount,
    });
  }

  const setItemCount = useCallback((count: number) => {
    setCartState((current) => ({
      initialItemCount: current.initialItemCount,
      itemCount: count,
    }));
  }, []);

  const refreshCartCount = useCallback(async () => {
    const count = await getCartCountAction();
    setItemCount(count);
  }, [setItemCount]);

  const value = useMemo(
    () => ({
      itemCount: cartState.itemCount,
      setItemCount,
      refreshCartCount,
    }),
    [cartState.itemCount, refreshCartCount, setItemCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
