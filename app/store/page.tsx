import StoreProductList from "@/components/StoreProductList";
import { getProducts } from "@/lib/products.server";

export const dynamic = "force-dynamic";

export default async function StorePage() {
  const products = await getProducts();

  return (
    <div className="bg-black min-h-screen page-below-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 pb-16">
        <StoreProductList products={products} />
      </div>
    </div>
  );
}
