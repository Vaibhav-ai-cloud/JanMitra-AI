"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Shield,
  Plus,
  FileText,
  UserPlus,
} from "lucide-react";
import { cn } from "../../../utils/auth";
import { useAdminSidebar } from "./AdminSidebar";
import type { AdminNotification } from "../../../types/admin";
import LogoutButton from "../../auth/LogoutButton";

interface AdminNavbarProps {
  notifications?: AdminNotification[];
  adminName?: string;
  adminRole?: string;
}

const severityColor: Record<string, string> = {
  info: "bg-blue-400",
  warning: "bg-amber-400",
  critical: "bg-red-500",
};

const dropdownItemCls =
  "flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors rounded-lg";

export default function AdminNavbar({
  notifications = [],
  adminName = "Sanjay Mehta",
  adminRole = "Super Admin",
}: AdminNavbarProps) {
  const { isMobileOpen, setIsMobileOpen } = useAdminSidebar();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const unread = notifications.filter((n) => !n.isRead);

  const quickActions = [
    { label: "New Scheme", icon: FileText, href: "/admin/schemes/new" },
    { label: "Add User", icon: UserPlus, href: "/admin/users" },
    { label: "View Reports", icon: FileText, href: "/admin/reports" },
  ];

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-white/[0.06] bg-slate-950/90 backdrop-blur-2xl px-4 lg:px-6">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-white/[0.06] hover:text-white transition-colors"
        aria-label={isMobileOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Global Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search users, complaints, schemes, MPs..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={cn(
              "h-9 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 text-sm text-white",
              "placeholder:text-slate-600 transition-all duration-200 outline-none",
              "hover:border-white/[0.14] focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
            )}
            aria-label="Global search"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        {/* Role badge */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.08] px-3 py-1">
          <Shield size={12} className="text-blue-400" aria-hidden />
          <span className="text-xs font-medium text-blue-300">{adminRole}</span>
        </div>

        {/* Quick Actions */}
        <div className="relative">
          <button
            onClick={() => {
              setShowQuickActions(!showQuickActions);
              setShowNotifs(false);
              setShowProfile(false);
            }}
            className="hidden sm:flex h-9 items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors"
            aria-label="Quick actions"
            aria-haspopup="true"
            aria-expanded={showQuickActions}
          >
            <Plus size={15} aria-hidden />
            <span className="hidden md:inline text-xs font-medium">Quick Add</span>
          </button>

          <AnimatePresence>
            {showQuickActions && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/95 shadow-2xl shadow-black/50 backdrop-blur-2xl p-1.5"
                role="menu"
                aria-label="Quick actions"
              >
                {quickActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    role="menuitem"
                    onClick={() => setShowQuickActions(false)}
                    className={dropdownItemCls}
                  >
                    <action.icon size={15} className="text-slate-500" aria-hidden />
                    {action.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifs(!showNotifs);
              setShowProfile(false);
              setShowQuickActions(false);
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-white/[0.06] hover:text-white transition-colors"
            aria-label={`Notifications${unread.length > 0 ? `, ${unread.length} unread` : ""}`}
            aria-haspopup="true"
            aria-expanded={showNotifs}
          >
            <Bell size={18} />
            {unread.length > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-950" aria-hidden />
            )}
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/95 shadow-2xl shadow-black/50 backdrop-blur-2xl"
                role="dialog"
                aria-label="Notifications"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                  <span className="text-sm font-semibold text-white">Notifications</span>
                  {unread.length > 0 && (
                    <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
                      {unread.length} new
                    </span>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        "flex gap-3 px-4 py-3 text-sm transition-colors hover:bg-white/[0.04]",
                        !n.isRead && "bg-blue-500/[0.04]"
                      )}
                    >
                      <div
                        className={cn(
                          "mt-1 h-2 w-2 shrink-0 rounded-full",
                          !n.isRead ? (severityColor[n.severity ?? "info"] ?? "bg-blue-400") : "bg-transparent"
                        )}
                        aria-hidden
                      />
                      <div>
                        <p className="font-medium text-white">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/[0.06] p-2">
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setShowNotifs(false)}
                    className="block rounded-xl px-4 py-2 text-center text-xs font-medium text-blue-400 hover:bg-blue-500/10 transition-colors"
                  >
                    View all notifications
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifs(false);
              setShowQuickActions(false);
            }}
            className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 transition-all hover:bg-white/[0.08]"
            aria-haspopup="true"
            aria-expanded={showProfile}
            aria-label="Profile menu"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-xs font-bold text-white">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <span className="hidden text-sm font-medium text-white sm:block">
              {adminName.split(" ")[0]}
            </span>
            <ChevronDown size={14} className="hidden text-slate-500 sm:block" aria-hidden />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/95 shadow-2xl shadow-black/50 backdrop-blur-2xl p-1.5"
                role="menu"
              >
                <div className="mb-1 border-b border-white/[0.06] px-3 pb-2 pt-1.5">
                  <p className="text-sm font-semibold text-white">{adminName}</p>
                  <p className="text-xs text-cyan-500">{adminRole}</p>
                </div>
                {[
                  { label: "My Profile", icon: User, href: "/admin/profile" },
                  { label: "Settings", icon: Settings, href: "/admin/settings" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setShowProfile(false)}
                    className={dropdownItemCls}
                  >
                    <item.icon size={16} className="text-slate-500" aria-hidden />
                    {item.label}
                  </Link>
                ))}
                <div className="mt-1 border-t border-white/[0.06] pt-1">
                  <LogoutButton />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Click-outside close */}
      {(showNotifs || showProfile || showQuickActions) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => { setShowNotifs(false); setShowProfile(false); setShowQuickActions(false); }}
          aria-hidden
        />
      )}
    </header>
  );
}
