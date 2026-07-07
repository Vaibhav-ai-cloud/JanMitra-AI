import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your JanMitra AI citizen dashboard — manage complaints, discover schemes, and track applications.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
