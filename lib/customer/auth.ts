import "server-only";

import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function getCustomerSession() {
  const session = await auth();

  if (session?.user?.role !== "customer") {
    return null;
  }

  return session;
}

export async function requireCustomer() {
  const session = await getCustomerSession();

  if (!session) {
    redirect("/account/login");
  }

  return session;
}

export async function requireCustomerAction() {
  const session = await getCustomerSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}
