"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  DEFAULT_EXPERIENCE,
  EXPERIENCE_OPTIONS,
  getExperience,
  setExperience,
  type ExperienceMode,
} from "@/lib/experience";
import { SettingsTour } from "@/components/tours/settings-tour";

const EXPERIENCE_EVENT = "sanad-experience-change";

function subscribe(callback: () => void) {
  window.addEventListener(EXPERIENCE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EXPERIENCE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export default function SettingsPage() {
  const value = React.useSyncExternalStore(
    subscribe,
    () => getExperience() ?? DEFAULT_EXPERIENCE,
    () => DEFAULT_EXPERIENCE,
  );
  const [saved, setSaved] = React.useState(false);

  const handleSelect = (next: ExperienceMode) => {
    setExperience(next);
    window.dispatchEvent(new Event(EXPERIENCE_EVENT));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-5 sm:p-6">
      <header className="flex items-center gap-2">
        <SidebarTrigger data-tour-id="sidebar-trigger" />
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold leading-tight sm:text-2xl">
            الإعدادات
          </h1>
          <p className="text-sm text-muted-foreground">خصّص طريقة شرح سند لك</p>
        </div>
      </header>

      <Card className="shadow-none">
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold text-foreground">
              كيف تريد تجربة سند؟
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              سيتم تعديل الشرح والخطة بناءً على اختيارك.
            </p>
          </div>

          <div data-tour-id="experience-options" className="flex flex-col gap-3 sm:flex-row">
            {EXPERIENCE_OPTIONS.map((opt) => {
              const active = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  aria-pressed={active}
                  className={cn(
                    "flex flex-1 items-start gap-3 rounded-xl border p-4 text-start transition-all",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                    active
                      ? "border-accent bg-accent/[0.05] ring-1 ring-accent/30"
                      : "border-border/70 bg-card hover:border-accent/40",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                      active
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-muted-foreground/40",
                    )}
                  >
                    {active && <Check className="size-3.5" />}
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
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

          <p
            className={cn(
              "h-5 text-sm font-medium text-accent transition-opacity",
              saved ? "opacity-100" : "opacity-0",
            )}
            aria-live="polite"
          >
            تم حفظ اختيارك ✓
          </p>
        </CardContent>
      </Card>

      <SettingsTour />
    </div>
  );
}
