import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge.tsx";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { getUserInitials } from "@/lib/utils.ts";
import { api } from "@/api";
import { ENDPOINTS } from "@/config/api-config.ts";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { User } from "@/types/user";

type FriendResponse = AxiosResponse<Response<{ friends: User[] }>>;

export default function FriendList() {
  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ["friends"],
    queryFn: async () => {
      const response: FriendResponse = await api.get(ENDPOINTS.users.friends);
      return response.data.data.friends;
    },
  });

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  if (error) return <p>Error loading friends</p>;

  const filteredFriends = data?.filter((friend) =>
    showOnlineOnly ? friend.isOnline : true,
  );

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <CardTitle>Your Friends</CardTitle>
          <CardDescription>Check who is online</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="online-filter"
            checked={showOnlineOnly}
            onCheckedChange={setShowOnlineOnly}
          />
          <Label htmlFor="online-filter">Online</Label>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80 overflow-y-auto">
          <div className="flex flex-col gap-2 p-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <FriendItemSkeleton key={index} />
                ))
              : filteredFriends?.map((friend, index) => (
                  <FriendItem key={index} friend={friend} />
                ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

interface FriendItemProps {
  friend: User;
}

export function FriendItem({ friend }: FriendItemProps) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={friend.avatar} />
          <AvatarFallback>
            {getUserInitials(friend.first_name, friend.last_name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">
            {friend.first_name} {friend.last_name}
          </p>
          <p className="text-sm text-muted-foreground">{friend.email}</p>
        </div>
      </div>
      <Badge variant="destructive">
        {friend.isOnline ? "Online" : "Offline"}
      </Badge>
    </div>
  );
}

export function FriendItemSkeleton() {
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
