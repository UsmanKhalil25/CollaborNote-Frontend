import { UserPlus, UserCheck, Users } from "lucide-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

import UserInfoSkeleton from "@/components/UserInfoSkeleton";
import UserInfo from "@/components/UserInfo";
import TooltipWrapper from "@/components/TooltipWrapper";

import { api } from "@/api";
import { ENDPOINTS } from "@/config/api-config";
import { SearchUser } from "@/types/search-user";
import { QUERY } from "@/constants";

interface UserListProps {
  users?: SearchUser[];
  isLoading: boolean;
  searchQuery: string;
}

export default function UserList({
  users,
  isLoading,
  searchQuery,
}: UserListProps) {
  if (!searchQuery) {
    return (
      <div className="h-72 flex justify-center items-center">
        <p className="text-muted-foreground">
          Please enter a search term to begin.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <ScrollArea className="h-80 overflow-y-auto">
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 5 }, (_, index) => (
            <UserInfoSkeleton key={index} />
          ))}
        </div>
      </ScrollArea>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="h-72 flex justify-center items-center">
        <p className="text-muted-foreground">
          No users match your search criteria.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-80 overflow-y-auto w-full">
      <div className="flex flex-col gap-2 p-4 w-full">
        {users.map((friend) => (
          <UserItem key={friend.id} user={friend} searchQuery={searchQuery} />
        ))}
      </div>
    </ScrollArea>
  );
}

interface UserItemProps {
  user: SearchUser;
  searchQuery: string;
}

function UserItem({ user, searchQuery }: UserItemProps) {
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
        first_name={user.first_name}
        last_name={user.last_name}
        email={user.email}
        avatar={user.avatar}
      />

      <div>
        {user.is_friend ? (
          <TooltipWrapper label="Already your friend">
            <Button variant="link">
              <Users className="w-5 h-5" />
            </Button>
          </TooltipWrapper>
        ) : user.friend_request_sent ? (
          <TooltipWrapper label="Friend request is pending">
            <Button variant="link">
              <UserCheck className="w-5 h-5" />
            </Button>
          </TooltipWrapper>
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
