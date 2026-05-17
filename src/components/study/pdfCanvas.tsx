import { useEffect, useState, useCallback, memo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Loader2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ContentToolbar } from "@/components/study/contentToolBar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { markerPayload } from "@/types/types";
import {
  PdfDocumentLoading,
  PdfPageLoading,
} from "@/components/study/loadings/pdfCanvasLoading";

// 1. Configure the worker to use a CDN (easiest setup)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// 2. Import the necessary styles for text selection and annotations
import "react-pdf/dist/Page/TextLayer.css";
// import "@/styles/AnnotationLayer.css";

export const PdfCanvas = memo(function PdfCanvas({
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
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (!api) return;
    const measure = () => {
      const slides = api.slideNodes();
      if (slides.length > 0) {
        const style = getComputedStyle(slides[0]);
        const paddingH =
          parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        setContainerWidth(slides[0].clientWidth - paddingH);
      }
    };
    measure();
    const container = api.containerNode();
    if (container) {
      const observer = new ResizeObserver(measure);
      observer.observe(container);
      return () => observer.disconnect();
    }
  }, [api]);

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
    (renderPageNumber: number) =>
      (props: {
        str?: string;
        textItem?: { str?: string };
        itemIndex?: number;
      }) => {
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
      loading={<PdfDocumentLoading />}
      className="w-full rounded-lg bg-clip-border max-w-300 mx-auto  mb-auto md:my-2"
    >
      <Carousel
        className="overflow-y-scroll p-2 sm:p-4 bg-[#0e293c] "
        setApi={setApi}
        dir="ltr"
      >
        <CarouselContent className=" ">
          {Array.from({ length: numPages }).map((_, index) => {
            const currentItemPage = index + 1;

            // Render the active page, plus one on the left and one on the right
            const isVisible = Math.abs(pageNumber - currentItemPage) <= 1;

            return (
              <CarouselItem key={index} data-page-index={currentItemPage}>
                <AspectRatio
                  ratio={16 / 9}
                  className="bg-gray-300 mx-auto overflow-y-auto flex justify-center scrollbar-show-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400/60 scrollbar-track-gray-200/10"
                >
                  {isVisible && containerWidth > 0 ? (
                    <Page
                      pageNumber={currentItemPage}
                      width={containerWidth}
                      scale={scale}
                      renderTextLayer={true}
                      // Execute the factory function with the current page
                      customTextRenderer={
                        getTextRenderer(currentItemPage) as (
                          props: Record<string, unknown>,
                        ) => string
                      }
                      renderAnnotationLayer={false}
                      loading={<PdfPageLoading />}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#132f45]">
                      <Loader2 className="size-7 text-slate-400 animate-spin" />
                      <span className="text-xs text-slate-500">
                        شريحة {currentItemPage}
                      </span>
                    </div>
                  )}
                </AspectRatio>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className=" mt-2 z-20 flex items-center justify-center relative mx-auto">
          <ContentToolbar
            pageNumber={pageNumber}
            numPages={numPages}
            zoom={scale}
            setZoom={setScale}
          />
        </div>
      </Carousel>
    </Document>
  );
});
