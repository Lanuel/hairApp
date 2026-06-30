export type Product = {
  id: string;
  slug: string;
  name: string;
  priceFrom: number;
  image: string | null;
  featured?: boolean;
  detail?: string;
  createdAt: string;
};

export type ProductDetail = Product & {
  description: string;
  images: string[];
  price: number;
  discountPrice: number | null;
  inStock: boolean;
  stock: number;
  category: string;
  hairType: string;
  hairTexture: string;
  hairLength: string;
  hairColor: string;
};

type DbProductRecord = {
  id: string;
  slug: string;
  name: string;
  price: number;
  discountPrice: number | null;
  description: string;
  hairLength: string;
  hairType: string;
  featured: boolean;
  createdAt: Date;
  images: { url: string }[];
};

export function mapDbProductToProduct(db: DbProductRecord): Product {
  const detailParts = [db.hairLength, db.hairType].filter(Boolean);

  return {
    id: db.id,
    slug: db.slug,
    name: db.name,
    priceFrom: db.discountPrice ?? db.price,
    image: db.images[0]?.url ?? null,
    featured: db.featured,
    detail:
      detailParts.length > 0 ? detailParts.join(" • ") : db.description,
    createdAt: db.createdAt.toISOString(),
  };
}

export type SortOption = "created_at" | "price_asc" | "price_desc";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "created_at", label: "Latest Arrivals" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
];

export function formatProductPrice(priceFrom: number): string {
  return `From ₦${priceFrom.toFixed(2)}`;
}

export function formatPrice(price: number): string {
  return `₦${price.toFixed(2)}`;
}

export function sortProducts(items: Product[], sortBy: SortOption): Product[] {
  const sorted = [...items];

  switch (sortBy) {
    case "price_asc":
      return sorted.sort((a, b) => a.priceFrom - b.priceFrom);

    case "price_desc":
      return sorted.sort((a, b) => b.priceFrom - a.priceFrom);

    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
}
