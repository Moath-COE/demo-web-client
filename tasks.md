# Tasks: Study Launcher Optimization

This file tracks the full plan, what has been completed, why the changes were made, and what remains. The original plan had 5 phases; Phases 1-2 are done, and Phases 3-5 are pending.

## Context and Motivation

- The topic selection dropdown was laggy and sometimes unusable due to forced-open logic, stale closures, and mismatched topic identifiers (slug vs name).
- We followed React best practices (Vercel guidance) to reduce re-renders, eliminate derived-state effects, and stabilize callbacks.
- The goal is minimal, stable, and maintainable code that performs well on low-end devices.

## Original Analysis (Full Detail)

### Bugs

1. **CRITICAL** (Line 216-217) `setActiveMarker({})` called twice in `handleDisconnect` — copy-paste bug.
2. **CRITICAL** (Line 213-226) `topicStates` never reset in `handleDisconnect`, causing stale state leaks between sessions.

### Performance and Re-render Issues

3. **HIGH** (Lines 113-115, 136-138, 242-244, 246-250) Four `useEffect` hooks existed solely to sync state to parent callbacks — derived-state effects that can be eliminated by calling callbacks directly.
4. **HIGH** (Line 174-189) `sendUserMessage` depends on `isSending` state; it recreates on every send cycle and the guard is unreliable under rapid calls due to stale closures. Should use a ref-based guard.
5. **MEDIUM** (Line 309-312) Inline JSX handler `onClose={() => { ... }}` creates a new function every render. Should be a stable `useCallback`.
6. **MEDIUM** (Line 198-211) `toggleAudioMute` depends on `isAudioMuted`, recreating on every toggle. Use functional update or ref.
7. **MEDIUM** (Line 140-146) `handleLogoClick` depends on `launcherState`, recreating on every state change. Use functional update to remove dependency.

### Design and Maintainability

8. **HIGH** (Whole component) 16 `useState` hooks; related “session metadata” (`currentTopicName`, `numberOfSections`, `currentSectionIndex`, `currentCheckpointQuestion`) should be grouped (ideally a `useReducer`).
9. **MEDIUM** (Line 86-108) `tokenSource`/`useSession` initialized even when launcher idle; memo recreates when `userName` changes after Clerk loads.
10. **LOW** (Line 400-405) `FeedbackDialog` always in render tree — good candidate for lazy loading with `next/dynamic`.

### Child Component Issue

11. **HIGH** (`connected-state-handler.tsx:96`) `setTimeout` calls in `add_markers` not cleaned up; can update state after unmount.

## Original Improvement Plan (Phases)

### Phase 1 — Fix Bugs (non-breaking, minimal)

1. Remove duplicate `setActiveMarker({})` call in `handleDisconnect`.
2. Reset `topicStates` in `handleDisconnect`.
3. Store timeout IDs in `ConnectedStateHandler` and clear on unmount.

### Phase 2 — Eliminate Effect-based Sync (re-render reduction)

- `onListeningChange` (line 113-115): call directly in `onAgentStateChange` handler.
- `onTopicChange` (line 136-138): call in `handleTopicNameChange` and `handleSectionsChange`.
- `onTopicsDataChange` (line 242-244): call in `handleTopicClick` and any state update path.
- `onAutoOpenTopicsChange` (line 246-250): call in agent state change handler.

### Phase 3 — Consolidate Related State

Use a reducer for session metadata to reduce scattered state and simplify `handleDisconnect`:

```
type SessionMeta = {
  topicName: string | null;
  numberOfSections: number | null;
  currentSectionIndex: number | null;
  checkpointQuestion: string | null;
  agentState: string;
  topicStates: Record<string, TopicState>;
};

const initialState: SessionMeta = {
  topicName: null,
  numberOfSections: null,
  currentSectionIndex: null,
  checkpointQuestion: null,
  agentState: "disconnected",
  topicStates: {},
};
```

### Phase 4 — Fix Stale Closures and Function Refs

1. `sendUserMessage`: use `sendingRef` for the guard; keep `isSending` only for UI.
2. `toggleAudioMute`: use functional `setIsAudioMuted(prev => !prev)` and/or ref for correct toggle state.
3. `handleLogoClick`: use functional `setLauncherState` to avoid dependency.
4. Extract inline `onClose` for `TextInputPopup` into a stable callback.

### Phase 5 — Bundle Optimization

1. Lazy-load `FeedbackDialog` with `next/dynamic`.
2. Lazy-load `TextInputPopup` with `next/dynamic`.

### Expected Impact (Original)

| Phase | States Removed | Effects Removed |
| --- | --- | --- |
| 1 | 0 | 0 |
| 2 | 0 | -4 |
| 3 | -5 useState → 1 useReducer | 0 |
| 4 | 0 | 0 |
| 5 | 0 | 0 |

## Completed Work (Phases 1-2 + Targeted Bug Fixes)

### Phase 1: Bug Fixes (Completed)

- Removed duplicate `setActiveMarker({})` call in `src/components/study/study-launcher.tsx` to avoid redundant state updates during disconnect.
- Reset topic state on disconnect in `src/components/study/study-launcher.tsx` to prevent stale topic states between sessions.
- Added `pendingTimeouts` tracking and cleanup in `src/components/study/connected-state-handler.tsx` so delayed marker updates cannot fire after unmount.

### Phase 2: Eliminate Effect-Based Sync (Completed)

- Replaced multiple parent-sync `useEffect` hooks with direct callback invocations in `src/components/study/study-launcher.tsx` to avoid derived-state effects.
- Converted non-rendered session metadata to refs (`topicNameRef`, `topicSlugRef`, `numberOfSectionsRef`, `currentSectionIndexRef`, `topicStatesRef`) to avoid unnecessary re-renders.
- Simplified topic data sync to parent to only fire on initial topics load, with direct updates on topic click.
- Reduced `useState` count in `StudyLauncher` from 16 to 12 by moving non-UI data to refs.

### Topic Selection Bug Fixes (Completed)

- Fixed stuck-open dropdown by replacing forced `open={open || ...}` with one-time auto-open logic in `src/components/study/top-nav.tsx`.
- Added `currentTopicSlug` and corrected slug comparison in `src/components/study/top-nav.tsx` so the current topic highlights correctly.
- Stabilized `sendUserMessage` using a `sendingRef`, and routed message sends through `sendUserMessageRef` in `src/components/study/study-launcher.tsx` to prevent stale-closure guards and reduce re-renders.
- Removed dead `onAutoOpenTopicsChange` API from `src/types/types.ts` and `src/components/study/study-launcher.tsx`.
- Updated `src/app/(app)/[course]/[chapter]/study/page.tsx` to track and pass `currentTopicSlug` into `TopNav`.

## Changelog (High-Level)

- `src/components/study/top-nav.tsx`: auto-open logic fixed, slug comparison corrected, added `currentTopicSlug` prop.
- `src/components/study/study-launcher.tsx`: removed dead auto-open hook, stabilized message send path, added topic slug tracking, simplified disconnect resets.
- `src/components/study/connected-state-handler.tsx`: cleanup for delayed marker updates.
- `src/types/types.ts`: updated `onTopicChange` signature, removed dead `onAutoOpenTopicsChange`.
- `src/app/(app)/[course]/[chapter]/study/page.tsx`: tracks and passes `currentTopicSlug`.

## Remaining Phases (Phase 3 to 5)

These phases focus on React state optimization (collapsing state into reducers to avoid batching issues), closure fixes (removing dependencies from `useCallback`), and bundle splitting (lazy loading popups).

### Phase 3: Consolidate Session UI State (State Management)

**Context**: `StudyLauncher` originally had 16 `useState` hooks. We moved non-rendering state to refs, but UI states (launcher state, feedback dialog, mic UI) remain scattered.
**Goal**: Reduce scattered `useState` updates that still re-render the launcher and simplify teardown logic.

- [ ] Evaluate the remaining UI state in `src/components/study/study-launcher.tsx` (launcher state, feedback dialog, mic UI, text input) for grouping.
- [ ] Implement a `useReducer` (or a small grouped state object) to collapse related updates (like the reset logic in `handleDisconnect`).
- [ ] Ensure no behavior regressions in feedback, mic toggling, and text input popup.

### Phase 4: Stale Closures and Function Refs (React Best Practices)

**Context**: Handlers like `toggleAudioMute` and `handleLogoClick` depend on their current state, meaning their function references recreate whenever that state changes, causing child components to re-render.
**Goal**: Finalize callback stability and reduce re-render churn in UI handlers.

- [ ] Refactor `handleLogoClick` in `src/components/study/study-launcher.tsx` to use functional state updates (`setLauncherState(prev => ...)`) and remove `launcherState` dependency.
- [ ] Refactor `toggleAudioMute` in `src/components/study/study-launcher.tsx` to avoid stale closures and remove `isAudioMuted` dependency (use a ref or functional update).
- [ ] Extract the inline `onClose={...}` handler for `TextInputPopup` in `src/components/study/study-launcher.tsx` into a stable `useCallback` to avoid creating a new function on every render.

### Phase 5: Bundle Size / Lazy Loading

**Context**: Components like `FeedbackDialog` and `TextInputPopup` bring heavy UI dependencies (modals, forms) but are rarely used or conditionally rendered.
**Goal**: Reduce initial client bundle cost by deferring rarely used UI.

- [ ] Lazy-load `FeedbackDialog` in `src/components/study/study-launcher.tsx` using `next/dynamic` (it only appears after session disconnect).
- [ ] Lazy-load `TextInputPopup` in `src/components/study/study-launcher.tsx` using `next/dynamic` (it only conditionally renders).

## Verification
- [ ] Run `pnpm lint` to ensure no new warnings or errors are introduced.
