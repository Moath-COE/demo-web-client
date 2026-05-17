"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, X, CircleHelp } from "lucide-react";

interface TextInputPopupProps {
  textInput: string;
  setTextInput: (value: string) => void;
  onSend: () => void;
  onClose: () => void;
  isSending: boolean;
  checkpointQuestion?: string | null;
}

export function TextInputPopup({
  textInput,
  setTextInput,
  onSend,
  onClose,
  isSending,
  checkpointQuestion,
}: TextInputPopupProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textInput]);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center overscroll-contain">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-[calc(100%-1rem)] sm:w-full max-w-md mx-2 sm:mx-4 bg-[#0a1f2e]/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-3 sm:p-4 animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-white/60">اكتب رسالتك</h3>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/70 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {checkpointQuestion && (
          <div className="mb-3 p-3 rounded-xl bg-[#ffa02f]/5 border border-[#ffa02f]/20">
            <div className="flex items-center gap-2 mb-2">
              <CircleHelp className="h-4 w-4 text-[#ffa02f] shrink-0" />
              <h3 className="text-sm font-medium text-[#ffa02f]">
                تحقق من فهمك
              </h3>
            </div>
            <p className="text-sm text-[#fffdfd] leading-relaxed">
              {checkpointQuestion}
            </p>
          </div>
        )}
        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            placeholder="اكتب رسالتك..."
            rows={2}
            autoFocus
            disabled={isSending}
            className="flex-1 bg-black/30 border border-white/10 text-[#fffdfd] placeholder:text-white/30 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#ffa02f]/40 min-h-[60px] max-h-[120px] overflow-y-auto"
          />
          <Button
            onClick={onSend}
            disabled={!textInput.trim() || isSending}
            className="bg-[#ffa02f] hover:bg-[#ff8c1a] h-auto px-3 self-end rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
