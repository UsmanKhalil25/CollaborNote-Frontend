import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { StudyRoom } from "@/types/study-room";
import { Badge } from "@/components/ui/badge";

interface StudyRoomItemProps {
  item: StudyRoom;
}

export function StudyRoomItem({ item }: StudyRoomItemProps) {
  return (
    <div
      key={item.id}
      className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{item.name}</div>
            {true && <span className="flex h-2 w-2 rounded-full bg-blue-600" />}
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(item.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="line-clamp-2 text-xs text-muted-foreground">
          {item.description.substring(0, 300)}
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {item.participants.map((item) => (
          <Badge>{item.firstName}</Badge>
        ))}
      </div>
    </div>
  );
}
