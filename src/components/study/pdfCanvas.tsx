import { useEffect, useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ContentToolbar } from "@/components/study/contentToolBar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { markerPayload } from "@/types/types";

// 1. Configure the worker to use a CDN (easiest setup)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// 2. Import the necessary styles for text selection and annotations
import "react-pdf/dist/Page/TextLayer.css";
// import "@/styles/AnnotationLayer.css";

export function PdfCanvas({
  pdfUrl,
  api,
  setApi,
  numPages,
  setNumPages,
  activeMarker,
}: {
  pdfUrl: string | null;
  api: CarouselApi | null;
  setApi: React.Dispatch<React.SetStateAction<CarouselApi | null>>;
  numPages: number;
  setNumPages: React.Dispatch<React.SetStateAction<number>>;
  activeMarker: Record<string, markerPayload>;
}) {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);

  // Agent page control logic
  useEffect(() => {
    if (!api) {
      return;
    }
    setPageNumber(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setPageNumber(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const getTextRenderer = useCallback(
    (renderPageNumber: number) => (props: any) => {
      const str = props?.str || props?.textItem?.str;
      const itemIndex = props?.itemIndex;

      if (typeof str !== "string" || typeof itemIndex !== "number") {
        return "";
      }

      for (const { type, page, span_id } of Object.values(activeMarker)) {
        if (page === renderPageNumber && span_id === itemIndex) {
          return `<mark class="agent-${type}" id="pdf-mark-${renderPageNumber}-${itemIndex}">${str}</mark>`;
        }
      }

      return `<span id="pdf-span-${renderPageNumber}-${itemIndex}">${str}</span>`;
    },
    [activeMarker],
  );

  return (
    <Document
      file={pdfUrl || undefined}
      onLoadSuccess={onDocumentLoadSuccess}
      loading={<p className="text-white">Loading PDF...</p>}
      className="w-full h-full"
    >
      <Carousel
        className="overflow-y-scroll p-4 bg-[#0e293c] h-full"
        setApi={setApi}
        dir="ltr"
      >
        <CarouselContent className="max-h-[calc(100vh-6rem)] ">
          {Array.from({ length: numPages }).map((_, index) => {
            const currentItemPage = index + 1;

            // Render the active page, plus one on the left and one on the right
            const isVisible = Math.abs(pageNumber - currentItemPage) <= 1;

            return (
              <CarouselItem key={index} data-page-index={currentItemPage}>
                <AspectRatio className="bg-gray-300 mx-auto overflow-y-auto flex justify-center scrollbar-show-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400/60 scrollbar-track-gray-200/10 max-h-[calc(100vh-8rem)]">
                  {isVisible ? (
                    <Page
                      pageNumber={currentItemPage}
                      scale={scale}
                      renderTextLayer={true}
                      // Execute the factory function with the current page
                      customTextRenderer={
                        getTextRenderer(currentItemPage) as any
                      }
                      renderAnnotationLayer={false}
                      loading={
                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                          Rendering Page...
                        </div>
                      }
                    />
                  ) : (
                    /* The Skeleton Fallback */
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-gray-200">
                      <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-8 border-4 border-slate-300 border-t-slate-500 rounded-full animate-spin mb-4"></div>
                        <p>Preparing Slide {currentItemPage}</p>
                      </div>
                    </div>
                  )}
                </AspectRatio>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <CarouselPrevious className="p-2 rounded-full bg-[#1d5479] text-[#fffdff] hover:bg-[#ffa02f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1d5479]" />

          <ContentToolbar
            pageNumber={pageNumber}
            numPages={numPages}
            zoom={scale}
            setZoom={setScale}
          />

          <CarouselNext className="p-2 rounded-full bg-[#1d5479] text-[#fffdff] hover:bg-[#ffa02f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1d5479]" />
        </div>
      </Carousel>
    </Document>
  );
}
