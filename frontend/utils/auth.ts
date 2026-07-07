import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";
import type { PasswordStrength } from "../types/auth";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Compute password strength score and label */
export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: "Very Weak", color: "bg-red-500" };
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const clamped = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4;

  const map: Record<
    0 | 1 | 2 | 3 | 4,
    { label: PasswordStrength["label"]; color: string }
  > = {
    0: { label: "Very Weak", color: "bg-red-500" },
    1: { label: "Weak", color: "bg-orange-500" },
    2: { label: "Fair", color: "bg-yellow-500" },
    3: { label: "Strong", color: "bg-blue-500" },
    4: { label: "Very Strong", color: "bg-emerald-500" },
  };

  return { score: clamped, ...map[clamped] };
}

/** Mask an email for display: j***@gmail.com */
export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  const visible = local.slice(0, 1);
  const masked = "*".repeat(Math.max(local.length - 1, 3));
  return `${visible}${masked}@${domain}`;
}

/** Mask a phone number: ******7890 */
export function maskPhone(phone: string): string {
  if (phone.length < 4) return phone;
  return "*".repeat(phone.length - 4) + phone.slice(-4);
}

/** Format seconds to mm:ss countdown */
export function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
