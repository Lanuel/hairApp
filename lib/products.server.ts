import "server-only";

import { prisma } from "@/lib/prisma";
import { type Product, mapDbProductToProduct } from "@/lib/products";

const productInclude = { images: true } as const;

export async function getProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    include: productInclude,
    orderBy: { createdAt: "desc" },
  });

  return rows.map(mapDbProductToProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { featured: true },
    include: productInclude,
    orderBy: { createdAt: "desc" },
  });

  return rows.map(mapDbProductToProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({
    where: { slug },
    include: productInclude,
  });

  return row ? mapDbProductToProduct(row) : null;
}

export async function getProductDetailBySlug(
  slug: string,
): Promise<import("@/lib/products").ProductDetail | null> {
  const row = await prisma.product.findUnique({
    where: { slug },
    include: productInclude,
  });

  if (!row) return null;

  const product = mapDbProductToProduct(row);

  return {
    ...product,
    description: row.description,
    images: row.images.map((image) => image.url),
    price: row.price,
    discountPrice: row.discountPrice,
    inStock: row.inStock,
    stock: row.stock,
    category: row.category,
    hairType: row.hairType,
    hairTexture: row.hairTexture,
    hairLength: row.hairLength,
    hairColor: row.hairColor,
  };
}
