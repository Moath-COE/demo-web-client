import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Layers,
  Zap,
  Image as ImageIcon,
  UserPlus,
  Search,
  Rocket,
  ArrowLeft,
} from "lucide-react";
import { TutorBenefitsCarousel } from "./_components/tutor-benefits-carousel";

export const metadata: Metadata = {
  title: "سند — مدرسك الخصوصي الذكي",
  description:
    "تعرّف على سند، مساعدك الصوتي الذكي في المذاكرة. يشرح لك، يجاوبك، ويرافقك خطوة بخطوة.",
};

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-muted/20 via-muted/10 to-transparent border-2 border-dashed border-border/30 flex flex-col items-center justify-center gap-3">
      <div className="w-14 h-14 rounded-xl bg-muted/15 flex items-center justify-center">
        <ImageIcon className="w-7 h-7 text-muted/50" />
      </div>
      <span className="text-sm text-muted/50 font-medium">{label}</span>
    </div>
  );
}

const features = [
  {
    icon: BookOpen,
    title: "تصفح موادك الدراسية",
    description: "كل المواد منظمة حسب جامعتك وتخصصك، جاهزة للمذاكرة",
  },
  {
    icon: GraduationCap,
    title: "تجربة تعلّم شخصية",
    description: "سند يتعلم أسلوبك وسرعتك ويقدّم لك تجربة فريدة",
  },
  {
    icon: Layers,
    title: "محتوى تفاعلي",
    description: "شرائح وملازم تقدر تتفاعل معها أثناء الشرح",
  },
  {
    icon: Zap,
    title: "سهل الاستخدام",
    description: "واجهة بسيطة وواضحة تخلّيك تركز على المذاكرة",
  },
];

const steps = [
  {
    number: "1",
    icon: UserPlus,
    title: "أنشئ حسابك",
    description: "سجّل في دقيقة واحدة وابدأ رحلتك",
  },
  {
    number: "2",
    icon: Search,
    title: "اختر مادتك الدراسية",
    description: "اختر جامعتك ومادتك من القائمة المتاحة",
  },
  {
    number: "3",
    icon: Rocket,
    title: "ابدأ التعلم مع سند",
    description: "سند يبدأ يشرح لك ويجاوب أسئلتك مباشرة",
  },
];

export default function SanadProductPage() {
  return (
    <div className="bg-background text-foreground" dir="rtl">
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-chart-1/[0.07] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-chart-2/[0.07] rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 max-w-4xl relative">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-sm font-medium bg-chart-1/15 text-chart-1 px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4" />
              قابل سند
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-5 leading-tight">
              سند
            </h1>
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-chart-2 to-chart-1 bg-clip-text text-transparent mb-6">
              مدرسك الخصوصي الذكي
            </p>
            <p className="text-lg text-foreground/60 leading-relaxed max-w-2xl mx-auto mb-10">
              مساعد صوتي ذكي يرافقك في كل جلسة دراسية، يشرح لك بطريقة تفهمها،
              يجاوب على أسئلتك، ويتابع معك خطوة بخطوة
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-chart-2 to-chart-1 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-chart-2/20"
            >
              جرّب سند الآن
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
          <div className="max-w-3xl mx-auto">
            <Image
              src="https://snd-zone.b-cdn.net/assets/product-page/image-1.png"
              alt="واجهة سند أثناء جلسة شرح تفاعلية"
              width={1200}
              height={900}
              className="rounded-2xl shadow-lg shadow-chart-2/20"
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-card/60 rounded-2xl border border-border/50 p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-chart-2 to-chart-1" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">ما هو سند؟</h2>
            <p className="text-foreground/70 leading-loose text-lg">
              سند هو مدرّس خصوصي ذكي. يكفيك أن تختار مادتك الدراسية، ويبدأ سند
              بشرح المحتوى لك صوتياً، والإجابة على أسئلتك فوراً، ومساعدتك على
              فهم كل جزء من المقرر بطريقتك الخاصة.
            </p>
            <p className="text-foreground/70 leading-loose text-lg mt-4">
              مع سند، كأنك تجلس مع مدرّس خصوصي يفهمك ويتكيّف معك — في أي وقت ومن
              أي مكان.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent" />
        <div className="container mx-auto px-4 max-w-4xl relative">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ايش يميز{" "}
              <span className="bg-gradient-to-r from-chart-2 to-chart-1 bg-clip-text text-transparent">
                سند
              </span>
            </h2>
            <p className="text-foreground/60 text-lg">
              المدرّس الذكي اللي يفهمك ويسمعك
            </p>
          </div>
          <TutorBenefitsCarousel />
        </div>
      </section>

      <section className="py-20 md:py-24" id="features">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            مميزات تدعم رحلتك الدراسية
          </h2>
          <p className="text-foreground/60 text-center mb-14 max-w-xl mx-auto">
            كل شيء مصمم لتذاكر براحة وتفهم أفضل
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card/40 rounded-xl border border-border/30 p-6 hover:border-primary/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-14 max-w-2xl mx-auto">
            <Image
              src="https://snd-zone.b-cdn.net/assets/product-page/image-3.png"
              alt="واجهة سند أثناء جلسة شرح تفاعلية"
              width={1200}
              height={900}
              className="rounded-2xl shadow-lg shadow-chart-2/20"
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 relative" id="how-to-use">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent" />
        <div className="container mx-auto px-4 max-w-4xl relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            كيف تبدأ مع سند؟
          </h2>
          <p className="text-foreground/60 text-center text-lg mb-16">
            ثلاث خطوات بسيطة وتكون جاهز
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-chart-2 to-chart-1 flex items-center justify-center mx-auto shadow-lg shadow-chart-2/20">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-chart-1 flex items-center justify-center text-xs font-bold text-chart-1">
                    {step.number}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-foreground/60 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-chart-2 to-chart-1" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
            <div className="relative text-center py-16 px-8 md:py-20 md:px-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ابدأ رحلتك التعليمية اليوم
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
                سند جاهز يشرح لك، يجاوبك، ويساعدك تنجح — جرّبه الآن
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-accent px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-colors shadow-xl"
              >
                جرّب سند الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
