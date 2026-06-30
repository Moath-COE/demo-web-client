# Sanad / سند

Arabic-first RTL education platform and AI tutor for Saudi students. Sanad uses
Next.js 16 App Router, React 19, TypeScript 5 strict mode, Tailwind CSS 4,
shadcn/ui new-york with RTL enabled, Clerk, Supabase, LiveKit, Bunny.net,
Langfuse, Vercel Analytics, and Vercel Speed Insights.

`AGENTS.md` and `.specify/memory/constitution.md` are authoritative for project
workflow, architecture, and validation rules.

## Local Setup

Use Node v24.12.0 and pnpm only.

```bash
nvm use
pnpm install
pnpm dev
```

The development server runs at [http://localhost:3000](http://localhost:3000).

## Environment

There is no `.env.example` in this repository. Create `.env.local` manually with
the required Clerk, Supabase, LiveKit, OpenAI, Langfuse, and Bunny.net values.
Server-only secrets must not be exposed to client code.

## Validation

Run validation in this order before completing implementation work:

```bash
nvm use
pnpm lint
pnpm type-check
pnpm build
```

`pnpm build` is required when practical, especially for routing, rendering,
bundling, environment, or deployment changes.

There is currently no testing workflow or framework configured. Future features
must skip testing workflow, test framework setup, test directories, and test
commands unless a separate approved feature explicitly adds testing
infrastructure.

## Git Ownership

Git management is the user's responsibility. Agents may use Git only read-only to
see latest changes or differences. Branching, staging, committing, rebasing,
merging, resetting, restoring, stashing, pulling, and pushing are not agent-owned
workflow steps.

## Structure

```text
src/
├── app/                 # App Router route groups and API routes
├── components/          # Shared React components
│   ├── ui/              # shadcn/ui new-york components
│   └── study/           # LiveKit voice and AI chat study experience
├── lib/                 # Supabase, service clients, utilities
├── context/             # Shared React context
├── types/               # Types and generated Supabase database types
└── styles/              # Global styles and CSS variables
```

The `@/*` alias maps to `./src/*`.

## Supabase Types

`src/types/database.types.ts` is generated. Do not edit it manually. If the
Supabase schema or generated types change, run:

```bash
pnpm update-db-types
```
