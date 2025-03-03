import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useAuth } from "@/hooks/use-auth";
import { ENDPOINTS } from "@/config/api-config";
import { api } from "@/api";
import { Response, ErrorResponse } from "@/types/api";
import { LoginFormValues } from "@/types/auth";

export function useLoginUser({
  onSuccess,
  onError,
}: {
  onSuccess: (response: Response<{ accessToken: string }>) => void;
  onError: (error: ErrorResponse) => void;
}) {
  const { setToken } = useAuth();

  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await api.post<Response<{ accessToken: string }>>(
        ENDPOINTS.auth.login,
        data
      );
      return response.data;
    },
    onSuccess: (response) => {
      setToken(response.data.accessToken);
      onSuccess(response);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      onError(
        error.response?.data || { message: "An unexpected error occurred" }
      );
    },
  });
}
