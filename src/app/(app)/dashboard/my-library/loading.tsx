import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseLoading() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Skeleton className="size-7 rounded-md" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden py-0 shadow-none">
            <div className="relative aspect-video w-full overflow-hidden">
              <Skeleton className="h-full w-full rounded-none bg-background" />
              <Skeleton className="absolute bottom-2 start-2 h-5 w-14 rounded-full" />
            </div>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-3/4" />
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
