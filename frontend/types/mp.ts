// ── MP (Member of Parliament) Types ─────────────────────────────────────────

export type ProjectStatus =
  | "planned"
  | "tender"
  | "ongoing"
  | "completed"
  | "delayed"
  | "cancelled";

export type ProjectCategory =
  | "roads"
  | "water"
  | "electricity"
  | "health"
  | "education"
  | "sanitation"
  | "housing"
  | "agriculture"
  | "digitization"
  | "other";

export type FundSource =
  | "MPLADS"
  | "State Budget"
  | "Central Grant"
  | "PPP"
  | "Smart Cities"
  | "Other";

// ── Constituency ──────────────────────────────────────────────────────────────

export interface ConstituencyStats {
  totalPopulation: number;
  registeredVoters: number;
  villages: number;
  wards: number;
  area: number; // sq km
  literacyRate: number;
  malePopulation: number;
  femalePopulation: number;
  scPopulation: number;
  stPopulation: number;
  obcPopulation: number;
}

// ── MP Profile ────────────────────────────────────────────────────────────────

export interface MpProfile {
  id: string;
  name: string;
  party: string;
  constituency: string;
  state: string;
  termStart: string;
  termEnd: string;
  age: number;
  education: string;
  phone: string;
  email: string;
  website?: string;
  avatar?: string;
  bio: string;
  committees: string[];
  attendanceRate: number;
  questionsRaised: number;
  billsIntroduced: number;
}

// ── Projects ──────────────────────────────────────────────────────────────────

export interface ProjectMilestone {
  id: string;
  title: string;
  dueDate: string;
  completedAt?: string;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  fundSource: FundSource;
  budget: number;
  spent: number;
  location: string;
  district: string;
  beneficiaries: number;
  startDate: string;
  expectedEndDate: string;
  completedAt?: string;
  contractor?: string;
  milestones: ProjectMilestone[];
  progress: number; // 0–100
  createdAt: string;
  updatedAt: string;
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export interface MonthlyMetric {
  month: string; // "Jan", "Feb" …
  complaints: number;
  resolved: number;
  projects: number;
  citizens: number;
}

export interface CategoryBreakdown {
  label: string;
  value: number;
  color: string;
}

export interface MpDashboardStats {
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  escalatedComplaints: number;
  totalProjects: number;
  ongoingProjects: number;
  completedProjects: number;
  totalBudget: number;
  spentBudget: number;
  totalCitizens: number;
  schemeBeneficiaries: number;
  avgResolutionDays: number;
}

// ── Citizen (MP view) ─────────────────────────────────────────────────────────

export interface MpCitizen {
  id: string;
  name: string;
  phone: string;
  email?: string;
  village: string;
  ward?: string;
  district: string;
  category: "general" | "obc" | "sc" | "st";
  gender: "male" | "female" | "other";
  age: number;
  totalComplaints: number;
  pendingComplaints: number;
  schemesBenefited: number;
  registeredAt: string;
  lastActive: string;
}

// ── Scheme Monitoring ─────────────────────────────────────────────────────────

export interface MpSchemeMetric {
  schemeId: string;
  schemeName: string;
  category: string;
  targetBeneficiaries: number;
  actualBeneficiaries: number;
  disbursedAmount: number;
  pendingApplications: number;
  rejectedApplications: number;
  coveragePercent: number;
}

// ── Report ────────────────────────────────────────────────────────────────────

export type ReportType =
  | "complaint_summary"
  | "project_progress"
  | "scheme_coverage"
  | "budget_utilization"
  | "citizen_engagement";

export interface MpReport {
  id: string;
  title: string;
  type: ReportType;
  period: string;
  generatedAt: string;
  size: string;
  format: "PDF" | "Excel" | "CSV";
}

// ── Map Marker ────────────────────────────────────────────────────────────────

export type MarkerType = "complaint" | "project" | "scheme";

export interface MapMarker {
  id: string;
  type: MarkerType;
  title: string;
  lat: number;
  lng: number;
  status: string;
  district: string;
}

// ── Notification ──────────────────────────────────────────────────────────────

export interface MpNotification {
  id: string;
  type: "complaint" | "project" | "scheme" | "system" | "citizen";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  href?: string;
}
