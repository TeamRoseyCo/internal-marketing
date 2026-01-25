# Coding Conventions

**Analysis Date:** 2025-01-23

## Naming Patterns

**Files:**
- Components: `kebab-case` (e.g., `fade-in.tsx`, `blog-post-card.tsx`)
- Utils/Lib: `kebab-case` (e.g., `blog-helpers.ts`, `supabase.ts`)
- API Routes: Follow Next.js structure in `app/api/[route]/route.ts` format
- Page files: `page.tsx` (Next.js convention)
- Layout files: `layout.tsx` (Next.js convention)

**Functions & Methods:**
- camelCase for all functions (e.g., `handleSubmit`, `getAllPosts`, `createServerClient`, `getPostBySlug`)
- Async functions follow same camelCase (e.g., `getPostBySlug`, `getAllPosts`)

**Variables:**
- camelCase for all variables and constants (e.g., `isSubmitting`, `selectedService`, `supabaseUrl`, `blogDir`)
- Single-letter variables avoided except in short loops/maps
- Descriptive names preferred over abbreviations

**Types & Interfaces:**
- PascalCase for all types and interfaces (e.g., `LeadData`, `BlogPost`, `BlogPostMeta`, `BlogPostCardProps`, `FadeInProps`)
- Interfaces explicitly named with context suffix or semantic meaning
- Props interfaces suffixed with `Props` (e.g., `BlogPostCardProps`, `FadeInProps`)

## Code Style

**Formatting:**
- ESLint with Next.js presets (flat config format via `eslint-config-next`)
- TypeScript strict mode enabled (`strict: true` in tsconfig)
- No manual formatter specified - relies on ESLint

**Linting:**
- Framework: ESLint v8 with flat config format
- Config: `eslint.config.mjs` using defineConfig + globalIgnores
- Presets: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Command: `npm run lint`
- Ignores `.next/`, `out/`, `build/`, `next-env.d.ts`

**TypeScript Configuration:**
- Target: ES2017
- Module: esnext
- Strict: true (no implicit any)
- No emit for build
- Path aliases: `@/*` → `./src/*`

## Import Organization

**Order:**
1. React and framework imports (React, Next.js)
2. Third-party UI libraries (@radix-ui, @hookform, lucide-react)
3. Internal components (from `@/components`)
4. Internal utilities and lib (from `@/lib`)
5. Types and interfaces (inline or from `@/types`)

**Path Aliases:**
- All imports use `@/` prefix for internal modules
- Resolves to `./src/*` directory
- Examples:
  - `@/components/ui/button`
  - `@/lib/supabase`
  - `@/lib/blog`
  - `@/components/animations`

**Barrel Files:**
- Used in component directories for organized exports
- Example: `@/components/animations/index.ts` exports `FadeIn`, `StaggerChildren`, `PageTransition`
- Example: `@/components/analytics/index.ts` exports `GoogleAnalytics`, `MicrosoftClarity`, `MetaPixel`
- Example: `@/components/layout/index.ts` exports `Header`, `Footer`

## Error Handling

**Patterns:**
- Try-catch blocks for async operations (API routes, database calls)
- Explicit error logging with `console.error()` with descriptive context
- Graceful degradation: Continue operation if non-critical service fails
  - Example in `src/app/api/contact/route.ts`: Continue if Supabase fails, continue if email fails, but always return success if lead data was captured
- Validation errors return specific error messages with HTTP status codes
- User-facing errors caught and converted to user-friendly strings

**Examples from codebase:**
```typescript
// API route pattern (src/app/api/contact/route.ts)
try {
  // Main operation
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || 'Failed to submit form');
  }
} catch (err) {
  setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
}
```

```typescript
// Graceful degradation pattern
if (dbError) {
  console.error('Supabase error:', dbError);
  // Continue even if DB fails - we still want to try sending email
}
```

## Logging

**Framework:** `console` (no external logger)

**Patterns:**
- `console.error()` for API errors, validation failures, integration failures
- `console.warn()` for missing environment variables or degraded functionality
- `console.log()` used sparingly for debugging (e.g., video autoplay debugging)
- Error context always included: `console.error('Operation name:', error)`
- Development-only logging encouraged, can be wrapped if performance critical

**Examples:**
- `console.error('Supabase error:', dbError)` - in `src/app/api/contact/route.ts`
- `console.warn('RESEND_API_KEY is not set - email functionality will be disabled')` - in `src/lib/resend.ts`
- `console.log('Autoplay prevented:', error)` - in `src/components/video/hero-video-player.tsx`

## Comments

**When to Comment:**
- Explain WHY, not WHAT (code shows what)
- Non-obvious logic or business decisions
- Complex animation easing functions or transitions
- Integration-specific patterns (e.g., Supabase RLS explanation)
- File headers for new files explaining purpose

**JSDoc/TSDoc:**
- Not consistently used across codebase
- Function parameters typed in TypeScript interfaces/props - types serve as documentation
- Used for complex utility functions when needed

**File Headers:**
- Example from `src/app/api/contact/route.ts`:
```typescript
// src/app/api/contact/route.ts
// API route for contact form submissions
// Saves lead to Supabase and sends email notification via Resend
```

- Example from `src/lib/supabase.ts`:
```typescript
// src/lib/supabase.ts
// Supabase client for browser and server usage
// Used for lead capture, newsletter signups, and other database operations
```

## Function Design

**Size Guidelines:**
- Most functions 20-50 lines
- Page components (`src/app/page.tsx`) allowed to be larger (612 lines) due to single-page organization
- API route handlers 100-120 lines typical
- Complex hooks/utilities kept under 100 lines

**Parameters:**
- Props passed as single interface object (React convention)
- Example: `BlogPostCardProps` with structured properties instead of multiple params
- Destructuring used in function signature

**Return Values:**
- Components return JSX (React.ReactNode)
- API routes return `NextResponse.json()`
- Utility functions return typed values (strings, booleans, objects)
- Null for "not found" cases (e.g., `getPostBySlug` returns `BlogPost | null`)

**Examples from codebase:**
```typescript
// Function with structured props
function BlogPostCard({
  post,
  color,
  index,
  locale,
}: BlogPostCardProps) {
  // Implementation
}

// Async API handler
export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();
    // Validation and processing
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

// Utility returning typed value or null
export function getPostBySlug(slug: string, locale: LocaleCode = "us"): BlogPost | null {
  // Implementation
  return post || null;
}
```

## Module Design

**Exports:**
- Named exports preferred for reusable components and utilities
- Default exports used for page components (Next.js convention)
- Barrel files for component libraries (e.g., `@/components/animations` exports all animation components)

**Barrel Files:**
- Located at `index.ts` in component directories
- Export all related components from directory
- Simplify imports: `import { FadeIn, StaggerChildren } from "@/components/animations"`

**Example barrel file (`src/components/animations/index.ts`):**
```typescript
export { FadeIn } from "./fade-in";
export { StaggerChildren, StaggerItem } from "./stagger-children";
export { PageTransition } from "./page-transition";
```

## Component Patterns

**Functional Components:**
- All components written as function declarations or const functions
- Use `"use client"` directive at top of client components (required for interactivity)
- Props destructured in function signature with TypeScript interface

**Type Safety:**
- All props typed with interfaces ending in `Props`
- No `any` types - strict mode enforced
- Return types explicit for complex functions

**State Management:**
- React hooks (useState, useRef) for local component state
- TanStack Query for server state and async data (installed but not heavily used yet)
- Form state managed with React Hook Form (installed, used in contact forms)

---

*Convention analysis: 2025-01-23*
