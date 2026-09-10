# Rule: Architecture Composition & Anti-Boolean State

## 1. Compound Component Pattern (Mandatory)

All complex UI elements and modular widgets MUST be structured using React Compound Components. Avoid mega-monolithic components that accept hundreds of props.

### Standard Compound Structure:

- `[Component].Root`: Context Provider & Layout wrapper
- `[Component].Header`: Section header / Title bar
- `[Component].Content`: Main body container
- `[Component].Action`: Interactive buttons/controls

```tsx
// MANDATORY USAGE PATTERN:
<Card.Root>
  <Card.Header title="Service Title" />
  <Card.Content>Description goes here</Card.Content>
  <Card.Action onClick={handleAction}>Request</Card.Action>
</Card.Root>
```

---

## 2. Ban on Boolean State Explosion

Creating multiple boolean props to alter layout or component variants (e.g. `isMaster`, `isPending`, `isModal`, `isProjectBased`, `isEditMode`) is **STRICTLY PROHIBITED**.

### Guidelines:

- Use explicit polymorphic composition or discriminated union types (`type Variant = 'fixed' | 'project'`).
- Use dedicated sub-components rather than flag props (`<ProjectPricingCard />` vs `<Card isProjectBased={true} />`).

---

## 3. State Decoupling & Context Providers

- Lift shared feature state into Context Providers (`[Feature]Provider`).
- Sub-components read state directly from context hooks rather than prop drilling.
- Avoid passing callback functions through more than 1 component level.
