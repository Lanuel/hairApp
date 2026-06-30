import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ExternalLink,
  Scissors,
  LogOut,
} from "lucide-react";
import { adminLogout } from "@/lib/admin/auth-actions";
import { ADMIN_NAV } from "@/lib/admin/constants";

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  package: Package,
} as const;

type AdminSidebarProps = {
  adminName: string;
  currentPath: string;
};

export default function AdminSidebar({
  adminName,
  currentPath,
}: AdminSidebarProps) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <Scissors className="admin-brand-icon" size={20} />
        <div>
          <p className="admin-brand-title">GraceT Admin</p>
          <p className="admin-brand-sub">Store management</p>
        </div>
      </div>

      <nav className="admin-nav">
        {ADMIN_NAV.map((item) => {
          const Icon = iconMap[item.icon];
          const active =
            currentPath === item.href ||
            (item.href !== "/admin/dashboard" &&
              currentPath.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link${active ? " is-active" : ""}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-user">
          <p className="admin-user-label">Signed in as</p>
          <p className="admin-user-name">{adminName}</p>
        </div>
        <Link href="/" className="admin-nav-link">
          <ExternalLink size={18} />
          <span>View storefront</span>
        </Link>
        <form action={adminLogout}>
          <button type="submit" className="admin-nav-link admin-nav-button">
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
