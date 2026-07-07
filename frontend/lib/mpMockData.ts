// ── MP Mock Data ─────────────────────────────────────────────────────────────
// Replace with real API calls when backend is ready

import type {
  MpProfile,
  ConstituencyStats,
  MpDashboardStats,
  Project,
  MpCitizen,
  MpSchemeMetric,
  MpReport,
  MonthlyMetric,
  CategoryBreakdown,
  MapMarker,
  MpNotification,
} from "../types/mp";
import type { Complaint } from "../types/complaint";

// ── MP Profile ────────────────────────────────────────────────────────────────

export const mockMpProfile: MpProfile = {
  id: "mp1",
  name: "Arvind Sharma",
  party: "Indian National Congress",
  constituency: "Lucknow",
  state: "Uttar Pradesh",
  termStart: "2024-06-05",
  termEnd: "2029-06-04",
  age: 54,
  education: "LLB, Delhi University",
  phone: "+91-98765-43210",
  email: "arvind.sharma@mp.gov.in",
  website: "https://arvindsharma.mp.in",
  bio: "Arvind Sharma has served the Lucknow constituency for over a decade, focusing on infrastructure development, healthcare access, and digital literacy initiatives for rural citizens.",
  committees: [
    "Standing Committee on Finance",
    "Committee on Energy",
    "Public Accounts Committee",
  ],
  attendanceRate: 87,
  questionsRaised: 142,
  billsIntroduced: 8,
};

// ── Constituency Stats ────────────────────────────────────────────────────────

export const mockConstituencyStats: ConstituencyStats = {
  totalPopulation: 4250000,
  registeredVoters: 2380000,
  villages: 312,
  wards: 110,
  area: 2528,
  literacyRate: 78.2,
  malePopulation: 2210000,
  femalePopulation: 2040000,
  scPopulation: 637500,
  stPopulation: 127500,
  obcPopulation: 1062500,
};

// ── Dashboard Stats ───────────────────────────────────────────────────────────

export const mockMpStats: MpDashboardStats = {
  totalComplaints: 1284,
  resolvedComplaints: 986,
  pendingComplaints: 298,
  escalatedComplaints: 24,
  totalProjects: 68,
  ongoingProjects: 22,
  completedProjects: 41,
  totalBudget: 250000000, // ₹25 Crore
  spentBudget: 178500000, // ₹17.85 Crore
  totalCitizens: 18420,
  schemeBeneficiaries: 12800,
  avgResolutionDays: 12,
};

// ── Monthly Metrics ───────────────────────────────────────────────────────────

export const mockMonthlyMetrics: MonthlyMetric[] = [
  { month: "Jan", complaints: 142, resolved: 120, projects: 4, citizens: 1240 },
  { month: "Feb", complaints: 118, resolved: 98, projects: 3, citizens: 1180 },
  { month: "Mar", complaints: 156, resolved: 134, projects: 5, citizens: 1560 },
  { month: "Apr", complaints: 134, resolved: 110, projects: 6, citizens: 1340 },
  { month: "May", complaints: 168, resolved: 148, projects: 4, citizens: 1680 },
  { month: "Jun", complaints: 145, resolved: 128, projects: 3, citizens: 1450 },
  { month: "Jul", complaints: 176, resolved: 152, projects: 7, citizens: 1760 },
  { month: "Aug", complaints: 139, resolved: 118, projects: 5, citizens: 1390 },
  { month: "Sep", complaints: 162, resolved: 140, projects: 4, citizens: 1620 },
  { month: "Oct", complaints: 148, resolved: 130, projects: 6, citizens: 1480 },
  { month: "Nov", complaints: 122, resolved: 104, projects: 3, citizens: 1220 },
  { month: "Dec", complaints: 174, resolved: 156, projects: 8, citizens: 1740 },
];

// ── Category Breakdowns ───────────────────────────────────────────────────────

export const mockComplaintCategories: CategoryBreakdown[] = [
  { label: "Roads", value: 312, color: "#3b82f6" },
  { label: "Water", value: 248, color: "#22d3ee" },
  { label: "Electricity", value: 196, color: "#f59e0b" },
  { label: "Sanitation", value: 178, color: "#10b981" },
  { label: "Health", value: 142, color: "#a78bfa" },
  { label: "Education", value: 118, color: "#f472b6" },
  { label: "Agriculture", value: 90, color: "#34d399" },
];

export const mockProjectCategories: CategoryBreakdown[] = [
  { label: "Roads", value: 18, color: "#3b82f6" },
  { label: "Water", value: 12, color: "#22d3ee" },
  { label: "Education", value: 10, color: "#a78bfa" },
  { label: "Health", value: 9, color: "#f472b6" },
  { label: "Electricity", value: 8, color: "#f59e0b" },
  { label: "Sanitation", value: 7, color: "#10b981" },
  { label: "Other", value: 4, color: "#64748b" },
];

// ── Projects ──────────────────────────────────────────────────────────────────

export const mockProjects: Project[] = [
  {
    id: "p1",
    title: "NH-28 Four-Lane Road Widening",
    description: "Widening NH-28 from 2 lanes to 4 lanes from Aliganj to Gomti Nagar, covering 12 km, to reduce traffic congestion and improve road safety.",
    category: "roads",
    status: "ongoing",
    fundSource: "MPLADS",
    budget: 45000000,
    spent: 28000000,
    location: "Aliganj to Gomti Nagar",
    district: "Lucknow",
    beneficiaries: 250000,
    startDate: "2024-01-15",
    expectedEndDate: "2024-12-31",
    contractor: "M/s Road Builders Pvt Ltd",
    milestones: [
      { id: "m1", title: "Land acquisition", dueDate: "2024-02-28", completedAt: "2024-02-20", isCompleted: true },
      { id: "m2", title: "Foundation work", dueDate: "2024-05-31", completedAt: "2024-05-28", isCompleted: true },
      { id: "m3", title: "Surface laying", dueDate: "2024-09-30", completedAt: "2024-09-25", isCompleted: true },
      { id: "m4", title: "Final inspection", dueDate: "2024-12-15", isCompleted: false },
    ],
    progress: 75,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-10-15T00:00:00Z",
  },
  {
    id: "p2",
    title: "Gomti Nagar Water Treatment Plant",
    description: "Construction of a 50 MLD water treatment plant to provide clean drinking water to 3 lakh residents in Gomti Nagar and surrounding areas.",
    category: "water",
    status: "tender",
    fundSource: "Central Grant",
    budget: 120000000,
    spent: 5000000,
    location: "Gomti Nagar",
    district: "Lucknow",
    beneficiaries: 300000,
    startDate: "2024-03-01",
    expectedEndDate: "2026-02-28",
    milestones: [
      { id: "m1", title: "DPR Approval", dueDate: "2024-02-15", completedAt: "2024-02-10", isCompleted: true },
      { id: "m2", title: "Tender finalization", dueDate: "2024-04-30", isCompleted: false },
      { id: "m3", title: "Construction start", dueDate: "2024-06-01", isCompleted: false },
    ],
    progress: 8,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
  },
  {
    id: "p3",
    title: "Smart Classrooms — 50 Govt Schools",
    description: "Installation of smart boards, computers, and high-speed internet in 50 government schools across the constituency.",
    category: "education",
    status: "completed",
    fundSource: "MPLADS",
    budget: 25000000,
    spent: 24200000,
    location: "Various locations",
    district: "Lucknow",
    beneficiaries: 48000,
    startDate: "2023-06-01",
    expectedEndDate: "2024-02-28",
    completedAt: "2024-02-15",
    contractor: "M/s DigiEdu Solutions",
    milestones: [
      { id: "m1", title: "Procurement", dueDate: "2023-08-31", completedAt: "2023-08-20", isCompleted: true },
      { id: "m2", title: "Installation — Phase 1", dueDate: "2023-11-30", completedAt: "2023-11-25", isCompleted: true },
      { id: "m3", title: "Installation — Phase 2", dueDate: "2024-02-15", completedAt: "2024-02-15", isCompleted: true },
    ],
    progress: 100,
    createdAt: "2023-05-01T00:00:00Z",
    updatedAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "p4",
    title: "Community Health Centres Upgrade",
    description: "Upgrade of 12 PHCs with new equipment, ambulances, and trained paramedics under PM-ABHIM.",
    category: "health",
    status: "ongoing",
    fundSource: "Central Grant",
    budget: 60000000,
    spent: 22000000,
    location: "12 PHC locations",
    district: "Lucknow",
    beneficiaries: 180000,
    startDate: "2024-04-01",
    expectedEndDate: "2025-03-31",
    milestones: [
      { id: "m1", title: "Equipment procurement", dueDate: "2024-06-30", completedAt: "2024-06-28", isCompleted: true },
      { id: "m2", title: "Renovation — Phase 1", dueDate: "2024-09-30", completedAt: "2024-09-20", isCompleted: true },
      { id: "m3", title: "Renovation — Phase 2", dueDate: "2024-12-31", isCompleted: false },
      { id: "m4", title: "Staff training", dueDate: "2025-02-28", isCompleted: false },
    ],
    progress: 42,
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-09-20T00:00:00Z",
  },
  {
    id: "p5",
    title: "Solar Street Lighting — 500 Villages",
    description: "Installation of 10,000 solar-powered LED street lights across 500 villages in the constituency.",
    category: "electricity",
    status: "delayed",
    fundSource: "MPLADS",
    budget: 35000000,
    spent: 12000000,
    location: "500 villages",
    district: "Lucknow",
    beneficiaries: 620000,
    startDate: "2024-02-01",
    expectedEndDate: "2024-07-31",
    milestones: [
      { id: "m1", title: "Procurement", dueDate: "2024-03-31", completedAt: "2024-04-15", isCompleted: true },
      { id: "m2", title: "Installation — Phase 1 (200 villages)", dueDate: "2024-05-31", completedAt: "2024-07-10", isCompleted: true },
      { id: "m3", title: "Installation — Phase 2 (300 villages)", dueDate: "2024-07-31", isCompleted: false },
    ],
    progress: 38,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-07-10T00:00:00Z",
  },
  {
    id: "p6",
    title: "Sewage Treatment Plant — Rajajipuram",
    description: "Construction of a 30 MLD sewage treatment plant to address sanitation issues in Rajajipuram and neighbouring areas.",
    category: "sanitation",
    status: "planned",
    fundSource: "Smart Cities",
    budget: 80000000,
    spent: 0,
    location: "Rajajipuram",
    district: "Lucknow",
    beneficiaries: 200000,
    startDate: "2024-11-01",
    expectedEndDate: "2026-10-31",
    milestones: [
      { id: "m1", title: "DPR Submission", dueDate: "2024-10-31", isCompleted: false },
    ],
    progress: 0,
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
];

// ── MP Complaints (constituency view) ─────────────────────────────────────────

export const mockMpComplaints: Complaint[] = [
  {
    id: "mc1",
    ticketNumber: "JM-2024-0189",
    title: "Broken sewage pipes flooding residential area",
    description: "The main sewage line on Station Road has been broken for over 3 weeks, causing sewage to overflow onto residential streets. Health hazard for over 500 families.",
    category: "sanitation",
    status: "in_progress",
    priority: "urgent",
    department: "Jal Nigam",
    location: "Station Road, Sector 4",
    district: "Lucknow",
    state: "Uttar Pradesh",
    attachments: [],
    comments: [
      { id: "cm1", author: "Ravi Singh", role: "citizen", message: "Please take urgent action. Children are falling ill.", createdAt: "2024-01-14T08:00:00Z" },
      { id: "cm2", author: "Arvind Sharma (MP)", role: "mp", message: "Escalated to DM. Jal Nigam to respond within 48 hours.", createdAt: "2024-01-15T10:00:00Z" },
    ],
    timeline: [
      { id: "t1", status: "submitted", message: "Complaint submitted", actor: "Ravi Singh", timestamp: "2024-01-13T09:00:00Z", isCompleted: true },
      { id: "t2", status: "acknowledged", message: "Acknowledged by MP Office", actor: "MP Office", timestamp: "2024-01-13T14:00:00Z", isCompleted: true },
      { id: "t3", status: "in_progress", message: "Escalated to DM and Jal Nigam", actor: "Arvind Sharma", timestamp: "2024-01-15T10:00:00Z", isCompleted: true },
    ],
    createdAt: "2024-01-13T09:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    assignedTo: "DM, Lucknow",
    mpName: "Arvind Sharma",
  },
  {
    id: "mc2",
    ticketNumber: "JM-2024-0174",
    title: "No power supply for 5 days — 3 villages",
    description: "Three villages in Sultanpur Road area have been without electricity for 5 consecutive days due to a transformer failure.",
    category: "electricity",
    status: "resolved",
    priority: "high",
    department: "UPPCL",
    location: "Sultanpur Road Villages",
    district: "Lucknow",
    state: "Uttar Pradesh",
    attachments: [],
    comments: [],
    timeline: [
      { id: "t1", status: "submitted", message: "Complaint submitted", actor: "Village Head", timestamp: "2024-01-10T10:00:00Z", isCompleted: true },
      { id: "t2", status: "in_progress", message: "Transformer replacement ordered", actor: "UPPCL", timestamp: "2024-01-11T09:00:00Z", isCompleted: true },
      { id: "t3", status: "resolved", message: "Power restored to all 3 villages", actor: "UPPCL Engineer", timestamp: "2024-01-12T18:00:00Z", isCompleted: true },
    ],
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-12T18:00:00Z",
    resolvedAt: "2024-01-12T18:00:00Z",
    mpName: "Arvind Sharma",
  },
  {
    id: "mc3",
    ticketNumber: "JM-2024-0168",
    title: "School building roof damaged — safety risk",
    description: "The roof of Govt Primary School Rajajipuram Block-C is damaged after recent rains. Classes are suspended due to safety concerns.",
    category: "education",
    status: "in_progress",
    priority: "high",
    department: "Basic Education Dept.",
    location: "Rajajipuram Block-C",
    district: "Lucknow",
    state: "Uttar Pradesh",
    attachments: [],
    comments: [],
    timeline: [
      { id: "t1", status: "submitted", message: "Complaint submitted", actor: "School Principal", timestamp: "2024-01-11T08:00:00Z", isCompleted: true },
      { id: "t2", status: "acknowledged", message: "Inspection scheduled", actor: "PWD", timestamp: "2024-01-12T10:00:00Z", isCompleted: true },
      { id: "t3", status: "in_progress", message: "Repair work started", actor: "PWD Contractor", timestamp: "2024-01-14T09:00:00Z", isCompleted: true },
    ],
    createdAt: "2024-01-11T08:00:00Z",
    updatedAt: "2024-01-14T09:00:00Z",
    mpName: "Arvind Sharma",
  },
  {
    id: "mc4",
    ticketNumber: "JM-2024-0155",
    title: "PHC medicine shortage — Kakori block",
    description: "The Primary Health Centre in Kakori block has been out of essential medicines for diabetics and hypertension patients for 2 weeks.",
    category: "health",
    status: "submitted",
    priority: "urgent",
    department: "Health Department",
    location: "Kakori Block PHC",
    district: "Lucknow",
    state: "Uttar Pradesh",
    attachments: [],
    comments: [],
    timeline: [
      { id: "t1", status: "submitted", message: "Complaint submitted", actor: "PHC Doctor", timestamp: "2024-01-17T09:00:00Z", isCompleted: true },
    ],
    createdAt: "2024-01-17T09:00:00Z",
    updatedAt: "2024-01-17T09:00:00Z",
    mpName: "Arvind Sharma",
  },
  {
    id: "mc5",
    ticketNumber: "JM-2024-0143",
    title: "Pothole on Kanpur Road causing accidents",
    description: "Deep potholes near Charbagh overbridge have caused 3 motorcycle accidents in the past week.",
    category: "roads",
    status: "acknowledged",
    priority: "high",
    department: "PWD",
    location: "Kanpur Road, Charbagh",
    district: "Lucknow",
    state: "Uttar Pradesh",
    attachments: [],
    comments: [],
    timeline: [
      { id: "t1", status: "submitted", message: "Complaint submitted", actor: "Citizen", timestamp: "2024-01-16T11:00:00Z", isCompleted: true },
      { id: "t2", status: "acknowledged", message: "Site inspection scheduled", actor: "PWD", timestamp: "2024-01-17T10:00:00Z", isCompleted: true },
    ],
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
    mpName: "Arvind Sharma",
  },
];

// ── Citizens ──────────────────────────────────────────────────────────────────

export const mockMpCitizens: MpCitizen[] = [
  { id: "cit1", name: "Ravi Singh", phone: "9876543210", email: "ravi@example.com", village: "Aliganj", district: "Lucknow", category: "obc", gender: "male", age: 38, totalComplaints: 4, pendingComplaints: 1, schemesBenefited: 3, registeredAt: "2023-06-10T00:00:00Z", lastActive: "2024-01-17T00:00:00Z" },
  { id: "cit2", name: "Sunita Devi", phone: "9765432109", village: "Kakori", district: "Lucknow", category: "sc", gender: "female", age: 45, totalComplaints: 2, pendingComplaints: 0, schemesBenefited: 5, registeredAt: "2023-08-20T00:00:00Z", lastActive: "2024-01-15T00:00:00Z" },
  { id: "cit3", name: "Manoj Kumar", phone: "9654321098", village: "Chinhat", district: "Lucknow", category: "general", gender: "male", age: 29, totalComplaints: 1, pendingComplaints: 1, schemesBenefited: 1, registeredAt: "2023-09-05T00:00:00Z", lastActive: "2024-01-18T00:00:00Z" },
  { id: "cit4", name: "Priya Verma", phone: "9543210987", email: "priya@example.com", village: "Gomti Nagar", ward: "Ward 48", district: "Lucknow", category: "general", gender: "female", age: 34, totalComplaints: 3, pendingComplaints: 0, schemesBenefited: 2, registeredAt: "2023-07-14T00:00:00Z", lastActive: "2024-01-16T00:00:00Z" },
  { id: "cit5", name: "Hari Prasad", phone: "9432109876", village: "Malihabad", district: "Lucknow", category: "st", gender: "male", age: 52, totalComplaints: 6, pendingComplaints: 2, schemesBenefited: 8, registeredAt: "2023-05-22T00:00:00Z", lastActive: "2024-01-14T00:00:00Z" },
  { id: "cit6", name: "Rekha Sharma", phone: "9321098765", village: "Bakshi Ka Talab", district: "Lucknow", category: "obc", gender: "female", age: 41, totalComplaints: 2, pendingComplaints: 1, schemesBenefited: 4, registeredAt: "2023-10-08T00:00:00Z", lastActive: "2024-01-13T00:00:00Z" },
];

// ── Scheme Metrics ────────────────────────────────────────────────────────────

export const mockMpSchemeMetrics: MpSchemeMetric[] = [
  { schemeId: "s1", schemeName: "PM Awas Yojana - Gramin", category: "Housing", targetBeneficiaries: 12000, actualBeneficiaries: 9840, disbursedAmount: 118080000, pendingApplications: 1240, rejectedApplications: 320, coveragePercent: 82 },
  { schemeId: "s2", schemeName: "Ayushman Bharat PMJAY", category: "Health", targetBeneficiaries: 85000, actualBeneficiaries: 71400, disbursedAmount: 0, pendingApplications: 4200, rejectedApplications: 890, coveragePercent: 84 },
  { schemeId: "s3", schemeName: "PM Kisan Samman Nidhi", category: "Agriculture", targetBeneficiaries: 48000, actualBeneficiaries: 42720, disbursedAmount: 256320000, pendingApplications: 2100, rejectedApplications: 480, coveragePercent: 89 },
  { schemeId: "s4", schemeName: "National Scholarship Portal", category: "Education", targetBeneficiaries: 15000, actualBeneficiaries: 10200, disbursedAmount: 204000000, pendingApplications: 1800, rejectedApplications: 420, coveragePercent: 68 },
  { schemeId: "s5", schemeName: "PM Mudra Yojana", category: "Finance", targetBeneficiaries: 8000, actualBeneficiaries: 5760, disbursedAmount: 288000000, pendingApplications: 920, rejectedApplications: 210, coveragePercent: 72 },
  { schemeId: "s6", schemeName: "Beti Bachao Beti Padhao", category: "Women", targetBeneficiaries: 20000, actualBeneficiaries: 14600, disbursedAmount: 0, pendingApplications: 2800, rejectedApplications: 340, coveragePercent: 73 },
];

// ── Reports ───────────────────────────────────────────────────────────────────

export const mockMpReports: MpReport[] = [
  { id: "r1", title: "Q3 2024 Complaint Summary Report", type: "complaint_summary", period: "Jul–Sep 2024", generatedAt: "2024-10-05T00:00:00Z", size: "2.4 MB", format: "PDF" },
  { id: "r2", title: "Project Progress Report — Oct 2024", type: "project_progress", period: "October 2024", generatedAt: "2024-11-01T00:00:00Z", size: "3.1 MB", format: "PDF" },
  { id: "r3", title: "Scheme Coverage Analysis 2024", type: "scheme_coverage", period: "Jan–Oct 2024", generatedAt: "2024-11-05T00:00:00Z", size: "1.8 MB", format: "Excel" },
  { id: "r4", title: "MPLADS Budget Utilization Report", type: "budget_utilization", period: "FY 2024–25", generatedAt: "2024-10-31T00:00:00Z", size: "1.2 MB", format: "PDF" },
  { id: "r5", title: "Citizen Engagement Statistics — Q3", type: "citizen_engagement", period: "Jul–Sep 2024", generatedAt: "2024-10-08T00:00:00Z", size: "980 KB", format: "CSV" },
  { id: "r6", title: "Q2 2024 Complaint Summary Report", type: "complaint_summary", period: "Apr–Jun 2024", generatedAt: "2024-07-03T00:00:00Z", size: "2.2 MB", format: "PDF" },
];

// ── Map Markers ───────────────────────────────────────────────────────────────

export const mockMapMarkers: MapMarker[] = [
  { id: "mm1", type: "complaint", title: "Sewage overflow — Station Road", lat: 26.847, lng: 80.947, status: "in_progress", district: "Lucknow" },
  { id: "mm2", type: "project", title: "NH-28 Road Widening", lat: 26.865, lng: 80.932, status: "ongoing", district: "Lucknow" },
  { id: "mm3", type: "project", title: "Water Treatment Plant", lat: 26.853, lng: 80.975, status: "tender", district: "Lucknow" },
  { id: "mm4", type: "complaint", title: "Power outage — Sultanpur Road", lat: 26.821, lng: 80.998, status: "resolved", district: "Lucknow" },
  { id: "mm5", type: "scheme", title: "PMAY-G beneficiaries", lat: 26.878, lng: 80.914, status: "open", district: "Lucknow" },
  { id: "mm6", type: "project", title: "Smart Classrooms", lat: 26.836, lng: 80.958, status: "completed", district: "Lucknow" },
  { id: "mm7", type: "complaint", title: "School roof damage", lat: 26.842, lng: 80.923, status: "in_progress", district: "Lucknow" },
  { id: "mm8", type: "scheme", title: "PM Kisan beneficiaries", lat: 26.891, lng: 80.889, status: "open", district: "Lucknow" },
];

// ── Notifications ─────────────────────────────────────────────────────────────

export const mockMpNotifications: MpNotification[] = [
  { id: "mn1", type: "complaint", title: "New Urgent Complaint", message: "A new urgent complaint (JM-2024-0189) has been filed about sewage overflow in Station Road.", isRead: false, createdAt: "2024-01-17T09:00:00Z", href: "/mp/complaints/mc1" },
  { id: "mn2", type: "project", title: "Project Milestone Due", message: "NH-28 Road Widening project: Final Inspection milestone is due in 5 days.", isRead: false, createdAt: "2024-01-16T10:00:00Z", href: "/mp/projects/p1" },
  { id: "mn3", type: "scheme", title: "Scheme Coverage Low", message: "NSP Scholarship scheme coverage is below 70% in Kakori block. Intervention recommended.", isRead: false, createdAt: "2024-01-15T14:00:00Z", href: "/mp/schemes" },
  { id: "mn4", type: "citizen", title: "New Citizen Registered", message: "64 new citizens registered on JanMitra AI this week from your constituency.", isRead: true, createdAt: "2024-01-14T09:00:00Z", href: "/mp/citizens" },
  { id: "mn5", type: "system", title: "Monthly Report Ready", message: "Your October 2024 project progress report has been generated and is ready to download.", isRead: true, createdAt: "2024-11-01T08:00:00Z", href: "/mp/reports" },
];
