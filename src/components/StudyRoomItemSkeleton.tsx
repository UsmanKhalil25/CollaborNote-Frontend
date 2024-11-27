import { Skeleton } from "@/components/ui/skeleton";

export function StudyRoomItemSkeleton() {
  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent">
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <span className="flex h-2 w-2 rounded-full bg-blue-600" />
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <div className="line-clamp-2 text-xs text-muted-foreground">
          <Skeleton className="h-4 w-full" />
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-6 w-16 rounded-full" />
        ))}
      </div>
    </div>
  );
}
