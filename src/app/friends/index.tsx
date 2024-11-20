import { TypographyH2 } from "@/components/ui/typography-h2.tsx";
import FriendList from "@/components/FriendList.tsx";
import FriendRequestList from "@/components/FriendRequestList.tsx";
import AddFriendDialogue from "@/components/AddFriendDialogue.tsx";

export default function FriendsPage() {
  return (
    <div className="h-full space-y-4">
      <div className="flex justify-between items-center">
        <TypographyH2 text={"Manage your Friends"} />
        <AddFriendDialogue />
      </div>
      <div className="grid gap-4 md:grid-cols-2 ">
        <FriendList />
        <FriendRequestList />
      </div>
    </div>
  );
}
