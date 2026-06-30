export const PRODUCT_CATEGORIES = [
  "Wigs",
  "Frontals",
  "Closures",
  "Bundles",
  "Custom Orders",
] as const;

export const HAIR_TYPES = [
  "Virgin Hair",
  "Raw Hair",
  "Remy Hair",
  "Synthetic Blend",
] as const;

export const HAIR_TEXTURES = [
  "Straight",
  "Body Wave",
  "Deep Wave",
  "Loose Wave",
  "Water Wave",
  "Curly",
  "Kinky Curly",
  "Bob",
] as const;

export const HAIR_LENGTHS = [
  '12"',
  '14"',
  '16"',
  '18"',
  '20"',
  '22"',
  '24"',
  '26"',
  '28"',
  '30"',
] as const;

export const HAIR_COLORS = [
  "Natural Black",
  "1B",
  "613 Blonde",
  "Ginger",
  "Brown",
  "Ombre",
  "Custom Color",
] as const;

export const ADMIN_NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { href: "/admin/products", label: "Products", icon: "package" },
] as const;

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
