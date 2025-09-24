# Code Style & Conventions

## Frontend (Next.js/React)

### Import Organization
- **Barrel Imports**: Currently converting from barrel imports (`@/components/ui/molecules`) to individual imports (`@/components/ui/molecules/Tooltip`) for better clarity and maintainability
- **Path Aliases**: Uses `@/` prefix for src/ directory imports
- **Import Order**: External libs → internal modules → types → relative imports

### Component Architecture
- **Atomic Design**: Components organized as atoms → molecules → organisms → pages
- **File Structure**: Each component has own directory with index.ts for exports
- **Component Pattern**: Functional components with hooks, memo for optimization
- **Props**: Uses TypeScript interfaces, prefers composition over inheritance

### TypeScript Conventions  
- **Strict Mode**: Enabled with strict type checking
- **Type Definitions**: Separate .d.ts files for complex types
- **Props Typing**: Uses `type` over `interface` for component props
- **Generic Types**: Leverages generics for reusable components

### State Management
- **Recoil**: For complex application state with atoms in `/store/entities/`
- **Jotai**: For simpler state needs  
- **Atom Organization**: Domain-based structure (tasks, projects, users, etc.)
- **Hooks Pattern**: Custom hooks for business logic abstraction

### Code Quality Tools
- **Linter**: Biome (replaces ESLint/Prettier) with `biome check src`
- **Formatter**: Biome handles both linting and formatting
- **Git Hooks**: Lefthook for pre-commit validation
- **Commits**: Conventional commits with commitizen

## Backend (Go)

### Architecture Pattern
- **Clean Architecture**: Layered approach (controller → usecase → repository → entity)
- **GraphQL**: Schema-first with gqlgen for type generation
- **Database**: Ent ORM with schema definitions in `/ent/schema/`

### File Organization  
- **Domain-Driven**: Code organized by business domains
- **Makefile**: Used for common development tasks
- **Air**: Hot reload for development server

### Naming Conventions
- **Go Standard**: CamelCase for exported, camelCase for unexported
- **GraphQL**: Schema files use .graphql extension
- **Database**: Snake_case for column names, following SQL conventions