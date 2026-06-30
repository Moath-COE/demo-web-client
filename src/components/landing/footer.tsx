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
              وجهتك في رحلتك التعليمية في عصر الذكاء الاصطناعي
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">مراجع</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-[#ffa02f]"
                >
                  الشروط الاستخدام
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>التقنية والذكاء الاصطناعي في التعليم والتدريب © 2026</p>
        </div>
      </div>
    </footer>
  );
}
