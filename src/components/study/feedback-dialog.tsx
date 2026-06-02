"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StarRating } from "./star-rating";
import {
  MessageSquareText,
  Send,
  CheckCircle2,
  Loader2,
  AlertTriangleIcon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FeedbackDialogProps {
  open: boolean;
  roomName: string;
  onClose: () => void;
  endSessionMessage: string | null;
}

interface RatingQuestion {
  id: string;
  question: string;
}

const QUESTIONS: RatingQuestion[] = [
  {
    id: "conceptExplanation",
    question: "ما هو تقييمك لشرح سند للمفاهيم؟",
  },
  {
    id: "voiceQuality",
    question: "كيف كانت جودة صوت سند؟",
  },
  {
    id: "understanding",
    question: "كيف تقيم فهم سند لكلامك؟ (اسئلتك واجوبتك)",
  },
];

export function FeedbackDialog({
  open,
  roomName,
  onClose,
  endSessionMessage,
}: FeedbackDialogProps) {
  const [ratings, setRatings] = useState<Record<string, number | null>>({
    conceptExplanation: null,
    voiceQuality: null,
    understanding: null,
  });
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allRatingsSet = Object.values(ratings).every((v) => v !== null);

  const handleSubmit = async () => {
    if (!allRatingsSet || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: roomName,
          conceptExplanation: ratings.conceptExplanation,
          voiceQuality: ratings.voiceQuality,
          understanding: ratings.understanding,
          notes,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);
    } catch {
      setError("حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitted) {
      onClose();
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && submitted) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={submitted}
        className="sm:max-w-md bg-gradient-to-b from-[#0e293c] to-[#0a1f2e] border-[#1d5479]/40 text-[#fffdfd] [&>button]:text-[#fffdfd]/70 [&>button]:hover:text-[#fffdfd]"
      >
        {submitted ? (
          <div className="flex flex-col items-center gap-5 py-6">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-[#ffa02f]/20" />
              <CheckCircle2 className="h-16 w-16 text-[#ffa02f] relative" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-[#fffdfd]">
                شكراً لك!
              </h3>
              <p className="text-sm text-[#fffdfd]/70 leading-relaxed">
                تقييمك يساعدنا في تحسين تجربة التعلم مع سند
              </p>
            </div>
            <Button
              onClick={handleClose}
              className="mt-2 bg-[#1d5479] hover:bg-[#1d5479]/80 text-[#fffdfd] px-8 rounded-lg"
            >
              العودة للمكتبة
            </Button>
          </div>
        ) : (
          <>
            <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50 mb-4">
              <AlertTriangleIcon />
              <AlertTitle>تنببه</AlertTitle>
              <AlertDescription>{endSessionMessage}</AlertDescription>
            </Alert>

            <DialogHeader className="pb-1">
              <DialogTitle className="text-[#fffdfd] text-lg flex items-center gap-2">
                <MessageSquareText className="h-5 w-5 text-[#ffa02f]" />
                كيف كانت تجربتك مع سند؟
              </DialogTitle>
              <DialogDescription className="text-[#fffdfd]/60">
                شاركنا رأيك لتحسين تجربة سند في المستقبل. تقييمك سيبقى سرياً ولن
                يستخدم إلا لتحسين الخدمة.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-2">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-2.5">
                  <label className="text-sm text-[#fffdfd]/90 leading-relaxed block">
                    {q.question}
                  </label>
                  <StarRating
                    value={ratings[q.id]}
                    onChange={(v) =>
                      setRatings((prev) => ({ ...prev, [q.id]: v }))
                    }
                  />
                </div>
              ))}

              <div className="space-y-2.5">
                <label className="text-sm text-[#fffdfd]/90 block">
                  ملاحظات عامة
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="أضف ملاحظاتك هنا..."
                  rows={3}
                  className="w-full bg-[#0a1f2e] border border-[#1d5479]/40 text-[#fffdfd] placeholder:text-[#fffdfd]/40 rounded-lg px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#ffa02f]/40 focus:border-[#ffa02f]/40 transition-all"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
              )}
            </div>

            <div className="flex justify-end pt-1">
              <Button
                onClick={handleSubmit}
                disabled={!allRatingsSet || isSubmitting}
                className="bg-[#ffa02f] hover:bg-[#ff8c1a] text-white px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    إرسال التقييم
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
