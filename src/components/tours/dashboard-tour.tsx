"use client";

import { useTour } from "@/hooks/use-tour";
import { TourTooltip, type TourStep } from "@/components/ui/tour-tooltip";

const DASHBOARD_STEPS: TourStep[] = [
  {
    targetId: "sidebar-trigger",
    title: "التنقّل بين الأقسام",
    description:
      "استخدم هذا الزر لفتح القائمة الجانبية والانتقال بين لوحة التحكم، مكتبتك، والإعدادات.",
    position: "bottom",
  },
  {
    targetId: "next-task-card",
    title: "مهمتك التالية",
    description:
      "هنا تظهر أهم مهمة بانتظارك. اضغط «ابدأ المهمة» للدخول مباشرةً إلى جلسة الدراسة.",
    position: "bottom",
  },
  {
    targetId: "today-tasks",
    title: "تعرّف على سند",
    description:
      "قائمة مهام اليوم تعرّفك على سند خلال دقائق. أكملها بالترتيب للاستفادة القصوى.",
    position: "right",
  },
  {
    targetId: "upcoming-milestones",
    title: "مواعيدك القادمة",
    description:
      "اختباراتك وواجباتك القادمة مرتّبة زمنياً حتى لا يفوتك أي موعد.",
    position: "left",
  },
];

export function DashboardTour() {
  const { currentStep, isActive, next, skip } = useTour("dashboard", DASHBOARD_STEPS.length);

  if (!isActive || currentStep < 0 || currentStep >= DASHBOARD_STEPS.length) return null;

  return (
    <TourTooltip
      step={DASHBOARD_STEPS[currentStep]}
      stepIndex={currentStep}
      totalSteps={DASHBOARD_STEPS.length}
      onNext={next}
      onSkip={skip}
      isLast={currentStep === DASHBOARD_STEPS.length - 1}
    />
  );
}
