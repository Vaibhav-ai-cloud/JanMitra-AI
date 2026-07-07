"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import AuthLayout from "../../../components/auth/AuthLayout";
import AuthCard from "../../../components/auth/AuthCard";
import AuthLogo from "../../../components/auth/AuthLogo";
import LoadingButton from "../../../components/auth/LoadingButton";

type SuccessType = "register" | "password-reset" | "otp" | "email-verified";

const successContent: Record<
  SuccessType,
  { title: string; subtitle: string; cta: string; href: string }
> = {
  register: {
    title: "Account Created!",
    subtitle:
      "Welcome to JanMitra AI. Your account is ready. Explore 200+ government schemes tailored for you.",
    cta: "Go to Dashboard",
    href: "/citizen/dashboard",
  },
  "password-reset": {
    title: "Password Reset!",
    subtitle:
      "Your password has been updated successfully. You can now sign in with your new password.",
    cta: "Sign in now",
    href: "/login",
  },
  otp: {
    title: "Number Verified!",
    subtitle:
      "Your mobile number has been verified. Your account is now fully secured.",
    cta: "Continue",
    href: "/citizen/dashboard",
  },
  "email-verified": {
    title: "Email Verified!",
    subtitle:
      "Your email address has been confirmed. Welcome aboard JanMitra AI!",
    cta: "Get Started",
    href: "/citizen/dashboard",
  },
};

const AUTO_REDIRECT_SECONDS = 5;

// Animated confetti-like particles
function Particles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            y: 0,
            x: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [-20, -80 - Math.random() * 60],
            x: [(Math.random() - 0.5) * 80],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: 1.5 + Math.random() * 0.8,
            delay: i * 0.08,
            ease: "easeOut",
          }}
          className="absolute bottom-1/2 left-1/2 h-1.5 w-1.5 rounded-full"
          style={{
            background: ["#3b82f6", "#22d3ee", "#a78bfa", "#34d399"][i % 4],
          }}
        />
      ))}
    </div>
  );
}

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [type, setType] = useState<SuccessType>("register");
  const [countdown, setCountdown] = useState(AUTO_REDIRECT_SECONDS);

  // Read type from URL search params (client-side)
  useEffect(() => {
    const t = searchParams.get("type") as SuccessType | null;
    if (t && t in successContent) setType(t);
  }, [searchParams]);

  const content = successContent[type];

  // Auto-redirect countdown — fires router.push when countdown reaches 0
  useEffect(() => {
    if (countdown <= 0) {
      router.push(content.href);
      return;
    }
    const timer = setTimeout(() => setCountdown((n) => n - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, content.href, router]);

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="lg:hidden">
          <AuthLogo size="md" />
        </div>

        <AuthCard>
          <div className="relative space-y-6 p-7 sm:p-8 text-center overflow-hidden">
            <Particles />

            {/* Success icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                type: "spring",
                bounce: 0.4,
                delay: 0.1,
              }}
              className="relative mx-auto flex h-20 w-20 items-center justify-center"
              aria-hidden
            >
              {/* Glow ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute inset-0 rounded-full bg-emerald-500/20 blur-lg"
              />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 border-2 border-emerald-500/40">
                <CheckCircle2 size={40} className="text-emerald-400" />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="space-y-2"
            >
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                {content.title}
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                {content.subtitle}
              </p>
            </motion.div>

            {/* Decorative sparkles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-4 text-blue-400/50"
              aria-hidden
            >
              <Sparkles size={16} />
              <Sparkles size={12} className="mt-1" />
              <Sparkles size={16} />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Link href={content.href}>
                <LoadingButton
                  type="button"
                  size="lg"
                  className="w-full"
                >
                  <span className="flex items-center gap-2">
                    {content.cta} <ArrowRight size={16} />
                  </span>
                </LoadingButton>
              </Link>
            </motion.div>

            {/* Auto-redirect notice */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs text-slate-600"
              aria-live="polite"
            >
              Redirecting automatically in{" "}
              <span className="font-mono font-semibold text-slate-500">
                {countdown}s
              </span>
            </motion.p>
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={null}>
      <AuthSuccessContent />
    </Suspense>
  );
}
