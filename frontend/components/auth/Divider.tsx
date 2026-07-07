import { cn } from "../../utils/auth";

interface DividerProps {
  label?: string;
  className?: string;
}

export default function Divider({ label, className }: DividerProps) {
  return (
    <div
      role="separator"
      aria-label={label}
      className={cn("flex items-center gap-3", className)}
    >
      <div className="h-px flex-1 bg-white/[0.08]" />
      {label && (
        <span className="shrink-0 text-xs font-medium uppercase tracking-widest text-slate-600">
          {label}
        </span>
      )}
      <div className="h-px flex-1 bg-white/[0.08]" />
    </div>
  );
}
