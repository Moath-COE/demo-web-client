---
name: Sanad
description: Arabic-first AI tutor product UI for Saudi students.
colors:
  sanad-blue: "#0e293c"
  sanad-blue-strong: "#045687"
  sanad-blue-panel: "#1b3d54"
  sanad-sidebar: "#133848"
  chapter-gold: "#ffa02f"
  surface-light: "#f5f8fa"
  surface-card: "#ffffff"
  ink-inverse: "#fffdfd"
  muted-blue: "#8faabb"
  border-soft: "#d1d5db"
  error-red: "#c0392b"
typography:
  display:
    fontFamily: "Cairo, Geist, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Cairo, Geist, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "Cairo, Geist, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Cairo, Geist, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Cairo, Geist, sans-serif"
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
    backgroundColor: "{colors.sanad-blue-strong}"
    textColor: "{colors.ink-inverse}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-secondary:
    backgroundColor: "{colors.sanad-blue-panel}"
    textColor: "{colors.ink-inverse}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  card-course:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.sanad-blue}"
    rounded: "{rounded.lg}"
    padding: "16px"
  chip-guidance:
    backgroundColor: "{colors.sanad-blue-panel}"
    textColor: "{colors.ink-inverse}"
    rounded: "{rounded.xl}"
    padding: "6px 12px"
---

# Design System: Sanad

## Overview

**Creative North Star: "Tutor Beside You"**

Sanad's visual system should feel like a capable tutor sitting beside the student: present, calm, and precise. The interface supports study rather than performing for attention. Its strongest surfaces are dark Sanad Blue foundations, white content material when needed, and a limited Chapter Gold signal for guidance, progress, and primary moments.

The product default is comfortable rather than dense. Student-facing screens need clear hierarchy, generous reading space, obvious next actions, and stable controls. Density is allowed only when the task demands it, such as admin views, tables, or compact metadata.

The system explicitly rejects childish tutor styling and dense admin-dashboard treatment on student surfaces. Avoid mascot-led decoration, toy-like controls, cramped panels, and operational layouts that make a study session feel like back-office software.

**Key Characteristics:**

- Arabic-first RTL structure with Cairo as the defining voice.
- Restrained product UI with dark blue foundations and rare gold emphasis.
- Course content and study assistance are the visual center, not decoration.
- Familiar shadcn/ui interaction vocabulary with careful RTL behavior.
- Student comfort wins over information density unless the surface is explicitly administrative.

## Colors

Sanad Blue + Chapter Gold is a restrained product palette: deep blue carries structure and trust, gold marks guidance and action, and white surfaces preserve legibility for course material.

### Primary

- **Sanad Blue** (`sanad-blue`): The default dark background, primary ink, and identity anchor. Use it for application foundations, high-emphasis text on light surfaces, and serious product framing.
- **Sanad Action Blue** (`sanad-blue-strong`): The active product blue used for primary actions, selected navigation, and focused brand moments.

### Secondary

- **Chapter Gold** (`chapter-gold`): The guidance accent. Use it for primary calls to action, study highlights, progress cues, and controlled attention states. It should be rare enough to mean something.

### Neutral

- **Study Surface** (`surface-light`): The light product background for pages that need lower visual weight.
- **Course Card White** (`surface-card`): The reading and card surface for course content, PDF-adjacent panels, menus, and popovers.
- **Inverse Ink** (`ink-inverse`): The near-white foreground for dark blue surfaces.
- **Muted Blue Text** (`muted-blue`): Secondary text on dark backgrounds. Use only where contrast remains comfortable.
- **Soft Border** (`border-soft`): Dividers, input strokes, and low-emphasis boundaries.
- **Error Red** (`error-red`): Destructive and error states only.

**The Gold Means Guidance Rule.** Chapter Gold is not decoration. If a gold element does not signal action, progress, focus, or instructional guidance, remove it.

## Typography

**Display Font:** Cairo with Geist fallback.
**Body Font:** Cairo with Geist fallback.
**Label/Mono Font:** Geist Mono only for technical identifiers if needed.

**Character:** Cairo gives the interface its Arabic-first product identity. The hierarchy should be practical and calm, with weight doing more work than oversized headings.

### Hierarchy

- **Display** (700, `4.5rem`, 1.1): Landing hero and rare brand moments only. Keep letter spacing no tighter than `-0.025em`.
- **Headline** (700, `1.875rem`, 1.25): Page titles such as library, enrollment, and major student task screens.
- **Title** (600, `1.125rem`, 1.35): Course cards, dialogs, section titles, and study controls.
- **Body** (400, `1rem`, 1.65): Arabic explanatory copy, empty states, legal content, and learning guidance. Cap prose line length around 65 to 75 characters where possible.
- **Label** (500, `0.875rem`, 1.4): Buttons, form labels, metadata, navigation labels, and compact UI copy.

**The No Decorative Display Rule.** Product UI labels, buttons, tabs, and study controls always use the normal Cairo product scale. Display sizing belongs to the landing page and a few brand moments, not daily workflow.

## Elevation

Sanad should be flat by default and layered by tone. Depth comes from dark-blue panels, white course surfaces, dividers, and state changes. Shadows are allowed as interaction feedback on image-backed course cards and important overlays, but they should not create ghost-card decoration.

### Shadow Vocabulary

- **Course Hover Lift** (`0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10)`): Course cards on hover only, paired with image scale. Do not use it on static cards.
- **CTA Lift** (`0 8px 8px -4px rgb(4 86 135 / 0.20)`): Landing page CTAs only. Use no border with this shadow.
- **Overlay Focus** (`0 0 0 3px rgb(255 160 47 / 0.35)`): Focus-visible and guided attention states.

**The Dense Only When Needed Rule.** Compact spacing and heavier data density are permitted for admin or operational tasks. Student-facing study and library screens stay comfortable first.

## Components

### Buttons

- **Shape:** Gently squared product controls (8px radius) with pill treatment reserved for chips and compact tags.
- **Primary:** Sanad Action Blue or Chapter Gold, inverse text, medium weight, and predictable height. Use one primary action per decision area.
- **Hover / Focus:** Hover darkens or softens the background. Focus uses a clear ring tied to Chapter Gold. Avoid animated gradients on app controls.
- **Secondary / Ghost:** Secondary buttons use tonal blue layers. Ghost buttons work for toolbar and navigation actions where the surrounding context provides structure.

### Chips

- **Style:** Rounded pills with low-emphasis blue surfaces, compact icon support, and readable Arabic labels.
- **State:** Selected or instructional chips can use Chapter Gold, but inactive chips should not be saturated.

### Cards / Containers

- **Corner Style:** Standard cards use 10px radius, with 14px reserved for more prominent media or hero containers.
- **Background:** Course and content cards use white surfaces over dark or light foundations.
- **Shadow Strategy:** Flat at rest. Hover lift is permitted for clickable course cards.
- **Border:** Use soft borders for separation. Do not pair decorative 1px borders with large soft shadows.
- **Internal Padding:** Use 16px as the default card padding, increasing to 24px for empty states or dialogs.

### Inputs / Fields

- **Style:** White input backgrounds, soft borders, and 8px radius.
- **Focus:** Chapter Gold ring with enough contrast and no layout shift.
- **Error / Disabled:** Error uses Error Red only for invalid state. Disabled controls reduce opacity but must remain legible.

### Navigation

- **Style, typography, default/hover/active states, mobile treatment.** The sidebar and header use compact Cairo labels, dark blue structure, and simple icon vocabulary. Active states should be unmistakable without relying on color alone. Mobile navigation must preserve RTL order and avoid clipped dropdowns.

### Study Workspace

The PDF canvas, top navigation, and agent launcher are the signature product surface. Keep controls close to the learning material, avoid competing panels, and use motion only to show state, guidance, or progress.

## Do's and Don'ts

### Do:

- **Do** keep Arabic RTL behavior correct across layout, overlays, form controls, and navigation.
- **Do** use Sanad Blue for product structure and Chapter Gold only for guidance, action, progress, or focus.
- **Do** favor comfortable student reading space over dense dashboards on student-facing surfaces.
- **Do** use familiar shadcn/ui affordances for buttons, dialogs, sidebars, tabs, and menus.
- **Do** make the next action obvious in library, enrollment, and study flows.

### Don't:

- **Don't** make Sanad look like a childish tutor app. Avoid cartoonish cues, toy-like controls, excessive gamification, and mascot-led UI.
- **Don't** make student screens feel like dense admin dashboards. Avoid cramped tables, heavy metadata blocks, and cold operational layouts.
- **Don't** use decorative gradients as the default button or heading treatment in product UI.
- **Don't** use Chapter Gold as ambient decoration. Its rarity is the point.
- **Don't** hide standard affordances behind custom controls, clipped dropdowns, or non-obvious gestures.
