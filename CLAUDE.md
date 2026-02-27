# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bonsai Digital is a single-page React portfolio/agency website for a Japan-based digital agency. Built with Next.js (App Router) + React 18 + TypeScript, styled with Tailwind CSS and shadcn/ui components.

## Commands

- `npm run dev` — Start Next.js dev server (localhost:3000)
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — ESLint check
- `npm run test` — Run tests once (Jest)
- `npm run test:watch` — Run tests in watch mode

## Architecture

**Next.js App Router** with a single-page layout. The home page (`app/page.tsx`) composes section components: Navbar, Hero, Services, Work, About, Contact, Footer. Navigation uses smooth-scroll to anchor IDs (`#services`, `#work`, etc.).

**App Router structure**: `app/layout.tsx` (root layout with fonts, metadata, providers), `app/page.tsx` (home), `app/not-found.tsx` (404), `app/providers.tsx` (client-side provider wrappers), `app/globals.css` (global styles).

**UI components** live in `src/components/ui/` (50+ shadcn/ui components configured via `components.json`). Section-level components are directly in `src/components/`. All section components and interactive UI components use `"use client"` directive.

**Path alias**: `@` maps to `./src` (configured in `tsconfig.json`).

**Styling**: Tailwind with HSL CSS variables defined in `app/globals.css`. Custom design tokens: sage green primary, terracotta accent, warm cream background. Fonts: Cormorant Garamond (headings), Inter (body) via `next/font/google`. Class merging uses `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge).

**Animation**: Framer Motion for scroll-triggered animations (`useInView`), staggered reveals, and hover interactions. Additional CSS keyframe animations defined in `tailwind.config.ts`.

**Forms**: React Hook Form + Zod validation. Contact form currently simulates submission with toast notifications (Sonner).

**State**: TanStack React Query for data fetching (wrapped in `app/providers.tsx`), React hooks for local state, custom reducer pattern for toast notifications (`src/hooks/use-toast.ts`).

**Images**: Static assets in `public/` directory, using `next/image` for optimized loading.

## TypeScript Configuration

TypeScript is configured with loose checking — `noImplicitAny`, `noUnusedParameters`, and `strictNullChecks` are all `false`.

## Adding shadcn/ui Components

Components are configured with the `default` style, TSX, and CSS variables. Aliases: `@/components/ui` for UI components, `@/lib` for utilities, `@/hooks` for hooks.

## Hard Rules

- Follow the existing file structure and naming conventions.
- Use the provided design tokens and fonts.
- For the copy, make it sound natural. Do not use the dash, as that it is a easy give away that it is AI generated. Instead, use a more conversational tone.
- When adding new components, ensure they are responsive and accessible.
- Use skills for design, do not make it look AI generated
- Any change that affects the copy, I would like to reflect it both on the English version and the Japanese version. I want to make sure that both versions are consistent in terms of messaging and tone.
