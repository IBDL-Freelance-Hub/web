import "server-only";
import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "flh_session";
export const DEFAULT_SESSION_TIMEOUT_MINUTES = 30;

export async function setSessionCookie(
  token: string,
  sessionTimeoutMinutes: number = DEFAULT_SESSION_TIMEOUT_MINUTES
): Promise<void> {
  const cookieStore = await cookies();
  // Fallback to 30 minutes if undefined or if old 1440 day-long default is provided
  const effectiveMinutes =
    sessionTimeoutMinutes && sessionTimeoutMinutes !== 1440
      ? sessionTimeoutMinutes
      : DEFAULT_SESSION_TIMEOUT_MINUTES;
  const maxAgeInSeconds = effectiveMinutes * 60;
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeInSeconds,
  });
}

export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
