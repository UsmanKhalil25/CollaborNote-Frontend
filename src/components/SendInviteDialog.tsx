import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import useDebounce from "@/hooks/use-debounce";
import { QUERY } from "@/constants";
import { ENDPOINTS } from "@/config/api-config";
import { api } from "@/api";
import { IInvitationSearchItem } from "@/types/invitation";
import InviteUserList from "./InviteUserList";
import { convertToCamelCase } from "@/lib/utils";

interface SendInviteDialogProps {
  roomId: string;
}

export function SendInviteDialog({ roomId }: SendInviteDialogProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data: fetchedUsers, isLoading } = useQuery({
    queryKey: [QUERY.STUDY_ROOMS, debouncedQuery],
    queryFn: async () => {
      const response = await api.get<
        Response<{ users: IInvitationSearchItem[] }>
      >(ENDPOINTS.studyRooms.search(roomId, debouncedQuery));
      const data = response.data.data.users;
      return convertToCamelCase(data);
    },
    enabled: !!debouncedQuery,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2" variant="outline">
          Send Invite
          <UserPlus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send invite</DialogTitle>
          <DialogDescription>
            Invite your friends to collaborate with.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            id="search"
            placeholder="Enter email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="h-72 flex justify-center items-start">
          <InviteUserList
            users={fetchedUsers}
            isLoading={isLoading}
            searchQuery={searchQuery}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
