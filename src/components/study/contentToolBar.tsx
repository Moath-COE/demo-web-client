"use client";
import { ZoomIn, ZoomOut } from "lucide-react";
import {
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ContentToolbar({
  pageNumber,
  numPages,
  zoom,
  setZoom,
}: {
  pageNumber: number;
  numPages: number;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2.0));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  return (
    <div className="flex items-center justify-center gap-0.5 rounded-lg border border-border/30 bg-secondary/95 px-1.5 py-1 shadow-lg backdrop-blur-sm sm:gap-1 sm:px-2">
      <CarouselPrevious
        size="sm"
        className="border-0 bg-transparent text-secondary-foreground/70 shadow-none hover:bg-secondary-foreground/10 hover:text-secondary-foreground disabled:opacity-40"
      />

      <button
        onClick={handleZoomOut}
        className="rounded-md p-1 text-secondary-foreground/70 transition-colors hover:bg-secondary-foreground/10 hover:text-secondary-foreground sm:p-1.5"
        aria-label="تصغير"
      >
        <ZoomOut className="size-4" />
      </button>

      <span className="min-w-[44px] text-center text-xs font-medium tabular-nums text-secondary-foreground/80 sm:min-w-[56px] sm:text-sm">
        {(zoom * 100).toFixed(0)}%
      </span>

      <button
        onClick={handleZoomIn}
        className="rounded-md p-1 text-secondary-foreground/70 transition-colors hover:bg-secondary-foreground/10 hover:text-secondary-foreground sm:p-1.5"
        aria-label="تكبير"
      >
        <ZoomIn className="size-4" />
      </button>

      <div className="mx-1 h-5 w-px bg-border/50" />

      <div className="rounded-md bg-accent px-2 py-0.5 text-xs font-bold tabular-nums text-accent-foreground sm:text-sm">
        {pageNumber} / {numPages}
      </div>

      <CarouselNext
        size="sm"
        className="border-0 bg-transparent text-secondary-foreground/70 shadow-none hover:bg-secondary-foreground/10 hover:text-secondary-foreground disabled:opacity-40"
      />
    </div>
  );
}
