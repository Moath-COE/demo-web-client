import { useMemo, useState } from "react";
import { CarouselApi } from "../ui/carousel";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Menu, Play } from "lucide-react";
import AgentController from "./agentController";
import { useSession, SessionProvider } from "@livekit/components-react";
import { TokenSource } from "livekit-client";
import { Json } from "@/types/database.types";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export function AISideBar({
  onClose,
  isOpen,
  api,
  numPages,
  topicsJSON,
  courseSlug,
  chapterIndex,
  setMenuOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  api: CarouselApi | null;
  numPages: number;
  topicsJSON: Json;
  courseSlug: string;
  chapterIndex: number;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // Language selection state
  const [language, setLanguage] = useState<"English" | "Arabic">("English");
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
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4 relative">
            <div className="absolute top-10 flex justify-between items-center gap-2 w-full py-2 px-6 rounded-lg">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="cursor-pointer "
              >
                <Menu className="h-8 w-8 text-[#fffdfd]" />
              </button>
              {/* Language Switch */}
              <ToggleGroup
                type="single"
                value={language}
                onValueChange={(val) =>
                  val && setLanguage(val as "English" | "Arabic")
                }
                variant="outline"
              >
                <ToggleGroupItem value="Arabic">عربي</ToggleGroupItem>
                <ToggleGroupItem value="English">English</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-[#fffdfd]">
                مستعد للرحلة؟
              </h3>
              <p className="text-sm text-[#fffdfd]/70">
                مرحبا! انا سند، مدرسك الخصوصي المدعوم بالذكاء الاصطناعي. اضغط
                على زر البدء لنبدأ رحلة التعلم!
              </p>
            </div>
            {/* Main Start Button */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleStart}
                className="relative py-2 px-12 rounded-lg flex items-center gap-2 text-primary justify-center transition-all bg-[#ffa02f] hover:bg-[#ff8c1a] shadow-lg hover:scale-105"
              >
                ابدأ الان
                <Play className="h-7 w-7 text-primary" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
