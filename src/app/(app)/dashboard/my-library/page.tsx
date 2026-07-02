import { Card, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SidebarTrigger } from "@/components/ui/sidebar";

type DemoCourse = {
  id: string;
  title: string;
  slug: string;
  level: number;
  image_url: string | null;
};

const DEMO_COURSES: DemoCourse[] = [
  {
    id: "1",
    title: "الدورة التجريبية",
    slug: "demo-course",
    level: 1,
    image_url: "/static/course-card-placeholder.png",
  },
];

export default function LibraryPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-5 sm:p-6">
      <header className="flex items-center gap-2">
        <SidebarTrigger />
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold leading-tight sm:text-2xl">
            مكتبتي
          </h1>
          <p className="text-sm text-muted-foreground">الدورات المسجّلة</p>
        </div>
      </header>

      {DEMO_COURSES.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {DEMO_COURSES.map((course) => (
            <Card
              key={course.id}
              className="group relative cursor-pointer gap-0 overflow-hidden border-border/70 py-0 shadow-none transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Link
                href="/study"
                className="absolute inset-0 z-10 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              />
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={course.image_url || "/static/course-card-placeholder.png"}
                  alt={course.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="course-card-scrim absolute inset-0" />
                <span className="absolute top-2 start-2 z-20 inline-flex items-center gap-1 rounded-full bg-accent/95 px-2 py-0.5 text-xs font-medium text-accent-foreground backdrop-blur-sm">
                  <span className="size-1.5 rounded-full bg-accent-foreground/80" />
                  جديد
                </span>
              </div>
              <div className="flex flex-col gap-3 p-5">
                <CardTitle className="line-clamp-2 text-base font-semibold leading-snug">
                  {course.title}
                </CardTitle>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    <BookOpen className="h-3.5 w-3.5" />
                    المستوى {course.level || 0}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    تابع
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-5 px-6 py-16 text-center">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-card text-primary shadow-sm">
            <BookOpen className="size-7" />
          </span>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">
              لا توجد دورات مسجّلة
            </h2>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
              ابدأ رحلتك التعليمية بالتسجيل في إحدى الدورات المتاحة لتظهر هنا.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
