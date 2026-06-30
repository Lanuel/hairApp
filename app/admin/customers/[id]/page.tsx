import { notFound } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import OrderHistory from "@/components/admin/OrderHistory";
import { getAdminCustomer } from "@/lib/admin/customer-actions";
import { formatCurrency } from "@/lib/admin/constants";

type Props = {
  params: Promise<{ id: string }>;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const customer = await getAdminCustomer(id);
  return {
    title: customer
      ? `${customer.name ?? customer.email} | GraceT Admin`
      : "Customer | GraceT Admin",
  };
}

export default async function AdminCustomerDetailPage({ params }: Props) {
  const { id } = await params;
  const customer = await getAdminCustomer(id);

  if (!customer) notFound();

  const totalSpent = customer.orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = customer.orders.length;

  return (
    <>
      <AdminHeader
        title={customer.name ?? customer.email}
        description={customer.email}
        action={
          <Link href="/admin/customers" className="admin-btn admin-btn-secondary">
            ← Back to Customers
          </Link>
        }
      />

      <div className="admin-customer-detail-grid">
        {/* Left: Profile card */}
        <div className="admin-panel admin-customer-profile-card">
          <div className="admin-panel-header">
            <h2 className="admin-panel-title">Profile</h2>
          </div>

          <div className="admin-customer-avatar-lg">
            {(customer.name ?? customer.email)[0].toUpperCase()}
          </div>

          <dl className="admin-customer-profile-dl">
            <div className="admin-customer-profile-row">
              <dt>Full Name</dt>
              <dd>{customer.name ?? "—"}</dd>
            </div>
            <div className="admin-customer-profile-row">
              <dt>Email</dt>
              <dd>{customer.email}</dd>
            </div>
            <div className="admin-customer-profile-row">
              <dt>Phone</dt>
              <dd>{customer.phone ?? "—"}</dd>
            </div>
            <div className="admin-customer-profile-row">
              <dt>Joined</dt>
              <dd>{formatDate(customer.createdAt)}</dd>
            </div>
            <div className="admin-customer-profile-row">
              <dt>Last Updated</dt>
              <dd>{formatDate(customer.updatedAt)}</dd>
            </div>
          </dl>

          <div className="admin-customer-spend-summary">
            <div className="admin-customer-spend-item">
              <span className="admin-stat-value">{totalOrders}</span>
              <span className="admin-stat-label">Orders</span>
            </div>
            <div className="admin-customer-spend-divider" />
            <div className="admin-customer-spend-item">
              <span className="admin-stat-value">{formatCurrency(totalSpent)}</span>
              <span className="admin-stat-label">Total Spent</span>
            </div>
          </div>
        </div>

        {/* Right: Order history */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2 className="admin-panel-title">Order History</h2>
            <p className="admin-panel-desc">
              {totalOrders} order{totalOrders !== 1 ? "s" : ""} placed
            </p>
          </div>
          <OrderHistory orders={customer.orders} />
        </div>
      </div>
    </>
  );
}
