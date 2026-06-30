import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold my-4">الدورات المسجلة</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {DEMO_COURSES.map((course) => (
          <Card
            key={course.id}
            className="group hover:shadow-lg transition-shadow cursor-pointer relative overflow-hidden"
          >
            <Link href="/study" className="absolute inset-0 z-10" />
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={course.image_url || "/static/course-card-placeholder.png"}
                alt={course.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <Badge
                variant="secondary"
                className="absolute bottom-2 start-2 z-20 text-xs backdrop-blur-sm bg-accent text-foreground border-0"
              >
                new
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg leading-snug line-clamp-2">
                {course.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="mb-3" />
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>المستوى {course.level || 0}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {DEMO_COURSES.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <div className="rounded-full bg-muted/50 p-4">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-lg font-medium">لا توجد دورات مسجلة</p>
            <p className="text-sm text-muted-foreground">
              ابدأ رحلتك التعليمية بالتسجيل في إحدى الدورات المتاحة
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
