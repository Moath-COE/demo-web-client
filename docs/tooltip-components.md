# Tooltip Components Guide

All tooltip components are available for use but are currently **disabled site-wide**. This document explains how to re-enable them.

---

## 1. Radix Tooltip (Hover Tooltips)

**Files:** `src/components/ui/tooltip.tsx`, `src/components/ui/chart.tsx`

Shadcn/ui wrapper around `@radix-ui/react-tooltip`. Shows a small popup on hover.

### Usage

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"

<Tooltip>
  <TooltipTrigger asChild>
    <button>Hover me</button>
  </TooltipTrigger>
  <TooltipContent side="bottom" align="center">
    Tooltip text
  </TooltipContent>
</Tooltip>
```

### Where It Was Used (currently removed)

- **Sidebar menu buttons** — `src/components/nav-main.tsx` had `tooltip="..."` props on `<SidebarMenuButton>`. Re-add the `tooltip` prop (string or `TooltipContent` props object) to restore sidebar hover tooltips. The `<SidebarMenuButton>` component in `src/components/ui/sidebar.tsx` handles the wrapping automatically.
- **Chart hover tooltips** — `ChartTooltip` + `ChartTooltipContent` from `src/components/ui/chart.tsx` are used inside `<AreaChart>` in `src/components/chart-area-interactive.tsx` and `src/components/data-table.tsx`. These are data-viz hover tooltips (not currently routed to any page).

### Sidebar `tooltip` Prop

`SidebarMenuButton` accepts an optional `tooltip` prop:

```tsx
<SidebarMenuButton tooltip="النص التوضيحي">
  <Icon />
  <span>عنصر القائمة</span>
</SidebarMenuButton>
```

When the sidebar is **collapsed** and **not mobile**, the tooltip appears beside the icon. When expanded, it is hidden automatically.

You can also pass a props object for more control:

```tsx
<SidebarMenuButton tooltip={{ children: "النص", side: "left" }}>
  ...
</SidebarMenuButton>
```

### Provider Note

`<SidebarProvider>` already wraps its children with `<TooltipProvider delayDuration={0}>`, so any sidebar tooltip works without an extra provider. For tooltips outside the sidebar, wrap your content in `<TooltipProvider>` yourself.

---

## 2. Tour Tooltip (Onboarding Walkthrough)

**Files:**

- `src/components/ui/tour-tooltip.tsx` — the visual overlay component
- `src/hooks/use-tour.ts` — state management hook
- `src/components/tours/library-tour.tsx`
- `src/components/tours/study-pre-tour.tsx`
- `src/components/tours/study-post-tour.tsx`

A spotlight-style guided tour that highlights elements on the page with step-by-step instructions.

### How It Works

1. **Mark target elements** with `data-tour-id` attributes on any HTML element:

   ```tsx
   <button data-tour-id="start-agent-btn">ابدأ الان</button>
   ```

2. **Define steps** using the `TourStep` interface:

   ```tsx
   import { type TourStep } from "@/components/ui/tour-tooltip"

   const steps: TourStep[] = [
     {
       targetId: "my-button",
       title: "عنوان الخطوة",
       description: "شرح ما يفعله هذا العنصر",
       position: "bottom", // "top" | "bottom" | "left" | "right"
     },
   ]
   ```

3. **Use the `useTour` hook** to manage tour state:

   ```tsx
   import { useTour } from "@/hooks/use-tour"

   const { currentStep, isActive, next, skip, complete } = useTour(
     "unique-tour-id",
     steps.length,
   )
   ```

   The hook auto-starts the tour after an 800ms delay if it hasn't been completed before (tracked per user in `localStorage` as `tour-completed-{userId}-{tourId}`).

4. **Render the tour overlay**:

   ```tsx
   import { TourTooltip } from "@/components/ui/tour-tooltip"

   if (!isActive || currentStep < 0 || currentStep >= steps.length) return null

   <TourTooltip
     step={steps[currentStep]}
     stepIndex={currentStep}
     totalSteps={steps.length}
     onNext={next}
     onSkip={skip}
     isLast={currentStep === steps.length - 1}
   />
   ```

5. **Mount in layout/page**:

   ```tsx
   import { LibraryTour } from "@/components/tours/library-tour"

   // Inside your layout or page JSX:
   <LibraryTour />
   ```

### Where Tours Were Used (currently removed)

- **Library page** — `<LibraryTour />` was rendered in `src/app/(app)/my-library/layout.tsx`. To re-enable, import and add `<LibraryTour />` back to that layout.
- **Study pre-session** — `<StudyPreTour />` from `src/components/tours/study-pre-tour.tsx` exists but was **never mounted** on any page. Add it to the study page when ready.
- **Study post-session** — `<StudyPostTour isConnected={...} />` from `src/components/tours/study-post-tour.tsx` exists but was **never mounted**. It accepts an `isConnected` prop and auto-completes when the LiveKit connection is established.

---

## 3. Chart Tooltips (Data Visualization)

**Files:** `src/components/ui/chart.tsx`, `src/components/chart-area-interactive.tsx`, `src/components/data-table.tsx`

Recharts `Tooltip` wrapped as `ChartTooltip` + `ChartTooltipContent`. Shows data on chart hover.

```tsx
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

<ChartTooltip
  cursor={false}
  content={<ChartTooltipContent indicator="dot" />}
/>
```

These are **not active on any page route** — only inside standalone chart components that are not currently imported by any page.

---

## 4. Native `title` Attributes (Browser Tooltips)

Some interactive elements previously had HTML `title` attributes that produced browser-native tooltips on hover. These were removed:

- `src/components/ui/sidebar.tsx` — `SidebarRail` button had `title="Toggle Sidebar"`
- `src/components/study/contentToolBar.tsx` — zoom buttons had `title="Zoom out"` / `title="Zoom in"`
- `src/components/study/annotation-toolbar.tsx` — tool buttons had `title="Pen tool"`, `title="Highlighter tool"`, `title="Eraser tool"`, `title="Open AI assistant"`

All still have `aria-label` attributes for accessibility. To restore native tooltips, add `title="..."` back to these elements.
