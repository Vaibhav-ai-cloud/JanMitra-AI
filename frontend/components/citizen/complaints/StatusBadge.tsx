"use client";

import { cn } from "../../../utils/auth";
import type { ComplaintStatus, ComplaintPriority } from "../../../types/complaint";

// ── Status Badge ─────────────────────────────────────────────────────────────

const statusConfig: Record<
  ComplaintStatus,
  { label: string; classes: string; dot: string }
> = {
  draft: { label: "Draft", classes: "bg-slate-500/15 text-slate-400 border-slate-500/20", dot: "bg-slate-500" },
  submitted: { label: "Submitted", classes: "bg-blue-500/15 text-blue-400 border-blue-500/20", dot: "bg-blue-400" },
  acknowledged: { label: "Acknowledged", classes: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20", dot: "bg-cyan-400" },
  in_progress: { label: "In Progress", classes: "bg-amber-500/15 text-amber-400 border-amber-500/20", dot: "bg-amber-400" },
  resolved: { label: "Resolved", classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20", dot: "bg-emerald-400" },
  closed: { label: "Closed", classes: "bg-slate-500/15 text-slate-400 border-slate-500/20", dot: "bg-slate-500" },
  rejected: { label: "Rejected", classes: "bg-red-500/15 text-red-400 border-red-500/20", dot: "bg-red-500" },
};

interface StatusBadgeProps {
  status: ComplaintStatus;
  className?: string;
  showDot?: boolean;
}

export function StatusBadge({ status, className, showDot = true }: StatusBadgeProps) {
  const cfg = statusConfig[status] ?? statusConfig["submitted"];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        cfg.classes,
        className
      )}
    >
      {showDot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} aria-hidden />
      )}
      {cfg.label}
    </span>
  );
}

// ── Priority Badge ────────────────────────────────────────────────────────────

const priorityConfig: Record<
  ComplaintPriority,
  { label: string; classes: string }
> = {
  low: { label: "Low", classes: "bg-slate-500/10 text-slate-500 border-slate-500/20" },
  medium: { label: "Medium", classes: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  high: { label: "High", classes: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  urgent: { label: "Urgent", classes: "bg-red-500/10 text-red-400 border-red-500/20" },
};

interface PriorityBadgeProps {
  priority: ComplaintPriority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const cfg = priorityConfig[priority];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
        cfg.classes,
        className
      )}
    >
      {cfg.label}
    </span>
  );
}
