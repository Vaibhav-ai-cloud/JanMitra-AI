"use client";

import type { ReactNode } from "react";
import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/auth";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightElement,
      className,
      wrapperClassName,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-300"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-500"
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={
              [error && errorId, hint && hintId].filter(Boolean).join(" ") ||
              undefined
            }
            className={cn(
              "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white",
              "placeholder:text-slate-600",
              "transition-all duration-200 outline-none",
              "hover:border-white/20 hover:bg-white/[0.06]",
              "focus:border-blue-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-blue-500/20",
              leftIcon && "pl-10",
              rightElement && "pr-11",
              error
                ? "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20"
                : "border-white/[0.08]",
              props.disabled && "cursor-not-allowed opacity-50",
              className
            )}
            {...props}
          />

          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="flex items-center gap-1.5 text-xs text-red-400"
          >
            <span aria-hidden>⚠</span>
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={hintId} className="text-xs text-slate-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
