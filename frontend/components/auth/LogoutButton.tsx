"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { authLogout } from "../../lib/authStore";
import { cn } from "../../utils/auth";

interface LogoutButtonProps {
  className?: string;
}

const dropdownItemCls =
  "flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors rounded-lg";

/**
 * Shared logout button used inside all three navbar profile menus.
 * Calls authLogout() then redirects to /login.
 */
export default function LogoutButton({ className }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = () => {
    authLogout();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={cn(dropdownItemCls, "w-full text-red-400 hover:text-red-300", className)}
    >
      <LogOut size={16} aria-hidden />
      Sign Out
    </button>
  );
}
