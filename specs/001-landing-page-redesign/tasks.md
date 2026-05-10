# Tasks: Landing Page Redesign - Single Section Minimal

**Input**: Design documents from `/specs/001-landing-page-redesign/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No tests requested - manual testing per spec (Testing: Manual testing per plan.md)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Constraint Notice

**FR-012**: All changes MUST be contained within `src/app/page.tsx` only. This means:
- No new files created
- All dummy data, types, and logic inline in page.tsx
- Reuse existing Shadcn components via imports

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the page.tsx file for redesign

- [X] T001 Add 'use client' directive and import useRouter from next/navigation in src/app/page.tsx
- [X] T002 Import required Shadcn components (Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input, Button) in src/app/page.tsx
- [X] T003 Import Clerk components (SignedIn, SignedOut, SignInButton) in src/app/page.tsx
- [X] T004 Import Search icon from lucide-react in src/app/page.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define data structures and handler functions that all user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Define FilterOption TypeScript interface inline in src/app/page.tsx
- [X] T006 [P] Define UNIVERSITIES dummy data array with Arabic labels in src/app/page.tsx
- [X] T007 [P] Define MAJORS dummy data array with Arabic labels in src/app/page.tsx
- [X] T008 [P] Define SUBJECTS dummy data array with Arabic labels in src/app/page.tsx
- [X] T009 Implement handleSearch function for search form submission with URL encoding per contracts/url-params.md in src/app/page.tsx
- [X] T010 Implement handleFilterSelect function for dropdown selection with URL encoding per contracts/url-params.md in src/app/page.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - New Visitor Quick Start (Priority: P1) 🎯 MVP

**Goal**: Enable new visitors to immediately understand the platform and quickly search/filter courses without scrolling

**Independent Test**: Visit landing page as unauthenticated user, verify slogan visible, enter search term, select filter, confirm redirection to /enroll with correct URL params

### Implementation for User Story 1

- [X] T011 [US1] Create viewport-contained main wrapper with h-dvh, overflow handling, and media query for 600px threshold per research.md in src/app/page.tsx
- [X] T012 [US1] Add Arabic slogan heading "مدرس خصوصي بالذكاء الاصطناعي" with RTL-aware centered layout in src/app/page.tsx
- [X] T013 [US1] Implement search bar form with Input component, Search icon, and form submission handler in src/app/page.tsx
- [X] T014 [US1] Implement Universities filter Select dropdown with UNIVERSITIES data and onValueChange handler in src/app/page.tsx
- [X] T015 [US1] Implement Majors filter Select dropdown with MAJORS data and onValueChange handler in src/app/page.tsx
- [X] T016 [US1] Implement Subjects filter Select dropdown with SUBJECTS data and onValueChange handler in src/app/page.tsx
- [X] T017 [US1] Apply existing theme gradient background from current page.tsx pattern in src/app/page.tsx
- [X] T018 [US1] Verify empty search submission redirects to /enroll without query param (edge case from spec.md) in src/app/page.tsx

**Checkpoint**: User Story 1 complete - new visitors can search and filter courses

---

## Phase 4: User Story 2 - Returning User Sign In (Priority: P2)

**Goal**: Provide clear sign-in path for existing users and appropriate navigation for authenticated users

**Independent Test**: Visit landing page while signed out, verify sign-in button visible, click sign-in, complete auth flow; visit while signed in, verify library/dashboard navigation shown instead

### Implementation for User Story 2

- [X] T019 [US2] Add SignedOut wrapper with sign-in Button triggering Clerk SignInButton in src/app/page.tsx
- [X] T020 [US2] Add SignedIn wrapper with navigation link to library/dashboard for authenticated users in src/app/page.tsx
- [X] T021 [US2] Position sign-in/navigation element in header area for visibility in src/app/page.tsx

**Checkpoint**: User Story 2 complete - returning users have clear sign-in path, authenticated users see appropriate navigation

---

## Phase 5: User Story 3 - Brand Recognition (Priority: P3)

**Goal**: Display consistent branding through logo and theme-compliant visual design

**Independent Test**: Load page, verify logo visible in header, confirm all colors match existing theme system (no jarring style differences)

### Implementation for User Story 3

- [X] T022 [US3] Add platform logo using Next.js Image component in header area in src/app/page.tsx
- [X] T023 [US3] Verify all Tailwind classes use existing CSS variables (bg-background, text-foreground, etc.) per theme compliance in research.md in src/app/page.tsx
- [X] T024 [US3] Apply consistent styling with existing CTA gradient pattern from current codebase in src/app/page.tsx

**Checkpoint**: User Story 3 complete - branding elements visible and consistent

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup and verification across all user stories

- [ ] T025 Remove Footer component import/usage (not needed for minimal single-section design) in src/app/page.tsx
- [ ] T026 Remove or simplify TopNav usage for minimal header (may inline logo + sign-in) in src/app/page.tsx
- [ ] T027 Verify dark mode works correctly with all components in src/app/page.tsx
- [ ] T028 Verify responsive behavior at lg (1024px) and xl (1280px) breakpoints per constitution in src/app/page.tsx
- [ ] T029 Test scroll behavior: no-scroll >= 600px height, scroll allowed < 600px height per FR-008 in src/app/page.tsx
- [ ] T030 Run pnpm lint to verify TypeScript strict mode compliance
- [ ] T031 Run pnpm build to verify production build succeeds
- [ ] T032 Manual verification against quickstart.md checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 (P1) should complete first as MVP
  - US2 (P2) can follow independently
  - US3 (P3) can follow independently
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of US1/US2

### Within Each Phase

- Setup: Sequential (imports build on each other)
- Foundational: T005 first (interface definition), then T006-T008 parallel (data), then T009-T010 (handlers)
- US1: T011 first (container), then T012-T018 can be done incrementally
- US2: T019-T021 sequential (depend on layout from US1)
- US3: T022-T024 sequential (styling after structure)
- Polish: T025-T029 can be parallel (different concerns), T030-T032 sequential (validation)

### Parallel Opportunities

Since all tasks are in the same file (src/app/page.tsx), true parallelization is limited. However:

- T006, T007, T008 can be written simultaneously (separate data arrays)
- T014, T015, T016 follow same pattern (different filter dropdowns)
- T030, T031 can run in parallel (different validation commands)

---

## Parallel Example: Foundational Phase

```bash
# After T005 (interface) completes, launch data definitions together:
# T006: UNIVERSITIES array
# T007: MAJORS array  
# T008: SUBJECTS array
# (These are independent constant definitions)
```

## Parallel Example: User Story 1 Filter Dropdowns

```bash
# After search bar (T013), the three filter dropdowns follow same pattern:
# T014: Universities Select
# T015: Majors Select
# T016: Subjects Select
# (Same structure, different data source)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (imports)
2. Complete Phase 2: Foundational (data + handlers)
3. Complete Phase 3: User Story 1 (search + filters + slogan)
4. **STOP and VALIDATE**: Test search/filter redirection independently
5. Deploy/demo if ready - core value proposition delivered

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test search/filter flow → Deploy (MVP!)
3. Add User Story 2 → Test sign-in flow → Deploy
4. Add User Story 3 → Verify branding → Deploy
5. Polish phase → Final validation → Production ready

### Single Developer Strategy

Recommended execution order (all in same file):
1. Setup (T001-T004): ~10 min
2. Foundational (T005-T010): ~15 min
3. US1 MVP (T011-T018): ~45 min - **Deployable checkpoint**
4. US2 (T019-T021): ~15 min
5. US3 (T022-T024): ~15 min
6. Polish (T025-T032): ~30 min

**Estimated Total**: 2-3 hours (matches quickstart.md)

---

## Notes

- All 32 tasks modify single file: `src/app/page.tsx` (per FR-012)
- No test tasks included (manual testing per spec)
- Dummy data defined inline (not imported from separate files)
- URL parameter contract in contracts/url-params.md defines redirect behavior
- Viewport containment pattern in research.md defines scroll behavior
- Theme compliance requirements in research.md define allowed CSS variables
