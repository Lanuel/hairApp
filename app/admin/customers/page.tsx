import AdminHeader from "@/components/admin/AdminHeader";
import CustomerTable from "@/components/admin/CustomerTable";
import StatCard from "@/components/admin/StatCard";
import {
  getAdminCustomers,
  getCustomerStats,
} from "@/lib/admin/customer-actions";

export const metadata = {
  title: "Customers | GraceT Admin",
};

export default async function AdminCustomersPage() {
  const [customers, stats] = await Promise.all([
    getAdminCustomers(),
    getCustomerStats(),
  ]);

  return (
    <>
      <AdminHeader
        title="Customers"
        description="Manage customer accounts and view purchase history."
      />

      <div className="admin-stats-grid" style={{ marginBottom: "2rem" }}>
        <StatCard label="Total Customers" value={stats.total} />
        <StatCard
          label="With Orders"
          value={stats.withOrders}
          hint={
            stats.total > 0
              ? `${Math.round((stats.withOrders / stats.total) * 100)}% conversion`
              : undefined
          }
        />
        <StatCard
          label="New This Month"
          value={stats.newThisMonth}
        />
      </div>

      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2 className="admin-panel-title">All Customers</h2>
          <p className="admin-panel-desc">
            {customers.length} account{customers.length !== 1 ? "s" : ""} registered
          </p>
        </div>
        <CustomerTable customers={customers} />
      </div>
    </>
  );
}
