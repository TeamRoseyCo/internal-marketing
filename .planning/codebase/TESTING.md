# Testing Patterns

**Analysis Date:** 2025-01-23

## Test Framework

**Status:** Not currently configured

**Runner:**
- No test runner installed or configured (Jest, Vitest not in dependencies)
- No test configuration files detected

**Testing Library:**
- Not installed in project

**Run Commands:**
```bash
# No test commands currently available
# Testing not yet implemented in this project
```

## Test File Organization

**Location:**
- No test files exist in codebase
- When implemented, recommended: co-located with source files (Jest convention)

**Naming:**
- Recommended pattern: `[component].test.tsx` or `[component].spec.tsx`
- Keep tests adjacent to implementation for easier navigation

**Recommended Structure:**
```
src/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   └── button.test.tsx          (test alongside component)
│   └── animations/
│       ├── fade-in.tsx
│       └── fade-in.test.tsx
├── lib/
│   ├── blog.ts
│   └── blog.test.ts
└── app/
    └── api/
        └── contact/
            ├── route.ts
            └── route.test.ts
```

## Test Structure

**Recommended Setup (for future implementation):**

Based on codebase patterns, when tests are added, follow this structure:

```typescript
// Example: src/components/animations/fade-in.test.tsx
import { render, screen } from '@testing-library/react';
import { FadeIn } from './fade-in';

describe('FadeIn Component', () => {
  it('renders children', () => {
    render(<FadeIn>Test content</FadeIn>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies className prop', () => {
    const { container } = render(<FadeIn className="custom-class">Content</FadeIn>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('accepts animation props', () => {
    render(
      <FadeIn delay={0.5} duration={1} direction="left">
        Content
      </FadeIn>
    );
    // Assert animation variants applied correctly
  });
});
```

**Patterns:**
- Use descriptive test names
- One assertion focus per test
- Setup/teardown minimal (use beforeEach if needed)
- Mock external dependencies

## Mocking

**Recommended Framework:** Jest with `jest.mock()`

**Patterns for Codebase (when tests added):**

**Mock Supabase client:**
```typescript
// src/lib/supabase.test.ts
jest.mock('@supabase/supabase-js');

import { createServerClient } from './supabase';

it('throws error when SUPABASE_SERVICE_ROLE_KEY not set', () => {
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  expect(() => createServerClient()).toThrow('SUPABASE_SERVICE_ROLE_KEY is not set');
});
```

**Mock Resend client:**
```typescript
// src/lib/resend.test.ts
jest.mock('resend');

import { resend } from './resend';

it('returns null when RESEND_API_KEY not set', () => {
  delete process.env.RESEND_API_KEY;
  expect(resend).toBeNull();
});
```

**Mock Next.js API requests:**
```typescript
// src/app/api/contact/route.test.ts
import { POST } from './route';
import { NextRequest } from 'next/server';

it('validates required fields', async () => {
  const request = new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    body: JSON.stringify({ email: 'test@example.com' }), // Missing required fields
  });

  const response = await POST(request);
  expect(response.status).toBe(400);
});
```

**What to Mock:**
- External API clients (Supabase, Resend)
- File system operations (fs module in `src/lib/blog.ts`)
- Date/time (use explicit dates for reading time calculations)
- Network requests (API calls)

**What NOT to Mock:**
- Pure utility functions (e.g., `cn` function in `src/lib/utils.ts`)
- Component internal logic
- Animation libraries when testing render behavior
- Next.js routing (use Next.js testing utilities)

## Fixtures and Factories

**Test Data Pattern (when implemented):**

```typescript
// src/__fixtures__/blog-post.fixture.ts
import { BlogPostMeta } from '@/lib/blog';

export const mockBlogPost: BlogPostMeta = {
  slug: 'test-post',
  title: 'Test Blog Post',
  excerpt: 'A test excerpt',
  category: 'Testing',
  date: '2025-01-23',
  readTime: '5 min read',
  author: 'Test Author',
  image: '/test-image.jpg',
  tags: ['test', 'fixture'],
};

export const mockBlogPosts: BlogPostMeta[] = [
  mockBlogPost,
  {
    ...mockBlogPost,
    slug: 'second-post',
    title: 'Second Post',
  },
];
```

```typescript
// src/__fixtures__/lead.fixture.ts
import { LeadData } from '@/app/api/contact/route';

export const mockLead: LeadData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  website: 'https://example.com',
  service: 'seo',
  message: 'Test message',
};
```

**Location:**
- Store in `src/__fixtures__/` directory
- Name by entity: `blog-post.fixture.ts`, `lead.fixture.ts`
- Export factory functions for variations

## Coverage

**Requirements:** Not enforced (none configured)

**When implementing:**
- Recommended minimum: 70% for critical paths
- Critical paths: API routes, utility functions, data validation
- Less critical: Page components (UI integration tested manually)

**View Coverage (when configured):**
```bash
npm run test -- --coverage
```

## Test Types

**Unit Tests:**
- Scope: Individual functions and components in isolation
- Approach: Test pure logic (utility functions, validation, calculations)
- Examples in codebase to test:
  - `src/lib/blog.ts` - `getAllPosts`, `getPostBySlug`, `formatReadTime`
  - `src/lib/utils.ts` - `cn` utility function
  - Form validation in `src/app/contact/page.tsx`

**Integration Tests:**
- Scope: Component interactions, API route + database, email sending
- Approach: Mock external services (Supabase, Resend) but test their integration
- Examples to test:
  - Contact form submission → API route → Supabase save → Resend email
  - Blog post retrieval → render with metadata
  - Locale-based blog fallback logic

**E2E Tests:**
- Framework: Playwright or Cypress (not installed)
- Status: Not currently used
- Future scope: Contact form submission flow, blog navigation, locale switching

## Common Patterns

**Async Testing:**

```typescript
// Testing async functions
it('fetches blog posts', async () => {
  const posts = await getAllPosts('us');
  expect(posts).toHaveLength(greaterThan(0));
  expect(posts[0]).toHaveProperty('title');
});

// Testing async API routes
it('submits contact form', async () => {
  const request = new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    body: JSON.stringify(mockLead),
  });

  const response = await POST(request);
  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data.success).toBe(true);
});
```

**Error Testing:**

```typescript
// Testing error conditions
it('returns 400 for missing required fields', async () => {
  const invalidData = { email: 'test@example.com' };
  const request = new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    body: JSON.stringify(invalidData),
  });

  const response = await POST(request);
  expect(response.status).toBe(400);
  const data = await response.json();
  expect(data.error).toBe('Missing required fields');
});

// Testing invalid input handling
it('validates email format', async () => {
  const invalidEmail = { ...mockLead, email: 'not-an-email' };
  const request = new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    body: JSON.stringify(invalidEmail),
  });

  const response = await POST(request);
  expect(response.status).toBe(400);
  expect(response.json().error).toContain('Invalid');
});
```

## Recommended Testing Setup (Not Yet Implemented)

**Install test dependencies:**
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom ts-jest @types/jest
```

**Jest Config (`jest.config.js`):**
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/content/**',
  ],
};
```

**Add test scripts to package.json:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

*Testing analysis: 2025-01-23*

**Note:** Testing framework not currently configured in this project. This document provides patterns for implementation based on codebase structure and best practices aligned with Next.js/TypeScript conventions used throughout.
