import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import {
  getDashboardStats,
  getRecentProducts,
} from "@/lib/admin/actions";
import { formatCurrency } from "@/lib/admin/constants";

export default async function AdminDashboardPage() {
  const [stats, recentProducts] = await Promise.all([
    getDashboardStats(),
    getRecentProducts(),
  ]);

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Overview of your catalog, inventory, and recently added products."
        action={
          <Link href="/admin/products/new" className="admin-btn admin-btn-primary">
            Add product
          </Link>
        }
      />

      <div className="admin-stats-grid">
        <StatCard label="Total products" value={stats.totalProducts} />
        <StatCard label="Featured" value={stats.featuredProducts} />
        <StatCard label="In stock" value={stats.inStockProducts} />
        <StatCard
          label="Low stock"
          value={stats.lowStockProducts}
          hint="Products with 5 or fewer units"
        />
      </div>

      <section className="admin-panel">
        <h2 className="admin-panel-title">Recently added</h2>

        {recentProducts.length === 0 ? (
          <p className="admin-description">No products in the database yet.</p>
        ) : (
          <div className="admin-recent-list">
            {recentProducts.map((product) => (
              <div key={product.id} className="admin-recent-item">
                <div>
                  <p className="admin-product-name">{product.name}</p>
                  <p className="admin-product-slug">
                    {product.category} · {formatCurrency(product.price)}
                  </p>
                </div>
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="admin-btn admin-btn-secondary"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
