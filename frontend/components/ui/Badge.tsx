import { twMerge } from "tailwind-merge";

type BadgeVariant =
  | "default"
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple"
  | "cyan"
  | "orange";

type BadgeSize = "sm" | "md";

const variantStyles: Record<BadgeVariant, string> = {
  default: "border-white/15 bg-white/8 text-slate-300",
  blue:    "border-blue-500/25 bg-blue-500/15 text-blue-300",
  green:   "border-emerald-500/25 bg-emerald-500/15 text-emerald-300",
  yellow:  "border-amber-500/25 bg-amber-500/15 text-amber-300",
  red:     "border-red-500/25 bg-red-500/15 text-red-300",
  purple:  "border-violet-500/25 bg-violet-500/15 text-violet-300",
  cyan:    "border-cyan-500/25 bg-cyan-500/15 text-cyan-300",
  orange:  "border-orange-500/25 bg-orange-500/15 text-orange-300",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Optional dot indicator before text */
  dot?: boolean;
  className?: string;
}

/**
 * Shared Badge — status labels, tags, role indicators.
 */
export default function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={twMerge(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={twMerge(
            "h-1.5 w-1.5 rounded-full",
            variant === "green"  ? "bg-emerald-400" :
            variant === "red"    ? "bg-red-400"     :
            variant === "yellow" ? "bg-amber-400"   :
            variant === "blue"   ? "bg-blue-400"    :
            variant === "cyan"   ? "bg-cyan-400"    :
            variant === "purple" ? "bg-violet-400"  :
            variant === "orange" ? "bg-orange-400"  :
            "bg-slate-400"
          )}
          aria-hidden
        />
      )}
      {children}
    </span>
  );
}
