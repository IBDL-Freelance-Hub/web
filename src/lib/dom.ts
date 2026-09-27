/**
 * DOM utility for form validation per VAL-43:
 * Scrolls the first failing field into view with { block: 'center' }
 * and focuses it without abrupt viewport jumps.
 */
export function scrollToAndFocusFirstError(fieldIdsInOrder: string[]): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  const perform = (): boolean => {
    for (const id of fieldIdsInOrder) {
      const container = document.getElementById(id);
      if (!container) continue;

      const focusable = ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(
        container.tagName
      )
        ? container
        : container.querySelector?.<HTMLElement>(
            "input:not([type='hidden']), select, textarea, button, [tabindex='0']"
          );

      container.scrollIntoView({ behavior: "smooth", block: "center" });
      if (focusable) {
        try {
          focusable.focus({ preventScroll: true });
        } catch {
          focusable.focus();
        }
      }
      return true;
    }

    // Fallback: search for first element marked invalid or with red border
    const fallback = document.querySelector<HTMLElement>(
      "[aria-invalid='true'], .border-\\[\\#e11119\\], input:invalid"
    );
    if (fallback) {
      fallback.scrollIntoView({ behavior: "smooth", block: "center" });
      try {
        fallback.focus({ preventScroll: true });
      } catch {
        fallback.focus();
      }
      return true;
    }

    return false;
  };

  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(() => {
      setTimeout(perform, 20);
    });
    return true;
  } else {
    setTimeout(perform, 20);
    return true;
  }
}
