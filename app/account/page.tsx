import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AccountProfileForm from "@/components/customer/AccountProfileForm";
import { requireCustomer } from "@/lib/customer/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "My Account | GraceT Hair",
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await requireCustomer();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/account/login");
  }

  return (
    <div className="bg-black min-h-screen page-below-nav">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 pb-16">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl text-white font-serif mb-2">
            My Account
          </h1>
          <p className="text-white/60">
            Manage your profile and account settings.
          </p>
        </div>

        <AccountProfileForm
          name={user.name ?? ""}
          email={user.email}
          phone={user.phone}
        />

        <section className="mt-10 rounded-lg border border-white/10 bg-white/[0.02] p-6">
          <h2 className="text-lg text-white mb-2">Orders</h2>
          <p className="text-white/60 text-sm mb-4">
            Order history will appear here once checkout is enabled.
          </p>
          <Link
            href="/store"
            className="text-sm text-gold hover:underline"
          >
            Continue shopping
          </Link>
        </section>
      </div>
    </div>
  );
}
