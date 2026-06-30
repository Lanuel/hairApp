"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ExternalLink,
  Scissors,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { adminLogout } from "@/lib/admin/auth-actions";
import { ADMIN_NAV } from "@/lib/admin/constants";

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  package: Package,
} as const;

type AdminSidebarProps = {
  adminName: string;
};

export default function AdminSidebar({ adminName }: AdminSidebarProps) {
  const currentPath = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [currentPath]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const navLinks = ADMIN_NAV.map((item) => {
    const Icon = iconMap[item.icon];
    const active =
      currentPath === item.href ||
      (item.href !== "/admin/dashboard" && currentPath.startsWith(item.href));

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setDrawerOpen(false)}
        className={`admin-nav-link${active ? " is-active" : ""}`}
      >
        <Icon size={18} />
        <span>{item.label}</span>
      </Link>
    );
  });

  const footerContent = (
    <div className="admin-sidebar-footer">
      <div className="admin-user">
        <p className="admin-user-label">Signed in as</p>
        <p className="admin-user-name">{adminName}</p>
      </div>
      <Link
        href="/"
        onClick={() => setDrawerOpen(false)}
        className="admin-nav-link"
      >
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
  );

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="admin-sidebar admin-sidebar-desktop">
        <div className="admin-brand">
          <Scissors className="admin-brand-icon" size={20} />
          <div>
            <p className="admin-brand-title">GraceT Admin</p>
            <p className="admin-brand-sub">Store management</p>
          </div>
        </div>
        <nav className="admin-nav">{navLinks}</nav>
        {footerContent}
      </aside>

      {/* ── MOBILE TOP BAR ── */}
      <header className="admin-mobile-topbar">
        <button
          className="admin-mobile-menu-btn"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <div className="admin-brand">
          <Scissors className="admin-brand-icon" size={18} />
          <p className="admin-brand-title">GraceT Admin</p>
        </div>
        {/* spacer to balance the hamburger button */}
        <div style={{ width: 40 }} aria-hidden="true" />
      </header>

      {/* ── OVERLAY ── */}
      {drawerOpen && (
        <div
          className="admin-drawer-overlay"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      <aside
        className={`admin-drawer${drawerOpen ? " is-open" : ""}`}
        aria-label="Navigation menu"
      >
        <div className="admin-drawer-header">
          <div className="admin-brand">
            <Scissors className="admin-brand-icon" size={18} />
            <div>
              <p className="admin-brand-title">GraceT Admin</p>
              <p className="admin-brand-sub">Store management</p>
            </div>
          </div>
          <button
            className="admin-drawer-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="admin-nav">{navLinks}</nav>
        {footerContent}
      </aside>
    </>
  );
}
