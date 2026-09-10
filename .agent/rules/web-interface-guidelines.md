# Rule: Vercel Web Interface & Performance Guidelines

## 1. Eliminate Async Waterfalls

- Fetch data in parallel using `Promise.all` or parallel component boundaries.
- Avoid sequential `await` calls inside page components when data fetching is independent.

---

## 2. Prefer Server Components

- Default to React Server Components (RSC) for all pages, layouts, and data containers.
- Move `'use client'` directive as far down the component tree as possible (to tiny interactive leaf components only).

---

## 3. Strict Client Boundary Management

- Do NOT mark entire page components with `'use client'`.
- Pass server-fetched data as props or children into Client Components to preserve RSC performance benefits.

---

## 4. Fast Visual Feedback & Optimistic UI

- Provide instant feedback on user actions (buttons show loading states or optimistic UI updates immediately).
- Use React `Suspense` boundaries and skeleton loaders for instant page loads.
