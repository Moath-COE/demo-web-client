import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Mic,
  MicOff,
  X,
  Minimize2,
  Volume2,
  VolumeX,
  Play,
} from "lucide-react";
import { LiveKitRoom } from "@livekit/components-react";
import AgentController from "./agentController";

interface VoiceAIWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

type AIuiState = "idle" | "listening" | "thinking" | "speaking";

export function VoiceAIWidget({ isOpen, onClose }: VoiceAIWidgetProps) {
  const [uiState, setUiState] = useState<AIuiState>("idle");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Fetch token and manage LiveKit connection here
  const getToken = useCallback(async () => {
    try {
      console.log("run");
      const response = await fetch(`/api/get-lk-token`);
      const token = await response.text();
      setToken(token);
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!isOpen) return null;

  const handleMicToggle = () => {
    if (uiState === "idle") {
      setUiState("listening");
      getToken();
    } else if (uiState === "listening") {
      setUiState("idle");
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isMinimized ? "w-16 h-16" : "w-80 h-50"
      }`}
    >
      {/* Minimized uiState */}
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full h-full rounded-full bg-gradient-to-br from-[#1d5479] to-[#0e293c] shadow-2xl flex items-center justify-center hover:scale-105 transition-transform border-2 border-[#ffa02f]"
        >
          <div className={`${uiState === "speaking" ? "animate-pulse" : ""}`}>
            <Mic className="h-6 w-6 text-[#ffa02f]" />
          </div>
        </button>
      ) : (
        // Expanded uiState
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#0e293c] to-[#1d5479] shadow-2xl border border-[#1d5479] flex flex-col overflow-hidden backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#1d5479]/50">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-7 w-7 hover:bg-[#1d5479]"
              >
                <X className="h-3 w-3 text-[#fffdfd]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(true)}
                className="h-7 w-7 hover:bg-[#1d5479]"
              >
                <Minimize2 className="h-3 w-3 text-[#fffdfd]" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#fffdfd]">
                {uiState === "listening"
                  ? "Listening..."
                  : uiState === "thinking"
                  ? "Thinking..."
                  : uiState === "speaking"
                  ? "Speaking..."
                  : "سند"}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${
                  uiState === "listening"
                    ? "bg-red-500 animate-pulse"
                    : uiState === "thinking"
                    ? "bg-yellow-500 animate-pulse"
                    : uiState === "speaking"
                    ? "bg-green-500 animate-pulse"
                    : "bg-gray-500"
                }`}
              />
            </div>
          </div>
          {token && uiState === "listening" ? (
            <LiveKitRoom
              serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL!}
              token={token!}
              connect={true}
              video={false}
              audio={true}
              onDisconnected={() => {
                handleMicToggle();
              }}
              className="flex flex-col"
            >
              <AgentController />
            </LiveKitRoom>
          ) : (
            <div className="p-4 border-t border-[#1d5479]/50 flex items-center justify-center gap-3 h-full">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="h-10 w-10 rounded-full hover:bg-[#1d5479]"
              >
                {isMuted ? (
                  <VolumeX className="h-15 w-15 text-[#fffdfd]" />
                ) : (
                  <Volume2 className="h-15 w-15 text-[#fffdfd]" />
                )}
              </Button>
              {/* Main Mic Button */}
              <button
                onClick={handleMicToggle}
                disabled={uiState === "thinking" || uiState === "speaking"}
                className={`relative h-18 w-18 rounded-full flex items-center justify-center transition-all ${
                  uiState === "listening"
                    ? "bg-red-500 hover:bg-red-600 scale-110"
                    : "bg-[#ffa02f] hover:bg-[#ff8c1a]"
                } ${
                  uiState === "thinking" || uiState === "speaking"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } shadow-lg`}
              >
                {uiState === "listening" ? (
                  <MicOff className="h-6 w-6 text-white" />
                ) : (
                  <Play className="h-6 w-6 text-[#0e293c]" />
                )}
                {uiState === "listening" && (
                  <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                )}
              </button>
              <div className="h-10 w-10" /> {/* Spacer for symmetry */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
