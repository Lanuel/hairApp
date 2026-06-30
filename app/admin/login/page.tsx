import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/admin/auth";

type AdminLoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

function getSafeCallbackUrl(value?: string) {
  if (!value) return "/admin/dashboard";
  if (!value.startsWith("/admin") || value.startsWith("/admin/login")) {
    return "/admin/dashboard";
  }

  return value;
}

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  const { callbackUrl } = await searchParams;

  return (
    <div className="admin-login-panel">
      <div className="admin-login-brand">
        <p className="admin-brand-title">GraceT Admin</p>
        <h1 className="admin-login-title">Sign in</h1>
        <p className="admin-description">Authorized store management access.</p>
      </div>
      <AdminLoginForm callbackUrl={getSafeCallbackUrl(callbackUrl)} />
    </div>
  );
}
