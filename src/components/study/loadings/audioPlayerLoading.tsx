import { Skeleton } from "@/components/ui/skeleton";

export default function AudioPlayerLoading() {
  return (
    <div className=" border-border space-y-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-full rounded-lg" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
      <Skeleton className="h-1.5 w-full rounded-md" />
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-muted-foreground">جاري التحميل</span>
        <Skeleton className="h-1.5 w-3.5 rounded-md" />
      </div>
    </div>
  );
}
