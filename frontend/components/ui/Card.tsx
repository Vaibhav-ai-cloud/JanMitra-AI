import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Extra padding variant */
  padding?: "sm" | "md" | "lg";
  /** Show hover lift effect */
  hoverable?: boolean;
  /** Make card act as article for semantics */
  as?: "div" | "article" | "section" | "li";
}

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

/**
 * Shared Card — glassmorphism container matching the design system.
 * Use for stat cards, list items, detail panels.
 */
export default function Card({
  children,
  className,
  padding = "md",
  hoverable = false,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={twMerge(
        "relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm",
        paddingMap[padding],
        hoverable &&
          "transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-black/20",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/** Card header sub-component */
export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "mb-5 flex items-center justify-between gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Card title sub-component */
export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={twMerge(
        "text-base font-bold text-white",
        className
      )}
    >
      {children}
    </h3>
  );
}
