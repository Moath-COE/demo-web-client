"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { PdfCanvas } from "@/components/study/pdfCanvas";
import { useParams } from "next/navigation";
import { useDatabase } from "@/context/databaseContext";
import { Json } from "@/types/database.types";
import { CarouselApi } from "@/components/ui/carousel";
import { markerPayload, Topic, TopicState } from "@/types/types";
import { TopNav } from "@/components/study/top-nav";
import { StudyLauncher } from "@/components/study/study-launcher";

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
  const [topicsJSON, setTopicsJSON] = useState<Json>({});

  const [activeMarker, setActiveMarker] = useState<
    Record<string, markerPayload>
  >({});

  const [currentTopicName, setCurrentTopicName] = useState<string | null>(null);
  const [currentTopicSlug, setCurrentTopicSlug] = useState<string | null>(null);
  const [totalSections, setTotalSections] = useState<number | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(
    null,
  );
  const [isListening, setIsListening] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicStates, setTopicStates] = useState<Record<string, TopicState>>(
    {},
  );
  const topicSelectRef = useRef<(slug: string) => void>(() => {});

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

        setTopicsJSON(data);
      } catch (error) {
        console.error("Error fetching in course JSON:", error);
      }
    }

    if (chapterIndex) {
      fetchChapterPDF();
      fetchTopicsJSON();
    }
  }, [courseSlug, chapterIndex, supabase]);

  const handleTopicChange = useCallback(
    (
      topicName: string | null,
      topicSlug: string | null,
      sections: number | null,
      sectionIndex: number | null,
    ) => {
      setCurrentTopicName(topicName);
      setCurrentTopicSlug(topicSlug);
      setTotalSections(sections);
      setCurrentSectionIndex(sectionIndex);
    },
    [],
  );

  const handleTopicsDataChange = useCallback(
    (
      newTopics: Topic[],
      newTopicStates: Record<string, TopicState>,
      newOnTopicSelect: (slug: string) => void,
    ) => {
      setTopics(newTopics);
      setTopicStates(newTopicStates);
      topicSelectRef.current = newOnTopicSelect;
    },
    [],
  );

  return (
    <>
      <div
        className="flex flex-col relative max-h-screen h-svh overflow-hidden items-center bg-background"
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
        <TopNav
          topicName={currentTopicName}
          currentTopicSlug={currentTopicSlug}
          chapterTitle={chapterTitle}
          totalSections={totalSections}
          currentSectionIndex={currentSectionIndex}
          isListening={isListening}
          topics={topics}
          topicStates={topicStates}
          onTopicSelect={(slug) => topicSelectRef.current(slug)}
        />
        <StudyLauncher
          api={api}
          numPages={numPages}
          topicsJSON={topicsJSON}
          courseSlug={courseSlug}
          chapterIndex={chapterIndex}
          setActiveMarker={setActiveMarker}
          onTopicChange={handleTopicChange}
          onListeningChange={setIsListening}
          onTopicsDataChange={handleTopicsDataChange}
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
    </>
  );
}
