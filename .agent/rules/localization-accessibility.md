# Rule: Localization & Accessibility (WCAG 2.1 AA)

## 1. Bi-Directional (EN/AR) & RTL Support

- All layouts MUST seamlessly adapt between English (LTR) and Arabic (RTL).
- Set `dir="rtl"` or `dir="ltr"` on the root document level.
- Use logical CSS properties (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) instead of hardcoded `left-` / `right-`.

---

## 2. Typography & Numerals Rules

- **Arabic Numerals**: Render as Arabic-Indic digits (٠، ١، ٢، ٣...) in Arabic locale.
- **Latin Brand Names**: Brand names (e.g. "IBDL", "Next.js", "Vercel") and registered trademarks MUST remain in Latin script regardless of active locale.

---

## 3. Accessibility Standards (WCAG 2.1 AA)

- **Semantic HTML**: Use proper tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<button>`).
- **Aria Attributes**: All interactive elements (icon buttons, modals, dropdowns) MUST provide `aria-label`, `aria-expanded`, and `aria-controls`.
- **No Color-Only State**: State changes (success, error, warning) must use icons/text labels alongside color changes to ensure accessibility for colorblind users.
