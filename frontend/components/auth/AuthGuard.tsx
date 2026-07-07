"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getSession } from "../../lib/authStore";
import type { UserRole } from "../../types/auth";

interface AuthGuardProps {
  /** Which role must be logged in to access this area */
  requiredRole: UserRole;
  children: React.ReactNode;
}

/**
 * Client-side route protection using LocalStorage session.
 *
 * If not logged in → redirect to /login
 * If logged in with wrong role → redirect to the correct dashboard
 * If logged in with correct role → render children
 */
export default function AuthGuard({ requiredRole, children }: AuthGuardProps) {
  const router   = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const session = getSession();

    if (!session) {
      // Not logged in → send to login with return URL
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (session.role !== requiredRole) {
      // Logged in but wrong role → redirect to their own dashboard
      router.replace(session.redirectTo);
      return;
    }

    setAllowed(true);
  }, [pathname, requiredRole, router]);

  if (!allowed) {
    // Show nothing (or a spinner) while the redirect check runs
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-[#080e1c]"
        role="status"
        aria-label="Checking authentication"
      >
        <div className="relative flex h-14 w-14 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500/30" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/35">
            <span className="text-lg font-black text-white" aria-hidden>JM</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
