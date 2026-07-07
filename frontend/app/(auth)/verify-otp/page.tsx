"use client";

import { useState, useEffect, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { MessageSquare, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import AuthLayout from "../../../components/auth/AuthLayout";
import AuthCard from "../../../components/auth/AuthCard";
import AuthHeader from "../../../components/auth/AuthHeader";
import AuthLogo from "../../../components/auth/AuthLogo";
import OtpInput from "../../../components/auth/OtpInput";
import LoadingButton from "../../../components/auth/LoadingButton";
import { ErrorAlert } from "../../../components/auth/Alert";
import { otpSchema, type OtpSchema } from "../../../lib/validations/auth";
import { useCountdown } from "../../../hooks/useCountdown";
import { formatCountdown } from "../../../utils/auth";

async function verifyOtp(_otp: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
}

async function resendOtp(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));
}

const RESEND_COOLDOWN = 60;

function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "register";

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { seconds, isActive, start } = useCountdown(RESEND_COOLDOWN);

  // Start countdown on mount
  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const onSubmit = async (data: OtpSchema) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      await verifyOtp(data.otp);
      // Route based on what flow triggered OTP
      if (type === "password-reset") {
        router.push("/reset-password");
      } else {
        router.push("/auth-success?type=otp");
      }
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Invalid OTP. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setServerError(null);
    setIsResending(true);
    try {
      await resendOtp();
      start();
    } catch {
      setServerError("Could not resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="lg:hidden">
          <AuthLogo size="md" />
        </div>

        <AuthCard>
          <div className="space-y-6 p-7 sm:p-8">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20"
              aria-hidden
            >
              <MessageSquare size={24} className="text-blue-400" />
            </motion.div>

            <AuthHeader
              title="Verify your number"
              subtitle="Enter the 6-digit OTP sent to your registered mobile number"
            />

            <ErrorAlert
              show={!!serverError}
              message={serverError ?? ""}
              title="Verification failed"
            />

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-6"
            >
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <OtpInput
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.otp?.message}
                    disabled={isSubmitting}
                    autoFocus
                  />
                )}
              />

              <LoadingButton
                isLoading={isSubmitting}
                loadingText="Verifying..."
                size="lg"
              >
                Verify OTP
              </LoadingButton>
            </form>

            {/* Resend section */}
            <div className="text-center">
              {isActive ? (
                <p className="text-sm text-slate-500" aria-live="polite">
                  Resend OTP in{" "}
                  <span className="font-mono font-semibold text-slate-300">
                    {formatCountdown(seconds)}
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                >
                  <RefreshCw
                    size={14}
                    className={isResending ? "animate-spin" : ""}
                    aria-hidden
                  />
                  {isResending ? "Sending..." : "Resend OTP"}
                </button>
              )}
            </div>
          </div>
        </AuthCard>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          >
            <ArrowLeft size={15} aria-hidden />
            Back to Sign in
          </Link>
        </motion.div>
      </div>
    </AuthLayout>
  );
}

export default function OtpPage() {
  return (
    <Suspense fallback={null}>
      <OtpForm />
    </Suspense>
  );
}
