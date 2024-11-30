import { Badge } from "@/components/ui/badge";

import { IStudyRoomListing } from "@/types/study-room";
import { timeAgo } from "@/lib/utils";

interface StudyRoomItemProps {
  studyRoom: IStudyRoomListing;
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
            {timeAgo(studyRoom.createdAt)}
          </div>
        </div>
        <div className="line-clamp-2 text-xs text-muted-foreground">
          {studyRoom.description.substring(0, 300)}
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {studyRoom.participants.map((participant, index) => (
          <Badge key={index}>{participant.firstName}</Badge>
        ))}
      </div>
    </div>
  );
}
