import { z } from "zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

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

import { AuthContext } from "@/auth/auth-context.ts";
import { ENDPOINTS } from "@/config/api-config.ts";
import { api } from "@/api";
import { AxiosError } from "axios";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const defaultValues: Partial<LoginFormValues> = {
  email: "",
  password: "",
};

interface LoginData {
  access_token: string;
}

export default function LoginForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const { mutate:loginUser, isPending } = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await api.post<Response<LoginData>>(
        ENDPOINTS.auth.login,
        data
      );
      return response.data.data.access_token;
    },
    onSuccess: (accessToken: string) => {
      auth?.setToken(accessToken);

      toast({
        description: "Login successful",
      });
      navigate("/");
    },
    onError: (error: AxiosError<Error>) => {
      const errorMessage = error.response?.data.message || error.message;

      toast({
        variant: "destructive",
        description: errorMessage,
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input id="password" type="password" required {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
