# web-client-snd

**سند (Sanad)** — Arabic-first RTL education platform / AI tutor. Next.js 16 App Router, React 19, TypeScript 5. Entire UI is Arabic (`ar_SA`), RTL layout, dark mode default.

## Skills

- **Writing any code** → load `vercel-react-best-practices` skill first.
- **Building/styling frontend UI** → also load `web-design-guidelines` + `frontend-design` skills.

## Engineering Principles

### Think Before Coding

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### Simplicity First

- Minimum code that solves the problem. Nothing speculative.
- No features beyond what was asked. No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- If you write 200 lines and it could be 50, rewrite it.

### Surgical Changes

- Touch only what you must. Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken. Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.
- Remove imports/variables/functions that **your** changes made unused. Don't remove pre-existing dead code unless asked.
- Every changed line should trace directly to the user's request.

### Goal-Driven Execution

- Transform tasks into verifiable goals:
  - "Add validation" → define invalid-input scenarios, then verify them manually or with existing validation commands
  - "Fix the bug" → reproduce the bug, then verify the fix with the narrowest available validation path
  - "Refactor X" → run required validation before and after when practical
- For multi-step tasks, state a brief plan with verification at each step.
- Strong success criteria let you loop independently. Weak criteria require constant clarification.

## Git Ownership

Git management is the user's responsibility. Agents may use Git only read-only to
see latest changes or differences, such as `git status`, `git diff`, and
`git log`. Do not create or switch branches, stage files, commit, amend, rebase,
merge, reset, restore, stash, tag, pull, or push.

## Package Manager

**Always `pnpm`.** Never use `npm` or `yarn`.

## Commands

- `pnpm dev` — dev server (port 3000)
- `pnpm build` — `next build`
- `pnpm lint` — **only lint command.** Do not install or use other linters.
- `pnpm type-check` — `tsc --noEmit`
- `pnpm update-db-types` — regenerate Supabase types → `src/types/database.types.ts`

No testing workflow or framework is configured. Do not create test tasks, test
directories, test framework setup, or test commands for future features unless a
separate approved feature explicitly adds testing infrastructure.

**Verification order after changes:** `pnpm lint` → `pnpm type-check`

## Node

v24.12.0 (`.nvmrc`). Run `nvm use` before any command.

## Architecture

### Path Alias

`@/*` → `./src/*`

### Route Groups (`src/app/`)

- `(app)/` — authenticated area: courses, onboarding, settings, my-library
- `(auth)/` — Clerk auth pages
- `(legal)/` — legal/privacy
- `(feedback)/` — feedback flow
- `admin/` — admin pages
- `api/` — API routes

### Key Directories

- `src/components/ui/` — Shadcn/ui (new-york style)
- `src/components/study/` — LiveKit voice + AI chat
- `src/lib/supabaseClient.ts` — browser Supabase
- `src/lib/supabaseAdmin.ts` — server-side Supabase admin
- `src/context/databaseContext.tsx` — shared DB context
- `src/types/database.types.ts` — **auto-generated**, do not edit manually

## Conventions

- RTL: `dir="rtl"`, `lang="ar"`, Cairo font. Maintain in all UI changes.
- Dark mode default (root `<html>` has `className="dark"`).
- Shadcn/ui new-york + `lucide-react` icons. Add components via `npx shadcn@latest add <component>`.
- Tailwind CSS 4.x with `@tailwindcss/postcss`.
- CSS variables/palette in `src/styles/globals.css`.
- `components.json` has `rtl: true`.
- All user-facing text must be Arabic.
- No comments in code unless explicitly asked.

## Gotchas

- Root layout wraps with `ClerkProvider` (`arSA`) + `DirectionProvider` (RTL) — do not duplicate in child layouts.
- No `middleware.ts` file.
- No `.env.example` — env vars required for Clerk, Supabase, LiveKit, OpenAI, Langfuse, Bunny.net.
- `src/types/database.types.ts` is auto-generated — regenerate with `pnpm update-db-types` after schema changes.
- ESLint uses flat config (`eslint.config.mjs`), extends `next/core-web-vitals` + `next/typescript`.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
