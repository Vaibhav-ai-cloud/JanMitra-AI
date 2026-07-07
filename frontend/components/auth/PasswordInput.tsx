"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Input, { type InputProps } from "./Input";
import { getPasswordStrength } from "../../utils/auth";
import { cn } from "../../utils/auth";

interface PasswordInputProps extends Omit<InputProps, "type" | "rightElement"> {
  showStrength?: boolean;
  watchValue?: string;
}

export default function PasswordInput({
  showStrength = false,
  watchValue = "",
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  const strength = showStrength ? getPasswordStrength(watchValue) : null;
  const segments = [0, 1, 2, 3];

  return (
    <div className="flex flex-col gap-1.5">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        autoComplete={props.autoComplete ?? "current-password"}
        leftIcon={<Lock size={16} />}
        rightElement={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="mr-1 flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            tabIndex={0}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      />

      <AnimatePresence>
        {showStrength && watchValue && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-1.5"
          >
            {/* Strength bar */}
            <div className="flex gap-1" aria-hidden>
              {segments.map((seg) => (
                <div
                  key={seg}
                  className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: strength && strength.score > seg ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3, delay: seg * 0.05 }}
                    className={cn(
                      "h-full rounded-full",
                      strength?.color ?? "bg-red-500"
                    )}
                  />
                </div>
              ))}
            </div>

            {/* Label */}
            <p
              className="text-xs text-slate-500"
              aria-live="polite"
              aria-atomic="true"
            >
              Password strength:{" "}
              <span
                className={cn(
                  "font-medium",
                  strength?.score === 0 && "text-red-400",
                  strength?.score === 1 && "text-orange-400",
                  strength?.score === 2 && "text-yellow-400",
                  strength?.score === 3 && "text-blue-400",
                  strength?.score === 4 && "text-emerald-400"
                )}
              >
                {strength?.label}
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
