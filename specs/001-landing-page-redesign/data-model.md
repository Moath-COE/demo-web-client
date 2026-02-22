# Data Model: Landing Page Redesign

**Date**: 2026-02-22  
**Status**: Complete

## Overview

This feature is a UI-only landing page redesign with no persistent data storage. All data structures are client-side TypeScript types for component props and local state management.

## Entities

### 1. FilterOption

Represents a selectable option in the filter dropdowns.

```typescript
interface FilterOption {
  value: string;   // URL-safe identifier for query param
  label: string;   // Display text (Arabic)
}
```

**Validation Rules**:
- `value`: Required, non-empty, URL-safe (lowercase, no spaces)
- `label`: Required, non-empty string

**Usage**: Used for Universities, Majors, and Subjects filter data.

---

### 2. FilterCategory

Represents a filter dropdown with its options and current selection.

```typescript
interface FilterCategory {
  id: 'university' | 'major' | 'subject';  // URL param key
  label: string;                            // Dropdown placeholder (Arabic)
  options: FilterOption[];                  // Available choices
}
```

**Instances**:

| ID | Label | Description |
|----|-------|-------------|
| `university` | الجامعة | University filter |
| `major` | التخصص | Major/field of study filter |
| `subject` | المادة | Subject/course filter |

---

### 3. SearchState (Derived)

Client-side state for the search bar.

```typescript
interface SearchState {
  query: string;  // Current search input value
}
```

**Validation Rules**:
- `query`: Can be empty string
- On submit, trimmed value is URL-encoded

---

## Static Data Definitions

### Universities (Dummy)

```typescript
const UNIVERSITIES: FilterOption[] = [
  { value: "ksu", label: "جامعة الملك سعود" },
  { value: "kau", label: "جامعة الملك عبدالعزيز" },
  { value: "kfupm", label: "جامعة الملك فهد للبترول والمعادن" },
  { value: "qu", label: "جامعة القصيم" },
];
```

### Majors (Dummy)

```typescript
const MAJORS: FilterOption[] = [
  { value: "cs", label: "علوم الحاسب" },
  { value: "eng", label: "الهندسة" },
  { value: "med", label: "الطب" },
  { value: "bus", label: "إدارة الأعمال" },
];
```

### Subjects (Dummy)

```typescript
const SUBJECTS: FilterOption[] = [
  { value: "math", label: "الرياضيات" },
  { value: "physics", label: "الفيزياء" },
  { value: "chem", label: "الكيمياء" },
  { value: "programming", label: "البرمجة" },
];
```

---

## Relationships

```
┌─────────────────────────────────────────────────────────┐
│                    Landing Page                          │
│                                                          │
│  ┌──────────────────┐    ┌────────────────────────────┐ │
│  │   SearchState    │    │     FilterCategory[]       │ │
│  │   query: string  │    │  ┌──────────────────────┐  │ │
│  └────────┬─────────┘    │  │ university           │  │ │
│           │              │  │   options: Option[]  │  │ │
│           │              │  └──────────────────────┘  │ │
│           │              │  ┌──────────────────────┐  │ │
│           │              │  │ major                │  │ │
│           │              │  │   options: Option[]  │  │ │
│           │              │  └──────────────────────┘  │ │
│           │              │  ┌──────────────────────┐  │ │
│           │              │  │ subject              │  │ │
│           │              │  │   options: Option[]  │  │ │
│           │              │  └──────────────────────┘  │ │
│           │              └────────────────────────────┘ │
│           │                          │                   │
│           v                          v                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │         URL Navigation to /enroll                │   │
│  │  ?q={query}&university={v}&major={v}&subject={v} │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## State Transitions

### Search Flow

```
[Empty] → [Typing] → [Submit] → [Redirect]
   │          │          │
   │          │          └── router.push('/enroll?q=...')
   │          └── onChange updates query state
   └── Initial state: query = ""
```

### Filter Flow

```
[Closed] → [Open] → [Select] → [Redirect]
   │         │          │
   │         │          └── router.push('/enroll?{type}=...')
   │         └── User clicks dropdown
   └── Initial state: no selection
```

---

## Notes

- **No database entities**: This feature has no persistent data
- **No API contracts**: All interactions are client-side navigation
- **Dummy data**: Static arrays defined inline in page.tsx
- **Future expansion**: When real data is needed, these types can be reused with Supabase queries
