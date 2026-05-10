<!--
SYNC IMPACT REPORT
==================
Version change: 1.2.0 → 1.3.0
Modified principles:
  - II. User Experience Consistency: Changed Responsive Design from mobile-first to tablet/desktop-first
Added sections: None
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ (compatible - no changes needed)
  - .specify/templates/spec-template.md ✅ (compatible - no changes needed)
  - .specify/templates/tasks-template.md ✅ (compatible - no changes needed)
Follow-up TODOs: None
-->

# Sanad Web Client Constitution

## Core Principles

### I. Code Quality

All code MUST adhere to consistent quality standards to ensure maintainability and reliability.

- **TypeScript Strict Mode**: All code MUST be written in TypeScript with strict type checking enabled. No `any` types unless explicitly justified with a comment.
- **Component Architecture**: Components MUST follow single-responsibility principle. Shared logic MUST be extracted into custom hooks or utility functions.
- **File Organization**: Files MUST follow the established project structure. Components go in `src/components/`, pages in `src/app/`, utilities in `src/lib/`, types in `src/types/`.
- **Naming Conventions**: Components MUST use PascalCase. Hooks MUST start with `use`. Utilities and variables MUST use camelCase. Constants MUST use SCREAMING_SNAKE_CASE.
- **Error Handling**: All async operations MUST have proper error handling. User-facing errors MUST display meaningful messages via Sonner toasts.
- **Form Validation**: All forms MUST use React Hook Form with Zod schemas for validation. Validation errors MUST be displayed inline.

**Rationale**: Consistent code quality reduces cognitive load, speeds up reviews, and prevents bugs from reaching production.

### II. User Experience Consistency

All user interfaces MUST provide a consistent, accessible, and intuitive experience.

- **Shadcn Components First**: UI elements MUST use Shadcn/ui components built on Radix UI primitives. Custom components are permitted only when Shadcn does not provide the needed functionality.
- **Design Token Compliance**: All styling MUST use Tailwind CSS classes and CSS variables defined in the design system. Hardcoded color values are prohibited.
- **Theme Variable Immutability**: All designs and components MUST adhere to the theme styles specified in `src/styles/globals.css`. Adding new CSS variables or modifying existing variables is PROHIBITED unless absolutely necessary and explicitly justified with a documented rationale. The established design token palette (background, foreground, primary, secondary, accent, muted, destructive, border, ring, sidebar, chart colors, and radius values) MUST be used as-is.
- **Responsive Design**: All pages and components MUST be responsive. **Tablet/Desktop-first approach is REQUIRED** - iPad landscape (1024px+) and desktop screens are the primary target devices. Designs MUST be optimized first for `lg` (1024px) and `xl` (1280px) breakpoints, then adapted down for smaller screens. Mobile phone support is REQUIRED but secondary in priority. Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px - iPad landscape/desktop), `xl` (1280px - large desktop).
- **Loading States**: All async operations MUST display appropriate loading indicators (skeletons, spinners, or progress bars).
- **Feedback & Notifications**: User actions MUST provide immediate visual feedback. Success/error states MUST use Sonner toast notifications consistently.
- **Icon Usage**: Icons MUST come from Lucide React or Tabler Icons libraries. Mixing icon libraries within the same component is prohibited.

**Rationale**: UX consistency builds user trust, reduces learning curves, and ensures the application feels cohesive.

### III. Performance Requirements

All features MUST meet performance standards to ensure fast, responsive user experiences.

- **Bundle Size**: New dependencies MUST be evaluated for bundle impact. Tree-shakeable libraries are preferred. Dynamic imports MUST be used for heavy components.
- **Image Optimization**: All images MUST use Next.js Image component with appropriate sizing and lazy loading.
- **Data Fetching**: Server Components MUST be used for data fetching where possible. Client-side fetching MUST implement proper caching strategies.
- **Render Optimization**: Components MUST avoid unnecessary re-renders. `useMemo`, `useCallback`, and `React.memo` MUST be used where performance profiling indicates benefit.
- **Core Web Vitals Targets**:
  - Largest Contentful Paint (LCP): < 2.5s
  - First Input Delay (FID): < 100ms
  - Cumulative Layout Shift (CLS): < 0.1
- **Real-time Features**: LiveKit integrations MUST gracefully handle connection failures and provide fallback states.
- **Database Queries**: Supabase queries MUST select only required fields. Pagination MUST be implemented for list views exceeding 50 items.

**Rationale**: Performance directly impacts user retention, SEO rankings, and overall application success.

## Technology Stack

This project uses a modern Next.js stack with the following core technologies:

| Category            | Technology                 | Version |
| ------------------- | -------------------------- | ------- |
| **Framework**       | Next.js                    | 16.x    |
| **Runtime**         | React                      | 19.x    |
| **Language**        | TypeScript                 | 5.x     |
| **Styling**         | Tailwind CSS               | 4.x     |
| **UI Components**   | Shadcn/ui (Radix UI)       | Latest  |
| **Authentication**  | Clerk                      | 6.x     |
| **Database**        | Supabase                   | 2.x     |
| **AI Integration**  | Vercel AI SDK              | 5.x     |
| **Real-time**       | LiveKit                    | 2.x     |
| **Icons**           | Lucide React, Tabler Icons | Latest  |
| **Package Manager** | pnpm                       | 10.x    |

## Development Workflow

### Branching Strategy

All development MUST follow a strict branching model to maintain code integrity.

- **Protected Branch**: The `main` branch is PROTECTED. Direct commits, edits, or branching from `main` are PROHIBITED.
- **Development Branch**: All feature branches MUST be created from the `dev` branch. The `dev` branch serves as the integration branch for all ongoing work.
- **Feature Branches**: Every feature, bugfix, or enhancement MUST be developed on its own dedicated branch.
- **Branch Naming Convention**: All branches MUST follow this human-readable format:

  ```
  <type>/<short-description>
  ```

  - **Types**: `feature`, `fix`, `hotfix`, `refactor`, `docs`, `chore`
  - **Description**: Lowercase, hyphen-separated, concise (2-5 words)
  - **Examples**:
    - `feature/user-profile-settings`
    - `fix/login-redirect-loop`
    - `refactor/dashboard-components`
    - `docs/api-documentation`
    - `chore/update-dependencies`

- **Merge Flow**: Feature branches merge into `dev` via pull request. Only `dev` merges into `main` after thorough review.

**Rationale**: Strict branching protects production code, enables parallel development, and maintains a clear audit trail.

### Code Review Standards

- All changes MUST be reviewed before merging
- Reviewers MUST verify compliance with all three core principles
- Performance-impacting changes MUST include before/after metrics

### Linting & Formatting

- ESLint MUST pass with zero errors before commit
- Code formatting is enforced via project configuration
- Type errors MUST be resolved; `@ts-ignore` requires justification comment

## Governance

This constitution supersedes all other development practices for this project.

### Amendment Process

1. Propose changes via pull request to this file
2. Changes MUST include rationale and impact assessment
3. Breaking changes require MAJOR version bump
4. All active contributors MUST be notified of amendments

### Compliance

- All PRs MUST verify compliance with core principles
- Violations MUST be documented with justification if unavoidable
- Repeated violations indicate need for constitution amendment or developer guidance

### Versioning Policy

- **MAJOR**: Principle removal or fundamental redefinition
- **MINOR**: New principle added or significant expansion of existing guidance
- **PATCH**: Clarifications, wording improvements, non-semantic refinements

**Version**: 1.3.0 | **Ratified**: 2026-02-22 | **Last Amended**: 2026-02-22
