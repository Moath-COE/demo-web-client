"use client";

import { useState, useRef, use, useEffect } from "react";
import { PdfCanvas } from "@/components/study/pdfCanvas";
import { VoiceAIWidget } from "@/components/study/voiceAIWidget";
import { TopNav } from "@/components/study/top-nav";
import { useParams } from "next/navigation";
import { useDatabase } from "@/context/databaseContext";
import { Database } from "@/types/database.types";
import { CarouselApi } from "@/components/ui/carousel";

type Chapter = Database["public"]["Tables"]["chapters"]["Row"];

export default function Study() {
  const { chapter } = useParams();
  const chapterId = Array.isArray(chapter) ? chapter[0] : chapter || "";
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [numPages, setNumPages] = useState<number>(0);

  const supabase = useDatabase();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Fetch chapter material
    async function fetchChapterMaterial() {
      const { data: chapter, error }: { data: Chapter | null; error: any } =
        await supabase
          .from("chapters")
          .select("pdf_url, json_url")
          .eq("id", parseInt(chapterId, 10))
          .single();

      if (error) {
        console.error("Error fetching courses:", error);
        return { pdf_url: null, json_url: null };
      }

      setPdfUrl(chapter?.pdf_url || null);
    }

    if (chapterId) {
      fetchChapterMaterial();
    }

    // Cleanup function
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [chapterId]);

  return (
    <>
      <TopNav onAIToggle={toggleSidebar} sidebarOpen={sidebarOpen} />

      <div className="flex overflow-x-hidden bg-background pt-16">
        {/* Main Canvas - shrinks when sidebar opens on desktop */}
        <div className="flex-1 transition-all duration-300 relative">
          <PdfCanvas
            pdfUrl={pdfUrl}
            api={api}
            setApi={setApi}
            numPages={numPages}
            setNumPages={setNumPages}
          />
          {/* <FloatingToolsMenu /> */}
        </div>
        <VoiceAIWidget
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          api={api}
          numPages={numPages}
        />
      </div>
    </>
  );
}
