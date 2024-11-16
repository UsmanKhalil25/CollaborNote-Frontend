import { RecentActivity } from "@/types/activity";
import { ScrollArea } from "@/components/ui/scroll-area";
import RecentActivityItem from "@/components/RecentActivityItem.tsx";

interface RecentActivityListProps {
  items: RecentActivity[];
}

export function RecentActivityList({ items }: RecentActivityListProps) {
  return (
    <ScrollArea className="h-80 overflow-y-auto">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <RecentActivityItem key={item.id} item={item} />
        ))}
      </div>
    </ScrollArea>
  );
}
