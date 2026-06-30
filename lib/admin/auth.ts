import "server-only";

import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function getAdminSession() {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    return null;
  }

  return session;
}

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function requireAdminAction() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}
