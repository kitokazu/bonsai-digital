# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

Owner: Kai (Toyota engineer, US-raised, Japanese heritage, local Tokyo resident)
Mission: Help local Japanese SMEs get their first professional web presence
Target market: Small businesses in Tokyo
Primary pitch: Demo-first — build the site before walking in
Positioning: "Toyota engineer who builds websites/digital solutions for local businesses"

## Project Overview

Bonsai Digital is a single-page React portfolio/agency website for a Japan-based digital agency. Built with Next.js (App Router) + React 18 + TypeScript, styled with Tailwind CSS and shadcn/ui components.

## About Bonsai Digital

Bonsai Digital is a Japan-first digital agency that builds modern web, software, and AI solutions for businesses. The brand should feel modern, trustworthy, calm, premium, and simple. Avoid gimmicky or overly flashy UI decisions.

## Product mindset

We build practical business tools, client-facing websites, internal dashboards, automation systems, and AI-enabled workflows. Prioritize clarity, maintainability, and business usefulness over novelty.

## Primary audience

Our clients are businesses that want a polished digital presence or internal tools that solve real workflow problems. Many users may not be technical. UX should be intuitive, professional, and easy to explain in demos.

## Japan-first considerations

- Consider Japanese business expectations in UX and copy.
- Favor clarity, reliability, and professionalism.
- Be careful with localization, spacing, date formats, address handling, and formal wording.
- Although english text looks better when aligned in the center, japanese text looks better when aligned to the left. So, for the Japanese version of the website, I would like to have the text aligned to the left, while for the English version, I would like to have it aligned in the center. This way, we can ensure that both versions look their best and are easy to read for their respective audiences.
- Avoid assuming US-only workflows.
- Where relevant, design systems should support both Japanese and English content gracefully.
- Make the Japanese sound as natural

## Brand guidelines

- The Bonsai Digital brand should feel minimal, refined, modern, and credible.
- Prefer clean layouts, strong spacing, restrained typography, and subtle visual hierarchy.
- Avoid cheesy “zen” tropes, overly decorative Japanese motifs, or startup cliches.
- Use language that feels confident and professional, not hype-heavy.
- Designs should be suitable for Japanese business users and international clients.

## Hard Rules

- Follow the existing file structure and naming conventions.
- Use the provided design tokens and fonts.
- For the copy, make it sound natural. Do not use the dash, as that it is a easy give away that it is AI generated. Instead, use a more conversational tone.
- When adding new components, ensure they are responsive and accessible.
- Use skills for design, do not make it look AI generated. Like frontend-skills or taste-skills
- Any change that affects the copy, I would like to reflect it both on the English version and the Japanese version. I want to make sure that both versions are consistent in terms of messaging and tone.

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
