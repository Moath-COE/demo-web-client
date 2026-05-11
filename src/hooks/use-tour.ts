"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

export function useTour(tourId: string, totalSteps: number) {
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(-1);
  const [isActive, setIsActive] = useState(false);

  const storageKey = user
    ? `tour-completed-${user.id}-${tourId}`
    : null;

  useEffect(() => {
    if (!storageKey) return;

    const completed = localStorage.getItem(storageKey);
    if (!completed) {
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setIsActive(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [storageKey]);

  const next = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= totalSteps - 1) {
        if (storageKey) localStorage.setItem(storageKey, "true");
        setIsActive(false);
        return -1;
      }
      return prev + 1;
    });
  }, [totalSteps, storageKey]);

  const skip = useCallback(() => {
    if (storageKey) localStorage.setItem(storageKey, "true");
    setIsActive(false);
    setCurrentStep(-1);
  }, [storageKey]);

  const complete = useCallback(() => {
    if (storageKey) localStorage.setItem(storageKey, "true");
    setIsActive(false);
    setCurrentStep(-1);
  }, [storageKey]);

  return { currentStep, isActive, next, skip, complete };
}
