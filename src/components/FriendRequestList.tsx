import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { ENDPOINTS } from "@/config/api-config.ts";
import { AxiosResponse } from "axios";
import { FriendRequest } from "@/types/friend-request";
import { getUserInitials } from "@/lib/utils.ts";

type FriendRequestResponse = AxiosResponse<{
  data: { friend_requests: FriendRequest[] };
}>;

export default function FriendRequestList() {
  const { data, error, isLoading } = useQuery<FriendRequest[]>({
    queryKey: ["friend-requests"],
    queryFn: async () => {
      const response: FriendRequestResponse = await api.get(
        ENDPOINTS.friendRequests.index,
      );
      return response.data.data.friend_requests;
    },
  });

  if (error) return <p>Error loading friend requests</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Friend Requests</CardTitle>
        <CardDescription>Connect with new people</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80 overflow-y-auto">
          <div className="flex flex-col gap-2 p-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <FriendRequestSkeleton key={index} />
                ))
              : data?.map((friendRequest, index) => (
                  <FriendRequestItem
                    key={index}
                    friendRequest={friendRequest}
                  />
                ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

interface FriendRequestProps {
  friendRequest: FriendRequest;
}

export function FriendRequestItem({ friendRequest }: FriendRequestProps) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={friendRequest.sender.avatar} />
          <AvatarFallback>
            {getUserInitials(
              friendRequest.sender.first_name,
              friendRequest.sender.last_name,
            )}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">
            {friendRequest.sender.first_name} {friendRequest.sender.last_name}
          </p>
          <p className="text-sm text-muted-foreground">
            {friendRequest.sender.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FriendRequestSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
