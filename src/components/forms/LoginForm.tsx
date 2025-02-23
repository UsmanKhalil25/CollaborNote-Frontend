import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import AuthCard from "@/components/AuthCard.tsx";
import { ENDPOINTS } from "@/config/api-config.ts";
import { api } from "@/api";
import { useAuth } from "@/hooks/use-auth";
import { Response, ErrorResponse } from "@/types/api";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { toast } = useToast();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await api.post<Response<{ access_token: string }>>(
        ENDPOINTS.auth.login,
        data
      );
      return response.data.data.access_token;
    },
    onSuccess: (accessToken) => {
      setToken(accessToken);
      toast({ description: "Login successful" });
      navigate("/", { replace: true });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const responseError = error.response?.data;

      toast({
        variant: "destructive",
        title: "Login failed",
        description: responseError?.message || "An unexpected error occurred",
      });
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginUser(data);
  };

  return (
    <AuthCard
      title="Login"
      description="Enter your email below to login to your account"
      alternativeMessage="Don't have an account?"
      linkText="Sign up"
      linkHref="/register"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4"
          aria-label="Login form"
        >
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
                    autoComplete="current-password"
                    disabled={isPending}
                    aria-describedby="password-error"
                  />
                </FormControl>
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
              <span className="animate-pulse">Logging in...</span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
