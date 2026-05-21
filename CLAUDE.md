# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An Asana clone application built as a monorepo with real-time communication using WebSockets and optimistic UI updates. The architecture consists of:

- **Backend**: Go-based GraphQL API with Ent ORM (`apps/api/`)
- **Frontend**: Next.js React application with Recoil state management (`apps/nextjs/`)
- **Database**: MySQL with migrations and seeding
- **Package Management**: pnpm with Turborepo for monorepo management

## Development Commands

### Root Level (Monorepo)
- `pnpm install` - Install all dependencies
- `pnpm dev` - Start all development servers
- `pnpm build` - Build all apps
- `pnpm lint` - Run linting across all apps
- `pnpm lint:fix` - Fix linting issues across all apps
- `pnpm test` - Run tests across all apps
- `pnpm test:ci` - Run tests in CI mode
- `pnpm tsc` - Run TypeScript compilation checks

### Frontend (apps/nextjs/)
- `pnpm dev` - Start Next.js development server on port 4001
- `pnpm build` - Build for production
- `pnpm start` - Start production server on port 8080
- `pnpm lint` - Run Biome linting on src/ directory
- `pnpm lint:fix` - Fix linting with Biome (includes unsafe fixes)
- `pnpm tsc` - TypeScript compilation check
- `pnpm codegen` - Generate GraphQL types and hooks
- `pnpm codegen:watch` - Watch mode for GraphQL codegen

### Testing (apps/nextjs/)
- `pnpm test` - Run Vitest tests (unit + integration)
- `pnpm test:ci` - Run tests in CI mode
- `pnpm storybook` - Start Storybook on port 6006
- For guidelines on what goes where, see the `/testing` skill (apps/nextjs only)

### Backend (apps/api/)
Use Makefile commands:
- `make start` - Start development server with Air (hot reload)
- `make setup_db` - Initialize database
- `make migrate_schema` - Run database migrations
- `make seed` - Seed database with test data
- `make ent_generate` - Generate Ent schema code
- `make generate` - Generate all Go code
- `make test_repository` - Run repository tests
- `make e2e` - Run end-to-end tests

## Architecture

### State Management
- **Frontend**: Uses Recoil for complex state management with atoms organized by domain
- **Store Structure**: `/src/store/` contains app-level state and entities
  - `/app/` - Application-level state (UI, routing)
  - `/entities/` - Domain entities with CRUD operations and subscriptions
  - Each entity follows pattern: `atom.ts`, `hooks/`, `index.ts`, `type.ts`

### Backend Architecture
- **Clean Architecture**: Organized into layers (controller, usecase, repository, entity)
- **GraphQL API**: Uses gqlgen for schema-first development
- **Database**: Ent ORM with schema definitions in `/ent/schema/`
- **Real-time**: WebSocket subscriptions for live updates

### Key Libraries
- **Frontend**: Next.js, React, Recoil, Chakra UI, Apollo Client, Biome (linting)
- **Backend**: Go, GraphQL (gqlgen), Ent ORM, Echo framework, Firebase Auth
- **Testing**: Vitest (frontend), Go testing (backend), Storybook for components

### Development Setup Requirements
- Node.js 24.13.0
- pnpm 10.13.1
- Go 1.22.1
- MySQL database

## Important Notes

- Uses pnpm workspaces and Turborepo for monorepo management
- Frontend runs on port 4001 (dev) / 8080 (prod)
- GraphQL codegen requires API server running for schema download
- Database migrations and seeding available for different environments (local, staging, production)
- Hot reload enabled in both frontend (Next.js) and backend (Air)
