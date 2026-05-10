"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  value: number | null;
  onChange: (value: number) => void;
}

export function StarRating({ value, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-1.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled =
          hovered !== null ? star <= hovered : value !== null && star <= value;

        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            className="transition-all duration-150 hover:scale-125 focus:outline-none"
          >
            <Star
              className={`h-7 w-7 transition-colors duration-150 ${
                isFilled
                  ? "fill-[#ffa02f] text-[#ffa02f] drop-shadow-[0_0_6px_rgba(255,160,47,0.4)]"
                  : "fill-transparent text-[#1d5479]/60 hover:text-[#ffa02f]/50"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
