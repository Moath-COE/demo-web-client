"use client";

import { useState, useEffect } from "react";
import { PdfCanvas } from "@/components/study/pdfCanvas";
import { CarouselApi } from "@/components/ui/carousel";
import { markerPayload, Topic } from "@/types/types";
import { TopNav } from "@/components/study/top-nav";
import { AgentLauncher } from "@/components/study/agent-launcher";

const DEMO_COURSE_SLUG = "demo";
const DEMO_CHAPTER_INDEX = 1;
const DEMO_CHAPTER_TITLE = "الفصل التجريبي";
const DEMO_PDF_URL =
  "https://snd-zone.b-cdn.net/courses/demo/ch_1/Lecture%201%20%20-%20Tagged_260503_215153.pdf";

export default function StudyClient() {
  const courseSlug = DEMO_COURSE_SLUG;
  const chapterIndex = DEMO_CHAPTER_INDEX;
  const pdfUrl = DEMO_PDF_URL || null;
  const chapterTitle = DEMO_CHAPTER_TITLE;

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [topics, setTopics] = useState<Topic[]>([]);

  const [activeMarker, setActiveMarker] = useState<
    Record<string, markerPayload>
  >({});

  useEffect(() => {
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

    fetchTopicsJSON();
  }, [courseSlug, chapterIndex]);

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
