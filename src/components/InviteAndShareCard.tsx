import { useContext, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { TooltipContainer } from "@/components/TooltipContainer";

import { ParticipantOut } from "@/types/participant";
import { getUserInitials } from "@/lib/utils";
import { AuthContext } from "@/auth/auth-context";

interface InviteAndShareCardProps {
  roomId: string;
  participants: ParticipantOut[];
}

export default function InviteAndShareCard({
  roomId,
  participants,
}: InviteAndShareCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const auth = useContext(AuthContext);

  const handleCopyLink = () => {
    const link = `http://localhost:5173/study-rooms?to=${roomId}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const isCurrentUserOwner = (): boolean => {
    return participants.some(
      (participant) => participant.userId === auth?.user?._id
    );
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Share this document</CardTitle>
        <CardDescription>
          Anyone with the link can view this document.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            value={`http://localhost:5173/study-rooms?to=${roomId}`}
            readOnly
          />
          <Button
            variant="secondary"
            className="shrink-0"
            onClick={handleCopyLink}
          >
            {isCopied ? "Copied!" : "Copy Link"}
          </Button>
        </div>

        <Separator className="my-4" />
        <div className="space-y-4">
          <div className="text-sm font-medium">People with access</div>
          <div className="grid gap-6">
            {participants.map((participant) => (
              <div
                key={participant.email}
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {getUserInitials(
                        participant.firstName,
                        participant.secondName
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none">
                        {participant.firstName}
                      </p>

                      {participant.isOwner && (
                        <TooltipContainer label="Owner">
                          <span className="flex h-2 w-2 rounded-full bg-blue-600 cursor-pointer" />
                        </TooltipContainer>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {participant.email}
                    </p>
                  </div>
                </div>
                {isCurrentUserOwner() && (
                  <Select
                    defaultValue={participant.permission}
                    disabled={participant.isOwner}
                  >
                    <SelectTrigger className="ml-auto w-[110px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="can_edit">Can edit</SelectItem>
                      <SelectItem value="can_view">Can view</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
