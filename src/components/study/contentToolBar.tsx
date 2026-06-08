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
    <div className="flex items-center justify-center gap-0.5 sm:gap-1 bg-[#1d5479]/90 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-lg border border-[#0e293c] shadow-lg">
      <CarouselPrevious className="p-1 sm:p-2 rounded-md bg-[#1d5479] text-[#fffdff] hover:bg-[#ffa02f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1d5479]" />

      <button
        onClick={handleZoomOut}
        className="p-1 sm:p-2 rounded hover:bg-[#ffa02f] text-[#fffdfd] transition-colors"
        aria-label="Zoom out"
      >
        <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>

      <span className="px-1 sm:px-3 text-xs sm:text-sm font-medium text-[#fffdfd] min-w-[40px] sm:min-w-[60px] text-center tabular-nums">
        {(zoom * 100).toFixed(0)}%
      </span>

      <button
        onClick={handleZoomIn}
        className="p-1 sm:p-2 rounded hover:bg-[#ffa02f] text-[#fffdfd] transition-colors"
        aria-label="Zoom in"
      >
        <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>

      <div className="w-px h-4 sm:h-6 bg-[#0e293c] mx-1 sm:mx-2" />

      <div className="bg-foreground px-1 rounded-sm text-background font-bold text-xs sm:text-sm tabular-nums">
        {pageNumber} / {numPages}
      </div>
      <CarouselNext className="p-1 sm:p-2 rounded-md bg-[#1d5479] text-[#fffdff] hover:bg-[#ffa02f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1d5479]" />
    </div>
  );
}
