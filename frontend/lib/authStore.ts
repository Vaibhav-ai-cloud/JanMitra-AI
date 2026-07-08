/**
 * lib/authStore.ts
 *
 * Production authentication via FastAPI backend.
 *
 * Registration endpoints:
 *   POST /auth/register        — citizen registration
 *   POST /auth/mp/register     — MP registration (returns pending status)
 *
 * Login endpoints:
 *   POST /auth/login           — citizen login (generic / backward-compat)
 *   POST /auth/mp/login        — MP login (status-gated by backend)
 *   POST /auth/admin/login     — admin login
 *
 * Other:
 *   POST /auth/forgot-password — request reset link
 *   POST /auth/reset-password  — complete password reset
 *   GET  /auth/me              — restore session from token
 *
 * Session is persisted in localStorage under SESSION_KEY.
 * No mock, demo, or hardcoded users — production only.
 */

import api, { getApiErrorMessage } from "../services/api";
import type { UserRole } from "../types/auth";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SessionUser {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  accessToken: string;
  redirectTo: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const SESSION_KEY = "janmitra_session";

const ROLE_REDIRECT: Record<UserRole, string> = {
  citizen: "/citizen/dashboard",
  mp:      "/mp/dashboard",
  admin:   "/admin/dashboard",
};

// ── Citizen Registration ──────────────────────────────────────────────────────

/**
 * Register a new citizen account via POST /auth/register.
 * Admin registration is blocked by the backend (HTTP 403).
 */
export async function authRegisterCitizen(data: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}): Promise<void> {
  try {
    await api.post("/auth/register", {
      full_name: data.fullName,
      email:     data.email,
      phone:     data.phone,
      password:  data.password,
      role:      "citizen",
    });
  } catch (err) {
    throw new Error(
      getApiErrorMessage(err, "Registration failed. Please try again.")
    );
  }
}

// ── MP Registration ───────────────────────────────────────────────────────────

/**
 * Register a new MP account via POST /auth/mp/register.
 * Backend sets status = "pending" — admin must approve before login.
 */
export async function authRegisterMP(data: {
  fullName:     string;
  email:        string;
  phone:        string;
  password:     string;
  constituency: string;
  district:     string;
  state:        string;
  party:        string;
  mpId?:        string;
}): Promise<void> {
  try {
    await api.post("/auth/mp/register", {
      full_name:    data.fullName,
      email:        data.email,
      phone:        data.phone,
      password:     data.password,
      constituency: data.constituency,
      district:     data.district,
      state:        data.state,
      party:        data.party,
      mp_id:        data.mpId ?? undefined,
    });
  } catch (err) {
    throw new Error(
      getApiErrorMessage(err, "MP registration failed. Please try again.")
    );
  }
}

/**
 * Backward-compat alias. New code should call authRegisterCitizen or authRegisterMP directly.
 */
export async function authRegister(data: {
  fullName: string;
  email:    string;
  phone:    string;
  password: string;
  role:     "citizen" | "mp";
}): Promise<void> {
  if (data.role === "mp") {
    throw new Error(
      "Use authRegisterMP() for MP registration — additional fields required."
    );
  }
  return authRegisterCitizen(data);
}

// ── Citizen / Generic Login ───────────────────────────────────────────────────

/**
 * Log in via POST /auth/login (citizen / generic endpoint).
 * Persists session to localStorage automatically.
 */
export async function authLogin(
  email:    string,
  password: string
): Promise<SessionUser> {
  return _doLogin("/auth/login", email, password);
}

// ── MP Login ─────────────────────────────────────────────────────────────────

/**
 * Log in via POST /auth/mp/login.
 * Backend returns HTTP 403 if account is pending or rejected.
 */
export async function authLoginMP(
  email:    string,
  password: string
): Promise<SessionUser> {
  return _doLogin("/auth/mp/login", email, password);
}

// ── Admin Login ───────────────────────────────────────────────────────────────

/**
 * Log in via POST /auth/admin/login.
 * No self-registration — admin accounts created manually in DB.
 */
export async function authLoginAdmin(
  email:    string,
  password: string
): Promise<SessionUser> {
  return _doLogin("/auth/admin/login", email, password);
}

// ── Shared login helper ───────────────────────────────────────────────────────

async function _doLogin(
  endpoint: string,
  email:    string,
  password: string
): Promise<SessionUser> {
  try {
    const { data } = await api.post<{
      access_token: string;
      token_type:   string;
      user: {
        id:        number;
        full_name: string;
        email:     string;
        role:      string;
      };
    }>(endpoint, { email, password });

    const role = data.user.role as UserRole;

    const session: SessionUser = {
      id:          data.user.id,
      fullName:    data.user.full_name,
      email:       data.user.email,
      role,
      accessToken: data.access_token,
      redirectTo:  ROLE_REDIRECT[role] ?? "/citizen/dashboard",
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }

    return session;
  } catch (err) {
    throw new Error(
      getApiErrorMessage(err, "Invalid email or password.")
    );
  }
}

// ── Forgot Password ───────────────────────────────────────────────────────────

export async function authForgotPassword(email: string): Promise<void> {
  try {
    await api.post("/auth/forgot-password", { email });
  } catch (err) {
    throw new Error(
      getApiErrorMessage(err, "Could not send reset link. Please try again.")
    );
  }
}

// ── Reset Password ────────────────────────────────────────────────────────────

export async function authResetPassword(
  token:       string,
  newPassword: string
): Promise<void> {
  try {
    await api.post("/auth/reset-password", {
      token,
      new_password: newPassword,
    });
  } catch (err) {
    throw new Error(
      getApiErrorMessage(err, "Failed to reset password. The link may have expired.")
    );
  }
}

// ── Session Helpers ───────────────────────────────────────────────────────────

export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

export function authLogout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn(): boolean {
  return getSession() !== null;
}

export function getAccessToken(): string | null {
  return getSession()?.accessToken ?? null;
}

export async function restoreSession(): Promise<SessionUser | null> {
  const session = getSession();
  if (!session) return null;

  try {
    const { data } = await api.get<{
      id:        number;
      full_name: string;
      email:     string;
      role:      string;
    }>("/auth/me");

    const role = data.role as UserRole;

    const refreshed: SessionUser = {
      id:          data.id,
      fullName:    data.full_name,
      email:       data.email,
      role,
      accessToken: session.accessToken,
      redirectTo:  ROLE_REDIRECT[role] ?? "/citizen/dashboard",
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_KEY, JSON.stringify(refreshed));
    }

    return refreshed;
  } catch {
    authLogout();
    return null;
  }
}
