# Task Completion Workflow

## Required Steps After Making Changes

### 1. Code Quality Checks (Always Required)
```bash
# Frontend linting and type checking
pnpm lint        # Check for linting issues
pnpm lint:fix    # Fix auto-fixable linting issues  
pnpm tsc         # TypeScript compilation check
```

### 2. Testing (When Applicable)
```bash
# Run tests to ensure changes don't break functionality
pnpm test        # Run Vitest tests
pnpm test:ci     # CI mode for thorough testing
```

### 3. Build Verification (Before Deployment)
```bash
pnpm build       # Ensure project builds successfully
```

### 4. Development Server Testing
```bash
pnpm dev         # Start dev server to test changes locally
```

## Git Workflow

### Before Committing
- Run `pnpm lint:fix` to auto-fix formatting issues
- Run `pnpm tsc` to check for TypeScript errors
- Test locally with `pnpm dev`
- Lefthook will run pre-commit hooks automatically

### Commit Messages
- Use conventional commits: `feat:`, `fix:`, `refactor:`, etc.
- Can use `pnpm cz` for interactive commit message creation
- Follow the pattern: `type(scope): description`

### Important Notes
- **Never commit** without running linting and type checks
- **Always test** changes locally before pushing
- **Build verification** is required for production deployments
- **GraphQL codegen** may need to run after schema changes
- **Biome** handles both linting and formatting (no separate Prettier)

## Environment-Specific Commands
- **Local Development**: `pnpm dev` (port 4001)
- **Production Build**: `pnpm build && pnpm start` (port 8080)
- **Storybook**: `pnpm storybook` (port 6006) for component development