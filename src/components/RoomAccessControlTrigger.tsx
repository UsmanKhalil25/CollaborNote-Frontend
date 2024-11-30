import { Users } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import InviteAndShareCard from "@/components/InviteAndShareCard";

import { ParticipantOut } from "@/types/participant";
import { Button } from "./ui/button";

interface RoomAccessControlTriggerProps {
  roomId: string;
  participants: ParticipantOut[];
}

export function RoomAccessControlTrigger({
  roomId,
  participants,
}: RoomAccessControlTriggerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-2" variant="outline">
          <Users className="w-4 h-4 text-mute" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <InviteAndShareCard roomId={roomId} participants={participants} />
      </PopoverContent>
    </Popover>
  );
}
