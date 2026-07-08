"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthLayout from "../../../components/auth/AuthLayout";
import AuthCard from "../../../components/auth/AuthCard";
import AuthHeader from "../../../components/auth/AuthHeader";
import AuthLogo from "../../../components/auth/AuthLogo";
import Input from "../../../components/auth/Input";
import PasswordInput from "../../../components/auth/PasswordInput";
import Checkbox from "../../../components/auth/Checkbox";
import Divider from "../../../components/auth/Divider";
import SocialLoginButton from "../../../components/auth/SocialLoginButton";
import LoadingButton from "../../../components/auth/LoadingButton";
import { ErrorAlert, SuccessAlert } from "../../../components/auth/Alert";
import { loginSchema, type LoginSchema } from "../../../lib/validations/auth";
import { authLogin, authLoginMP, authLoginAdmin } from "../../../lib/authStore";
import { cn } from "../../../utils/auth";

const GOOGLE_OAUTH_URL = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL ?? "";

// ── Login role selector options ───────────────────────────────────────────────
const loginRoles: {
  value: "citizen" | "mp" | "admin";
  label: string;
  icon: string;
}[] = [
  { value: "citizen", label: "Citizen", icon: "🏠" },
  { value: "mp",      label: "MP / MLA", icon: "🏛️" },
  { value: "admin",   label: "Admin",  icon: "⚙️" },
];

export default function LoginPage() {
  const router = useRouter();
  const [successMsg,   setSuccessMsg]   = useState<string | null>(null);
  const [errorMsg,     setErrorMsg]     = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password:   "",
      rememberMe: false,
      loginRole:  "citizen",
    },
  });

  const selectedRole = watch("loginRole");

  const onSubmit = async (data: LoginSchema) => {
    if (isSubmitting) return;
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    try {
      let session;

      switch (data.loginRole) {
        case "mp":
          session = await authLoginMP(data.identifier.trim(), data.password);
          break;
        case "admin":
          session = await authLoginAdmin(data.identifier.trim(), data.password);
          break;
        default:
          session = await authLogin(data.identifier.trim(), data.password);
      }

      setSuccessMsg(`Welcome, ${session.fullName.split(" ")[0]}! Redirecting…`);
      setTimeout(() => router.push(session.redirectTo), 600);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!GOOGLE_OAUTH_URL) return;
    window.location.href = GOOGLE_OAUTH_URL;
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Logo (mobile only) */}
        <div className="lg:hidden">
          <AuthLogo size="md" />
        </div>

        <AuthCard>
          <div className="space-y-6 p-7 sm:p-8">
            <AuthHeader
              title="Welcome back"
              subtitle="Sign in to your JanMitra AI account"
            />

            {/* Alerts */}
            <SuccessAlert
              show={!!successMsg}
              message={successMsg ?? ""}
              title="Signed in!"
            />
            <ErrorAlert
              show={!!errorMsg}
              message={errorMsg ?? ""}
              title="Sign in failed"
            />

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

              {/* ── Login Role Selector ──────────────────────────────────── */}
              <fieldset>
                <legend className="mb-2 text-sm font-medium text-slate-300">
                  I am a…
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {loginRoles.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setValue("loginRole", opt.value, { shouldValidate: true })
                      }
                      aria-pressed={selectedRole === opt.value}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center",
                        "transition-all duration-200 outline-none",
                        "focus-visible:ring-2 focus-visible:ring-blue-500/60",
                        selectedRole === opt.value
                          ? "border-blue-500/60 bg-blue-500/10 text-white"
                          : "border-white/[0.08] bg-white/[0.04] text-slate-400 hover:border-white/20 hover:text-slate-300"
                      )}
                    >
                      <span className="text-base" aria-hidden>{opt.icon}</span>
                      <span className="text-[11px] font-semibold">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* ── Credentials ───────────────────────────────────────────── */}
              <Input
                id="login-identifier"
                label="Email"
                type="email"
                autoComplete="username"
                placeholder="you@example.com"
                leftIcon={<Mail size={16} />}
                error={errors.identifier?.message}
                {...register("identifier")}
              />

              <div className="space-y-1.5">
                <PasswordInput
                  id="login-password"
                  label="Password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  {...register("password")}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <Checkbox
                  id="login-remember"
                  label="Remember me"
                  {...register("rememberMe")}
                />
                <Link
                  href="/forgot-password"
                  className="shrink-0 text-sm text-blue-400 transition-colors hover:text-blue-300 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                >
                  Forgot password?
                </Link>
              </div>

              <LoadingButton
                type="submit"
                isLoading={isSubmitting}
                loadingText="Signing in…"
                size="lg"
                className="mt-2"
              >
                <span className="flex items-center gap-2">
                  Sign in <ArrowRight size={16} />
                </span>
              </LoadingButton>
            </form>

            {/* Security badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
              <Shield size={12} aria-hidden />
              <span>Secured with 256-bit AES encryption</span>
            </div>

            {/* Google OAuth — only shown for Citizens */}
            {selectedRole === "citizen" && (
              <>
                <Divider label="or continue with" />
                <SocialLoginButton
                  provider="google"
                  onClick={handleGoogleLogin}
                  disabled={!GOOGLE_OAUTH_URL}
                />
              </>
            )}
          </div>
        </AuthCard>

        {/* Footer link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-slate-500"
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-400 hover:text-blue-300 transition-colors focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          >
            Create one free
          </Link>
        </motion.p>
      </div>
    </AuthLayout>
  );
}
