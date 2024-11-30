import { ScrollableContainer } from "./ScrollableContainer";
import UserInfoSkeleton from "@/components/UserInfoSkeleton";

import { IInvitationSearchItem } from "@/types/invitation";
import { InviteUserItem } from "./InviteUserItem";

interface InviteUserListProps {
  users?: IInvitationSearchItem[];
  roomId: string;
  isLoading: boolean;
  searchQuery: string;
}

export default function InviteUserList({
  users,
  roomId,
  isLoading,
  searchQuery,
}: InviteUserListProps) {
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
      <ScrollableContainer>
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 5 }, (_, index) => (
            <UserInfoSkeleton key={index} />
          ))}
        </div>
      </ScrollableContainer>
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
    <ScrollableContainer>
      {users.map((user) => (
        <InviteUserItem
          key={user.id}
          roomId={roomId}
          user={user}
          searchQuery={searchQuery}
        />
      ))}
    </ScrollableContainer>
  );
}
