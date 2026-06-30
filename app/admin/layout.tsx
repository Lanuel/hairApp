import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAdminSession } from "@/lib/admin/auth";
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
  const session = await getAdminSession();

  // Unauthenticated users only see the login page content (no sidebar shell)
  if (!session) {
    return <main className="admin-login-shell">{children}</main>;
  }

  return (
    <div className="admin-shell">
      <AdminSidebar
        adminName={session.user.username ?? session.user.name ?? "Admin"}
      />
      <main className="admin-main">{children}</main>
    </div>
  );
}
