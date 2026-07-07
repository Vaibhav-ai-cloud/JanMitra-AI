"use client";

import { cn } from "../../../utils/auth";
import type { ComplaintTimelineEvent } from "../../../types/complaint";
import { StatusBadge } from "./StatusBadge";

interface StatusTimelineProps {
  events: ComplaintTimelineEvent[];
  className?: string;
}

export default function StatusTimeline({ events, className }: StatusTimelineProps) {
  return (
    <ol
      aria-label="Complaint status timeline"
      className={cn("space-y-0 relative", className)}
    >
      {events.map((event, idx) => {
        const isLast = idx === events.length - 1;
        return (
          <li key={event.id} className="relative flex gap-4 pb-6">
            {/* Vertical line */}
            {!isLast && (
              <div
                aria-hidden
                className={cn(
                  "absolute left-[17px] top-9 bottom-0 w-[2px]",
                  event.isCompleted
                    ? "bg-blue-500/40"
                    : "bg-white/[0.06]"
                )}
              />
            )}

            {/* Circle indicator */}
            <div
              className={cn(
                "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2",
                event.isCompleted
                  ? "border-blue-500/60 bg-blue-500/15"
                  : "border-white/[0.1] bg-white/[0.03]"
              )}
              aria-hidden
            >
              {event.isCompleted ? (
                <span className="text-base">✓</span>
              ) : (
                <span className="h-2 w-2 rounded-full bg-slate-600" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-1.5">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <StatusBadge status={event.status} showDot={false} />
                {event.actor && (
                  <span className="text-xs text-slate-600">by {event.actor}</span>
                )}
              </div>
              <p className="text-sm text-slate-400">{event.message}</p>
              {event.timestamp && (
                <p className="mt-1 text-xs text-slate-600">
                  {new Date(event.timestamp).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
