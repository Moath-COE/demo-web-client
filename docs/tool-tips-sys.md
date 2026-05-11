How the Tour System Works
Core Architecture
The system has 3 layers: a state hook, a visual component, and page-specific orchestrators.

---

1. useTour hook (src/hooks/use-tour.ts)
   This is the brain. You call it with a tour ID and step count:
   const { currentStep, isActive, next, skip } = useTour("library", 2);
   On mount, it checks localStorage for a key like tour-completed-{clerkUserId}-library:

- Key exists → tour already done, isActive stays false, nothing renders
- Key missing → first visit, after an 800ms delay it sets currentStep = 0 and isActive = true
  next() advances the step. When the last step is dismissed, it writes to localStorage and deactivates. skip() does the same immediately, marking the whole tour as completed without going through remaining steps.
  Because the key includes the Clerk user ID, each user gets their own tour history.

---

2. TourTooltip component (src/components/ui/tour-tooltip.tsx)
   This renders the visual overlay. When active:
1. It finds the target element using document.querySelector('[data-tour-id="..."]') and reads its bounding rect
1. SVG overlay with spotlight cutout — a full-screen semi-transparent dark layer (rgba(14, 41, 60, 0.75)) with an SVG <mask> that "cuts out" the area around the target element, creating a spotlight effect
1. Animated border — a div positioned around the cutout with border: 2px solid var(--accent) (#ffa02f) and a glow shadow
1. Dashed connector line — an SVG line from the spotlight edge to the tooltip
1. Tooltip card — positioned relative to the target (below/above/left/right depending on the step config), containing:
   - A progress bar (dots per step, current one wider and orange)
   - Step counter in Arabic numerals (e.g., "١ من ٢")
   - Title and description text
   - "تخطي الكل" (Skip All) and "التالي" (Next) / "تم" (Done) buttons
1. Everything is a portal (createPortal to document.body) so it renders above everything regardless of component nesting
   It re-measures on resize/scroll to stay correctly positioned.

---

3. Tour orchestrators (src/components/tours/)
   Each page gets its own tour file that defines steps and wires up the hook:
   Library Tour (2 steps):

- Step 1 → targets data-tour-id="add-courses-btn" (the "إضافة مزيد من المواد" sidebar button), tooltip appears below
- Step 2 → targets data-tour-id="sidebar-footer" (the settings/help section), tooltip appears above
  Study Pre-Tour (3 steps, only when agent is NOT connected):
- Step 1 → data-tour-id="start-agent-btn" → "ابدأ الان" button
- Step 2 → data-tour-id="language-toggle" → عربي/English toggle
- Step 3 → data-tour-id="back-to-library" → "الرجوع للمكتبة" link
  Study Post-Tour (2 steps, triggered when agent connects):
- Step 1 → data-tour-id="agent-control-bar" → the mic/end/audio controls at bottom
- Step 2 → data-tour-id="topics-list" → the scrollable topics list
  The post-tour also watches isConnected — if the agent disconnects mid-tour, it auto-completes and saves to localStorage so it won't re-trigger annoyingly.

---

How they're wired in

- my-library/layout.tsx — renders <LibraryTour /> at the bottom of the sidebar provider
- aiSideBar.tsx — renders <StudyPreTour /> when !isConnected, and <StudyPostTour isConnected={...} /> always (it self-hides when not needed)
- nav-main.tsx, nav-secondary.tsx, agentController.tsx — just got a data-tour-id attribute added to the elements the tour targets. No other changes to those files.

---

Flow example (Study page, first visit)

1. User navigates to /math/chapter-1/study
2. StudyPreTour activates after 800ms → finds start-agent-btn → renders spotlight + tooltip
3. User clicks "التالي" → tooltip moves to language-toggle
4. User clicks "التالي" → tooltip moves to back-to-library
5. User clicks "تم" → localStorage.setItem("tour-completed-{userId}-study-pre", "true")
6. User clicks "ابدأ الان" → agent connects → isConnected becomes true
7. StudyPostTour detects first visit + connected → shows spotlight on agent-control-bar
8. User clicks "التالي" → moves to topics-list
9. User clicks "تم" → localStorage.setItem("tour-completed-{userId}-study-post", "true")
10. Next time the user visits → both tours check localStorage → keys exist → nothing renders
