"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface TourStep {
  targetId: string;
  title: string;
  description: string;
  position?: "bottom" | "top" | "left" | "right";
}

interface TourTooltipProps {
  step: TourStep;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onSkip: () => void;
  isLast: boolean;
}

function getTargetRect(targetId: string): DOMRect | null {
  const el = document.querySelector(`[data-tour-id="${targetId}"]`);
  if (!el) return null;
  return el.getBoundingClientRect();
}

const PADDING = 10;
const SPOTLIGHT_RADIUS = 12;

export function TourTooltip({
  step,
  stepIndex,
  totalSteps,
  onNext,
  onSkip,
  isLast,
}: TourTooltipProps) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const position = step.position || "bottom";

  const measure = useCallback(() => {
    const rect = getTargetRect(step.targetId);
    if (!rect) return;
    setTargetRect(rect);

    const tooltipEl = tooltipRef.current;
    const ttWidth = tooltipEl?.offsetWidth || 300;
    const ttHeight = tooltipEl?.offsetHeight || 160;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let top = 0;
    let left = 0;

    switch (position) {
      case "bottom":
        top = rect.bottom + PADDING + 8;
        left = rect.left + rect.width / 2 - ttWidth / 2;
        break;
      case "top":
        top = rect.top - ttHeight - PADDING - 8;
        left = rect.left + rect.width / 2 - ttWidth / 2;
        break;
      case "right":
        top = rect.top + rect.height / 2 - ttHeight / 2;
        left = rect.right + PADDING + 8;
        break;
      case "left":
        top = rect.top + rect.height / 2 - ttHeight / 2;
        left = rect.left - ttWidth - PADDING - 8;
        break;
    }

    left = Math.max(12, Math.min(left, vw - ttWidth - 12));
    top = Math.max(12, Math.min(top, vh - ttHeight - 12));

    setTooltipPos({ top, left });
  }, [step.targetId, position]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      measure();
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [measure]);

  if (!targetRect) return null;

  const toArabicNum = (n: number) =>
    n.toString().replace(/\d/g, (d) => "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669"[parseInt(d)]);

  return createPortal(
    <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: "auto" }}>
      {/* SVG overlay with spotlight cutout */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          <mask id="tour-spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect
              x={targetRect.left - PADDING}
              y={targetRect.top - PADDING}
              width={targetRect.width + PADDING * 2}
              height={targetRect.height + PADDING * 2}
              rx={SPOTLIGHT_RADIUS}
              fill="black"
            />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(14, 41, 60, 0.75)"
          mask="url(#tour-spotlight-mask)"
          className="transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        />
      </svg>

      {/* Animated spotlight border */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: targetRect.top - PADDING - 2,
          left: targetRect.left - PADDING - 2,
          width: targetRect.width + PADDING * 2 + 4,
          height: targetRect.height + PADDING * 2 + 4,
          borderRadius: SPOTLIGHT_RADIUS + 2,
          border: "2px solid var(--accent)",
          boxShadow: "0 0 20px rgba(255, 160, 47, 0.3), 0 0 40px rgba(255, 160, 47, 0.1)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Connector line from spotlight to tooltip */}
      {visible && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {position === "bottom" && (
            <line
              x1={targetRect.left + targetRect.width / 2}
              y1={targetRect.bottom + PADDING}
              x2={tooltipPos.left + 20}
              y2={tooltipPos.top}
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.6"
            />
          )}
          {position === "top" && (
            <line
              x1={targetRect.left + targetRect.width / 2}
              y1={targetRect.top - PADDING}
              x2={tooltipPos.left + 20}
              // eslint-disable-next-line react-hooks/refs
              y2={tooltipPos.top + (tooltipRef.current?.offsetHeight || 160)}
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.6"
            />
          )}
        </svg>
      )}

      {/* Tooltip card */}
      <div
        ref={tooltipRef}
        className={cn(
          "absolute z-10 w-[300px] rounded-xl overflow-hidden",
          "bg-navy border border-white/10 shadow-2xl shadow-black/30",
          "transition-all duration-300 ease-out"
        )}
        style={{
          top: tooltipPos.top,
          left: tooltipPos.left,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
        }}
      >
        {/* Accent top bar */}
        <div className="h-1 bg-gradient-to-l from-coral to-coral-deep" />

        <div className="p-4 space-y-3">
          {/* Step indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === stepIndex
                      ? "w-6 bg-coral"
                      : i < stepIndex
                        ? "w-1.5 bg-coral/50"
                        : "w-1.5 bg-white/15"
                  )}
                />
              ))}
            </div>
            <span className="text-[10px] font-medium text-white/40 tracking-wide">
              {toArabicNum(stepIndex + 1)} من {toArabicNum(totalSteps)}
            </span>
          </div>

          {/* Content */}
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white leading-relaxed">
              {step.title}
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={onSkip}
              className="text-[11px] text-white/40 hover:text-white/70 transition-colors px-2 py-1"
            >
              تخطي الكل
            </button>
            <button
              onClick={onNext}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                "bg-coral hover:bg-coral-deep text-white",
                "shadow-md shadow-coral/20 hover:shadow-coral/30",
                "hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              {isLast ? "تم" : "التالي"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
