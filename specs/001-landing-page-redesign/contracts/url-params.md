# URL Parameters Contract: Landing Page to Course Catalog

**Date**: 2026-02-22  
**Version**: 1.0  
**Status**: Draft (target page does not yet consume these parameters)

## Overview

This contract defines the URL query parameters passed from the landing page (`/`) to the course catalog page (`/enroll`) when users search or filter courses.

## Target Route

```
/enroll
```

## Query Parameters

### Search Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | No | Free-text search query for courses |

**Constraints**:
- URL-encoded (spaces → `%20` or `+`)
- Empty string if search submitted without text (redirects without `q` param)
- Maximum length: 200 characters (practical limit)

**Example**:
```
/enroll?q=physics
/enroll?q=%D8%A7%D9%84%D9%81%D9%8A%D8%B2%D9%8A%D8%A7%D8%A1  (Arabic: الفيزياء)
```

---

### Filter Parameters

| Parameter | Type | Required | Description | Valid Values |
|-----------|------|----------|-------------|--------------|
| `university` | string | No | University filter | `ksu`, `kau`, `kfupm`, `qu` |
| `major` | string | No | Major/field filter | `cs`, `eng`, `med`, `bus` |
| `subject` | string | No | Subject filter | `math`, `physics`, `chem`, `programming` |

**Constraints**:
- Lowercase, URL-safe identifiers
- Single-value only (no multi-select in Phase 1)
- Invalid values should be ignored by consumer

**Examples**:
```
/enroll?university=ksu
/enroll?major=cs
/enroll?subject=math
```

---

## Combination Rules

Parameters can be combined:

```
/enroll?q=calculus&university=ksu&major=eng
```

**Behavior**:
- All parameters are optional
- Multiple filters act as AND conditions (when implemented)
- Order does not matter

---

## Producer: Landing Page (`/`)

**File**: `src/app/page.tsx`

**Implementation**:
```typescript
import { useRouter } from 'next/navigation';

// Search submission
const handleSearch = (query: string) => {
  const trimmed = query.trim();
  if (trimmed) {
    router.push(`/enroll?q=${encodeURIComponent(trimmed)}`);
  } else {
    router.push('/enroll');
  }
};

// Filter selection
const handleFilterSelect = (type: 'university' | 'major' | 'subject', value: string) => {
  router.push(`/enroll?${type}=${encodeURIComponent(value)}`);
};
```

---

## Consumer: Course Catalog (`/enroll`)

**File**: `src/app/(app)/enroll/page.tsx`

**Current State**: Does NOT consume URL parameters (out of scope for Phase 1)

**Future Implementation** (for reference):
```typescript
'use client';
import { useSearchParams } from 'next/navigation';

export default function EnrollPage() {
  const searchParams = useSearchParams();
  
  const query = searchParams.get('q') || '';
  const university = searchParams.get('university');
  const major = searchParams.get('major');
  const subject = searchParams.get('subject');
  
  // Apply filters to course query...
}
```

---

## Validation Summary

| Parameter | Validation | Invalid Handling |
|-----------|------------|------------------|
| `q` | Any string, trimmed | Empty → no param |
| `university` | Enum of valid values | Invalid → ignore |
| `major` | Enum of valid values | Invalid → ignore |
| `subject` | Enum of valid values | Invalid → ignore |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial contract definition |

---

## Notes

1. **Backward Compatibility**: Current `/enroll` page ignores query params, so this change is non-breaking
2. **Phase 2 Scope**: Actual filtering implementation in enroll page is out of scope
3. **Analytics**: Parameter tracking deferred per spec clarifications
