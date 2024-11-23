import UserInfo from "@/components/UserInfo";
import { Badge } from "@/components/ui/badge";

import { User } from "@/types/user";

interface FriendItemProps {
  friend: User;
}

export function FriendItem({ friend }: FriendItemProps) {
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
