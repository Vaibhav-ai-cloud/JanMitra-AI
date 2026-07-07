/**
 * lib/authStore.ts
 *
 * Frontend-only authentication using LocalStorage.
 * No backend · No API · No database.
 *
 * Storage keys:
 *   janmitra_users   — array of all registered accounts
 *   janmitra_session — the currently logged-in user
 */

import type { UserRole } from "../types/auth";

// ── Types ────────────────────────────────────────────────────────────────────

export interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string; // stored as-is (plain, frontend-only demo)
  role: UserRole;
  createdAt: string;
}

export interface SessionUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  redirectTo: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const USERS_KEY = "janmitra_users";
const SESSION_KEY = "janmitra_session";

const ROLE_REDIRECT: Record<UserRole, string> = {
  citizen: "/citizen/dashboard",
  mp: "/mp/dashboard",
  admin: "/admin/dashboard",
};

// ── Seed demo accounts (run once on module load) ──────────────────────────────

const DEMO_USERS: StoredUser[] = [
  {
    id: "demo-admin",
    fullName: "Admin User",
    email: "admin@janmitra.ai",
    phone: "9000000001",
    passwordHash: "Admin@123",
    role: "admin",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "demo-mp",
    fullName: "MP User",
    email: "mp@janmitra.ai",
    phone: "9000000002",
    passwordHash: "Mp@123",
    role: "mp",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "demo-citizen",
    fullName: "Citizen User",
    email: "citizen@janmitra.ai",
    phone: "9000000003",
    passwordHash: "Citizen@123",
    role: "citizen",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

function seedDemoAccounts(): void {
  if (typeof window === "undefined") return;
  try {
    const existing = localStorage.getItem(USERS_KEY);
    if (!existing) {
      localStorage.setItem(USERS_KEY, JSON.stringify(DEMO_USERS));
    } else {
      // Merge: add any demo user whose email is not yet present
      const users: StoredUser[] = JSON.parse(existing);
      const emails = new Set(users.map((u) => u.email));
      const merged = [
        ...users,
        ...DEMO_USERS.filter((d) => !emails.has(d.email)),
      ];
      if (merged.length !== users.length) {
        localStorage.setItem(USERS_KEY, JSON.stringify(merged));
      }
    }
  } catch {
    // Ignore storage errors
  }
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function getUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Register a new account.
 * Throws if the email is already taken.
 */
export async function authRegister(data: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}): Promise<void> {
  seedDemoAccounts();
  // Simulate latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  const users = getUsers();
  const normalised = data.email.trim().toLowerCase();

  if (users.some((u) => u.email === normalised)) {
    throw new Error(
      "An account with this email already exists. Please sign in instead."
    );
  }

  const newUser: StoredUser = {
    id: generateId(),
    fullName: data.fullName.trim(),
    email: normalised,
    phone: data.phone.trim(),
    passwordHash: data.password, // plain — frontend demo only
    role: data.role,
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, newUser]);
}

/**
 * DEV-MODE: Log in without credential validation.
 * Accepts an optional redirectTo to route based on the ?next URL param.
 * Maps the destination to a named dev persona with the correct role.
 * Falls back to Demo Citizen / /citizen/dashboard if no redirectTo is provided.
 */
export async function authLogin(
  _email: string,
  _password: string,
  redirectTo?: string
): Promise<SessionUser> {
  // Simulate a brief loading state so the UI still feels responsive
  await new Promise((resolve) => setTimeout(resolve, 400));

  const destination = redirectTo ?? "/citizen/dashboard";

  // Pick a named dev persona that matches the destination
  type DevPersona = { id: string; fullName: string; email: string; phone: string; role: UserRole };

  const persona: DevPersona = destination.includes("/admin")
    ? { id: "dev-admin",   fullName: "Demo Administrator", email: "admin@janmitra.ai", phone: "9000000001", role: "admin"   }
    : destination.includes("/mp")
    ? { id: "dev-mp",      fullName: "Demo MP",            email: "mp@janmitra.ai",    phone: "9000000002", role: "mp"      }
    : { id: "dev-citizen", fullName: "Demo Citizen",       email: "citizen@janmitra.ai", phone: "9000000003", role: "citizen" };

  const session: SessionUser = {
    ...persona,
    redirectTo: destination,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  return session;
}

/**
 * Return the current session, or null if not logged in.
 */
export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

/**
 * Log out — clears the session from LocalStorage.
 */
export function authLogout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Returns true if a session exists in LocalStorage.
 */
export function isLoggedIn(): boolean {
  return getSession() !== null;
}
