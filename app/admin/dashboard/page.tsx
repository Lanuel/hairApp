import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import {
  getDashboardStats,
  getRecentProducts,
} from "@/lib/admin/actions";
import { formatCurrency } from "@/lib/admin/constants";
import {
  getCustomerStats,
  getOrderStats,
} from "@/lib/admin/customer-actions";

export default async function AdminDashboardPage() {
  const [stats, recentProducts, customerStats, orderStats] = await Promise.all([
    getDashboardStats(),
    getRecentProducts(),
    getCustomerStats(),
    getOrderStats(),
  ]);

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Overview of your store — products, customers, and orders at a glance."
        action={
          <Link href="/admin/products/new" className="admin-btn admin-btn-primary">
            Add product
          </Link>
        }
      />

      <div className="admin-dashboard-section-label">Products</div>
      <div className="admin-stats-grid">
        <StatCard label="Total products" value={stats.totalProducts} />
        <StatCard label="Featured" value={stats.featuredProducts} />
        <StatCard label="In stock" value={stats.inStockProducts} />
        <StatCard
          label="Low stock"
          value={stats.lowStockProducts}
          hint="5 or fewer units remaining"
        />
      </div>

      <div className="admin-dashboard-section-label">Customers & Orders</div>
      <div className="admin-stats-grid">
        <StatCard label="Total customers" value={customerStats.total} />
        <StatCard
          label="Customers with orders"
          value={customerStats.withOrders}
          hint={
            customerStats.total > 0
              ? `${Math.round((customerStats.withOrders / customerStats.total) * 100)}% conversion`
              : undefined
          }
        />
        <StatCard label="Total orders" value={orderStats.total} />
        <StatCard
          label="Total revenue"
          value={formatCurrency(orderStats.revenue)}
          hint={`${orderStats.pending} pending`}
        />
      </div>

      <div className="admin-dashboard-panels">
        <section className="admin-panel">
          <div className="admin-panel-header">
            <h2 className="admin-panel-title">Recently added products</h2>
            <Link href="/admin/products" className="admin-panel-link">
              View all →
            </Link>
          </div>

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
      </div>
    </>
  );
}
