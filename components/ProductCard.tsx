import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { formatProductPrice, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  variant?: "store" | "featured";
};

function ProductImage({
  src,
  alt,
  sizes,
  className,
}: {
  src: string | null;
  alt: string;
  sizes: string;
  className: string;
}) {
  if (!src) {
    return (
      <div
        className="absolute inset-0 bg-white/5 flex items-center justify-center text-white/30 text-xs"
        aria-hidden
      >
        No image
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      loading="lazy"
      sizes={sizes}
      className={className}
    />
  );
}

export default function ProductCard({
  product,
  variant = "store",
}: ProductCardProps) {
  if (variant === "featured") {
    return (
      <div className="product-card">
        <div className="product-image-wrap">
          <ProductImage
            src={product.image}
            alt={product.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <span className="product-badge">Best Seller</span>
          <span className="product-quick-view">Quick View</span>
        </div>

        <div className="product-body">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-meta">
            <p className="product-price">
              {formatProductPrice(product.priceFrom)}
            </p>
            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <span key={index} className="star" />
              ))}
            </div>
          </div>
          {product.detail ? (
            <p className="product-detail">{product.detail}</p>
          ) : null}
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    );
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <article
        data-testid="product-wrapper"
        className="bg-black border border-white/10 rounded overflow-hidden hover:border-accent/50 transition-all duration-300"
      >
        <div className="relative overflow-hidden aspect-3/4 w-full">
          <ProductImage
            src={product.image}
            alt={product.name}
            sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-4">
          <p
            data-testid="product-title"
            className="text-white text-sm mb-2 group-hover:text-gold transition-colors"
          >
            {product.name}
          </p>
          <p data-testid="price" className="text-white/70 text-sm font-medium">
            {formatProductPrice(product.priceFrom)}
          </p>
        </div>
      </article>
    </Link>
  );
}
