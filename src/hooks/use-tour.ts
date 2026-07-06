"use client";

import { useState, useEffect, useCallback } from "react";

export function useTour(tourId: string, totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isActive, setIsActive] = useState(false);

  const storageKey = `tour-completed-${tourId}`;

  useEffect(() => {
    const completed = sessionStorage.getItem(storageKey);
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
        sessionStorage.setItem(storageKey, "true");
        setIsActive(false);
        return -1;
      }
      return prev + 1;
    });
  }, [totalSteps, storageKey]);

  const skip = useCallback(() => {
    sessionStorage.setItem(storageKey, "true");
    setIsActive(false);
    setCurrentStep(-1);
  }, [storageKey]);

  const complete = useCallback(() => {
    sessionStorage.setItem(storageKey, "true");
    setIsActive(false);
    setCurrentStep(-1);
  }, [storageKey]);

  return { currentStep, isActive, next, skip, complete };
}
