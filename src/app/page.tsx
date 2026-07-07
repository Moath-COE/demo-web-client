import type { Metadata } from "next";
import Link from "next/link";
import { AudioLines, FileText, Compass } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LandingCta } from "@/components/landing/landing-cta";

export const metadata: Metadata = {
  title: "سند | مدرس خصوصي بالذكاء الاصطناعي",
  description:
    "مدرّس خصوصي ذكي يرافقك في كل جلسة دراسية: يشرح لك بطريقة تفهمها، يجاوب على أسئلتك، ويرشدك خطوة بخطوة — بالعربية.",
};

const features = [
  {
    icon: AudioLines,
    title: "مدرّس صوتي ذكي",
    desc: "تحدّث معه طبيعي، يشرح لك بصوته ويفهم أسئلتك لحظة بلحظة.",
  },
  {
    icon: FileText,
    title: "ادرس ملفاتك مباشرة",
    desc: "افتح ملفات مقرّرك ومحتواك، وادرسها داخل مساحة العمل فورًا.",
  },
  {
    icon: Compass,
    title: "إرشاد خطوة بخطوة",
    desc: "يعرف خطوتك التالية ويرشدك إليها، عشان ما تضيع وسط المحتوى.",
  },
];

export default function Home() {
  return (
    <main dir="rtl" className="bg-background text-foreground">
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="landing-orb absolute top-[-12%] right-[10%] h-[480px] w-[480px] rounded-full bg-coral/[0.07] blur-[120px] animate-orb-float" />
          <div className="landing-orb absolute bottom-[-18%] left-[12%] h-[440px] w-[440px] rounded-full bg-indigo/[0.09] blur-[110px] animate-orb-float-slow" />
        </div>

        <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="سند — الصفحة الرئيسية"
          >
            <Logo className="h-9 w-auto" priority />
          </Link>
          <ThemeToggle />
        </header>

        <section className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-10 text-center sm:pb-28 sm:pt-20">
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 flex w-full flex-col items-center">
            <h1 className="text-balance text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.25] tracking-normal text-foreground">
              مدرّسك الخصوصي بالذكاء الاصطناعي
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-foreground/70 sm:text-xl">
              يشرح لك بطريقة تفهمها، يجاوب على أسئلتك، ويرشدك خطوة بخطوة — كأنه
              قاعد جنبك في كل جلسة دراسية.
            </p>

            <LandingCta />
          </div>
        </section>
      </div>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <h2 className="text-center text-2xl font-bold tracking-normal text-foreground sm:text-3xl">
            وش يقدر يسوّيه لك سند؟
          </h2>
          <div className="mt-10 grid gap-10 sm:mt-14 sm:grid-cols-3 sm:gap-12">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col items-center text-center"
              >
                <span className="flex size-12 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <f.icon className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-normal text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 max-w-xs text-[0.975rem] leading-relaxed text-foreground/65">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="flex flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-foreground/60 sm:flex-row sm:px-8 lg:px-12">
        <span>التقنية والذكاء الاصطناعي في التعليم والتدريب © 2026</span>
        <Link
          href="/terms-of-service"
          className="rounded-sm transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          الشروط والأحكام
        </Link>
      </footer>
    </main>
  );
}
