import { Users } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import InviteAndShareCard from "@/components/InviteAndShareCard";

import { ParticipantOut } from "@/types/participant";

interface InviteAndShareTriggerProps {
  roomId: string;
  participants: ParticipantOut[];
}

export function InviteAndShareTrigger({
  roomId,
  participants,
}: InviteAndShareTriggerProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Users className="w-4 h-4 text-mute" />
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <InviteAndShareCard roomId={roomId} participants={participants} />
      </PopoverContent>
    </Popover>
  );
}
