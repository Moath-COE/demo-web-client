"use client";

import { UserProfile } from "@clerk/nextjs";
import { useDatabase } from "@/context/databaseContext";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Database } from "@/types/database.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Crown,
  GraduationCap,
  BookOpen,
  Clock,
  CalendarDays,
  Timer,
  Zap,
  Building2,
  Layers,
  AlertCircle,
} from "lucide-react";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type QuotaTier = Database["public"]["Tables"]["quota_tiers"]["Row"];
type Institution = Database["public"]["Tables"]["institutions"]["Row"];
type Major = Database["public"]["Tables"]["majors"]["Row"];

type ProfileWithRelations = Profile & {
  quota_tiers: QuotaTier | null;
  institutions: Institution | null;
  majors: Major | null;
};

type EnrollmentPick = Pick<
  Database["public"]["Tables"]["enrollments"]["Row"],
  "created_at" | "is_active"
>;

type EnrolledCourse = Database["public"]["Tables"]["courses"]["Row"] & {
  enrollments: EnrollmentPick | EnrollmentPick[];
};

export default function Settings() {
  const supabase = useDatabase();
  const { user } = useUser();

  const [tier, setTier] = useState<QuotaTier | null>(null);
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [major, setMajor] = useState<Major | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!supabase || !user?.id) return;

      setLoading(true);

      const [profileRes, coursesRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("*, quota_tiers(*), institutions(*), majors(*)")
          .eq("id", user.id)
          .single(),
        supabase
          .from("courses")
          .select("*, enrollments!inner(created_at, is_active)")
          .eq("enrollments.user_id", user.id)
          .order("created_at", {
            referencedTable: "enrollments",
            ascending: false,
          }),
      ]);

      if (profileRes.data) {
        const profileData = profileRes.data as unknown as ProfileWithRelations;
        setProfile(profileRes.data as unknown as Profile);
        setTier(profileData.quota_tiers);
        setInstitution(profileData.institutions);
        setMajor(profileData.majors);
      }

      if (coursesRes.data) {
        setCourses(coursesRes.data as unknown as EnrolledCourse[]);
      }

      setLoading(false);
    };

    fetchData();
  }, [supabase, user?.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1f2e] via-[#0e293c] to-[#0a1f2e]">
      <div className="flex justify-center pt-8 pb-4">
        <UserProfile path="/settings" routing="path" />
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 pb-16 space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <TierCard tier={tier} loading={loading} />
          <AcademicInfoCard
            institution={institution}
            major={major}
            profile={profile}
            loading={loading}
          />
        </div>

        <EnrolledCoursesCard courses={courses} loading={loading} />
      </div>
    </div>
  );
}

function TierCard({
  tier,
  loading,
}: {
  tier: QuotaTier | null;
  loading: boolean;
}) {
  return (
    <Card className="relative overflow-hidden border-[#1d5479]/30 bg-[#0e293c]/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-[#ffa02f] via-[#e8942b] to-[#045687]" />

      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#e8f0f5]">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-bl from-[#ffa02f] to-[#e8942b] shadow-sm">
            <Crown className="h-4 w-4 text-white" />
          </div>
          الخطة الحالية
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-7 w-32" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          </div>
        ) : tier ? (
          <>
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-l from-[#ffa02f] to-[#e8942b] text-white border-0 px-3 py-1 text-sm font-semibold shadow-sm">
                {tier.name}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center gap-1 rounded-xl bg-gradient-to-b from-[#1b3d54] to-[#133848] p-3 border border-[#1d5479]/20">
                <Zap className="h-4 w-4 text-[#ffa02f] mb-1" />
                <span className="text-xl font-bold text-[#e8f0f5]">
                  {tier.max_daily_sessions}
                </span>
                <span className="text-[10px] text-[#8faabb] leading-tight text-center">
                  جلسات/يوم
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-xl bg-gradient-to-b from-[#1b3d54] to-[#133848] p-3 border border-[#1d5479]/20">
                <Clock className="h-4 w-4 text-[#5ba3cc] mb-1" />
                <span className="text-xl font-bold text-[#e8f0f5]">
                  {tier.max_daily_minutes}
                </span>
                <span className="text-[10px] text-[#8faabb] leading-tight text-center">
                  دقيقة/يوم
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-xl bg-gradient-to-b from-[#1b3d54] to-[#133848] p-3 border border-[#1d5479]/20">
                <Timer className="h-4 w-4 text-[#8faabb] mb-1" />
                <span className="text-xl font-bold text-[#e8f0f5]">
                  {tier.max_session_minutes}
                </span>
                <span className="text-[10px] text-[#8faabb] leading-tight text-center">
                  دقيقة/جلسة
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 text-[#8faabb] text-sm py-2">
            <AlertCircle className="h-4 w-4" />
            <span>لم يتم تحديد خطة بعد</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AcademicInfoCard({
  institution,
  major,
  profile,
  loading,
}: {
  institution: Institution | null;
  major: Major | null;
  profile: Profile | null;
  loading: boolean;
}) {
  return (
    <Card className="relative overflow-hidden border-[#1d5479]/30 bg-[#0e293c]/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-[#045687] via-[#1d5479] to-[#0e293c]" />

      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#e8f0f5]">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-bl from-[#045687] to-[#0e293c] shadow-sm">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          المعلومات الأكاديمية
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        ) : (
          <div className="space-y-2">
            <InfoRow
              icon={<Building2 className="h-4 w-4 text-[#5ba3cc]" />}
              label="الجامعة"
              value={institution?.slug?.toUpperCase()}
              fallback="غير محدد"
            />
            <InfoRow
              icon={<Layers className="h-4 w-4 text-[#7bb8d4]" />}
              label="التخصص"
              value={major?.slug?.toUpperCase()}
              fallback="غير محدد"
            />
            <InfoRow
              icon={<GraduationCap className="h-4 w-4 text-[#8faabb]" />}
              label="المستوى"
              value={profile?.level ? String(profile.level) : null}
              fallback="غير محدد"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon,
  label,
  value,
  fallback,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
  fallback: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-gradient-to-l from-[#1b3d54] to-[#133848] px-4 py-3 border border-[#1d5479]/20">
      {icon}
      <div className="flex-1 flex items-center justify-between">
        <span className="text-sm text-[#8faabb]">{label}</span>
        <span className="text-sm font-semibold text-[#e8f0f5]">
          {value || (
            <span className="text-[#8faabb] font-normal">{fallback}</span>
          )}
        </span>
      </div>
    </div>
  );
}

function EnrolledCoursesCard({
  courses,
  loading,
}: {
  courses: EnrolledCourse[];
  loading: boolean;
}) {
  return (
    <Card className="relative overflow-hidden border-[#1d5479]/30 bg-[#0e293c]/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-[#ffa02f] via-[#1d5479] to-[#045687]" />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#e8f0f5]">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-bl from-[#1d5479] to-[#045687] shadow-sm">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            الدورات المسجلة
          </CardTitle>
          {!loading && (
            <Badge
              variant="secondary"
              className="text-xs font-semibold px-2.5 bg-[#1b3d54] text-[#e8f0f5] border border-[#1d5479]/30"
            >
              {courses.length} دورة
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-[#8faabb]">
            <BookOpen className="h-10 w-10 mb-3 opacity-40" />
            <p className="text-sm">لا توجد دورات مسجلة حالياً</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3 md:hidden">
              {courses.map((course) => {
                const enrollment = Array.isArray(course.enrollments)
                  ? course.enrollments[0]
                  : course.enrollments;
                return (
                  <div
                    key={course.id}
                    className="rounded-xl bg-gradient-to-l from-[#1b3d54] to-[#133848] border border-[#1d5479]/20 p-4 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-gradient-to-bl from-[#ffa02f]/20 to-[#5ba3cc]/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-3.5 w-3.5 text-[#5ba3cc]" />
                      </div>
                      <span className="font-medium text-[#e8f0f5] truncate text-sm">
                        {course.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-4">
                        {course.level ? (
                          <Badge
                            variant="outline"
                            className="text-xs border-[#5ba3cc]/30 text-[#5ba3cc]"
                          >
                            {course.level}
                          </Badge>
                        ) : null}
                        <span className="flex items-center gap-1 text-[#8faabb]">
                          <CalendarDays className="h-3 w-3 opacity-50" />
                          {formatDate(enrollment?.created_at ?? "")}
                        </span>
                      </div>
                      {enrollment?.is_active ? (
                        <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 text-xs font-medium">
                          نشط
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="text-xs font-medium bg-[#1b3d54] text-[#8faabb] border border-[#1d5479]/30"
                        >
                          غير نشط
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="hidden md:block rounded-xl border border-[#1d5479]/30 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-l from-[#1b3d54] to-[#133848] hover:bg-transparent">
                    <TableHead className="font-semibold text-[#e8f0f5]">
                      اسم الدورة
                    </TableHead>
                    <TableHead className="font-semibold text-[#e8f0f5]">
                      المستوى
                    </TableHead>
                    <TableHead className="font-semibold text-[#e8f0f5]">
                      تاريخ التسجيل
                    </TableHead>
                    <TableHead className="font-semibold text-[#e8f0f5]">
                      الحالة
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => {
                    const enrollment = Array.isArray(course.enrollments)
                      ? course.enrollments[0]
                      : course.enrollments;
                    return (
                      <TableRow
                        key={course.id}
                        className="group hover:bg-[#1b3d54]/60 transition-colors"
                      >
                        <TableCell className="font-medium text-[#e8f0f5]">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-gradient-to-bl from-[#ffa02f]/20 to-[#5ba3cc]/10 flex items-center justify-center flex-shrink-0">
                              <BookOpen className="h-3.5 w-3.5 text-[#5ba3cc]" />
                            </div>
                            <span className="truncate max-w-[140px] lg:max-w-[200px]">
                              {course.title}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {course.level ? (
                            <Badge
                              variant="outline"
                              className="text-xs border-[#5ba3cc]/30 text-[#5ba3cc]"
                            >
                              {course.level}
                            </Badge>
                          ) : (
                            <span className="text-[#8faabb] text-xs">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-[#8faabb] text-sm">
                          <div className="flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5 opacity-50" />
                            {formatDate(enrollment?.created_at ?? "")}
                          </div>
                        </TableCell>
                        <TableCell>
                          {enrollment?.is_active ? (
                            <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 text-xs font-medium">
                              نشط
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="text-xs font-medium bg-[#1b3d54] text-[#8faabb] border border-[#1d5479]/30"
                            >
                              غير نشط
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
