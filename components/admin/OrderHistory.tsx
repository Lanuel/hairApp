"use client";

import { useState, useTransition } from "react";
import { OrderStatus } from "@/lib/generated/prisma/enums";
import { updateOrderStatus } from "@/lib/admin/customer-actions";
import { ORDER_STATUS_LABELS } from "@/lib/admin/constants";
import { formatCurrency } from "@/lib/admin/constants";
import Image from "next/image";

type OrderItem = {
  id: string;
  productName: string;
  productSlug: string;
  imageUrl: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

type Order = {
  id: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  notes: string | null;
  createdAt: Date;
  items: OrderItem[];
};

type OrderHistoryProps = {
  orders: Order[];
};

const STATUS_CSS: Record<string, string> = {
  PENDING: "admin-badge-status-pending",
  CONFIRMED: "admin-badge-status-confirmed",
  PROCESSING: "admin-badge-status-processing",
  SHIPPED: "admin-badge-status-shipped",
  DELIVERED: "admin-badge-status-delivered",
  CANCELLED: "admin-badge-status-cancelled",
  REFUNDED: "admin-badge-status-refunded",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function OrderRow({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(newStatus: OrderStatus) {
    setStatus(newStatus);
    startTransition(() => updateOrderStatus(order.id, newStatus));
  }

  return (
    <div className="admin-order-card">
      <button
        className="admin-order-header"
        onClick={() => setExpanded((p) => !p)}
        aria-expanded={expanded}
      >
        <div className="admin-order-meta">
          <span className="admin-order-id">#{order.id.slice(-8).toUpperCase()}</span>
          <span className="admin-table-muted">{formatDate(order.createdAt)}</span>
        </div>
        <div className="admin-order-summary">
          <span className={`admin-badge-status ${STATUS_CSS[status]}`}>
            {ORDER_STATUS_LABELS[status]}
          </span>
          <span className="admin-order-total">{formatCurrency(order.total)}</span>
          <span className={`admin-order-chevron ${expanded ? "is-open" : ""}`}>
            &#8964;
          </span>
        </div>
      </button>

      {expanded && (
        <div className="admin-order-body">
          <div className="admin-order-items">
            {order.items.map((item) => (
              <div key={item.id} className="admin-order-item">
                {item.imageUrl ? (
                  <div className="admin-order-item-img">
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      width={48}
                      height={48}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div className="admin-order-item-img admin-order-item-img-placeholder" />
                )}
                <div className="admin-order-item-info">
                  <p className="admin-order-item-name">{item.productName}</p>
                  <p className="admin-table-muted">
                    {item.quantity} × {formatCurrency(item.unitPrice)}
                  </p>
                </div>
                <span className="admin-order-item-total">
                  {formatCurrency(item.lineTotal)}
                </span>
              </div>
            ))}
          </div>

          <div className="admin-order-footer">
            <div className="admin-order-status-update">
              <label className="admin-field-label">Update Status</label>
              <select
                className="admin-select"
                value={status}
                disabled={isPending}
                onChange={(e) =>
                  handleStatusChange(e.target.value as OrderStatus)
                }
              >
                {Object.entries(ORDER_STATUS_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            {order.notes && (
              <div className="admin-order-notes">
                <p className="admin-field-label">Notes</p>
                <p className="admin-table-muted">{order.notes}</p>
              </div>
            )}
            <div className="admin-order-totals">
              <div className="admin-order-total-row">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="admin-order-total-row admin-order-total-final">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderHistory({ orders }: OrderHistoryProps) {
  if (orders.length === 0) {
    return (
      <div className="admin-empty">
        <p className="admin-empty-title">No orders yet</p>
        <p className="admin-empty-desc">
          This customer hasn&apos;t placed any orders.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-order-list">
      {orders.map((order) => (
        <OrderRow key={order.id} order={order} />
      ))}
    </div>
  );
}
