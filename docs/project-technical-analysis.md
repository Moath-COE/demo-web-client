# Sanad — Complete Product & Feature Description

> **Purpose of this document:** A non-technical, plain-language description of **everything** the Sanad web platform does. It is written so the product can be explained quickly to any person or AI model. It describes *what the product is, who it serves, and what every screen and feature does* — without code or implementation detail.

---

## 1. What Is Sanad?

**Sanad (سند)** is an **Arabic-first AI private tutor** built for Saudi students. The name means "support" or "helper." The entire product is in Arabic, laid out right-to-left (RTL), and designed for dark mode.

The core idea: instead of passively reading a textbook, a student opens a course chapter as a PDF/slide deck and is joined by a **voice-based AI tutor** that explains the material out loud, answers their questions, points to specific words on the slide, walks them through topics one section at a time, and checks their understanding with quick questions — all in real time, like a patient tutor sitting beside them.

Sanad is part of a wider brand called **Chapter-14** (شركة التقنية والذكاء الاصطناعي في التعليم والتدريب — "Technology & AI in Education and Training Company"), a Saudi company registered under unified number **7051848427**.

### Who it is for
- **Primary users:** Saudi students studying in Arabic, on both mobile and desktop.
- **Their main jobs:** understand course material, move through enrolled lessons, ask questions during study, and get help without leaving the learning context.
- **Secondary surfaces:** public marketing pages, legal pages, course enrollment, and (placeholder) administration.

### The product personality
- **Clear, calm, supportive** — like a capable tutor beside the student.
- **Deliberately not childish:** no cartoon mascots, toy controls, or excessive gamification (older students should not feel talked down to).
- **Deliberately not a dense admin dashboard:** student screens stay comfortable and readable, not cramped with tables.

### Visual identity
- **Sanad Blue** (deep navy `#0e293c`) carries structure and trust.
- **Chapter Gold** (`#ffa02f`) is used sparingly *only* for guidance, progress, and the primary action — it "means guidance," never decoration.
- **Cairo** is the defining Arabic font across the whole product.
- Dark mode is the default.

---

## 2. The Big Picture — User Journey

A typical student flow looks like this:

1. **Discover** Sanad on the landing/marketing pages.
2. **Sign up** (email, Google, or Apple via Clerk) → land on onboarding.
3. **Enter their Saudi mobile number** (one-time).
4. **Browse the course catalog** (`/enroll`) and **enroll** in subjects.
5. **Open their Library** (`/my-library`) → see enrolled courses.
6. **Open a course** → see its chapters (lessons).
7. **Start a Study Session** on a chapter → the PDF slides open and the **AI voice tutor** joins.
8. During the session: the tutor **talks, highlights text on the slides, asks checkpoint questions, and takes voice or typed questions**.
9. At the end: the student **rates the session** and returns to the library.
10. They manage their **profile, academic info, and enrollments** in Settings.

The rest of this document describes every surface and feature in detail.

---

## 3. Public / Marketing Area

These pages are visible to anyone (signed out included). They share a public **Top Navigation Bar** and **Footer**.

### 3.1 Landing Page (`/`)
The front door of the product. A full-screen hero featuring:
- The **"سند"** wordmark and tagline **"مدرسك الخصوصي الذكي"** (Your smart private tutor).
- A short description: a smart tutor that accompanies every study session, explains things in a way you understand, answers questions, and follows along step by step.
- Three feature pills: "تجربة تعلّم شخصية" (personalized learning), "محتوى تفاعلي" (interactive content), "سهل الاستخدام" (easy to use).
- Two CTAs: **"تعرّف على سند"** (Learn about Sanad → `/sanad`) and the gold **"ابدأ مع سند الآن"** (Start with Sanad now → `/enroll`).
- A "free experience" reassurance line.
- Header is auth-aware: signed-out users see **"تسجيل الدخول"** (Sign in); signed-in users see **"مكتبة الدورات"** (Course Library).
- Animated floating "orb" glows in the background.
- Footer links to privacy policy and terms.

### 3.2 "Meet Sanad" Product Page (`/sanad`)
The richest marketing page, explaining the AI tutor in depth:
- **Hero:** "قابل سند" (Meet Sanad) badge, giant headline, gradient subtitle, a product screenshot, and a **"جرّب سند الآن"** (Try Sanad now) button.
- **"ما هو سند؟"** card: explains Sanad as a tutor that explains vocally, answers instantly, and adapts.
- **Interactive benefits carousel:** a synchronized dual panel — on one side an auto-playing image carousel (pauses on hover, 4 slides, dot indicators); on the other side four benefit buttons (**explains by voice · answers instantly · adapts to your style · tracks your progress**). Clicking a benefit jumps the image to match.
- **"مميزات تدعم رحلتك الدراسية"** (#features): a grid of four feature cards (browse materials, personalized learning, interactive content, ease of use) plus another screenshot.
- **"كيف تبدأ مع سند؟"** (#how-to-use): a 3-step visual guide (1. Create account · 2. Choose your subject · 3. Start learning).
- **Final CTA banner** with a gradient "Try Sanad now" button.

### 3.3 About Page (`/about`)
Introduces the company ("من نحن"):
- Hero explaining Sanad as an intelligent platform combining academic materials with an AI voice assistant.
- **"هدفنا"** (Our Goal) card: making good education accessible to every Arab student.
- **"قيمنا"** (Our Values): three value cards — personal learning, technology serving education, and accessibility.
- **"تواصل معنا"** (#contact): email (`support@chapter14.net`) and phone (`+966501473370`).

### 3.4 Privacy Policy (`/privacy-policy`)
A thorough, **PDPL-aligned** (Saudi Personal Data Protection Law) privacy policy:
- Header with a "per the PDPL" badge and a dynamic "last updated" date.
- **11 numbered sections** covering: data collected (7 categories: account, academic, course, AI-session, usage, ratings/notes, technical — each tagged mandatory/optional), collection methods, usage, sharing (data never sold; some transferred outside KSA per Article 29), a **retention table** (e.g., AI session data kept 12 months, usage data 30 days), security measures, the user's 8 rights, minors/guardian consent, breach notification (to SDAIA within 72h), policy updates (30-day notice), and contact details.
- Decorative SVG background pattern; references the supervisory authority **SDAIA (سدايا)**.

### 3.5 Terms of Service (`/terms-of-service`)
A comprehensive, **legally binding** terms document with 19 sections:
- A **clickable table of contents** that jumps to each section.
- Covers: definitions, provider identity (legal disclosure per Saudi e-commerce law), acceptance, service description, registration (notes Clerk auth + email/Google/Apple sign-in), minors, **12 prohibited activities** (fraud, malware, impersonation, violating public morals, selling accounts, etc.), IP/copyright, **fees & refunds** (currently free with daily limits; future paid plans with 15% VAT, auto-renewal, 14-day refund window if usage < 30%), the quota/usage system, AI disclaimers (AI may be inaccurate; not a substitute for accredited sources), privacy (links to the policy + a legal-basis table), data rights, international transfers (Article 29), liability limits, termination (data deleted within 90 days), amendments, **governing law** (Saudi law & Islamic Sharia, Arabic as governing language, 30-day amicable resolution first), and contact.
- A closing "legal acknowledgment" card.

### 3.6 Contact & Help Pages (`/contact`, `/help`)
Both are currently **placeholder stubs** showing only a centered "اتصل بنا" (Contact us) heading. Real contact information lives on the About page's `#contact` section. These pages are not yet built out.

### 3.7 Public Top Navigation Bar (`TopNav`)
A sticky, semi-transparent header with backdrop blur (on all marketing/legal pages):
- **Brand block** (links to `/`): "Chapter-14" wordmark + small logo.
- **Auth-aware actions:** signed-out → "تسجيل الدخول" (Sign in) + gold "ابدأ الآن" (Get started); signed-in → user avatar menu + "مكتبتي" (My Library).

### 3.8 Public Footer (`Footer`)
A four-column footer:
- Brand column + tagline ("Your destination in your educational journey in the AI era").
- "سند" links: What is Sanad, Features, How to use.
- "Get to know us": About, Blog (coming soon), Jobs (coming soon).
- "References": Privacy Policy, Terms, Contact.
- Copyright line. *(Note: the Terms link points to `/terms-and-services`, but the real route is `/terms-of-service` — a known broken link.)*

---

## 4. Authentication & Onboarding

Authentication is provided by **Clerk** (in Arabic), supporting **email, Google, and Apple** sign-in.

### 4.1 Sign In (`/sign-in`)
- Renders Clerk's sign-in widget centered on the screen.
- After login, sends the user to **`/my-library`** by default.
- Honors a `?redirect_url=` to return the user to where they came from — but **only allows safe internal paths** (must start with a single `/`, never `//`) to prevent open-redirect abuse.

### 4.2 Sign Up (`/sign-up`)
- Renders Clerk's sign-up widget.
- After registration, sends new users to **`/enroll`** (the course catalog, since a new user has no courses yet).
- Same safe-redirect behavior as sign-in.

### 4.3 Onboarding — Phone Collection (`/onboarding`)
A one-time gate. New users who haven't yet provided a phone number are redirected here before reaching the app.
- A centered card with a phone icon, title **"أدخل رقم الجوال"** (Enter your mobile number), and a single phone field (LTR, tel keyboard, placeholder `05xxxxxxxx`).
- **Smart Saudi-number normalization:** accepts `+9665…`, `9665…`, `05…`, `5…`, `009665…`, and strips spaces/dashes/parens into the canonical `+9665XXXXXXXX`. Invalid input shows an inline Arabic error.
- **Resume-what-you-were-doing logic:** if the user arrived here mid-enrollment (a `course` param is present), onboarding automatically attempts that enrollment afterward, then sends them to the library; otherwise it returns them to their original destination.

### 4.4 The Access Gate (`proxy.ts` middleware)
A server-side "bouncer" runs on every request:
- Blocks unsigned-out users from `/admin/*` and `/my-library/*` (redirects to login, remembering the intended URL).
- **The phone-number checkpoint:** any signed-in user who hasn't completed onboarding is redirected to `/onboarding` (except when already on `/onboarding` or an `/api` route).
- Marketing, legal, sign-in/up, enrollment, and study routes remain public.

---

## 5. Course Discovery & Enrollment (`/enroll`)

The course catalog where students find and join subjects.

- **Heading:** "استكشف الدورات المتاحة" (Explore available courses).
- **Filtering controls:**
  - A **search box** ("ابحث عن اسم مادة ..." — search by subject name).
  - A **university (institution)** dropdown.
  - A **major (specialization)** dropdown (filterable by the selected institution).
  - All filters sync to the URL so they're shareable/bookmarkable.
- The list shows **only courses the user is not yet enrolled in** (via a database function `get_unenrolled_courses`).
- **Course cards** display: cover image (or placeholder), title, description, and a gold **"جديد"** (New) badge.
- **Enroll button** ("اشترك في الدورة") per card:
  - Signed-in users → enroll instantly, see a success toast, and are taken to the library.
  - Signed-out users → sent to sign-up with the chosen course remembered, then auto-enrolled after onboarding.
- Skeleton loading cards while data loads; a friendly empty state ("لا توجد دورات متاحة حالياً") when nothing matches.

---

## 6. My Library — The Student Dashboard

The authenticated area uses a collapsible **App Sidebar** + **Site Header** shell.

### 6.1 Library Page (`/my-library`)
Shows the courses the student is enrolled in.
- **Heading:** "الدورات المسجلة" (Enrolled Courses).
- A responsive grid of **course cards** (cover image with zoom-on-hover, "new" badge, title, divider, and a level indicator "المستوى {level}").
- Clicking a card opens that course's chapter list.
- **Empty state:** a book icon, "لا توجد دورات مسجلة," and a gold **"استكشف الدورات"** (Explore Courses) button → `/enroll`.
- **Loading:** skeleton cards mimicking the real layout (both in-component and route-level `loading.tsx`).

### 6.2 Course Detail / Chapters (`/my-library/{course}`)
Shows the lessons inside an enrolled course.
- **Breadcrumb:** "المكتبة / {course title}" (Library links back).
- Course **title** and **description**.
- A grid of **chapter cards**, each showing "الفصل {NN}" (zero-padded chapter number), the chapter title, and a **"ابدأ الدرس"** (Start Lesson) button.
- Chapters are sorted by teaching order.
- Clicking a chapter opens the **Study Session**.
- Loading skeleton; "Course not found" (English) for a bad slug; "لا توجد فصول متاحة" if a course has no chapters.

---

## 7. The Study Session — The Core Feature

This is the heart of Sanad: an interactive learning workspace at `/{course}/{chapter}/study` where the student reads the chapter's PDF slides **while an AI voice tutor teaches them**.

The screen is built from three parts:
1. **Top navigation bar** — chapter title + a "المكتبة" (Library) exit button + Sanad logo (desktop).
2. **The PDF/Slide Canvas** — the reading surface.
3. **The Agent Launcher** — the control bar that starts and runs the AI tutor session.

### 7.1 The PDF / Slide Canvas
- Displays the chapter PDF as a **swipeable horizontal carousel** of pages (one page at a time, in a 16:9 frame, with a live selectable text layer).
- **Lazy rendering:** only the current page and its neighbors are actually rendered; distant pages show a "شريحة {n}" (Slide n) spinner placeholder.
- **Zoom & navigation toolbar** docked at the bottom: previous/next page arrows, zoom out / zoom in (10% steps, 50%–200%), a live zoom percentage, and a "current / total" page indicator.
- **AI text highlights:** when the tutor wants to point at something, matching text spans get wrapped in animated `<mark>` highlights with four visual styles — **highlight** (drawn highlighter), **circle** (drawn circle), **underline** (drawn underline), and **point** (a pulsing finger/pointer). These animations are how the tutor "shows" the student where to look.

### 7.2 Starting a Session — The Menu Popup
Before connecting, the launcher shows a gold **"ابدا مع سند الان!"** (Start with Sanad now!) button. Clicking it opens a popover with:
- A **language toggle**: "عربي" (Arabic) / "English" — choosing the tutor's spoken language.
- A **"ابدأ الان"** (Start now) button (play icon) that launches the voice session.

When the session starts, Sanad requests a **LiveKit voice token** tied to the course, chapter, language, and the user's identity, and joins a private room.

### 7.3 The Session Control Bar (when active)
Once connected, the bottom bar becomes the live control panel:
- **Topics dropdown** ("اختر موضوع" — choose a topic): lists the chapter's topics. Selecting one asks the tutor to explain that topic. The current topic shows a small **circular progress ring** indicating how many sections have been covered.
- **Voice/visualizer:** a live audio bar visualizer that changes color by tutor state — **green = listening**, **amber = thinking**, **gold = speaking**, **blue = idle**.
- **Controls (with hover-reveal Arabic labels):**
  - **إنهاء الجلسة** (End session) — red disconnect button.
  - **كتم/تشغيل الصوت** (Mute/Unmute mic) — toggles the user's microphone.
  - **كتم/تشغيل الصوت** (Mute/Unmute audio output) — toggles the tutor's audio.
  - **لوحة المفاتيح** (Keyboard) — switches to typed input instead of voice.
- A **toast** appears when each new section starts ("Section N Started").

### 7.4 How the AI Tutor Drives the Screen
The tutor communicates with the page over a "ui-control" channel and can perform these actions in real time:
- **Scroll** the slides to a specific page.
- **Set the current topic** (and how many sections it has).
- **Set the current section** (advancing progress).
- **Mark a section done.**
- **Add markers** (highlights/circles/underlines/points) on specific slide text, optionally **delayed** so they appear in sequence as the tutor speaks.
- **Remove markers** by id when it moves on.
- **End the session** (time limit reached) with a goodbye message.

### 7.5 Checkpoints — Quick Comprehension Quizzes
At key moments the tutor presents a **checkpoint popup**: a small floating card with a question and a list of answer-choice buttons. The student clicks a choice, which is sent back to the tutor. (Two or fewer choices → titled "Check Understanding"; more → "Checkpoint Question.")

### 7.6 Typed Input Popup
If the student prefers typing (or needs to answer a written checkpoint), a full-screen **"اكتب رسالتك"** (Write your message) modal opens:
- Optional checkpoint banner ("تحقق من فهمك" — Check your understanding) showing the question.
- An auto-growing textarea; **Enter sends, Shift+Enter adds a newline**.
- A gold send button; closes on send.

### 7.7 End-of-Session Feedback Dialog
When a session ends (user disconnects or time limit hit), a feedback dialog appears:
- **Form state:** optional alert banner (e.g., time-limit message), title **"كيف كانت تجربتك مع سند؟"**, a privacy reassurance, a **5-star rating** control (with hover preview), a "ملاحظات عامة" (general notes) textarea, and an "إرسال التقييم" (Submit rating) button. It cannot be dismissed until submitted.
- **Thank-you state:** an animated check-circle, "شكراً لك!" and a "العودة للمكتبة" (Return to Library) button.

> The rating + notes are saved as **scores on the session's Langfuse trace** (an AI-observability tool), so product feedback is tied directly to the AI session data.

---

## 8. Onboarding Tours (In-App Walkthroughs)

First-time guidance is delivered as step-by-step **tooltips** that point at specific UI elements (with **Next** and **Skip** controls). Each tour runs **once per user** (remembered in the browser per user id), auto-starting ~800ms after the page loads.

- **Library tour (2 steps):** explains (1) the "Add more subjects" button, and (2) where settings/help/profile live in the sidebar.
- **Pre-session study tour (3 steps):** explains (1) the language toggle, (2) the back-to-library button, and (3) the "Start a session with Sanad" button.
- **In-session study tour (2 steps):** explains (1) the control panel (mute, audio, keyboard, end) and (2) the topics list. It **auto-dismisses the moment the session connects** so it never blocks an active lesson.

---

## 9. Settings & Account (`/settings`)

A combined account dashboard with a dark teal/navy theme.

- **Clerk `UserProfile`** widget at the top: full account management (edit profile, email/password, MFA, connected accounts, active sessions, delete account) — all in Arabic.
- **"الخطة الحالية" (Current Plan) card:** a placeholder showing "لم يتم تحدد خطة بعد" (no plan selected yet) — awaiting future billing/subscription integration.
- **"المعلومات الأكاديمية" (Academic Information) card:** shows the student's **university, major, and level** (each "غير محدد" if not set), with skeleton loaders while loading.
- **"الدورات المسجلة" (Enrolled Courses) card:** a count badge ("{N} دورة") and a list/table of enrollments showing course name, level badge, enrollment date (in the Saudi Arabic locale, e.g., "١٥ يناير ٢٠٢٦"), and an active/inactive status badge ("نشط"/"غير نشط"). On desktop this is a full data table; on mobile it's stacked cards. Empty state when none.

---

## 10. Navigation Systems

### 10.1 Authenticated App Sidebar (`AppSidebar`)
- **Header:** Chapter-14 logo + wordmark (links to `/`).
- **"إضافة مزيد من المواد" (Add more subjects)** gold button → `/enroll` (has an onboarding-tour hook).
- **"مكتبتي" (My Library)** nav item → `/my-library`.
  - *(Several more items — Daily Tasks, Performance Analytics, Projects, Team — are present but marked **"قريباً" (coming soon)** / disabled.)*
- **Secondary nav (bottom):** **الاعدادات** (Settings → `/settings`), **قيم تجربتك** (Rate your experience → external Microsoft Form), **تواصل مع الدعم** (Contact support → WhatsApp).
- **User panel:** avatar, full name, and email (from Clerk), opening Clerk's account menu.

### 10.2 Authenticated Site Header (`SiteHeader`)
- Sidebar toggle (open/close the sidebar).
- A static **"مكتبتي"** page title.
- (Desktop only) an external **"منصة الدورات"** (Courses platform) link → `https://chapter14.net/`.

### 10.3 Mobile Warning Popup
On phone-sized screens (under 640px), a one-time dialog advises: **"تجربة أفضل على شاشة أكبر"** (A better experience on a larger screen), recommending a laptop or iPad, while letting the user continue anyway. Shown once per browser session.

---

## 11. Admin Area (`/admin/dashboard`)

Currently a **placeholder stub**: a single heading "Hello Admin Dashboard User!" with no real functionality, navigation, or data. It is not Arabic-localized. Route protection requires sign-in, but there is **no role-based authorization** yet — any signed-in user can reach it. This area awaits real admin tooling.

---

## 12. The Content & Protection Model

- **Course content** (PDFs, slide assets, and a per-chapter **`topics_list.json`** describing the chapter's topics) is stored on **Bunny.net CDN** behind a protected pull zone.
- A **server-side proxy** (`/api/fetch-bunny/...`) streams this content to the browser so the CDN key is never exposed. For `courses/{slug}/...` paths it **verifies the student is enrolled** before serving the file (returns 403 otherwise); it caches privately for up to 1 hour.
- **Student data** (profiles, institutions, majors, courses, chapters, enrollments, course-major mappings) lives in **Supabase (Postgres)**. Browser access is scoped per-user via row-level security tied to the Clerk session token.

---

## 13. Feedback & Observability

- **Session feedback** (star rating + notes) is captured at the end of each session and attached as **scores** to the matching **Langfuse** trace (or a fallback trace if none exists).
- **Vercel Analytics** and **Vercel Speed Insights** run on every page for usage and performance telemetry.
- **SEO:** `robots.txt` allows crawling of public pages but blocks `/api/`, `/admin/`, `/my-library/`, `/enroll/`, and `/settings/`. `sitemap.xml` lists only public pages (home, about, privacy, terms, contact).

---

## 14. Two Suggested/Partially-Built Tools (Not Active)

Two annotation toolsets exist in the code but are **not wired into the live study experience**:
- A **floating tools menu** (bottom-left FAB expanding to Pen / Highlighter / Eraser).
- A **top-centered annotation toolbar** (Pen / Highlighter / Eraser + an AI-assistant toggle), which auto-hides when the AI panel is open.

These appear to be exploratory/placeholder work for a future "draw on the slides" feature; their labels are partly English and their drawing logic is not yet connected. They are mentioned here for completeness.

---

## 15. Current State, Placeholders & Known Gaps

For a complete and honest picture, the following are unfinished or inconsistent as of this analysis:

- **Admin dashboard:** placeholder only; no role-based access control.
- **Contact & Help pages:** empty stubs (identical "اتصل بنا" headings).
- **Current Plan (Settings):** static placeholder, no billing/subscription yet.
- **Sidebar "coming soon" items:** Daily Tasks, Performance Analytics, Projects, Team are flagged upcoming.
- **Broken link:** footer "الشروط الاستخدام" points to `/terms-and-services` instead of `/terms-of-service`.
- **Annotation toolsets** (§14) are not functional in the live flow.
- **Some English text** remains in a few places (e.g., the "Course not found" message, admin heading, annotation tool labels, some toasts) — inconsistent with the Arabic-first stance.
- **LiveKit token issuance** does not yet verify the user is enrolled in the requested course/chapter, and the **feedback endpoint** has no authentication — both are items to harden.

---

## 16. One-Paragraph Summary

**Sanad is an Arabic-first, dark-mode AI tutoring platform for Saudi students.** A student signs up, enters their phone number, browses a catalog of university courses, enrolls, and opens a chapter. The chapter appears as a swipeable PDF/slide deck, and a **voice AI tutor** joins the session to explain topics out loud, **highlight and point to specific words on the slides**, advance through structured sections, ask **checkpoint questions** to verify understanding, and answer the student's own voice or typed questions. The tutor speaks in Arabic or English, the student controls mic/audio/keyboard and can end anytime, and the session closes with a **rating prompt**. Around this core sits a public marketing site, PDPL-compliant legal pages, an authenticated library/settings area, and onboarding tours — all in Arabic RTL, branded under Chapter-14, with course content protected behind enrollment checks.
