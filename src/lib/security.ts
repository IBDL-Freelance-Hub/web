/**
 * Enterprise Frontend Security Utilities (OWASP Client-Side Verification Standards)
 *
 * Provides centralized sanitization, link protection, anti-enumeration error handling,
 * and zero-trust validation helpers for Next.js App Router components & Server Actions.
 */

// Safe protocol allowlist for dynamic URLs to prevent javascript: / data: XSS injection (OWASP A03)
const SAFE_URL_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

/**
 * Validates dynamic link targets and neutralizes dangerous pseudo-protocols (e.g. `javascript:`, `data:`).
 * Returns the sanitized URL or a safe fallback (default: "#").
 */
export function sanitizeUrl(
  url?: string | null,
  fallback: string = "#"
): string {
  if (!url || typeof url !== "string") {
    return fallback;
  }

  const trimmedUrl = url.trim();

  // Allow relative URLs starting with '/' or '#'
  if (trimmedUrl.startsWith("/") || trimmedUrl.startsWith("#")) {
    return trimmedUrl;
  }

  try {
    const parsed = new URL(trimmedUrl);
    if (SAFE_URL_PROTOCOLS.has(parsed.protocol.toLowerCase())) {
      return trimmedUrl;
    }
  } catch {
    // If URL parsing fails, treat as relative if it doesn't contain colon, else fallback
    if (!trimmedUrl.includes(":")) {
      return trimmedUrl;
    }
  }

  return fallback;
}

/**
 * Returns safe anchor/Link properties for external target links (OWASP A03 / Window Hijacking defense).
 * Enforces rel="noopener noreferrer" whenever target="_blank" is present.
 */
export function getSafeLinkProps(
  href: string,
  target?: string
): {
  href: string;
  target?: string;
  rel?: string;
} {
  const safeHref = sanitizeUrl(href);
  const isExternal =
    target === "_blank" ||
    safeHref.startsWith("http://") ||
    safeHref.startsWith("https://");

  if (isExternal) {
    return {
      href: safeHref,
      target: target || "_blank",
      rel: "noopener noreferrer",
    };
  }

  return { href: safeHref, target };
}

/**
 * Strips verbose stack traces, internal database/Prisma error strings, SQL queries,
 * and server IP addresses from client-facing error UI components (OWASP A02 / A05).
 */
export function sanitizeErrorMessage(
  error: unknown,
  fallbackMessage: string = "An unexpected error occurred. Please try again later."
): string {
  if (!error) return fallbackMessage;

  const message =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : (error as { message?: string }).message || fallbackMessage;

  // Filter out internal server/Prisma/SQL pattern leaks
  const isSensitiveLeak =
    /prisma|database|postgresql|mysql|sqlite|syntax error|connect econnrefused|127\.0\.0\.1|0\.0\.0\.0|stack trace|at async/i.test(
      message
    );

  if (isSensitiveLeak) {
    return fallbackMessage;
  }

  return message;
}

/**
 * Standardized generic response for auth forms (Login, Forgot Password, Activation)
 * to prevent email/account enumeration attacks (OWASP A07).
 */
export const GENERIC_AUTH_RESPONSES = {
  forgotPasswordSuccess: {
    en: "If an account with that email exists, password reset instructions have been sent.",
    ar: "في حال وجود حساب مرتبط بهذا البريد الإلكتروني، تم إرسال تعليمات إعادة تعيين كلمة المرور.",
  },
  activationResent: {
    en: "If an inactive account exists with that email, activation instructions have been sent.",
    ar: "في حال وجود حساب غير مفعل بهذا البريد، تم إرسال تعليمات التفعيل.",
  },
} as const;

/**
 * Validates dynamic route parameter tokens against strict UUID v4 regex (Zero-Trust Navigation).
 */
const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateUuid(id?: string | null): boolean {
  if (!id || typeof id !== "string") return false;
  return UUID_V4_REGEX.test(id.trim());
}

/**
 * Form input HTML attribute presets for sensitive inputs (OWASP PII Protection).
 */
export const SENSITIVE_INPUT_ATTRIBUTES = {
  autoComplete: "off",
  autoCorrect: "off",
  spellCheck: false,
} as const;
