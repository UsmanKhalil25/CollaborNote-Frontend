import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";

import { useToast } from "@/hooks/use-toast.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

import AuthCard from "@/components/AuthCard.tsx";

import { convertCamelCaseToSnakeCase } from "@/lib/utils.ts";
import { ENDPOINTS } from "@/config/api-config.ts";
import { Loader2 } from "lucide-react";
import { api } from "@/api";
import { AxiosError } from "axios";

const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const defaultValues: Partial<RegisterFormValues> = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function RegisterForm() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      const transformedData = convertCamelCaseToSnakeCase(data);
      const response = await api.post<Response<null>>(
        ENDPOINTS.auth.register,
        transformedData
      );
      return response.data.message;
    },
    onSuccess: (message: string) => {
      toast({ description: message });
      navigate("/login");
    },
    onError: (error: AxiosError<Error>) => {
      toast({
        variant: "destructive",
        description: error.response?.data.message,
      });
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    mutate(data);
  };

  return (
    <AuthCard
      title="Sign Up"
      description="Enter your information to create an account"
      alternativeMessage="Already have an account?"
      linkText="Sign in"
      linkHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstName">First name</FormLabel>
                  <FormControl>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Max"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lastName">Last name</FormLabel>
                  <FormControl>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Robinson"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel htmlFor="password">Password</FormLabel>
                </div>
                <FormControl>
                  <Input id="password" type="password" required {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin mr-4" />}
            {isPending ? "Signing up..." : "Sign up"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
