import { z } from "zod";
import { HousePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import { ENDPOINTS } from "@/config/api-config";
import { StudyRoom } from "@/types/study-room";
import { AxiosError } from "axios";

const studyRoomSchema = z.object({
  name: z
    .string()
    .min(3, "Room name is required and must have at least 3 characters"),
  description: z
    .string()
    .min(5, "Description is required and must have at least 5 characters"),
});

type CreateStudyRoomFormValues = z.infer<typeof studyRoomSchema>;

export function CreateStudyRoomDialog() {
  const form = useForm<CreateStudyRoomFormValues>({
    resolver: zodResolver(studyRoomSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateStudyRoomFormValues) => {
      const response = await api.post<Response<{ study_room: StudyRoom }>>(
        ENDPOINTS.auth.login,
        data
      );
      return response.data.data.study_room;
    },
    onSuccess: (roomData: StudyRoom) => {},
    onError: (error: AxiosError<Error>) => {
      const errorMessage = error.response?.data.message || error.message;
    },
  });

  function onSubmit(data: CreateStudyRoomFormValues) {
    mutate(data);
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
