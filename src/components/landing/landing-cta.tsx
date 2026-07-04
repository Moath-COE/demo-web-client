"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Zap, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  EXPERIENCE_OPTIONS,
  getExperience,
  setExperience,
  type ExperienceMode,
} from "@/lib/experience";

const ICONS: Record<ExperienceMode, React.ComponentType<{ className?: string }>> = {
  quick: Zap,
  relaxed: Coffee,
};

export function LandingCta() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleStart = () => {
    if (getExperience()) {
      router.push("/dashboard");
    } else {
      setOpen(true);
    }
  };

  const handleChoose = (value: ExperienceMode) => {
    setExperience(value);
    setOpen(false);
    router.push("/dashboard");
  };

  return (
    <>
      <div className="mt-9 flex flex-col items-center gap-3">
        <Button
          size="lg"
          onClick={handleStart}
          className="h-14 rounded-lg bg-coral px-7 text-base font-bold text-accent-foreground shadow-[0_10px_24px_-8px_rgb(255_107_92_/_0.45)] transition-all hover:bg-coral-deep hover:-translate-y-0.5 sm:px-9 sm:text-lg"
        >
          جرّب العرض التجريبي الآن
          <ArrowLeft className="size-5" />
        </Button>
        <span className="text-sm text-foreground/70">
          تجربة مجانية — ابدأ خلال ثوانٍ
        </span>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="border-accent/20 bg-gradient-to-b from-background to-background sm:max-w-md"
        >
          <DialogHeader className="items-center gap-2 text-center">
            <DialogTitle className="text-xl leading-relaxed">
              كيف تريد تجربة سند؟
            </DialogTitle>
            <DialogDescription className="text-balance leading-relaxed">
              سيتم تعديل الشرح والخطة بناءً على اختيارك.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 flex flex-col gap-3">
            {EXPERIENCE_OPTIONS.map((opt) => {
              const Icon = ICONS[opt.value];
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleChoose(opt.value)}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-xl border p-4 text-start transition-all",
                    "border-border/70 bg-card hover:border-accent/50 hover:bg-accent/[0.04]",
                    "focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                  )}
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/15 transition-colors group-hover:bg-accent/15">
                    <Icon className="size-5" />
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-base font-semibold text-foreground">
                      {opt.title}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {opt.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
