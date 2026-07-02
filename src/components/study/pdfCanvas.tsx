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

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import "react-pdf/dist/Page/TextLayer.css";

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
      className="mx-auto flex h-full w-full max-w-240 flex-col"
    >
      <Carousel
        className="flex h-full flex-col overflow-hidden justify-center"
        setApi={setApi}
        dir="ltr"
      >
        <CarouselContent className="h-full">
          {Array.from({ length: numPages }).map((_, index) => {
            const currentItemPage = index + 1;

            const isVisible = Math.abs(pageNumber - currentItemPage) <= 1;

            return (
              <CarouselItem key={index} data-page-index={currentItemPage}>
                <AspectRatio
                  ratio={16 / 9}
                  className="mx-auto flex max-h-full justify-center overflow-y-auto bg-card"
                >
                  {isVisible && containerWidth > 0 ? (
                    <Page
                      pageNumber={currentItemPage}
                      width={containerWidth}
                      scale={scale}
                      renderTextLayer={true}
                      customTextRenderer={
                        getTextRenderer(currentItemPage) as (
                          props: Record<string, unknown>,
                        ) => string
                      }
                      renderAnnotationLayer={false}
                      loading={<PdfPageLoading />}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-secondary">
                      <Loader2 className="size-7 animate-spin text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        شريحة {currentItemPage}
                      </span>
                    </div>
                  )}
                </AspectRatio>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="relative z-20 mx-auto mt-2 flex items-center justify-center pb-2">
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
