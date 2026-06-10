export const PRODUCT_IMAGE_PLACEHOLDERS = [
  "/store_hair.webp",
  "/store_hair02.webp",
  ...Array.from({ length: 14 }, (_, i) => `/store_hair${i + 3}.webp`),
];

export type Product = {
  id: string;
  slug: string;
  name: string;
  priceFrom: number;
  image: string;
  featured?: boolean;
  detail?: string;
  createdAt: number;
};

export const products: Product[] = [
  {
    id: "raw-vietnamese-straight",
    slug: "raw-vietnamese-straight",
    name: "Raw Vietnamese Straight",
    priceFrom: 260000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[0],
    featured: true,
    detail: '24" • Raw Vietnamese Hair',
    createdAt: 16,
  },
  {
    id: "hd-lace-glueless-wig",
    slug: "hd-lace-glueless-wig",
    name: "HD Lace Glueless Wig",
    priceFrom: 170000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[1],
    featured: true,
    detail: '22" • HD Transparent Lace',
    createdAt: 15,
  },
  {
    id: "613-blonde-frontal-wig",
    slug: "613-blonde-frontal-wig",
    name: "613 Blonde Frontal Wig",
    priceFrom: 650000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[2],
    featured: true,
    detail: '28" • Premium Blonde',
    createdAt: 14,
  },
  {
    id: "ginger-body-wave-wig",
    slug: "ginger-body-wave-wig",
    name: "Ginger Body Wave Wig",
    priceFrom: 260000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[3],
    featured: true,
    detail: '24" • Custom Ginger Color',
    createdAt: 13,
  },
  {
    id: "bone-straight-wig-12",
    slug: "bone-straight-wig",
    name: "Bone Straight Wig",
    priceFrom: 160000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[4],
    featured: true,
    detail: '18" • 100% Virgin Hair',
    createdAt: 12,
  },
  {
    id: "1b30-color-wig",
    slug: "1b30-color-wig",
    name: "1B/30 Color Wig",
    priceFrom: 210000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[5],
    featured: true,
    createdAt: 11,
  },
  {
    id: "deep-wave-wig",
    slug: "deep-wave-wig",
    name: "Deep Wave",
    priceFrom: 175000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[6],
    featured: true,
    detail: '22" • Natural Black',
    createdAt: 10,
  },
  {
    id: "body-wave-wig",
    slug: "body-wave-wig",
    name: "Body Wave Wig",
    priceFrom: 175000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[7],
    featured: true,
    detail: '20" • Shiny Brown',
    createdAt: 9,
  },
  {
    id: "burmese-curly-wig",
    slug: "burmese-curly-wig",
    name: "Burmese Curly Wig",
    priceFrom: 175500,
    image: PRODUCT_IMAGE_PLACEHOLDERS[8],
    createdAt: 8,
  },
  {
    id: "water-wave-wig",
    slug: "water-wave-wig",
    name: "Water Wave Wig",
    priceFrom: 570000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[9],
    createdAt: 7,
  },
  {
    id: "loose-wave-wig",
    slug: "loose-wave-wig",
    name: "Loose Wave Wig",
    priceFrom: 750000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[10],
    createdAt: 6,
  },
  {
    id: "curly-bob",
    slug: "curly-bob",
    name: "Curly Bob Wig",
    priceFrom: 185000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[11],
    createdAt: 5,
  },
  {
    id: "burnt-orange-bouncy-wig",
    slug: "burnt-orange-bouncy-wig",
    name: "Burnt Orange Bouncy Wig",
    priceFrom: 300000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[12],
    createdAt: 4,
  },
  {
    id: "wavy-ombre-blonde",
    slug: "wavy-ombre-blonde",
    name: "Wavy Ombre Blonde",
    priceFrom: 500000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[13],
    createdAt: 3,
  },
  {
    id: "dark-brown-ash-brown-ombre",
    slug: "dark-brown-ash-brown-ombre",
    name: "Dark Brown / Ash Brown Ombre",
    priceFrom: 1000000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[14],
    createdAt: 2,
  },
  {
    id: "piano-bounce-wig",
    slug: "piano-bounce-wig",
    name: "Piano Bounce Wig",
    priceFrom: 2000000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[15],
    createdAt: 1,
  },
];

export type SortOption = "created_at" | "price_asc" | "price_desc";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "created_at", label: "Latest Arrivals" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
];

export function formatProductPrice(priceFrom: number): string {
  return `From ₦${priceFrom.toFixed(2)}`;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function sortProducts(items: Product[], sortBy: SortOption): Product[] {
  const sorted = [...items];

  switch (sortBy) {
    case "price_asc":
      return sorted.sort((a, b) => a.priceFrom - b.priceFrom);

    case "price_desc":
      return sorted.sort((a, b) => b.priceFrom - a.priceFrom);

    default:
      return sorted.sort((a, b) => b.createdAt - a.createdAt);
  }
}
