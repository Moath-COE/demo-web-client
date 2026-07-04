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
import { useState, useRef, useCallback, useEffect } from "react";
import {
  RoomEvent,
  RemoteParticipant,
  DataPacket_Kind,
  Track,
} from "livekit-client";
import {
  Mic,
  MicOff,
  PhoneOff,
  Volume2,
  VolumeX,
  Keyboard,
} from "lucide-react";
import { ConnectedStateHandlerProps, UIControlData } from "@/types/types";
import { toast } from "sonner";

const STATE_META: Record<string, { label: string; color: string }> = {
  listening: { label: "يستمع", color: "#4ade80" },
  thinking: { label: "يفكّر", color: "#fbbf24" },
  speaking: { label: "يتحدّث", color: "var(--accent)" },
  connecting: { label: "يتصل…", color: "#60a5fa" },
  disconnected: { label: "غير متصل", color: "var(--muted-foreground)" },
};

const BAR_CONFIG = {
  barCount: 12,
  barWidth: 4,
  barGap: 4,
  borderRadius: 4,
  minHeight: 16,
};

export function SessionManager({
  api,
  numPages,
  setSelectedTopic,
  setSelectedSection,
  setActiveMarker,
  onAgentStateChange,
  setCurrentCheckpointQuestion,
  onDisconnect,
  onTextInputToggle,
  isTextInputOpen,
  setEndSessionMessage,
}: ConnectedStateHandlerProps) {
  const { state: agentState, audioTrack } = useVoiceAssistant();
  const room = useRoomContext();
  const micToggle = useTrackToggle({ source: Track.Source.Microphone });
  const { buttonProps: disconnectProps } = useDisconnectButton({
    stopTracks: true,
  });
  const pendingTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

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
            toast.info(`القسم ${data.current_section_index || 0} بدأ`, {
              description: `${data.section}`,
              position: "bottom-left",
              className: "bg-background! text-foreground!",
              descriptionClassName: "text-accent/80! italic!",
            });
          }
          setCurrentCheckpointQuestion({
            question: data.question || "",
            choices: data.choices || [],
          });
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
        } else if (data.action === "session_ending") {
          setEndSessionMessage(
            "وصلت للحد الاعلى للوقت المسموح به في هذه الجلسة. بامكانك بدا جلسة جديدة بعد الاجابة على بعض الاسئلة لتقييم تجربتك.",
          );
          onDisconnect();
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
    setCurrentCheckpointQuestion,
    onDisconnect,
    setEndSessionMessage,
  ]);

  const meta = STATE_META[agentState] ?? STATE_META.disconnected;

  return (
    <>
      <RoomAudioRenderer />
      <div className="flex min-w-0 flex-1 items-center justify-center gap-2 max-sm:basis-full max-sm:order-first">
        <div
          className="flex h-9 items-center rounded-lg bg-secondary-foreground/5 px-2 ring-1 ring-inset ring-secondary-foreground/10"
          data-lk-theme="default"
        >
          <BarVisualizer
            state={agentState}
            trackRef={audioTrack}
            barCount={BAR_CONFIG.barCount}
            options={{ minHeight: BAR_CONFIG.minHeight }}
              style={
                {
                  "--lk-fg": meta.color,
                  "--lk-bg": "color-mix(in srgb, var(--foreground) 12%, transparent)",
                  "--lk-va-bar-height": "32px",
                  "--lk-va-bar-width": `${BAR_CONFIG.barWidth}px`,
                  "--lk-va-bar-gap": `${BAR_CONFIG.barGap}px`,
                  "--lk-va-border-radius": `${BAR_CONFIG.borderRadius}px`,
                } as React.CSSProperties
              }
            className="h-full w-full"
          />
        </div>
        <span
          className="text-xs font-medium tabular-nums"
          style={{ color: meta.color }}
        >
          {meta.label}
        </span>
      </div>

      <div className="flex items-center gap-1 rounded-lg border border-secondary-foreground/10 bg-secondary-foreground/5 p-1">
        <button
          onClick={() => micToggle.toggle()}
          disabled={micToggle.pending}
          aria-label={micToggle.enabled ? "كتم الميكروفون" : "تشغيل الميكروفون"}
          title={micToggle.enabled ? "كتم الميكروفون" : "تشغيل الميكروفون"}
          className={`flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:opacity-50 ${
            micToggle.enabled
              ? "bg-secondary-foreground/10 text-secondary-foreground hover:bg-secondary-foreground/15"
              : "bg-accent text-accent-foreground hover:bg-accent/90"
          }`}
        >
          {micToggle.enabled ? (
            <Mic className="size-4" />
          ) : (
            <MicOff className="size-4" />
          )}
          <span className="hidden md:inline">
            {micToggle.enabled ? "مكتوم" : "الميكروفون"}
          </span>
        </button>

        <button
          onClick={onTextInputToggle}
          aria-label={isTextInputOpen ? "إغلاق لوحة المفاتيح" : "لوحة المفاتيح"}
          title={isTextInputOpen ? "إغلاق لوحة المفاتيح" : "لوحة المفاتيح"}
          className={`flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 ${
            isTextInputOpen
              ? "bg-accent text-accent-foreground hover:bg-accent/90"
              : "bg-secondary-foreground/10 text-secondary-foreground hover:bg-secondary-foreground/15"
          }`}
        >
          <Keyboard className="size-4" />
          <span className="hidden md:inline">
            {isTextInputOpen ? "إغلاق" : "نص"}
          </span>
        </button>

        <button
          onClick={toggleAudioMute}
          aria-label={isAudioMuted ? "تشغيل الصوت" : "كتم الصوت"}
          title={isAudioMuted ? "تشغيل الصوت" : "كتم الصوت"}
          className={`flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 ${
            isAudioMuted
              ? "bg-secondary-foreground/5 text-muted-foreground hover:bg-secondary-foreground/10"
              : "bg-secondary-foreground/10 text-secondary-foreground hover:bg-secondary-foreground/15"
          }`}
        >
          {isAudioMuted ? (
            <VolumeX className="size-4" />
          ) : (
            <Volume2 className="size-4" />
          )}
          <span className="hidden md:inline">
            {isAudioMuted ? "مكتوم" : "السماعة"}
          </span>
        </button>
      </div>

      <div className="mx-1 hidden h-7 w-px bg-border/40 sm:block" />

      <button
        onClick={handleDisconnect}
        aria-label="إنهاء الجلسة"
        title="إنهاء الجلسة"
        className="flex h-9 items-center gap-1.5 rounded-lg border border-destructive/40 bg-destructive/15 px-2.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
      >
        <PhoneOff className="size-4" />
        <span className="hidden md:inline">إنهاء</span>
      </button>
    </>
  );
}
