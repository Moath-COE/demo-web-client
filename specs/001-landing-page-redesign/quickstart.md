# Quickstart: Landing Page Redesign Implementation

**Date**: 2026-02-22  
**Estimated Time**: 2-3 hours

## Prerequisites

- [ ] Branch `001-landing-page-redesign` created from `dev`
- [ ] Node.js and pnpm installed
- [ ] Development server accessible

## Quick Setup

```bash
# Switch to feature branch
git checkout 001-landing-page-redesign

# Install dependencies (if needed)
pnpm install

# Start development server
pnpm dev
```

## Implementation Overview

**Single file to modify**: `src/app/page.tsx`

### Key Changes

1. **Replace multi-section page** with single viewport-contained section
2. **Add search bar** with form submission handling
3. **Add filter dropdowns** (Universities, Majors, Subjects) with dummy data
4. **Update slogan** to "مدرس خصوصي بالذكاء الاصطناعي"
5. **Keep sign-in button** (SignedOut) / library link (SignedIn)
6. **Remove Footer**, simplify TopNav usage
7. **Apply viewport containment** CSS for no-scroll behavior

## Component Structure

```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <main className="viewport-contained-classes">
      {/* Header: Logo + Sign-in */}
      <header>
        <Logo />
        <SignInButton />
      </header>

      {/* Hero: Slogan + Search + Filters */}
      <section className="centered-content">
        <h1>مدرس خصوصي بالذكاء الاصطناعي</h1>
        <SearchBar onSearch={handleSearch} />
        <FilterButtons filters={[universities, majors, subjects]} />
      </section>
    </main>
  );
}
```

## Key Implementation Details

### 1. Viewport Containment

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

### 2. Search Handler

```tsx
'use client';
import { useRouter } from 'next/navigation';

const router = useRouter();

const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const query = formData.get('search') as string;
  router.push(query.trim() ? `/enroll?q=${encodeURIComponent(query.trim())}` : '/enroll');
};
```

### 3. Filter Dropdown

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const handleFilter = (type: string, value: string) => {
  router.push(`/enroll?${type}=${encodeURIComponent(value)}`);
};

<Select onValueChange={(v) => handleFilter('university', v)}>
  <SelectTrigger>
    <SelectValue placeholder="الجامعة" />
  </SelectTrigger>
  <SelectContent>
    {UNIVERSITIES.map(u => (
      <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
    ))}
  </SelectContent>
</Select>
```

### 4. Dummy Data

```tsx
const UNIVERSITIES = [
  { value: "ksu", label: "جامعة الملك سعود" },
  { value: "kau", label: "جامعة الملك عبدالعزيز" },
  { value: "kfupm", label: "جامعة الملك فهد للبترول والمعادن" },
  { value: "qu", label: "جامعة القصيم" },
];

const MAJORS = [
  { value: "cs", label: "علوم الحاسب" },
  { value: "eng", label: "الهندسة" },
  { value: "med", label: "الطب" },
  { value: "bus", label: "إدارة الأعمال" },
];

const SUBJECTS = [
  { value: "math", label: "الرياضيات" },
  { value: "physics", label: "الفيزياء" },
  { value: "chem", label: "الكيمياء" },
  { value: "programming", label: "البرمجة" },
];
```

## Verification Checklist

### Functional Requirements

- [ ] FR-001: Arabic slogan "مدرس خصوصي بالذكاء الاصطناعي" visible
- [ ] FR-002: Search bar accepts text input
- [ ] FR-003: Three filter dropdowns present (Universities, Majors, Subjects)
- [ ] FR-004: Search redirects to `/enroll?q=...`
- [ ] FR-005: Filter selection redirects to `/enroll?{type}=...`
- [ ] FR-006: Sign-in button visible when signed out
- [ ] FR-007: Sign-in triggers Clerk auth
- [ ] FR-008: No scroll on viewport >= 600px height
- [ ] FR-009: Logo visible
- [ ] FR-010: Uses existing theme styles only
- [ ] FR-011: Signed-in users see library navigation
- [ ] FR-012: Changes only in `src/app/page.tsx`

### Visual Checks

- [ ] Page fits viewport without scroll (desktop/tablet)
- [ ] Content scrolls on small viewports (< 600px height)
- [ ] RTL layout correct (Arabic text flows right-to-left)
- [ ] Dark mode works correctly
- [ ] Responsive: lg (1024px) and xl (1280px) breakpoints

### Edge Cases

- [ ] Empty search submission → redirects to `/enroll` without query param
- [ ] Very small viewport → scroll enabled
- [ ] Signed-in user → shows library link instead of sign-in

## Commands

```bash
# Development
pnpm dev

# Type check
pnpm lint

# Build test
pnpm build
```

## Reference Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | **MODIFY** - Landing page |
| `src/components/ui/input.tsx` | Search bar component |
| `src/components/ui/select.tsx` | Filter dropdown component |
| `src/components/ui/button.tsx` | CTA buttons |
| `src/components/landing/topNav.tsx` | Header reference (may import or inline) |
| `src/styles/globals.css` | Theme variables reference |
