import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { HousePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  CreateStudyRoomForm,
  CreateStudyRoomFormValues,
} from "@/components/forms/CreateStudyRoomForm";

import { api } from "@/api";
import { ENDPOINTS } from "@/config/api-config";
import { StudyRoom } from "@/types/study-room";

export function CreateStudyRoomDialog() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateStudyRoomFormValues) => {
      const response = await api.post<Response<{ study_room: StudyRoom }>>(
        ENDPOINTS.studyRooms.create,
        data
      );
      return response.data.data.study_room;
    },
    onSuccess: (roomData: StudyRoom) => {
      const roomId = roomData.id;
      navigate(`/study-rooms/verify/${roomId}`);
    },
    onError: (error: AxiosError<Error>) => {
      const errorMessage = error.response?.data.message || error.message;
      toast({
        variant: "destructive",
        description: errorMessage,
      });
    },
  });

  const onSubmit = (data: CreateStudyRoomFormValues) => {
    mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2" variant="outline">
          Create Study Room
          <HousePlus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Study Room</DialogTitle>
          <DialogDescription>
            Provide the name and description to create a new study room.
          </DialogDescription>
        </DialogHeader>
        <CreateStudyRoomForm onSubmit={onSubmit} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
}
