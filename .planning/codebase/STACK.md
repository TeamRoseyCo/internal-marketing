# Technology Stack

**Analysis Date:** 2026-01-23

## Languages

**Primary:**
- TypeScript 5 - All source code and application logic (`src/**/*.ts`, `src/**/*.tsx`)
- JavaScript (Node.js runtime) - Build system and tooling

**Secondary:**
- CSS with Tailwind (PostCSS) - All styling and design system (`src/app/globals.css`)
- JSX/TSX - React component markup

## Runtime

**Environment:**
- Node.js (version unspecified in package.json, uses .nvmrc if present)

**Package Manager:**
- npm (using package-lock.json)
- Lockfile: `package-lock.json` (present and committed)

## Frameworks

**Core:**
- Next.js 14.2.35 (App Router) - Full-stack React framework with server/client components
- React 18.3.1 - UI library
- React DOM 18.3.1 - DOM rendering

**UI & Components:**
- Tailwind CSS 4.0 - Utility-first CSS framework
- shadcn/ui components - Pre-built accessible UI components using Radix UI primitives
- Radix UI (multiple packages) - Accessible component primitives:
  - `@radix-ui/react-accordion` 1.2.12
  - `@radix-ui/react-avatar` 1.1.11
  - `@radix-ui/react-dialog` 1.1.15
  - `@radix-ui/react-label` 2.1.8
  - `@radix-ui/react-navigation-menu` 1.2.14
  - `@radix-ui/react-scroll-area` 1.2.10
  - `@radix-ui/react-separator` 1.1.8
  - `@radix-ui/react-slot` 1.2.4
  - `@radix-ui/react-tooltip` 1.2.8

**Animations & Motion:**
- Framer Motion 12.23.26 - React animation library for component animations
- GSAP 3.14.2 - GreenSock animation library (advanced animations)
- @gsap/react 2.1.2 - React integration for GSAP
- Lenis 1.3.16 - Smooth scroll library

**Forms & Validation:**
- React Hook Form 7.68.0 - Performant form library with hooks
- @hookform/resolvers 5.2.2 - Validation schema integration for React Hook Form
- Zod 4.1.13 - TypeScript-first schema validation library

**Content & Blog:**
- @next/mdx 14.2.18 - MDX support in Next.js
- next-mdx-remote 5.0.0 - Remote MDX loading
- @mdx-js/react 3.1.1 - MDX React integration
- @mdx-js/loader 3.1.1 - MDX loader
- gray-matter 4.0.3 - YAML/TOML front matter parser for MDX
- rehype-pretty-code 0.14.1 - Syntax highlighting for code blocks
- shiki 3.20.0 - Syntax highlighter
- reading-time 1.5.0 - Reading time calculator for blog posts

**State & Data:**
- @tanstack/react-query 5.90.12 - Server state management and data fetching
- Supabase JavaScript client 2.87.1 - Backend-as-a-service client

**Email & Communication:**
- Resend 6.6.0 - Transactional email service SDK

**Utilities:**
- Lucide React 0.561.0 - Icon library
- clsx 2.1.1 - Conditional CSS class builder
- tailwind-merge 3.4.0 - Merge conflicting Tailwind CSS classes

## Build & Development Tools

**Build:**
- Next.js build system (built-in)
- Tailwind CSS 4 with PostCSS 4 (via @tailwindcss/postcss)

**Development:**
- Next.js dev server
- ESLint 8 - JavaScript/TypeScript linter with Next.js config

**Linting Configuration:**
- eslint-config-next 16.1.4 - Next.js ESLint configuration
- TypeScript support through eslint-config-next/typescript

**Package Management:**
- tw-animate-css 1.4.0 - Tailwind CSS animation utilities

## Configuration Files

**Build Configuration:**
- `next.config.mjs` - Next.js configuration (MDX support, remote image patterns)
- `tsconfig.json` - TypeScript compiler options (target: ES2017, strict mode, path aliases)
- `eslint.config.mjs` - ESLint configuration (Next.js vitals + TypeScript)
- `postcss.config.mjs` - PostCSS configuration
- `components.json` - shadcn/ui configuration (style: new-york, aliases for components)

**Type Definitions:**
- `next-env.d.ts` - Next.js type definitions (auto-generated)

## Environment

**Environment Variables:**
Located in `.env.local` (not committed):

**Required:**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

NEXT_PUBLIC_BUNNY_LIBRARY_ID
NEXT_PUBLIC_BUNNY_VIDEO_ID_HERO
NEXT_PUBLIC_BUNNY_VIDEO_EMBED_URL
NEXT_PUBLIC_BUNNY_VIDEO_HLS_URL
NEXT_PUBLIC_BUNNY_VIDEO_THUMBNAIL_URL
NEXT_PUBLIC_BUNNY_VIDEO_PREVIEW_URL

RESEND_API_KEY
```

**Optional (Analytics & Monitoring):**
```
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_META_PIXEL_ID
NEXT_PUBLIC_CLARITY_ID
```

## Platform Requirements

**Development:**
- Node.js (modern LTS version recommended)
- npm (or equivalent package manager)
- TypeScript 5+
- Modern browser for testing

**Production:**
- Vercel (primary deployment target - Next.js native)
- Node.js 18+ runtime
- Environment variables configured in Vercel dashboard

## Development Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Browser Support

- Modern browsers (ES2017+ JavaScript support)
- Responsive design mobile-first approach
- No IE11 support needed

---

*Stack analysis: 2026-01-23*
