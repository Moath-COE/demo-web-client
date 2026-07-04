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
    id: "sessionExperience",
    question: "ما هو تقييمك لتجربة التعلم مع سند؟",
  },
];

export function FeedbackDialog({
  open,
  roomName,
  onClose,
  endSessionMessage,
}: FeedbackDialogProps) {
  const [ratings, setRatings] = useState<Record<string, number | null>>({
    sessionExperience: null,
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
          sessionExperience: ratings.sessionExperience,
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
        className="sm:max-w-md bg-gradient-to-b from-primary to-primary/80 border-accent/40 text-primary-foreground [&>button]:text-primary-foreground/70 [&>button]:hover:text-primary-foreground"
      >
        {submitted ? (
          <div className="flex flex-col items-center gap-5 py-6">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-accent/20" />
              <CheckCircle2 className="h-16 w-16 text-accent relative" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-primary-foreground">
                شكراً لك!
              </h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">
                تقييمك يساعدنا في تحسين تجربة التعلم مع سند
              </p>
            </div>
            <Button
              onClick={handleClose}
              className="mt-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 rounded-lg"
            >
              العودة للمكتبة
            </Button>
          </div>
        ) : (
          <>
            {endSessionMessage && (
              <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50 mb-4">
                <AlertTriangleIcon />
                <AlertTitle>تنببه</AlertTitle>
                <AlertDescription>{endSessionMessage}</AlertDescription>
              </Alert>
            )}
            <DialogHeader className="pb-1">
              <DialogTitle className="text-primary-foreground text-lg flex items-center gap-2">
                <MessageSquareText className="h-5 w-5 text-accent" />
                كيف كانت تجربتك مع سند؟
              </DialogTitle>
              <DialogDescription className="text-primary-foreground/60">
                شاركنا رأيك لتحسين تجربة سند في المستقبل. تقييمك سيبقى سرياً ولن
                يستخدم إلا لتحسين الخدمة.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-2">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-2.5">
                  <label className="text-sm text-primary-foreground/90 leading-relaxed block">
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
                <label className="text-sm text-primary-foreground/90 block">
                  ملاحظات عامة
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="أضف ملاحظاتك هنا..."
                  rows={3}
                  className="w-full bg-background/50 border border-accent/40 text-foreground placeholder:text-muted-foreground rounded-lg px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
            </div>

            <div className="flex justify-end pt-1">
              <Button
                onClick={handleSubmit}
                disabled={!allRatingsSet || isSubmitting}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed gap-2"
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
