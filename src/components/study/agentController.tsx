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
import { Progress } from "@/components/ui/progress";
import {
  Mic,
  MicOff,
  PhoneOff,
  Volume2,
  VolumeX,
  Keyboard,
  Send,
  BookOpen,
  Layers,
  List,
  CircleHelp,
  CheckSquare,
  Square,
} from "lucide-react";
import { Json } from "@/types/database.types";
import { send } from "process";

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
  const { state: agentState, audioTrack } = useVoiceAssistant();
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
  const [currentTopicName, setCurrentTopicName] = useState<string | null>();
  const [numberOfSections, setNumberOfSections] = useState<number | null>(null);
  const [currentSectionName, setCurrentSectionName] = useState<string | null>(
    null,
  );
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(
    null,
  );
  const [currentCheckpointQuestion, setCurrentCheckpointQuestion] = useState<
    string | null
  >(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendUserMessage = async (message: string) => {
    if (isSending) return;
    setIsSending(true);
    try {
      await room.localParticipant.sendText(message, { topic: "lk.chat" });
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const sendTextMessage = async () => {
    if (!textInput.trim() || isSending) return;
    sendUserMessage(textInput.trim());
    setTextInput("");
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
      section?: string;
      number_of_sections?: number;
      current_section_index?: number;
      checkpoint_question?: string;
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
            setNumberOfSections(data.number_of_sections || null);
          }
        } else if (data.action === "set_section") {
          if (data.section) {
            setCurrentSectionName(data.section);
            setCurrentSectionIndex(data.current_section_index || null);
          }
        } else if (data.action === "set_checkpoint") {
          if (data.checkpoint_question) {
            setCurrentCheckpointQuestion(data.checkpoint_question);
          }
        } else if (data.action === "section_done") {
          setCurrentSectionName(null);
          setCurrentSectionIndex(null);
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

  const currentState = stateConfig[agentState] || stateConfig.disconnected;

  const topicStateStyles: Record<TopicState, string> = {
    not_started:
      "backdrop-blur-sm bg-[#1d5479]/20 border border-[#1d5479]/30 hover:border-[#1d5479]/50",
    current:
      "backdrop-blur-sm bg-[#ffa02f]/10 border border-[#ffa02f]/40 hover:border-[#ffa02f]/60 shadow-[0_0_12px_rgba(255,160,47,0.15)] hover:shadow-[0_0_16px_rgba(255,160,47,0.25)]",
    done: "backdrop-blur-sm bg-[#1d5479]/30 border border-[#1d5479]/40 hover:border-[#1d5479]/60",
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
      <div className="px-4 py-2 border-t border-[#1d5479]/30 bg-linear-to-b from-[#0e293c]/20 to-transparent">
        <div className="flex items-center justify-center h-18 rounded-lg bg-[#0e293c]/30 backdrop-blur-sm border border-[#1d5479]/20 shadow-lg">
          <BarVisualizer
            state={agentState}
            trackRef={audioTrack}
            barCount={15}
            options={{ minHeight: 36 }}
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
      <div
        className="h-[20%] px-4 py-2 overflow-y-auto border-t border-[#1d5479]/30 bg-[#0e293c]/10 transition-all duration-200 ease-in"
        style={{ flexGrow: currentTopic ? "0" : "1" }}
      >
        <div className="flex items-center gap-2 mb-3 group cursor-default">
          <List className="h-4 w-4 text-[#ffa02f] transition-transform group-hover:scale-110" />
          <h3 className="text-sm font-medium text-[#ffa02f] transition-colors group-hover:text-[#ffa02f]/80">
            المواضيع
          </h3>
        </div>
        {topics.length > 0 ? (
          <div className="space-y-2">
            {topics.map((topic) => {
              const topicState: TopicState =
                topic.slug === currentTopicName
                  ? "current"
                  : topicStates?.[topic.slug] || "not_started";
              return (
                <button
                  key={topic.slug}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${topicStateStyles[topicState]} transition-all duration-200 group hover:-translate-y-px cursor-pointer w-full text-left disabled:cursor-not-allowed disabled:opacity-50`}
                  onClick={() => {
                    sendUserMessage(`Please explain ${topic.name}.`); // Send topic query to agent
                  }}
                  disabled={
                    topicState === "current" ||
                    topicState === "done" ||
                    agentState === "disconnected" ||
                    agentState === "connecting" ||
                    agentState === "initializing"
                  }
                >
                  <div className="relative shrink-0">
                    {topicState === "done" ? (
                      <CheckSquare className="h-4 w-4 text-green-400" />
                    ) : (
                      <Square className="h-4 w-4 text-background" />
                    )}
                  </div>
                  <span className="text-sm text-[#fffdfd] truncate flex-1">
                    {topic.name}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)] text-center">
            <p className="text-xs text-[#fffdfd]/50 transition-opacity duration-300">
              لا توجد مواضيع
            </p>
          </div>
        )}
      </div>

      {/* Current Topic Details */}
      {currentTopic ? (
        <div className="px-4 py-3 border-t border-[#1d5479]/30 bg-[#0e293c]/20 flex-1 flex flex-col gap-4">
          {/* Section details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3 group cursor-default">
              <BookOpen className="h-4 w-4 text-[#ffa02f] transition-transform group-hover:scale-110" />
              <h3 className="text-sm font-medium text-[#ffa02f] transition-colors group-hover:text-[#ffa02f]/80">
                الموضوع الحالي
              </h3>
            </div>
            <div className="backdrop-blur-sm rounded-lg bg-gradient-to-br from-[#1d5479]/30 to-[#0e293c]/30 border border-[#1d5479]/30 hover:border-[#ffa02f]/40 hover:shadow-lg hover:shadow-[#ffa02f]/10 transition-all duration-300 hover:translate-y-[-2px] p-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-medium text-[#fffdfd] leading-tight">
                  {currentTopic.name}
                </p>
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#ffa02f] animate-pulse" />
              </div>
              <p className="text-xs text-[#fffdfd]/70 leading-relaxed mb-3">
                {currentTopic.brief}
              </p>
              <div className="space-y-2">
                {currentSectionName && (
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-[#ffa02f]/10 border border-[#ffa02f]/20">
                    <Layers className="h-3 w-3 text-[#ffa02f] flex-shrink-0" />
                    <span className="text-xs text-[#fffdfd]/90">
                      الموضوع الفرعي:{" "}
                      <span className="text-[#ffa02f] font-medium">
                        {currentSectionName}
                      </span>
                    </span>
                  </div>
                )}
                {numberOfSections !== null && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-[#fffdfd]/70">
                      <span>تقدم الدرس</span>
                      <span className="text-[#ffa02f] font-medium">
                        {currentSectionIndex} من {numberOfSections}
                      </span>
                    </div>
                    <Progress
                      value={
                        numberOfSections > 0
                          ? ((currentSectionIndex || 0) / numberOfSections) *
                            100
                          : 0
                      }
                      className="h-1.5 bg-[#0e293c]/50 border border-[#1d5479]/30 rtl:rotate-180"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Current Checkpoint Question */}
          {currentCheckpointQuestion && agentState == "listening" && (
            <div className="backdrop-blur-sm rounded-lg bg-gradient-to-br from-[#1d5479]/30 to-[#0e293c]/30 border border-[#ffa02f]/40 p-4">
              <div className="flex items-center gap-2 mb-3">
                <CircleHelp className="h-4 w-4 text-[#ffa02f]" />
                <h3 className="text-sm font-medium text-[#ffa02f]">
                  تحقق من فهمك{" "}
                </h3>
              </div>
              <p className="text-sm text-[#fffdfd] leading-relaxed mb-4">
                {currentCheckpointQuestion}
              </p>
              <div className="flex items-center gap-2 pt-3 border-t border-[#1d5479]/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffa02f] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffa02f]"></span>
                </span>
                <span className="text-xs text-[#ffa02f] font-medium">
                  اجب على السؤال في حال فهمت الموضوع، او اطلب من سند اعادة
                  الشرح{" "}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : null}

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
