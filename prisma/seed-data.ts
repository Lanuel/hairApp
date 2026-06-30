export const PRODUCT_IMAGE_PLACEHOLDERS = [
  "/store_hair.webp",
  "/store_hair02.webp",
  ...Array.from({ length: 14 }, (_, i) => `/store_hair${i + 3}.webp`),
];

export type SeedProduct = {
  slug: string;
  name: string;
  priceFrom: number;
  image: string;
  featured?: boolean;
  detail?: string;
};

export const seedProducts: SeedProduct[] = [
  {
    slug: "raw-vietnamese-straight",
    name: "Raw Vietnamese Straight",
    priceFrom: 260000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[0],
    featured: true,
    detail: '24" • Raw Vietnamese Hair',
  },
  {
    slug: "hd-lace-glueless-wig",
    name: "HD Lace Glueless Wig",
    priceFrom: 170000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[1],
    featured: true,
    detail: '22" • HD Transparent Lace',
  },
  {
    slug: "613-blonde-frontal-wig",
    name: "613 Blonde Frontal Wig",
    priceFrom: 650000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[2],
    featured: true,
    detail: '28" • Premium Blonde',
  },
  {
    slug: "ginger-body-wave-wig",
    name: "Ginger Body Wave Wig",
    priceFrom: 260000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[3],
    featured: true,
    detail: '24" • Custom Ginger Color',
  },
  {
    slug: "bone-straight-wig",
    name: "Bone Straight Wig",
    priceFrom: 160000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[4],
    featured: true,
    detail: '18" • 100% Virgin Hair',
  },
  {
    slug: "1b30-color-wig",
    name: "1B/30 Color Wig",
    priceFrom: 210000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[5],
    featured: true,
  },
  {
    slug: "deep-wave-wig",
    name: "Deep Wave",
    priceFrom: 175000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[6],
    featured: true,
    detail: '22" • Natural Black',
  },
  {
    slug: "body-wave-wig",
    name: "Body Wave Wig",
    priceFrom: 175000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[7],
    featured: true,
    detail: '20" • Shiny Brown',
  },
  {
    slug: "burmese-curly-wig",
    name: "Burmese Curly Wig",
    priceFrom: 175500,
    image: PRODUCT_IMAGE_PLACEHOLDERS[8],
  },
  {
    slug: "water-wave-wig",
    name: "Water Wave Wig",
    priceFrom: 570000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[9],
  },
  {
    slug: "loose-wave-wig",
    name: "Loose Wave Wig",
    priceFrom: 750000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[10],
  },
  {
    slug: "curly-bob",
    name: "Curly Bob Wig",
    priceFrom: 185000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[11],
  },
  {
    slug: "burnt-orange-bouncy-wig",
    name: "Burnt Orange Bouncy Wig",
    priceFrom: 300000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[12],
  },
  {
    slug: "wavy-ombre-blonde",
    name: "Wavy Ombre Blonde",
    priceFrom: 500000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[13],
  },
  {
    slug: "dark-brown-ash-brown-ombre",
    name: "Dark Brown / Ash Brown Ombre",
    priceFrom: 1000000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[14],
  },
  {
    slug: "piano-bounce-wig",
    name: "Piano Bounce Wig",
    priceFrom: 2000000,
    image: PRODUCT_IMAGE_PLACEHOLDERS[15],
  },
];
