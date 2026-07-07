"use client";

// DEV MODE: All form validation removed. Sign In works with any input including empty fields.

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

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
import { SuccessAlert } from "../../../components/auth/Alert";
import { authLogin } from "../../../lib/authStore";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Resolve redirect destination from ?next param (dev bypass)
  const nextParam = searchParams.get("next");
  const redirectTo: string =
    nextParam === "/citizen" ? "/citizen/dashboard"
    : nextParam === "/mp"     ? "/mp/dashboard"
    : nextParam === "/admin"  ? "/admin/dashboard"
    : "/citizen/dashboard";

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    // DEV MODE: no validation, no credential check — immediately log in
    const user = await authLogin(identifier, password, redirectTo);
    setSuccessMsg(`Welcome, ${user.fullName.split(" ")[0]}! Redirecting…`);
    setTimeout(() => router.push(user.redirectTo), 600);
  };

  const handleSocialLogin = (provider: string) => {
    // Placeholder — no OAuth in frontend-only mode
    void provider;
    router.push(redirectTo);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Logo (mobile only — panel shows on desktop) */}
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

            <form
              onSubmit={handleSignIn}
              noValidate
              className="space-y-4"
            >
              <Input
                id="login-identifier"
                label="Email or Phone"
                type="text"
                autoComplete="username"
                placeholder="you@example.com or 9876543210"
                leftIcon={<Mail size={16} />}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />

              <div className="space-y-1.5">
                <PasswordInput
                  id="login-password"
                  label="Password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <Checkbox
                  id="login-remember"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <Link
                  href="/forgot-password"
                  className="shrink-0 text-sm text-blue-400 transition-colors hover:text-blue-300 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                >
                  Forgot password?
                </Link>
              </div>

              <LoadingButton
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

            {/* Demo hint */}
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.06] px-4 py-3 text-xs text-slate-400">
              <p className="mb-1 font-semibold text-blue-300">Demo credentials</p>
              <p>Admin: <span className="font-mono text-slate-300">admin@janmitra.ai / Admin@123</span></p>
              <p>MP: <span className="font-mono text-slate-300">mp@janmitra.ai / Mp@123</span></p>
              <p>Citizen: <span className="font-mono text-slate-300">citizen@janmitra.ai / Citizen@123</span></p>
            </div>

            {/* Security badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
              <Shield size={12} aria-hidden />
              <span>Secured with 256-bit AES encryption</span>
            </div>

            <Divider label="or continue with" />

            <div className="space-y-2.5">
              <SocialLoginButton
                provider="google"
                onClick={() => handleSocialLogin("Google")}
              />
              <SocialLoginButton
                provider="aadhaar"
                onClick={() => handleSocialLogin("Aadhaar")}
              />
            </div>
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
