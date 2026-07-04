import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function PdfDocumentLoading() {
  return (
    <div className="w-full rounded-lg max-w-350 mx-auto">
      <div className="p-2 sm:p-4 bg-primary rounded-lg">
        <div className="mb-2 flex items-center justify-center gap-3">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        <div className="w-full aspect-video bg-primary-foreground/10 rounded-lg flex flex-col items-center justify-center gap-4">
          <Loader2 className="size-8 text-muted-foreground animate-spin" />
          <div className="flex flex-col items-center gap-2 w-full max-w-[70%]">
            <Skeleton className="h-3 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
          </div>
          <span className="text-xs text-muted-foreground">جاري تحميل المحتوى...</span>
        </div>
      </div>
    </div>
  );
}

export function PdfPageLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-primary-foreground/10">
      <Loader2 className="size-6 text-muted-foreground animate-spin" />
    </div>
  );
}
