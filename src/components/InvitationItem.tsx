import { MouseEvent } from "react";
import { Ban, Check } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";

import TooltipContainer from "@/components/TooltipContainer";

import { api } from "@/api";
import { IInvitationListingOut } from "@/types/invitation";
import { ENDPOINTS } from "@/config/api-config.ts";
import { QUERY } from "@/constants";
import { timeAgo } from "@/lib/utils";
import { Button } from "./ui/button";

interface InvitationItemProps {
  invitation: IInvitationListingOut;
}

export function InvitationItem({ invitation }: InvitationItemProps) {
  const queryClient = useQueryClient();

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
    },

    onError: (error) =>
      console.error("Error updating friend request status:", error),
  });

  const handleRequestAction = (
    e: MouseEvent<HTMLButtonElement>,
    status: string
  ) => {
    e.preventDefault();
    updateFriendRequest({ invitation_id: invitation.id, newStatus: status });
  };

  const numberOfParticipants = () => {
    return invitation.studyRoomInfo.participants.length - 1;
  };

  return (
    <TooltipContainer label={`Received ${timeAgo(invitation.createdAt)}`}>
      <div className="flex items-center justify-between space-x-4 cursor-pointer">
        <div className="flex flex-col gap-2 items-start">
          <div className="font-semibold">{invitation.studyRoomInfo.name}</div>
          <div className="flex gap-3 overflow-x-auto">
            <Badge>{invitation.inviterUserInfo.firstName}</Badge>
            {numberOfParticipants() && <Badge>+{numberOfParticipants()}</Badge>}
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
