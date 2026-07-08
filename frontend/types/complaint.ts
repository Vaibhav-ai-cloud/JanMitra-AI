// ── Complaint Types ───────────────────────────────────────────────────────────

export type ComplaintStatus =
  | "draft"
  | "submitted"
  | "acknowledged"
  | "in_progress"
  | "resolved"
  | "closed"
  | "rejected";

export type ComplaintPriority = "low" | "medium" | "high" | "urgent";

export type ComplaintCategory =
  | "infrastructure"
  | "water"
  | "electricity"
  | "roads"
  | "sanitation"
  | "health"
  | "education"
  | "corruption"
  | "police"
  | "revenue"
  | "agriculture"
  | "other";

export interface ComplaintAttachment {
  id: string;
  name: string;
  url: string;
  type: "image" | "document" | "video";
  size: number;
}

export interface ComplaintComment {
  id: string;
  author: string;
  role: "citizen" | "officer" | "mp" | "system";
  message: string;
  createdAt: string;
  avatar?: string;
}

export interface ComplaintTimelineEvent {
  id: string;
  status: ComplaintStatus;
  message: string;
  actor: string;
  timestamp: string;
  isCompleted: boolean;
}

export interface Complaint {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  department: string;
  location: string;
  district: string;
  state: string;
  attachments: ComplaintAttachment[];
  comments: ComplaintComment[];
  timeline: ComplaintTimelineEvent[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  mpName?: string;
}

export interface ComplaintFilters {
  status?: ComplaintStatus;
  category?: ComplaintCategory;
  priority?: ComplaintPriority;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface CreateComplaintData {
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  department: string;
  location: string;
  district: string;
  state: string;
}
