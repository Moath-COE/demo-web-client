"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { Loader2, ChevronDown, Circle, Phone, Info } from "lucide-react";
import { useSession, SessionProvider } from "@livekit/components-react";
import "@livekit/components-styles";
import { TokenSource } from "livekit-client";
import { StudyLauncherProps } from "@/types/types";
import { TextInputPopup } from "@/components/study/text-input-popup";
import { CheckpointPopup } from "@/components/study/checkpoint-popup";
import { SessionManager } from "@/components/study/session-manager";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CompletionCircle } from "@/components/study/completionCircle";
import { FeedbackDialog } from "./feedback-dialog";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DEFAULT_EXPERIENCE, getExperience } from "@/lib/experience";

export function AgentLauncher({
  api,
  numPages,
  topics,
  courseSlug,
  chapterIndex,
  setActiveMarker,
  onListeningChange,
}: StudyLauncherProps) {
  const DEMO_USER_NAME = "طالب سند";
  const [language, setLanguage] = useState<"English" | "Arabic">("Arabic");
  const chapterId = "ch_" + chapterIndex;

  const [agentState, setAgentState] = useState<string>("disconnected");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const sendingRef = useRef(false);
  const [currentCheckpointQuestion, setCurrentCheckpointQuestion] = useState<{
    question: string;
    choices: string[];
  } | null>(null);
  const [isTextInputOpen, setIsTextInputOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [roomName, setRoomName] = useState<string | null>(null);

  const [selectedTopic, setSelectedTopic] = useState<{
    slug: string;
    totalSections: number;
  } | null>(null);
  const [selectedSection, setSelectedSection] = useState<{
    name: string;
    index: number;
  } | null>(null);

  const [endSessionMessage, setEndSessionMessage] = useState<string | null>(
    null,
  );

  const tokenSource = useMemo(
    () =>
      TokenSource.custom(async () => {
        const params = new URLSearchParams({
          course_id: courseSlug,
          chapter_id: chapterId,
          language,
          user_name: DEMO_USER_NAME,
          experience: getExperience() ?? DEFAULT_EXPERIENCE,
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
    [courseSlug, chapterId, language],
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

  const handleStart = useCallback(async () => {
    setIsStarting(true);
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
    } finally {
      setIsStarting(false);
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

  const sendTextMessage = useCallback(async () => {
    if (!textInput.trim() || sendingRef.current) return;
    await sendUserMessage(textInput.trim());
    setTextInput("");
    setIsTextInputOpen(false);
  }, [textInput, sendUserMessage]);

  const handleDisconnect = useCallback(() => {
    setActiveMarker({});
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

  const isAgentListening = agentState === "listening";
  const agentInteractive =
    agentState === "listening" ||
    agentState === "thinking" ||
    agentState === "speaking";

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
        />
      )}

      <footer
        className="relative z-50 shrink-0 border-t border-border/40 bg-secondary"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        {currentCheckpointQuestion?.question && isAgentListening && (
          <CheckpointPopup
            question={currentCheckpointQuestion?.question || ""}
            choices={currentCheckpointQuestion?.choices || []}
            onChoiceSelect={(choice) => {
              sendUserMessage(choice);
            }}
          />
        )}

        <div className="mx-auto flex w-full max-w-270 flex-wrap items-center gap-2 px-2 py-2 sm:flex-nowrap sm:gap-3 sm:px-4 sm:py-2">
          {!isConnected ? (
            <div className="flex w-full flex-col items-center justify-center gap-2.5 sm:justify-between sm:flex-row sm:gap-4">
              <div className="flex items-center justify-start gap-2 flex-1">
                <ToggleGroup
                  type="single"
                  value={language}
                  onValueChange={(val) =>
                    val && handleLanguageChange(val as "English" | "Arabic")
                  }
                  variant="outline"
                  className="rounded-lg border border-border/40 bg-secondary-foreground/5 p-0.5"
                >
                  <ToggleGroupItem
                    value="Arabic"
                    className="h-8 rounded-md px-3 text-xs font-medium text-secondary-foreground/70 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                  >
                    عربي
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="English"
                    className="h-8 rounded-md px-3 text-xs font-medium text-secondary-foreground/70 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                  >
                    English
                  </ToggleGroupItem>
                </ToggleGroup>
                <span className="order-1 text-center text-xs text-secondary-foreground/60 sm:order-none sm:text-sm">
                  اختر لغة الجلسة{" "}
                </span>
              </div>
              <Button
                onClick={handleStart}
                disabled={isStarting}
                className="h-9 gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent/90 flex-1"
              >
                ابدأ الجلسة
                {isStarting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Phone className="size-4" />
                )}
              </Button>
              <Link
                href="/dashboard/my-library"
                className="flex-1 flex justify-end items-center gap-2"
              >
                <Info className="size-4" />
                <span>مساعدة</span>
              </Link>
            </div>
          ) : (
            <>
              <DropdownMenu
                open={
                  dropdownOpen || (isAgentListening && selectedTopic === null)
                }
                onOpenChange={setDropdownOpen}
                dir="rtl"
              >
                <DropdownMenuTrigger asChild disabled={!agentInteractive}>
                  <button
                    className={`flex min-w-0 items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 sm:text-sm ${
                      selectedTopic?.slug
                        ? "border border-accent/30 bg-primary/40 text-secondary-foreground"
                        : "border border-secondary-foreground/10 bg-secondary-foreground/5 text-secondary-foreground/70 hover:bg-secondary-foreground/10 disabled:opacity-50"
                    }`}
                  >
                    {selectedTopic && (
                      <CompletionCircle
                        current={selectedSection?.index || 0}
                        total={selectedTopic?.totalSections}
                      />
                    )}
                    <span className="truncate">
                      {topics
                        .filter((t) => t.slug === selectedTopic?.slug)
                        .pop()?.name ?? "اختر موضوع"}
                    </span>
                    <ChevronDown className="size-3.5 shrink-0 opacity-50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  side="top"
                  className="max-h-[50vh] max-w-[70vw] border-border/40 bg-popover text-popover-foreground"
                >
                  {topics.map((topic) => {
                    return (
                      <DropdownMenuItem
                        key={topic.slug}
                        onSelect={() =>
                          sendUserMessage(`please explain ${topic.slug}`)
                        }
                        className={`gap-2 text-sm ${
                          topic.slug === selectedTopic?.slug
                            ? "bg-accent/10 text-accent focus:bg-accent/15 focus:text-accent"
                            : "focus:bg-secondary-foreground/10"
                        }`}
                      >
                        {topic.slug === selectedTopic?.slug ? (
                          <span className="relative flex size-3.5 shrink-0 items-center justify-center">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                            <span className="relative inline-flex size-3.5 rounded-full bg-accent" />
                          </span>
                        ) : (
                          <Circle className="size-3.5 shrink-0 text-muted-foreground" />
                        )}
                        <span className="truncate">{topic.name}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <SessionProvider session={session}>
                <SessionManager
                  api={api}
                  numPages={numPages}
                  setSelectedTopic={setSelectedTopic}
                  setSelectedSection={setSelectedSection}
                  setActiveMarker={setActiveMarker}
                  onAgentStateChange={handleAgentStateChange}
                  setCurrentCheckpointQuestion={setCurrentCheckpointQuestion}
                  onDisconnect={handleDisconnect}
                  onTextInputToggle={() => setIsTextInputOpen((prev) => !prev)}
                  isTextInputOpen={isTextInputOpen}
                  setEndSessionMessage={setEndSessionMessage}
                />
              </SessionProvider>
            </>
          )}
        </div>
      </footer>

      {/* <FeedbackDialog
        open={feedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
        roomName={roomName || ""}
        endSessionMessage={endSessionMessage}
      /> */}
    </>
  );
}
