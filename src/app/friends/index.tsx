import { useState } from "react";

import { TypographyH2 } from "@/components/ui/typography-h2.tsx";

import { AddFriendDialog } from "@/components/AddFriendDialog";
import { ListCard } from "@/components/ListCard";
import { FriendRequestItem } from "@/components/FriendRequestItem";

import { FriendRequest } from "@/types/friend-request";
import { QUERY } from "@/constants";
import { api } from "@/api";
import { ENDPOINTS } from "@/config/api-config";
import { User } from "@/types/user";
import { FriendItem } from "@/components/FriendItem";

export default function FriendsPage() {
  const [showOnlineOnly, setShowOnlineOnly] = useState<boolean>(false);

  const handleToggleFilter = (value: boolean) => {
    setShowOnlineOnly(value);
  };

  return (
    <div className="h-full space-y-4">
      <div className="flex justify-between items-center">
        <TypographyH2 text={"Manage your Friends"} />
        <AddFriendDialog />
      </div>
      <div className="h-[85%] grid gap-4 md:grid-cols-2 ">
        <ListCard<User>
          title="Friend List"
          description="View your friends and their online status."
          queryKey={[QUERY.FRIENDS]}
          queryFn={async () => {
            const response = await api.get<Response<{ friends: User[] }>>(
              ENDPOINTS.users.friends
            );
            return response.data.data.friends;
          }}
          listItem={(friend: User) => (
            <FriendItem key={friend._id} friend={friend} />
          )}
          filter={{
            label: "Online",
            showFilteredOnly: showOnlineOnly,
            setShowFilteredOnly: handleToggleFilter,
            filterFn: (friend: User) => friend.isOnline ?? false,
          }}
          emptyMessage="You have no friends."
          filterEmptyMessage="No online friend."
        />
        <ListCard<FriendRequest>
          title="Pending Friend Requests"
          description="Review and respond to friend requests."
          queryKey={[QUERY.FRIEND_REQUESTS]}
          queryFn={async () => {
            const response = await api.get<
              Response<{ friend_requests: FriendRequest[] }>
            >(ENDPOINTS.friendRequests.index("pending"));
            return response.data.data.friend_requests;
          }}
          listItem={(request: FriendRequest) => (
            <FriendRequestItem key={request._id} friendRequest={request} />
          )}
          emptyMessage="You have no friend requests."
        />
      </div>
    </div>
  );
}
