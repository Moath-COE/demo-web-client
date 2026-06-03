"use client";

import { useState, useEffect } from "react";
import { PdfCanvas } from "@/components/study/pdfCanvas";
import { useParams } from "next/navigation";
import { useDatabase } from "@/context/databaseContext";
import { CarouselApi } from "@/components/ui/carousel";
import { markerPayload, Topic } from "@/types/types";
import { TopNav } from "@/components/study/top-nav";
import { AgentLauncher } from "@/components/study/agent-launcher";

export default function Study() {
  const params = useParams<{
    course: string | string[];
    chapter: string | string[];
  }>();

  const courseSlug = Array.isArray(params.course)
    ? params.course[0]
    : params.course || "";
  const chapterIndex = parseInt(
    Array.isArray(params.chapter) ? params.chapter[0] : params.chapter || "1",
  );
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [chapterTitle, setChapterTitle] = useState<string | null>(null);

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [topics, setTopics] = useState<Topic[]>([]);

  const [activeMarker, setActiveMarker] = useState<
    Record<string, markerPayload>
  >({});

  const supabase = useDatabase();

  useEffect(() => {
    async function fetchChapterPDF() {
      const { data: chapter, error } = await supabase
        .from("chapters")
        .select(
          `
          *,
          courses!inner(slug)
        `,
        )
        .eq("courses.slug", courseSlug)
        .eq("order_index", chapterIndex)
        .single();

      if (error) {
        console.error("Error fetching courses:", error);
        return { pdf_url: null };
      }
      setPdfUrl(chapter?.pdf_url || null);
      setChapterTitle(chapter?.title || null);
    }

    async function fetchTopicsJSON() {
      try {
        const response = await fetch(
          `/api/fetch-bunny/courses/${courseSlug}/ch_${chapterIndex}/topics_list.json`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        setTopics(data?.topics || []);
      } catch (error) {
        console.error("Error fetching in course JSON:", error);
      }
    }

    if (chapterIndex) {
      fetchChapterPDF();
      fetchTopicsJSON();
    }
  }, [courseSlug, chapterIndex, supabase]);

  return (
    <div
      className="flex flex-col relative max-h-[130vh] min-h-svh overflow-hidden items-center bg-background"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        backgroundImage: "url('/static/assets/texture-gold.png')",
        backgroundBlendMode: "lighten",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundPosition: "top left",
      }}
    >
      <TopNav chapterTitle={chapterTitle} />
      <AgentLauncher
        api={api}
        numPages={numPages}
        topics={topics}
        courseSlug={courseSlug}
        chapterIndex={chapterIndex}
        setActiveMarker={setActiveMarker}
      />
      <PdfCanvas
        pdfUrl={pdfUrl}
        api={api}
        setApi={setApi}
        numPages={numPages}
        setNumPages={setNumPages}
        activeMarker={activeMarker}
      />
    </div>
  );
}
