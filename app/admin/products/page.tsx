import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductTable from "@/components/admin/ProductTable";
import { getAdminProducts } from "@/lib/admin/actions";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <>
      <AdminHeader
        title="Products"
        description="Manage your wig catalog, pricing, inventory, and featured items."
        action={
          <Link href="/admin/products/new" className="admin-btn admin-btn-primary">
            New product
          </Link>
        }
      />

      <ProductTable products={products} />
    </>
  );
}
