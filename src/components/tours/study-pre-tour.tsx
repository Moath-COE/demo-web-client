"use client";

import { useTour } from "@/hooks/use-tour";
import { TourTooltip, type TourStep } from "@/components/ui/tour-tooltip";

const STUDY_PRE_STEPS: TourStep[] = [
  {
    targetId: "language-toggle",
    title: "تغيير اللغة",
    description:
      "يمكنك التبديل بين العربية والإنجليزية لتحديد اللغة التي تفضل أن يتحدث بها سند.",
    position: "bottom",
  },
  {
    targetId: "back-to-library",
    title: "العودة للمكتبة",
    description:
      "من هنا يمكنك العودة إلى مكتبة دوراتك لاختيار مادة أخرى أو فصل مختلف.",
    position: "bottom",
  },
  {
    targetId: "start-agent-btn",
    title: "ابدأ الجلسة مع سند",
    description:
      'اضغط على زر "ابدأ الان" لبدء المحادثة مع سند، مدرسك الذكي. سند سيشرح لك المادة ويراجع معك.',
    position: "bottom",
  },
];

export function StudyPreTour() {
  const { currentStep, isActive, next, skip } = useTour(
    "study-pre",
    STUDY_PRE_STEPS.length,
  );

  if (!isActive || currentStep < 0 || currentStep >= STUDY_PRE_STEPS.length)
    return null;

  return (
    <TourTooltip
      step={STUDY_PRE_STEPS[currentStep]}
      stepIndex={currentStep}
      totalSteps={STUDY_PRE_STEPS.length}
      onNext={next}
      onSkip={skip}
      isLast={currentStep === STUDY_PRE_STEPS.length - 1}
    />
  );
}
