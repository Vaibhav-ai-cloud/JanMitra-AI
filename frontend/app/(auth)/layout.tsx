import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Sign In | JanMitra AI",
    template: "%s | JanMitra AI",
  },
  description:
    "Sign in or create your JanMitra AI account to access India's premier AI-powered citizen governance platform.",
  robots: { index: false, follow: false },
};

export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
