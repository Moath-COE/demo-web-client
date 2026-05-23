"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useDatabase } from "@/context/databaseContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Institution = {
  id: number;
  name: string;
};

type Major = {
  id: number;
  name: string;
};

const LEVELS = [
  { value: "1", label: "السنة الأولى" },
  { value: "2", label: "السنة الثانية" },
  { value: "3", label: "السنة الثالثة" },
  { value: "4", label: "السنة الرابعة" },
  { value: "5", label: "السنة الخامسة" },
];

export default function OnboardingPage() {
  const router = useRouter();

  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);

  const [selectedInstitution, setSelectedInstitution] = useState<string>("");
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  const [loadingInstitutions, setLoadingInstitutions] = useState(true);
  const [loadingMajors, setLoadingMajors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const supabase = useDatabase();

  useEffect(() => {
    async function fetchInstitutions() {
      const { data, error } = await supabase
        .from("institutions")
        .select("id, name")
        .order("name");

      if (error) {
        console.error("Error fetching institutions:", error);
        setError("فشل في تحميل الجامعات");
        setLoadingInstitutions(false);
        return;
      }

      setInstitutions(data ?? []);
      setLoadingInstitutions(false);
    }

    fetchInstitutions();
  }, [supabase]);

  const handleInstitutionChange = useCallback(
    async (value: string) => {
      setSelectedInstitution(value);
      if (!value) {
        setMajors([]);
        setSelectedMajor("");
        return;
      }
      setLoadingMajors(true);
      setSelectedMajor("");
      const { data, error } = await supabase
        .from("majors")
        .select("id, name")
        .eq("institution_id", Number(value))
        .order("name");

      if (error) {
        setError("فشل في تحميل التخصصات");
        setLoadingMajors(false);
        return;
      }

      setMajors(data ?? []);
      setLoadingMajors(false);
    },
    [supabase],
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!selectedInstitution || !selectedMajor || !selectedLevel) {
      setError("يرجى ملء جميع الحقول");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/complete-onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          institution_id: Number(selectedInstitution),
          major_id: Number(selectedMajor),
          level: selectedLevel,
        }),
      });
      console.log("API Response Status:", res);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || data.message || "حدث خطأ ما");
        setSubmitting(false);
        return;
      }

      await user?.reload();
      router.push("/my-library");
    } catch {
      setError("حدث خطأ في الاتصال");
      setSubmitting(false);
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 my-auto pt-8">
      <UserButton />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>أكمل ملفك الشخصي</CardTitle>
          <CardDescription>
            أخبرنا عن جامعتك وتخصصك لمساعدتك في العثور على المحتوى المناسب
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="institution">الجامعة</Label>
              <Select
                value={selectedInstitution}
                onValueChange={handleInstitutionChange}
                disabled={loadingInstitutions}
              >
                <SelectTrigger id="institution" className="w-full">
                  <SelectValue
                    placeholder={
                      loadingInstitutions ? "جاري التحميل..." : "اختر الجامعة"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {institutions.map((inst) => (
                    <SelectItem key={inst.id} value={String(inst.id)}>
                      {inst.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="major">التخصص</Label>
              <Select
                value={selectedMajor}
                onValueChange={setSelectedMajor}
                disabled={!selectedInstitution || loadingMajors}
              >
                <SelectTrigger id="major" className="w-full">
                  <SelectValue
                    placeholder={
                      loadingMajors
                        ? "جاري التحميل..."
                        : selectedInstitution
                          ? "اختر التخصص"
                          : "اختر الجامعة أولاً"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {majors.map((major) => (
                    <SelectItem key={major.id} value={String(major.id)}>
                      {major.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="level">المستوى</Label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger id="level" className="w-full">
                  <SelectValue placeholder="اختر المستوى" />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((lvl) => (
                    <SelectItem key={lvl.value} value={lvl.value}>
                      {lvl.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-destructive text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full"
              disabled={
                submitting ||
                !selectedInstitution ||
                !selectedMajor ||
                !selectedLevel
              }
            >
              {submitting && <Loader2 className="animate-spin" />}
              {submitting ? "جاري الحفظ..." : "متابعة"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
