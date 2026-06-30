"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";
import { slugify } from "@/lib/admin/constants";
import { requireAdmin, requireAdminAction } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";

export type ProductFormState = {
  error?: string;
  success?: string;
};

export type ProductInput = {
  name: string;
  slug?: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  category: string;
  hairType: string;
  hairTexture: string;
  hairLength: string;
  hairColor: string;
  density?: string | null;
  laceType?: string | null;
  capSize?: string | null;
  featured: boolean;
  inStock: boolean;
  stock: number;
  imageUrl?: string;
  imagePublicId?: string;
};

function parseProductForm(formData: FormData): ProductInput {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const price = Number(formData.get("price"));
  const discountRaw = String(formData.get("discountPrice") ?? "").trim();
  const stock = Number(formData.get("stock") ?? 0);

  return {
    name,
    slug: slugInput || slugify(name),
    description: String(formData.get("description") ?? "").trim(),
    price,
    discountPrice: discountRaw ? Number(discountRaw) : null,
    category: String(formData.get("category") ?? "Wigs"),
    hairType: String(formData.get("hairType") ?? "Virgin Hair"),
    hairTexture: String(formData.get("hairTexture") ?? "Straight"),
    hairLength: String(formData.get("hairLength") ?? '24"'),
    hairColor: String(formData.get("hairColor") ?? "Natural Black"),
    density: String(formData.get("density") ?? "").trim() || null,
    laceType: String(formData.get("laceType") ?? "").trim() || null,
    capSize: String(formData.get("capSize") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
    inStock: formData.get("inStock") === "on",
    stock: Number.isFinite(stock) ? stock : 0,
    imageUrl: String(formData.get("imageUrl") ?? "").trim() || undefined,
    imagePublicId: String(formData.get("imagePublicId") ?? "").trim() || undefined,
  };
}

function validateProduct(input: ProductInput): string | null {
  if (!input.name) return "Product name is required.";
  if (!input.slug) return "Product slug is required.";
  if (!input.description) return "Description is required.";
  if (!Number.isFinite(input.price) || input.price <= 0) {
    return "Price must be a positive number.";
  }
  if (input.discountPrice != null && input.discountPrice >= input.price) {
    return "Discount price must be lower than the regular price.";
  }
  if (!Number.isFinite(input.stock) || input.stock < 0) {
    return "Stock must be zero or greater.";
  }
  return null;
}

async function uploadImage(file: File | null) {
  if (!file || file.size === 0) return null;

  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "gracet-hair/products", resource_type: "image" },
          (error, uploadResult) => {
            if (error || !uploadResult) {
              reject(error ?? new Error("Upload failed"));
              return;
            }
            resolve({
              secure_url: uploadResult.secure_url,
              public_id: uploadResult.public_id,
            });
          },
        )
        .end(buffer);
    },
  );

  return result;
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdminAction();

  const input = parseProductForm(formData);
  const validationError = validateProduct(input);
  if (validationError) return { error: validationError };

  const existing = await prisma.product.findUnique({
    where: { slug: input.slug },
  });
  if (existing) return { error: "A product with this slug already exists." };

  const imageFile = formData.get("image") as File | null;
  let imageUrl = input.imageUrl;
  let imagePublicId = input.imagePublicId;

  try {
    const uploaded = await uploadImage(imageFile);
    if (uploaded) {
      imageUrl = uploaded.secure_url;
      imagePublicId = uploaded.public_id;
    }

    await prisma.product.create({
      data: {
        name: input.name,
        slug: input.slug!,
        description: input.description,
        price: input.price,
        discountPrice: input.discountPrice,
        category: input.category,
        hairType: input.hairType,
        hairTexture: input.hairTexture,
        hairLength: input.hairLength,
        hairColor: input.hairColor,
        density: input.density,
        laceType: input.laceType,
        capSize: input.capSize,
        featured: input.featured,
        inStock: input.inStock,
        stock: input.stock,
        ...(imageUrl && imagePublicId
          ? {
              images: {
                create: { url: imageUrl, publicId: imagePublicId },
              },
            }
          : {}),
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to create product. Please try again." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/admin/dashboard");
  redirect("/admin/products");
}

export async function updateProduct(
  productId: string,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdminAction();

  const input = parseProductForm(formData);
  const validationError = validateProduct(input);
  if (validationError) return { error: validationError };

  const duplicate = await prisma.product.findFirst({
    where: { slug: input.slug, NOT: { id: productId } },
  });
  if (duplicate) return { error: "Another product already uses this slug." };

  const imageFile = formData.get("image") as File | null;
  let imageUrl = input.imageUrl;
  let imagePublicId = input.imagePublicId;

  try {
    const uploaded = await uploadImage(imageFile);
    if (uploaded) {
      imageUrl = uploaded.secure_url;
      imagePublicId = uploaded.public_id;
    }

    await prisma.product.update({
      where: { id: productId },
      data: {
        name: input.name,
        slug: input.slug!,
        description: input.description,
        price: input.price,
        discountPrice: input.discountPrice,
        category: input.category,
        hairType: input.hairType,
        hairTexture: input.hairTexture,
        hairLength: input.hairLength,
        hairColor: input.hairColor,
        density: input.density,
        laceType: input.laceType,
        capSize: input.capSize,
        featured: input.featured,
        inStock: input.inStock,
        stock: input.stock,
      },
    });

    if (imageUrl && imagePublicId) {
      const currentImages = await prisma.productImage.findMany({
        where: { productId },
      });

      if (currentImages.length === 0) {
        await prisma.productImage.create({
          data: { productId, url: imageUrl, publicId: imagePublicId },
        });
      } else {
        await prisma.productImage.update({
          where: { id: currentImages[0].id },
          data: { url: imageUrl, publicId: imagePublicId },
        });
      }
    }
  } catch (error) {
    console.error(error);
    return { error: "Failed to update product. Please try again." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/admin/dashboard");
  revalidatePath(`/admin/products/${productId}/edit`);
  redirect("/admin/products");
}

export async function deleteProduct(productId: string) {
  await requireAdminAction();

  try {
    const images = await prisma.productImage.findMany({
      where: { productId },
    });

    await prisma.product.delete({ where: { id: productId } });

    for (const image of images) {
      if (image.publicId.startsWith("seed/")) continue;
      try {
        await cloudinary.uploader.destroy(image.publicId);
      } catch {
        // Ignore Cloudinary cleanup failures for seeded assets.
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete product.");
  }

  revalidatePath("/admin/products");
  revalidatePath("/admin/dashboard");
}

export async function getDashboardStats() {
  await requireAdmin();

  const [totalProducts, featuredProducts, inStockProducts, lowStockProducts] =
    await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { featured: true } }),
      prisma.product.count({ where: { inStock: true } }),
      prisma.product.count({ where: { stock: { lte: 5 } } }),
    ]);

  return {
    totalProducts,
    featuredProducts,
    inStockProducts,
    lowStockProducts,
  };
}

export async function getAdminProducts() {
  await requireAdmin();

  return prisma.product.findMany({
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdminProduct(id: string) {
  await requireAdmin();

  return prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });
}

export async function getRecentProducts(limit = 5) {
  await requireAdmin();

  return prisma.product.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });
}
