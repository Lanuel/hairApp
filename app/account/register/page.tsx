import type { Metadata } from "next";
import { redirect } from "next/navigation";
import CustomerRegisterForm from "@/components/customer/CustomerRegisterForm";
import { getCustomerSession } from "@/lib/customer/auth";

export const metadata: Metadata = {
  title: "Create Account | GraceT Hair",
};

export default async function AccountRegisterPage() {
  const session = await getCustomerSession();
  if (session) {
    redirect("/account");
  }

  return (
    <div className="bg-black min-h-screen page-below-nav">
      <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-white font-serif mb-2">
            Create your account
          </h1>
          <p className="text-white/60 text-sm">
            Save your cart, track orders, and checkout faster.
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <CustomerRegisterForm />
        </div>
      </div>
    </div>
  );
}
