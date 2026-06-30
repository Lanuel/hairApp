export type CartLineItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  inStock: boolean;
  stock: number;
};

export type CartSummary = {
  items: CartLineItem[];
  itemCount: number;
  subtotal: number;
};
