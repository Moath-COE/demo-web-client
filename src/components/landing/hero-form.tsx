"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, Sparkles, BookOpen } from "lucide-react";
import { useState, useMemo } from "react";

interface HeroFormProps {
  institutions: { id: number; name: string }[];
  majors: { id: number; name: string; institution_id: number | null }[];
}

export default function HeroForm({ institutions, majors }: HeroFormProps) {
  const router = useRouter();

  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");

  const filteredMajors = useMemo(() => {
    if (!selectedInstitution) return majors;
    return majors.filter(
      (m) => m.institution_id === Number(selectedInstitution),
    );
  }, [majors, selectedInstitution]);

  const handleInstitutionChange = (value: string) => {
    setSelectedInstitution(value);
    setSelectedMajor("");
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
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] right-[15%] w-[500px] h-[500px] bg-chart-1/[0.06] rounded-full blur-[120px]"
          style={{ animation: "orb-float 8s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[-5%] left-[20%] w-[450px] h-[450px] bg-chart-2/[0.08] rounded-full blur-[100px]"
          style={{ animation: "orb-float-slow 12s ease-in-out infinite" }}
        />
        <div
          className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-chart-1/[0.03] rounded-full blur-[80px]"
          style={{ animation: "orb-float 10s ease-in-out infinite 2s" }}
        />
      </div>

      <header className="w-full px-6 sm:px-8 lg:px-12 py-5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-foreground/70 hover:text-foreground"
          >
            <Link
              href="/sanad"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">ما هو سند؟</span>
            </Link>
          </Button>
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                size="sm"
                className="bg-gradient-to-r from-chart-2 to-chart-1 hover:opacity-90 text-white shadow-md shadow-chart-2/20 transition-all duration-300 rounded-lg px-5"
              >
                تسجيل الدخول
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-chart-2 to-chart-1 hover:opacity-90 text-white shadow-md shadow-chart-2/20 transition-all duration-300 rounded-lg px-5"
            >
              <a href="/my-library" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                مكتبة الدورات
              </a>
            </Button>
          </SignedIn>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-chart-2 to-chart-1 bg-clip-text text-transparent tracking-tight">
            Chapter-14
          </span>
          <a href="/about" className="hover:opacity-80 transition-opacity">
            <img
              src="/static/logo.png"
              alt="Chapter-14"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </a>
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 pb-8">
        <div className="w-full max-w-[92%] sm:max-w-2xl space-y-8 sm:space-y-10">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-chart-2/20 to-chart-1/20 p-3 ring-1 ring-chart-2/20">
                <img
                  src="/static/logo.png"
                  alt="سند"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-chart-2 to-chart-1 bg-clip-text text-transparent">
                سند
              </span>
              <span className="text-foreground">
                : مدرس خصوصي بالذكاء الاصطناعي
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              ايش تنتظر؟ ابدا الحين وابحث عن موادك وخلي سند يساعدك في المذاكرة،
              الفهم، والمراجعة!
            </p>
          </div>

          <div className="w-full max-w-xl mx-auto rounded-2xl border border-border/30 bg-background/60 backdrop-blur-xl shadow-2xl shadow-black/20 p-5 sm:p-7 space-y-5">
            <form onSubmit={handleSearch} className="w-full space-y-4">
              <div className="relative group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-chart-1 transition-colors duration-200" />
                <Input
                  name="search"
                  type="text"
                  placeholder="ابحث عن اسم مادة ..."
                  className="h-12 sm:h-13 pr-12 pl-5 text-foreground bg-background/80 border-border/40 rounded-xl focus:border-chart-2/50 focus:ring-2 focus:ring-chart-2/20 transition-all duration-300 placeholder:text-muted-foreground/60"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border/40" />
                <span className="text-muted-foreground/60 text-xs font-medium px-2">
                  أو
                </span>
                <div className="flex-1 h-px bg-border/40" />
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                <Select
                  value={selectedInstitution}
                  onValueChange={handleInstitutionChange}
                >
                  <SelectTrigger className="flex-1 w-full h-12 bg-background/80 border-border/40 rounded-xl hover:border-chart-2/30 focus:ring-2 focus:ring-chart-2/20 transition-all duration-300 text-foreground">
                    <SelectValue placeholder="اختر الجامعة" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50 shadow-xl rounded-xl">
                    {institutions.map((inst) => (
                      <SelectItem
                        key={inst.id}
                        value={String(inst.id)}
                        className="hover:bg-secondary/60 cursor-pointer transition-colors duration-200 rounded-lg mx-1"
                      >
                        {inst.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedMajor} onValueChange={handleMajorChange}>
                  <SelectTrigger className="flex-1 w-full h-12 bg-background/80 border-border/40 rounded-xl hover:border-chart-2/30 focus:ring-2 focus:ring-chart-2/20 transition-all duration-300 text-foreground">
                    <SelectValue placeholder="اختر التخصص" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50 shadow-xl rounded-xl">
                    {filteredMajors.map((major) => (
                      <SelectItem
                        key={major.id}
                        value={String(major.id)}
                        className="hover:bg-secondary/60 cursor-pointer transition-colors duration-200 rounded-lg mx-1"
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

      <footer className="w-full px-6 py-4 flex items-center justify-between relative z-10 text-xs text-muted-foreground/50">
        <span>التقنية والذكاء الاصطناعي في التعليم والتدريب © 2026</span>
        <div className="flex items-center gap-4">
          <Link
            href="/privacy-policy"
            className="hover:text-muted-foreground transition-colors"
          >
            سياسة الخصوصية
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:text-muted-foreground transition-colors"
          >
            الشروط والأحكام
          </Link>
        </div>
      </footer>

      <a
        href="https://wa.me/966501473370"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-12 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 rounded-full px-4 py-3 group"
      >
        <MessageCircle className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-medium whitespace-nowrap">
          تواصل معنا
        </span>
      </a>
    </>
  );
}
