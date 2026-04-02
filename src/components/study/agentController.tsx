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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Mic,
  MicOff,
  PhoneOff,
  Volume2,
  VolumeX,
  Keyboard,
  Send,
} from "lucide-react";
import { Json } from "@/types/database.types";
import { set } from "zod/v4";

interface Topic {
  name: string;
  brief: string;
  slug: string;
}

type TopicState = "not_started" | "current" | "done";

export default function AgentController({
  api,
  numPages,
  topicsJSON,
  topicStates,
}: {
  api: any;
  numPages: number;
  topicsJSON: Json;
  topicStates?: Record<string, TopicState>;
}) {
  const { state, audioTrack } = useVoiceAssistant();
  const room = useRoomContext();

  // Custom voice control hooks
  const micToggle = useTrackToggle({ source: Track.Source.Microphone });
  const { buttonProps: disconnectProps } = useDisconnectButton({
    stopTracks: true,
  });

  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isTextInputOpen, setIsTextInputOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [currentTopicName, setCurrentTopicName] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendTextMessage = async () => {
    if (!textInput.trim() || isSending) return;
    setIsSending(true);
    try {
      await room.localParticipant.sendText(textInput.trim(), {
        topic: "lk.chat",
      });
      setTextInput("");
    } catch (error) {
      console.error("Failed to send text:", error);
    } finally {
      setIsSending(false);
    }
  };

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
      topic?: string;
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
          if (api && data.page && data.page >= 1 && data.page <= numPages) {
            api.scrollTo(data.page - 1); // scrollTo uses 0-based index
          }
        } else if (data.action === "set_topic") {
          if (data.topic) {
            setCurrentTopicName(data.topic);
          }
        } else if (data.action === "topic_done") {
          setCurrentTopicName(null);
        }
      }
    };

    room.on(RoomEvent.DataReceived, handleData);
    return () => {
      room.off(RoomEvent.DataReceived, handleData);
    };
  }, [room, api, numPages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textInput]);

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

  const topicStateStyles: Record<TopicState, string> = {
    not_started: "bg-primary/60",
    current: "bg-primary",
    done: "bg-primary/40",
  };

  // Parse topics from JSON
  const topics: Topic[] =
    topicsJSON && typeof topicsJSON === "object" && "topics" in topicsJSON
      ? (topicsJSON as { topics: unknown[] }).topics.filter(
          (item): item is Topic =>
            !!item &&
            typeof item === "object" &&
            "name" in item &&
            "slug" in item,
        )
      : [];

  // Find the current topic object by matching name
  const currentTopic = currentTopicName
    ? topics.find((t) => t.slug === currentTopicName)
    : null;

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

      {/* Audio Visualizer */}
      <div className="px-4 py-2 border-t border-[#1d5479]/30 bg-gradient-to-b from-[#0e293c]/20 to-transparent">
        <div className="flex items-center justify-center h-18 rounded-lg bg-[#0e293c]/30 backdrop-blur-sm border border-[#1d5479]/20 shadow-lg">
          <BarVisualizer
            state={state}
            trackRef={audioTrack}
            barCount={15}
            options={{ minHeight: 36 }}
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
                "--lk-va-bar-height": "80px",
                "--lk-va-bar-width": "4px",
                "--lk-va-bar-gap": "6px",
                "--lk-va-border-radius": "8px",
              } as React.CSSProperties
            }
            className="w-full drop-shadow-[0_0_8px_rgba(255,160,47,0.3)]"
          />
        </div>
      </div>

      {/* Topics List */}
      <div className="h-[25%] px-4 py-2 overflow-y-auto border-t border-[#1d5479]/30 bg-[#0e293c]/10">
        {topics.length > 0 ? (
          <div className="space-y-2">
            {topics.map((topic) => {
              const state: TopicState =
                topic.slug === currentTopicName
                  ? "current"
                  : topicStates?.[topic.slug] || "not_started";
              return (
                <div
                  key={topic.slug}
                  className={`flex items-center gap-3 px-2 py-4 rounded-lg ${topicStateStyles[state]} transition-colors group`}
                >
                  <Checkbox
                    checked={state === "done"}
                    className="flex-shrink-0 data-[state=checked]:bg-[#ffa02f] data-[state=checked]:border-[#ffa02f]"
                  />
                  <span className="text-sm text-[#fffdfd] truncate">
                    {topic.name}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-[#fffdfd]/50 text-sm">
            لا توجد مواضيع
          </div>
        )}
      </div>

      {/* Current Topic Details */}
      <div className="px-4 py-3 border-t border-[#1d5479]/30 bg-[#0e293c]/20 h-[50%]">
        <h3 className="text-sm font-medium text-[#ffa02f] mb-2">
          الموضوع الحالي
        </h3>
        {currentTopic ? (
          <div className="space-y-2">
            <p className="text-sm font-medium text-[#fffdfd]">
              {currentTopic.name}
            </p>
            <p className="text-xs text-[#fffdfd]/70 leading-relaxed">
              {currentTopic.brief}
            </p>
          </div>
        ) : (
          <p className="text-xs text-[#fffdfd]/50 text-center">
            لا يوجد موضوع قيد الشرح
          </p>
        )}
      </div>

      {/* Voice Assistant Controls */}
      <div className="px-4 py-4 mt-auto">
        <div className="flex items-center justify-center gap-3">
          {/* Keyboard Toggle */}
          <Button
            onClick={() => setIsTextInputOpen(!isTextInputOpen)}
            className={`rounded-lg px-4 py-2 ${
              isTextInputOpen
                ? "bg-[#ffa02f] text-white"
                : "bg-[#1d5479] hover:bg-[#1d5479]/80 text-white"
            }`}
            aria-label="Toggle text input"
          >
            <Keyboard className="h-5 w-5" />
          </Button>

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
            onClick={disconnectProps.onClick}
            disabled={disconnectProps.disabled}
            className="rounded-lg bg-red-500 hover:bg-red-600 text-white px-4 py-2 flex items-center gap-2"
            aria-label="Disconnect"
          >
            <PhoneOff className="h-5 w-5" />
            <span className="text-sm font-medium">اوقف المحادثة</span>
          </Button>
        </div>
      </div>

      {/* Text Input */}
      {isTextInputOpen && (
        <div className="px-4 pb-2">
          <div className="flex gap-2">
            <Button
              onClick={sendTextMessage}
              disabled={!textInput.trim() || isSending}
              className="bg-[#ffa02f] hover:bg-[#ff8c1a] h-auto px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
            <textarea
              ref={textareaRef}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendTextMessage();
                }
              }}
              placeholder="اكتب رسالتك..."
              rows={1}
              disabled={isSending}
              className="flex-1 bg-[#0e293c] border-[#1d5479] text-[#fffdfd] placeholder:text-[#fffdfd]/50 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#ffa02f]/50 min-h-[40px] max-h-[120px] overflow-y-auto"
            />
          </div>
        </div>
      )}

      <RoomAudioRenderer />
    </div>
  );
}
