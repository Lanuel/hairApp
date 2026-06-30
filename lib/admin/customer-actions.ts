"use server";

import "server-only";

import { prisma } from "@/lib/prisma";
import { requireAdminAction } from "@/lib/admin/auth";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@/lib/generated/prisma/enums";

// ─── Customer queries ──────────────────────────────────────────────

export async function getAdminCustomers() {
  await requireAdminAction();

  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      _count: { select: { orders: true } },
      orders: {
        select: { total: true },
      },
    },
  });
}

export async function getAdminCustomer(id: string) {
  await requireAdminAction();

  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            select: {
              id: true,
              productName: true,
              productSlug: true,
              imageUrl: true,
              unitPrice: true,
              quantity: true,
              lineTotal: true,
            },
          },
        },
      },
    },
  });
}

export async function getCustomerStats() {
  await requireAdminAction();

  const [total, withOrders, newThisMonth] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { orders: { some: {} } } }),
    prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),
  ]);

  return { total, withOrders, newThisMonth };
}

// ─── Order queries ─────────────────────────────────────────────────

export async function getAdminOrders(limit?: number) {
  await requireAdminAction();

  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    ...(limit ? { take: limit } : {}),
    include: {
      user: { select: { id: true, name: true, email: true } },
      items: true,
    },
  });
}

export async function getOrderStats() {
  await requireAdminAction();

  const [total, pending, revenue] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.aggregate({ _sum: { total: true } }),
  ]);

  return {
    total,
    pending,
    revenue: revenue._sum.total ?? 0,
  };
}

// ─── Order mutations ───────────────────────────────────────────────

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await requireAdminAction();

  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  revalidatePath("/admin/customers");
  revalidatePath(`/admin/customers/${orderId}`);
}
