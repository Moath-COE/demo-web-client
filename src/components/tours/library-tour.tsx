"use client";

import { useTour } from "@/hooks/use-tour";
import { TourTooltip, type TourStep } from "@/components/ui/tour-tooltip";

const LIBRARY_STEPS: TourStep[] = [
  {
    targetId: "course-card",
    title: "دوراتك المسجّلة",
    description:
      "كل مادة تسجّلها تظهر هنا كبطاقة. اضغط على البطاقة للدخول إلى الفصول وبدء الدراسة مع سند.",
    position: "right",
  },
  {
    targetId: "sidebar-trigger",
    title: "التنقّل وإضافة المواد",
    description:
      "استخدم هذا الزر لفتح القائمة الجانبية، حيث تنتقل بين الأقسام وتضيف مواد جديدة لاحقاً.",
    position: "bottom",
  },
];

export function LibraryTour() {
  const { currentStep, isActive, next, skip } = useTour("library", LIBRARY_STEPS.length);

  if (!isActive || currentStep < 0 || currentStep >= LIBRARY_STEPS.length) return null;

  return (
    <TourTooltip
      step={LIBRARY_STEPS[currentStep]}
      stepIndex={currentStep}
      totalSteps={LIBRARY_STEPS.length}
      onNext={next}
      onSkip={skip}
      isLast={currentStep === LIBRARY_STEPS.length - 1}
    />
  );
}
