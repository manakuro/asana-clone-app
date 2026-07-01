# AGENTS.md

This file provides guidance to AI coding assistants when working with this repository.

## Supported AI Assistants

This file is referenced by multiple AI coding assistants:

- **Claude Code** (claude.ai/code) — Also reads `CLAUDE.md` for additional instructions
- **GitHub Copilot** — Workspace-level instructions
- **Cursor** — Project rules and context
- **Windsurf** — Codebase instructions
- **Other AI assistants** — Following the AGENTS.md convention

> **Note**: Claude Code reads both `AGENTS.md` and `CLAUDE.md`. If you need Claude-specific instructions, add them to `CLAUDE.md`. Instructions in `AGENTS.md` apply to all AI assistants.

---

## Project Overview

An Asana clone application built as a monorepo with:

| Component | Technology                       | Location |
|-----------|----------------------------------|----------|
| Backend | Go, GraphQL (gqlgen), Ent ORM    | `apps/api/` |
| Frontend | Next.js, React, Jotai, Chakra UI | `apps/nextjs/` |
| Database | MySQL                            | — |
| Monorepo | pnpm workspaces + Turborepo      | — |

---

## Quick Commands

### Monorepo (Root)

```bash
pnpm install          # Install dependencies
pnpm dev              # Start all dev servers
pnpm build            # Build all apps
pnpm lint             # Lint all apps
pnpm test             # Test all apps
pnpm tsc              # TypeScript check
```

### Frontend (`apps/nextjs/`)

```bash
pnpm dev              # Dev server (port 4001)
pnpm build            # Production build
pnpm lint:fix         # Fix linting (Biome)
pnpm codegen          # Generate GraphQL types
pnpm test             # Run Vitest tests
pnpm storybook        # Start Storybook (port 6006)
```

### Backend (`apps/api/`)

```bash
make start            # Dev server with hot reload
make setup_db         # Initialize database
make migrate_schema   # Run migrations
make seed             # Seed test data
make ent_generate     # Generate Ent schema
make test_repository  # Run repository tests
```

---

## Architecture Guidelines

### Frontend Structure

See `apps/nextjs/.claude/rules/folder-structure.md` for detailed folder conventions.

**Key Principles:**
- **Colocation**: Keep related files together
- **Naming**: Use `kebab-case` for files and folders
- **Dependency direction**: `shared → features → app` (one-way only)

**Directory Purposes:**
- `features/` — Domain logic, reusable across pages (horizontal slicing)
- `components/pages/` — Route-specific components (vertical slicing)
- `components/ui/` — Domain-agnostic UI primitives
- `components/layout/` — App-wide structure (header, sidebar)
- `store/` — Jotai state management

**Import Rules:**
- `components/pages/*` must NOT import from other pages
- `features/*` must NOT import from `components/pages/*`
- No circular imports

### Backend Structure

- **Clean Architecture**: controller → usecase → repository → entity
- **GraphQL**: Schema-first with gqlgen
- **ORM**: Ent with schemas in `/ent/schema/`
- **Real-time**: WebSocket subscriptions

---

## Code Style

### Frontend
- **Linter**: Biome (not ESLint)
- **Formatter**: Biome
- Run `pnpm lint:fix` before committing

### Backend
- **Formatter**: gofmt / goimports
- Follow Go conventions

---

## Important Notes

- GraphQL codegen requires API server running
- Frontend: port 4001 (dev) / 8080 (prod)
- Hot reload enabled in both frontend and backend
- Use pnpm (not npm or yarn)

---

## Additional Documentation

- `CLAUDE.md` — Claude Code specific instructions
- `apps/nextjs/CLAUDE.md` — Frontend-specific guidance
- `apps/nextjs/.claude/rules/` — Detailed coding rules
