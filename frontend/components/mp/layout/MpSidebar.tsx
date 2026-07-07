"use client";

import { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Briefcase,
  FileBarChart,
  Users,
  BookOpen,
  Map,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Landmark,
  Bell,
} from "lucide-react";
import { cn } from "../../../utils/auth";

// ── Sidebar Context ────────────────────────────────────────────────────────────

interface MpSidebarContextValue {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (v: boolean) => void;
}

export const MpSidebarContext = createContext<MpSidebarContextValue>({
  isCollapsed: false,
  setIsCollapsed: () => {},
  isMobileOpen: false,
  setIsMobileOpen: () => {},
});

export function useMpSidebar() {
  return useContext(MpSidebarContext);
}

// ── Nav Items ──────────────────────────────────────────────────────────────────

const navItems = [
  {
    group: "Main",
    items: [
      { label: "Dashboard", href: "/mp/dashboard", icon: LayoutDashboard },
      { label: "Analytics", href: "/mp/analytics", icon: BarChart3 },
    ],
  },
  {
    group: "Constituency",
    items: [
      { label: "Complaints", href: "/mp/complaints", icon: FileText },
      { label: "Projects", href: "/mp/projects", icon: Briefcase },
      { label: "Schemes", href: "/mp/schemes", icon: BookOpen },
      { label: "Citizens", href: "/mp/citizens", icon: Users },
      { label: "Map View", href: "/mp/map", icon: Map },
    ],
  },
  {
    group: "Reports",
    items: [
      { label: "Reports", href: "/mp/reports", icon: FileBarChart },
    ],
  },
  {
    group: "Account",
    items: [
      { label: "Profile", href: "/mp/profile", icon: User },
      { label: "Settings", href: "/mp/settings", icon: Settings },
    ],
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

interface MpSidebarProps {
  unreadCount?: number;
  mpName?: string;
  constituency?: string;
}

export default function MpSidebar({
  unreadCount = 0,
  mpName = "Arvind Sharma",
  constituency = "Lucknow",
}: MpSidebarProps) {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useMpSidebar();

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
        aria-label="MP navigation"
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
                  href="/mp/dashboard"
                  className="flex items-center gap-2.5"
                  aria-label="JanMitra MP Dashboard"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-400 shadow-lg shadow-violet-500/30">
                    <Landmark size={14} className="text-white" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold tracking-tight text-white leading-none">
                      Jan<span className="text-violet-400">Mitra</span>
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">MP Portal</p>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {isCollapsed && (
            <Link
              href="/mp/dashboard"
              className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-400"
              aria-label="MP Dashboard"
            >
              <Landmark size={14} className="text-white" aria-hidden />
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

        {/* MP Identity (expanded only) */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-b border-white/[0.06] px-4 py-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 text-sm font-bold text-violet-400">
                  {mpName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{mpName}</p>
                  <p className="text-[11px] text-slate-500 truncate">MP, {constituency}</p>
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
                  const showBell = item.label === "Notifications" && unreadCount > 0;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group relative flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all duration-150",
                          active
                            ? "bg-violet-500/15 text-violet-400"
                            : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                        )}
                      >
                        {active && (
                          <motion.div
                            layoutId="mpActiveNav"
                            className="absolute inset-0 rounded-xl bg-violet-500/15"
                            transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                          />
                        )}

                        <div className="relative z-10 shrink-0">
                          <Icon
                            size={18}
                            className={cn(active ? "text-violet-400" : "text-slate-500 group-hover:text-white")}
                            aria-hidden
                          />
                          {showBell && (
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

        {/* Parliament session badge + Sign out */}
        <div className="shrink-0 border-t border-white/[0.06] p-3 space-y-2">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2.5 rounded-xl border border-violet-500/20 bg-violet-500/[0.07] p-3"
            >
              <Bell size={14} className="text-violet-400 shrink-0" aria-hidden />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-violet-300">Budget Session</p>
                <p className="text-[10px] text-slate-500 truncate">Feb 1 – Mar 22, 2025</p>
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
