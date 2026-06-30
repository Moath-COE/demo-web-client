import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg dark:bg-[#0e293c]/80">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8 mx-auto">
        <div className="flex items-center gap-4 flex-1 justify-start">
          <Button className="bg-gradient-to-r from-[#1d5479] to-[#ffa02f] hover:from-[#0e293c] hover:to-[#ff8c00] text-white">
            <Link href="/my-library">مكتبتي</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <Link href={"/"} className="flex items-center gap-2">
            <span className="text-xl font-bold bg-linear-to-r from-white to-[#ffa02f] bg-clip-text text-transparent">
              Chapter-14
            </span>
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-[#1d5479] to-[#0e293c] flex items-center justify-center">
              <Image
                width={32}
                height={32}
                src="/static/logo.png"
                alt="Company Logo"
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
