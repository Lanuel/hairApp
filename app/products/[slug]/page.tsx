import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { formatPrice, formatProductPrice } from "@/lib/products";
import { getProductDetailBySlug } from "@/lib/products.server";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductDetailBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | GraceT Hair" };
  }

  return {
    title: `${product.name} | GraceT Hair`,
    description: product.description,
  };
}

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductDetailBySlug(slug);

  if (!product) {
    notFound();
  }

  const hasDiscount =
    product.discountPrice !== null && product.discountPrice < product.price;

  return (
    <div className="bg-black min-h-screen page-below-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 pb-16">
        <nav className="text-sm text-white/50 mb-8">
          <Link href="/store" className="hover:text-gold transition-colors">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-3/4 overflow-hidden rounded border border-white/10 bg-white/5">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/30">
                  No image
                </div>
              )}
            </div>

            {product.images.length > 1 ? (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((image, index) => (
                  <div
                    key={image}
                    className="relative aspect-square overflow-hidden rounded border border-white/10"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <p className="text-gold text-sm uppercase tracking-[0.2em] mb-3">
              {product.category}
            </p>
            <h1 className="text-3xl sm:text-4xl text-white font-serif mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              {hasDiscount ? (
                <>
                  <p className="text-2xl text-white">
                    {formatPrice(product.discountPrice!)}
                  </p>
                  <p className="text-lg text-white/40 line-through">
                    {formatPrice(product.price)}
                  </p>
                </>
              ) : (
                <p className="text-2xl text-white">
                  {formatProductPrice(product.priceFrom)}
                </p>
              )}
            </div>

            <p className="text-white/70 leading-relaxed mb-8">
              {product.description}
            </p>

            <dl className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div>
                <dt className="text-white/50">Hair type</dt>
                <dd className="text-white mt-1">{product.hairType}</dd>
              </div>
              <div>
                <dt className="text-white/50">Texture</dt>
                <dd className="text-white mt-1">{product.hairTexture}</dd>
              </div>
              <div>
                <dt className="text-white/50">Length</dt>
                <dd className="text-white mt-1">{product.hairLength}</dd>
              </div>
              <div>
                <dt className="text-white/50">Color</dt>
                <dd className="text-white mt-1">{product.hairColor}</dd>
              </div>
            </dl>

            <div className="mb-6">
              {product.inStock ? (
                <p className="text-emerald-400 text-sm">
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "In stock"}
                </p>
              ) : (
                <p className="text-red-400 text-sm">Out of stock</p>
              )}
            </div>

            <AddToCartButton
              productId={product.id}
              disabled={!product.inStock}
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-accent px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
