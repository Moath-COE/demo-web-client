import { Metadata } from "next";
import {
  Database,
  Eye,
  Lock,
  Shield,
  FileText,
  Clock,
  AlertTriangle,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية وحماية البيانات الشخصية لمنصة سند التعليمية",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background" dir="rtl">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="privacy-grid"
                x="0"
                y="0"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.4"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                />
                <line
                  x1="24"
                  y1="0"
                  x2="24"
                  y2="48"
                  stroke="currentColor"
                  strokeWidth="0.15"
                />
                <line
                  x1="0"
                  y1="24"
                  x2="48"
                  y2="24"
                  stroke="currentColor"
                  strokeWidth="0.15"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#privacy-grid)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 py-16 max-w-4xl relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Lock className="w-4 h-4" />
              <span>وفقاً لنظام حماية البيانات الشخصية</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              سياسة الخصوصية
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed mb-4">
              نوضح لك أدناه أنواع البيانات التي نجمعها وكيفية جمعها واستخدامها
            </p>
            <p className="text-sm text-foreground/50">
              آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="space-y-1">
          <SectionWrapper
            number={1}
            title="البيانات التي نجمعها"
            icon={Database}
          >
            <p className="leading-relaxed mb-6 text-foreground/80">
              نجمع الفئات التالية من البيانات الشخصية عند استخدامك للمنصة:
            </p>
            <div className="space-y-3">
              <DataCategory
                title="بيانات الحساب"
                items={[
                  "الاسم الكامل",
                  "البريد الإلكتروني",
                  "كلمة المرور (مشفّرة)",
                  "بيانات تسجيل الدخول عبر Google أو Apple",
                ]}
                required
              />
              <DataCategory
                title="البيانات الأكاديمية"
                items={[
                  "الجامعة أو المؤسسة التعليمية",
                  "التخصص الأكاديمي",
                  "المستوى الدراسي (السنة ١ - ٥)",
                ]}
                required
              />
              <DataCategory
                title="بيانات المقررات"
                items={[
                  "المقررات المسجّل فيها وتاريخ التسجيل",
                  "حالة التسجيل (نشط / غير نشط)",
                ]}
                required
              />
              <DataCategory
                title="بيانات جلسات المساعد الذكي"
                items={[
                  "المقرر والفصل المرتبط بالجلسة",
                  "مدة الجلسة وتاريخها",
                  "لغة الجلسة (العربية / الإنجليزية)",
                  "التفاعلات الصوتية والنصية",
                ]}
                required
              />
              <DataCategory
                title="بيانات الاستخدام"
                items={[
                  "الدقائق المستخدمة وعدد الجلسات يومياً",
                  "شريحة الحصة المخصصة",
                ]}
                required
              />
              <DataCategory
                title="التقييمات والملاحظات"
                items={[
                  "تقييم جودة الشرح والصوت والفهم (١-٥ نجوم)",
                  "ملاحظات نصية حرة (اختيارية)",
                ]}
                required={false}
              />
              <DataCategory
                title="البيانات التقنية"
                items={[
                  "عنوان IP",
                  "نوع المتصفح والجهاز",
                  "الصفحات التي تزورها",
                ]}
                required
              />
            </div>
          </SectionWrapper>

          <SectionWrapper number={2} title="كيفية جمع البيانات" icon={Eye}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  method: "الإدخال المباشر",
                  desc: "عند تسجيل حساب جديد أو إكمال التأهيل أو تقديم ملاحظات.",
                  icon: "✎",
                },
                {
                  method: "الجمع التلقائي",
                  desc: "بيانات تقنية وتفاعلية تُجمع تلقائياً عند استخدامك للمنصة.",
                  icon: "⚙",
                },
                {
                  method: "ملفات تعريف الارتباط",
                  desc: "نستخدم ملفات تعريف الارتباط لتشغيل المنصة وتحليل الأداء.",
                  icon: "◉",
                },
              ].map(({ method, desc, icon }) => (
                <div
                  key={method}
                  className="bg-background/50 rounded-lg p-4 flex items-start gap-3"
                >
                  <span className="text-primary text-lg mt-0.5">{icon}</span>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">
                      {method}
                    </p>
                    <p className="text-foreground/60 text-xs leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper number={3} title="كيفية استخدام بياناتك" icon={Eye}>
            <ul className="space-y-3 mr-2">
              {[
                "إنشاء وإدارة حسابك وتقديم خدمات المنصة.",
                "تخصيص تجربة التعلم حسب جامعتك وتخصصك ومستواك.",
                "تشغيل جلسات المساعد الذكي وإدارة حصص الاستخدام.",
                "تحسين جودة الخدمة بناءً على التقييمات والملاحظات.",
                "ضمان أمان المنصة ومنع الاستخدام غير المشروع.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                  <span className="text-foreground/80 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </SectionWrapper>

          <SectionWrapper number={4} title="مشاركة البيانات" icon={Shield}>
            <div className="space-y-4 text-foreground/80">
              <p className="leading-relaxed">
                لا نبيع بياناتك الشخصية. نشاركها فقط مع مزودي خدمات ضروريين
                لتشغيل المنصة بموجب اتفاقيات حماية بيانات، ومع الجهات المختصة
                عند تلقي طلب نظامي ملزم.
              </p>
              <p className="leading-relaxed">
                يتم نقل بعض بياناتك خارج المملكة العربية السعودية (أمريكا
                وأوروبا) وفقاً للمادة ٢٩ من نظام حماية البيانات الشخصية، مع
                تطبيق التشفير والبنود التعاقدية النموذجية لضمان حمايتها.
              </p>
            </div>
          </SectionWrapper>

          <SectionWrapper number={5} title="الاحتفاظ بالبيانات" icon={Clock}>
            <div className="bg-background/50 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary/5 border-b border-border">
                    <th className="text-right py-3 px-4 font-semibold text-foreground">
                      فئة البيانات
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">
                      فترة الاحتفاظ
                    </th>
                  </tr>
                </thead>
                <tbody className="text-foreground/70">
                  {[
                    ["بيانات الحساب", "مدة نشاط الحساب + ٩٠ يوماً بعد الحذف"],
                    ["البيانات الأكاديمية والمقررات", "مدة نشاط الحساب"],
                    ["بيانات جلسات الذكاء الاصطناعي", "١٢ شهراً"],
                    ["بيانات الاستخدام اليومي", "٣٠ يوماً"],
                    ["التقييمات والملاحظات", "٢٤ شهراً"],
                    ["البيانات التقنية", "٣٠ - ٩٠ يوماً"],
                  ].map(([cat, period], i) => (
                    <tr
                      key={i}
                      className="border-b border-border/30 last:border-0"
                    >
                      <td className="py-2.5 px-4">{cat}</td>
                      <td className="py-2.5 px-4 text-xs font-medium">
                        {period}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionWrapper>

          <SectionWrapper number={6} title="أمن البيانات" icon={Lock}>
            <ul className="space-y-3 mr-2 text-foreground/80">
              {[
                "تشفير جميع البيانات أثناء النقل عبر بروتوكول TLS/HTTPS.",
                "تشفير كلمات المرور أحادياً بحيث لا يمكن الاطلاع عليها.",
                "تقييد الوصول إلى البيانات على أساس الحاجة للموظفين المصرح لهم فقط.",
                "التحقق من صلاحيات المستخدم قبل كل عملية وصول لبياناته.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </SectionWrapper>

          <SectionWrapper number={7} title="حقوقك" icon={Shield}>
            <p className="leading-relaxed mb-4 text-foreground/80">
              وفقاً لنظام حماية البيانات الشخصية، تتمتع بالحقوق التالية:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { right: "حق الوصول", desc: "طلب نسخة من بياناتك الشخصية." },
                { right: "حق التصحيح", desc: "تصحيح أي بيانات غير دقيقة." },
                { right: "حق الحذف", desc: "طلب حذف بياناتك الشخصية." },
                {
                  right: "حق تقييد المعالجة",
                  desc: "طلب وقف معالجة بياناتك مؤقتاً.",
                },
                { right: "حق سحب الموافقة", desc: "سحب موافقتك في أي وقت." },
                { right: "حق الاعتراض", desc: "الاعتراض على معالجة بياناتك." },
                {
                  right: "حق تقديم شكوى",
                  desc: "تقديم شكوى إلى سدايا خلال ٩٠ يوماً.",
                },
                { right: "حق التعويض", desc: "رفع دعوى أمام المحكمة المختصة." },
              ].map(({ right, desc }) => (
                <div key={right} className="bg-background/50 rounded-lg p-3">
                  <p className="font-semibold text-foreground text-sm mb-0.5">
                    {right}
                  </p>
                  <p className="text-foreground/60 text-xs">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-foreground/60 text-sm mt-4">
              لممارسة حقوقك، تواصل معنا عبر البيانات أدناه. سنرد خلال ٣٠ يوماً.
            </p>
          </SectionWrapper>

          <SectionWrapper
            number={8}
            title="القصر وبيانات الأطفال"
            icon={AlertTriangle}
          >
            <div className="space-y-3 text-foreground/80">
              <p className="leading-relaxed">
                لا يجوز لمن هم دون ١٨ عاماً استخدام المنصة إلا بموافقة ولي
                أمرهم. يتحمل ولي الأمر المسؤولية عن بيانات القاصر ويمكنه طلب
                حذفها في أي وقت.
              </p>
            </div>
          </SectionWrapper>

          <SectionWrapper number={9} title="خرق البيانات" icon={AlertTriangle}>
            <p className="leading-relaxed text-foreground/80">
              في حال حدوث خرق أمني يؤثر على بياناتك، نلتزم بإخطار سدايا خلال ٧٢
              ساعة وإخطارك شخصياً دون تأخير في حال كان الخرق عالي المخاطر.
            </p>
          </SectionWrapper>

          <SectionWrapper number={10} title="تحديث السياسة" icon={FileText}>
            <p className="leading-relaxed text-foreground/80">
              قد نحدّث هذه السياسة من وقت لآخر. سنُخطرك بالتغييرات الجوهرية عبر
              البريد الإلكتروني أو إشعار على المنصة قبل ٣٠ يوماً من سريانها.
            </p>
          </SectionWrapper>

          <div id="contact" className="scroll-mt-24">
            <SectionWrapper number={11} title="تواصل معنا" icon={Mail}>
              <div className="bg-background/50 rounded-xl p-5 space-y-3">
                {[
                  ["البريد الإلكتروني", "support@chapter14.net"],
                  ["الهاتف", "+966501473370"],
                  ["العنوان", "الخرج،حي النهضة،عبد الرحمن الناصر16439،"],
                  ["جهة الإشراف", "هيئة البيانات والذكاء الاصطناعي (سدايا)"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex gap-4 items-center border-b border-border/50 last:border-0 pb-2 last:pb-0"
                  >
                    <span className="font-semibold text-foreground text-sm min-w-[160px]">
                      {label}
                    </span>
                    <span className="text-foreground/70 text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 pb-16">
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Lock className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-card-foreground">
                التزامنا بحماية بياناتك
              </h3>
            </div>
            <p className="text-card-foreground/70 text-sm leading-relaxed max-w-2xl mx-auto">
              نلتزم في منصة سند بحماية بياناتك الشخصية وفقاً لنظام حماية
              البيانات الشخصية في المملكة العربية السعودية.
            </p>
            <div className="mt-3 flex items-center justify-center gap-2 text-card-foreground/50 text-xs">
              <span>سند | Chapter 14</span>
              <span>&#183;</span>
              <span>جميع الحقوق محفوظة</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionWrapper({
  number,
  title,
  icon: Icon,
  children,
}: {
  number: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-border py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          <span className="text-primary/50 ml-2 font-mono text-lg">
            {number}.
          </span>
          {title}
        </h2>
      </div>
      <div className="mr-12">{children}</div>
    </section>
  );
}

function DataCategory({
  title,
  items,
  required,
}: {
  title: string;
  items: string[];
  required: boolean;
}) {
  return (
    <div className="bg-background/50 rounded-lg p-4 border border-border/50">
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-foreground text-sm">{title}</span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${required ? "bg-primary/10 text-primary" : "bg-foreground/5 text-foreground/50"}`}
        >
          {required ? "إلزامي" : "اختياري"}
        </span>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="w-1 h-1 bg-foreground/30 rounded-full mt-2 flex-shrink-0" />
            <span className="text-foreground/70 text-xs">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
