"use client";

import { useTour } from "@/hooks/use-tour";
import { TourTooltip, type TourStep } from "@/components/ui/tour-tooltip";

const SETTINGS_STEPS: TourStep[] = [
  {
    targetId: "experience-options",
    title: "اختر طريقة شرح سند",
    description:
      "حدّد كيف يشرح لك سند: «أنا مستعجل» للحصول على المختصر والتركيز على الأهم، أو «عندي وقت» لشرح هادئ مع أمثلة. يُحفظ اختيارك تلقائياً ويؤثر على طريقة عرض المحتوى.",
    position: "left",
  },
];

export function SettingsTour() {
  const { currentStep, isActive, next, skip } = useTour("settings", SETTINGS_STEPS.length);

  if (!isActive || currentStep < 0 || currentStep >= SETTINGS_STEPS.length) return null;

  return (
    <TourTooltip
      step={SETTINGS_STEPS[currentStep]}
      stepIndex={currentStep}
      totalSteps={SETTINGS_STEPS.length}
      onNext={next}
      onSkip={skip}
      isLast={currentStep === SETTINGS_STEPS.length - 1}
    />
  );
}
