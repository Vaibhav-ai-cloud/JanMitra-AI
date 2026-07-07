"use client";

import { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserCog,
  Building2,
  BookOpen,
  FileText,
  FileBarChart,
  BarChart3,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
  Bell,
} from "lucide-react";
import { cn } from "../../../utils/auth";

// ── Sidebar Context ────────────────────────────────────────────────────────────

interface AdminSidebarContextValue {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (v: boolean) => void;
}

export const AdminSidebarContext = createContext<AdminSidebarContextValue>({
  isCollapsed: false,
  setIsCollapsed: () => {},
  isMobileOpen: false,
  setIsMobileOpen: () => {},
});

export function useAdminSidebar() {
  return useContext(AdminSidebarContext);
}

// ── Nav Items ──────────────────────────────────────────────────────────────────

const navItems = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    group: "Management",
    items: [
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "MPs", href: "/admin/mps", icon: UserCheck },
      { label: "Citizens", href: "/admin/citizens", icon: UserCog },
      { label: "Departments", href: "/admin/departments", icon: Building2 },
    ],
  },
  {
    group: "Content",
    items: [
      { label: "Schemes", href: "/admin/schemes", icon: BookOpen },
      { label: "Complaints", href: "/admin/complaints", icon: FileText },
      { label: "Reports", href: "/admin/reports", icon: FileBarChart },
    ],
  },
  {
    group: "Account",
    items: [
      { label: "Profile", href: "/admin/profile", icon: User },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

interface AdminSidebarProps {
  unreadCount?: number;
  adminName?: string;
  adminRole?: string;
}

export default function AdminSidebar({
  unreadCount = 0,
  adminName = "Sanjay Mehta",
  adminRole = "Super Admin",
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useAdminSidebar();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 72 : 260 }}
        transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col",
          "border-r border-white/[0.06] bg-slate-950/95 backdrop-blur-2xl",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        aria-label="Admin navigation"
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-white/[0.06]">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2.5"
                  aria-label="JanMitra Admin Dashboard"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30">
                    <Shield size={14} className="text-white" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold tracking-tight text-white leading-none">
                      Jan<span className="text-cyan-400">Mitra</span>
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">Admin Portal</p>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {isCollapsed && (
            <Link
              href="/admin/dashboard"
              className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400"
              aria-label="Admin Dashboard"
            >
              <Shield size={14} className="text-white" aria-hidden />
            </Link>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "hidden lg:flex h-7 w-7 items-center justify-center rounded-lg",
              "text-slate-500 hover:text-white hover:bg-white/10 transition-colors",
              isCollapsed && "mx-auto"
            )}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Admin Identity */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-b border-white/[0.06] px-4 py-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 text-sm font-bold text-blue-400">
                  {adminName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{adminName}</p>
                  <p className="text-[11px] text-cyan-500 truncate">{adminRole}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5" aria-label="Sidebar navigation">
          {navItems.map((group) => (
            <div key={group.group}>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600"
                  >
                    {group.group}
                  </motion.p>
                )}
              </AnimatePresence>

              <ul className="space-y-0.5" role="list">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  const showBadge = item.label === "Notifications" && unreadCount > 0;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group relative flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all duration-150",
                          active
                            ? "bg-blue-500/15 text-blue-400"
                            : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                        )}
                      >
                        {active && (
                          <motion.div
                            layoutId="adminActiveNav"
                            className="absolute inset-0 rounded-xl bg-blue-500/15"
                            transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                          />
                        )}

                        <div className="relative z-10 shrink-0">
                          <Icon
                            size={18}
                            className={cn(active ? "text-blue-400" : "text-slate-500 group-hover:text-white")}
                            aria-hidden
                          />
                          {showBadge && (
                            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                              {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                          )}
                        </div>

                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -6 }}
                              className="relative z-10 flex-1 truncate"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {isCollapsed && (
                          <div className="pointer-events-none absolute left-full ml-3 hidden rounded-lg border border-white/[0.08] bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-xl group-hover:flex whitespace-nowrap">
                            {item.label}
                          </div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* System status + Sign out */}
        <div className="shrink-0 border-t border-white/[0.06] p-3 space-y-2">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] p-3"
            >
              <Bell size={14} className="text-emerald-400 shrink-0" aria-hidden />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-emerald-300">System Online</p>
                <p className="text-[10px] text-slate-500 truncate">Uptime 99.7% · All systems normal</p>
              </div>
            </motion.div>
          )}

          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
              "text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors",
              isCollapsed && "justify-center"
            )}
            aria-label="Sign out"
          >
            <LogOut size={16} aria-hidden />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
