"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Circle,
  ListTodo,
} from "lucide-react";
import { Logo } from "@/components/logo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CompletionCircle } from "@/components/study/completionCircle";
import { cn } from "@/lib/utils";

type TaskStatus = "done" | "current" | "upcoming";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

const TASKS: Task[] = [
  { id: "1", title: "نظرة عامة على سند", status: "current" },
  { id: "2", title: "شاهد كيف يشرح سند المحتوى", status: "upcoming" },
  { id: "3", title: "جرّب سؤال سند صوتياً أو كتابياً", status: "upcoming" },
  { id: "4", title: "أجب على سؤال فهم قصير", status: "upcoming" },
  { id: "5", title: "شاهد كيف يحدّث سند خطتك تلقائياً", status: "upcoming" },
  { id: "6", title: "اكتشف الفرق بين سند و ChatGPT", status: "upcoming" },
];

export function TopNav() {
  const doneCount = TASKS.filter((t) => t.status === "done").length;
  const currentTask = TASKS.find((t) => t.status === "current");

  return (
    <nav
      className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border/40 bg-secondary px-3 sm:h-16 sm:px-5"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex shrink-0 items-center gap-2">
        <Logo className="h-7 w-auto sm:h-8" />
        <span className="text-sm font-bold sm:text-base">سند</span>
      </div>

      <div className="flex min-w-0 flex-1 justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="group flex h-9 min-w-0 max-w-full items-center gap-2 rounded-full border border-secondary-foreground/10 bg-secondary-foreground/5 px-3 text-xs font-medium text-secondary-foreground outline-none transition-colors hover:bg-secondary-foreground/10 focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary data-[state=open]:bg-secondary-foreground/10 sm:text-sm"
            >
              <CompletionCircle current={doneCount} total={TASKS.length} />
              <span className="truncate">
                {currentTask?.title ?? "تقدّم الدرس"}
              </span>
              <ChevronDown
                className="size-3.5 shrink-0 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="center"
            sideOffset={6}
            className="w-72 max-w-[calc(100vw-1.5rem)] p-3 motion-reduce:animate-none"
          >
            <div className="flex items-center justify-between px-1 pb-2">
              <div className="flex items-center gap-2">
                <ListTodo className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">تقدّم الدرس</span>
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">
                {doneCount}/{TASKS.length}
              </span>
            </div>
            <ul className="flex flex-col">
              {TASKS.map((task, i) => (
                <li
                  key={task.id}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-1 py-1.5 text-sm",
                    "animate-in fade-in-0 slide-in-from-top-1 duration-200 motion-reduce:animate-none",
                    task.status === "current" && "bg-accent/10",
                  )}
                  style={{
                    animationDelay: `${i * 40}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  {task.status === "done" ? (
                    <CheckCircle2 className="size-4 shrink-0 text-accent" />
                  ) : task.status === "current" ? (
                    <span className="relative flex size-4 shrink-0 items-center justify-center">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:hidden" />
                      <span className="relative inline-flex size-3.5 rounded-full bg-accent" />
                    </span>
                  ) : (
                    <Circle className="size-4 shrink-0 text-muted-foreground/50" />
                  )}
                  <span
                    className={cn(
                      "truncate",
                      task.status === "done" &&
                        "text-muted-foreground line-through",
                      task.status === "current" && "font-medium text-accent",
                    )}
                  >
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      <Button
        asChild
        size="sm"
        variant="ghost"
        className="study-lib-link shrink-0 gap-1 text-secondary-foreground/80"
      >
        <Link href="/dashboard/my-library">
          <span>المكتبة</span>
          <ChevronLeft className="size-4" />
        </Link>
      </Button>
    </nav>
  );
}
