# Implementation Plan: Landing Page Redesign - Single Section Minimal

**Branch**: `001-landing-page-redesign` | **Date**: 2026-02-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-landing-page-redesign/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Redesign the landing page to a single-section, no-scroll, minimal design focused on quick user onboarding. The page will feature an Arabic slogan ("مدرس خصوصي بالذكاء الاصطناعي"), a search bar with three filter dropdowns (Universities, Majors, Subjects), sign-in button for returning users, and minimal branding (logo only). All changes are constrained to `src/app/page.tsx` using existing theme styles and Shadcn components.

## Technical Context

**Language/Version**: TypeScript 5.x with React 19.x  
**Primary Dependencies**: Next.js 16.x, Shadcn/ui (Radix UI), Clerk 6.x, Tailwind CSS 4.x, Lucide React  
**Storage**: N/A (no data persistence for this feature - dummy filter data)  
**Testing**: Manual testing (no test framework currently configured in package.json)  
**Target Platform**: Web browser (tablet/desktop-first per constitution - lg/xl breakpoints primary)
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: LCP < 2.5s, FID < 100ms, CLS < 0.1 (per constitution Core Web Vitals)  
**Constraints**: Single file modification (src/app/page.tsx only), no-scroll on viewports >= 600px height, existing theme variables only  
**Scale/Scope**: Single page redesign affecting landing page visitors

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Code Quality

| Principle | Compliance | Notes |
|-----------|------------|-------|
| TypeScript Strict Mode | PASS | All code in TypeScript, no `any` types needed |
| Component Architecture | PASS | Single page component, logic contained in page.tsx |
| File Organization | PASS | Changes only in src/app/page.tsx per requirement |
| Naming Conventions | PASS | Will use PascalCase for components, camelCase for variables |
| Error Handling | N/A | No async operations in this feature (static page) |
| Form Validation | N/A | No form submission - search redirects via URL params |

### II. User Experience Consistency

| Principle | Compliance | Notes |
|-----------|------------|-------|
| Shadcn Components First | PASS | Using Button, Input, Select from existing Shadcn/ui |
| Design Token Compliance | PASS | Using existing Tailwind CSS classes and CSS variables |
| Theme Variable Immutability | PASS | No new CSS variables - using existing palette |
| Responsive Design | PASS | Tablet/desktop-first (lg: 1024px primary), mobile secondary |
| Loading States | N/A | Static page, no async data fetching |
| Feedback & Notifications | N/A | No user actions requiring feedback on this page |
| Icon Usage | PASS | Using Lucide React only (Search icon) |

### III. Performance Requirements

| Principle | Compliance | Notes |
|-----------|------------|-------|
| Bundle Size | PASS | No new dependencies required |
| Image Optimization | PASS | Logo uses Next.js Image component |
| Data Fetching | N/A | No data fetching on landing page |
| Render Optimization | PASS | Simple static component, no complex state |
| Core Web Vitals | PASS | Minimal page, should meet LCP < 2.5s, FID < 100ms, CLS < 0.1 |
| Real-time Features | N/A | No LiveKit on landing page |
| Database Queries | N/A | No database queries |

### Development Workflow

| Principle | Compliance | Notes |
|-----------|------------|-------|
| Branch Strategy | PASS | Feature branch `001-landing-page-redesign` from dev |
| File Modification Constraint | PASS | FR-012 requires changes only in src/app/page.tsx |

**Gate Status**: PASS - No violations identified

## Project Structure

### Documentation (this feature)

```text
specs/001-landing-page-redesign/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── url-params.md    # URL parameter contract for catalog redirect
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── page.tsx          # ONLY file modified by this feature
├── components/
│   ├── landing/
│   │   ├── topNav.tsx    # Referenced but not modified
│   │   └── footer.tsx    # Referenced but not modified (may be removed from page)
│   └── ui/
│       ├── button.tsx    # Used
│       ├── input.tsx     # Used for search bar
│       └── select.tsx    # Used for filter dropdowns
└── styles/
    └── globals.css       # Referenced for theme variables (not modified)
```

**Structure Decision**: Single-file modification as per FR-012. The landing page redesign only modifies `src/app/page.tsx`, reusing existing Shadcn/ui components and theme styles.

## Complexity Tracking

> **No violations identified - table not required**

---

## Post-Design Constitution Re-Check

*Re-evaluated after Phase 1 design artifacts completed.*

### Design Decisions Validated

| Decision | Constitution Alignment | Status |
|----------|------------------------|--------|
| Use `h-dvh` for viewport containment | No globals.css modification needed | PASS |
| Tailwind arbitrary variants for height media query | Inline CSS, no new utilities | PASS |
| Shadcn Select for filter dropdowns | Shadcn Components First | PASS |
| URL params for catalog redirect | Standard Next.js pattern | PASS |
| Dummy data inline in page.tsx | Single file constraint satisfied | PASS |
| `'use client'` directive required | Client-side interactivity (router.push) | PASS |

### Potential Concerns Addressed

| Concern | Resolution |
|---------|------------|
| Hardcoded hex colors in gradients | Reusing existing patterns from current page.tsx - consistent with codebase |
| Height media query not in Tailwind config | Using arbitrary variant syntax - no config change needed |
| `'use client'` on landing page | Required for `useRouter` - acceptable for interactivity |

### Final Gate Status

**PASS** - All Phase 1 design decisions comply with constitution. No violations require justification.

---

## Generated Artifacts

| Artifact | Path | Status |
|----------|------|--------|
| Implementation Plan | `specs/001-landing-page-redesign/plan.md` | Complete |
| Research | `specs/001-landing-page-redesign/research.md` | Complete |
| Data Model | `specs/001-landing-page-redesign/data-model.md` | Complete |
| URL Contract | `specs/001-landing-page-redesign/contracts/url-params.md` | Complete |
| Quickstart | `specs/001-landing-page-redesign/quickstart.md` | Complete |
| Agent Context | `AGENTS.md` | Updated |
