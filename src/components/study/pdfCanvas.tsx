import { useEffect, useState } from "react";
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

// 1. Configure the worker to use a CDN (easiest setup)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// 2. Import the necessary styles for text selection and annotations
// import "@/styles/TextLayer.css";
// import "@/styles/AnnotationLayer.css";

export function PdfCanvas({
  pdfUrl,
  api,
  setApi,
  numPages,
  setNumPages,
}: {
  pdfUrl: string | null;
  api: CarouselApi | null;
  setApi: React.Dispatch<React.SetStateAction<CarouselApi | null>>;
  numPages: number;
  setNumPages: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);

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

  return (
    <Document
      file={pdfUrl || undefined}
      onLoadSuccess={onDocumentLoadSuccess}
      loading={<p className="text-white">Loading PDF...</p>}
      className="w-full"
    >
      <Carousel
        className="overflow-y-scroll p-4 bg-[#0e293c]"
        setApi={setApi}
        dir="ltr"
      >
        <CarouselContent className="max-h-[calc(100vh-6rem)]">
          {Array.from({ length: numPages }).map((_, index) => (
            <CarouselItem
              key={index}
              className="rounded-lg overflow-clip"
              page-index={pageNumber}
            >
              <AspectRatio className="bg-gray-300 mx-auto overflow-y-auto flex justify-center scrollbar-show-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400/60 scrollbar-track-gray-200/10 max-h-[calc(100vh-12rem)]">
                <Page
                  pageNumber={index + 1}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </AspectRatio>
            </CarouselItem>
          ))}
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
