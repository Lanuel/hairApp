import "server-only";

import { randomUUID } from "crypto";
import { auth } from "@/auth";
import {
  clearCartSessionId,
  getCartSessionId,
  setCartSessionId,
} from "@/lib/cart/cookie";
import type { CartLineItem, CartSummary } from "@/lib/cart/types";
import { prisma } from "@/lib/prisma";

const cartItemInclude = {
  product: {
    include: { images: true },
  },
} as const;

function getUnitPrice(price: number, discountPrice: number | null) {
  return discountPrice ?? price;
}

function mapCartItem(item: {
  id: string;
  quantity: number;
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    discountPrice: number | null;
    inStock: boolean;
    stock: number;
    images: { url: string }[];
  };
}): CartLineItem {
  const unitPrice = getUnitPrice(item.product.price, item.product.discountPrice);

  return {
    id: item.id,
    productId: item.product.id,
    slug: item.product.slug,
    name: item.product.name,
    image: item.product.images[0]?.url ?? null,
    unitPrice,
    quantity: item.quantity,
    lineTotal: unitPrice * item.quantity,
    inStock: item.product.inStock,
    stock: item.product.stock,
  };
}

function getEmptyCartSummary(): CartSummary {
  return { items: [], itemCount: 0, subtotal: 0 };
}

async function mergeGuestCartIntoUser(userId: string, sessionId: string) {
  const guestCart = await prisma.cart.findUnique({
    where: { sessionId },
    include: { items: true },
  });

  if (!guestCart || guestCart.items.length === 0) {
    await clearCartSessionId();
    return;
  }

  let userCart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true },
  });

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: { userId },
      include: { items: true },
    });
  }

  for (const guestItem of guestCart.items) {
    const existing = userCart.items.find(
      (item) => item.productId === guestItem.productId,
    );

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + guestItem.quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: guestItem.productId,
          quantity: guestItem.quantity,
        },
      });
    }
  }

  await prisma.cart.delete({ where: { id: guestCart.id } });
  await clearCartSessionId();
}

export async function mergeGuestCartIntoUserCart(userId: string) {
  const sessionId = await getCartSessionId();
  if (!sessionId) return;

  await mergeGuestCartIntoUser(userId, sessionId);
}

export async function getExistingCart() {
  const session = await auth();
  const userId =
    session?.user?.role === "customer" ? session.user.id : undefined;

  if (userId) {
    return prisma.cart.findUnique({ where: { userId } });
  }

  const sessionId = await getCartSessionId();
  if (!sessionId) return null;

  return prisma.cart.findUnique({ where: { sessionId } });
}

export async function getOrCreateCartForMutation() {
  const session = await auth();
  const userId =
    session?.user?.role === "customer" ? session.user.id : undefined;

  if (userId) {
    await mergeGuestCartIntoUserCart(userId);

    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    return cart;
  }

  let sessionId = await getCartSessionId();
  if (!sessionId) {
    sessionId = randomUUID();
    await setCartSessionId(sessionId);
  }

  let cart = await prisma.cart.findUnique({ where: { sessionId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { sessionId } });
  }

  return cart;
}

async function getCartSummaryByCartId(cartId: string): Promise<CartSummary> {
  const rows = await prisma.cartItem.findMany({
    where: { cartId },
    include: cartItemInclude,
    orderBy: { id: "asc" },
  });

  const items = rows.map(mapCartItem);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);

  return { items, itemCount, subtotal };
}

export async function getCartSummary(): Promise<CartSummary> {
  const cart = await getExistingCart();
  if (!cart) return getEmptyCartSummary();

  return getCartSummaryByCartId(cart.id);
}

export async function getCartItemCount(): Promise<number> {
  const { itemCount } = await getCartSummary();
  return itemCount;
}

export async function getCartItemCountByCartId(cartId: string): Promise<number> {
  const { itemCount } = await getCartSummaryByCartId(cartId);
  return itemCount;
}
