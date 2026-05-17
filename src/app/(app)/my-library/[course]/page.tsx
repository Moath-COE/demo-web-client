"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useDatabase } from "@/context/databaseContext";
import { useEffect, useState } from "react";
import ChapterLoading from "@/components/library-dashboard/loadingChaptersCards";
import { useParams } from "next/navigation";
import { Database } from "@/types/database.types";

type Course = Database["public"]["Tables"]["courses"]["Row"];
type Chapter = Database["public"]["Tables"]["chapters"]["Row"];

export default function CoursePage() {
  const { course: courseSlug }: { course: string } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = useDatabase();

  useEffect(() => {
    if (!supabase) return;

    const fetchData = async () => {
      setLoading(true);
      const [courseResult, chaptersResult] = await Promise.all([
        supabase.from("courses").select("*").eq("slug", courseSlug).single(),
        supabase
          .from("chapters")
          .select("*, courses!inner(slug)")
          .eq("courses.slug", courseSlug)
          .order("order_index", { ascending: true }),
      ]);

      if (courseResult.error)
        console.error("Error fetching course:", courseResult.error);
      if (chaptersResult.error)
        console.error("Error fetching chapters:", chaptersResult.error);

      setCourse(courseResult.data || null);
      setChapters(chaptersResult.data || []);
      setLoading(false);
    };

    fetchData();
  }, [supabase, courseSlug]);

  if (loading) {
    return <ChapterLoading />;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-accent">
          <Link href="/my-library" className="hover:text-foreground">
            المكتبة
          </Link>
          <span>/</span>
          <span>{course?.title || ""}</span>
        </div>
        <h1 className="text-3xl font-bold">{course?.title || ""}</h1>
        <p className="text-card">{course?.description || ""}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {chapters.length > 0 ? (
          chapters.map((chapter) => {
            return (
              <Card
                key={chapter.id}
                className="group hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden"
              >
                <Link
                  href={`/${course.slug}/${chapter.order_index}/study`}
                  className="absolute inset-0 z-10"
                />
                <CardHeader className="pb-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    الفصل {String(chapter.order_index).padStart(2, "0")}
                  </p>
                  <CardTitle className="text-lg leading-snug line-clamp-1">
                    {chapter.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-3" />
                  <Button className="w-full justify-between bg-transparent text-muted-foreground hover:bg-primary hover:text-foreground group-hover:shadow-md transition-shadow">
                    ابدأ الدرس
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p>لا توجد فصول متاحة</p>
        )}
      </div>
    </div>
  );
}
