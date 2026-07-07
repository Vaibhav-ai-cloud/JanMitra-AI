"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MpSidebar, { MpSidebarContext } from "../../components/mp/layout/MpSidebar";
import MpNavbar from "../../components/mp/layout/MpNavbar";
import { mockMpNotifications, mockMpProfile } from "../../lib/mpMockData";
import AuthGuard from "../../components/auth/AuthGuard";

export default function MpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const unreadCount = mockMpNotifications.filter((n) => !n.isRead).length;

  return (
    <AuthGuard requiredRole="mp">
      <MpSidebarContext.Provider
        value={{ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }}
      >
        <div className="min-h-screen bg-[#080e1c]">
          {/* Sidebar */}
          <MpSidebar
            unreadCount={unreadCount}
            mpName={mockMpProfile.name}
            constituency={mockMpProfile.constituency}
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
            <MpNavbar
              notifications={mockMpNotifications}
              mpName={mockMpProfile.name}
              constituency={mockMpProfile.constituency}
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
      </MpSidebarContext.Provider>
    </AuthGuard>
  );
}
