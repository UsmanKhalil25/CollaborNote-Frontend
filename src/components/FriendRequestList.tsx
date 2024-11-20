import { MouseEvent } from "react";
import { Check, Ban, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

import ListCard from "@/components/ListCard";
import UserInfoSkeleton from "@/components/UserInfoSkeleton";
import UserInfo from "@/components/UserInfo";

import { api } from "@/api";
import { ENDPOINTS } from "@/config/api-config.ts";
import { FriendRequest } from "@/types/friend-request";
import { QUERY } from "@/constants";

interface FriendRequestData {
  friend_requests: FriendRequest[];
}

export default function FriendRequestList() {
  const TITLE = "Pending Friend Requests";
  const DESCRIPTION = "Review and respond to friend requests.";

  const { data, error, isLoading } = useQuery<FriendRequest[]>({
    queryKey: [QUERY.FRIEND_REQUESTS],
    queryFn: async (): Promise<FriendRequest[]> => {
      const response = await api.get<Response<FriendRequestData>>(
        ENDPOINTS.friendRequests.index("pending")
      );
      return response.data.data.friend_requests;
    },
  });

  if (isLoading) {
    return (
      <ListCard title={TITLE} description={DESCRIPTION}>
        <ScrollArea className="h-80 overflow-y-auto">
          <div className="flex flex-col gap-2 p-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <UserInfoSkeleton key={index} />
            ))}
          </div>
        </ScrollArea>
      </ListCard>
    );
  }

  if (error) {
    <ListCard title={TITLE} description={DESCRIPTION}>
      <div className="h-72 flex justify-center items-center">
        <p className="text-destructive-foreground">
          Error loading friend requests.
        </p>
        ;
      </div>
    </ListCard>;
  }

  if (data?.length === 0) {
    return (
      <ListCard title={TITLE} description={DESCRIPTION}>
        <div className="h-72 flex justify-center items-center">
          <p className="text-muted-foreground">You have no friend requests.</p>
        </div>
      </ListCard>
    );
  }

  return (
    <ListCard title={TITLE} description={DESCRIPTION}>
      <ScrollArea className="h-80 overflow-y-auto">
        <div className="flex flex-col gap-2 p-4">
          {data?.map((friendRequest) => (
            <FriendRequestItem
              key={friendRequest._id}
              friendRequest={friendRequest}
            />
          ))}
        </div>
      </ScrollArea>
    </ListCard>
  );
}

interface FriendRequestProps {
  friendRequest: FriendRequest;
}

function FriendRequestItem({ friendRequest }: FriendRequestProps) {
  const queryClient = useQueryClient();
  const { _id, sender } = friendRequest;
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
    <div className="flex items-center justify-between space-x-4">
      <UserInfo
        first_name={first_name}
        last_name={last_name}
        email={email}
        avatar={avatar}
      />

      <div className="flex items-center gap-2">
        <Button
          onClick={(e) => handleRequestAction(e, "accepted")}
          variant="secondary"
          disabled={isPending}
        >
          <Check className="w-5 h-5" />
        </Button>
        <Button
          onClick={(e) => handleRequestAction(e, "rejected")}
          variant="secondary"
          disabled={isPending}
        >
          <Ban className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
