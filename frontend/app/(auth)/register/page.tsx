"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Phone, User, ArrowRight, Shield } from "lucide-react";
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
import {
  registerSchema,
  type RegisterSchema,
} from "../../../lib/validations/auth";
import type { UserRole } from "../../../types/auth";
import { cn } from "../../../utils/auth";
import { authRegister } from "../../../lib/authStore";

const roleOptions: { value: UserRole; label: string; icon: string; desc: string }[] = [
  { value: "citizen", label: "Citizen",     icon: "🏠",  desc: "Access schemes & services" },
  { value: "mp",      label: "Elected Rep.", icon: "🏛️", desc: "MP / MLA dashboard" },
  { value: "admin",   label: "Admin",       icon: "🛡️", desc: "Platform administration" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg]   = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema) as Parameters<typeof useForm<RegisterSchema>>[0]["resolver"],
    defaultValues: {
      role: "citizen",
      acceptTerms: false,
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password     = watch("password") ?? "";
  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterSchema) => {
    setServerError(null);
    setSuccessMsg(null);
    setIsSubmitting(true);
    try {
      await authRegister({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      });
      setSuccessMsg("Account created! Redirecting to sign in…");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Registration failed. Try again."
      );
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setServerError(`${provider} sign-up is not available in demo mode. Please use email & password.`);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="lg:hidden">
          <AuthLogo size="md" />
        </div>

        <AuthCard>
          <div className="space-y-6 p-7 sm:p-8">
            <AuthHeader
              title="Create your account"
              subtitle="Join millions using JanMitra AI for smart governance"
            />

            {/* Alerts */}
            <SuccessAlert
              show={!!successMsg}
              message={successMsg ?? ""}
              title="Registration successful!"
            />
            <ErrorAlert
              show={!!serverError}
              message={serverError ?? ""}
              title="Registration failed"
            />

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
            >
              {/* Role Selector — now includes Admin */}
              <fieldset>
                <legend className="mb-2 text-sm font-medium text-slate-300">
                  Account Type
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {roleOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setValue("role", opt.value)}
                      aria-pressed={selectedRole === opt.value}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center",
                        "transition-all duration-200 outline-none",
                        "focus-visible:ring-2 focus-visible:ring-blue-500/60",
                        selectedRole === opt.value
                          ? "border-blue-500/60 bg-blue-500/10 text-white"
                          : "border-white/[0.08] bg-white/[0.04] text-slate-400 hover:border-white/20 hover:text-slate-300"
                      )}
                    >
                      <span className="text-lg" aria-hidden>
                        {opt.icon}
                      </span>
                      <span className="text-xs font-semibold">{opt.label}</span>
                      <span className="text-[10px] opacity-75 leading-tight">{opt.desc}</span>
                    </button>
                  ))}
                </div>
                {errors.role && (
                  <p role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.role.message}
                  </p>
                )}
              </fieldset>

              <Input
                id="register-name"
                label="Full Name"
                type="text"
                autoComplete="name"
                placeholder="Rahul Kumar"
                leftIcon={<User size={16} />}
                error={errors.fullName?.message}
                {...register("fullName")}
              />

              <Input
                id="register-email"
                label="Email Address"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                leftIcon={<Mail size={16} />}
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                id="register-phone"
                label="Mobile Number"
                type="tel"
                autoComplete="tel"
                placeholder="98765 43210"
                leftIcon={<Phone size={16} />}
                hint="10-digit Indian mobile number"
                error={errors.phone?.message}
                {...register("phone")}
              />

              <PasswordInput
                id="register-password"
                label="Password"
                autoComplete="new-password"
                placeholder="Create a strong password"
                showStrength
                watchValue={password}
                error={errors.password?.message}
                {...register("password")}
              />

              <PasswordInput
                id="register-confirm"
                label="Confirm Password"
                autoComplete="new-password"
                placeholder="Repeat your password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              {/* Terms */}
              <Checkbox
                id="register-terms"
                label={
                  <>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </Link>
                  </>
                }
                error={errors.acceptTerms?.message}
                {...register("acceptTerms")}
              />

              <LoadingButton
                isLoading={isSubmitting}
                loadingText="Creating account…"
                size="lg"
                className="mt-1"
              >
                <span className="flex items-center gap-2">
                  Create Account <ArrowRight size={16} />
                </span>
              </LoadingButton>
            </form>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
              <Shield size={12} aria-hidden />
              <span>Your data is encrypted and never shared</span>
            </div>

            <Divider label="or sign up with" />

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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-slate-500"
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-400 hover:text-blue-300 transition-colors focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          >
            Sign in
          </Link>
        </motion.p>
      </div>
    </AuthLayout>
  );
}
