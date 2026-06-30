"use server";

import { revalidatePath } from "next/cache";
import {
  getCartItemCount,
  getCartItemCountByCartId,
  getExistingCart,
  getOrCreateCartForMutation,
} from "@/lib/cart.server";
import { prisma } from "@/lib/prisma";

export type CartActionState = {
  error?: string;
  success?: string;
  itemCount?: number;
};

function revalidateCartPaths() {
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function getCartCountAction(): Promise<number> {
  return getCartItemCount();
}

export async function addToCart(
  _prevState: CartActionState,
  formData: FormData,
): Promise<CartActionState> {
  const productId = String(formData.get("productId") ?? "").trim();
  const quantityRaw = Number(formData.get("quantity") ?? 1);
  const quantity = Number.isFinite(quantityRaw)
    ? Math.max(1, Math.floor(quantityRaw))
    : 1;

  if (!productId) {
    return { error: "Product not found." };
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || !product.inStock) {
    return { error: "This product is currently unavailable." };
  }

  if (product.stock > 0 && quantity > product.stock) {
    return { error: `Only ${product.stock} left in stock.` };
  }

  const cart = await getOrCreateCartForMutation();

  const existing = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  const nextQuantity = (existing?.quantity ?? 0) + quantity;

  if (product.stock > 0 && nextQuantity > product.stock) {
    return { error: `Only ${product.stock} left in stock.` };
  }

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: nextQuantity },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  revalidateCartPaths();

  return {
    success: "Added to cart.",
    itemCount: await getCartItemCountByCartId(cart.id),
  };
}

export async function updateCartItemQuantity(
  _prevState: CartActionState,
  formData: FormData,
): Promise<CartActionState> {
  const itemId = String(formData.get("itemId") ?? "").trim();
  const quantityRaw = Number(formData.get("quantity"));
  const quantity = Number.isFinite(quantityRaw)
    ? Math.max(0, Math.floor(quantityRaw))
    : 0;

  if (!itemId) {
    return { error: "Cart item not found." };
  }

  const cart = await getExistingCart();
  if (!cart) {
    return { error: "Cart item not found.", itemCount: 0 };
  }

  const item = await prisma.cartItem.findFirst({
    where: { id: itemId, cartId: cart.id },
    include: { product: true },
  });

  if (!item) {
    return { error: "Cart item not found." };
  }

  if (quantity === 0) {
    await prisma.cartItem.delete({ where: { id: itemId } });
    revalidateCartPaths();
    return {
      success: "Item removed.",
      itemCount: await getCartItemCountByCartId(cart.id),
    };
  }

  if (item.product.stock > 0 && quantity > item.product.stock) {
    return { error: `Only ${item.product.stock} left in stock.` };
  }

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });

  revalidateCartPaths();

  return {
    success: "Cart updated.",
    itemCount: await getCartItemCountByCartId(cart.id),
  };
}

export async function removeFromCart(
  _prevState: CartActionState,
  formData: FormData,
): Promise<CartActionState> {
  const itemId = String(formData.get("itemId") ?? "").trim();

  if (!itemId) {
    return { error: "Cart item not found." };
  }

  const cart = await getExistingCart();
  if (!cart) {
    return { error: "Cart item not found.", itemCount: 0 };
  }

  const item = await prisma.cartItem.findFirst({
    where: { id: itemId, cartId: cart.id },
  });

  if (!item) {
    return { error: "Cart item not found." };
  }

  await prisma.cartItem.delete({ where: { id: itemId } });
  revalidateCartPaths();

  return {
    success: "Item removed.",
    itemCount: await getCartItemCountByCartId(cart.id),
  };
}

export async function clearCart(): Promise<void> {
  const cart = await getExistingCart();
  if (!cart) return;

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  revalidateCartPaths();
}
