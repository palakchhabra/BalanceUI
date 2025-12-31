import { cookies } from "next/headers";

export const COOKIE_NAMES = {
  SESSION_ID: "balanceui_session_id",
  USER_EMAIL: "balanceui_user_email",
  SEARCH_HISTORY: "balanceui_search_history",
} as const;

/**
 * Generate a unique session ID
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Get session ID from cookies
 */
export async function getSessionId(): Promise<string> {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get(COOKIE_NAMES.SESSION_ID)?.value;

  if (!sessionId) {
    sessionId = generateSessionId();
    cookieStore.set(COOKIE_NAMES.SESSION_ID, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
  }

  return sessionId;
}

/**
 * Get user email from cookies
 */
export async function getUserEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAMES.USER_EMAIL)?.value || null;
}

/**
 * Set user email in cookies
 */
export async function setUserEmail(email: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAMES.USER_EMAIL, email, {
    httpOnly: false, // Allow client-side access
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });
}
