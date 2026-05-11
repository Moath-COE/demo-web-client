import type { Metadata } from "next";
import { BookOpen, Sparkles, Globe, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "من نحن",
  description: "تعرّف على سند - منصة تعليمية ذكية مدعومة بالذكاء الاصطناعي",
};

const values = [
  {
    icon: BookOpen,
    title: "التعلم الشخصي",
    description:
      "كل طالب يستحق تعليماً يتناسب مع أسلوبه ومستواه. سند يتكيّف معك ليقدّم لك تجربة فريدة.",
  },
  {
    icon: Sparkles,
    title: "تكنولوجيا في خدمة التعليم",
    description:
      "نستخدم الذكاء الاصطناعي كأداة لتحسين التجربة التعليمية، لا لاستبدالها.",
  },
  {
    icon: Globe,
    title: "سهولة الوصول",
    description:
      "تعليم جيد ومتاح في أي وقت ومكان، بتكلفة معقولة لكل طالب عربي.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground" dir="rtl">
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_60%)] opacity-[0.07]" />
        <div className="container mx-auto px-4 max-w-3xl relative text-center">
          <span className="inline-block text-sm font-medium text-primary/80 tracking-wide mb-4">
            من نحن
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            نساعد كل طالب على التعلّم
            <br />
            <span className="text-primary">بطريقته الخاصة</span>
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            سند منصة تعليمية ذكية تجمع بين المواد الدراسية ومساعدٍ صوتي مدعوم
            بالذكاء الاصطناعي، لتوفير تجربة تعلّم تفاعلية وشخصية لكل طالب.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-3xl pb-20">
        <div className="bg-card/60 rounded-2xl border border-border/50 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-4">هدفنا</h2>
          <p className="text-foreground/80 leading-loose">
            نسعى لجعل التعليم الجيد متاحاً لكل طالب عربي. نؤمن أن التكنولوجيا —
            وخاصة الذكاء الاصطناعي — تستطيع سدّ الفجوة بين ما يحتاجه الطالب وما
            تقدّمه البيئة التعليمية التقليدية. من خلال مساعد ذكي يفهم المقرر
            الدراسي ويتفاعل معك صوتياً، نقدّم تجربة تعلّم أقرب إلى جلسة مع مدرّس
            خصوصي.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-3xl pb-24">
        <h2 className="text-2xl font-bold mb-8 text-center">قيمنا</h2>
        <div className="grid gap-6">
          {values.map((item) => (
            <div
              key={item.title}
              className="flex gap-5 items-start bg-card/40 rounded-xl border border-border/40 p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed text-[15px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-3xl pb-24" id="contact">
        <h2 className="text-2xl font-bold mb-4">تواصل معنا</h2>
        <p className="text-foreground/70 mb-8 leading-relaxed">
          لأي استفسار أو اقتراح، نحن هنا لمساعدتك.
        </p>
        <div className="bg-card/60 rounded-2xl border border-border/50 p-6 space-y-4">
          {[
            {
              icon: Mail,
              label: "البريد الإلكتروني",
              value: "support@chapter14.net",
            },
            { icon: Phone, label: "الهاتف", value: "+966501473370" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 border-b border-border/40 last:border-0 pb-4 last:pb-0"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-xs text-primary">{item.label}</span>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
