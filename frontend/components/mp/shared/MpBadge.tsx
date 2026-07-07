"use client";

import { cn } from "../../../utils/auth";

// ── MP Badge (status / category) ──────────────────────────────────────────────

type BadgeVariant = "violet" | "blue" | "emerald" | "amber" | "rose" | "cyan" | "slate" | "red" | "purple";

interface MpBadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
  size?: "sm" | "md";
  className?: string;
}

const variantMap: Record<BadgeVariant, string> = {
  violet: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  purple: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  blue: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  rose: "bg-rose-500/15 text-rose-400 border-rose-500/20",
  cyan: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  slate: "bg-slate-500/15 text-slate-400 border-slate-500/20",
  red: "bg-red-500/15 text-red-400 border-red-500/20",
};

const dotMap: Record<BadgeVariant, string> = {
  violet: "bg-violet-400",
  purple: "bg-purple-400",
  blue: "bg-blue-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  rose: "bg-rose-400",
  cyan: "bg-cyan-400",
  slate: "bg-slate-500",
  red: "bg-red-500",
};

export function MpBadge({ label, variant = "slate", dot = false, size = "sm", className }: MpBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold",
        size === "sm" ? "px-2 py-0.5 text-[10px] uppercase tracking-wide" : "px-2.5 py-1 text-xs",
        variantMap[variant],
        className
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotMap[variant])} aria-hidden />}
      {label}
    </span>
  );
}

// ── Project Status Badge ───────────────────────────────────────────────────────

import type { ProjectStatus } from "../../../types/mp";

const projectStatusConfig: Record<ProjectStatus, { label: string; variant: BadgeVariant }> = {
  planned: { label: "Planned", variant: "slate" },
  tender: { label: "Tender", variant: "violet" },
  ongoing: { label: "Ongoing", variant: "blue" },
  completed: { label: "Completed", variant: "emerald" },
  delayed: { label: "Delayed", variant: "amber" },
  cancelled: { label: "Cancelled", variant: "red" },
};

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  const cfg = projectStatusConfig[status];
  return <MpBadge label={cfg.label} variant={cfg.variant} dot className={className} />;
}
