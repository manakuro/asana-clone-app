# Development Commands

## Root Level (Monorepo Management)
- `pnpm install` - Install all dependencies across workspace
- `pnpm dev` - Start all development servers (frontend + backend)
- `pnpm build` - Build all applications
- `pnpm lint` - Run linting across all apps using Turborepo
- `pnpm lint:fix` - Fix linting issues across all apps
- `pnpm test` - Run tests across all apps
- `pnpm test:ci` - Run tests in CI mode
- `pnpm tsc` - Run TypeScript compilation checks across all apps

## Frontend Development (apps/nextjs/)
### Core Commands
- `pnpm dev` - Start Next.js development server (port 4001)
- `pnpm build` - Build for production
- `pnpm start` - Start production server (port 8080)
- `pnpm start:local` - Build and start production locally

### Code Quality
- `pnpm lint` - Run Biome linting on src/ directory
- `pnpm lint:fix` - Fix linting issues with Biome (includes unsafe fixes)
- `pnpm tsc` - TypeScript compilation check

### Testing & Development Tools
- `pnpm test` - Run Vitest tests
- `pnpm test:ci` - Run tests with maxWorkers=1 for CI
- `pnpm storybook` - Start Storybook component library (port 6006)

### GraphQL Code Generation
- `pnpm codegen` - Generate GraphQL types and hooks (requires API server)
- `pnpm codegen:watch` - Watch mode for GraphQL codegen
- `pnpm codegen:ci` - Generate without downloading schema (for CI)

## Backend Development (apps/api/)
### Server Management
- `make start` - Start development server with Air (hot reload)
- `make build` - Build Docker image
- `make install` - Install development tools (brew, pre-commit, golangci-lint, etc.)

### Database Operations
- `make setup_db` - Initialize local database
- `make migrate_schema` - Run database migrations locally
- `make migrate_schema_staging` - Run migrations on staging
- `make seed` - Seed database with test data locally
- `make seed_staging` - Seed staging database

### Code Generation & Testing
- `make ent_generate` - Generate Ent ORM schema code
- `make generate` - Generate all Go code
- `make test_repository` - Run repository layer tests
- `make e2e` - Run end-to-end tests

### System Requirements
- Node.js 22.17.0
- Go 1.22.1  
- MySQL database
- pnpm 10.13.1+