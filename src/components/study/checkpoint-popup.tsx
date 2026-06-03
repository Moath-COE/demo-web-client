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
      <div className="relative bg-[#0a1f2e]/95 backdrop-blur-md rounded-2xl border border-[#ffa02f]/30 shadow-2xl shadow-[#ffa02f]/10 p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <CircleHelp className="h-4 w-4 text-[#ffa02f] shrink-0" />
          <h3 className="text-sm font-medium text-[#ffa02f]">
            Checkpoint Question
          </h3>
        </div>
        <p className="text-sm text-[#fffdfd] leading-relaxed mb-4">
          {question}
        </p>
        <div className="flex flex-col w-full gap-2 pt-3 border-t border-white/10">
          {choices?.map((choice) => (
            <button
              key={choice}
              onClick={() => onChoiceSelect(choice)}
              className="flex gap-2 items-center text-start px-4 w-full py-1.5 rounded-lg text-sm font-medium bg-[#ffa02f]/10 border border-[#ffa02f]/30 text-[#ffa02f] hover:bg-[#ffa02f]/20 hover:border-[#ffa02f]/50 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Square className="w-4 h-4" /> <span>{choice}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
