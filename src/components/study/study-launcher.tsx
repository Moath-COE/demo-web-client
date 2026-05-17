"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  Mic,
  MicOff,
  SquareArrowRight,
  Volume2,
  VolumeX,
  Keyboard,
} from "lucide-react";
import { useSession, SessionProvider } from "@livekit/components-react";
import "@livekit/components-styles";
import { TokenSource } from "livekit-client";
import { useUser } from "@clerk/nextjs";
import { FeedbackDialog } from "./feedback-dialog";
import {
  LauncherState,
  Topic,
  TopicState,
  StudyLauncherProps,
} from "@/types/types";
import { TextInputPopup } from "@/components/study/text-input-popup";
import { CheckpointPopup } from "@/components/study/checkpoint-popup";
import { MenuPopup } from "@/components/study/menu-popup";
import { ConnectedStateHandler } from "@/components/study/connected-state-handler";

export function StudyLauncher({
  api,
  numPages,
  topicsJSON,
  courseSlug,
  chapterIndex,
  setActiveMarker,
  onTopicChange,
  onListeningChange,
  onTopicsDataChange,
  onAutoOpenTopicsChange,
}: StudyLauncherProps) {
  const [launcherState, setLauncherState] = useState<LauncherState>("idle");

  const [language, setLanguage] = useState<"English" | "Arabic">("English");
  const { user } = useUser();
  const userName = user?.fullName ?? "undefined";
  const chapterId = "ch_" + chapterIndex;

  const [showFeedback, setShowFeedback] = useState(false);
  const [roomName, setRoomName] = useState("");

  const [agentState, setAgentState] = useState<string>("disconnected");
  const [currentTopicName, setCurrentTopicName] = useState<string | null>(null);
  const [numberOfSections, setNumberOfSections] = useState<number | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(
    null,
  );
  const [currentCheckpointQuestion, setCurrentCheckpointQuestion] = useState<
    string | null
  >(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isTextInputOpen, setIsTextInputOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [topicStates, setTopicStates] = useState<Record<string, TopicState>>(
    {},
  );

  const micStateRef = useRef<{
    toggle: () => void;
    enabled: boolean;
    pending: boolean;
  }>({
    toggle: () => {},
    enabled: true,
    pending: false,
  });

  const [micEnabled, setMicEnabled] = useState(true);
  const [micPending, setMicPending] = useState(false);
  const disconnectPropsRef = useRef<{ onClick: () => void; disabled: boolean }>(
    {
      onClick: () => {},
      disabled: false,
    },
  );

  const tokenSource = useMemo(
    () =>
      TokenSource.custom(async () => {
        const params = new URLSearchParams({
          course_id: courseSlug,
          chapter_id: chapterId,
          language,
          user_name: userName,
        });

        const response = await fetch("/api/get-lk-token?" + params.toString(), {
          cache: "no-store",
        });

        const participantToken = await response.text();

        return {
          serverUrl: process.env.NEXT_PUBLIC_LIVEKIT_URL!,
          participantToken,
        };
      }),
    [courseSlug, chapterId, language, userName],
  );
  const session = useSession(tokenSource);

  const isConnected = session.connectionState !== "disconnected";

  useEffect(() => {
    onListeningChange?.(agentState === "listening");
  }, [agentState, onListeningChange]);

  const topics: Topic[] = useMemo(
    () =>
      topicsJSON && typeof topicsJSON === "object" && "topics" in topicsJSON
        ? (topicsJSON as { topics: unknown[] }).topics.filter(
            (item): item is Topic =>
              !!item &&
              typeof item === "object" &&
              "name" in item &&
              "slug" in item,
          )
        : [],
    [topicsJSON],
  );

  const slugToName = useMemo(
    () => new Map(topics.map((t) => [t.slug, t.name])),
    [topics],
  );

  useEffect(() => {
    onTopicChange?.(currentTopicName, numberOfSections, currentSectionIndex);
  }, [currentTopicName, numberOfSections, currentSectionIndex, onTopicChange]);

  const handleLogoClick = useCallback(() => {
    if (launcherState === "idle") {
      setLauncherState("menu-open");
    } else if (launcherState === "menu-open") {
      setLauncherState("idle");
    }
  }, [launcherState]);

  const handleStart = useCallback(async () => {
    setLauncherState("active");
    try {
      await session.start({
        tracks: {
          microphone: {
            enabled: true,
          },
        },
      });
    } catch (error) {
      console.error("Failed to start session:", error);
      setLauncherState("idle");
    }
  }, [session]);

  const handleSessionEnd = useCallback((name: string) => {
    setRoomName(name);
    setShowFeedback(true);
  }, []);

  const handleFeedbackClose = useCallback(() => {
    setShowFeedback(false);
    setRoomName("");
  }, []);

  const sendUserMessage = useCallback(
    async (message: string) => {
      if (isSending || !isConnected) return;
      setIsSending(true);
      try {
        await session.room?.localParticipant.sendText(message, {
          topic: "lk.chat",
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      } finally {
        setIsSending(false);
      }
    },
    [isSending, isConnected, session.room],
  );

  const sendTextMessage = useCallback(async () => {
    if (!textInput.trim() || isSending) return;
    await sendUserMessage(textInput.trim());
    setTextInput("");
    setIsTextInputOpen(false);
  }, [textInput, isSending, sendUserMessage]);

  const toggleAudioMute = useCallback(() => {
    if (!session.room) return;
    const remoteParticipants = Array.from(
      session.room.remoteParticipants.values(),
    );
    remoteParticipants.forEach((participant) => {
      participant.audioTrackPublications.forEach((publication) => {
        if (publication.track) {
          publication.track.setMuted(!isAudioMuted);
        }
      });
    });
    setIsAudioMuted(!isAudioMuted);
  }, [session.room, isAudioMuted]);

  const handleDisconnect = useCallback(() => {
    const name = session.room?.name || "";
    disconnectPropsRef.current.onClick();
    setActiveMarker({});
    setActiveMarker({});
    setLauncherState("idle");
    setCurrentTopicName(null);
    setNumberOfSections(null);
    setCurrentSectionIndex(null);
    setCurrentCheckpointQuestion(null);
    setIsTextInputOpen(false);
    setAgentState("disconnected");
    if (name) handleSessionEnd(name);
  }, [session.room, setActiveMarker, handleSessionEnd]);

  const handleTopicClick = useCallback(
    (slug: string) => {
      setTopicStates((prev) => {
        const updated = { ...prev };
        if (!updated[slug] || updated[slug] === "not_started") {
          updated[slug] = "current";
        }
        return updated;
      });
      sendUserMessage(`Please explain the topic ${slug}`);
    },
    [sendUserMessage],
  );

  useEffect(() => {
    onTopicsDataChange?.(topics, topicStates, handleTopicClick);
  }, [topics, topicStates, handleTopicClick, onTopicsDataChange]);

  useEffect(() => {
    if (agentState === "listening" && !currentTopicName) {
      onAutoOpenTopicsChange?.(true);
    }
  }, [agentState, currentTopicName, onAutoOpenTopicsChange]);

  const handleTopicNameChange = useCallback(
    (slug: string | null) => {
      setCurrentTopicName(slug ? (slugToName.get(slug) ?? slug) : null);
    },
    [slugToName],
  );

  const handleSectionsChange = useCallback(
    (total: number | null, index: number | null) => {
      if (total !== null) setNumberOfSections(total);
      if (index !== null) setCurrentSectionIndex(index);
    },
    [],
  );

  const handleMicToggleChange = useCallback(
    (toggle: { toggle: () => void; enabled: boolean; pending: boolean }) => {
      micStateRef.current = toggle;
      setMicEnabled(toggle.enabled);
      setMicPending(toggle.pending);
    },
    [],
  );

  const handleDisconnectPropsChange = useCallback(
    (props: { onClick: () => void; disabled: boolean }) => {
      disconnectPropsRef.current = props;
    },
    [],
  );

  const handleLanguageChange = useCallback((val: "English" | "Arabic") => {
    setLanguage(val);
  }, []);

  const handleMenuPopupOpenChange = useCallback((open: boolean) => {
    if (!open) setLauncherState("idle");
  }, []);

  const handleTextInputToggle = useCallback(() => {
    setIsTextInputOpen((prev) => !prev);
  }, []);

  const isAgentListening = agentState === "listening";
  const showCheckpoint =
    isConnected && currentCheckpointQuestion && isAgentListening;

  const isActive = launcherState === "active";
  const isMenuOpen = launcherState === "menu-open";

  return (
    <>
      {isTextInputOpen && isConnected && (
        <TextInputPopup
          textInput={textInput}
          setTextInput={setTextInput}
          onSend={sendTextMessage}
          onClose={() => {
            setIsTextInputOpen(false);
            setTextInput("");
          }}
          isSending={isSending}
          checkpointQuestion={currentCheckpointQuestion}
        />
      )}

      {/* Launcher */}
      <div className="z-50 mt-auto md:my-4">
        {showCheckpoint && (
          <CheckpointPopup question={currentCheckpointQuestion!} />
        )}
        {isActive ? (
          <div className="flex items-center ">
            {/* Left extension — Control Buttons */}
            <div className=" h-full flex items-center justify-center gap-1 sm:gap-1.5 bg-[#045687] backdrop-blur-md rounded-2xl border border-white/10 p-1 shadow-2xl ">
              <SessionProvider session={session}>
                <ConnectedStateHandler
                  api={api}
                  numPages={numPages}
                  setActiveMarker={setActiveMarker}
                  onAgentStateChange={setAgentState}
                  onTopicNameChange={handleTopicNameChange}
                  onSectionsChange={handleSectionsChange}
                  onCheckpointChange={setCurrentCheckpointQuestion}
                  onDisconnect={handleSessionEnd}
                  onMicToggleChange={handleMicToggleChange}
                  onDisconnectPropsChange={handleDisconnectPropsChange}
                />
              </SessionProvider>
              <button
                onClick={handleDisconnect}
                className="rounded-lg bg-red-500 hover:bg-red-600 text-white p-1.5 sm:p-2 transition-colors"
                aria-label="Disconnect"
              >
                <SquareArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => micStateRef.current.toggle()}
                disabled={micPending}
                className="rounded-lg bg-[#ffa02f] hover:bg-[#ff8c1a] text-white p-1.5 sm:p-2 transition-colors disabled:opacity-50"
                aria-label="Toggle microphone"
              >
                {micEnabled ? (
                  <Mic className="h-4 w-4" />
                ) : (
                  <MicOff className="h-4 w-4" />
                )}
              </button>

              <button
                onClick={toggleAudioMute}
                className="rounded-lg bg-[#1d5479] hover:bg-[#1d5479]/80 text-white p-1.5 sm:p-2 transition-colors"
                aria-label="Toggle audio output"
              >
                {isAudioMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>

              <button
                onClick={handleTextInputToggle}
                className={`rounded-lg p-1.5 sm:p-2 transition-colors ${
                  isTextInputOpen
                    ? "bg-[#ffa02f] text-white"
                    : "bg-[#1d5479] hover:bg-[#1d5479]/80 text-white"
                }`}
                aria-label="Toggle text input"
              >
                <Keyboard className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <MenuPopup
            open={isMenuOpen && !isConnected}
            onOpenChange={handleMenuPopupOpenChange}
            onLogoClick={handleLogoClick}
            language={language}
            onLanguageChange={handleLanguageChange}
            onStart={handleStart}
          />
        )}
      </div>

      {/* Feedback Dialog */}
      <FeedbackDialog
        key={roomName}
        open={showFeedback}
        roomName={roomName}
        onClose={handleFeedbackClose}
      />
    </>
  );
}
