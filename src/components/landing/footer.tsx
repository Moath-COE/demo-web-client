import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-[#f5f7fa] dark:bg-[#0e293c] w-full">
      <div className="container px-4 sm:px-8 py-12 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center">
                <Image
                  src="/static/logo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                />
              </div>
              <span className="text-xl font-bold">Chapter-14</span>
            </div>
            <p className="text-sm text-muted-foreground">
              منصة تعليمية مدعومة بالذكاء الاصطناعي للطالب العصري
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">سند</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/sanad" className="hover:text-[#ffa02f]">
                  ما هو سند؟
                </Link>
              </li>
              <li>
                <Link href="/sanad#features" className="hover:text-[#ffa02f]">
                  المميزات
                </Link>
              </li>
              <li>
                <Link href="/sanad#how-to-use" className="hover:text-[#ffa02f]">
                  كيف استخدمه؟
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">تعرف علينا</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-[#ffa02f]">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ffa02f]">
                  المدونة - قريبا
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ffa02f]">
                  الوظائف - قريبا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">مراجع</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy-policy" className="hover:text-[#ffa02f]">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-services"
                  className="hover:text-[#ffa02f]"
                >
                  الشروط الاستخدام
                </Link>
              </li>
              <li>
                <Link href="/about/#contact" className="hover:text-[#ffa02f]">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 منصة التعلم. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
