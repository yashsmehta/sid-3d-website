# Sid 3D Portfolio Website — MVP Plan

A personal portfolio site with a striking 3D shader hero and clean project showcase. Ship a working site first, iterate later.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 15 (App Router, TypeScript)** |
| 3D | **Three.js + React Three Fiber + drei** |
| Styling | **Tailwind CSS 4** |
| Animations | **Motion** (formerly Framer Motion) |
| Deployment | **Vercel** |

No MDX, no CMS, no complex content pipeline. Projects are simple data objects for now.

---

## Site Structure

```
/                → Home (3D hero + project grid + about blurb + contact)
/projects/[slug] → Individual project page
```

That's it. Single-page feel with one detail route. No separate about page or projects index — keep it tight.

---

## Phase 1: Scaffolding & Layout

- `create-next-app` with App Router, TypeScript, Tailwind
- Install: `three`, `@react-three/fiber`, `@react-three/drei`, `motion`
- Folder structure:

```
sid_3D_website/
├── app/
│   ├── layout.tsx          ← Root layout (nav, fonts)
│   ├── page.tsx            ← Home (hero + projects + about + contact)
│   └── projects/
│       └── [slug]/
│           └── page.tsx    ← Project detail
├── components/
│   ├── Header.tsx
│   ├── HeroScene.tsx       ← 3D shader canvas
│   ├── ProjectCard.tsx
│   └── Footer.tsx
├── lib/
│   ├── projects.ts         ← Project data (simple array of objects)
│   └── shaders/
│       └── hero.frag       ← GLSL fragment shader
├── public/
│   └── images/
└── tailwind.config.ts
```

- **Header:** Name/logo left, 2-3 nav anchors right (Projects, About, Contact — all scroll to sections on home page)
- **Footer:** Social links, that's it
- Pick one display font + one body font, dark background by default

---

## Phase 2: 3D Hero

The centrepiece. Full-viewport canvas behind hero text.

- R3F `<Canvas>` with a plane + custom shader material
- Start with a **drei distort/wobble material** or a simplex noise flow field — get something moving and beautiful on screen fast
- Customize colors to match site palette (pass as uniforms)
- Subtle mouse-follow parallax
- Performance: cap DPR at 1.5, lazy load canvas with `next/dynamic` (ssr: false)
- Mobile: simplified version or CSS gradient fallback

---

## Phase 3: Project Showcase

- **Project data** in `lib/projects.ts` — array of objects:
  ```ts
  {
    slug: string
    title: string
    description: string
    category: string
    image: string       // path to hero image
    color: string       // accent color
  }
  ```
- **Home page grid:** 2-3 columns on desktop, 1 on mobile. Each card = image + title + category. Simple hover scale effect.
- **Project detail page:** Hero image, title, description, a few more images. No MDX — just a component that reads from the data array. Can upgrade to MDX later when there's real long-form content.

---

## Phase 4: About & Contact Sections

On the home page, below the project grid:

- **About:** Short bio paragraph + a photo or visual. Keep it to one section.
- **Contact:** Email link and social links. No form needed yet — just a clear "Get in touch" with a mailto and links to LinkedIn/GitHub/etc.

---

## Phase 5: Polish (minimal)

- Smooth scroll for nav anchor links
- Fade-in animations on scroll for project cards (Motion + IntersectionObserver)
- `prefers-reduced-motion` support — disable shader, use static gradient
- Responsive pass: make sure it works on phone
- Next.js `<Image>` for optimized images
- Basic meta tags + OG image

---

## Phase 6: Ship

- Deploy to Vercel
- Custom domain
- Done. Iterate from here.

---

## Implementation Order

| Step | Task |
|------|------|
| 1 | Scaffold Next.js project + install deps |
| 2 | Root layout + Header + Footer + fonts + dark theme |
| 3 | 3D Hero scene on home page |
| 4 | Project data + grid on home page |
| 5 | Project detail page |
| 6 | About + contact sections on home page |
| 7 | Scroll animations + responsive pass |
| 8 | Deploy |

---

## What's Deliberately Deferred

These are good ideas from the original plan — saved for after the MVP is live:

- Multiple color themes + theme switcher
- MDX content pipeline
- Project filtering / categories
- Custom cursor + magnetic buttons
- Page transitions between routes
- Analytics
- SEO optimization beyond basics
