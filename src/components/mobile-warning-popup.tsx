"use client";

import * as React from "react";
import Link from "next/link";
import { Monitor } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PHONE_BREAKPOINT = 640;

export function MobileWarningPopup() {
  const [isPhone, setIsPhone] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${PHONE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsPhone(window.innerWidth < PHONE_BREAKPOINT);
    mql.addEventListener("change", onChange);
    onChange();
    return () => mql.removeEventListener("change", onChange);
  }, []);

  if (isPhone === undefined || !isPhone) return null;

  return (
    <Dialog open onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="border-accent/20 bg-gradient-to-b from-background to-background  [&>div]:text-center"
      >
        <DialogHeader className="items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
            <Monitor className="size-9 text-accent" strokeWidth={1.5} />
          </div>
          <DialogTitle className="text-xl leading-relaxed">
            تجربة أفضل على شاشة أكبر
          </DialogTitle>
          <DialogDescription className="text-balance leading-relaxed">
            الموقع غير مُحسّن بعد للشاشات الصغيرة. للحصول على أفضل تجربة، يرجى
            استخدام الحاسوب أو جهاز لوحي.
          </DialogDescription>
        </DialogHeader>
        <Button asChild size="lg" className="mt-2 w-full">
          <Link href="/sanad">تعرف على سند</Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
