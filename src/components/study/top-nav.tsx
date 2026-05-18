"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckSquare, Square } from "lucide-react";
import { Topic, TopicState } from "@/types/types";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

function CompletionCircle({
  current,
  total,
}: {
  current: number | null;
  total: number | null;
}) {
  const radius = 14;
  const stroke = 2.5;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const progress =
    current !== null && total !== null && total > 0 ? current / total : 0;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      className="shrink-0"
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="none"
        stroke="var(--muted-foreground)"
        strokeOpacity={0.3}
        strokeWidth={stroke}
      />
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="transition-all duration-500 ease-out"
      />
    </svg>
  );
}

const TOPIC_STATE_STYLES: Record<TopicState, string> = {
  not_started: "hover:bg-muted/50",
  current: "bg-accent/10 border border-accent/40 opacity-80",
  done: "opacity-60",
};

export function TopNav({
  topicName,
  currentTopicSlug,
  chapterTitle,
  totalSections,
  currentSectionIndex,
  isListening,
  topics,
  topicStates,
  onTopicSelect,
}: {
  topicName: string | null;
  currentTopicSlug: string | null;
  chapterTitle: string | null;
  totalSections: number | null;
  currentSectionIndex: number | null;
  isListening: boolean;
  topics: Topic[];
  topicStates: Record<string, TopicState>;
  onTopicSelect: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const hasAutoOpenedRef = useRef(false);

  useEffect(() => {
    if (isListening && currentTopicSlug === null && !hasAutoOpenedRef.current) {
      setOpen(true);
      hasAutoOpenedRef.current = true;
    }
    if (currentTopicSlug !== null) {
      hasAutoOpenedRef.current = false;
    }
  }, [isListening, currentTopicSlug]);

  const displayText = topicName || chapterTitle || "سند";

  return (
    <nav className="flex items-center justify-between w-full h-12 sm:h-16 px-3 sm:px-6 border-b border-border/60 bg-secondary backdrop-blur">
      <div className="md:flex justify-start items-center gap-2 hidden">
        <Image src="/static/logo.png" alt="Logo" width={32} height={32} />
        <h2 className="text-sm sm:text-xl font-bold ">سند</h2>
      </div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="group text-sm sm:text-xl font-bold flex items-center gap-1.5 sm:gap-2 rounded-lg px-2 py-1 -ml-2 transition-colors hover:bg-muted/50 min-w-0">
            <div className="outline-1 outline-primary/60 rounded-sm flex items-center gap-1.5 sm:gap-2 min-w-0 py-1 px-4">
              <span className="border-b border-transparent group-hover:border-accent transition-all duration-200 truncate">
                {displayText}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground/70 group-hover:text-accent transition-colors shrink-0" />
            </div>
            {(totalSections !== null || currentSectionIndex !== null) && (
              <CompletionCircle
                current={currentSectionIndex}
                total={totalSections}
              />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          data-tour-id="topics-list"
          className="w-64 sm:w-72 max-h-[60vh] overflow-y-auto bg-secondary/95 backdrop-blur-md border border-border/70 rounded-xl shadow-2xl p-2 space-y-1"
        >
          {topics.map((topic) => {
            const topicState: TopicState =
              topic.slug === currentTopicSlug
                ? "current"
                : topicStates[topic.slug] || "not_started";
            const isDisabled =
              topicState === "current" || topicState === "done";
            return (
              <DropdownMenuItem
                key={topic.slug}
                onClick={() => {
                  if (!isDisabled) onTopicSelect(topic.slug);
                  setOpen(false);
                }}
                disabled={isDisabled}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-right transition-all duration-200 ${TOPIC_STATE_STYLES[topicState]}`}
              >
                <div className="relative shrink-0">
                  {topicState === "done" ? (
                    <CheckSquare className="h-4 w-4 text-green-400" />
                  ) : (
                    <Square className="h-4 w-4 text-white/40" />
                  )}
                </div>
                <span className="text-sm text-foreground truncate">
                  {topic.name}
                </span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <Button asChild size="sm" variant={"default"}>
          <Link href="/my-library">
            <span className="hidden sm:inline">المكتبة</span>
            <span className="sm:hidden">المكتبة</span>
          </Link>
        </Button>
      </div>
    </nav>
  );
}
