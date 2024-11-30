import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { ENDPOINTS } from "@/config/api-config";
import { api } from "@/api";
import { AuthContext } from "@/auth/auth-context";

interface LeaveRoomAlertDialogProps {
  isOwner: boolean;
  roomId: string;
}

export function LeaveRoomAlertDialog({
  isOwner,
  roomId,
}: LeaveRoomAlertDialogProps) {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { toast } = useToast();

  const removeOwnerMutationFn = async () => {
    const response = await api.patch<Response<null>>(
      ENDPOINTS.studyRooms.end(roomId)
    );
    return response.data.message;
  };

  const removeParticipantMutationFn = async () => {
    const response = await api.delete<Response<null>>(
      ENDPOINTS.studyRooms.participants.remove(roomId, auth?.user?._id!)
    );
    return response.data.message;
  };

  const { mutate: leaveRoomMutation, isPending } = useMutation({
    mutationFn: isOwner ? removeOwnerMutationFn : removeParticipantMutationFn,
    onSuccess: () => {
      toast({ description: "Left the room successfully" });
      navigate("/");
    },
    onError: (error: AxiosError<Error>) => {
      toast({
        variant: "destructive",
        description: error.response?.data.message,
      });
    },
  });

  const handleLeaveRoom = () => {
    leaveRoomMutation();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Leave</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Leaving the Room</AlertDialogTitle>
          <AlertDialogDescription>
            {isOwner
              ? "As the owner, leaving this room will permanently delete it and remove all participants. This action cannot be undone."
              : "Leaving this room will remove you as a participant. You will not be able to rejoin unless invited again."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleLeaveRoom} disabled={isPending}>
              {isPending && <Loader2 className="animate-spin mr-4" />}
              {isPending ? "Leaving..." : "Leave"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
