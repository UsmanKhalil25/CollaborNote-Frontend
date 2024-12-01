import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import { Ban, Check } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { TooltipContainer } from "@/components/TooltipContainer";

import { api } from "@/api";
import { IInvitationListingOut } from "@/types/invitation";
import { ENDPOINTS } from "@/config/api-config.ts";
import { QUERY } from "@/constants";
import { timeAgo } from "@/lib/utils";

interface InvitationItemProps {
  invitation: IInvitationListingOut;
}

export function InvitationItem({ invitation }: InvitationItemProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: addParticipantMutation } = useMutation({
    mutationFn: async () => {
      await api.post(
        ENDPOINTS.studyRooms.participants.add(invitation.studyRoomId)
      );
    },
    onSuccess: () => {
      const roomId = invitation.studyRoomId;
      navigate(`/study-rooms/verify/${roomId}`);
    },

    onError: (error) => console.error("Error adding participant:", error),
  });

  const { mutate: updateFriendRequest, isPending } = useMutation({
    mutationFn: async ({
      invitation_id,
      newStatus,
    }: {
      invitation_id: string;
      newStatus: string;
    }) => {
      await api.patch(
        ENDPOINTS.invitations.updateStatus(invitation_id, newStatus)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY.INVITATIONS],
      });
      addParticipantMutation();
    },

    onError: (error) =>
      console.error("Error updating invitation status:", error),
  });

  const handleRequestAction = (
    e: MouseEvent<HTMLButtonElement>,
    status: string
  ) => {
    e.preventDefault();
    updateFriendRequest({ invitation_id: invitation.id, newStatus: status });
  };

  return (
    <TooltipContainer label={`Received ${timeAgo(invitation.createdAt)}`}>
      <div className="flex items-center justify-between space-x-4 cursor-pointer">
        <div className="flex flex-col gap-2 items-start">
          <div className="font-semibold">{invitation.studyRoomInfo.name}</div>
          <div className="flex gap-3 overflow-x-auto">
            {invitation.studyRoomInfo.participants.map((participant) => (
              <Badge key={participant.userId}>{participant.firstName}</Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={(e) => handleRequestAction(e, "accepted")}
            variant="outline"
            disabled={isPending}
          >
            <Check className="w-4 h-4" />
          </Button>
          <Button
            onClick={(e) => handleRequestAction(e, "rejected")}
            variant="outline"
            disabled={isPending}
          >
            <Ban className="w-4 h-4 " />
          </Button>
        </div>
      </div>
    </TooltipContainer>
  );
}
