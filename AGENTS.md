# web-client-snd Development Guidelines

## Project Overview

**سند (Sanad)** is an Arabic-first RTL education platform that acts as an AI-powered private tutor. Students browse courses, study chapters, and interact with an AI tutor through voice (LiveKit) and chat. The platform covers onboarding, course enrollment, study sessions with real-time AI interaction, a personal library, and admin tooling.

The entire UI is in Arabic, uses RTL layout, and targets Saudi Arabian students (`ar_SA` locale).

## Skills

- **Whenever writing any code**, load and follow the `vercel-react-best-practices` skill first.
- **Whenever designing or building frontend UI** (components, pages, layouts, styling), load and follow both the `web-design-guidelines` skill and the `frontend-design` skill together.

## Package Manager

**Always use `pnpm`.** Never use `npm`, `yarn`, or any other package manager for any operation (install, run, add, etc.).

## Commands

- `pnpm dev` — start dev server (port 3000)
- `pnpm build` — production build (`next build`)
- `pnpm lint` — lint the project. **This is the only lint command.** Never install or use any other linting tool or linter — always run `pnpm lint`.
- `pnpm update-db-types` — regenerate Supabase TypeScript types into `src/types/database.types.ts`

There is no test runner configured. Do not attempt to run tests.

## Node Version

v24.12.0 (see `.nvmrc`). Use `nvm use` before running any command.

## Architecture

Next.js 16 App Router with React 19 + TypeScript 5.

### Path Alias

`@/*` maps to `./src/*` (configured in `tsconfig.json`).

### Route Groups (`src/app/`)

- `(app)/` — main authenticated area: courses (`[course]/[chapter]/study/`), onboarding, settings, my-library
- `(auth)/` — Clerk auth pages
- `(legal)/` — legal/privacy pages
- `(feedback)/` — feedback flow
- `admin/` — admin pages
- `api/` — API routes: `complete-onboarding`, `enroll`, `feedback`, `fetch-bunny`, `get-lk-token`, `webhooks`

### Key Directories

- `src/components/ui/` — Shadcn/ui components (new-york style)
- `src/components/study/` — study session components (LiveKit voice, AI chat)
- `src/components/landing/` — landing page
- `src/lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `src/lib/supabaseClient.ts` — browser Supabase client
- `src/lib/supabaseAdmin.ts` — server-side Supabase admin client
- `src/context/databaseContext.tsx` — shared DB context
- `src/database/db-schema.ts` / `db-config.ts` — DB schema definitions
- `src/types/database.types.ts` — auto-generated Supabase types (do not edit manually)

### External Services

- **Clerk** — auth (Arabic localization, `arSA`)
- **Supabase** — database & storage
- **LiveKit** — real-time voice/video
- **Bunny.net** — CDN (images served from `snd-zone.b-cdn.net`)
- **OpenAI / ElevenLabs** — AI via Vercel `ai` SDK
- **Langfuse** — observability

## Conventions

- RTL layout (`dir="rtl"`, `lang="ar"`), Cairo font — maintain RTL support in all UI changes
- Dark mode is the default (root `<html>` has `className="dark"`)
- Shadcn/ui new-york style with `lucide-react` icons — add new UI components via `npx shadcn@latest add <component>`
- Tailwind CSS 4.x with `@tailwindcss/postcss` plugin
- Global styles and CSS custom properties (color palette) in `src/styles/globals.css`
- `components.json` configured with `rtl: true`
- All user-facing text must be in Arabic

## Gotchas

- `src/types/database.types.ts` is auto-generated — regenerate with `pnpm update-db-types` after Supabase schema changes
- There is no `middleware.ts` file
- No `.env.example` is committed — env vars are required for Clerk, Supabase, LiveKit, OpenAI, Langfuse, and Bunny.net
- ESLint config extends `next/core-web-vitals` and `next/typescript`
- The root layout wraps everything with `ClerkProvider` (localization `arSA`) and `DirectionProvider` (RTL) — do not duplicate these in child layouts
