import { MouseEvent } from "react";
import { Check, Ban } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import UserInfo from "@/components/UserInfo";

import { api } from "@/api";
import { ENDPOINTS } from "@/config/api-config.ts";
import { FriendRequest } from "@/types/friend-request";
import { QUERY } from "@/constants";
import TooltipContainer from "./TooltipContainer";
import { timeAgo } from "@/lib/utils";

interface FriendRequestProps {
  friendRequest: FriendRequest;
}

export function FriendRequestItem({ friendRequest }: FriendRequestProps) {
  const queryClient = useQueryClient();
  const { _id, sender, created_at } = friendRequest;
  const { first_name, last_name, email, avatar } = sender;

  const { mutate: updateFriendRequest, isPending } = useMutation({
    mutationFn: async ({
      requestId,
      newStatus,
    }: {
      requestId: string;
      newStatus: string;
    }) => {
      await api.patch(
        ENDPOINTS.friendRequests.updateStatus(requestId, newStatus)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY.FRIEND_REQUESTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY.FRIENDS],
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
    updateFriendRequest({ requestId: _id, newStatus: status });
  };

  return (
    <TooltipContainer label={`Received ${timeAgo(created_at)}`}>
      <div className="flex items-center justify-between space-x-4 cursor-pointer">
        <UserInfo
          first_name={first_name}
          last_name={last_name}
          email={email}
          avatar={avatar}
        />

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
