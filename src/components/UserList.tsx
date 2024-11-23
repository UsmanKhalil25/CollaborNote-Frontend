import { ScrollableContainer } from "./ScrollableContainer";
import { UserItem } from "@/components/UserItem";
import UserInfoSkeleton from "@/components/UserInfoSkeleton";

import { SearchUser } from "@/types/search-user";

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
      {users.map((friend) => (
        <UserItem key={friend.id} user={friend} searchQuery={searchQuery} />
      ))}
    </ScrollableContainer>
  );
}
