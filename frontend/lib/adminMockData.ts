// ── Admin Mock Data ───────────────────────────────────────────────────────────
// Replace with real API calls when backend is ready

import type {
  AdminProfile,
  AdminUser,
  AdminMp,
  Department,
  AdminScheme,
  AdminDashboardStats,
  AdminNotification,
  SystemMetric,
  DepartmentPerformance,
  AdminReport,
} from "../types/admin";

// ── Admin Profile ─────────────────────────────────────────────────────────────

export const mockAdminProfile: AdminProfile = {
  id: "admin1",
  name: "Sanjay Mehta",
  email: "sanjay.mehta@janmitra.gov.in",
  phone: "+91-98110-55432",
  role: "super_admin",
  department: "Digital India Directorate",
  joinedAt: "2023-01-15T00:00:00Z",
  lastLogin: "2024-01-18T09:32:00Z",
  permissions: [
    "users.read", "users.write", "users.delete",
    "complaints.read", "complaints.write",
    "schemes.read", "schemes.write",
    "reports.read", "reports.generate",
    "mps.read", "mps.write",
    "departments.read", "departments.write",
    "settings.read", "settings.write",
    "analytics.read",
  ],
};

// ── Dashboard Stats ───────────────────────────────────────────────────────────

export const mockAdminStats: AdminDashboardStats = {
  totalUsers: 284720,
  activeUsers: 218560,
  totalMps: 543,
  totalCitizens: 283142,
  totalComplaints: 182430,
  resolvedComplaints: 154820,
  pendingComplaints: 21630,
  escalatedComplaints: 5980,
  totalSchemes: 124,
  activeSchemes: 88,
  totalApplications: 1482000,
  totalDepartments: 48,
  systemUptime: 99.7,
  aiInteractions: 1240000,
};

// ── System Metrics (monthly) ──────────────────────────────────────────────────

export const mockSystemMetrics: SystemMetric[] = [
  { month: "Jan", users: 18420, complaints: 12840, resolved: 10920, applications: 84200, aiInteractions: 78000 },
  { month: "Feb", users: 22150, complaints: 14200, resolved: 12400, applications: 91000, aiInteractions: 88000 },
  { month: "Mar", users: 25480, complaints: 16800, resolved: 14820, applications: 108000, aiInteractions: 102000 },
  { month: "Apr", users: 28940, complaints: 18200, resolved: 16100, applications: 118000, aiInteractions: 112000 },
  { month: "May", users: 32100, complaints: 19800, resolved: 17400, applications: 128000, aiInteractions: 124000 },
  { month: "Jun", users: 35680, complaints: 21200, resolved: 18900, applications: 142000, aiInteractions: 138000 },
  { month: "Jul", users: 39200, complaints: 22800, resolved: 20100, applications: 158000, aiInteractions: 152000 },
  { month: "Aug", users: 42800, complaints: 23400, resolved: 21200, applications: 168000, aiInteractions: 164000 },
  { month: "Sep", users: 46100, complaints: 24100, resolved: 22000, applications: 178000, aiInteractions: 174000 },
  { month: "Oct", users: 49800, complaints: 25800, resolved: 23400, applications: 194000, aiInteractions: 188000 },
  { month: "Nov", users: 52400, complaints: 24200, resolved: 22800, applications: 200000, aiInteractions: 196000 },
  { month: "Dec", users: 56200, complaints: 26800, resolved: 24580, applications: 212000, aiInteractions: 208000 },
];

// ── Department Performance ────────────────────────────────────────────────────

export const mockDepartmentPerformance: DepartmentPerformance[] = [
  { departmentId: "d1", name: "Jal Nigam", totalComplaints: 28420, resolvedComplaints: 24180, avgResolutionDays: 8, performanceScore: 85, color: "#22d3ee" },
  { departmentId: "d2", name: "PWD", totalComplaints: 34100, resolvedComplaints: 28400, avgResolutionDays: 12, performanceScore: 83, color: "#3b82f6" },
  { departmentId: "d3", name: "UPPCL", totalComplaints: 22800, resolvedComplaints: 20100, avgResolutionDays: 6, performanceScore: 88, color: "#f59e0b" },
  { departmentId: "d4", name: "Health Dept.", totalComplaints: 18200, resolvedComplaints: 14800, avgResolutionDays: 14, performanceScore: 81, color: "#f472b6" },
  { departmentId: "d5", name: "Education Dept.", totalComplaints: 14100, resolvedComplaints: 12400, avgResolutionDays: 9, performanceScore: 88, color: "#a78bfa" },
  { departmentId: "d6", name: "Municipal Corp.", totalComplaints: 31200, resolvedComplaints: 25800, avgResolutionDays: 11, performanceScore: 83, color: "#10b981" },
];

// ── Users ─────────────────────────────────────────────────────────────────────

export const mockAdminUsers: AdminUser[] = [
  { id: "u1", name: "Rahul Kumar", email: "rahul@example.com", phone: "9876543210", type: "citizen", status: "active", role: "Citizen", district: "Lucknow", state: "Uttar Pradesh", createdAt: "2023-06-15T00:00:00Z", lastActive: "2024-01-18T00:00:00Z", totalComplaints: 12, resolvedComplaints: 9, totalApplications: 4, isVerified: true },
  { id: "u2", name: "Priya Verma", email: "priya@example.com", phone: "9765432109", type: "citizen", status: "active", role: "Citizen", district: "Agra", state: "Uttar Pradesh", createdAt: "2023-07-20T00:00:00Z", lastActive: "2024-01-17T00:00:00Z", totalComplaints: 6, resolvedComplaints: 5, totalApplications: 2, isVerified: true },
  { id: "u3", name: "Arvind Sharma", email: "arvind@mp.gov.in", phone: "9654321098", type: "mp", status: "active", role: "Member of Parliament", district: "Lucknow", state: "Uttar Pradesh", createdAt: "2024-06-10T00:00:00Z", lastActive: "2024-01-18T00:00:00Z", totalComplaints: 0, resolvedComplaints: 0, totalApplications: 0, isVerified: true },
  { id: "u4", name: "Kavita Singh", email: "kavita@example.com", phone: "9543210987", type: "citizen", status: "suspended", role: "Citizen", district: "Varanasi", state: "Uttar Pradesh", createdAt: "2023-09-05T00:00:00Z", lastActive: "2024-01-10T00:00:00Z", totalComplaints: 28, resolvedComplaints: 18, totalApplications: 7, isVerified: false },
  { id: "u5", name: "Suresh Patel", email: "suresh@example.com", phone: "9432109876", type: "officer", status: "active", role: "District Officer", district: "Kanpur", state: "Uttar Pradesh", createdAt: "2023-08-12T00:00:00Z", lastActive: "2024-01-16T00:00:00Z", totalComplaints: 0, resolvedComplaints: 0, totalApplications: 0, isVerified: true },
  { id: "u6", name: "Neha Gupta", email: "neha@example.com", phone: "9321098765", type: "citizen", status: "pending", role: "Citizen", district: "Allahabad", state: "Uttar Pradesh", createdAt: "2024-01-15T00:00:00Z", lastActive: "2024-01-15T00:00:00Z", totalComplaints: 1, resolvedComplaints: 0, totalApplications: 1, isVerified: false },
  { id: "u7", name: "Ramesh Yadav", email: "ramesh@example.com", phone: "9210987654", type: "citizen", status: "active", role: "Citizen", district: "Meerut", state: "Uttar Pradesh", createdAt: "2023-05-10T00:00:00Z", lastActive: "2024-01-14T00:00:00Z", totalComplaints: 5, resolvedComplaints: 4, totalApplications: 3, isVerified: true },
  { id: "u8", name: "Anita Sharma", email: "anita@example.com", phone: "9109876543", type: "citizen", status: "inactive", role: "Citizen", district: "Bareilly", state: "Uttar Pradesh", createdAt: "2023-04-22T00:00:00Z", lastActive: "2023-11-20T00:00:00Z", totalComplaints: 2, resolvedComplaints: 2, totalApplications: 1, isVerified: true },
];

// ── MPs ───────────────────────────────────────────────────────────────────────

export const mockAdminMps: AdminMp[] = [
  { id: "mp1", name: "Arvind Sharma", party: "INC", constituency: "Lucknow", state: "Uttar Pradesh", phone: "+91-98765-43210", email: "arvind@mp.gov.in", termStart: "2024-06-05", termEnd: "2029-06-04", status: "active", totalComplaints: 1284, resolvedComplaints: 986, totalProjects: 68, completedProjects: 41, budget: 250000000, spentBudget: 178500000, attendanceRate: 87, questionsRaised: 142, createdAt: "2024-06-05T00:00:00Z" },
  { id: "mp2", name: "Sunita Devi", party: "BJP", constituency: "Varanasi", state: "Uttar Pradesh", phone: "+91-98654-32109", email: "sunita@mp.gov.in", termStart: "2024-06-05", termEnd: "2029-06-04", status: "active", totalComplaints: 984, resolvedComplaints: 812, totalProjects: 54, completedProjects: 38, budget: 200000000, spentBudget: 142000000, attendanceRate: 92, questionsRaised: 118, createdAt: "2024-06-05T00:00:00Z" },
  { id: "mp3", name: "Rakesh Tiwari", party: "SP", constituency: "Agra", state: "Uttar Pradesh", phone: "+91-98543-21098", email: "rakesh@mp.gov.in", termStart: "2024-06-05", termEnd: "2029-06-04", status: "active", totalComplaints: 1102, resolvedComplaints: 798, totalProjects: 42, completedProjects: 28, budget: 180000000, spentBudget: 98000000, attendanceRate: 78, questionsRaised: 96, createdAt: "2024-06-05T00:00:00Z" },
  { id: "mp4", name: "Meena Patel", party: "BSP", constituency: "Kanpur", state: "Uttar Pradesh", phone: "+91-98432-10987", email: "meena@mp.gov.in", termStart: "2024-06-05", termEnd: "2029-06-04", status: "active", totalComplaints: 876, resolvedComplaints: 720, totalProjects: 36, completedProjects: 22, budget: 160000000, spentBudget: 88000000, attendanceRate: 84, questionsRaised: 88, createdAt: "2024-06-05T00:00:00Z" },
  { id: "mp5", name: "Vijay Singh", party: "INC", constituency: "Allahabad", state: "Uttar Pradesh", phone: "+91-98321-09876", email: "vijay@mp.gov.in", termStart: "2024-06-05", termEnd: "2029-06-04", status: "inactive", totalComplaints: 542, resolvedComplaints: 380, totalProjects: 28, completedProjects: 14, budget: 140000000, spentBudget: 62000000, attendanceRate: 65, questionsRaised: 42, createdAt: "2024-06-05T00:00:00Z" },
];

// ── Departments ───────────────────────────────────────────────────────────────

export const mockDepartments: Department[] = [
  { id: "d1", name: "Jal Nigam", code: "JN", head: "Mr. Ramesh Verma", email: "jalnigam@up.gov.in", phone: "0522-2238756", state: "Uttar Pradesh", district: "Lucknow", status: "active", totalComplaints: 28420, resolvedComplaints: 24180, pendingComplaints: 4240, avgResolutionDays: 8, performanceScore: 85, createdAt: "2022-04-01T00:00:00Z" },
  { id: "d2", name: "Public Works Department", code: "PWD", head: "Mr. Sunil Srivastava", email: "pwd@up.gov.in", phone: "0522-2220148", state: "Uttar Pradesh", district: "Lucknow", status: "active", totalComplaints: 34100, resolvedComplaints: 28400, pendingComplaints: 5700, avgResolutionDays: 12, performanceScore: 83, createdAt: "2022-04-01T00:00:00Z" },
  { id: "d3", name: "UPPCL (Power Corp.)", code: "UPPCL", head: "Mr. Anil Kumar", email: "uppcl@up.gov.in", phone: "0522-2207652", state: "Uttar Pradesh", district: "Lucknow", status: "active", totalComplaints: 22800, resolvedComplaints: 20100, pendingComplaints: 2700, avgResolutionDays: 6, performanceScore: 88, createdAt: "2022-04-01T00:00:00Z" },
  { id: "d4", name: "Health Department", code: "HLTH", head: "Dr. Kavita Singh", email: "health@up.gov.in", phone: "0522-2237802", state: "Uttar Pradesh", district: "Lucknow", status: "active", totalComplaints: 18200, resolvedComplaints: 14800, pendingComplaints: 3400, avgResolutionDays: 14, performanceScore: 81, createdAt: "2022-04-01T00:00:00Z" },
  { id: "d5", name: "Education Department", code: "EDU", head: "Mr. Ravi Shankar", email: "edu@up.gov.in", phone: "0522-2239012", state: "Uttar Pradesh", district: "Lucknow", status: "active", totalComplaints: 14100, resolvedComplaints: 12400, pendingComplaints: 1700, avgResolutionDays: 9, performanceScore: 88, createdAt: "2022-04-01T00:00:00Z" },
  { id: "d6", name: "Municipal Corporation", code: "MC", head: "Mr. Deepak Pandey", email: "municipal@lmc.up.nic.in", phone: "0522-2623100", state: "Uttar Pradesh", district: "Lucknow", status: "active", totalComplaints: 31200, resolvedComplaints: 25800, pendingComplaints: 5400, avgResolutionDays: 11, performanceScore: 83, createdAt: "2022-04-01T00:00:00Z" },
  { id: "d7", name: "Agriculture Department", code: "AGRI", head: "Mr. Satish Dwivedi", email: "agri@up.gov.in", phone: "0522-2204082", state: "Uttar Pradesh", district: "Lucknow", status: "inactive", totalComplaints: 8400, resolvedComplaints: 6200, pendingComplaints: 2200, avgResolutionDays: 18, performanceScore: 74, createdAt: "2022-04-01T00:00:00Z" },
];

// ── Schemes ───────────────────────────────────────────────────────────────────

export const mockAdminSchemes: AdminScheme[] = [
  { id: "s1", title: "Pradhan Mantri Awas Yojana - Gramin", shortTitle: "PMAY-G", description: "Housing for all — financial assistance for rural housing construction.", category: "Housing", ministry: "MoRD", status: "active", budget: 12000000000, disbursed: 9840000000, targetBeneficiaries: 12000000, actualBeneficiaries: 9840000, totalApplications: 14200000, approvedApplications: 9840000, pendingApplications: 1240000, rejectedApplications: 3120000, launchDate: "2016-11-20", deadlineDate: "2024-12-31", createdAt: "2023-01-01T00:00:00Z", updatedAt: "2024-01-10T00:00:00Z", createdBy: "MoRD" },
  { id: "s2", title: "Ayushman Bharat PMJAY", shortTitle: "AB-PMJAY", description: "World's largest health insurance — ₹5 lakh coverage per family.", category: "Health", ministry: "MoHFW", status: "active", budget: 50000000000, disbursed: 0, targetBeneficiaries: 500000000, actualBeneficiaries: 420000000, totalApplications: 550000000, approvedApplications: 420000000, pendingApplications: 42000000, rejectedApplications: 88000000, launchDate: "2018-09-23", createdAt: "2023-01-01T00:00:00Z", updatedAt: "2024-01-12T00:00:00Z", createdBy: "MoHFW" },
  { id: "s3", title: "PM Kisan Samman Nidhi", shortTitle: "PM-KISAN", description: "Direct income support of ₹6000/year for farmer families.", category: "Agriculture", ministry: "MoA", status: "active", budget: 75000000000, disbursed: 64000000000, targetBeneficiaries: 120000000, actualBeneficiaries: 108000000, totalApplications: 128000000, approvedApplications: 108000000, pendingApplications: 8200000, rejectedApplications: 11800000, launchDate: "2019-02-01", createdAt: "2023-01-01T00:00:00Z", updatedAt: "2024-01-14T00:00:00Z", createdBy: "MoA" },
  { id: "s4", title: "National Scholarship Portal", shortTitle: "NSP", description: "Scholarships for meritorious students from economically weaker sections.", category: "Education", ministry: "MoE", status: "active", budget: 8000000000, disbursed: 5400000000, targetBeneficiaries: 8000000, actualBeneficiaries: 5400000, totalApplications: 9200000, approvedApplications: 5400000, pendingApplications: 1200000, rejectedApplications: 2600000, launchDate: "2015-07-01", deadlineDate: "2025-03-31", createdAt: "2023-01-01T00:00:00Z", updatedAt: "2024-01-08T00:00:00Z", createdBy: "MoE" },
  { id: "s5", title: "PM Mudra Yojana", shortTitle: "PMMY", description: "Micro enterprise funding up to ₹10 lakh for non-corporate businesses.", category: "Finance", ministry: "MoF", status: "active", budget: 30000000000, disbursed: 24000000000, targetBeneficiaries: 60000000, actualBeneficiaries: 48000000, totalApplications: 68000000, approvedApplications: 48000000, pendingApplications: 6200000, rejectedApplications: 13800000, launchDate: "2015-04-08", createdAt: "2023-01-01T00:00:00Z", updatedAt: "2024-01-15T00:00:00Z", createdBy: "MoF" },
  { id: "s6", title: "Digital Literacy Mission", shortTitle: "DLM", description: "Making rural India digitally literate — 60 million households.", category: "Digital", ministry: "MeitY", status: "draft", budget: 5000000000, disbursed: 0, targetBeneficiaries: 60000000, actualBeneficiaries: 0, totalApplications: 0, approvedApplications: 0, pendingApplications: 0, rejectedApplications: 0, launchDate: "2025-04-01", createdAt: "2024-01-10T00:00:00Z", updatedAt: "2024-01-18T00:00:00Z", createdBy: "MeitY" },
];

// ── Notifications ─────────────────────────────────────────────────────────────

export const mockAdminNotifications: AdminNotification[] = [
  { id: "an1", type: "system", title: "System Alert", message: "Database backup completed successfully for Jan 17, 2024.", isRead: false, createdAt: "2024-01-17T23:00:00Z", severity: "info" },
  { id: "an2", type: "complaint", title: "Surge Detected", message: "25% spike in complaints from Varanasi district in last 24 hours.", isRead: false, createdAt: "2024-01-17T10:00:00Z", href: "/admin/complaints", severity: "warning" },
  { id: "an3", type: "user", title: "New MP Registered", message: "MP Meena Patel (Kanpur) has completed profile setup.", isRead: false, createdAt: "2024-01-16T14:00:00Z", href: "/admin/mps", severity: "info" },
  { id: "an4", type: "scheme", title: "Scheme Deadline", message: "PMAY-G application deadline in 14 days.", isRead: true, createdAt: "2024-01-15T09:00:00Z", href: "/admin/schemes", severity: "warning" },
  { id: "an5", type: "system", title: "API Response Slow", message: "AI chatbot API latency above threshold (850ms avg).", isRead: true, createdAt: "2024-01-14T16:00:00Z", severity: "critical" },
];

// ── Reports ───────────────────────────────────────────────────────────────────

export const mockAdminReports: AdminReport[] = [
  { id: "r1", title: "Q4 2024 System Report", period: "quarterly", periodLabel: "Oct–Dec 2024", generatedAt: "2025-01-05T00:00:00Z", format: "PDF", size: "4.8 MB", category: "System" },
  { id: "r2", title: "December 2024 User Growth Report", period: "monthly", periodLabel: "December 2024", generatedAt: "2025-01-02T00:00:00Z", format: "PDF", size: "2.1 MB", category: "Users" },
  { id: "r3", title: "Annual Complaints Analysis 2024", period: "annual", periodLabel: "January–December 2024", generatedAt: "2025-01-10T00:00:00Z", format: "Excel", size: "6.2 MB", category: "Complaints" },
  { id: "r4", title: "Q3 2024 Scheme Coverage Report", period: "quarterly", periodLabel: "Jul–Sep 2024", generatedAt: "2024-10-05T00:00:00Z", format: "PDF", size: "3.4 MB", category: "Schemes" },
  { id: "r5", title: "November 2024 Department Performance", period: "monthly", periodLabel: "November 2024", generatedAt: "2024-12-03T00:00:00Z", format: "Excel", size: "1.8 MB", category: "Departments" },
  { id: "r6", title: "FY 2024–25 Budget Utilization", period: "annual", periodLabel: "Apr 2024–Mar 2025", generatedAt: "2024-10-31T00:00:00Z", format: "CSV", size: "980 KB", category: "Finance" },
];
