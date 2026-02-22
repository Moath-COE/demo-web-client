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
import { Search } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

const UNIVERSITIES: FilterOption[] = [
  { value: "ksu", label: "جامعة الملك سعود" },
  { value: "kau", label: "جامعة الملك عبدالعزيز" },
  { value: "kfupm", label: "جامعة الملك فهد للبترول والمعادن" },
  { value: "qu", label: "جامعة القصيم" },
];

const MAJORS: FilterOption[] = [
  { value: "cs", label: "علوم الحاسب" },
  { value: "eng", label: "الهندسة" },
  { value: "med", label: "الطب" },
  { value: "bus", label: "إدارة الأعمال" },
];

const SUBJECTS: FilterOption[] = [
  { value: "math", label: "الرياضيات" },
  { value: "physics", label: "الفيزياء" },
  { value: "chem", label: "الكيمياء" },
  { value: "programming", label: "البرمجة" },
];

export default function Home() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    const trimmed = query.trim();
    router.push(
      trimmed ? `/enroll?q=${encodeURIComponent(trimmed)}` : "/enroll",
    );
  };

  const handleFilterSelect = (
    type: "university" | "major" | "subject",
    value: string,
  ) => {
    router.push(`/enroll?${type}=${encodeURIComponent(value)}`);
  };

  return (
    <main className="min-h-dvh overflow-y-auto [@media(min-height:600px)]:h-dvh [@media(min-height:600px)]:overflow-hidden flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 dark:from-background dark:via-background dark:to-primary/10 z-0" />
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] z-0"
        style={{
          backgroundImage: "url('/static/O.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

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

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:py-16 relative z-10">
        <div className="w-full max-w-4xl space-y-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-center leading-tight tracking-tight bg-gradient-to-r from-foreground to-chart-1 bg-clip-text text-transparent">
              مدرس خصوصي بالذكاء الاصطناعي
            </h1>
            <p className="text-lg sm:text-xl text-foreground max-w-2xl mx-auto leading-relaxed opacity-90">
              اكتشف عالماً جديداً من التعلم المخصص مع تقنيات الذكاء الاصطناعي
              المتطورة
            </p>
          </div>

          <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-chart-2 group-focus-within:text-chart-1 transition-colors duration-200" />
              <Input
                name="search"
                type="text"
                placeholder="ابحث عن دورة أو موضوع..."
                className="h-14 pr-12 pl-5 text-base bg-card border-border shadow-lg hover:shadow-xl focus:shadow-xl focus:border-chart-2 focus:ring-2 focus:ring-chart-2/30 transition-all duration-300 placeholder:text-muted-foreground"
              />
            </div>
          </form>

          <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              onValueChange={(value) => handleFilterSelect("university", value)}
            >
              <SelectTrigger className="h-14 bg-card border-2 border-border shadow-lg hover:shadow-xl hover:border-chart-2 focus:shadow-xl focus:border-chart-2 focus:ring-2 focus:ring-chart-2/30 transition-all duration-300 text-base">
                <SelectValue placeholder="الجامعة" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border shadow-xl">
                {UNIVERSITIES.map((uni) => (
                  <SelectItem
                    key={uni.value}
                    value={uni.value}
                    className="hover:bg-secondary cursor-pointer transition-colors duration-200 rounded-lg mx-1 text-foreground"
                  >
                    {uni.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => handleFilterSelect("major", value)}
            >
              <SelectTrigger className="h-14 bg-card border-2 border-border shadow-lg hover:shadow-xl hover:border-chart-2 focus:shadow-xl focus:border-chart-2 focus:ring-2 focus:ring-chart-2/30 transition-all duration-300 text-base">
                <SelectValue placeholder="التخصص" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border shadow-xl">
                {MAJORS.map((major) => (
                  <SelectItem
                    key={major.value}
                    value={major.value}
                    className="hover:bg-secondary cursor-pointer transition-colors duration-200 rounded-lg mx-1 text-foreground"
                  >
                    {major.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => handleFilterSelect("subject", value)}
            >
              <SelectTrigger className="h-14 bg-card border-2 border-border shadow-lg hover:shadow-xl hover:border-chart-2 focus:shadow-xl focus:border-chart-2 focus:ring-2 focus:ring-chart-2/30 transition-all duration-300 text-base">
                <SelectValue placeholder="المادة" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border shadow-xl">
                {SUBJECTS.map((subject) => (
                  <SelectItem
                    key={subject.value}
                    value={subject.value}
                    className="hover:bg-secondary cursor-pointer transition-colors duration-200 rounded-lg mx-1 text-foreground"
                  >
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </main>
  );
}
