"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useDatabase } from "@/context/databaseContext";
import { useEffect, useState } from "react";
import CourseLoading from "@/components/library-dashboard/loadingCourseCards";
import { useUser } from "@clerk/nextjs";
import { Database } from "@/types/database.types";

type Course = Database["public"]["Tables"]["courses"]["Row"] & {
  chapters: { count: number }[];
};

const levelLabels: Record<string, string> = {
  beginner: "مبتدئ",
  intermediate: "متوسط",
  advanced: "متقدم",
};

export default function LibraryPage() {
  const supabase = useDatabase();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!supabase || !user?.id) return;

      setLoading(true);
      const { data: courses, error } = await supabase
        .from("courses")
        .select(`*, enrollments!inner(user_id), chapters(count)`)
        .eq("enrollments.user_id", user.id);

      if (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
        return;
      }
      setCourses(courses);
      setLoading(false);
    };
    fetchCourses();
  }, [supabase, user?.id]);

  if (loading) {
    return <CourseLoading />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold my-4">الدورات المسجلة</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course: Course) => (
          <Card
            key={course.id}
            className="group hover:shadow-lg transition-shadow cursor-pointer relative overflow-hidden"
          >
            <Link
              href={`my-library/${course.slug}/`}
              className="absolute inset-0 z-10"
            />
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
    </div>
  );
}
