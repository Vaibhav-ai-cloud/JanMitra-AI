"use client";

import type { ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "../../utils/auth";

type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  message: string;
  className?: string;
  show?: boolean;
}

const config: Record<
  AlertVariant,
  {
    icon: ElementType;
    bg: string;
    border: string;
    text: string;
    iconColor: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    bg: "bg-emerald-500/[0.08]",
    border: "border-emerald-500/30",
    text: "text-emerald-300",
    iconColor: "text-emerald-400",
  },
  error: {
    icon: XCircle,
    bg: "bg-red-500/[0.08]",
    border: "border-red-500/30",
    text: "text-red-300",
    iconColor: "text-red-400",
  },
  warning: {
    icon: AlertCircle,
    bg: "bg-yellow-500/[0.08]",
    border: "border-yellow-500/30",
    text: "text-yellow-300",
    iconColor: "text-yellow-400",
  },
  info: {
    icon: Info,
    bg: "bg-blue-500/[0.08]",
    border: "border-blue-500/30",
    text: "text-blue-300",
    iconColor: "text-blue-400",
  },
};

function Alert({ variant, title, message, className, show = true }: AlertProps) {
  const { icon: Icon, bg, border, text, iconColor } = config[variant];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          role="alert"
          aria-live="polite"
          className={cn(
            "flex items-start gap-3 rounded-xl border p-3.5",
            bg,
            border,
            className
          )}
        >
          <Icon
            size={16}
            className={cn("mt-0.5 shrink-0", iconColor)}
            aria-hidden
          />
          <div className="min-w-0">
            {title && (
              <p className={cn("text-sm font-semibold", text)}>{title}</p>
            )}
            <p className={cn("text-sm leading-relaxed", text)}>{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SuccessAlert(props: Omit<AlertProps, "variant">) {
  return <Alert variant="success" {...props} />;
}

export function ErrorAlert(props: Omit<AlertProps, "variant">) {
  return <Alert variant="error" {...props} />;
}

export function WarningAlert(props: Omit<AlertProps, "variant">) {
  return <Alert variant="warning" {...props} />;
}

export function InfoAlert(props: Omit<AlertProps, "variant">) {
  return <Alert variant="info" {...props} />;
}

export default Alert;
