# Claude Code Implementation Brief — Bonsai Digital Redesign

Paste this into Claude Code from the repo root. It implements the redesign defined in `REDESIGN_PLAN.md` and uses the exact copy in `BONSAI_COPY_DECK.md`. Read both before starting.

---

## Goal

Make it instantly clear what Bonsai Digital does, while keeping range visible. Two top-level work buckets (Websites / Software & Tools), outcome-first project cards, a demo-first process section, and pricing removed entirely. Positioning: an engineer who can build whatever the business needs, demo-first.

## Ground rules (from CLAUDE.md, do not break)

- Every copy change ships in **both** `src/dictionaries/en.json` and `src/dictionaries/ja.json`, kept consistent in meaning and tone.
- **No em dashes** in any copy. Use commas or rephrase.
- **EN text is centered, JA text is left-aligned.** The codebase already branches on `locale`; follow the existing pattern (`locale === "ja" && "..."`) for alignment.
- Japanese must read naturally and professionally. Use the copy in `BONSAI_COPY_DECK.md` verbatim.
- Follow existing file structure, naming, design tokens, and fonts. New components are responsive and accessible.
- Use design/taste skills (frontend-skills, taste-skills) so the result does not look AI-generated. Keep it minimal, refined, premium, calm.
- Do not touch the contact form logic. Copy/labels only.

## Source of truth for copy

`BONSAI_COPY_DECK.md` has every string in EN + JA. Do not write new copy; pull from there.

---

## Tasks (in order)

### 1. Remove pricing entirely
- Delete the pricing section component and its usage in `app/page.tsx`.
- Remove the `#pricing` / Plans link from `src/components/Navbar.tsx` and `src/components/Footer.tsx`.
- Remove the `pricing` block and the `navbar.pricing` key from both `en.json` and `ja.json`.
- Remove any pricing-related anchors or scroll targets.

### 2. New section: "What we do" (two buckets)
- Create `src/components/WhatWeDo.tsx` (`"use client"`), placed after `Hero` in `app/page.tsx`.
- Two cards: **Websites** and **Software & Tools**, each with title, description, and tag chips. Copy from deck section 2.
- This replaces the old three-item `services` section. Repurpose the `#services` anchor or rename to `#what-we-do` and update nav links in both languages.
- Add a `whatWeDo` block to both dictionaries.

### 3. Refactor Work into a filterable, outcome-first grid
- One typed data source for projects so EN/JA and filtering stay in sync. Suggested: `src/lib/work.ts` exporting a typed array. Each item:
  ```ts
  {
    slug: string,
    bucket: "websites" | "software",
    tag: string,        // e.g. "Brand site", "AI / Dashboard", "App / MVP"
    titleKey: string,   // resolves into dictionaries (en/ja)
    outcomeKey: string, // outcome headline, resolves into dictionaries
    href?: string,      // detail page if one exists
    image?: string,
    confidential?: boolean
  }
  ```
- Card shows the **outcome headline first** (large), then tag, then title. Copy from deck section 3.
- Add filter chips: All / Websites / Software & Tools (localized). Filtering is client-side state.
- Projects to include (copy in deck):
  - Websites: Home Hair & Coffee Roaster, Chnl301, CG Online Academy, DefineX
  - Software & Tools: Influencer agency internal platform (new), Public-sector AI platform (was CashFlowAI), AR art gallery MVP (new)
- **Replace the old `CashFlowAI` entries** in the work list and in `workDetail` with the **Public-sector AI platform** copy. Add a small "Client confidential" badge on this card. No finance framing anywhere.
- Add the two new projects (Influencer agency platform, AR gallery MVP) to the work list. Detail pages optional; if you add them, follow the existing `workDetail` structure in both dictionaries.

### 4. New section: "How we work" (demo-first process)
- Create `src/components/Process.tsx` (`"use client"`), four steps from deck section 4. Place it so the demo-first story has room (after Work, before About is fine).
- Keep the existing free-sample section/CTA; refresh its copy from deck section 5 in both dictionaries.
- Add a `process` block to both dictionaries.

### 5. About, Contact, Footer copy updates
- About: new heading and paragraphs (Toyota engineer, Yokohama roots but based in Tokyo) and the three values. Deck section 6. Update both dictionaries.
- Contact: keep form logic untouched. Update label/heading/description copy (deck section 7). Location stays "Tokyo, Japan" / 東京. No phone numbers.
- Footer: tagline "Crafted from scratch in Japan" / "日本から、ひとつずつ手づくりで。" Remove pricing link. Deck section 8.

### 6. Page composition
- Final `app/page.tsx` order: Navbar, Hero, WhatWeDo, Work, Process (+ free sample), About, Contact, Footer.
- Update Hero copy from deck section 1 in both dictionaries.

---

## Acceptance criteria

- No pricing anywhere (UI, nav, footer, dictionaries, anchors).
- `en.json` and `ja.json` have identical key structures; every new/changed string exists in both.
- EN renders centered, JA renders left-aligned across new sections.
- No em dashes in any copy string.
- Work grid filters by bucket and leads each card with the outcome line.
- The public-sector card shows a "Client confidential" badge and contains no finance wording; no "CashFlowAI" string remains in the repo.
- `npm run lint` passes and `npm run build` succeeds.
- Site is responsive at mobile, tablet, desktop; new sections are keyboard and screen-reader accessible.

## Verification (do this before finishing)

1. `grep -ri "cashflow\|pricing\|plans" src app` returns nothing meaningful.
2. Diff `en.json` and `ja.json` key trees; they must match.
3. `npm run lint && npm run build`.
4. Run `npm run dev` and check each section in both locales, confirming EN centered / JA left and that filters work.
