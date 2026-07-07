// ── Citizen Types ────────────────────────────────────────────────────────────

import type { AuthUser } from "./auth";

export interface CitizenProfile extends AuthUser {
  aadhaarNumber?: string;
  panNumber?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  address?: CitizenAddress;
  constituency?: string;
  district?: string;
  state?: string;
  pincode?: string;
  occupation?: string;
  annualIncome?: number;
  category?: "general" | "obc" | "sc" | "st";
}

export interface CitizenAddress {
  line1: string;
  line2?: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  country: string;
}

export interface DashboardStats {
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  activeApplications: number;
  bookmarkedSchemes: number;
  aiChatsCount: number;
}

export interface Notification {
  id: string;
  type: "complaint" | "scheme" | "application" | "ai" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  href?: string;
  icon?: string;
}

export interface UpcomingDeadline {
  id: string;
  title: string;
  type: "scheme" | "application" | "renewal";
  deadline: string;
  daysLeft: number;
  schemeId?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  href: string;
  color: string;
}
