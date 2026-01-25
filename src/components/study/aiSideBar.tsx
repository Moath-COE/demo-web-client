import { useState, useCallback } from "react";
import { CarouselApi } from "../ui/carousel";
import { Button } from "@/components/ui/button";
import { X, Volume2, VolumeX, Play } from "lucide-react";
import { LiveKitRoom } from "@livekit/components-react";
import AgentController from "./agentController";

type AIuiState = "idle" | "started";

export function AISideBar({
  onClose,
  isOpen,
  api,
  numPages,
}: {
  isOpen: boolean;
  onClose: () => void;
  api: CarouselApi | null;
  numPages: number;
}) {
  const [uiState, setUiState] = useState<AIuiState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Fetch token and manage LiveKit connection here
  const getToken = useCallback(async () => {
    try {
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
      setUiState("started");
      getToken();
    } else if (uiState === "started") {
      setUiState("idle");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0f4c6f]">
      {/* Header */}
      <div className="flex items-center justify-between py-2 px-4 border-b border-[#1d5479]">
        <h2 className="text-lg font-semibold text-[#fffdfd]">اهلا بك مع سند</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-full hover:bg-[#1d5479]"
        >
          <X className="h-4 w-4 text-[#fffdfd]" />
        </Button>
      </div>

      {/* Voice Assistant Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {token && uiState === "started" ? (
          <LiveKitRoom
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL!}
            token={token!}
            connect={true}
            video={false}
            audio={true}
            onDisconnected={() => {
              handleMicToggle();
              setToken(null);
            }}
            className="flex-1 flex flex-col"
          >
            <AgentController api={api} numPages={numPages} />
          </LiveKitRoom>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8 space-y-2">
              <h3 className="text-xl font-semibold text-[#fffdfd]">
                مستعد للمساعدة
              </h3>
              <p className="text-sm text-[#fffdfd]/70">
                انقر على زر التشغيل للبدء في المحادثة مع سند
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="h-10 w-10 rounded-full hover:bg-[#1d5479]"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5 text-[#fffdfd]" />
                ) : (
                  <Volume2 className="h-5 w-5 text-[#fffdfd]" />
                )}
              </Button>
              {/* Main Start Button */}
              <button
                onClick={handleMicToggle}
                className="relative h-16 w-16 rounded-full flex items-center justify-center transition-all bg-[#ffa02f] hover:bg-[#ff8c1a] shadow-lg hover:scale-105"
              >
                <Play className="h-7 w-7 text-[#0e293c]" />
              </button>
              <div className="h-10 w-10" /> {/* Spacer for symmetry */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
