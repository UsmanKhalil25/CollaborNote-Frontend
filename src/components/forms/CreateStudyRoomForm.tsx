import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

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

const studyRoomSchema = z.object({
  name: z
    .string()
    .min(3, "Room name is required and must have at least 3 characters"),
  description: z
    .string()
    .min(5, "Description is required and must have at least 5 characters"),
});

export type CreateStudyRoomFormValues = z.infer<typeof studyRoomSchema>;

interface CreateStudyRoomFormProps {
  onSubmit: (data: CreateStudyRoomFormValues) => void;
  isPending: boolean;
}

export function CreateStudyRoomForm({
  onSubmit,
  isPending,
}: CreateStudyRoomFormProps) {
  const form = useForm<CreateStudyRoomFormValues>({
    resolver: zodResolver(studyRoomSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  return (
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
  );
}
