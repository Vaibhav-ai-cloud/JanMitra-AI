"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Bell, CheckCheck, FileText, BookOpen, ClipboardList, Bot, Settings2 } from "lucide-react";
import PageHeader from "../../../components/citizen/shared/PageHeader";
import EmptyState from "../../../components/citizen/shared/EmptyState";
import { mockNotifications } from "../../../lib/mockData";
import type { Notification } from "../../../types/citizen";
import { cn } from "../../../utils/auth";

const typeIcon: Record<Notification["type"], React.ReactNode> = {
  complaint: <FileText size={15} />,
  scheme: <BookOpen size={15} />,
  application: <ClipboardList size={15} />,
  ai: <Bot size={15} />,
  system: <Settings2 size={15} />,
};

const typeColor: Record<Notification["type"], string> = {
  complaint: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  scheme: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  application: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  ai: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  system: "bg-slate-500/15 text-slate-400 border-slate-500/20",
};

const filterOptions = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "complaint", label: "Complaints" },
  { value: "scheme", label: "Schemes" },
  { value: "application", label: "Applications" },
] as const;

type FilterType = (typeof filterOptions)[number]["value"];

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "all") return true;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );

  return (
    <div className="space-y-6 max-w-[800px]">
      <PageHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
        actions={
          unreadCount > 0 ? (
            <button
              onClick={markAllRead}
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
              aria-label="Mark all notifications as read"
            >
              <CheckCheck size={15} aria-hidden />
              Mark all read
            </button>
          ) : undefined
        }
      />

      {/* Filter tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="Notification filters">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            role="tab"
            aria-selected={filter === opt.value}
            onClick={() => setFilter(opt.value)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all",
              filter === opt.value
                ? "border-blue-500/40 bg-blue-500/15 text-blue-300"
                : "border-white/[0.08] bg-white/[0.03] text-slate-500 hover:border-white/[0.14] hover:text-slate-300"
            )}
          >
            {opt.label}
            {opt.value === "unread" && unreadCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Bell size={28} />}
          title="No notifications"
          description={filter === "unread" ? "You've read all your notifications." : "Nothing to show here."}
        />
      ) : (
        <motion.ul
          className="space-y-2"
          role="list"
          aria-label="Notifications"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
        >
          <AnimatePresence initial={false}>
            {filtered.map((n) => (
              <motion.li
                key={n.id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={cn(
                  "relative flex items-start gap-4 rounded-2xl border p-4 transition-all",
                  !n.isRead
                    ? "border-blue-500/20 bg-blue-500/[0.04]"
                    : "border-white/[0.06] bg-white/[0.02]"
                )}
              >
                {/* Unread dot */}
                {!n.isRead && (
                  <span
                    className="absolute right-4 top-4 h-2 w-2 rounded-full bg-blue-400"
                    aria-label="Unread"
                  />
                )}

                {/* Type icon */}
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
                    typeColor[n.type]
                  )}
                  aria-hidden
                >
                  {typeIcon[n.type]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-white">{n.title}</p>
                      <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">{n.message}</p>
                    </div>
                    <span className="shrink-0 text-[10px] text-slate-600">
                      {timeAgo(n.createdAt)}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center gap-3">
                    {n.href && (
                      <Link
                        href={n.href}
                        onClick={() => markRead(n.id)}
                        className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        View →
                      </Link>
                    )}
                    {!n.isRead && (
                      <button
                        onClick={() => markRead(n.id)}
                        className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
                        aria-label={`Mark "${n.title}" as read`}
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
