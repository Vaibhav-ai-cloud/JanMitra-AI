import { twMerge } from "tailwind-merge";
import type { LucideIcon } from "lucide-react";
import { InboxIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  /** Lucide icon to display */
  icon?: LucideIcon;
  /** Primary heading */
  title: string;
  /** Supporting description */
  description?: string;
  /** Optional CTA label */
  actionLabel?: string;
  /** href for link CTA */
  actionHref?: string;
  /** onClick for button CTA */
  actionOnClick?: () => void;
  className?: string;
}

/**
 * Reusable empty state component — use when a list or data table has no results.
 * Matches the dark glassmorphism design system.
 */
export default function EmptyState({
  icon: Icon = InboxIcon,
  title,
  description,
  actionLabel,
  actionHref,
  actionOnClick,
  className,
}: EmptyStateProps) {
  const hasAction = actionLabel && (actionHref || actionOnClick);

  return (
    <div
      role="status"
      aria-label={title}
      className={twMerge(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] px-8 py-16 text-center",
        className
      )}
    >
      {/* Icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04]">
        <Icon size={26} className="text-slate-500" aria-hidden />
      </div>

      {/* Text */}
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      {description && (
        <p className="mb-6 max-w-xs text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}

      {/* Action */}
      {hasAction && (
        <>
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
            >
              {actionLabel}
            </Link>
          ) : (
            <button
              onClick={actionOnClick}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
            >
              {actionLabel}
            </button>
          )}
        </>
      )}
    </div>
  );
}
