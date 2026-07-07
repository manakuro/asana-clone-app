# Folder Structure

## Principles

- **Colocation**: Keep related files close to where they are used.
- **File and folder names**: Use `kebab-case`.
- **Dependency direction**: One-way only — `app → features → shared`
  - e.g. `app (app/) → pages (components/pages/) → features (features/) → shared (lib/, utils/, config/, components/ui/)`
  - `components/layout/` depends on `features/`, so it sits between `pages` and `shared`

---

## Directory Overview

| Directory | Purpose | Domain Knowledge |
|---|---|---|
| `features/` | Reusable domain logic, hooks, and components used across multiple pages. Organized by domain (horizontal slicing). | ✓ |
| `components/pages/` | Entry-point components per route. Contains only logic and components exclusive to that route (vertical slicing). | ✓ |
| `components/ui/` | Reusable UI primitives with no domain knowledge (e.g. `button`, `input`, `card`, `modal`). | — |
| `components/layout/` | App-wide structural components (e.g. `header`, `sidebar`, `modals.tsx`, `global-query.tsx`). May consume `features/*` hooks but must not contain domain logic itself. | — |
| `hooks/` | App-wide custom hooks (e.g. `use-debounce.ts`, `use-hover.ts`). | — |
| `store/` | Global state management and business logic. `store/entities/` holds domain-specific state. | ✓ |
| `lib/` | Third-party library setup and shared logic (e.g. `apollo`, `firebase`, `prosemirror`). | — |
| `graphql/` | GraphQL query, mutation, subscription definitions and generated types. | — |
| `config/` | App-wide configuration (e.g. `env`). | — |
| `utils/` | Generic, domain-agnostic helper functions (e.g. `uniq.ts`, `is-equal.ts`). | — |
| `assets/` | App-wide fonts, images, and static files. | — |
| `router/` | Route registration. | — |

---

## `features/` — Horizontal Domain Slices

Each subdirectory represents a **domain concept**, not a page or UI pattern.

```
                 /home        /projects    /my-tasks
               ┌───────────┬───────────┬───────────┐
  feature/user │███████████│███████████│███████████│  ← crosses all pages
               ├───────────┼───────────┼───────────┤
  feature/task │███████████│███████████│███████████│  ← crosses all pages
               ├───────────┼───────────┼───────────┤
  feature/proj │           │███████████│           │  ← crosses relevant pages
               └───────────┴───────────┴───────────┘
```


```
features/
  user/
    components/
    hooks/
    store/
    types/
    utils/
    index.ts
  task/
    components/
    hooks/
    types/
    index.ts
  workspace/
  project/
  notification/   # logic/types only — no components required
```

### Rules

- **Unit of division**: Domain concept (e.g. `user`, `task`, `project`). Never by page (`home`, `settings`) or UI pattern (`modals`, `popovers`).
- **Not all subdirectories are required**: A feature may contain only hooks, types, or API logic — components are not mandatory.
- **Flat structure by default**: Avoid nesting inside a feature. If `components/` grows too large, consider splitting into a separate feature first.
  - If nesting is truly necessary, limit to **one level deep**.
- **No `features/app` or `features/layout`**: These are not domain concepts. Use `config/`, `lib/`, `hooks/`, or `components/layout/` instead.
- **Modals and popovers with business logic** belong inside their respective domain feature (e.g. `features/user/components/user-edit-modal.tsx`), not in a `features/modals/` folder.
- **Export via `index.ts`**: Each feature exposes its public API through `index.ts`. Internal files should not be imported directly from outside the feature.

### Cross-feature Dependencies

- Dependencies between features are **permitted** but must follow a **consistent direction** (e.g. `task` may depend on `user`, not vice versa).
- Circular dependencies are **prohibited** and enforced via lint rules.
- Types shared across multiple features should be promoted to a `shared/types/` location rather than importing directly across features.

---

## `components/pages/` — Vertical Route Slices

Each subdirectory maps to a single route and contains **only** what is exclusive to that route.

```
               ┌───────────┐ ┌───────────┐ ┌───────────┐
               │   /home   │ │ /projects │ │ /my-tasks │
               │           │ │           │ │           │
               │ components│ │ components│ │ components│
               │ hooks     │ │ hooks     │ │ hooks     │
               │ page.tsx  │ │ page.tsx  │ │ page.tsx  │
               │           │ │           │ │           │
               └───────────┘ └───────────┘ └───────────┘
                 isolated      isolated      isolated
```

```
components/pages/
  home/
    components/
    hooks/
    store/
    types/
    utils/
    api/
      queries/
    page.tsx
    index.ts
  project-detail/
  my-tasks/
```

### Rules

- **No cross-page imports**: `components/pages/page-a/` must never import from `components/pages/page-b/`. Enforced via `eslint-plugin-boundaries` or `import/no-restricted-paths`.
- **Promotion rule**: When a component or hook inside `components/pages/` is needed by a second page, move it to `features/` immediately. Do not wait. Do not move preemptively based on speculation.
- **No Container/Presentational split**: Use `page.tsx` + `use-{page}.ts` hooks instead. All side effects and data fetching go into hooks; `page.tsx` is responsible only for composition and JSX.
- **Business logic is allowed**: Page-specific logic that will never be reused belongs here. The boundary criterion is reusability, not the presence of business logic.

---

## `components/layout/` — App-wide Structure

Structural components that form the skeleton of the app.

```
components/layout/
  header/
  sidebar/
  navigation/
  modals/
```

### Rules

- No domain logic inside `layout/`. Delegate to `features/*` hooks.
- `layout/` may import from `features/*` — this is consistent with the `shared → features → app` dependency direction.

---

## `components/ui/` — UI Primitives

Domain-agnostic, reusable UI components.

```
components/ui/
  button/
  input/
  card/
  modal/
  video-player/
  page-loader/
```

---

## Promotion Flow

```
components/pages/{page}/   →   (needed by a second page)   →   features/{domain}/
```

- Promotion is triggered by **actual reuse**, never by anticipated reuse.
- When promoting, move all related files together: components, hooks, types, tests, and stories.

---

## Dependency Rules (enforced by lint)

```
components/ui
components/layout      → features/*
features/{domain}      → features/{lower-level domain}, shared/*
components/pages/{page} → features/*, components/ui, components/layout
```

- `components/pages/*` must not import from other `components/pages/*`.
- `features/*` must not import from `components/pages/*`.
- Circular imports across any boundary are forbidden.
