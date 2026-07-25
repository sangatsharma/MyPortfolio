# sangatsharma.com.np

Personal portfolio of **Sangat Sharma** — software engineer specializing in React, Next.js and TypeScript. Designed and built from scratch: single-page experience with full case-study routes, a command palette, and a server-rendered GitHub contribution graph.

## Stack

- **Next.js (App Router)** + React + TypeScript
- **Tailwind CSS** — design tokens in `tailwind.config.js` (dark-only theme)
- **Framer Motion** — scroll reveals, spotlight cards, magnetic CTAs
- **Lenis** — smooth scrolling (disabled under `prefers-reduced-motion`)

## Architecture

```
app/                  Routes: home, /projects/[slug] case studies, sitemap, robots
src/data/             All content — site info, experience, projects, skills, notes
src/sections/         Page sections (Hero, Projects, Experience, About, Stack, …)
src/components/       Chrome (Navbar, CommandPalette, Footer) + ui/ primitives
src/lib/              Utilities and server-side GitHub fetchers
```

Content is fully data-driven: editing `src/data/*` updates the site without touching components. Case-study pages are statically generated via `generateStaticParams`; the GitHub section is a server component revalidated twice daily with zero client JS.

## Development

```bash
pnpm install
pnpm dev      # local dev
pnpm build    # production build (all routes static/SSG)
pnpm lint     # lint
```

## Features

- ⌘K / Ctrl+K command palette — sections, case studies, links, quick actions
- Per-project case studies: problem, solution, architecture, challenges, lessons
- Project filtering by domain
- Accessible: skip link, focus-visible styles, reduced-motion support, semantic landmarks
- SEO: metadata, OpenGraph, JSON-LD Person schema, generated sitemap + robots
