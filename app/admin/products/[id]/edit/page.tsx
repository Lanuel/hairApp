import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";
import { getAdminProduct } from "@/lib/admin/actions";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getAdminProduct(id);

  if (!product) notFound();

  return (
    <>
      <AdminHeader
        title="Edit product"
        description={`Update details for ${product.name}.`}
      />
      <ProductForm product={product} />
    </>
  );
}
