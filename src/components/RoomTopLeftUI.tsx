import { useContext } from "react";
import { RoomAccessControlTrigger } from "@/components/RoomAccessControlTrigger";
import { SendRoomInviteDialog } from "@/components/SendRoomInviteDialog";

import { IStudyRoomDetail } from "@/types/study-room";
import { LeaveRoomAlertDialog } from "./LeaveRoomAlertDialog";
import { AuthContext } from "@/auth/auth-context";
import { isUserRoomOwner } from "@/lib/utils";

interface RoomTopLeftUIProps {
  room: IStudyRoomDetail;
  onRoomEnd: () => void;
  roomEnded: boolean;
}
export function RoomTopLeftUI({
  room,
  onRoomEnd,
  roomEnded,
}: RoomTopLeftUIProps) {
  const auth = useContext(AuthContext);
  return (
    <div className="flex items-center gap-4">
      <RoomAccessControlTrigger
        roomId={room.id}
        participants={room?.participants}
      />
      <SendRoomInviteDialog roomId={room?.id} />
      <LeaveRoomAlertDialog
        isOwner={isUserRoomOwner(auth?.user?._id, room.participants)}
        roomId={room.id}
        onRoomEnd={onRoomEnd}
        roomEnded={roomEnded}
      />
    </div>
  );
}
