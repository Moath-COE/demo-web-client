"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import { useDatabase } from "@/context/databaseContext";
import { useEffect, useState, Suspense, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CourseLoading from "@/components/library-dashboard/loadingCourseCards";
import TopNav from "@/components/landing/topNav";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Database } from "@/types/database.types";

type Course = Database["public"]["Tables"]["courses"]["Row"];

function buildEnrollUrl(params: {
  q?: string;
  institution?: string;
  major?: string;
}) {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.institution) search.set("institution", params.institution);
  if (params.major) search.set("major", params.major);
  const qs = search.toString();
  return qs ? `/enroll?${qs}` : "/enroll";
}

function EnrollPageContent() {
  const supabase = useDatabase();
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const institutionParam = searchParams.get("institution");
  const majorParam = searchParams.get("major");
  const courseParam = searchParams.get("course");

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(
    null,
  );
  const { user, isSignedIn } = useUser();

  const [institutions, setInstitutions] = useState<
    { id: number; name: string }[]
  >([]);
  const [majors, setMajors] = useState<
    { id: number; name: string; institution_id: number | null }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState(q || "");
  const [selectedInstitution, setSelectedInstitution] = useState(
    institutionParam || "",
  );
  const [selectedMajor, setSelectedMajor] = useState(majorParam || "");

  useEffect(() => {
    if (!supabase) return;
    const fetchFilters = async () => {
      const [instRes, majorRes] = await Promise.all([
        supabase.from("institutions").select("id, name").order("name"),
        supabase
          .from("majors")
          .select("id, name, institution_id")
          .order("name"),
      ]);
      if (instRes.data) setInstitutions(instRes.data);
      if (majorRes.data) setMajors(majorRes.data);
    };
    fetchFilters();
  }, [supabase]);

  const filteredMajors = useMemo(() => {
    if (!selectedInstitution) return majors;
    return majors.filter(
      (m) => m.institution_id === Number(selectedInstitution),
    );
  }, [majors, selectedInstitution]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    router.push(
      buildEnrollUrl({
        q: query || undefined,
        institution: selectedInstitution || undefined,
        major: selectedMajor || undefined,
      }),
    );
  };

  const handleInstitutionChange = (value: string) => {
    setSelectedInstitution(value);
    const newMajors = value
      ? majors.filter((m) => m.institution_id === Number(value))
      : majors;
    const majorValid =
      selectedMajor && newMajors.some((m) => m.id === Number(selectedMajor));
    const nextMajor = majorValid ? selectedMajor : "";
    if (!majorValid) setSelectedMajor("");
    router.push(
      buildEnrollUrl({
        q: searchQuery.trim() || undefined,
        institution: value,
        major: nextMajor || undefined,
      }),
    );
  };

  const handleMajorChange = (value: string) => {
    setSelectedMajor(value);
    router.push(
      buildEnrollUrl({
        q: searchQuery.trim() || undefined,
        institution: selectedInstitution || undefined,
        major: value,
      }),
    );
  };

  useEffect(() => {
    const fetchCourses = async () => {
      if (!supabase) return;

      setLoading(true);
      const { data: courses, error } = await supabase.rpc(
        "get_unenrolled_courses",
        { check_user_id: user?.id || "" },
      );

      if (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
        return;
      }

      let filtered: Course[] = courses || [];

      if (courseParam) {
        filtered = filtered.filter((c) => c.id === courseParam);
      }

      if (institutionParam) {
        filtered = filtered.filter(
          (c) => c.institution_id === Number(institutionParam),
        );
      }

      if (majorParam) {
        const { data: courseMajorIds } = await supabase
          .from("course_majors")
          .select("course_id")
          .eq("major_id", Number(majorParam));
        const courseIds = new Set(
          courseMajorIds?.map((cm) => cm.course_id) || [],
        );
        filtered = filtered.filter((c) => courseIds.has(c.id));
      }

      if (q) {
        const searchLower = q.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.title.toLowerCase().includes(searchLower) ||
            (c.description &&
              c.description.toLowerCase().includes(searchLower)),
        );
      }

      setCourses(filtered);
      setLoading(false);
    };
    fetchCourses();
  }, [supabase, user?.id, q, institutionParam, majorParam, courseParam]);

  const handleEnroll = useCallback(
    async (courseId: string) => {
      if (!isSignedIn) {
        const enrollUrl = buildEnrollUrl({
          q: searchQuery.trim() || undefined,
          institution: selectedInstitution || undefined,
          major: selectedMajor || undefined,
        });
        const urlWithCourse = `${enrollUrl}${enrollUrl.includes("?") ? "&" : "?"}course=${courseId}`;
        router.push(`/sign-up?redirect_url=${encodeURIComponent(urlWithCourse)}`);
        return;
      }

      try {
        setEnrollingCourseId(courseId);

        const response = await fetch("/api/enroll", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "فشل التسجيل في الدورة");
        }

        toast.success("تم التسجيل في الدورة بنجاح");
        router.push("/my-library");
      } catch (error) {
        console.error("Error enrolling in course:", error);
        toast.error(
          error instanceof Error ? error.message : "حدث خطأ أثناء التسجيل",
        );
      } finally {
        setEnrollingCourseId(null);
      }
    },
    [isSignedIn, router, searchQuery, selectedInstitution, selectedMajor],
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] via-white to-[#e6e9ed] dark:from-[#0e293c] dark:via-[#1d5479] dark:to-[#0e293c]">
        <TopNav />
        <CourseLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] via-white to-[#e6e9ed] dark:from-[#0e293c] dark:via-[#1d5479] dark:to-[#0e293c]">
      <TopNav />

      <div className="container mx-auto px-4 sm:px-8 py-12">
        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              استكشف الدورات المتاحة
            </h1>
            <p className="text-lg text-card/80">
              اختر من بين مجموعة واسعة من الدورات المتاحة وابدأ رحلتك التعليمية
              اليوم
            </p>
          </div>

          <div className="w-full bg-card backdrop-blur-sm rounded-2xl border border-border/50 p-6 space-y-4 text-muted-foreground">
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="relative group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5  group-focus-within:text-chart-2 transition-colors duration-200" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  placeholder="ابحث عن اسم مادة ..."
                  className=" h-12 pr-12 pl-5 bg-background border-border/50 shadow-sm hover:shadow-md focus:shadow-md focus:border-chart-2 focus:ring-2 focus:ring-chart-2/30 transition-all duration-300"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Select
                  value={selectedInstitution}
                  onValueChange={handleInstitutionChange}
                >
                  <SelectTrigger className="flex-1 h-12 bg-background border-border/50 shadow-sm hover:shadow-md hover:border-chart-2 focus:shadow-md focus:border-chart-2 focus:ring-2 focus:ring-chart-2/30 transition-all duration-300">
                    <SelectValue placeholder="اختر الجامعة" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border shadow-xl">
                    {institutions.map((inst) => (
                      <SelectItem
                        key={inst.id}
                        value={String(inst.id)}
                        className="hover:bg-secondary cursor-pointer transition-colors duration-200 rounded-lg mx-1"
                      >
                        {inst.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedMajor} onValueChange={handleMajorChange}>
                  <SelectTrigger className="flex-1 h-12 bg-background border-border/50 shadow-sm hover:shadow-md hover:border-chart-2 focus:shadow-md focus:border-chart-2 focus:ring-2 focus:ring-chart-2/30 transition-all duration-300">
                    <SelectValue placeholder="اختر التخصص" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border shadow-xl">
                    {filteredMajors.map((major) => (
                      <SelectItem
                        key={major.id}
                        value={String(major.id)}
                        className="hover:bg-secondary cursor-pointer transition-colors duration-200 rounded-lg mx-1"
                      >
                        {major.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </form>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course: Course) => (
            <Card
              key={course.id}
              className="hover:shadow-lg transition-shadow cursor-pointer relative justify-between"
            >
              <CardHeader>
                <div className="flex items-start justify-between relative">
                  <div className="space-y-1">
                    <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
                      <Image
                        src={
                          course.image_url ||
                          "/static/course-card-placeholder.png"
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
              <CardContent className="px-6">
                <Button
                  onClick={() => handleEnroll(course.id)}
                  disabled={enrollingCourseId === course.id}
                  className="w-full bg-gradient-to-r from-[#1d5479] to-[#ffa02f] hover:from-[#0e293c] hover:to-[#ff8c00] text-white group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {enrollingCourseId === course.id
                      ? "جاري التسجيل..."
                      : "اشترك في الدورة"}
                  </span>
                  {enrollingCourseId !== course.id && (
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-lg text-card/80">
              لا توجد دورات متاحة حالياً
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EnrollPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] via-white to-[#e6e9ed] dark:from-[#0e293c] dark:via-[#1d5479] dark:to-[#0e293c]">
          <TopNav />
          <CourseLoading />
        </div>
      }
    >
      <EnrollPageContent />
    </Suspense>
  );
}
