// ── Admin Types ───────────────────────────────────────────────────────────────

export type AdminRole = "super_admin" | "admin" | "moderator" | "viewer";
export type UserStatus = "active" | "inactive" | "suspended" | "pending";
export type UserType = "citizen" | "mp" | "officer" | "admin";
export type DepartmentStatus = "active" | "inactive";
export type SchemeStatus = "active" | "draft" | "closed" | "pending";
export type AdminNotifType = "user" | "complaint" | "scheme" | "system" | "mp";

// ── Admin Profile ─────────────────────────────────────────────────────────────

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: AdminRole;
  avatar?: string;
  department: string;
  joinedAt: string;
  lastLogin: string;
  permissions: string[];
}

// ── User ──────────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: UserType;
  status: UserStatus;
  role: string;
  district: string;
  state: string;
  createdAt: string;
  lastActive: string;
  totalComplaints: number;
  resolvedComplaints: number;
  totalApplications: number;
  isVerified: boolean;
  avatar?: string;
}

// ── MP ────────────────────────────────────────────────────────────────────────

export interface AdminMp {
  id: string;
  name: string;
  party: string;
  constituency: string;
  state: string;
  phone: string;
  email: string;
  termStart: string;
  termEnd: string;
  status: UserStatus;
  totalComplaints: number;
  resolvedComplaints: number;
  totalProjects: number;
  completedProjects: number;
  budget: number;
  spentBudget: number;
  attendanceRate: number;
  questionsRaised: number;
  createdAt: string;
}

// ── Department ────────────────────────────────────────────────────────────────

export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  status: DepartmentStatus;
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  avgResolutionDays: number;
  performanceScore: number;
  createdAt: string;
}

// ── Admin Scheme ──────────────────────────────────────────────────────────────

export interface AdminScheme {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  ministry: string;
  status: SchemeStatus;
  budget: number;
  disbursed: number;
  targetBeneficiaries: number;
  actualBeneficiaries: number;
  totalApplications: number;
  approvedApplications: number;
  pendingApplications: number;
  rejectedApplications: number;
  launchDate: string;
  deadlineDate?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// ── Admin Dashboard Stats ──────────────────────────────────────────────────────

export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalMps: number;
  totalCitizens: number;
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  escalatedComplaints: number;
  totalSchemes: number;
  activeSchemes: number;
  totalApplications: number;
  totalDepartments: number;
  systemUptime: number;
  aiInteractions: number;
}

// ── Admin Notification ────────────────────────────────────────────────────────

export interface AdminNotification {
  id: string;
  type: AdminNotifType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  href?: string;
  severity?: "info" | "warning" | "critical";
}

// ── System Analytics ──────────────────────────────────────────────────────────

export interface SystemMetric {
  month: string;
  users: number;
  complaints: number;
  resolved: number;
  applications: number;
  aiInteractions: number;
}

export interface DepartmentPerformance {
  departmentId: string;
  name: string;
  totalComplaints: number;
  resolvedComplaints: number;
  avgResolutionDays: number;
  performanceScore: number;
  color: string;
}

// ── Report ────────────────────────────────────────────────────────────────────

export type ReportPeriod = "monthly" | "quarterly" | "annual";
export type ReportFormat = "PDF" | "Excel" | "CSV";

export interface AdminReport {
  id: string;
  title: string;
  period: ReportPeriod;
  periodLabel: string;
  generatedAt: string;
  format: ReportFormat;
  size: string;
  category: string;
}
