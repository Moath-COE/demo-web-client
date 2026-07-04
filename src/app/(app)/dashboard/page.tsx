import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Circle,
  ListTodo,
  PlayCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const NEXT_TASK = {
  course: "الدورة التجريبية",
  title: "الدرس الأول: مقدمة في المقرر",
};

const DAILY = { completed: 2, total: 5 };

type Milestone = {
  id: string;
  days: number;
  title: string;
  course: string;
};

const UPCOMING_MILESTONES: Milestone[] = [
  {
    id: "1",
    days: 12,
    title: "اختبار منتصف الفصل",
    course: "الدورة التجريبية",
  },
  {
    id: "2",
    days: 18,
    title: "تسليم الواجب الثاني",
    course: "الدورة التجريبية",
  },
  { id: "3", days: 25, title: "اختبار قصير", course: "الدورة التجريبية" },
];

const MILESTONE = UPCOMING_MILESTONES[0];

const TODAYS_TASKS_TITLE = "تعرّف على سند خلال 7 دقائق";

const COURSE_PROGRESS = [
  { id: "1", title: "الدورة التجريبية", completed: 4, total: 10 },
  { id: "2", title: "أساسيات الكيمياء", completed: 6, total: 12 },
  { id: "3", title: "مهارات الاختبار", completed: 3, total: 8 },
];

const TODAY_TASKS = [
  { id: "1", title: "نظرة عامة على سند", done: false },
  { id: "2", title: "شاهد كيف يشرح سند المحتوى", done: false },
  { id: "3", title: "جرّب سؤال سند صوتياً أو كتابياً", done: false },
  { id: "4", title: "أجب على سؤال فهم قصير", done: false },
  { id: "5", title: "شاهد كيف يحدّث سند خطتك تلقائياً", done: false },
  { id: "6", title: "اكتشف الفرق بين سند و ChatGPT", done: false },
];

export default function DashboardPage() {
  const dailyPct = Math.round((DAILY.completed / DAILY.total) * 100);

  return (
    <div className="mx-auto flex w-full max-w-314 flex-col gap-6 p-5 sm:p-6">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div>
            <p className="text-sm text-muted-foreground">صباح الخير </p>
            <h3 className="text-xl font-semibold leading-tight sm:text-2xl">
              فلان الفلاني
            </h3>
          </div>
        </div>
        <Avatar className="size-11 border border-border/60 bg-secondary">
          <AvatarFallback className="bg-secondary text-sm font-medium text-foreground">
            ط
          </AvatarFallback>
        </Avatar>
      </header>

      <div className="columns-1 gap-4 md:columns-2 [&>*]:mb-4 [&>*]:break-inside-avoid">
        {/* {Dashboard widgets header} */}
        <div className="flex flex-col gap-4 sm:flex-row  [column-span:all]">
          <Card className="gap-0 overflow-hidden border border-accent/35 bg-primary py-0 text-primary-foreground flex-2">
            <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/12 px-2.5 py-1 text-xs font-medium text-primary-foreground">
                    <PlayCircle className="size-3.5" />
                    المهمة التالية
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-primary-foreground/80">
                    {NEXT_TASK.course}
                  </span>
                  <h2 className="text-lg font-semibold leading-tight sm:text-xl">
                    {NEXT_TASK.title}
                  </h2>
                </div>
                <div className="flex w-full max-w-xs flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs text-primary-foreground/80">
                    <span>تقدّم مهام اليوم</span>
                    <span className="tabular-nums">
                      {DAILY.completed} من {DAILY.total}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-primary-foreground/20">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-300"
                      style={{ width: `${dailyPct}%` }}
                    />
                  </div>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link href="/study">
                  ابدأ المهمة
                  <ArrowLeft className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-accent/35 shadow-none flex-1">
            <CardContent className="grid items-center gap-4 p-5 max-[520px]:grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto]">
              <div className="flex min-w-0 flex-col gap-2">
                <div className="inline-flex items-center gap-2 text-[0.8125rem] leading-snug text-muted-foreground">
                  <CalendarClock className="size-4" />
                  <span>أقرب موعد</span>
                </div>
                <div>
                  <div className="text-[0.9375rem] font-semibold leading-relaxed text-card-foreground text-pretty">
                    {MILESTONE.title}
                  </div>
                  <div className="inline-flex items-center gap-2 text-[0.8125rem] leading-snug text-muted-foreground">
                    {MILESTONE.course}
                  </div>
                </div>
              </div>
              <div
                className="flex min-w-[92px] flex-col items-center justify-center gap-0.5 rounded-xl bg-accent/20 px-4 py-3.5 text-accent-foreground max-[520px]:items-start"
                aria-label={`${MILESTONE.days} يوم متبقّي`}
              >
                <span className="text-[2.75rem] font-extrabold leading-none tabular-nums text-accent-foreground">
                  {MILESTONE.days}
                </span>
                <span className="text-xs font-semibold text-accent-foreground/85">
                  يوم متبقّي
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-none">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListTodo className="size-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">
                  جدول اليوم: <span>{TODAYS_TASKS_TITLE}</span>
                </h3>
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">
                {TODAY_TASKS.filter((t) => t.done).length}/{TODAY_TASKS.length}
              </span>
            </div>
            <ul className="flex flex-col">
              {TODAY_TASKS.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-2.5 rounded-md px-1 py-1.5"
                >
                  {task.done ? (
                    <CheckCircle2 className="size-4 shrink-0 text-accent" />
                  ) : (
                    <Circle className="size-4 shrink-0 text-muted-foreground/50" />
                  )}
                  <span
                    className={cn(
                      "text-sm",
                      task.done && "text-muted-foreground line-through",
                    )}
                  >
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">تقدّم المواد</span>
            </div>
            <div className="flex flex-col gap-3">
              {COURSE_PROGRESS.map((course) => {
                const pct = Math.round((course.completed / course.total) * 100);
                return (
                  <div key={course.id} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {course.title}
                      </span>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {course.completed} من {course.total} فصول
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarClock className="size-4" />
              <span className="text-sm font-medium">المواعيد القادمة</span>
            </div>
            <ol className="relative flex flex-col">
              <span
                aria-hidden="true"
                className="absolute bottom-2 top-2 w-px bg-border start-[5px]"
              />
              {UPCOMING_MILESTONES.map((item, index) => (
                <li
                  key={item.id}
                  className="relative flex gap-3 pb-4 last:pb-0"
                >
                  <span
                    className={cn(
                      "z-10 mt-1 size-[11px] shrink-0 rounded-full ring-4 ring-card",
                      index === 0
                        ? "bg-accent"
                        : "border border-muted-foreground/40 bg-card",
                    )}
                  />
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        index !== 0 && "text-muted-foreground",
                      )}
                    >
                      {item.title}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="tabular-nums">بعد {item.days} يوم</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.course}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
