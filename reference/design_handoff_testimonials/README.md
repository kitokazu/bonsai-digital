# Handoff: Bonsai Digital — Testimonials section

## Overview
A "What clients say" section. Five client avatars/logos sit on a loose, map-like scatter over a faint grid. One is featured (large, centered, green gradient ring, soft pulsing glow). Clicking any other avatar swaps places with the featured one via a smooth glide; the quote below crossfades to that client. Auto-rotates every 7s; any click resets the timer.

## About the design files
`Testimonials.dc.html` is a **design reference built in HTML** — a prototype showing look and behavior, not production code. Recreate it as a React component in the Next.js codebase using its existing conventions. Suggested stack: **Motion (motion.dev)** for the swap/glide via `layout` animations, CSS keyframes (or Motion) for ambient float/pulse. anime.js is not required.

## Fidelity
**High-fidelity.** Match colors, type, spacing, timings.

## Component: `<Testimonials />`

### Layout
Full-width `<section>`, bg `#F5F4EF`, padding `clamp(56px,9vw,120px) 24px clamp(64px,8vw,110px)`, flex column, centered.

1. **Header** (max-width 640px, centered text, gap 18px)
   - Eyebrow: "TESTIMONIALS" — Manrope 600, 12px, letter-spacing 0.22em, uppercase, `#2F5A47`
   - H2: "What clients say" — Cormorant Garamond 500, `clamp(44px,6.4vw,84px)`, line-height 0.98, letter-spacing -0.02em, `#16241D`, `text-wrap: balance`
   - Sub: "A few words from the people we have built for." — Manrope 400, `clamp(16px,1.4vw,19px)`, line-height 1.5, `#5C6660`, margin-top 6px

2. **Stage** (`position: relative`, `width: min(1100px, 92vw)`, `aspect-ratio: 1100/460`, margin-top `clamp(20px,3vw,40px)`; on ≤640px: `width: 92vw; aspect-ratio: 1/1`)
   Layers, back to front:
   - Grid: `background-image: linear-gradient(rgba(31,58,46,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(31,58,46,.09) 1px, transparent 1px); background-size: 56px 56px; background-position: center; mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 68%)`
   - Glow: centered circle, width 34% of stage, aspect 1, `background: radial-gradient(circle, rgba(47,90,71,.20) 0%, rgba(47,90,71,.05) 45%, transparent 70%)`, animation `pulse 6s ease-in-out infinite` (scale 1 → 1.08, opacity .55 → .9). Center with `left:50%; top:50%; margin:-17% 0 0 -17%` (not translate — the keyframe transform would override it).
   - Speckle halo: full-stage layer, `background-image: radial-gradient(circle, rgba(47,90,71,.35) .8px, transparent 1.2px); background-size: 9px 9px; mask-image: radial-gradient(circle at 50% 50%, black 0%, transparent 22%); opacity: .7`
   - 5 avatar nodes (see below)

3. **Quote block** (max-width 720px, centered, flex column, gap 22px, margin-top `clamp(28px,4vw,44px)`)
   - Open quote glyph “ — Cormorant Garamond 56px, line-height .5, `#2F5A47`, opacity .5
   - Quote: Cormorant Garamond 400, `clamp(21px,2.3vw,29px)`, line-height 1.42, `#1D2B25`, `text-wrap: pretty`
   - Name: Manrope 600 15px `#16241D`; Role: Manrope 400 13px `#6C766F`, letter-spacing .04em; gap 4px, margin-top 6px
   - Enter animation on change: opacity 0→1, translateY 10px→0, `.7s cubic-bezier(.22,1,.36,1)`. Re-key the block per active client (Motion: `<AnimatePresence mode="wait">` + `key={active.id}`).

4. **Dots** (flex, gap 10px, margin-top 34px): one `<button>` per client, height 6px, radius 3px. Active: width 28px, bg `#2F5A47`. Inactive: width 6px, bg `rgba(47,90,71,.25)`. Transition width `.5s cubic-bezier(.22,1,.36,1)`, bg `.3s`.

### Avatar nodes
Five fixed **slots** (positions as % of stage, size as % of stage width; node is centered on the point):

| slot | x | y | size | role |
|---|---|---|---|---|
| 0 | 50% | 50% | 19% | featured |
| 1 | 12% | 30% | 8.5% | satellite |
| 2 | 30% | 74% | 6.5% | satellite |
| 3 | 71% | 22% | 7% | satellite |
| 4 | 88% | 64% | 9% | satellite |

Each node: `position:absolute; left:x; top:y; width:size; aspect-ratio:1; transform:translate(-50%,-50%)`.
Ring wrapper (`border-radius:50%`):
- Featured: padding 6px, `background: linear-gradient(135deg, #2F5A47, #7FA391)`, shadow `0 24px 60px -18px rgba(31,58,46,.45), 0 0 0 10px rgba(47,90,71,.08)`, z-index 3, cursor default, no float.
- Satellite: padding 3px, bg `rgba(255,255,255,.9)`, shadow `0 10px 30px -14px rgba(22,36,29,.35)`, z-index 2, cursor pointer. Hover: `scale(1.08)`, shadow `0 14px 34px -12px rgba(31,58,46,.45), 0 0 0 4px rgba(47,90,71,.25)`, `.35s ease`.
- Image: circle, `object-fit: cover`, fallback bg `#E6E4DA`. Use `next/image` with `fill` + `sizes`.

Float (satellites only, on an inner wrapper so it doesn't fight the positioning transform): `translateY(0 → -9px → 0)`, ease-in-out infinite. Per-slot durations/delays: slot1 5.2s, slot2 6.1s/.8s, slot3 5.6s/1.6s, slot4 6.6s/.4s.

## Interactions & behavior
- **Select(i)**: swap slot assignments of client *i* and the currently featured client. Every node animates `left/top/width` (and ring padding) over `.8s cubic-bezier(.22,1,.36,1)`. Quote block re-mounts with enter animation. Reset auto-rotate timer.
- **Auto-rotate**: every 7s, select the next client in list order (skipping the featured one). Clear on unmount. Optional: pause on hover of the stage, and respect `prefers-reduced-motion` (disable float/pulse, keep swap).
- Dots and avatars both call `select(i)`; the featured avatar is a no-op.
- Keyboard: nodes should be `<button aria-label={name}>` so they're focusable.

### Motion (motion.dev) approach
Render nodes inside a `LayoutGroup`; give each node `layout` and `layoutId={client.id}`, and set its slot's `left/top/width` as inline style. Changing slot assignment lets Motion animate the layout change. `transition={{ duration: .8, ease: [.22, 1, .36, 1] }}`. Keep float on a nested `motion.div` with `animate={{ y: [0,-9,0] }}` and `transition={{ repeat: Infinity, duration, delay, ease: 'easeInOut' }}`.

## State
```ts
type Client = { id: string; name: string; role: string; quote: string; src: string };
const [order, setOrder] = useState<number[]>([0,1,2,3,4]); // order[i] = slot index of client i
const [active, setActive] = useState(0);                  // client index in slot 0
```
`select(i)`: `const cur = order.indexOf(0); swap order[cur] and order[i]; setActive(i)`.

## Design tokens
Colors: bg `#F5F4EF`, ink `#16241D`, quote ink `#1D2B25`, green `#2F5A47`, green light `#7FA391`, grid green `#1F3A2E` (at .09), muted `#5C6660`, muted-2 `#6C766F`, avatar fallback `#E6E4DA`.
Fonts: Cormorant Garamond (400/500/600 + italic 400), Manrope (400/500/600) — load via `next/font/google`.
Easing: `cubic-bezier(.22,1,.36,1)` for all layout moves.

## Content
Only client 1's quote is real (from the current site); clients 2–5 are placeholders. Replace `data` in the component with real names, roles, quotes, and photos/logos.

## Files
- `Testimonials.dc.html` — interactive reference (open in a browser). Logic is in the `<script data-dc-script>` block; slot positions and timings live in `slots` / `floats`.
- `image-slot.js` — placeholder image helper used by the reference only; not needed in production.
