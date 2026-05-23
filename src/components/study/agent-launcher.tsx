"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { Circle, ChevronDown } from "lucide-react";
import { useSession, SessionProvider } from "@livekit/components-react";
import "@livekit/components-styles";
import { TokenSource } from "livekit-client";
import { useUser } from "@clerk/nextjs";
import { LauncherState, StudyLauncherProps } from "@/types/types";
import { TextInputPopup } from "@/components/study/text-input-popup";
import { CheckpointPopup } from "@/components/study/checkpoint-popup";
import { MenuPopup } from "@/components/study/menu-popup";
import { SessionManager } from "@/components/study/session-manager";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CompletionCircle } from "@/components/study/completionCircle";
import { FeedbackDialog } from "./feedback-dialog";
import { set } from "zod";

export function AgentLauncher({
  api,
  numPages,
  topics,
  courseSlug,
  chapterIndex,
  setActiveMarker,
  onListeningChange,
}: StudyLauncherProps) {
  const [launcherState, setLauncherState] = useState<LauncherState>("idle");

  const [language, setLanguage] = useState<"English" | "Arabic">("English");
  const { user } = useUser();
  const chapterId = "ch_" + chapterIndex;

  const [agentState, setAgentState] = useState<string>("disconnected");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const sendingRef = useRef(false);
  const sendUserMessageRef = useRef<(message: string) => Promise<void>>(
    async () => {},
  );
  const [currentCheckpointQuestion, setCurrentCheckpointQuestion] = useState<
    string | null
  >(null);
  const [isTextInputOpen, setIsTextInputOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [FeedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [roomName, setRoomName] = useState<string | null>(null);

  const [selectedTopic, setSelectedTopic] = useState<{
    slug: string;
    totalSections: number;
  } | null>(null);
  const [selectedSection, setSelectedSection] = useState<{
    name: string;
    index: number;
  } | null>(null);

  const tokenSource = useMemo(
    () =>
      TokenSource.custom(async () => {
        const params = new URLSearchParams({
          course_id: courseSlug,
          chapter_id: chapterId,
          language,
          user_name: user?.fullName ?? "undefined",
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
    [courseSlug, chapterId, language, user],
  );
  const session = useSession(tokenSource);

  const isConnected = session.connectionState !== "disconnected";

  const handleAgentStateChange = useCallback(
    (state: string) => {
      setAgentState(state);
      onListeningChange?.(state === "listening");
    },
    [onListeningChange],
  );

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
      setRoomName(session.room?.name || null);
    } catch (error) {
      console.error("Failed to start session:", error);
      setLauncherState("idle");
    }
  }, [session]);

  const sendUserMessage = useCallback(
    async (message: string) => {
      if (sendingRef.current || !isConnected) return;
      sendingRef.current = true;
      setIsSending(true);
      try {
        await session.room?.localParticipant.sendText(message, {
          topic: "lk.chat",
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      } finally {
        sendingRef.current = false;
        setIsSending(false);
      }
    },
    [isConnected, session.room],
  );

  useEffect(() => {
    sendUserMessageRef.current = sendUserMessage;
  }, [sendUserMessage]);

  const sendTextMessage = useCallback(async () => {
    if (!textInput.trim() || sendingRef.current) return;
    await sendUserMessageRef.current(textInput.trim());
    setTextInput("");
    setIsTextInputOpen(false);
  }, [textInput]);

  const handleDisconnect = useCallback(() => {
    setActiveMarker({});
    setLauncherState("idle");
    setDropdownOpen(false);
    setCurrentCheckpointQuestion(null);
    setIsTextInputOpen(false);
    setAgentState("disconnected");
    setSelectedTopic(null);
    setSelectedSection(null);
    setFeedbackDialogOpen(true);
  }, [setActiveMarker]);

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

      <div
        id="agent-control-bar"
        className="z-50 mt-auto w-full bg-secondary rounded-t-lg max-w-270 p-1.5 sm:p-2 relative"
      >
        {isActive ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-1.5 sm:items-center ">
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger
                asChild
                disabled={!isActive}
                className="w-full"
              >
                <button
                  id="topics-list"
                  className={`w-full sm:flex-1 sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium transition-all duration-300 min-w-0 ${
                    selectedTopic?.slug
                      ? "bg-[#0a2a3f] text-[#fffdfd] border border-accent/30"
                      : "bg-[#0a2a3f]/60 text-[#8faabb] border border-transparent hover:border-accent/20"
                  }`}
                >
                  {selectedTopic && (
                    <CompletionCircle
                      current={selectedSection?.index || 0}
                      total={selectedTopic?.totalSections}
                    />
                  )}
                  <span className="truncate">
                    {topics.filter((t) => t.slug === selectedTopic?.slug).pop()
                      ?.name ?? "اختر موضوع"}
                  </span>
                  <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 opacity-50" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                side="top"
                className="w-(--radix-dropdown-menu-trigger-width) bg-[#0a1e2e] border-border/30 text-[#fffdfd] max-h-[50vh]"
              >
                {topics.map((topic) => {
                  return (
                    <DropdownMenuItem
                      key={topic.slug}
                      onSelect={() =>
                        sendUserMessage(`please explain ${topic.slug}`)
                      }
                      className={`flex items-center gap-2 text-xs sm:text-sm ${
                        topic.slug === selectedTopic?.slug
                          ? "bg-accent/10 text-accent focus:bg-accent/15 focus:text-accent"
                          : "focus:bg-white/5"
                      }`}
                    >
                      {topic.slug === selectedTopic?.slug ? (
                        <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent" />
                        </span>
                      ) : (
                        <Circle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      )}
                      <span className="truncate">{topic.name}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-1 sm:contents">
              <SessionProvider session={session}>
                <SessionManager
                  api={api}
                  numPages={numPages}
                  setSelectedTopic={setSelectedTopic}
                  setSelectedSection={setSelectedSection}
                  setActiveMarker={setActiveMarker}
                  onAgentStateChange={handleAgentStateChange}
                  onCheckpointChange={setCurrentCheckpointQuestion}
                  onDisconnect={handleDisconnect}
                  onTextInputToggle={handleTextInputToggle}
                  isTextInputOpen={isTextInputOpen}
                />
              </SessionProvider>
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
        {currentCheckpointQuestion && isAgentListening && (
          <CheckpointPopup question={currentCheckpointQuestion!} />
        )}
        {FeedbackDialogOpen && (
          <FeedbackDialog
            onClose={() => setFeedbackDialogOpen(false)}
            open={FeedbackDialogOpen}
            roomName={roomName!}
          />
        )}
      </div>
    </>
  );
}
