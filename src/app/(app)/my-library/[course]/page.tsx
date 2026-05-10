"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    setLoading(true);

    const fetchData = async () => {
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
      {/* Course Header */}
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
        {/* <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course?.chapters || 0} فصول</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course?.duration || 0} ساعات</span>
          </div>
        </div> */}
      </div>

      {/* Chapters Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {chapters.length > 0 ? (
          chapters.map((chapter) => {
            return (
              <Card
                key={chapter.id}
                className="hover:shadow-lg transition-shadow cursor-pointer relative justify-between"
              >
                <Link
                  href={`/${course.slug}/${chapter.order_index}/study`}
                  className="absolute inset-0 z-10"
                />
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg">
                          الفصل {chapter.order_index}: {chapter.title}
                        </CardTitle>
                        <CardDescription>{chapter.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    {/* <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{chapter.lessons} دروس</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{chapter.duration} دقيقة</span>
                    </div> */}
                  </div>
                  <Button className="w-full" variant="default">
                    ذاكر الدرس
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
