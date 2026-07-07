"use client";

import {
  useRef,
  useEffect,
  ClipboardEvent,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import { cn } from "../../utils/auth";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

export default function OtpInput({
  value,
  onChange,
  length = 6,
  error,
  disabled = false,
  autoFocus = true,
}: OtpInputProps) {
  const digits = value.padEnd(length, "").split("").slice(0, length);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first slot on mount
  useEffect(() => {
    if (autoFocus) {
      refs.current[0]?.focus();
    }
  }, [autoFocus]);

  const focusAt = (idx: number) => {
    const target = refs.current[Math.max(0, Math.min(idx, length - 1))];
    target?.focus();
  };

  const update = (idx: number, char: string) => {
    const arr = digits.map((d) => d.trim());
    arr[idx] = char.replace(/\D/g, "").slice(0, 1);
    onChange(arr.join("").slice(0, length));
    if (char && idx < length - 1) focusAt(idx + 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    update(idx, e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[idx]) {
        update(idx, "");
      } else {
        focusAt(idx - 1);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusAt(idx - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusAt(idx + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    onChange(pasted.padEnd(length, "").slice(0, length));
    focusAt(Math.min(pasted.length, length - 1));
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        role="group"
        aria-label="One-time password input"
        className="flex gap-2 sm:gap-3"
      >
        {Array.from({ length }).map((_, idx) => (
          <input
            key={idx}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            id={`otp-digit-${idx}`}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={digits[idx] === " " ? "" : (digits[idx] ?? "")}
            aria-label={`Digit ${idx + 1} of ${length}`}
            disabled={disabled}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={cn(
              "h-12 w-full flex-1 rounded-xl border text-center text-lg font-bold text-white",
              "bg-white/[0.04] transition-all duration-200 outline-none",
              "caret-blue-400 selection:bg-blue-500/30",
              digits[idx] && digits[idx] !== " "
                ? "border-blue-500/60 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                : "border-white/[0.08]",
              "hover:border-white/20",
              "focus:border-blue-500/70 focus:bg-blue-500/[0.08] focus:ring-2 focus:ring-blue-500/25",
              error && "border-red-500/50 focus:border-red-500/60",
              disabled && "cursor-not-allowed opacity-50"
            )}
          />
        ))}
      </div>

      {error && (
        <p role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
          <span aria-hidden>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
