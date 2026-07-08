"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, ArrowRight, KeyRound } from "lucide-react";
import Link from "next/link";

import AuthLayout from "../../../components/auth/AuthLayout";
import AuthCard from "../../../components/auth/AuthCard";
import AuthHeader from "../../../components/auth/AuthHeader";
import AuthLogo from "../../../components/auth/AuthLogo";
import Input from "../../../components/auth/Input";
import LoadingButton from "../../../components/auth/LoadingButton";
import { ErrorAlert, SuccessAlert } from "../../../components/auth/Alert";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "../../../lib/validations/auth";
import { authForgotPassword } from "../../../lib/authStore";
import { maskEmail } from "../../../utils/auth";

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      // POST /auth/forgot-password — backend sends reset email
      await authForgotPassword(data.email);
      setSentEmail(data.email);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Could not send reset link. Try again."
      );
    } finally {
      setIsSubmitting(false);
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
              <KeyRound size={24} className="text-blue-400" />
            </motion.div>

            {sentEmail ? (
              /* ── Success state ── */
              <div className="space-y-4">
                <AuthHeader
                  title="Check your inbox"
                  subtitle={`We've sent a password reset link to ${maskEmail(sentEmail)}`}
                />

                <SuccessAlert
                  show
                  title="Email sent!"
                  message="The reset link expires in 30 minutes. Check your spam folder if you don't see it."
                />

                <p className="text-sm text-slate-500">
                  Didn&apos;t receive it?{" "}
                  <button
                    type="button"
                    onClick={() => setSentEmail(null)}
                    className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                  >
                    Try again
                  </button>
                </p>
              </div>
            ) : (
              /* ── Form state ── */
              <>
                <AuthHeader
                  title="Forgot password?"
                  subtitle="Enter your registered email and we'll send you a reset link"
                />

                <ErrorAlert
                  show={!!serverError}
                  message={serverError ?? ""}
                />

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-4"
                >
                  <Input
                    id="forgot-email"
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    leftIcon={<Mail size={16} />}
                    error={errors.email?.message}
                    {...register("email")}
                  />

                  <LoadingButton
                    isLoading={isSubmitting}
                    loadingText="Sending link..."
                    size="lg"
                  >
                    <span className="flex items-center gap-2">
                      Send Reset Link <ArrowRight size={16} />
                    </span>
                  </LoadingButton>
                </form>
              </>
            )}
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
