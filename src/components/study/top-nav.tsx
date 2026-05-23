"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function TopNav({ chapterTitle }: { chapterTitle: string | null }) {
  const displayText = chapterTitle || "عنوان الفصل";

  return (
    <nav className="mb-2 flex items-center justify-between w-full h-12 sm:h-16 px-3 sm:px-6 border-b border-border/60 bg-secondary backdrop-blur">
      <div className="md:flex justify-start items-center gap-2 hidden">
        <Image src="/static/logo.png" alt="Logo" width={32} height={32} />
        <h2 className="text-sm sm:text-xl font-bold ">سند</h2>
      </div>
      <div className="outline-1 outline-primary/60 rounded-sm flex items-center gap-1.5 sm:gap-2 min-w-0 py-1 px-4">
        <span className="border-b border-transparent group-hover:border-accent transition-all duration-200 truncate">
          {displayText}
        </span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <Button asChild size="sm" variant={"default"}>
          <Link href="/my-library">
            <span className="hidden sm:inline">المكتبة</span>
            <span className="sm:hidden">المكتبة</span>
          </Link>
        </Button>
      </div>
    </nav>
  );
}
