import { Metadata } from "next";
import {
  Shield,
  Users,
  CreditCard,
  Brain,
  Lock,
  Scale,
  AlertTriangle,
  FileText,
  Globe,
  Clock,
  ScrollText,
  Ban,
  MessageSquare,
  Database,
  Server,
  Gavel,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
  description:
    "شروط وأحكام استخدام منصة سند التعليمية المدعومة بالذكاء الاصطناعي",
};

const sections = [
  {
    id: "definitions",
    number: 1,
    title: "التعريفات",
    icon: FileText,
  },
  {
    id: "provider",
    number: 2,
    title: "هوية مقدم الخدمة",
    icon: Globe,
  },
  {
    id: "acceptance",
    number: 3,
    title: "قبول الشروط",
    icon: Shield,
  },
  {
    id: "services",
    number: 4,
    title: "وصف الخدمات",
    icon: Brain,
  },
  {
    id: "accounts",
    number: 5,
    title: "التسجيل والحسابات",
    icon: Users,
  },
  {
    id: "minors",
    number: 6,
    title: "الأعمار وموافقة ولي الأمر",
    icon: Users,
  },
  {
    id: "conduct",
    number: 7,
    title: "الاستخدام والسلوك المحظور",
    icon: Ban,
  },
  {
    id: "ip",
    number: 8,
    title: "المحتوى والملكية الفكرية",
    icon: ScrollText,
  },
  {
    id: "fees",
    number: 9,
    title: "الرسوم والاشتراكات والاسترداد",
    icon: CreditCard,
  },
  {
    id: "quota",
    number: 10,
    title: "نظام الحصص والاستخدام",
    icon: Clock,
  },
  {
    id: "ai-sessions",
    number: 11,
    title: "جلسات الذكاء الاصطناعي",
    icon: Brain,
  },
  {
    id: "privacy",
    number: 12,
    title: "الخصوصية وحماية البيانات",
    icon: Lock,
  },
  {
    id: "data-rights",
    number: 13,
    title: "حقوقك في البيانات الشخصية",
    icon: Database,
  },
  {
    id: "transfers",
    number: 14,
    title: "نقل البيانات الدولي",
    icon: Server,
  },
  {
    id: "disclaimer",
    number: 15,
    title: "إخلاء المسؤولية وحدودها",
    icon: AlertTriangle,
  },
  {
    id: "termination",
    number: 16,
    title: "إنهاء الخدمة",
    icon: Scale,
  },
  {
    id: "amendments",
    number: 17,
    title: "التعديلات على الشروط",
    icon: FileText,
  },
  {
    id: "governing-law",
    number: 18,
    title: "القانون الحاكم وتسوية المنازعات",
    icon: Gavel,
  },
  {
    id: "contact",
    number: 19,
    title: "تواصل معنا",
    icon: Mail,
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="bg-background" dir="rtl">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="geometric"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M30 0L60 30L30 60L0 30Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <path
                  d="M30 10L50 30L30 50L10 30Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geometric)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 py-16 max-w-4xl relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              <span>وثيقة قانونية ملزمة</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              الشروط والأحكام
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed mb-4">
              شروط وأحكام استخدام منصة سند التعليمية المدعومة بالذكاء الاصطناعي
            </p>
            <p className="text-sm text-foreground/50">
              آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <ScrollText className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-card-foreground">
              فهرس المحتوى
            </h2>
          </div>
          <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/5 transition-colors text-sm text-card-foreground/80 hover:text-primary group"
              >
                <span className="w-6 h-6 bg-primary/5 rounded flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary/10 transition-colors">
                  {section.number}
                </span>
                <span>{section.title}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-1">
          <div id="definitions" className="scroll-mt-24">
            <SectionWrapper number={1} title="التعريفات" icon={FileText}>
              <p className="leading-relaxed mb-4 text-foreground/80">
                يُطبق على هذه الشروط والأحكام التعريفات التالية، ما لم يقتضِ
                السياق خلاف ذلك:
              </p>
              <div className="space-y-3">
                {[
                  [
                    "المنصة",
                    "منصة سند التعليمية الإلكترونية المتاحة عبر الموقع الإلكتروني وتشمل جميع خدماتها ومحتواها ووظائفها.",
                  ],
                  [
                    "مقدم الخدمة",
                    "الكيان القانوني المالك والمشغّل للمنصة والمبين تفاصيله في البند الثاني من هذه الشروط.",
                  ],
                  [
                    "المستخدم",
                    "كل شخص يزور المنصة أو يسجّل فيها أو يستخدم أي من خدماتها.",
                  ],
                  [
                    "المحتوى",
                    "جميع المواد التعليمية والنصوص والصور والملفات والشرائح والموارد المتاحة على المنصة.",
                  ],
                  [
                    "الجلسة",
                    "كل جلسة تعليمية تفاعلية عبر المساعد الذكي الناطق ضمن بيئة الدراسة.",
                  ],
                  [
                    "المساعد الذكي",
                    "نظام الذكاء الاصطناعي التفاعلي الناطق المدمج في المنصة والذي يقدم شروحات تعليمية صوتية ونصية.",
                  ],
                  [
                    "البيانات الشخصية",
                    "أي معلومات تتعلق بمستخدم محدد أو قابل للتحديد، وفقاً لنظام حماية البيانات الشخصية السعودي.",
                  ],
                ].map(([term, definition]) => (
                  <div
                    key={term}
                    className="flex gap-3 items-start bg-background/50 rounded-lg p-3"
                  >
                    <span className="font-bold text-primary min-w-fit">
                      «{term}»
                    </span>
                    <span className="text-foreground/70 text-sm">
                      {definition}
                    </span>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </div>

          <div id="provider" className="scroll-mt-24">
            <SectionWrapper number={2} title="هوية مقدم الخدمة" icon={Globe}>
              <p className="leading-relaxed mb-4 text-foreground/80">
                وفقاً لما تقتضيه المادة الثالثة من نظام التجارة الإلكترونية
                الصادر بالمرسوم الملكي رقم م/١٢٦ وتاريخ ٢٥/٨/١٤٤٠هـ، يُفصح عن
                البيانات التالية:
              </p>
              <div className="bg-background/50 rounded-xl p-5 space-y-3">
                {[
                  [
                    "الاسم التجاري",
                    "شركة التقنية والذكاء الاصطناعي في التعليم والتدريب",
                  ],
                  ["الرقم الموحد", "7051848427"],
                  [
                    "العنوان",
                    "الخرج،حي النهضة،عبد الرحمن الناصر16439،المملكة العربية السعودية",
                  ],
                  ["البريد الإلكتروني", "support@chapter14.net"],
                  ["رقم الهاتف", "+966501473370"],
                  ["الرقم الضريبي", "314265129200003"],
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

          <div id="acceptance" className="scroll-mt-24">
            <SectionWrapper number={3} title="قبول الشروط" icon={Shield}>
              <p className="leading-relaxed text-foreground/80">
                باستخدامك لمنصة سند أو تسجيلك فيها أو تصفحك لأي من محتوياتها،
                فإنك تُقرّ بموافقتك على الالتزام بهذه الشروط والأحكام كاملةً،
                بما في ذلك سياسة الخصوصية المرفقة. تُعدّ هذه الموافقة إلكترونية
                صحيحة ومعتدة بها وفقاً لنظام المعاملات الإلكترونية الصادر
                بالمرسوم الملكي رقم م/١٨ وتاريخ ١٤/٤/١٤٢٨هـ وتعديلاته. في حال
                عدم موافقتك على أي بند من هذه الشروط، يُرجى عدم استخدام المنصة
                والامتناع عن التسجيل فيها.
              </p>
            </SectionWrapper>
          </div>

          <div id="services" className="scroll-mt-24">
            <SectionWrapper number={4} title="وصف الخدمات" icon={Brain}>
              <p className="leading-relaxed mb-4 text-foreground/80">
                تقدم منصة سند مجموعة من الخدمات التعليمية المدعومة بالذكاء
                الاصطناعي والموجهة لطلاب الجامعات في المملكة العربية السعودية،
                وتشمل:
              </p>
              <ul className="space-y-3 mr-2">
                {[
                  "تصفح المقررات الدراسية حسب الجامعة والتخصص والمستوى الدراسي والتسجيل فيها.",
                  "بيئة دراسة تفاعلية تشمل عرض الشرائح والملفات التعليمية بتنسيق PDF مع أدوات التنقل والتكبير.",
                  "مساعد ذكي ناطق يعمل بتقنية الذكاء الاصطناعي يقدم شروحات صوتية تفاعلية في الوقت الفعلي عبر الاتصال الصوتي المباشر.",
                  "قدرة المساعد الذكي على التنقل التلقائي بين الشرائح وتمييز المحتوى المهم وتتبع المواضيع وتقديم أسئلة تحقق الفهم.",
                  "إمكانية التفاعل مع المساعد الذكي عبر الإدخال الصوتي (الميكروفون) أو النصي (لوحة المفاتيح).",
                  "نظام حصص استخدام يومية لضمان جودة الخدمة وتوزيعها بعدل بين المستخدمين.",
                  "آلية لتقديم الملاحظات بعد كل جلسة تعليمية لتحسين جودة الخدمة.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-foreground/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </SectionWrapper>
          </div>

          <div id="accounts" className="scroll-mt-24">
            <SectionWrapper number={5} title="التسجيل والحسابات" icon={Users}>
              <p className="leading-relaxed mb-4 text-foreground/80">
                للاستفادة من بعض خدمات المنصة، يجب إنشاء حساب مستخدم. عند
                التسجيل، تلتزم بما يلي:
              </p>
              <ul className="space-y-3 mr-2 mb-4">
                {[
                  "تقديم معلومات صحيحة ودقيقة وكاملة عند التسجيل، بما في ذلك الاسم الكامل والبريد الإلكتروني.",
                  "اختيار الجامعة والتخصص والمستوى الدراسي بشكل صحيح خلال مرحلة التأهيل.",
                  "المحافظة على سرية بيانات الدخول وكلمة المرور وعدم مشاركتها مع أي شخص.",
                  "تحديث بياناتك فوراً عند حدوث أي تغيير فيها عبر إعدادات الحساب.",
                  "تحمّل المسؤولية الكاملة عن جميع الأنشطة التي تتم من خلال حسابك.",
                  "إخطارنا فوراً في حال الاشتباه بأي استخدام غير مصرح به لحسابك.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-foreground/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <InfoBox>
                يتم التسجيل وإدارة الحسابات عبر مزود خدمة التوثيق الخارجي
                (Clerk). يمكنك استخدام البريد الإلكتروني أو حساب Google أو حساب
                Apple للتسجيل والدخول.
              </InfoBox>
            </SectionWrapper>
          </div>

          <div id="minors" className="scroll-mt-24">
            <SectionWrapper
              number={6}
              title="الأعمار وموافقة ولي الأمر"
              icon={Users}
            >
              <p className="leading-relaxed mb-4 text-foreground/80">
                وفقاً لنظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم
                م/١٩ وتاريخ ٩/٢/١٤٤٣هـ والأنظمة ذات العلاقة:
              </p>
              <ul className="space-y-3 mr-2 mb-4">
                {[
                  "يجب أن لا يقل عمرك عن ثمانية عشر (١٨) عاماً هجرياً لتتمكن من التسجيل واستخدام المنصة بشكل مستقل.",
                  "في حال كنت دون سن الثامنة عشرة، يُشترط الحصول على موافقة ولي أمرك (الأب أو الوصي الشرعي) قبل التسجيل واستخدام المنصة.",
                  "يتحمل ولي الأمر المسؤولية القانونية الكاملة عن استخدام القاصر للمنصة وعن حماية بياناته الشخصية.",
                  "يحق لولي الأمر طلب حذف حساب القاصر وبياناته في أي وقت.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-foreground/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <WarningBox>
                نحتفظ بالحق في طلب إثبات السن أو إثبات الوصاية القانونية في أي
                وقت، وإلغاء أي حساب لا يستوفي شروط الأهلية.
              </WarningBox>
            </SectionWrapper>
          </div>

          <div id="conduct" className="scroll-mt-24">
            <SectionWrapper
              number={7}
              title="الاستخدام والسلوك المحظور"
              icon={Ban}
            >
              <p className="leading-relaxed mb-4 text-foreground/80">
                يلتزم المستخدم باستخدام المنصة للأغراض التعليمية المشروعة فقط،
                وفقاً لنظام مكافحة الجرائم المعلوماتية الصادر بالمرسوم الملكي
                رقم م/١٧ وتاريخ ١٨/٣/١٤٢٨هـ وتعديلاته والأنظمة ذات العلاقة.
                يُحظر على المستخدم القيام بأي من الأنشطة التالية:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {[
                  "الوصول غير المصرح به إلى أنظمة المنصة أو بياناتها أو خوادمها.",
                  "اعتراض أو التنصت على البيانات المتبادلة عبر المنصة.",
                  "انتهاك خصوصية المستخدمين الآخرين أو جمع بياناتهم دون إذن.",
                  "التشهير أو الإساءة عبر المنصة أو أثناء الجلسات التعليمية.",
                  "انتحال شخصية الآخرين أو استخدام هويات مزيفة.",
                  "إنشاء أو نشر برمجيات خبيثة أو ضارة.",
                  "محاولة تعطيل المنصة أو إعاقة عملها أو إضعاف أدائها.",
                  "نشر محتوى يخالف الشريعة الإسلامية أو النظام العام أو الآداب العامة في المملكة.",
                  "استخدام المنصة لأغراض تجارية غير مصرح بها.",
                  "نشر محتوى يحرّض على الإرهاب أو التطرف أو الكراهية.",
                  "الاحتيال الإلكتروني أو محاولة الحصول على مزايا غير مستحقة.",
                  "مشاركة بيانات الدخول أو بيع الحسابات أو نقل ملكيتها.",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 bg-destructive/5 rounded-lg p-2.5"
                  >
                    <span className="text-destructive text-xs mt-0.5">
                      &#10005;
                    </span>
                    <span className="text-foreground/70 text-xs">{item}</span>
                  </div>
                ))}
              </div>
              <WarningBox>
                نحتفظ بالحق في تعليق أو إلغاء أي حساب يخالف هذه القواعد دون
                إنذار مسبق، مع الحق في اتخاذ الإجراءات القانونية اللازمة
                والتعاون مع الجهات المختصة.
              </WarningBox>
            </SectionWrapper>
          </div>

          <div id="ip" className="scroll-mt-24">
            <SectionWrapper
              number={8}
              title="المحتوى والملكية الفكرية"
              icon={ScrollText}
            >
              <div className="space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  جميع المواد التعليمية والمحتوى المتاح على المنصة، بما في ذلك
                  النصوص والشرائح والملفات والصور والتصاميم والبرمجيات
                  والشعارات، هي ملكية فكرية محمية بموجب نظام حقوق المؤلف الصادر
                  بالمرسوم الملكي رقم م/٤١ وتاريخ ٣٠/٦/١٤٢٤هـ وتعديلاته
                  والاتفاقيات الدولية ذات الصلة، وتسري على ذلك حقوق المؤلف
                  الأدبية والمالية.
                </p>
                <p className="leading-relaxed">
                  يُسمح لك باستخدام المحتوى التعليمي لأغراضك الدراسية الشخصية
                  فقط. ويُحظر عليك نسخ أو توزيع أو إعادة نشر أو بيع أو تأجير أو
                  ترخيص أي جزء من المحتوى دون الحصول على إذن كتابي مسبق من مقدم
                  الخدمة.
                </p>
                <p className="leading-relaxed">
                  يحتفظ مقدمو المحتوى الأصليون بحقوقهم الأدبية في أعمالهم وفقاً
                  لنظام حقوق المؤلف، بما في ذلك حق نسبة العمل إليهم وحق سلامة
                  العمل، وهذه الحقوق غير قابلة للتنازل أو النقل.
                </p>
                <p className="leading-relaxed">
                  تمنح مقدم الخدمة ملاحظاتك وتقييماتك بعد الجلسات التعليمية
                  لتحسين جودة الخدمة، ويحق لمقدم الخدمة استخدام هذه الملاحظات
                  بصفة مجهولة المصدر لأغراض التطوير والتحسين.
                </p>
              </div>
            </SectionWrapper>
          </div>

          <div id="fees" className="scroll-mt-24">
            <SectionWrapper
              number={9}
              title="الرسوم والاشتراكات والاسترداد"
              icon={CreditCard}
            >
              <div className="space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  المنصة متاحة حالياً بشكل مجاني مع حدود استخدام يومية. وسيتم
                  إطلاق خطط اشتراك مدفوعة في المستقبل تقدم مزايا إضافية وحصص
                  استخدام أعلى.
                </p>

                <div className="bg-background/50 rounded-xl p-5 space-y-4">
                  <h4 className="font-semibold text-foreground text-sm">
                    عند تفعيل الخدمات المدفوعة، ستطبق الشروط التالية:
                  </h4>
                  <ul className="space-y-3 mr-2">
                    {[
                      "ستُعرض جميع الأسعار شاملة ضريبة القيمة المضافة (١٥٪) وفقاً لنظام ضريبة القيمة المضافة الصادر بالمرسوم الملكي رقم م/١١٣ وتاريخ ١٧/١٢/١٤٣٧هـ وتعديلاته.",
                      "ستكون طرق الدفع المتاحة مبينة بوضوح على صفحة الاشتراك قبل إتمام العملية.",
                      "يُجدد الاشتراك تلقائياً في نهاية الفترة ما لم يتم إلغاؤه قبل موعد التجديد بـ ٢٤ ساعة على الأقل.",
                      "يحق لك إلغاء اشتراكك في أي وقت من خلال إعدادات الحساب.",
                      "في حال عدم رضاك عن الخدمة، يمكنك طلب استرداد المبلغ خلال (١٤) يومًا من تاريخ الشراء، بشرط عدم تجاوز نسبة استخدام الخدمة المشتارة ٣٠٪ من حصتها.",
                      "يتم معالجة طلبات الاسترداد خلال (١٠) أيام عمل كحد أقصى ويُعاد المبلغ بنفس طريقة الدفع الأصلية.",
                      "لا يحق للمستخدم المطالبة باسترداد المبلغ بعد تجاوز فترة الـ (١٤) يوماً إلا في الحالات التي ينص عليها النظام.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionWrapper>
          </div>

          <div id="quota" className="scroll-mt-24">
            <SectionWrapper
              number={10}
              title="نظام الحصص والاستخدام"
              icon={Clock}
            >
              <div className="space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  تطبق المنصة نظام حصص استخدام لضمان عدالة التوزيع وجودة الخدمة
                  لجميع المستخدمين. يخضع استخدامك للمساعد الذكي للحدود التالية:
                </p>
                <ul className="space-y-3 mr-2">
                  {[
                    "حد أقصى لعدد الجلسات اليومية وفقاً لشريحة اشتراكك.",
                    "حد أقصى لعدد الدقائق اليومية المسموح باستخدامها.",
                    "حد أقصى لمدة الجلسة الواحدة.",
                    "يتم إعادة تعيين الحصص اليومية في بداية كل يوم تقويمي.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="leading-relaxed">
                  يمكنك الاطلاع على حصتك الحالية من خلال واجهة المنصة. نحتفظ
                  بالحق في تعديل حدود الحصص مع إشعار مسبق.
                </p>
              </div>
            </SectionWrapper>
          </div>

          <div id="ai-sessions" className="scroll-mt-24">
            <SectionWrapper
              number={11}
              title="جلسات الذكاء الاصطناعي"
              icon={Brain}
            >
              <div className="space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  عند استخدامك لجلسات المساعد الذكي، فإنك تقرّ وتوافق على ما
                  يلي:
                </p>
                <ul className="space-y-3 mr-2">
                  {[
                    "يتم تشغيل المساعد الذكي بواسطة نماذج ذكاء اصطناعي وقد لا تكون إجاباته دقيقة أو كاملة في جميع الأحوال.",
                    "المساعد الذكي أداة مساعدة تعليمية وليس بديلاً عن المحاضرات أو المصادر الأكاديمية المعتمدة.",
                    "يتم معالجة تفاعلاتك الصوتية والنصية خلال الجلسة عبر خدمات خارجية (بما في ذلك مزودي البنية التحتية الصوتية ونماذج الذكاء الاصطناعي) لتقديم الخدمة.",
                    "يتم تسجيل بيانات الجلسة (المدة، المقرر، الفصل، اللغة) لأغراض تحسين الخدمة والرصد.",
                    "يتم إرسال تقييمك وملاحظاتك بعد الجلسة إلى أنظمة مراقبة الجودة الداخلية.",
                    "لا تتحمل المنصة مسؤولية أي قرار أكاديمي تتخذه بناءً على معلومات أو شروحات يقدمها المساعد الذكي.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionWrapper>
          </div>

          <div id="privacy" className="scroll-mt-24">
            <SectionWrapper
              number={12}
              title="الخصوصية وحماية البيانات"
              icon={Lock}
            >
              <div className="space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  نلتزم بحماية بياناتك الشخصية وفقاً لنظام حماية البيانات
                  الشخصية الصادر بالمرسوم الملكي رقم م/١٩ وتاريخ ٩/٢/١٤٤٣هـ
                  وتنظيماته التنفيذية. تفاصيل كاملة حول سياسات جمع البيانات
                  ومعالجتها وتخزينها ومشاركتها متاحة في{" "}
                  <a
                    href="/privacy-policy"
                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    سياسة الخصوصية
                  </a>
                  .
                </p>
                <p className="leading-relaxed">
                  فيما يلي ملخص للبيانات التي نجمعها والأساس القانوني لمعالجتها:
                </p>
                <div className="bg-background/50 rounded-xl p-5">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-right py-2 font-semibold text-foreground">
                          نوع البيانات
                        </th>
                        <th className="text-right py-2 font-semibold text-foreground">
                          الغرض
                        </th>
                        <th className="text-right py-2 font-semibold text-foreground">
                          الأساس القانوني
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground/70">
                      <tr className="border-b border-border/50">
                        <td className="py-2">الاسم والبريد الإلكتروني</td>
                        <td className="py-2">إنشاء الحساب وإدارته</td>
                        <td className="py-2">تنفيذ العقد</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2">الجامعة والتخصص والمستوى</td>
                        <td className="py-2">تخصيص تجربة التعلم</td>
                        <td className="py-2">الموافقة</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2">بيانات الجلسات والاستخدام</td>
                        <td className="py-2">تحسين الخدمة</td>
                        <td className="py-2">المصلحة المشروعة</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2">التقييمات والملاحظات</td>
                        <td className="py-2">ضمان الجودة</td>
                        <td className="py-2">الموافقة</td>
                      </tr>
                      <tr>
                        <td className="py-2">البيانات التقنية (IP، المتصفح)</td>
                        <td className="py-2">الأمان والتحليلات</td>
                        <td className="py-2">المصلحة المشروعة</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </SectionWrapper>
          </div>

          <div id="data-rights" className="scroll-mt-24">
            <SectionWrapper
              number={13}
              title="حقوقك في البيانات الشخصية"
              icon={Database}
            >
              <p className="leading-relaxed mb-4 text-foreground/80">
                وفقاً لنظام حماية البيانات الشخصية، تتمتع بالحقوق التالية:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  [
                    "حق الوصول",
                    "طلب نسخة من بياناتك الشخصية بتنسيق قابل للقراءة.",
                  ],
                  ["حق التصحيح", "تصحيح أو تحديث أي بيانات شخصية غير دقيقة."],
                  [
                    "حق الحذف",
                    "طلب حذف بياناتك الشخصية في الحالات المنصوص عليها نظاماً.",
                  ],
                  [
                    "حق تقييد المعالجة",
                    "طلب وقف معالجة بياناتك في حالات معينة.",
                  ],
                  [
                    "حق سحب الموافقة",
                    "سحب موافقتك على معالجة البيانات في أي وقت.",
                  ],
                  [
                    "حق الاعتراض على التسويق",
                    "الاعتراض على استخدام بياناتك لأغراض تسويقية.",
                  ],
                  [
                    "حق تقديم شكوى",
                    "تقديم شكوى إلى هيئة البيانات والذكاء الاصطناعي (سدايا) خلال ٩٠ يوماً.",
                  ],
                  [
                    "حق التعويض",
                    "رفع دعوى أمام المحكمة المختصة للمطالبة بالتعويض عن الضرر.",
                  ],
                ].map(([title, desc]) => (
                  <div key={title} className="bg-background/50 rounded-lg p-3">
                    <p className="font-semibold text-foreground text-sm mb-1">
                      {title}
                    </p>
                    <p className="text-foreground/60 text-xs">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="leading-relaxed mt-4 text-foreground/60 text-sm">
                لممارسة أي من هذه الحقوق، يمكنك التواصل معنا عبر البيانات
                المبينة في قسم &quot;تواصل معنا&quot; أدناه. سيتم الرد على طلبك خلال (٣٠)
                يوماً كحد أقصى وفقاً لما ينص عليه النظام.
              </p>
            </SectionWrapper>
          </div>

          <div id="transfers" className="scroll-mt-24">
            <SectionWrapper
              number={14}
              title="نقل البيانات الدولي"
              icon={Server}
            >
              <div className="space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  قد يتم نقل بياناتك الشخصية أو معالجتها أو تخزينها خارج المملكة
                  العربية السعودية من خلال مزودي الخدمات الخارجيين المستخدمين في
                  تشغيل المنصة، وذلك وفقاً للمادة التاسعة والعشرين من نظام حماية
                  البيانات الشخصية. يشمل ذلك مزودي خدمات المصادقة والبنية
                  التحتية الصوتية ونماذج الذكاء الاصطناعي وتخزين المحتوى وقواعد
                  البيانات.
                </p>
                <p className="leading-relaxed">
                  نتخذ جميع الاحتياطات اللازمة لضمان مستوى حماية كافٍ لبياناتك
                  عند نقلها، بما في ذلك إبرام بنود تعاقدية نموذجية مع مزودي
                  الخدمات وفق المعايير المعتمدة من هيئة البيانات والذكاء
                  الاصطناعي (سدايا).
                </p>
              </div>
            </SectionWrapper>
          </div>

          <div id="disclaimer" className="scroll-mt-24">
            <SectionWrapper
              number={15}
              title="إخلاء المسؤولية وحدودها"
              icon={AlertTriangle}
            >
              <div className="space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  تُقدم المنصة والخدمات المتعلقة بها &quot;كما هي&quot; و&quot;حسب التوفر&quot; دون
                  أي ضمانات صريحة أو ضمنية. لا نضمن أن الخدمة ستكون خالية من
                  الأخطاء أو متاحة دون انقطاع أو أن نتائج المساعد الذكي ستكون
                  دقيقة في جميع الأحوال.
                </p>
                <p className="leading-relaxed">
                  في الحد الأقصى الذي يسمح به النظام، لا تكون المنصة مسؤولة عن
                  أي أضرار غير مباشرة أو عرضية أو تبعية تنشأ عن استخدامك للخدمة
                  أو عدم القدرة على استخدامها. لا تتجاوز مسؤوليتنا الكلية تجاهك
                  مبلغ الرسوم التي دفعتها لنا خلال الاثني عشر شهراً السابقة.
                </p>
                <InfoBox>
                  لا تُخلّ هذه البنود بأي من حقوقك الاستهلاكية غير القابلة
                  للتنازل بموجب نظام حماية المستهلك أو أي نظام آخر في المملكة
                  العربية السعودية.
                </InfoBox>
              </div>
            </SectionWrapper>
          </div>

          <div id="termination" className="scroll-mt-24">
            <SectionWrapper number={16} title="إنهاء الخدمة" icon={Scale}>
              <div className="space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  يحق لك إلغاء حسابك في أي وقت من خلال إعدادات الحساب أو
                  بالتواصل معنا. عند الإلغاء:
                </p>
                <ul className="space-y-3 mr-2">
                  {[
                    "ستفقد فوراً إمكانية الوصول إلى المقررات المسجلة وسجل الجلسات والبيانات المرتبطة بحسابك.",
                    "سيتم حذف بياناتك الشخصية خلال (٩٠) يوماً من تاريخ الإلغاء، ما لم يقتضِ النظام أو مصلحة مشروعة الاحتفاظ بها لفترة أطول.",
                    "لا يُعتبر حذف حسابك تنازلاً عن أي التزامات تعاقدية نشأت قبل الحذف.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="leading-relaxed">
                  نحتفظ بالحق في تعليق أو إنهاء حسابك فوراً ودون إنذار مسبق في
                  حال ارتكابك مخالفة لهذه الشروط، مع حفظ حقنا في اتخاذ الإجراءات
                  النظامية اللازمة.
                </p>
              </div>
            </SectionWrapper>
          </div>

          <div id="amendments" className="scroll-mt-24">
            <SectionWrapper
              number={17}
              title="التعديلات على الشروط"
              icon={FileText}
            >
              <div className="space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. في حال
                  إجراء تعديلات جوهرية:
                </p>
                <ul className="space-y-3 mr-2">
                  {[
                    "سيتم إخطارك عبر البريد الإلكتروني المسجل في حسابك أو عبر إشعار واضح على المنصة قبل (٣٠) يوماً على الأقل من تاريخ سريان التعديل.",
                    "استمرارك في استخدام المنصة بعد تاريخ سريان التعديل يُعدّ موافقة ضمنية على الشروط المعدلة.",
                    "يحق لك رفض الشروط المعدلة، وفي هذه الحالة يجب عليك التوقف عن استخدام المنصة وإلغاء حسابك.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionWrapper>
          </div>

          <div id="governing-law" className="scroll-mt-24">
            <SectionWrapper
              number={18}
              title="القانون الحاكم وتسوية المنازعات"
              icon={Gavel}
            >
              <div className="space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  تخضع هذه الشروط والأحكام وتُفسّر وفقاً لأنظمة المملكة العربية
                  السعودية والشريعة الإسلامية. في حال نشوء أي نزاع يتعلق بهذه
                  الشروط أو استخدام المنصة:
                </p>
                <ul className="space-y-3 mr-2">
                  {[
                    "يتعين عليك التواصل معنا أولاً عبر قنوات التواصل المبينة أدناه ومحاولة حل النزاع ودياً خلال (٣٠) يوماً.",
                    "في حال تعذر الحل الودي، يُحال النزاع إلى المحاكم المختصة في المملكة العربية السعودية.",
                    "اللغة العربية هي اللغة الحاكمة لتفسير هذه الشروط، وأي ترجمة تكون لأغراض المرجعية فقط.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="leading-relaxed">
                  لا يجمع هذا الاتفاق بينك وبين أي شخص آخر بشراكة أو وكالة أو
                  توظيف. إذا تبين أن أي بند من هذه الشروط غير صالح أو غير قابل
                  للتنفيذ بموجب النظام المعمول به، يُلغى ذلك البند فقط ويبقى
                  باقي الشروط ساري المفعول بأقصى حد يسمح به النظام.
                </p>
              </div>
            </SectionWrapper>
          </div>

          <div id="contact" className="scroll-mt-24">
            <SectionWrapper number={19} title="تواصل معنا" icon={Mail}>
              <div className="space-y-4 text-foreground/80">
                <p className="leading-relaxed">
                  لأي استفسار أو طلب أو شكوى تتعلق بهذه الشروط والأحكام أو سياسة
                  الخصوصية أو استخدام المنصة، يمكنك التواصل معنا عبر:
                </p>
                <div className="bg-background/50 rounded-xl p-5 space-y-3">
                  {[
                    ["البريد الإلكتروني", "support@chapter14.net"],
                    ["الهاتف", "+966501473370"],
                    ["العنوان", "الخرج،حي النهضة،عبد الرحمن الناصر16439،"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex gap-4 items-center border-b border-border/50 last:border-0 pb-2 last:pb-0"
                    >
                      <span className="font-semibold text-foreground text-sm min-w-[120px]">
                        {label}
                      </span>
                      <span className="text-sm">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-foreground/60 text-sm">
                  نلتزم بالرد على استفساراتك خلال (٥) أيام عمل كحد أقصى. ولتقديم
                  شكوى رسمية إلى هيئة البيانات والذكاء الاصطناعي (سدايا) بخصوص
                  حماية البيانات الشخصية، يمكنك زيارة الموقع الرسمي للهيئة.
                </p>
              </div>
            </SectionWrapper>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 pb-16">
          <div className="bg-card rounded-xl border border-border p-6 md:p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gavel className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-card-foreground">
                إقرار قانوني
              </h3>
            </div>
            <p className="text-card-foreground/70 text-sm leading-relaxed max-w-2xl mx-auto">
              باستخدامك لمنصة سند، فإنك تُقرّ بأنك قرأت هذه الشروط والأحكام
              وفهمتها ووافقت عليها بشكل كامل. النسخة العربية من هذه الشروط هي
              النسخة الحاكمة قانونياً. جميع الحقوق محفوظة لمقدم الخدمة وفقاً
              لأنظمة المملكة العربية السعودية.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-card-foreground/50 text-xs">
              <span>سند | Chapter 14</span>
              <span>&#183;</span>
              <span>جميع الحقوق محفوظة</span>
              <span>&#183;</span>
              <span>المملكة العربية السعودية</span>
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

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-primary/5 border border-primary/10 rounded-lg p-4">
      <MessageSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
      <p className="text-foreground/70 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-destructive/5 border border-destructive/10 rounded-lg p-4">
      <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
      <p className="text-foreground/70 text-sm leading-relaxed">{children}</p>
    </div>
  );
}
