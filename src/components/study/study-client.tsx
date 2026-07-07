"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CarouselApi } from "@/components/ui/carousel";
import { markerPayload, Topic } from "@/types/types";
import { TopNav } from "@/components/study/top-nav";
import { AgentLauncher } from "@/components/study/agent-launcher";
import { PdfDocumentLoading } from "@/components/study/loadings/pdfCanvasLoading";

const PdfCanvas = dynamic(
  () => import("@/components/study/pdfCanvas").then((m) => m.PdfCanvas),
  { ssr: false, loading: () => <PdfDocumentLoading /> },
);

const DEMO_COURSE_SLUG = "demo";
const DEMO_CHAPTER_INDEX = 1;
const DEMO_PDF_URL =
  "https://snd-zone.b-cdn.net/courses/demo/ch_1/Lecture%201%20%20-%20Tagged_260503_215153.pdf";

export default function StudyClient() {
  const courseSlug = DEMO_COURSE_SLUG;
  const chapterIndex = DEMO_CHAPTER_INDEX;
  const pdfUrl = DEMO_PDF_URL || null;

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
    <div className="flex h-svh flex-col overflow-hidden bg-background">
      <TopNav />
      <main className="relative flex min-h-0 flex-1 flex-col">
        <PdfCanvas
          pdfUrl={pdfUrl}
          api={api}
          setApi={setApi}
          numPages={numPages}
          setNumPages={setNumPages}
          activeMarker={activeMarker}
        />
      </main>
      <AgentLauncher
        api={api}
        numPages={numPages}
        topics={topics}
        courseSlug={courseSlug}
        chapterIndex={chapterIndex}
        setActiveMarker={setActiveMarker}
      />
    </div>
  );
}
