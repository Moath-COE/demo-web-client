"use client";

import { useEffect } from "react";
import { useTour } from "@/hooks/use-tour";
import { TourTooltip, type TourStep } from "@/components/ui/tour-tooltip";

const STUDY_POST_STEPS: TourStep[] = [
  {
    targetId: "agent-control-bar",
    title: "لوحة التحكم",
    description:
      "هذه لوحة التحكم بالجلسة. يمكنك كتم الميكروفون، إيقاف الصوت، استخدام لوحة المفاتيح للكتابة بدلاً من الصوت، وإنهاء الجلسة.",
    position: "top",
  },
  {
    targetId: "topics-list",
    title: "قائمة المواضيع",
    description:
      "هنا تظهر مواضيع الفصل. اضغط على أي موضوع ليشرحه لك سند بالتفصيل.",
    position: "bottom",
  },
];

export function StudyPostTour({ isConnected }: { isConnected: boolean }) {
  const { currentStep, isActive, next, skip, complete } = useTour(
    "study-post",
    STUDY_POST_STEPS.length,
  );

  useEffect(() => {
    if (isConnected && isActive) {
      complete();
    }
  }, [isConnected, isActive, complete]);

  if (
    !isActive ||
    !isConnected ||
    currentStep < 0 ||
    currentStep >= STUDY_POST_STEPS.length
  )
    return null;

  return (
    <TourTooltip
      step={STUDY_POST_STEPS[currentStep]}
      stepIndex={currentStep}
      totalSteps={STUDY_POST_STEPS.length}
      onNext={next}
      onSkip={skip}
      isLast={currentStep === STUDY_POST_STEPS.length - 1}
    />
  );
}
