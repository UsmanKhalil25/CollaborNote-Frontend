import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

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
import { LoadingText } from "../ui/loading-text";

import AuthCard from "@/components/AuthCard.tsx";

import { ENDPOINTS } from "@/config/api-config.ts";
import { api } from "@/api";

import { convertCamelCaseToSnakeCase } from "@/lib/utils.ts";
import { Response, ErrorResponse } from "@/types/api";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      const transformedData = convertCamelCaseToSnakeCase(data);
      const response = await api.post<Response<null>>(
        ENDPOINTS.auth.register,
        transformedData
      );
      return response.data.message;
    },
    onSuccess: (message) => {
      toast({ description: message });
      navigate("/login", { replace: true });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const responseError = error.response?.data;

      toast({
        variant: "destructive",
        title: "Registration failed",
        description: responseError?.message || "An unexpected error occurred",
      });
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerUser(data);
  };

  return (
    <AuthCard
      title="Create Account"
      description="Enter your information to get started"
      alternativeMessage="Already have an account?"
      linkText="Sign in"
      linkHref="/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4"
          aria-label="Registration form"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Max"
                      autoComplete="given-name"
                      disabled={isPending}
                      aria-describedby="firstName-error"
                    />
                  </FormControl>
                  <FormMessage id="firstName-error" className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Robinson"
                      autoComplete="family-name"
                      disabled={isPending}
                      aria-describedby="lastName-error"
                    />
                  </FormControl>
                  <FormMessage id="lastName-error" className="text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="email"
                    disabled={isPending}
                    aria-describedby="email-error"
                  />
                </FormControl>
                <FormMessage id="email-error" className="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="new-password"
                    disabled={isPending}
                    aria-describedby="password-error"
                  />
                </FormControl>
                <p className="text-muted-foreground text-sm mt-1">
                  Minimum 6 characters
                </p>
                <FormMessage id="password-error" className="text-red-600" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            aria-live="polite"
          >
            {isPending ? (
              <LoadingText text="Creating Account..." />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
