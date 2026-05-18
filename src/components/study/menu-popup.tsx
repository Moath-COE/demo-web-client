"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Play } from "lucide-react";

interface MenuPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogoClick: () => void;
  language: "English" | "Arabic";
  onLanguageChange: (lang: "English" | "Arabic") => void;
  onStart: () => void;
}

export function MenuPopup({
  open,
  onOpenChange,
  onLogoClick,
  language,
  onLanguageChange,
  onStart,
}: MenuPopupProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          onClick={onLogoClick}
          className="rounded-lg shadow-lg flex items-center justify-center bg-accent group py-2 px-6 font-bold"
        >
          ابدا مع سند الان!
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={12}
        className="min-w-40 bg-primary/80 backdrop-blur-md rounded-md p-4 shadow-2xl"
      >
        <div className="space-y-2">
          <ToggleGroup
            type="single"
            value={language}
            onValueChange={(val) =>
              val && onLanguageChange(val as "English" | "Arabic")
            }
            variant="outline"
            className="w-full"
          >
            <ToggleGroupItem
              value="Arabic"
              className="text-xs flex-1 data-[state=on]:bg-[#ffa02f] data-[state=on]:text-white data-[state=on]:border-[#ffa02f]"
            >
              عربي
            </ToggleGroupItem>
            <ToggleGroupItem
              value="English"
              className="text-xs flex-1 data-[state=on]:bg-[#ffa02f] data-[state=on]:text-white data-[state=on]:border-[#ffa02f]"
            >
              English
            </ToggleGroupItem>
          </ToggleGroup>
          <Button
            onClick={onStart}
            className="gap-2 bg-[#ffa02f] hover:bg-[#ff8c1a] text-white rounded-lg w-full py-2 px-8"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>ابدأ الان</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
