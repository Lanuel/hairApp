"use client";

import Link from "next/link";
import { formatCurrency } from "@/lib/admin/constants";

type CustomerRow = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  createdAt: Date;
  _count: { orders: number };
  orders: { total: number }[];
};

type CustomerTableProps = {
  customers: CustomerRow[];
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function CustomerTable({ customers }: CustomerTableProps) {
  if (customers.length === 0) {
    return (
      <div className="admin-empty">
        <p className="admin-empty-title">No customers yet</p>
        <p className="admin-empty-desc">
          Customers who create accounts will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Orders</th>
            <th>Total Spent</th>
            <th>Joined</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            const totalSpent = customer.orders.reduce(
              (sum, o) => sum + o.total,
              0
            );
            return (
              <tr key={customer.id}>
                <td>
                  <div className="admin-customer-info">
                    <div className="admin-customer-avatar">
                      {(customer.name ?? customer.email)[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="admin-customer-name">
                        {customer.name ?? "—"}
                      </p>
                      <p className="admin-customer-email">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="admin-table-muted">
                  {customer.phone ?? "—"}
                </td>
                <td>
                  <span className="admin-badge admin-badge-orders">
                    {customer._count.orders}
                  </span>
                </td>
                <td className="admin-table-value">
                  {formatCurrency(totalSpent)}
                </td>
                <td className="admin-table-muted">
                  {formatDate(customer.createdAt)}
                </td>
                <td>
                  <Link
                    href={`/admin/customers/${customer.id}`}
                    className="admin-table-link"
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
