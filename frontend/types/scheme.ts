// ── Government Scheme Types ───────────────────────────────────────────────────

export type SchemeCategory =
  | "health"
  | "education"
  | "housing"
  | "agriculture"
  | "employment"
  | "finance"
  | "women"
  | "senior_citizen"
  | "disability"
  | "youth"
  | "infrastructure"
  | "other";

export type SchemeStatus = "open" | "closed" | "upcoming";

export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "disbursed";

export interface SchemeEligibility {
  age?: { min?: number; max?: number };
  income?: number;
  category?: ("general" | "obc" | "sc" | "st")[];
  gender?: "all" | "male" | "female";
  state?: string[];
  occupation?: string[];
  description: string;
}

export interface SchemeBenefit {
  type: "cash" | "kind" | "subsidy" | "insurance" | "loan";
  amount?: number;
  description: string;
}

export interface SchemeDocument {
  name: string;
  required: boolean;
  description?: string;
}

export interface Scheme {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  category: SchemeCategory;
  ministry: string;
  launchDate: string;
  deadlineDate?: string;
  status: SchemeStatus;
  eligibility: SchemeEligibility;
  benefits: SchemeBenefit[];
  documents: SchemeDocument[];
  applicationUrl?: string;
  isBookmarked: boolean;
  isEligible?: boolean;
  applicantsCount?: number;
  successRate?: number;
  tags: string[];
}

export interface SchemeApplication {
  id: string;
  schemeId: string;
  schemeName: string;
  schemeCategory: SchemeCategory;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
  referenceNumber: string;
  expectedAmount?: number;
  remarks?: string;
}

export interface SchemeFilters {
  category?: SchemeCategory;
  status?: SchemeStatus;
  eligibleOnly?: boolean;
  search?: string;
  bookmarkedOnly?: boolean;
}
