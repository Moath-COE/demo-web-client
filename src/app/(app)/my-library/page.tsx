"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useDatabase } from "@/context/databaseContext";
import { useEffect, useState } from "react";
import CourseLoading from "@/components/library-dashboard/loadingCourseCards";
import { useUser } from "@clerk/nextjs";
import { Database } from "@/types/database.types";

type Course = Database["public"]["Tables"]["courses"]["Row"];

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
        .select(`*, enrollments!inner(user_id)`)
        .eq("enrollments.user_id", user.id);

      if (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
        return;
      }
      setCourses(courses); // Handle null data
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
        <h1 className="text-3xl font-bold">مكتبة دوراتك</h1>
        <p className="text-card">تصفح دوراتك المميزة</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course: Course) => (
          <Card
            key={course.id}
            className="hover:shadow-lg transition-shadow cursor-pointer relative justify-between"
          >
            <Link
              href={`my-library/${course.slug}/`}
              className="absolute inset-0 z-10"
            />
            <CardHeader>
              <div className="flex items-start justify-between relative">
                <div className="space-y-1">
                  <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
                    <Image
                      src={
                        course.image_url || "/static/course-card-placeholder.png"
                      }
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </div>
                <Badge
                  variant="default"
                  className="bg-accent/80 absolute top-2 left-2"
                >
                  جديد
                </Badge>
              </div>
            </CardHeader>
            {/* <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.chapters} فصول</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration} ساعة</span>
                </div>
              </div>
            </CardContent> */}
          </Card>
        ))}
      </div>
    </div>
  );
}
