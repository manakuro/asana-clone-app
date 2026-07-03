# CLAUDE.md — Next.js Frontend

This file provides guidance to Claude Code when working with the Next.js frontend application.

## Quick Reference

### Development Commands

```bash
pnpm dev              # Start development server (port 4001)
pnpm build            # Build for production
pnpm lint             # Run Biome linting
pnpm lint:fix         # Fix linting issues (includes unsafe fixes)
pnpm tsc              # TypeScript compilation check
pnpm codegen          # Generate GraphQL types and hooks
pnpm codegen:watch    # Watch mode for GraphQL codegen
```

### Testing Commands

```bash
pnpm test             # Run Vitest tests (unit + integration)
pnpm test:ci          # Run tests in CI mode
pnpm storybook        # Start Storybook (port 6006)
```

For testing guidelines on what goes where, use the `/testing` skill.

---

## Folder Structure

See `.claude/rules/folder-structure.md` for detailed guidelines.

### Key Principles

- **Colocation**: Keep related files close to where they are used.
- **Naming**: Use `kebab-case` for files and folders.
- **Dependency direction**: One-way only — `shared → features → app`

### Directory Overview

| Directory | Purpose | Domain Knowledge |
|---|---|---|
| `features/` | Reusable domain logic, hooks, and components (horizontal slicing) | Yes |
| `components/pages/` | Entry-point components per route (vertical slicing) | Yes |
| `components/ui/` | Reusable UI primitives (button, input, card, modal) | No |
| `components/layout/` | App-wide structural components (header, sidebar) | No |
| `hooks/` | App-wide custom hooks (use-debounce, use-hover) | No |
| `store/` | Global state management with Jotai | Yes |
| `lib/` | Third-party library setup (apollo, firebase) | No |
| `graphql/` | GraphQL definitions and generated types | No |
| `utils/` | Generic helper functions | No |

### Promotion Rule

When a component in `components/pages/` is needed by a second page, **immediately** move it to `features/`. Do not wait or move preemptively.

```
components/pages/{page}/  →  (needed elsewhere)  →  features/{domain}/
```

### Import Restrictions

- `components/pages/*` must NOT import from other `components/pages/*`
- `features/*` must NOT import from `components/pages/*`
- Circular imports are forbidden

---

## Key Libraries

- **UI Framework**: Chakra UI
- **State Management**: Jotai (atoms in `store/`)
- **GraphQL**: Apollo Client with codegen
- **Linting**: Biome (not ESLint)
- **Testing**: Vitest + Storybook

---

## Important Notes

- GraphQL codegen requires the API server running for schema download
- Development server runs on port 4001, production on 8080
- Always run `pnpm codegen` after GraphQL schema changes
- Use Biome for formatting and linting (`pnpm lint:fix`)
