"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import AuthLayout from "../../../components/auth/AuthLayout";
import AuthCard from "../../../components/auth/AuthCard";
import AuthHeader from "../../../components/auth/AuthHeader";
import AuthLogo from "../../../components/auth/AuthLogo";
import PasswordInput from "../../../components/auth/PasswordInput";
import LoadingButton from "../../../components/auth/LoadingButton";
import { ErrorAlert } from "../../../components/auth/Alert";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "../../../lib/validations/auth";
import { authResetPassword } from "../../../lib/authStore";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch("password") ?? "";

  const onSubmit = async (data: ResetPasswordSchema) => {
    if (!token) {
      setServerError("No reset token found. Please use the link from your email.");
      return;
    }

    setServerError(null);
    setIsSubmitting(true);
    try {
      // POST /auth/reset-password — backend validates token and updates password
      await authResetPassword(token, data.password);
      router.push("/auth-success?type=password-reset");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Failed to reset password. Try again."
      );
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
              <ShieldCheck size={24} className="text-blue-400" />
            </motion.div>

            <AuthHeader
              title="Set new password"
              subtitle="Choose a strong password to protect your account"
            />

            {/* Token warning */}
            {!token && (
              <p className="rounded-xl border border-amber-500/30 bg-amber-500/[0.08] px-4 py-3 text-sm text-amber-300" role="alert">
                No reset token found. Please use the link from your email.
              </p>
            )}

            <ErrorAlert
              show={!!serverError}
              message={serverError ?? ""}
              title="Reset failed"
            />

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
            >
              <PasswordInput
                id="reset-password"
                label="New Password"
                autoComplete="new-password"
                placeholder="Create a strong password"
                showStrength
                watchValue={password}
                error={errors.password?.message}
                {...register("password")}
              />

              <PasswordInput
                id="reset-confirm"
                label="Confirm New Password"
                autoComplete="new-password"
                placeholder="Repeat your new password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              {/* Requirements list */}
              <ul className="space-y-1.5 text-xs" aria-label="Password requirements">
                {[
                  { text: "At least 8 characters", met: password.length >= 8 },
                  { text: "Uppercase & lowercase letters", met: /[A-Z]/.test(password) && /[a-z]/.test(password) },
                  { text: "At least one number", met: /[0-9]/.test(password) },
                  { text: "At least one special character", met: /[^A-Za-z0-9]/.test(password) },
                ].map((req) => (
                  <li
                    key={req.text}
                    className={`flex items-center gap-2 transition-colors duration-200 ${
                      req.met ? "text-emerald-400" : "text-slate-600"
                    }`}
                    aria-label={`${req.text}: ${req.met ? "met" : "not met"}`}
                  >
                    <span className="text-base" aria-hidden>
                      {req.met ? "✓" : "○"}
                    </span>
                    {req.text}
                  </li>
                ))}
              </ul>

              <LoadingButton
                isLoading={isSubmitting}
                loadingText="Resetting password..."
                size="lg"
                className="mt-1"
                disabled={!token}
              >
                <span className="flex items-center gap-2">
                  Reset Password <ArrowRight size={16} />
                </span>
              </LoadingButton>
            </form>
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
