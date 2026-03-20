# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (runs on localhost:3000 by default; use `--port 3001` if 3000 is taken)
- **Build:** `npm run build`
- **Lint:** `npm run lint` (ESLint with Next.js core-web-vitals + TypeScript rules)
- **Start production:** `npm run start`

## Architecture

Single-page portfolio site with one detail route. Next.js 16 App Router, TypeScript, Tailwind CSS 4.

### Routing

- `/` — Home page: 3D shader hero, project grid, about section, contact CTA (all sections on one page with anchor links)
- `/projects/[slug]` — Project detail pages (statically generated via `generateStaticParams`)

### Key architectural patterns

**3D Hero (the centrepiece):** `HeroScene.tsx` is a client component that dynamically imports `HeroCanvas.tsx` with `ssr: false`. The canvas uses raw Three.js `shaderMaterial` with inline GLSL (simplex noise FBM with 3 octaves), not drei abstractions. Mouse position is passed via ref from the scene wrapper to the canvas for shader uniforms. Motion animations use `initial`/`animate` directly — no `mounted` state guard needed since motion handles mount animation automatically.

**Project data:** All project content lives in `lib/projects.ts` as a plain TypeScript array — no MDX, no CMS. The `Project` type has: `slug`, `title`, `description`, `category`, `color`, `year`. To add a project, add an entry to the array and it auto-generates a route.

**Theming:** Single dark theme via CSS custom properties in `globals.css`, registered with Tailwind's `@theme inline` block. Colors: `background`, `foreground`, `accent`, `accent-hover`, `muted`, `surface`. Fonts: `font-display` (Space Grotesk), `font-mono` (JetBrains Mono).

**Animations:** Use `motion` package (import from `"motion/react"`, NOT `"framer-motion"`). The library was renamed.

### Component boundaries

- `ProjectGrid` is a **server component** (no `"use client"`) — it renders the grid markup server-side and delegates animation to child `ProjectCard` (client component)
- `HeroScene` (client) handles mouse tracking and text overlay; `HeroCanvas` (client, dynamically imported with `ssr: false`) handles the R3F canvas and shader — this split keeps Three.js out of the SSR bundle
- `BackLink` is a local component in `app/projects/[slug]/page.tsx` — not extracted to `components/` since it's only used on that page

### Important conventions

- Path alias `@/*` maps to project root
- No `src/` directory — `app/`, `components/`, `lib/` are at root
- Client components must have `"use client"` directive; avoid adding it to components that don't need hooks
- Next.js 15+ async params: `params` in page components is `Promise<{ slug: string }>` and must be awaited
- Per-project colors are passed inline via `style` props (hex + alpha suffixes like `${color}44`)
- Avoid permanent `will-change` CSS — motion handles layer promotion during animations
- Since `HeroCanvas` is `ssr: false`, `window` is always available — no `typeof window` guards needed
- Read `node_modules/next/dist/docs/` before using unfamiliar Next.js APIs (AGENTS.md rule)
