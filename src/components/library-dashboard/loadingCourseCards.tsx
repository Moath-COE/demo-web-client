import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseLoading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
      <div className="space-y-2">
        <Skeleton className="h-2 w-32" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="relative overflow-hidden">
            <div className="relative w-full aspect-video">
              <Skeleton className="w-full h-full bg-background" />
              <Skeleton className="absolute bottom-2 start-2 h-5 w-14 rounded-full" />
            </div>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-px w-full mb-3" />
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
