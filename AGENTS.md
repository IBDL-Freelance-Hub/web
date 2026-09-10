# Freelancers Hub — Agent Authority & Verification Protocol

This document serves as the master authority for all AI coding agents working on the Freelancers Hub frontend codebase (`/client`). All rules defined here are strictly binding.

---

## Master Architectural & Code Quality Rules

### 1. Architecture Composition & Anti-Boolean State

- **Compound Components**: Build UI using compound component patterns (`Root`, `Header`, `Content`, `Action`). Avoid props explosion.
- **Anti-Boolean State**: Do NOT create boolean props to switch layout modes or component variants. Use discriminated union variants or dedicated sub-components.
- **State Decoupling**: Lift shared feature state into React Context providers.

### 2. Profile Completion Engine

- **Single Engine**: Compute profile completion strictly via a single centralized utility function or hook.
- **11 Canonical Fields**: Count exactly 11 canonical fields (equal 1/11 weight each).
- **Strict Exclusion**: **Profile Photo** and **LinkedIn URL** MUST NEVER be included in profile completion calculations.

### 3. Localization & Accessibility (WCAG 2.1 AA)

- **Bi-Directional Support**: Full LTR (English) and RTL (Arabic) support with logical CSS properties.
- **Numerals & Brands**: Arabic-Indic digits in Arabic locale; Latin script for brand names and trademarks.
- **Accessibility**: Semantic HTML, ARIA attributes on interactive elements, and no color-only state communication.

### 4. Vercel Web Interface & Performance

- **Eliminate Waterfalls**: Fetch data in parallel using `Promise.all` or parallel component boundaries.
- **Server Components**: Prefer React Server Components. Keep `'use client'` boundaries small and at the leaves.
- **Optimistic UI**: Provide immediate visual feedback for user interactions.

---

## Mandatory Pre-Completion Verification Protocol

Before any agent marks a task or feature complete, it MUST execute the following verification protocol:

- [ ] **1. Type Check**: Run `npx tsc --noEmit` to ensure 0 TypeScript errors.
- [ ] **2. Lint Compliance**: Run `npm run lint` to confirm 0 ESLint errors/warnings.
- [ ] **3. Prettier Formatting**: Run `npx prettier --check .` to ensure formatting compliance.
- [ ] **4. Build Check**: Run `npm run build` to verify Next.js static and dynamic routes compile cleanly.
- [ ] **5. Rule Audit**: Verify code against all rules in `.agent/rules/`.
