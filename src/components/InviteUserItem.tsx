import { UserCheck, UserPlus, Users } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import TooltipContainer from "@/components/TooltipContainer";
import UserInfo from "@/components/UserInfo";

import { api } from "@/api";
import { QUERY } from "@/constants";
import { IInvitationSearchItem } from "@/types/invitation";
import { ENDPOINTS } from "@/config/api-config";

interface InviteUserItemProps {
  user: IInvitationSearchItem;
  searchQuery: string;
}

export function InviteUserItem({ user, searchQuery }: InviteUserItemProps) {
  const queryClient = useQueryClient();
  const { mutate: sendFriendRequest, isPending } = useMutation({
    mutationFn: async (userId: string) => {
      await api.post<Response<null>>(ENDPOINTS.friendRequests.send(userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY.USERS, searchQuery],
      });
    },

    onError: (error) =>
      console.error("Error updating friend request status:", error),
  });

  const handleSendRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendFriendRequest(user.id);
  };

  return (
    <div className="flex items-center justify-between space-x-4">
      <UserInfo
        first_name={user.firstName}
        last_name={user.lastName}
        email={user.email}
        avatar={user.avatar}
      />

      <div>
        {user.isParticipant ? (
          <TooltipContainer label="Already your friend">
            <Button variant="link">
              <Users className="w-5 h-5" />
            </Button>
          </TooltipContainer>
        ) : user.inviteSent ? (
          <TooltipContainer label="Friend request is pending">
            <Button variant="link">
              <UserCheck className="w-5 h-5" />
            </Button>
          </TooltipContainer>
        ) : (
          <Button
            onClick={handleSendRequest}
            variant="secondary"
            disabled={isPending}
          >
            <UserPlus className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
