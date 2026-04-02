"use client";

import { useState, useEffect } from "react";
import { PdfCanvas } from "@/components/study/pdfCanvas";
import { TopNav } from "@/components/study/top-nav";
import { useParams } from "next/navigation";
import { useDatabase } from "@/context/databaseContext";
import { Database, Json } from "@/types/database.types";
import { CarouselApi } from "@/components/ui/carousel";
import { AISideBar } from "@/components/study/aiSideBar";
import { set } from "zod/v4";

type Chapter = Database["public"]["Tables"]["chapters"]["Row"];

export default function Study() {
  // Get chapter ID from URL params
  const { chapter } = useParams();

  // Handle case where chapter might be an array (e.g., from catch-all routes)
  const chapterId = Array.isArray(chapter) ? chapter[0] : chapter || "";
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // control sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Carosel control state
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [topicsJSON, setTopicsJSON] = useState<Json>({});

  const supabase = useDatabase();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Fetch chapter material
    async function fetchChapterPDF() {
      const { data: chapter, error }: { data: Chapter | null; error: any } =
        await supabase
          .from("chapters")
          .select("pdf_url")
          .eq("id", parseInt(chapterId, 10))
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
          "/api/fetch-bunny/sanad/phys_1040/ch_1/topics_list.json",
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

    if (chapterId) {
      fetchChapterPDF();
      fetchTopicsJSON();
    }
  }, [chapterId, supabase]);

  return (
    <>
      <TopNav onAIToggle={toggleSidebar} sidebarOpen={sidebarOpen} />

      <div className="flex overflow-x-hidden bg-background pt-16">
        {/* AI sidebar */}
        <div
          className={`relative right-0 top-0 h-[calc(100vh-4rem)] bg-card transition-transform duration-300 ease-in-out z-50 xl:w-100 lg:w-75 ${
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
          />
        </div>

        {/* Main Canvas - shrinks when sidebar opens on desktop */}
        <div className="flex-1 transition-all duration-300 relative">
          <PdfCanvas
            pdfUrl={pdfUrl}
            api={api}
            setApi={setApi}
            numPages={numPages}
            setNumPages={setNumPages}
          />
        </div>
      </div>
    </>
  );
}
