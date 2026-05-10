"use client";

import { useState, useEffect } from "react";
import { PdfCanvas } from "@/components/study/pdfCanvas";
import { useParams } from "next/navigation";
import { useDatabase } from "@/context/databaseContext";
import { Database, Json } from "@/types/database.types";
import { CarouselApi } from "@/components/ui/carousel";
import { AISideBar } from "@/components/study/aiSideBar";
import { NavigationMenu } from "@/components/navigation-menu";
import { markerPayload } from "@/types/types";

type Chapter = Database["public"]["Tables"]["chapters"]["Row"];

export default function Study() {
  // Get chapter ID from URL params
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

  // control sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Carosel control state
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [topicsJSON, setTopicsJSON] = useState<Json>({});

  // State to track agent markers
  const [activeMarker, setActiveMarker] = useState<
    Record<string, markerPayload>
  >({});

  const supabase = useDatabase();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch chapter material
    async function fetchChapterPDF() {
      const { data: chapter, error }: { data: Chapter | null; error: any } =
        await supabase
          .from("chapters")
          .select(
            `
          *,
          courses!inner(slug)
        `,
          )
          .eq("courses.slug", courseSlug)
          .eq("order_index", chapterIndex) // Optional: add if you want a specific chapter
          .single();

      if (error) {
        console.error("Error fetching courses:", error);
        return { pdf_url: null };
      }
      setPdfUrl(chapter?.pdf_url || null);
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

  return (
    <>
      <NavigationMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex overflow-x-hidden bg-background max-h-screen">
        {/* AI sidebar */}
        <div
          className={`relative right-0 top-0 bg-card transition-transform duration-300 ease-in-out z-50 xl:w-100 lg:w-75 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
          }`}
          style={{
            display: sidebarOpen ? "block" : "none",
          }}
        >
          <AISideBar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            api={api}
            numPages={numPages}
            topicsJSON={topicsJSON}
            courseSlug={courseSlug}
            chapterIndex={chapterIndex}
            setMenuOpen={setMenuOpen}
            setActiveMarker={setActiveMarker}
          />
        </div>

        {/* Main Canvas - shrinks when sidebar opens on desktop */}
        <div className="flex-1 transition-all duration-300 relative h-screen">
          <PdfCanvas
            pdfUrl={pdfUrl}
            api={api}
            setApi={setApi}
            numPages={numPages}
            setNumPages={setNumPages}
            activeMarker={activeMarker}
          />
        </div>
      </div>
    </>
  );
}
