import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { RecentActivity } from "@/types/activity";

interface RecentActivityItemProps {
  item: RecentActivity;
}

export default function RecentActivityItem({ item }: RecentActivityItemProps) {
  return (
    <div
      key={item.id}
      className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{item.name}</div>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(item.date), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="text-xs font-medium">{item.subject}</div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {item.text.substring(0, 300)}
      </div>
    </div>
  );
}
