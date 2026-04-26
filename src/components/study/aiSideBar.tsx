import { useMemo, useState } from "react";
import { CarouselApi } from "../ui/carousel";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { X, Play } from "lucide-react";
import AgentController from "./agentController";
import { useSession, SessionProvider } from "@livekit/components-react";
import { TokenSource } from "livekit-client";
import { Json } from "@/types/database.types";
import { useUser } from "@clerk/nextjs";

export function AISideBar({
  onClose,
  isOpen,
  api,
  numPages,
  topicsJSON,
  courseSlug,
  chapterIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  api: CarouselApi | null;
  numPages: number;
  topicsJSON: Json;
  courseSlug: string;
  chapterIndex: number;
}) {
  // Language selection state
  const [language, setLanguage] = useState<"English" | "Arabic">("Arabic");
  const { user } = useUser();
  const userName = user?.fullName ?? "undefined";
  const chapterId = "ch_" + chapterIndex;

  // Create a token source that includes join-time context
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
  // Initialize session with the token source
  const session = useSession(tokenSource);

  // Handle starting the session
  const handleStart = async () => {
    try {
      // Start the session with microphone enabled
      await session.start({
        tracks: {
          microphone: {
            enabled: true,
          },
        },
      });

      // Set participant attributes after connection
      // await session.room.localParticipant.setAttributes({
      //   course_id: courseSlug,
      //   chapter_id: `ch_${chapterIndex}`,
      //   language: language,
      //   user_name: user?.name || "undefined",
      // });
    } catch (error) {
      console.error("Failed to start session:", error);
    }
  };

  // Derive UI state from session connection state
  const isConnected = session.connectionState !== "disconnected";
  // const isConnected = true;

  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-full bg-[#0f4c6f]">
      {/* Voice Assistant Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {isConnected ? (
          <SessionProvider session={session}>
            <AgentController
              api={api}
              numPages={numPages}
              topicsJSON={topicsJSON}
            />
          </SessionProvider>
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
              {/* Main Start Button */}
              <button
                onClick={handleStart}
                className="relative h-16 w-16 rounded-full flex items-center justify-center transition-all bg-[#ffa02f] hover:bg-[#ff8c1a] shadow-lg hover:scale-105"
              >
                <Play className="h-7 w-7 text-[#0e293c]" />
              </button>
            </div>
            {/* Language Switch */}
            <ToggleGroup
              type="single"
              value={language}
              onValueChange={(val) =>
                val && setLanguage(val as "English" | "Arabic")
              }
              variant="outline"
              className="mt-4"
            >
              <ToggleGroupItem value="English">EN</ToggleGroupItem>
              <ToggleGroupItem value="Arabic">AR</ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}
      </div>
    </div>
  );
}
