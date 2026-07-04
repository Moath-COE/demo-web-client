---
name: Sanad
description: Arabic-first AI tutor product UI for Saudi students.
colors:
  coral: "#ff6b5c"
  coral-deep: "#e8503f"
  coral-tint: "#ffd9d3"
  coral-wash: "#fff1ef"
  navy: "#1e2553"
  navy-deep: "#161d44"
  navy-raise: "#27326b"
  indigo: "#4c57c7"
  indigo-soft: "#7077d6"
  peri: "#a8aee0"
  cream: "#fbf7f1"
  sand: "#f4efe6"
  surface-card: "#ffffff"
  border-soft: "#e7e1d6"
  text-body: "#5a5f7a"
  text-muted: "#8b8fa8"
  success: "#1e9e6a"
  error: "#c0556a"
typography:
  display:
    fontFamily: "Cairo, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Cairo, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  title:
    fontFamily: "Cairo, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Cairo, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Cairo, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.coral-deep}"
  button-secondary:
    backgroundColor: "{colors.navy-raise}"
    textColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  card-course:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.navy}"
    rounded: "{rounded.lg}"
    padding: "16px"
  chip-guidance:
    backgroundColor: "{colors.coral-tint}"
    textColor: "{colors.coral-deep}"
    rounded: "{rounded.xl}"
    padding: "6px 12px"
---

# Design System: Sanad

## 1. Overview

**Creative North Star: "Daylight Tutor"**

Sanad should feel like studying beside a warm, present tutor in good daylight. Coral carries the encouragement of a teacher leaning in to help; navy holds the focus and trust of a quiet study room; cream is the page the lesson is written on. The interface is warm and inviting, not clinical or austere.

The product leans expressive within discipline. Coral is used confidently for primary actions, progress, and guidance moments — it is the tutor's voice, not a rare sprinkle. Navy grounds structure, navigation, and the dark study surface. Cream and white preserve generous reading space so course material stays the visual center. Density is allowed only when the task demands it (admin views, tables, compact metadata); student-facing screens stay comfortable and breathing.

The system explicitly rejects childish tutor styling (cartoonish cues, toy-like controls, mascot-led UI) and dense admin-dashboard treatment on student surfaces (cramped tables, cold operational layouts, jargon-heavy labels). It also rejects the cold, clinical edtech look — Sanad is warm, human, and encouraging, never sterile.

**Key Characteristics:**

- Arabic-first RTL structure with Cairo as the single defining voice across display and body.
- Warm product UI: coral for action and guidance, navy for structure, cream for the page.
- A real light (cream) and dark (navy) surface, following the system preference by default.
- Course content and study assistance are the visual center, not decoration.
- Familiar shadcn/ui interaction vocabulary with careful RTL behavior.
- Expressive but purposeful — coral means something is happening, not that something is pretty.

## 2. Colors: The Coral & Navy Palette

Coral + Navy is a warm, confident product palette: coral is the action and guidance voice, navy carries structure, trust, and the dark surface, and warm cream/white surfaces keep course material legible and inviting.

### Primary

- **Coral** (`coral` `#ff6b5c`): The primary action and guidance color. Use it for primary buttons, active selection, progress, focus rings, and study highlights. It is the tutor's voice — confident, not decorative. Deepen to `coral-deep` `#e8503f` on hover/press.
- **Navy** (`navy` `#1e2553`): The structural anchor. Primary ink on light surfaces, the dark application surface, and the default text color. `navy-deep` `#161d44` is the deepest dark background; `navy-raise` `#27326b` is a raised dark surface or secondary control.

### Secondary

- **Indigo** (`indigo` `#4c57c7`): Secondary support color for links, informational accents, and data highlights. `indigo-soft` `#7077d6` for hover or muted indigo.
- **Periwinkle** (`peri` `#a8aee0`): Muted fills, disabled tints, charts, and low-emphasis data. Use where a soft, non-competing tint is needed.

### Neutral

- **Cream** (`cream` `#fbf7f1`): The warm light application background — the "page." Pairs with coral and navy without competing.
- **Sand** (`sand` `#f4efe6`): The secondary warm surface for muted sections, toolbars, and secondary panels.
- **Course Card White** (`surface-card` `#ffffff`): The reading and card surface for course content, PDF-adjacent panels, menus, and popovers.
- **Soft Border** (`border-soft` `#e7e1d6`): Warm hairline for dividers, input strokes, and low-emphasis boundaries.
- **Body Text** (`text-body` `#5a5f7a`): Secondary ink, comfortable on cream and white (≥4.5:1).
- **Muted Text** (`text-muted` `#8b8fa8`): Metadata and tertiary text only — never body copy.
- **Success** (`success` `#1e9e6a`) and **Error** (`error` `#c0556a`): Semantic state colors only.

**The Coral Means Action Rule.** Coral signals that something is happening or can happen: a primary action, active state, progress, focus, or guidance. If a coral element does none of those, remove it. Unlike the old gold, coral is allowed to be confident and frequent on action surfaces — but flat coral as ambient background decoration is still forbidden.

## 3. Typography

**Display Font:** Cairo (sans-serif fallback).
**Body Font:** Cairo (sans-serif fallback).
**Label Font:** Cairo. A monospace (system stack) only for rare technical identifiers.

**Character:** Cairo is the single voice of the product — it carries Arabic and Latin with equal clarity and gives Sanad its Arabic-first identity. Hierarchy comes from weight and size, not from switching families. Warmth comes from generous line-height and spacing, never from decorative type.

### Hierarchy

- **Display** (700, `clamp(2.5rem, 6vw, 4.5rem)`, 1.1): Landing hero and rare brand moments only.
- **Headline** (700, `1.875rem`, 1.25): Page titles — library, enrollment, major student task screens.
- **Title** (600, `1.125rem`, 1.35): Course cards, dialogs, section titles, study controls.
- **Body** (400, `1rem`, 1.65): Arabic explanatory copy, empty states, legal content, learning guidance. Cap prose at 65–75 characters.
- **Label** (500, `0.875rem`, 1.4): Buttons, form labels, metadata, navigation, compact UI copy.

**The Arabic Letter-Joining Rule.** Never apply letter-spacing (positive or negative) to Arabic text. Arabic is cursive; spacing disconnects letters and breaks legibility. All product type uses `letter-spacing: normal`. Latin-only micro-labels are the sole exception and even there, prefer none.

**The One Voice Rule.** Cairo is the only typeface in product UI. Do not introduce a second sans, a display face, or Latin-only fonts (Inter, Geist, Bricolage) — they do not carry Arabic and fracture the single-voice identity.

## 4. Elevation

Sanad is flat by default and layered by tone and warmth. Depth comes from navy panels, white course surfaces, warm hairlines, and state changes — not from ambient shadows. Shadows appear only as interaction feedback (course-card hover, important overlays) and must never create ghost-card decoration (a 1px border paired with a wide soft shadow is forbidden).

### Shadow Vocabulary

- **Course Hover Lift** (`0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10)`): Clickable course cards on hover only, paired with image scale. Never on static cards.
- **CTA Lift** (`0 8px 8px -4px rgb(255 107 92 / 0.20)`): Landing-page CTAs only. Use no border with this shadow.
- **Overlay Focus** (`0 0 0 3px rgb(255 107 92 / 0.35)`): Focus-visible and guided-attention states, tied to coral.

**The Flat-By-Default Rule.** Surfaces are flat at rest. A shadow is a response to state (hover, elevation, focus) — never resting decoration. Never pair a decorative 1px border with a soft shadow blur ≥ 16px.

**The Dense Only When Needed Rule.** Compact spacing and heavier density are permitted for admin or operational tasks. Student-facing study and library screens stay comfortable first.

## 5. Components

### Buttons

- **Shape:** Gently curved product controls (8px radius). Pill (14px) reserved for chips and tags.
- **Primary:** Coral (`#ff6b5c`) background, white text, medium weight, predictable height. One primary action per decision area. Deepens to `coral-deep` on hover.
- **Hover / Focus:** Hover deepens the coral. Focus uses a clear coral ring (`Overlay Focus`). No animated gradients on app controls.
- **Secondary / Ghost:** Secondary uses a navy-raise tonal layer with light text. Ghost is transparent, for toolbar and navigation actions where context provides structure.

### Chips

- **Style:** Rounded pills (14px). Guidance and instructional chips use `coral-tint` background with `coral-deep` text — warm, not saturated. Inactive chips use sand/peri low-emphasis fills.
- **State:** Selected or instructional chips may carry coral; inactive chips stay desaturated.

### Cards / Containers

- **Corner Style:** Standard cards 10px radius; 14px reserved for prominent media or hero containers.
- **Background:** Course and content cards use white surfaces over cream or navy foundations.
- **Shadow Strategy:** Flat at rest. Hover lift permitted for clickable course cards only.
- **Border:** Warm soft borders (`border-soft`) for separation. Never pair a decorative 1px border with a large soft shadow.
- **Internal Padding:** 16px default, 24px for empty states and dialogs.

### Inputs / Fields

- **Style:** White input backgrounds, warm soft borders, 8px radius.
- **Focus:** Coral ring with enough contrast and no layout shift.
- **Error / Disabled:** Error uses `error` red only for invalid state. Disabled reduces opacity but stays legible.

### Navigation

- **Style:** Sidebar and header use compact Cairo labels over navy structure with a simple icon vocabulary. Active states are unmistakable without relying on color alone (weight, fill, indicator). Mobile navigation preserves RTL order and avoids clipped dropdowns — dropdowns must escape overflow containers via the popover API or portals.

### Study Workspace

The PDF canvas, top navigation, and agent launcher are the signature product surface. Keep controls close to the learning material, avoid competing panels, and use motion only to show state, guidance, or progress.

## 6. Do's and Don'ts

### Do:

- **Do** keep Arabic RTL behavior correct across layout, overlays, form controls, and navigation.
- **Do** use Coral confidently for primary actions, active states, progress, focus, and guidance — it is the tutor's voice.
- **Do** use Navy for structure, dark surfaces, and primary ink, and warm Cream/Sand for light surfaces and reading space.
- **Do** keep Cairo as the single typeface and `letter-spacing: normal` everywhere Arabic appears.
- **Do** favor comfortable, warm reading space over dense dashboards on student-facing surfaces.
- **Do** use familiar shadcn/ui affordances for buttons, dialogs, sidebars, tabs, and menus.
- **Do** make the next action obvious in library, enrollment, and study flows.

### Don't:

- **Don't** make Sanad look like a childish tutor app. Avoid cartoonish cues, toy-like controls, excessive gamification, and mascot-led UI.
- **Don't** make student screens feel like dense admin dashboards. Avoid cramped tables, heavy metadata blocks, and cold operational layouts.
- **Don't** make Sanad feel clinical or sterile. Warmth (coral, cream) is the point — avoid cold grays and flat blue-only palettes.
- **Don't** apply letter-spacing to Arabic text, or introduce Latin-only fonts (Inter, Geist, Bricolage) that drop Arabic glyphs.
- **Don't** use decorative gradients as the default button or heading treatment in product UI.
- **Don't** pair a decorative 1px border with a wide soft shadow (ghost-card pattern).
- **Don't** hide standard affordances behind custom controls, clipped dropdowns, or non-obvious gestures.
