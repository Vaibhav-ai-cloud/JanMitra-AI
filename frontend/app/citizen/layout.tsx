"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CitizenSidebar, { SidebarContext } from "../../components/citizen/layout/CitizenSidebar";
import CitizenNavbar from "../../components/citizen/layout/CitizenNavbar";
import { mockNotifications } from "../../lib/mockData";
import AuthGuard from "../../components/auth/AuthGuard";

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  return (
    <AuthGuard requiredRole="citizen">
      <SidebarContext.Provider
        value={{ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }}
      >
        <div className="min-h-screen bg-[#080e1c]">
          {/* Sidebar */}
          <CitizenSidebar unreadCount={unreadCount} />

          {/* Main area — shifts right when sidebar expands */}
          <motion.div
            animate={{ marginLeft: isCollapsed ? 72 : 260 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="flex min-h-screen flex-col"
            // On mobile the sidebar is an overlay so no margin shift needed
            style={{ marginLeft: 0 }}
          >
            {/* Re-apply via motion so it works on desktop only */}
            <div className="hidden lg:contents">
              {/* marker div — actual shift handled by motion.div above */}
            </div>

            {/* Navbar */}
            <CitizenNavbar
              notifications={mockNotifications}
              userName="Rahul Kumar"
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
      </SidebarContext.Provider>
    </AuthGuard>
  );
}
