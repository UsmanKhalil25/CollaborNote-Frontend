import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { LoadingText } from "@/components/ui/loading-text";

import AuthCard from "@/components/AuthCard.tsx";

import { useToast } from "@/hooks/use-toast.ts";
import { useLoginUser } from "@/mutations/use-login-user";
import { loginSchema, LoginFormValues } from "@/types/auth";

export default function LoginForm() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginUser, isPending } = useLoginUser({
    onSuccess: (response) => {
      toast({ title: response.message, description: "Welcome back!" });
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "An unexpected error occurred",
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
            {isPending ? <LoadingText text="Logging in..." /> : "Login"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
