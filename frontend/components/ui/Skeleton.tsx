import { twMerge } from "tailwind-merge";
import type React from "react";

interface SkeletonProps {
  className?: string;
  /** Round to a pill shape */
  rounded?: boolean;
  style?: React.CSSProperties;
}

/** Single skeleton bar */
export function Skeleton({ className, rounded = false, style }: SkeletonProps) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      style={style}
      className={twMerge(
        "animate-pulse bg-white/[0.07]",
        rounded ? "rounded-full" : "rounded-lg",
        className
      )}
    />
  );
}

/** Skeleton preset: stat card */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={twMerge(
        "rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6",
        className
      )}
    >
      <Skeleton className="mb-4 h-10 w-10" rounded />
      <Skeleton className="mb-2 h-7 w-24" />
      <Skeleton className="h-4 w-36" />
    </div>
  );
}

/** Skeleton preset: table row */
export function SkeletonRow({ cols = 4 }: { cols?: number }) {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-4 border-b border-white/[0.05] py-4"
    >
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4 flex-1"
          style={{ opacity: 1 - i * 0.15 }}
        />
      ))}
    </div>
  );
}

/** Skeleton preset: list of N rows */
export function SkeletonList({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div aria-label="Loading content" role="status">
      <span className="sr-only">Loading…</span>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} cols={cols} />
      ))}
    </div>
  );
}

/** Skeleton preset: grid of N cards */
export function SkeletonGrid({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <div
      aria-label="Loading content"
      role="status"
      className={twMerge("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}
    >
      <span className="sr-only">Loading…</span>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
