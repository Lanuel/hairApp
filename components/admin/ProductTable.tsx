import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import { formatCurrency } from "@/lib/admin/constants";

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  featured: boolean;
  inStock: boolean;
  images: { url: string }[];
};

type ProductTableProps = {
  products: ProductRow[];
};

export default function ProductTable({ products }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="admin-empty">
        <p>No products yet.</p>
        <Link href="/admin/products/new" className="admin-btn admin-btn-primary">
          Add your first product
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const image = product.images[0]?.url;

            return (
              <tr key={product.id}>
                <td>
                  <div className="admin-product-cell">
                    {image ? (
                      <Image
                        src={image}
                        alt={product.name}
                        width={48}
                        height={60}
                        className="admin-product-thumb"
                      />
                    ) : (
                      <div className="admin-product-thumb admin-product-thumb-empty" />
                    )}
                    <div>
                      <p className="admin-product-name">{product.name}</p>
                      <p className="admin-product-slug">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>
                  <div className="admin-price-cell">
                    <span>{formatCurrency(product.price)}</span>
                    {product.discountPrice ? (
                      <span className="admin-price-discount">
                        {formatCurrency(product.discountPrice)}
                      </span>
                    ) : null}
                  </div>
                </td>
                <td>{product.stock}</td>
                <td>
                  <div className="admin-badge-row">
                    {product.featured ? (
                      <span className="admin-badge admin-badge-gold">Featured</span>
                    ) : null}
                    <span
                      className={`admin-badge ${
                        product.inStock ? "admin-badge-success" : "admin-badge-muted"
                      }`}
                    >
                      {product.inStock ? "In stock" : "Out of stock"}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="admin-row-actions">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="admin-icon-btn"
                      aria-label={`Edit ${product.name}`}
                    >
                      <Pencil size={16} />
                    </Link>
                    <DeleteProductButton
                      productId={product.id}
                      productName={product.name}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
