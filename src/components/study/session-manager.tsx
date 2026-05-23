"use client";

import {
  RoomAudioRenderer,
  useVoiceAssistant,
  useRoomContext,
  useTrackToggle,
  useDisconnectButton,
  BarVisualizer,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  RoomEvent,
  RemoteParticipant,
  DataPacket_Kind,
  Track,
} from "livekit-client";
import {
  Mic,
  MicOff,
  SquareArrowRight,
  Volume2,
  VolumeX,
  Keyboard,
} from "lucide-react";
import { ConnectedStateHandlerProps, UIControlData } from "@/types/types";

export function SessionManager({
  api,
  numPages,
  setSelectedTopic,
  setSelectedSection,
  setActiveMarker,
  onAgentStateChange,
  onCheckpointChange,
  onDisconnect,
  onTextInputToggle,
  isTextInputOpen,
}: ConnectedStateHandlerProps) {
  const { state: agentState, audioTrack } = useVoiceAssistant();
  const room = useRoomContext();
  const micToggle = useTrackToggle({ source: Track.Source.Microphone });
  const { buttonProps: disconnectProps } = useDisconnectButton({
    stopTracks: true,
  });
  const pendingTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [breakpoint, setBreakpoint] = useState<"md" | "sm" | "xs">("md");

  useEffect(() => {
    const mdQuery = window.matchMedia("(min-width: 768px)");
    const smQuery = window.matchMedia("(min-width: 640px)");

    const update = () => {
      if (mdQuery.matches) setBreakpoint("md");
      else if (smQuery.matches) setBreakpoint("sm");
      else setBreakpoint("xs");
    };

    update();
    mdQuery.addEventListener("change", update);
    smQuery.addEventListener("change", update);
    return () => {
      mdQuery.removeEventListener("change", update);
      smQuery.removeEventListener("change", update);
    };
  }, []);

  const barConfig = {
    xs: { barCount: 8, barWidth: 4, barGap: 3, borderRadius: 3, minHeight: 20 },
    sm: { barCount: 12, barWidth: 5, barGap: 5, borderRadius: 5, minHeight: 24 },
    md: { barCount: 15, barWidth: 6, barGap: 6, borderRadius: 8, minHeight: 28 },
  }[breakpoint];

  useEffect(() => {
    onAgentStateChange(agentState);
  }, [agentState, onAgentStateChange]);

  const handleDisconnect = useCallback(() => {
    disconnectProps.onClick();
    onDisconnect();
  }, [disconnectProps, onDisconnect]);

  const toggleAudioMute = useCallback(() => {
    const remoteParticipants = Array.from(room.remoteParticipants.values());
    remoteParticipants.forEach((participant) => {
      participant.audioTrackPublications.forEach((publication) => {
        if (publication.track) {
          publication.track.setMuted(!isAudioMuted);
        }
      });
    });
    setIsAudioMuted((prev) => !prev);
  }, [room, isAudioMuted]);

  useEffect(() => {
    const handleData = (
      payload: Uint8Array,
      _participant?: RemoteParticipant,
      _kind?: DataPacket_Kind,
      topic?: string,
    ) => {
      if (topic === "ui-control") {
        const data: UIControlData = JSON.parse(
          new TextDecoder().decode(payload),
        );

        if (data.action === "scroll") {
          if (api && data.page && data.page >= 1 && data.page <= numPages) {
            api.scrollTo(data.page - 1);
          }
        } else if (data.action === "set_topic") {
          if (data.topic) {
            setSelectedTopic({
              slug: data.topic,
              totalSections: data.number_of_sections || 0,
            });
          }
        } else if (data.action === "set_section") {
          if (data.section) {
            setSelectedSection({
              name: data.section,
              index: data.current_section_index || 0,
            });
          }
        } else if (data.action === "set_checkpoint") {
          if (data.checkpoint_question) {
            onCheckpointChange(data.checkpoint_question);
          }
        } else if (data.action === "section_done") {
          setSelectedSection(null);
        } else if (data.action === "remove_markers") {
          if (data.remove) {
            setActiveMarker((prev) => {
              const next = { ...prev };
              for (const id of data.remove!) {
                delete next[id];
              }
              return next;
            });
          }
        } else if (data.action === "add_markers") {
          if (data.add) {
            for (const [id, marker] of Object.entries(data.add)) {
              if (marker.delay > 0) {
                const tid = setTimeout(() => {
                  setActiveMarker((prev) => ({ ...prev, [id]: marker }));
                  pendingTimeouts.current = pendingTimeouts.current.filter(
                    (t) => t !== tid,
                  );
                }, marker.delay);
                pendingTimeouts.current.push(tid);
              } else {
                setActiveMarker((prev) => ({ ...prev, [id]: marker }));
              }
            }
          }
        }
      }
    };

    room.on(RoomEvent.DataReceived, handleData);
    return () => {
      room.off(RoomEvent.DataReceived, handleData);
      for (const tid of pendingTimeouts.current) {
        clearTimeout(tid);
      }
      pendingTimeouts.current = [];
    };
  }, [
    room,
    api,
    numPages,
    setActiveMarker,
    setSelectedTopic,
    setSelectedSection,
    onCheckpointChange,
  ]);

  return (
    <>
      <RoomAudioRenderer />
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 mr-auto">
        <button
          onClick={handleDisconnect}
          className="rounded-lg bg-red-500 hover:bg-red-600 text-white p-1 sm:p-1.5 transition-colors"
          aria-label="Disconnect"
        >
          <SquareArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>

        <button
          onClick={() => micToggle.toggle()}
          disabled={micToggle.pending}
          className="rounded-lg bg-[#ffa02f] hover:bg-[#ff8c1a] text-white p-1 sm:p-1.5 transition-colors disabled:opacity-50"
          aria-label="Toggle microphone"
        >
          {micToggle.enabled ? (
            <Mic className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          ) : (
            <MicOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          )}
        </button>

        <button
          onClick={toggleAudioMute}
          className="rounded-lg bg-[#1d5479] hover:bg-[#1d5479]/80 text-white p-1 sm:p-1.5 transition-colors"
          aria-label="Toggle audio output"
        >
          {isAudioMuted ? (
            <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          ) : (
            <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          )}
        </button>

        <button
          onClick={onTextInputToggle}
          className={`rounded-lg p-1 sm:p-1.5 transition-colors ${
            isTextInputOpen
              ? "bg-[#ffa02f] text-white"
              : "bg-[#1d5479] hover:bg-[#1d5479]/80 text-white"
          }`}
          aria-label="Toggle text input"
        >
          <Keyboard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>
      <div
        className="w-[70px] sm:w-[130px] md:w-[200px] h-[32px] sm:h-[38px] md:h-[40px] bg-[#045687] p-1 pl-1.5 sm:pl-3 md:pl-4 ml-auto rounded-lg"
        data-lk-theme="default"
      >
        <BarVisualizer
          state={agentState}
          trackRef={audioTrack}
          barCount={barConfig.barCount}
          options={{ minHeight: barConfig.minHeight }}
          style={
            {
              "--lk-fg":
                agentState === "listening"
                  ? "#4ade80"
                  : agentState === "thinking"
                    ? "#fbbf24"
                    : agentState === "speaking"
                      ? "#ffa02f"
                      : "#60a5fa",
              "--lk-bg": "rgba(29, 84, 121, 0.15)",
              "--lk-va-bar-height": "60px",
              "--lk-va-bar-width": `${barConfig.barWidth}px`,
              "--lk-va-bar-gap": `${barConfig.barGap}px`,
              "--lk-va-border-radius": `${barConfig.borderRadius}px`,
            } as React.CSSProperties
          }
          className="w-full h-full drop-shadow-[0_0_8px_rgba(255,160,47,0.3)]"
        />
      </div>
    </>
  );
}
