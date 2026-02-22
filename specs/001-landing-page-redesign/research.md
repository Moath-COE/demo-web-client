# Research: Landing Page Redesign

**Date**: 2026-02-22  
**Status**: Complete

## Research Tasks

### 1. Viewport-Contained Layout Implementation

**Question**: How to implement a single-section, no-scroll landing page that allows scroll only on viewports < 600px height?

**Decision**: Use CSS media query for height with `h-dvh` for viewport containment, combined with Tailwind arbitrary variants.

**Rationale**: 
- `h-dvh` (100dvh) provides accurate dynamic viewport height that accounts for mobile browser UI changes
- CSS `@media (min-height: 600px)` allows conditional scroll behavior without JavaScript
- Tailwind arbitrary variants `[@media(min-height:600px)]` keep styling inline with component

**Alternatives Considered**:
| Alternative | Rejected Because |
|-------------|------------------|
| `h-screen` (100vh) | Problematic on mobile - doesn't account for browser UI |
| JavaScript-based detection | Adds complexity, potential hydration issues |
| Custom CSS utility class | Requires modifying globals.css, spec requires page.tsx only changes |

**Implementation Pattern**:
```tsx
<main className="
  min-h-dvh
  overflow-y-auto
  [@media(min-height:600px)]:h-dvh
  [@media(min-height:600px)]:overflow-hidden
  flex
  flex-col
  items-center
  justify-center
">
```

---

### 2. Course Catalog URL Parameters

**Question**: How should search/filter values be passed to the course catalog page?

**Decision**: Navigate to `/enroll` with URL query parameters: `q` (search), `university`, `major`, `subject`.

**Rationale**:
- `/enroll` page exists at `src/app/(app)/enroll/page.tsx` and displays available courses
- No existing URL parameter patterns - this is a new capability
- Standard Next.js pattern using `router.push()` with query string
- Future compatibility: enroll page can later implement filtering logic

**Current State of Enroll Page**:
- Fetches all unenrolled courses via `get_unenrolled_courses` RPC
- Does NOT currently parse URL parameters
- **Note**: FR-004/FR-005 require redirect WITH parameters, but enroll page doesn't use them yet

**URL Parameter Schema**:
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `q` | string | Free-text search query | `?q=physics` |
| `university` | string | University filter | `?university=ksu` |
| `major` | string | Major/field filter | `?major=engineering` |
| `subject` | string | Subject filter | `?subject=math101` |

**Implementation Pattern**:
```tsx
import { useRouter } from 'next/navigation';

const router = useRouter();

// Search submission
const handleSearch = (query: string) => {
  router.push(`/enroll?q=${encodeURIComponent(query)}`);
};

// Filter selection
const handleFilter = (type: string, value: string) => {
  router.push(`/enroll?${type}=${encodeURIComponent(value)}`);
};
```

---

### 3. Vertical Centering with RTL Support

**Question**: How to center content vertically while supporting RTL Arabic layout?

**Decision**: Use flexbox centering with `dir="rtl"` inherited from layout.

**Rationale**:
- Flexbox `items-center justify-center` works consistently across browsers
- RTL is already configured in the app's root layout
- Tailwind's `rtl:` variant available if needed for specific adjustments

**Implementation Pattern**:
```tsx
<div className="flex flex-col items-center justify-center text-center">
  <h1>مدرس خصوصي بالذكاء الاصطناعي</h1>
  {/* Content naturally flows RTL from parent dir attribute */}
</div>
```

---

### 4. Existing Component Reuse

**Question**: Which existing components should be reused for the redesign?

**Decision**: Reuse TopNav (modified display), existing Shadcn components (Button, Input, Select).

**Findings**:

| Component | Location | Reuse Strategy |
|-----------|----------|----------------|
| TopNav | `src/components/landing/topNav.tsx` | Import but may hide nav links for minimal design |
| Footer | `src/components/landing/footer.tsx` | **Remove** - not needed for single-section design |
| Button | `src/components/ui/button.tsx` | Use for sign-in CTA |
| Input | `src/components/ui/input.tsx` | Use for search bar |
| Select | `src/components/ui/select.tsx` | Use for filter dropdowns |
| SignedIn/SignedOut | `@clerk/nextjs` | Conditional rendering for auth state |

**Constraint**: All changes must be in page.tsx. Cannot modify TopNav component - must work with it as-is or conditionally render custom header.

---

### 5. Dummy Filter Data

**Question**: What dummy data should be used for Universities, Majors, and Subjects filters?

**Decision**: Use realistic Arabic placeholder data representing Saudi educational institutions.

**Dummy Data Schema**:

```typescript
const DUMMY_UNIVERSITIES = [
  { value: "ksu", label: "جامعة الملك سعود" },
  { value: "kau", label: "جامعة الملك عبدالعزيز" },
  { value: "kfupm", label: "جامعة الملك فهد للبترول والمعادن" },
  { value: "qu", label: "جامعة القصيم" },
];

const DUMMY_MAJORS = [
  { value: "cs", label: "علوم الحاسب" },
  { value: "eng", label: "الهندسة" },
  { value: "med", label: "الطب" },
  { value: "bus", label: "إدارة الأعمال" },
];

const DUMMY_SUBJECTS = [
  { value: "math", label: "الرياضيات" },
  { value: "physics", label: "الفيزياء" },
  { value: "chem", label: "الكيمياء" },
  { value: "programming", label: "البرمجة" },
];
```

---

### 6. Theme Compliance

**Question**: How to ensure design uses only existing theme variables?

**Decision**: Use CSS variables from globals.css via Tailwind's design token classes.

**Available Theme Colors** (from globals.css):
- `--background` / `bg-background`
- `--foreground` / `text-foreground`
- `--primary` / `bg-primary`, `text-primary`
- `--accent` / `bg-accent` (orange: #ffa02f in dark mode)
- `--muted` / `text-muted-foreground`
- `--ring` / `ring-ring` (orange: #ffa02f)

**Gradient Pattern** (from existing page.tsx):
```tsx
// Background gradient - keep existing
className="bg-linear-to-br from-[#f5f7fa] via-white to-[#e6e9ed] dark:from-[#0e293c] dark:via-[#1d5479] dark:to-[#0e293c]"

// CTA button gradient - reuse existing
className="bg-gradient-to-r from-[#1d5479] to-[#ffa02f] hover:from-[#0e293c] hover:to-[#ff8c00]"
```

**Note**: While hardcoded hex values appear in existing code, they match the design system colors. Prefer Tailwind's theme classes where possible.

---

## Summary of Decisions

| Topic | Decision |
|-------|----------|
| Viewport containment | CSS `h-dvh` with `@media (min-height: 600px)` |
| Scroll behavior | `overflow-hidden` >= 600px, `overflow-y-auto` below |
| Catalog redirect | `/enroll` with query params (`q`, `university`, `major`, `subject`) |
| Filter data | Dummy Arabic university/major/subject data |
| Component reuse | TopNav (as-is), Shadcn Button/Input/Select, no Footer |
| RTL support | Inherit from layout `dir="rtl"`, use flexbox centering |
| Theme compliance | Existing CSS variables only, reuse gradient patterns |

## Open Items (Deferred)

1. **Enroll page filtering**: URL params will be passed but enroll page doesn't implement filtering yet - out of scope per spec
2. **Mobile optimization**: Secondary priority per constitution (tablet/desktop-first), basic responsive included
3. **Analytics**: Deferred to future phase per clarification
