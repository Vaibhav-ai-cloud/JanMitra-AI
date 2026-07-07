/**
 * mockAuth.ts
 *
 * Frontend-only mock authentication.
 * No backend, no API calls.
 *
 * Demo credentials:
 *   Admin   — admin@janmitra.ai  / Admin@123   → /admin/dashboard
 *   MP      — mp@janmitra.ai     / Mp@123      → /mp/dashboard
 *   Citizen — citizen@janmitra.ai / Citizen@123 → /citizen/dashboard
 */

export type MockRole = "admin" | "mp" | "citizen";

export interface MockUser {
  email: string;
  role: MockRole;
  name: string;
  redirectTo: string;
}

// ── Credential store ──────────────────────────────────────────────────────────

const MOCK_USERS: Record<string, { password: string; user: MockUser }> = {
  "admin@janmitra.ai": {
    password: "Admin@123",
    user: {
      email: "admin@janmitra.ai",
      role: "admin",
      name: "Admin User",
      redirectTo: "/admin/dashboard",
    },
  },
  "mp@janmitra.ai": {
    password: "Mp@123",
    user: {
      email: "mp@janmitra.ai",
      role: "mp",
      name: "MP User",
      redirectTo: "/mp/dashboard",
    },
  },
  "citizen@janmitra.ai": {
    password: "Citizen@123",
    user: {
      email: "citizen@janmitra.ai",
      role: "citizen",
      name: "Citizen User",
      redirectTo: "/citizen/dashboard",
    },
  },
};

// ── Auth helpers ─────────────────────────────────────────────────────────────

const SESSION_KEY = "janmitra_mock_user";

/**
 * Attempt login with the provided identifier (email) and password.
 * Simulates a 800ms network delay for realism.
 *
 * @returns The matched MockUser on success.
 * @throws  Error with a user-facing message on invalid credentials.
 */
export async function mockLogin(
  identifier: string,
  password: string
): Promise<MockUser> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  const normalised = identifier.trim().toLowerCase();
  const record = MOCK_USERS[normalised];

  if (!record || record.password !== password) {
    throw new Error(
      "Invalid email or password. Please check your credentials and try again."
    );
  }

  // Persist session in sessionStorage (cleared on tab close)
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(record.user));
  }

  return record.user;
}

/**
 * Return the currently logged-in mock user, or null if not authenticated.
 */
export function getMockSession(): MockUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as MockUser) : null;
  } catch {
    return null;
  }
}

/**
 * Clear the mock session (logout).
 */
export function mockLogout(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SESSION_KEY);
  }
}
