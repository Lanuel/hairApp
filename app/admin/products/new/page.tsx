import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <>
      <AdminHeader
        title="New product"
        description="Add a new item to your PostgreSQL-backed catalog."
      />
      <ProductForm />
    </>
  );
}
