"use client"
import { Button } from "@/components/ui/button"
import { PenTool, Highlighter, Eraser, Zap } from "lucide-react"

interface AnnotationToolbarProps {
  onAIToggle: () => void
  sidebarOpen: boolean
}

export function AnnotationToolbar({ onAIToggle, sidebarOpen }: AnnotationToolbarProps) {
  if (sidebarOpen) return null

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-white/10">
        {/* Pen Tool */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-white/10 text-white"
          aria-label="Pen tool"
        >
          <PenTool className="h-4 w-4" />
        </Button>

        {/* Highlighter Tool */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-white/10 text-white"
          aria-label="Highlighter tool"
        >
          <Highlighter className="h-4 w-4" />
        </Button>

        {/* Eraser Tool */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-white/10 text-white"
          aria-label="Eraser tool"
        >
          <Eraser className="h-4 w-4" />
        </Button>

        {/* Divider */}
        <div className="h-5 w-px bg-white/20" />

        {/* AI Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onAIToggle}
          className="h-9 w-9 rounded-full hover:bg-blue-500/20 text-blue-400 transition-colors"
          aria-label="Open AI assistant"
        >
          <Zap className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
