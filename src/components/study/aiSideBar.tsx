import { useMemo, useState } from "react";
import { CarouselApi } from "../ui/carousel";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Play } from "lucide-react";
import AgentController from "./agentController";
import { useSession, SessionProvider } from "@livekit/components-react";
import { TokenSource } from "livekit-client";
import { Json } from "@/types/database.types";
import { useUser } from "@clerk/nextjs";
import { markerPayload } from "@/types/types";
import Link from "next/link";
import { FeedbackDialog } from "./feedback-dialog";
import { StudyPreTour } from "@/components/tours/study-pre-tour";
import { StudyPostTour } from "@/components/tours/study-post-tour";

export function AISideBar({
  onClose,
  isOpen,
  api,
  numPages,
  topicsJSON,
  courseSlug,
  chapterIndex,
  setMenuOpen,
  setActiveMarker,
}: {
  isOpen: boolean;
  onClose: () => void;
  api: CarouselApi | null;
  numPages: number;
  topicsJSON: Json;
  courseSlug: string;
  chapterIndex: number;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveMarker: React.Dispatch<
    React.SetStateAction<Record<string, markerPayload>>
  >;
}) {
  const [language, setLanguage] = useState<"English" | "Arabic">("English");
  const { user } = useUser();
  const userName = user?.fullName ?? "undefined";
  const chapterId = "ch_" + chapterIndex;

  const [showFeedback, setShowFeedback] = useState(false);
  const [roomName, setRoomName] = useState("");

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

  const handleStart = async () => {
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
    }
  };

  const handleSessionEnd = (name: string) => {
    setRoomName(name);
    setShowFeedback(true);
  };

  const handleFeedbackClose = () => {
    setShowFeedback(false);
    setRoomName("");
  };

  const isConnected = session.connectionState !== "disconnected";

  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-full bg-[#0f4c6f] ">
      {!isConnected && <StudyPreTour />}
      <StudyPostTour isConnected={isConnected} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {isConnected ? (
          <SessionProvider session={session}>
            <AgentController
              api={api}
              numPages={numPages}
              topicsJSON={topicsJSON}
              setActiveMarker={setActiveMarker}
              onSessionEnd={handleSessionEnd}
            />
          </SessionProvider>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4 relative">
            <div className="absolute top-5 flex justify-between items-center gap-2 w-full py-2 px-6 rounded-lg">
              <Link
                href="/my-library"
                data-tour-id="back-to-library"
                className="flex items-center px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                الرجوع للمكتبة
              </Link>
              <ToggleGroup
                type="single"
                data-tour-id="language-toggle"
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
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleStart}
                data-tour-id="start-agent-btn"
                className="relative py-2 px-12 rounded-lg flex items-center gap-2 text-primary justify-center transition-all bg-[#ffa02f] hover:bg-[#ff8c1a] shadow-lg hover:scale-105"
              >
                ابدأ الان
                <Play className="h-7 w-7 text-primary" />
              </button>
            </div>
          </div>
        )}
      </div>

      <FeedbackDialog
        key={roomName}
        open={showFeedback}
        roomName={roomName}
        onClose={handleFeedbackClose}
      />
    </div>
  );
}
