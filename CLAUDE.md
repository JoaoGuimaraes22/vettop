@AGENTS.md

# Base Template Conventions

## Project Structure

- All routes live under `app/[lang]/`
- `_components/` — shared UI components (private, not routable)
- `_lib/` — utilities, helpers, services
- `_hooks/` — custom React hooks
- `_types/` — TypeScript types/interfaces
- `dictionaries/` — translation JSON files per locale
- `api/` — API routes using `route.ts` convention

## i18n

- Default locale: `pt`, supported: `pt`, `en`
- Config lives in `i18n-config.ts` (root)
- `proxy.ts` handles locale detection via Accept-Language header
- Translations loaded server-side via `getDictionary(lang)` from `dictionaries.ts`
- Adding a locale: update `i18n-config.ts`, add JSON in `dictionaries/`, add import in `dictionaries.ts`

## Naming

- Files: `kebab-case` (e.g. `locale-switcher.tsx`)
- Components: `PascalCase` exports (e.g. `export default function LocaleSwitcher`)
- Types: `PascalCase` (e.g. `type Locale`)

## Component Conventions

- **Default exports only**: `export default function SectionName`
- **Generic `dict` prop**: `{ dict: DictType }` for section data — never named domain props
- **Locale param**: `lang` (matching route segment `[lang]`) — never `locale`
- **Dict keys**: camelCase of kebab-case filename (`gallery-strip.tsx` → `galleryStrip`)
- **Self-contained sections**: each component gets ONE dict key with ALL its data, no cross-key dependencies
- **Types inferred from JSON**: no explicit Dict interfaces — TypeScript infers from imports
- **Navbar dict**: `{ brand, cta, links: [{ id, label }] }` — links are dict-driven, never hardcoded
- **Page composition**: Navbar + sections + Footer all in `page.tsx`, not layout — layout is for html/body/metadata only
- **`<main>` wrapper**: sections wrapped in `<main>` element in page.tsx for semantic HTML

## Next.js 16 Gotchas

- `proxy.ts` NOT `middleware.ts` — middleware was renamed in Next.js 16
- Use `PageProps<'/[lang]'>` and `LayoutProps<'/[lang]'>` type helpers for route params
- `params` is a Promise — always `await params` before accessing values
- Named export `proxy` (not default export) in proxy.ts
- API routes use `route.ts` with named HTTP method exports (GET, POST, etc.)

## Tailwind v4

- Use canonical opacity syntax: `border-black/8` NOT `border-black/[.08]`
- Use arbitrary values only when no utility exists

## Animations (Motion)

- Library: `motion` (formerly framer-motion)
- Server Components: `import * as motion from "motion/react-client"`
- Client Components: `import { motion } from "motion/react"`
- Use `motion.div`, `motion.button`, etc. as drop-in replacements for HTML elements
- Key props: `animate`, `whileInView`, `whileHover`, `layout`, `transition`

## Patterns

- Server Components by default — only add `"use client"` when needed
- `error.tsx` must be a Client Component (`"use client"`)
- Use `_` prefix folders for non-routable code inside `app/`
- Route groups `(name)` for organizing without affecting URLs
