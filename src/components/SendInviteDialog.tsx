import { useState } from "react";
import { Send } from "lucide-react";
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

import UserList from "@/components/UserList";

import useDebounce from "@/hooks/use-debounce";
import { QUERY } from "@/constants";
import { ENDPOINTS } from "@/config/api-config";
import { api } from "@/api";
import { SearchUser } from "@/types/search-user";

interface SearchUserData {
  users: SearchUser[];
}

export function SendInviteDialog() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data: fetchedUsers, isLoading } = useQuery<SearchUser[]>({
    queryKey: [QUERY.USERS, debouncedQuery],
    queryFn: async (): Promise<SearchUser[]> => {
      const response = await api.get<Response<SearchUserData>>(
        ENDPOINTS.users.search(debouncedQuery)
      );
      return response.data.data.users;
    },
    enabled: !!debouncedQuery,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Send className="w-4 h-4 text-mute" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send invite</DialogTitle>
          <DialogDescription>
            Add friends to collaborate with.
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
          <UserList
            users={fetchedUsers}
            isLoading={isLoading}
            searchQuery={searchQuery}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
