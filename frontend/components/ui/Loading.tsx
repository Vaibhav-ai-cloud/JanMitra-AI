import { twMerge } from "tailwind-merge";

// ── Spinner ────────────────────────────────────────────────────────────────

interface SpinnerProps {
  /** Diameter of the spinner */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const spinnerSizes = {
  sm: "h-4 w-4 border-2",
  md: "h-7 w-7 border-[3px]",
  lg: "h-11 w-11 border-4",
};

/**
 * Inline spinner — use inside buttons or inline with text.
 */
export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={twMerge(
        "inline-block animate-spin rounded-full border-white/20 border-t-blue-400",
        spinnerSizes[size],
        className
      )}
    />
  );
}

// ── Page Loading Overlay ───────────────────────────────────────────────────

interface LoadingOverlayProps {
  /** Full-screen vs contained overlay */
  fullScreen?: boolean;
  message?: string;
}

/**
 * Full-page or contained loading overlay with JM branding.
 */
export function LoadingOverlay({ fullScreen = false, message }: LoadingOverlayProps) {
  return (
    <div
      role="status"
      aria-label={message ?? "Loading"}
      className={twMerge(
        "flex flex-col items-center justify-center gap-4 bg-[#080e1c]/80 backdrop-blur-sm",
        fullScreen ? "fixed inset-0 z-[9900]" : "absolute inset-0 z-10 rounded-2xl"
      )}
    >
      {/* Logo ping */}
      <div className="relative flex h-12 w-12 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500/30" />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/35">
          <span className="text-sm font-black text-white" aria-hidden>
            JM
          </span>
        </div>
      </div>
      {message && (
        <p className="text-sm text-slate-400">{message}</p>
      )}
    </div>
  );
}

// ── Section Loading ────────────────────────────────────────────────────────

/**
 * Centred spinner for loading a section of a page (not full-screen).
 */
export function SectionLoading({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-label={label}
      className="flex min-h-[200px] items-center justify-center"
    >
      <Spinner size="lg" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
