import type { Metadata } from "next";
import { redirect } from "next/navigation";
import CustomerLoginForm from "@/components/customer/CustomerLoginForm";
import { getCustomerSession } from "@/lib/customer/auth";

export const metadata: Metadata = {
  title: "Sign In | GraceT Hair",
};

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function AccountLoginPage({
  searchParams,
}: LoginPageProps) {
  const session = await getCustomerSession();
  if (session) {
    redirect("/account");
  }

  const { callbackUrl } = await searchParams;

  return (
    <div className="bg-black min-h-screen page-below-nav">
      <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-white font-serif mb-2">Welcome back</h1>
          <p className="text-white/60 text-sm">
            Sign in to manage your account and saved cart.
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/2 p-6 sm:p-8">
          <CustomerLoginForm callbackUrl={callbackUrl ?? "/account"} />
        </div>
      </div>
    </div>
  );
}
