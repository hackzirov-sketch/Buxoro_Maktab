# Buxoro Maktabi

Ultra-premium futuristic landing page for Buxoro Maktabi, an elite private school in Bukhara, Uzbekistan.

## Run & Operate

- `pnpm --filter @workspace/buxoro-maktabi run dev` — run the frontend (preview at `/`)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- React + Vite (frontend only, no backend)
- Framer Motion for animations
- Tailwind CSS v4 + glassmorphism design
- shadcn/ui components

## Where things live

- `artifacts/buxoro-maktabi/src/` — full landing page source
  - `App.tsx` — root component, renders all sections
  - `src/sections/` — Navbar, Hero, SchoolLife, Testimonials, Kitchen, Results, Teachers, ApplicationForm, Footer
  - `src/index.css` — theme (deep forest green palette, Google Fonts import)
- `attached_assets/` — brand images (logo, school gate, kitchen, hero reference)

## Architecture decisions

- Single-page app with scroll navigation — no routing needed
- Glassmorphism design with backdrop-blur and translucent overlays
- Framer Motion scroll-triggered animations using `useInView`
- Animated counters in Results section that trigger on scroll
- All content in Uzbek language

## Product

A cinematic landing page for Buxoro Maktabi with: glassmorphism navbar, animated hero section, school life showcase, testimonials carousel, interactive kitchen menu, animated results stats, teacher grid with 3D hover effects, and a glassmorphism application form with validation.

## User preferences

- All UI text in Uzbek language
- Deep forest green + neon mint green color palette
- Glassmorphism design language throughout
- Phone: +998 90 123 45 45

## Gotchas

- Google Fonts @import must be FIRST line in index.css (before @import "tailwindcss")
- Assets imported via @assets/ alias pointing to attached_assets/
