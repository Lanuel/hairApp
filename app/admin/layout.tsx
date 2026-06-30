import { headers } from "next/headers";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { requireAdmin } from "@/lib/admin/auth";
import "./admin.css";

export const metadata = {
  title: "Admin | GraceT Hair",
  description: "Manage products and store inventory.",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/admin/dashboard";
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <main className="admin-login-shell">{children}</main>;
  }

  const session = await requireAdmin();

  return (
    <div className="admin-shell">
      <AdminSidebar
        adminName={session.user.username ?? session.user.name ?? "Admin"}
        currentPath={pathname}
      />
      <main className="admin-main">{children}</main>
    </div>
  );
}
