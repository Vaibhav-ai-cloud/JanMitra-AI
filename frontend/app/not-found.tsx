import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export const metadata = {
  title: "404 — Page Not Found | JanMitra AI",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#080e1c] px-6 py-24 text-center">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      {/* 404 display */}
      <div className="mb-6 text-[10rem] font-black leading-none tracking-tighter text-white/5 select-none sm:text-[14rem]">
        404
      </div>

      <div className="-mt-16 flex flex-col items-center sm:-mt-24">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
          <Search size={14} aria-hidden />
          Page not found
        </div>

        {/* Heading */}
        <h1 className="mb-4 text-4xl font-black text-white sm:text-5xl">
          Oops! Lost in transit
        </h1>

        {/* Description */}
        <p className="mb-10 max-w-md text-base leading-7 text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080e1c]"
          >
            <Home size={15} aria-hidden />
            Go to homepage
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 backdrop-blur-sm transition-all hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
          >
            <ArrowLeft size={15} aria-hidden />
            Sign in
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
          {[
            { label: "Features", href: "/#features" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-slate-400 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
