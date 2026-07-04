"use client";

import { CircleHelp, Square } from "lucide-react";

interface CheckpointPopupProps {
  question: string;
  onChoiceSelect: (choice: string) => void;
  choices?: string[];
}

export function CheckpointPopup({
  question,
  onChoiceSelect,
  choices,
}: CheckpointPopupProps) {
  return (
    <div
      dir="ltr"
      className="absolute z-60 top-full left-1/2 -translate-x-1/2 mb-4 w-64 sm:w-80 max-w-[calc(100vw-2rem)] animate-in fade-in-0 slide-in-from-bottom-2 zoom-in-95 duration-300 pointer-events-auto"
    >
      <div className="relative bg-primary/95 backdrop-blur-md rounded-2xl border border-accent/30 shadow-2xl shadow-accent/10 p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <CircleHelp className="h-4 w-4 text-accent shrink-0" />
          <h3 className="text-sm font-medium text-accent">
              {(choices?.length ?? 0) > 2
              ? "Checkpoint Question"
              : "Check Understanding"}
          </h3>
        </div>
        <p className="text-sm text-primary-foreground leading-relaxed mb-4">
          {question}
        </p>
        <div className="flex flex-col w-full gap-2 pt-3 border-t border-primary-foreground/10">
          {choices?.map((choice) => (
            <button
              key={choice}
              onClick={() => onChoiceSelect(choice)}
              className="flex gap-2 items-center text-start px-4 w-full py-1.5 rounded-lg text-sm font-medium bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 hover:border-accent/50 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Square className="w-4 h-4" /> <span>{choice}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
