import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Layers,
  Zap,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "سند | مدرس خصوصي بالذكاء الاصطناعي",
  description:
    "مساعد صوتي ذكي يرافقك في كل جلسة دراسية، يشرح لك بطريقة تفهمها، يجاوب على أسئلتك، ويتابع معك خطوة بخطوة",
};

const heroPills = [
  { icon: GraduationCap, label: "تجربة تعلّم شخصية" },
  { icon: Layers, label: "محتوى تفاعلي" },
  { icon: Zap, label: "سهل الاستخدام" },
];

export default function Home() {
  return (
    <main className="bg-background text-foreground" dir="rtl">
      <div className="relative overflow-hidden h-dvh flex flex-col min-h-125">
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div className="landing-orb absolute top-[-10%] right-[15%] w-[500px] h-[500px] bg-chart-1/[0.06] rounded-full blur-[120px] animate-orb-float" />
          <div className="landing-orb absolute bottom-[-5%] left-[20%] w-[450px] h-[450px] bg-chart-2/[0.08] rounded-full blur-[100px] animate-orb-float-slow" />
          <div className="landing-orb absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-chart-1/[0.03] rounded-full blur-[80px] animate-orb-float-delayed" />
        </div>

        <header className="w-full px-6 sm:px-8 lg:px-12 py-5 flex items-center justify-between relative z-10 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              asChild
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-colors duration-200 rounded-lg px-5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Link href="/my-library" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                مكتبة الدورات
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Chapter-14
            </span>
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              <Image
                src="/static/logo.png"
                alt="Chapter-14"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
        </header>

        <section className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 pb-6">
          <div className="w-full max-w-[92%] sm:max-w-2xl flex flex-col items-center gap-6 sm:gap-8">
            <div className="text-center space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-accent">سند</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                مدرسك الخصوصي الذكي
              </p>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                مدرس خصوصي ذكي يرافقك في كل جلسة دراسية، يشرح لك بطريقة
                تفهمها، يجاوب على أسئلتك، ويتابع معك خطوة بخطوة
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-lg">
              {heroPills.map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm bg-muted/15 text-foreground/80 px-3 py-1.5 rounded-full border border-border/20"
                >
                  <pill.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                  {pill.label}
                </span>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/my-library"
                  className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground hover:bg-muted/20 border border-border/30 hover:border-border/60 px-8 py-3 sm:px-10 sm:py-4 rounded-xl font-medium text-sm sm:text-base transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Sparkles className="w-4 h-4" />
                  مكتبتي
                </Link>
                <Link
                  href="/study"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  ابدأ مع سند الآن
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </div>
              <span className="text-xs text-muted-foreground/80">
                ايش تنتظر؟ ترى التجربة مجانية!
              </span>
            </div>
          </div>
        </section>

        <footer className="w-full px-6 py-4 flex items-center justify-between relative z-10 text-xs text-muted-foreground/70 shrink-0">
          <span>التقنية والذكاء الاصطناعي في التعليم والتدريب © 2026</span>
          <div className="flex items-center gap-4">
            <Link
              href="/terms-of-service"
              className="hover:text-muted-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              الشروط والأحكام
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
