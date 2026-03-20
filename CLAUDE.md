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

**3D Hero (the centrepiece):** `HeroScene.tsx` is a client component that dynamically imports `HeroCanvas.tsx` with `ssr: false`. The canvas uses raw Three.js `shaderMaterial` with inline GLSL (simplex noise FBM), not drei abstractions. Mouse position is passed via ref from the scene wrapper to the canvas for shader uniforms.

**Project data:** All project content lives in `lib/projects.ts` as a plain TypeScript array — no MDX, no CMS. Project detail pages read from this array. To add a project, add an entry to the array and it auto-generates a route.

**Theming:** Single dark theme via CSS custom properties in `globals.css`, registered with Tailwind's `@theme inline` block. Colors: `background`, `foreground`, `accent`, `accent-hover`, `muted`, `surface`. Fonts: `font-display` (Space Grotesk), `font-mono` (JetBrains Mono).

**Animations:** Use `motion` package (import from `"motion/react"`, NOT `"framer-motion"`). The library was renamed.

### Important conventions

- Path alias `@/*` maps to project root
- No `src/` directory — `app/`, `components/`, `lib/` are at root
- Client components must have `"use client"` directive
- Next.js 15+ async params: `params` in page components is `Promise<{ slug: string }>` and must be awaited
- Per-project colors are passed inline via `style` props (hex + alpha suffixes like `${color}44`)
- Read `node_modules/next/dist/docs/` before using unfamiliar Next.js APIs (AGENTS.md rule)
