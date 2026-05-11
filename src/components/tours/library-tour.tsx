"use client";

import { useTour } from "@/hooks/use-tour";
import { TourTooltip, type TourStep } from "@/components/ui/tour-tooltip";

const LIBRARY_STEPS: TourStep[] = [
  {
    targetId: "add-courses-btn",
    title: "إضافة مواد جديدة",
    description:
      "من هنا يمكنك إضافة مواد جديدة لمكتبتك. اضغط على الزر لتصفح المواد المتاحة والتسجيل فيها.",
    position: "bottom",
  },
  {
    targetId: "sidebar-footer",
    title: "الإعدادات والمساعدة",
    description:
      "هنا تجد الإعدادات، صفحة المساعدة، وملفك الشخصي. يمكنك تخصيص تجربتك والوصول للدعم في أي وقت.",
    position: "top",
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
