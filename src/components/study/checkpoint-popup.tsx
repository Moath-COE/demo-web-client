"use client";

import { CircleHelp } from "lucide-react";

interface CheckpointPopupProps {
  question: string;
}

export function CheckpointPopup({ question }: CheckpointPopupProps) {
  return (
    <div className="absolute z-60 top-full left-1/2 -translate-x-1/2 mb-4 w-64 sm:w-80 max-w-[calc(100vw-2rem)] animate-in fade-in-0 slide-in-from-bottom-2 zoom-in-95 duration-300 pointer-events-auto">
      <div className="relative bg-[#0a1f2e]/95 backdrop-blur-md rounded-2xl border border-[#ffa02f]/30 shadow-2xl shadow-[#ffa02f]/10 p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <CircleHelp className="h-4 w-4 text-[#ffa02f] shrink-0" />
          <h3 className="text-sm font-medium text-[#ffa02f]">تحقق من فهمك</h3>
        </div>
        <p className="text-sm text-[#fffdfd] leading-relaxed mb-4">
          {question}
        </p>
        <div className="flex items-center gap-2 pt-3 border-t border-white/10">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffa02f] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffa02f]" />
          </span>
          <span className="text-xs text-[#ffa02f] font-medium">
            اجب على السؤال في حال فهمت الموضوع، او اطلب من سند اعادة الشرح
          </span>
        </div>
      </div>
    </div>
  );
}
