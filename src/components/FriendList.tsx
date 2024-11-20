import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

import ListCard from "@/components/ListCard";
import UserInfoSkeleton from "@/components/UserInfoSkeleton";
import UserInfo from "@/components/UserInfo";

import { api } from "@/api";
import { ENDPOINTS } from "@/config/api-config.ts";
import { User } from "@/types/user";
import { QUERY } from "@/constants";

interface FriendData {
  friends: User[];
}

export default function FriendList() {
  const TITLE = "Friend List";
  const DESCRIPTION = "View your friends and their online status.";

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: [QUERY.FRIENDS],
    queryFn: async (): Promise<User[]> => {
      const response = await api.get<Response<FriendData>>(
        ENDPOINTS.users.friends
      );
      return response.data.data.friends;
    },
  });

  const filteredFriends = data?.filter((friend) =>
    showOnlineOnly ? friend.isOnline : true
  );

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
    return (
      <ListCard title={TITLE} description={DESCRIPTION}>
        <div className="h-72 flex justify-center items-center">
          <p className="text-destructive-foreground">
            Error loading friend requests.
          </p>
        </div>
      </ListCard>
    );
  }

  if (data?.length === 0) {
    return (
      <ListCard title={TITLE} description={DESCRIPTION}>
        <div className="h-72 flex justify-center items-center">
          <p className="text-muted-foreground">You have no friends.</p>
        </div>
      </ListCard>
    );
  }

  return (
    <ListCard
      title={TITLE}
      description={DESCRIPTION}
      showFilter={true}
      filterLabel={"Online"}
      showFilteredOnly={showOnlineOnly}
      setShowFilteredOnly={setShowOnlineOnly}
    >
      <ScrollArea className="h-80 overflow-y-auto">
        <div className="flex flex-col gap-2 p-4">
          {filteredFriends?.map((friend) => (
            <FriendItem key={friend._id} friend={friend} />
          ))}
        </div>
      </ScrollArea>
    </ListCard>
  );
}

interface FriendItemProps {
  friend: User;
}

function FriendItem({ friend }: FriendItemProps) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <UserInfo
        first_name={friend.first_name}
        last_name={friend.last_name}
        email={friend.email}
        avatar={friend.avatar}
      />
      <Badge>{friend.isOnline ? "Online" : "Offline"}</Badge>
    </div>
  );
}
