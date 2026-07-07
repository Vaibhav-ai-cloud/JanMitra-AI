"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "../../utils/auth";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  error?: string;
  id: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <div className="flex items-start gap-3">
          <div className="relative mt-0.5 shrink-0">
            <input
              ref={ref}
              id={id}
              type="checkbox"
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
              className="peer sr-only"
              {...props}
            />
            <label
              htmlFor={id}
              className={cn(
                "flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border",
                "bg-white/[0.04] transition-all duration-200",
                "hover:border-blue-500/50 hover:bg-blue-500/10",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/60 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-slate-900",
                "peer-checked:border-blue-500 peer-checked:bg-blue-500",
                error ? "border-red-500/60" : "border-white/[0.15]"
              )}
            >
              <Check
                size={12}
                className="stroke-white opacity-0 peer-checked:opacity-100 transition-opacity"
                strokeWidth={3}
                aria-hidden
              />
            </label>
          </div>

          <label
            htmlFor={id}
            className="cursor-pointer text-sm leading-relaxed text-slate-400"
          >
            {label}
          </label>
        </div>

        {error && (
          <p id={`${id}-error`} role="alert" className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
