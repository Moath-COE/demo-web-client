"use client";

import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import initializeSupabase from "@/lib/supabaseClient";

export default function Home() {
  const router = useRouter();
  const supabase = useMemo(() => initializeSupabase(undefined), []);

  const [institutions, setInstitutions] = useState<
    { id: number; name: string }[]
  >([]);
  const [majors, setMajors] = useState<{ id: number; name: string }[]>([]);

  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");

  useEffect(() => {
    const fetchInstitutions = async () => {
      const { data, error } = await supabase
        .from("institutions")
        .select("id, name")
        .order("name");
      if (!error && data) setInstitutions(data);
    };
    fetchInstitutions();
  }, [supabase]);

  useEffect(() => {
    const fetchMajors = async () => {
      const { data, error } = await supabase
        .from("majors")
        .select("id, name")
        .order("name");
      if (!error && data) setMajors(data);
    };
    fetchMajors();
  }, [supabase]);

  const handleInstitutionChange = (value: string) => {
    setSelectedInstitution(value);
    router.push(`/enroll?institution=${value}`);
  };

  const handleMajorChange = (value: string) => {
    setSelectedMajor(value);
    router.push(`/enroll?major=${value}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = (formData.get("search") as string)?.trim() || "";
    if (query) {
      router.push(`/enroll?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/enroll");
    }
  };

  return (
    <main className="min-h-dvh overflow-y-auto [@media(min-height:600px)]:h-dvh [@media(min-height:600px)]:overflow-hidden flex flex-col relative">
      <header className="w-full p-6 lg:p-8 flex items-center justify-between relative z-10 bg-background/70 dark:bg-background/70 backdrop-blur-sm border-b border-border">
        <div>
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="bg-gradient-to-r from-chart-2 to-chart-1 hover:from-chart-3 hover:to-chart-1 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                تسجيل الدخول
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/my-library">
              <Button className="bg-gradient-to-r from-chart-2 to-chart-1 hover:from-chart-3 hover:to-chart-1 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                مكتبة الدورات
              </Button>
            </Link>
          </SignedIn>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-chart-2 via-chart-2 to-chart-1 bg-clip-text text-transparent tracking-tight">
            Chapter-14
          </span>
          <Image
            src="/static/logo.png"
            alt="Company Logo"
            width={48}
            height={48}
            className="h-12 w-auto drop-shadow-md"
          />
        </div>
      </header>

      <section className="flex-1 flex flex-col gap-4 items-center justify-start relative z-10">
        <Image
          src="/static/logo.png"
          alt="Company Logo"
          width={100}
          height={100}
          className="rounded-2xl drop-shadow-md"
        />

        <div className="w-full max-w-3/4 space-y-10">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold text-center leading-tight tracking-tight bg-gradient-to-r from-foreground to-chart-1 bg-clip-text text-transparent text-nowrap">
              مدرس خصوصي بالذكاء الاصطناعي
            </h1>
            <p className="text-lg sm:text-xl text-foreground max-w-2xl mx-auto leading-relaxed opacity-90">
              اكتشف عالماً جديداً من التعلم المخصص مع تقنيات الذكاء الاصطناعي
              المتطورة
            </p>
          </div>

          <div className="w-full max-w-2xl mx-auto bg-card rounded-3xl border border-border/50 shadow-2xl p-8 space-y-6 border-2 border-ring">
            <h2 className="text-background text-2xl font-bold">
              ايش تنتظر ؟ 🤔
            </h2>
            <form onSubmit={handleSearch} className="w-full space-y-6">
              <div className="relative group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-chart-2 group-focus-within:text-chart-1 transition-colors duration-200" />
                <Input
                  name="search"
                  type="text"
                  placeholder="ابحث عن اسم مادة ..."
                  className="h-14 pr-12 pl-5 text-muted-foreground bg-background border-border/50 shadow-lg hover:shadow-xl focus:shadow-xl focus:border-chart-2 focus:ring-2 focus:ring-chart-2/30 transition-all duration-300 placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-muted-foreground px-2">أو</span>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              <div className="flex justify-center items-center gap-4">
                <Select
                  value={selectedInstitution}
                  onValueChange={handleInstitutionChange}
                >
                  <SelectTrigger className="flex-1 h-14 bg-background border-border/50 shadow-lg hover:shadow-xl hover:border-chart-2 focus:shadow-xl focus:border-chart-2 focus:ring-2 focus:ring-chart-2/30 transition-all duration-300 text-base">
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

                <Select
                  value={selectedMajor}
                  onValueChange={handleMajorChange}
                >
                  <SelectTrigger className="flex-1 h-14 bg-background border-border/50 shadow-lg hover:shadow-xl hover:border-chart-2 focus:shadow-xl focus:border-chart-2 focus:ring-2 focus:ring-chart-2/30 transition-all duration-300 text-base">
                    <SelectValue placeholder="اختر التخصص" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border shadow-xl">
                    {majors.map((major) => (
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
      </section>

      <Link
        href="/about"
        className="bg-primary fixed bottom-6 right-6 z-50 hover:from-chart-3 hover:to-chart-1 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-3 group hover:w-auto hover:px-5 hover:py-3 w-14 h-14 flex items-center justify-center"
      >
        <div className="flex items-start gap-3 overflow-hidden transition-all duration-300">
          <HelpCircle className="w-6 h-6 flex-shrink-0 " />
          <span className="hidden group-hover:block transition-opacity duration-300 whitespace-nowrap">
            ما هو سند؟
          </span>
        </div>
      </Link>
    </main>
  );
}
