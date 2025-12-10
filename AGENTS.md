# LinkedUp - Agent Guidelines

## Development Commands
- `npm run dev` - Start development server on port 9002 with Turbopack
- `npm run build` - Production build (NODE_ENV=production)
- `npm run lint` - Run ESLint
- `npm run typecheck` - TypeScript type checking without emit
- `npm run genkit:dev` - Start Genkit AI development server
- `npm run genkit:watch` - Start Genkit with file watching

## Code Style Guidelines

### Imports & Structure
- Use absolute imports with `@/` prefix (configured in tsconfig.json)
- Import React components with `import * as React from "react"`
- Group imports: external libraries → internal modules → relative imports
- Use `cn()` utility from `@/lib/utils` for className merging

### TypeScript & Types
- Strict TypeScript enabled
- Use `Readonly<>` for props interfaces
- Extend HTML element attributes for component props
- Use `VariantProps` from class-variance-authority for component variants

### Component Patterns
- Use Radix UI primitives with custom variants
- Forward refs for all interactive components
- Use class-variance-authority for styling variants
- Follow shadcn/ui component structure

### Styling
- Tailwind CSS with custom design tokens
- Use HSL CSS variables for colors
- Inter font family for body and headline
- Responsive design with mobile-first approach

### Error Handling
- Use try-catch for async operations
- Implement proper loading states
- Use toast notifications for user feedback

### Naming Conventions
- PascalCase for components and interfaces
- camelCase for functions and variables
- kebab-case for file names
- Descriptive names for AI flows and utilities