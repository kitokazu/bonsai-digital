# Bonsai Digital — Redesign Plan

Date: 2026-06-26
Owner: Kai
Goal: Make it instantly clear what Bonsai Digital does, without committing to a single niche. Keep range visible, but legible.

---

## 1. The core problem (and what actually fixes it)

The current site is hard to read because it never says one clear thing up top, and the work isn't framed around results.

Two reference sites solve this in opposite ways:

- **Creme** is clear because it says *one* thing ("MVP in 2 weeks"). One offer, one price, a wall of proof. Narrowness creates clarity.
- **Aurelis** is broad (six services) but stays legible because every service has its own page and every case study leads with a *result*, not a tech stack ("Cuts Work Order Time by 40%", "1K+ Traders Matched in 48 Hours", "Saves Creators $21,600+/year").

You want range, not a niche. So we copy Aurelis's mechanism, not Creme's: **breadth is fine as long as (1) one sharp sentence frames it up top, and (2) every project leads with a business outcome instead of a technology.**

Clarity does not come from more sections. It comes from a sharp top line plus outcome-first project cards.

---

## 2. Positioning

Direction chosen: **range, can build anything based on business needs.**

The wedge that makes "we build anything" read as *range* instead of *confusion*:

> Engineer-grade reliability + local + demo-first.

You don't need a vertical niche. "A Toyota engineer who builds the digital thing your business actually needs, and shows you a working version before you commit" is the position. The breadth becomes a feature: one partner for the website, the internal tool, and the app.

**Homepage one-liner (draft):**

- EN: "We build the digital tools your business actually needs. Websites, internal systems, and apps, designed and engineered to work."
- JA: 「ビジネスに本当に必要なデジタルの仕組みをつくります。ウェブサイト、社内システム、アプリまで、きちんと動くものを設計します。」

**Supporting line (demo-first promise):**

- EN: "Often we build a working version first, so you can see it before you decide."
- JA: 「多くの場合、まず実際に動くものをおつくりします。判断する前に、その目で確かめていただけます。」

(Copy notes below in section 6. EN centered, JA left-aligned, no dashes.)

---

## 3. Information architecture

Single page, smooth-scroll anchors, same as today. New section order:

1. **Hero** — one-liner + demo-first promise + primary CTA (Book a call / Get a demo)
2. **What we do** — the two buckets explained in one screen (see section 4)
3. **Work** — project grid, outcome-first, filterable by tag
4. **How we work** — the demo-first process (this is your differentiator, give it room)
5. **About** — Toyota engineer, local Tokyo, Japanese + English
6. **Contact** — keep the existing form as-is (email + location + form, no phone)
7. **Footer**

**Pricing is removed.** Decision: pricing isn't settled yet, so we drop it entirely. That means deleting the pricing section and removing the `#pricing` links from the navbar and footer (and the pricing entries in `en.json` / `ja.json` once we implement). No "starting from" placeholder either; it just goes away.

Removed/merged: any vague "services" list that overlaps with "What we do". One place only.

---

## 4. The work model: two buckets, merged the smart way

Internal tools, automation, dashboards, AI, and MVPs all merge into one bucket. The clean split a visitor understands instantly:

### Bucket A — Websites
Your public face. Marketing sites, landing pages, the 3D / scroll-driven visual work.
Sub-tags: `Landing` · `Brand site` · `3D / Motion`

### Bucket B — Software & Tools
Things that *run* and do work. Internal systems, automations, dashboards, AI features, and full apps / MVPs.
Sub-tags: `Automation` · `Dashboard` · `AI` · `App / MVP`

Each project card carries one tag, so within "Software & Tools" the visitor still sees you do automation *and* dashboards *and* AI *and* shippable apps. Range stays visible; the top level stays to two simple ideas.

Optional later: a third lightweight bucket "Consulting / Discovery" for when the deliverable is advice, not a build. Hold for now.

---

## 5. Project mapping (outcome-first)

Every card = **Outcome headline** + one line of context + tag. Draft headlines below; we will tighten numbers where you can confirm them.

### Software & Tools

| Project | Outcome headline (draft) | Tag |
|---|---|---|
| GAS automation for influencer agency | "Cut hours of manual spreadsheet work each week for an influencer management agency." | Automation |
| Sheets → Postgres migration + dashboard | "Moved a growing business off fragile spreadsheets onto a real database, with a live dashboard on top." | Dashboard |
| AI matching system | "Built an AI matching engine inside the dashboard to pair the right people automatically." | AI |
| AR art gallery MVP | "Shipped a working AR art gallery MVP so the client could test the idea with real users." | App / MVP |
| RAG assistant + analytics (reframed) | "Built a RAG assistant and analytics dashboard for a public-sector organization." | AI |

> Note on the last one: framed generically, no client name, no project detail, since you can't discuss it. Confirmed framing is "public-sector organization" (the work was for a public sector body, not a large private org).

### Websites

| Project | Outcome headline (draft) | Tag |
|---|---|---|
| Client sites / landing pages | "Gave local businesses their first professional web presence." | Landing / Brand site |
| 3D / scroll-driven sites | "Built immersive, motion-driven sites that make a brand feel premium the moment it loads." | 3D / Motion |

Action for Kai: confirm any real numbers (hours saved, users, %), and which projects can show a real screenshot vs a generic visual.

---

## 6. Copy guidelines (per CLAUDE.md)

- Every copy change ships in **both EN and JA**. Keep messaging and tone consistent across both.
- **No dashes** in copy. They read as AI-generated. Use commas or a conversational rephrase.
- **Alignment:** EN centered, JA left-aligned.
- Japanese should sound natural and professional, not translated. Favor clarity and a calm, confident tone over hype.
- Tone: confident professional, not hype-heavy. No "zen" tropes or decorative Japanese motifs.

---

## 7. Section-by-section copy outline

### Hero
- Headline (one-liner from section 2)
- Sub-line (demo-first promise)
- CTA: "Book a call" / 「相談する」 and secondary "See the work" / 「実績を見る」

### What we do
- Short intro sentence, then two cards: **Websites** and **Software & Tools**, each with a one-line description and the sub-tags.
- EN intro draft: "Two kinds of work, one standard. Whatever your business needs, it gets built to actually work."
- JA intro draft: 「つくるものは大きく二つ。どちらも、きちんと動くことを基準にしています。」

### Work
- Filter chips: All / Websites / Software & Tools (+ tag filters)
- Outcome-first cards from section 5.

### How we work (demo-first)
Three or four steps. Draft:
1. Understand the business need (a real conversation, not a form). 
2. Build a working demo first.
3. You see it, then we refine together.
4. Ship, then maintain and improve.

- JA must mirror these one to one.

### About
- Toyota engineer, US-raised, Japanese heritage, local Tokyo resident.
- Angle: engineering discipline applied to small-business digital work, locally, in your language.

### Contact
- Keep the existing form exactly as it is (React Hook Form + Zod, the `/api/contact` flow). No changes to the form itself.
- No phone numbers (decided against showing them publicly for now). Contact stays email + location + form.

---

## 8. Build notes (for when we implement)

- Existing stack stays: Next.js App Router, React 18, TS, Tailwind, shadcn/ui, Framer Motion.
- New/changed components: `Hero`, a new `WhatWeDo`, refactor `Work` into a filterable outcome grid, `Process` (demo-first), keep `About`, `Contact`, `Footer`.
- Work data should be a typed array (title EN/JA, outcome EN/JA, tag, bucket, image) so EN/JA and filtering stay in sync from one source.
- Follow existing file structure and naming. Components responsive and accessible. Use the design tokens and fonts already defined.
- Use design/taste skills when building so it doesn't look AI-generated.

---

## 9. Decisions (resolved) + open items

Resolved 2026-06-26:
- **Pricing:** removed entirely (not settled). Delete section + nav/footer links + dictionary entries.
- **RAG project:** framed as "public-sector organization" only.
- **Contact form:** keep exactly as-is.
- **Phones:** not shown publicly. No phone numbers on the site for now.

Still open:
1. Confirm real numbers for the outcome headlines (hours saved, %, user counts) where you have them.
2. Any project to drop or add before I write final copy?

---

## 10. Suggested next step

Once you confirm section 9, I'll produce the full final copy deck (EN + JA, every section, ready to paste), then we implement bucket by bucket in the codebase.
