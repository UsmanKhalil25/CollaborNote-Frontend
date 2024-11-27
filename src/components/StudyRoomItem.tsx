import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { IStudyRoomListingOut } from "@/types/study-room";
import { Badge } from "@/components/ui/badge";

interface StudyRoomItemProps {
  studyRoom: IStudyRoomListingOut;
}

export function StudyRoomItem({ studyRoom }: StudyRoomItemProps) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent">
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{studyRoom.name}</div>
            {true && <span className="flex h-2 w-2 rounded-full bg-blue-600" />}
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(studyRoom.created_at), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="line-clamp-2 text-xs text-muted-foreground">
          {studyRoom.description.substring(0, 300)}
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {studyRoom.participants.map((participant) => (
          <Badge key={participant.user_id}>{participant.first_name}</Badge>
        ))}
      </div>
    </div>
  );
}
