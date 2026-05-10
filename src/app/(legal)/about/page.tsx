import Link from "next/link";
import { 
  Mic, 
  BookOpen, 
  Users, 
  Brain, 
  Zap, 
  MessageSquare, 
  Navigation, 
  Highlighter, 
  Clock,
  Languages,
  DollarSign,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Bot,
  PlayCircle
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-background" dir="rtl">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 max-w-6xl relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>مساعدك التعليمي الذكي</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              سند - الذكاء الاصطناعي
            </h1>
            <p className="text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed mb-8">
              منصة تعليمية متطورة تجمع بين المواد الدراسية والمساعد الذكي الناطق لتوفير تجربة تعلم تفاعلية وشخصية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/sign-up">
                <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
                  ابدأ الآن مجاناً
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button className="bg-card text-foreground border border-border px-8 py-4 rounded-lg font-semibold hover:bg-card/80 transition-all flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" />
                شاهد العرض التوضيحي
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What is Sanad Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-foreground">ما هو سند؟</h2>
            <p className="text-lg text-foreground/90 leading-relaxed mb-6">
              سند هو تطبيق تعليمي ذكي مدعوم بالذكاء الاصطناعي يساعد الطلاب على فهم موادهم الدراسية بطريقة تفاعلية وفعالة.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed mb-8">
              يربط سند بين المواد الدراسية التقليدية والتعليم الشخصي المتخصص من خلال دمج مساعد ذكي تفاعلي يتحدث في بيئة الدراسة مباشرةً.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-lg text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>تعلم مخصص لكل طالب</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-lg text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>تفاعل صوتي طبيعي</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-lg text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>تتبع التقدم الأكاديمي</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 border border-border">
              <div className="space-y-4">
                <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground">سند</span>
                  </div>
                  <p className="text-sm text-foreground/90">
                    هل تود أن أشرح لك هذا الفصل بأسلوب يعتمد على التشبيهات والقواعد الأساسية؟
                  </p>
                </div>
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm text-primary">
                    نعم، يرجى شرح المفهوم الأساسي أولاً ثم أعطني مثالاً واقعياً
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">كيف يعمل سند؟</h2>
            <p className="text-lg text-foreground/90 max-w-2xl mx-auto">
              أربع خطوات بسيطة لتحويل تجربتك الدراسية
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">التسجيل والدخول</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                أنشئ حساباً شخصياً وادخل إلى مساحتك التعليمية المخصصة
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">المكتبة الدراسية</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                تصفح المواد الدراسية وأضف مقرراتك من القائمة المدعومة
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">هيكل المقرر</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                اكتشف المحتوى المنظم في فصول مع وصف شامل لكل موضوع
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">مساحة الدراسة</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                ادخل مساحة الدراسة التفاعلية مع سند لتبدأ التعلم
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">قدرات سند الذكية</h2>
            <p className="text-lg text-foreground/90 max-w-2xl mx-auto">
              مساعد ذكي يعرفك ويفهم احتياجاتك التعليمية
            </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">السياق الأكاديمي</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>فهم عميق للمقررات الدراسية ومحتواها</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>إتقان المواد مع شرح الاختبارات السابقة</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>الوعي بالمواعيد النهائية والاختبارات</span>
              </li>
            </ul>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">توصيف الطالب</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>تكيف أسلوب الشرح مع تفضيلاتك</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>فهم مستواك الحالي وأهدافك</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>تتبع محادثاتك السابقة وتقدمك</span>
              </li>
            </ul>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Mic className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">التفاعل الصوتي</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>شرح واضح وجذاب بصوت إنساني</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>ردود صوتية فورية على أسئلتك</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>محادثة طبيعية دون نصوص مكتوبة</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">ميزات مساحة الدراسة</h2>
            <p className="text-lg text-foreground/90 max-w-2xl mx-auto">
              أدوات متقدمة لتعزيز تجربة التعلم والفهم
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
              <Navigation className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">عارض الشرائح</h3>
              <p className="text-foreground/80 text-sm">
                تصفح الشرائح الدراسية بسهولة مع التنقل الأفقي بين الصفحات
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
              <Highlighter className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">أدوات التلخيص</h3>
              <p className="text-foreground/80 text-sm">
                أدوات متقدمة لتمييز النصوص والرسم على الشرائح
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
              <MessageSquare className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">التفاعل الصوتي</h3>
              <p className="text-foreground/80 text-sm">
                تواصل مع سند صوتياً للحصول على شرح فوري
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
              <Brain className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">التحكم الذكي</h3>
              <p className="text-foreground/80 text-sm">
                سند يتنقل تلقائياً بين الشرائح حسب الشرح
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">الإرشاد البصري</h3>
              <p className="text-foreground/80 text-sm">
                سند يُبرز العناصر المهمة أثناء الشرح لمساعدتك على التركيز
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
              <Clock className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">التوفر المستمر</h3>
              <p className="text-foreground/80 text-sm">
                تعلم في أي وقت ومكان مع محتوى متاح على مدار الساعة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantages Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">لماذا سند؟</h2>
            <p className="text-lg text-foreground/90 max-w-2xl mx-auto">
              مميزات تجعل سند الخيار الأفضل للطلاب
            </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-foreground">واجهة صوتية أولاً</h3>
              <p className="text-foreground/80 text-sm">
                محادثة طبيعية بدلاً من الدردشة النصية أو مشاهدة الفيديو السلبي
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-foreground">إجراءات ذكية</h3>
              <p className="text-foreground/80 text-sm">
                سند يتفاعل بشكل استباطي ويُبرز المحتوى أثناء الشرح
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Languages className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-foreground">دعم متعدد اللغات</h3>
              <p className="text-foreground/80 text-sm">
                دعم أصلي للغة العربية واللغات الإقليمية الأخرى
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-foreground">استجابة سريعة</h3>
              <p className="text-foreground/80 text-sm">
                استجابة صوتية في أقل من 800 مللي ثانية لمحادثة طبيعية
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-foreground">أسعار معقولة</h3>
              <p className="text-foreground/80 text-sm">
                تكلفة أقل بكثير من خدمات التدريس التقليدية
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-foreground">سياق أكاديمي</h3>
              <p className="text-foreground/80 text-sm">
                تكامل مع مناهج الجامعات الحقيقية والمواد الدراسية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-b from-primary/10 to-muted/30 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">فوائد استخدام سند</h2>
            <p className="text-lg text-foreground/90 max-w-2xl mx-auto">
              استثمر في مستقبلك التعليمي اليوم
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">تجربة تعلم مخصصة</h3>
              </div>
              <p className="text-foreground/80">
                سند يفهم أسلوب تعلمك الفريد ويتكيف معه، مما يضمن حصولك على تجربة تعليمية تناسب احتياجاتك تماماً
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">تعلم في أي وقت</h3>
              </div>
              <p className="text-foreground/80">
                توفر على مدار الساعة طوال أيام الأسبوع، مما يمكنك من الدراسة بالسرعة والوقت الذي يناسبك
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">تحسن الأداء الأكاديمي</h3>
              </div>
              <p className="text-foreground/80">
                احصل على شرح عميق وفعال يفهمك تماماً، مما يؤدي إلى تحسن واضح في درجاتك وفهمك للمواد
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">بديل اقتصادي</h3>
              </div>
              <p className="text-foreground/80">
                استفد من معلم خاص ذكي بتكلفة أقل بكثير من الدروس الخصوصية التقليدية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold mb-2 text-primary">10K+</div>
            <div className="text-foreground/90 font-medium">طالب نشط</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2 text-primary">500+</div>
            <div className="text-foreground/90 font-medium">فصل تفاعلي</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2 text-primary">50+</div>
            <div className="text-foreground/90 font-medium">مادة دراسية</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2 text-primary">95%</div>
            <div className="text-foreground/90 font-medium">نسبة الرضا</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4 text-primary-foreground">
            ابدأ رحلتك التعليمية مع سند
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg leading-relaxed">
            انضم إلى آلاف الطلاب الذين يحسّنون أداءهم الأكاديمي مع سند
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <button className="bg-background text-primary px-8 py-4 rounded-lg font-semibold hover:bg-background/90 transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                أنشئ حساباً مجانياً
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <button className="bg-primary/20 text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/30 transition-all flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" />
              تواصل معنا
            </button>
          </div>
          <p className="text-primary-foreground/60 mt-6 text-sm">
            لا تحتاج إلى بطاقة ائتمان • ابدأ مجاناً اليوم
          </p>
        </div>
      </section>
    </div>
  );
}
