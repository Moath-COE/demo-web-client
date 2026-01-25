import {
  RoomAudioRenderer,
  BarVisualizer,
  useVoiceAssistant,
  useRoomContext,
  useTrackToggle,
  useDisconnectButton,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { useEffect, useRef, useState } from "react";
import {
  RoomEvent,
  RemoteParticipant,
  DataPacket_Kind,
  Track,
} from "livekit-client";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, PhoneOff, Volume2, VolumeX } from "lucide-react";

export default function AgentController({
  api,
  numPages,
}: {
  api: any;
  numPages: number;
}) {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();
  const room = useRoomContext();
  const transcriptionEndRef = useRef<HTMLDivElement>(null);

  // Custom voice control hooks
  const micToggle = useTrackToggle({ source: Track.Source.Microphone });
  const { buttonProps: disconnectProps } = useDisconnectButton({
    stopTracks: true,
  });

  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Toggle agent audio output
  const toggleAudioMute = () => {
    const remoteParticipants = Array.from(room.remoteParticipants.values());
    remoteParticipants.forEach((participant) => {
      participant.audioTrackPublications.forEach((publication) => {
        if (publication.track) {
          publication.track.setMuted(!isAudioMuted);
        }
      });
    });
    setIsAudioMuted(!isAudioMuted);
  };

  useEffect(() => {
    interface UIControlData {
      action: string;
      page?: number;
    }

    const handleData = (
      payload: Uint8Array,
      participant?: RemoteParticipant,
      kind?: DataPacket_Kind,
      topic?: string,
    ) => {
      if (topic === "ui-control") {
        const data: UIControlData = JSON.parse(
          new TextDecoder().decode(payload),
        );

        if (data.action === "scroll") {
          // Your scrolling logic here:
          if (api && data.page && data.page >= 1 && data.page <= numPages) {
            api.scrollTo(data.page - 1); // scrollTo uses 0-based index
          }
        }
      }
    };

    room.on(RoomEvent.DataReceived, handleData);
    return () => {
      room.off(RoomEvent.DataReceived, handleData);
    };
  }, [room, api, numPages]);

  // Auto-scroll transcriptions to bottom
  useEffect(() => {
    transcriptionEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [agentTranscriptions]);

  // State display config
  const stateConfig: Record<
    string,
    { label: string; color: string; icon: string }
  > = {
    disconnected: { label: "غير متصل", color: "text-gray-400", icon: "⚫" },
    connecting: {
      label: "جاري الاتصال...",
      color: "text-yellow-400 animate-pulse",
      icon: "🔄",
    },
    initializing: {
      label: "جاري التحضير...",
      color: "text-blue-400 animate-pulse",
      icon: "⚙️",
    },
    listening: { label: "أستمع...", color: "text-green-400", icon: "👂" },
    thinking: {
      label: "أفكر...",
      color: "text-[#ffa02f] animate-pulse",
      icon: "🤔",
    },
    speaking: { label: "أتحدث...", color: "text-cyan-400", icon: "🗣️" },
  };

  const currentState = stateConfig[state] || stateConfig.disconnected;

  return (
    <div className="flex flex-col h-full" data-lk-theme="default">
      {/* Connection State Indicator */}
      <div className="px-4 py-2 border-b border-[#1d5479]/50">
        <div className="flex items-center justify-center gap-2">
          <span className={`text-sm font-medium ${currentState.color}`}>
            {currentState.label}
          </span>
          <span className="text-lg">{currentState.icon}</span>
        </div>
      </div>

      {/* Transcriptions Display */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {agentTranscriptions.length === 0 ? (
          <div className="flex items-center justify-center h-full text-[#fffdfd]/50 text-sm">
            <p>ابدأ المحادثة مع سند...</p>
          </div>
        ) : (
          agentTranscriptions.map((transcription) => (
            <div key={transcription.id} className="flex">
              <div
                className={`px-4 py-2 rounded-lg text-sm max-w-[85%] ${
                  transcription.final
                    ? "bg-[#1d5479] text-[#fffdfd]"
                    : "bg-[#1d5479]/50 text-[#fffdfd]/70 italic"
                }`}
              >
                {transcription.text}
              </div>
            </div>
          ))
        )}
        <div ref={transcriptionEndRef} />
      </div>

      {/* Audio Visualizer */}
      <div className="px-6 py-4 border-t border-[#1d5479]/30 bg-gradient-to-b from-[#0e293c]/20 to-transparent">
        <div className="flex items-center justify-center h-24 rounded-xl bg-[#0e293c]/30 backdrop-blur-sm border border-[#1d5479]/20 shadow-lg">
          <BarVisualizer
            state={state}
            trackRef={audioTrack}
            barCount={12}
            options={{ minHeight: 24 }}
            style={
              {
                "--lk-fg":
                  state === "listening"
                    ? "#4ade80"
                    : state === "thinking"
                      ? "#fbbf24"
                      : state === "speaking"
                        ? "#ffa02f"
                        : "#60a5fa",
                "--lk-bg": "rgba(29, 84, 121, 0.15)",
                "--lk-va-bar-height": "60px",
                "--lk-va-bar-width": "4px",
                "--lk-va-bar-gap": "6px",
                "--lk-va-border-radius": "8px",
              } as React.CSSProperties
            }
            className="w-full drop-shadow-[0_0_8px_rgba(255,160,47,0.3)]"
          />
        </div>
      </div>

      {/* Voice Assistant Controls */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-center gap-3">
          {/* Microphone Toggle */}
          <Button
            onClick={() => micToggle.toggle()}
            disabled={micToggle.pending}
            className="rounded-lg bg-[#ffa02f] hover:bg-[#ff8c1a] text-white px-4 py-2"
            aria-label="Toggle microphone"
          >
            {micToggle.enabled ? (
              <Mic className="h-5 w-5" />
            ) : (
              <MicOff className="h-5 w-5" />
            )}
          </Button>

          {/* Audio Mute Toggle */}
          <Button
            onClick={toggleAudioMute}
            className="rounded-lg bg-[#1d5479] hover:bg-[#1d5479]/80 text-white px-4 py-2"
            aria-label="Toggle audio output"
          >
            {isAudioMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>

          {/* Disconnect Button */}
          <Button
            {...disconnectProps}
            className="rounded-lg bg-red-500 hover:bg-red-600 text-white px-4 py-2 flex items-center gap-2"
            aria-label="Disconnect"
          >
            <PhoneOff className="h-5 w-5" />
            <span className="text-sm font-medium">اوقف المحادثة</span>
          </Button>
        </div>
      </div>

      <RoomAudioRenderer />
    </div>
  );
}
