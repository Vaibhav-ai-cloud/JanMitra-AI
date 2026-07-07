"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthLayout from "../../../components/auth/AuthLayout";
import AuthCard from "../../../components/auth/AuthCard";
import AuthHeader from "../../../components/auth/AuthHeader";
import AuthLogo from "../../../components/auth/AuthLogo";
import LoadingButton from "../../../components/auth/LoadingButton";
import { ErrorAlert, SuccessAlert } from "../../../components/auth/Alert";

async function resendVerificationEmail(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
}

export default function EmailVerifyPage() {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    setError(null);
    setSent(false);
    setIsSending(true);
    try {
      await resendVerificationEmail();
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not resend email. Try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  // Animated envelope with floating dots
  const dotVariants = {
    animate: (i: number) => ({
      y: [0, -6, 0],
      transition: { duration: 0.8, delay: i * 0.15, repeat: Infinity },
    }),
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="lg:hidden">
          <AuthLogo size="md" />
        </div>

        <AuthCard>
          <div className="space-y-6 p-7 sm:p-8 text-center">
            {/* Animated envelope */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, type: "spring", bounce: 0.35 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10 border border-blue-500/20"
              aria-hidden
            >
              <Mail size={36} className="text-blue-400" />
            </motion.div>

            {/* Animated dots */}
            <div className="flex justify-center gap-1.5" aria-hidden>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={dotVariants}
                  animate="animate"
                  className="h-1.5 w-1.5 rounded-full bg-blue-400/60"
                />
              ))}
            </div>

            <div className="space-y-1.5 text-left">
              <AuthHeader
                title="Verify your email"
                subtitle="We've sent a verification link to your email address. Click the link to activate your account."
              />
            </div>

            <ErrorAlert
              show={!!error}
              message={error ?? ""}
            />

            <SuccessAlert
              show={sent}
              title="Email resent!"
              message="A new verification link has been sent to your inbox."
            />

            {/* Steps */}
            <ol className="space-y-3 text-left" aria-label="Verification steps">
              {[
                { num: "1", text: "Check your inbox (and spam folder)" },
                { num: "2", text: 'Click the "Verify Email" button in the email' },
                { num: "3", text: "Return here and sign in to your account" },
              ].map((step) => (
                <li key={step.num} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-400">
                    {step.num}
                  </span>
                  <span className="text-sm text-slate-400">{step.text}</span>
                </li>
              ))}
            </ol>

            <LoadingButton
              type="button"
              onClick={handleResend}
              isLoading={isSending}
              loadingText="Sending..."
              variant="outline"
              size="md"
            >
              <span className="flex items-center gap-2">
                <RefreshCw size={15} aria-hidden />
                Resend verification email
              </span>
            </LoadingButton>

            <div className="flex items-center justify-center gap-4 pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
              >
                Go to Sign in <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
