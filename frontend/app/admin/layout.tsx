"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AdminSidebar, { AdminSidebarContext } from "../../components/admin/layout/AdminSidebar";
import AdminNavbar from "../../components/admin/layout/AdminNavbar";
import { mockAdminNotifications, mockAdminProfile } from "../../lib/adminMockData";
import AuthGuard from "../../components/auth/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const unreadCount = mockAdminNotifications.filter((n) => !n.isRead).length;

  return (
    <AuthGuard requiredRole="admin">
      <AdminSidebarContext.Provider
        value={{ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }}
      >
        <div className="min-h-screen bg-[#080e1c]">
          {/* Sidebar */}
          <AdminSidebar
            unreadCount={unreadCount}
            adminName={mockAdminProfile.name}
            adminRole="Super Admin"
          />

          {/* Main area */}
          <motion.div
            animate={{ marginLeft: isCollapsed ? 72 : 260 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="flex min-h-screen flex-col"
            style={{ marginLeft: 0 }}
          >
            <div className="hidden lg:contents" />

            {/* Navbar */}
            <AdminNavbar
              notifications={mockAdminNotifications}
              adminName={mockAdminProfile.name}
              adminRole="Super Admin"
            />

            {/* Page content */}
            <main
              id="main-content"
              tabIndex={-1}
              className="flex-1 px-4 py-6 sm:px-6 lg:px-8"
            >
              {children}
            </main>
          </motion.div>
        </div>
      </AdminSidebarContext.Provider>
    </AuthGuard>
  );
}
