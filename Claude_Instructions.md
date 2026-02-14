# CLAUDE_INSTRUCTIONS.MD

You are the coding agent for this project. Read this file completely before doing anything.

---

## Phase 0 — Discovery (Run Once, First Interaction)

Before writing any code, you must understand the project. Do this **automatically** on your first interaction:

### Step 1: Scan the repo
Infer everything you can silently from:
- `package.json` (dependencies, scripts, package manager from lockfile)
- Config files (`next.config.*`, `vite.config.*`, `tailwind.config.*`, `tsconfig.json`)
- Existing `src/` structure (routing, components, patterns)
- `public/` assets

### Step 2: Ask the user these questions
Present them as a numbered list. Do not proceed until answered.

1. **Project name & client** — Who is this for? (e.g., "SSLS — logistics company in KSA")
2. **Sector** — What industry? (logistics, hospitality, tech, creative portfolio, ecommerce, other)
3. **Design feel** — Pick one or describe:
   - 🔲 Sharp Edges (industrial, zero border-radius, precision)
   - 🔵 Rounded Modern (soft corners, friendly, consumer)
   - 🟣 Glassmorphic Dark (blur, transparency, premium tech)
   - ✏️ Custom (describe it)
4. **Brand colors** — Primary, secondary, accent. Or say "suggest based on sector."
5. **Languages** — Monolingual (EN) or bilingual? Which languages? RTL needed?
6. **Animation preference** — Framer Motion, GSAP, CSS-only, or "make it feel alive but don't overdo it"?
7. **Anything special?** — Video hero, 3D elements, specific sections, content rules, etc.

### Step 3: Lock the answers
After the user responds, write a `## Project Profile` section at the bottom of this file with the finalized answers. This becomes the source of truth for all future work.

---

## Hard Rules (Always Apply)

### 1. No dependency creep
- Do NOT add npm packages unless they already exist in `package.json` or the user explicitly requests it.
- If something is needed but not allowed, propose an alternative using existing deps.

### 2. Patch-only development
- Prefer editing existing files over creating new ones.
- Output changes as small, reviewable diffs. No massive rewrites.
- If you must create files, only create them in directories that already exist in the project.

### 3. Respect what's already there
- Use existing components, design tokens, and patterns first.
- No random colors or spacing — use what the project already defines.
- No inline styles unless the codebase already uses them.
- Match the naming conventions you see in the repo (PascalCase components, camelCase utils, etc.)

### 4. Build must pass
- Your work is not "done" until the build succeeds.
- Infer the correct commands from `package.json` scripts.
- Infer the package manager from the lockfile (`pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `package-lock.json` → npm).

---

## Design Standards (Apply Based on Project Profile)

### Typography
- Use professional fonts (Google Fonts like Inter, Outfit, Playfair Display) — never browser defaults.
- Proper heading hierarchy: one `<h1>` per page, then `<h2>`, `<h3>`, etc.
- Uppercase + wide tracking for section titles in industrial/premium projects.

### Color Discipline
- Never use raw hex in components. Use design tokens / CSS variables / Tailwind theme colors.
- Hero text over video/images: ensure contrast. Use pure white if the brand color doesn't pass.
- Test button contrast against both the lightest and darkest parts of any background image.

### Spacing
- Clean rhythm — no random margins. Use consistent padding scale.
- Generous whitespace between sections (py-20 to py-28 range for premium feel).
- All content in `max-w-* mx-auto` containers — nothing bleeds to the edge on wide screens.

### No Emojis in Premium Projects
- Replace emojis with proper icons (Lucide, Heroicons, custom SVGs).
- Exception: if the project profile says the vibe is casual/playful.

---

## Responsive Rules (Always Apply)

- **Mobile-first.** Every layout must work at 320px.
- **Hero sections:** Use `min-h-svh` (dynamic viewport height), not fixed pixel values.
- **Fluid containers:** Use responsive padding (`px-4 sm:px-6 lg:px-8`), not fixed widths (`w-[95%]`).
- **Decorative elements:** Hide complex visual layers below 640px to prevent overflow and improve performance.
- **Test range:** 320px → 2560px.

---

## Animation Rules (Always Apply)

### Philosophy: Soul First
1. **Never strip animations for performance.** A "dead" page is worse than a slow one.
2. Focus on **invisible optimizations** first: better asset formats, DOM reduction, async decoding.
3. If an animation is heavy, swap its **engine** (e.g., CSS `@keyframes` instead of JS-driven) — don't delete the effect.

### Safety
- Avoid setting `opacity: 0` as initial state in scroll-triggered animations — if the trigger doesn't fire, elements stay permanently invisible.
- Prefer declarative approaches (`whileInView`, CSS `@keyframes`) over imperative ones (manual GSAP timelines) unless precision sequencing is needed.
- Scope all JS animations to a container ref for automatic cleanup on unmount.

### Video Backgrounds
- Must autoplay on initial load AND after any client-side navigation (locale switch, route change).
- Listen for `canplay`, `loadeddata`, and `visibilitychange` to handle browser autoplay policies.

---

## Performance Rules (Always Apply)

### Assets
- All images should be WebP or AVIF. Delete legacy JPG/PNG after migration.
- `loading="lazy"` on all below-the-fold images.
- `decoding="async"` on all non-hero images.
- `fetchPriority="high"` on the hero image/video only.
- Keep initial viewport payload under 2MB.

### Code
- Lazy-load below-the-fold sections (`React.lazy` + `Suspense fallback={null}`).
- No infinite JS animations in the footer or off-screen sections — they burn CPU while invisible.
- Use `will-change: transform, opacity` sparingly for GPU promotion.

### Hygiene
- Delete unused components, zombie assets, and stale build artifacts.
- Clear `.next/` or `dist/` when debugging stale build errors.

---

## i18n Rules (Apply If Bilingual)

- Use institutional/formal translations for business names — NOT phonetic transliterations.
- `generateStaticParams()` must exist on **every** page inside a dynamic `[locale]/` route (not just layout).
- Root `/` redirect must be client-side for static export compatibility.
- Use `key={locale}` on the main wrapper to re-trigger animations on language switch.
- Test both LTR and RTL layouts thoroughly.

---

## Agent Workflow (Every Request)

1. **Plan** — State what files you'll touch and what changes.
2. **Implement** — Smallest diff possible. Reuse existing patterns.
3. **Verify** — Run the build. Fix failures. No "it should work" responses.
4. **Summarize** — What changed, where, how to preview, any tradeoffs.

---

## Definition of Done

A request is done when:
- [ ] The change exists and matches project conventions
- [ ] Build passes
- [ ] Mobile (320px) is not broken
- [ ] Desktop/wide (2560px) is not broken
- [ ] Animations are visible and working (nothing hidden by bad initial state)
- [ ] If applicable: video plays, navigation works, locale switching works
- [ ] The diff is small and reviewable

---

## Project Profile

- **PROJECT_NAME:** Therapy Jo Landing Page
- **CLIENT:** Therapy Jo Physiotherapy Center
- **SECTOR:** Healthcare / Physiotherapy
- **DESIGN_LANGUAGE:** Rounded Modern (soft corners, clean, health/wellness aesthetic)
- **PRIMARY_COLOR:** Light Green (#4CAF93)
- **SECONDARY_COLOR:** Blue (#2A7AB5)
- **ACCENT_COLOR:** White (#FFFFFF)
- **LANGUAGES:** English (EN)
- **RTL:** No
- **ANIMATION_LIB:** GSAP + ScrollTrigger
- **SPECIAL_NOTES:**
  - Video hero background (6111040-uhd_3840_2160_25fps.mp4)
  - Logo: logo.jpg
  - Instagram: @therapyjocenter
  - WhatsApp/Phone: +962799819669
  - Services: Manipulation, Cupping Therapy, Hawkgrips, Theragun, Consultations
  - Location: Therapy Jo Physiotherapy Center, Az-Zubayr Ben Al-Awwam St., Amman, Jordan
  - Floating WhatsApp CTA button
  - Google Maps embed for location
