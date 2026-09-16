import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Derives avatar initials per PRO-27:
 * - First letter of first word + first letter of second word (uppercase)
 * - Single-word name yields one letter
 * - Empty name yields "FH"
 */
export function getInitials(fullName?: string | null): string {
  if (!fullName || !fullName.trim()) return "FH";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}
