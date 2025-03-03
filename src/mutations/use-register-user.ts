import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { ENDPOINTS } from "@/config/api-config";
import { api } from "@/api";
import { Response, ErrorResponse } from "@/types/api";
import { RegisterFormValues } from "@/types/auth";

export function useRegisterUser({
  onSuccess,
  onError,
}: {
  onSuccess: (response: Response<null>) => void;
  onError: (error: ErrorResponse) => void;
}) {
  return useMutation<
    Response<null>,
    AxiosError<ErrorResponse>,
    RegisterFormValues
  >({
    mutationFn: (data: RegisterFormValues) =>
      api
        .post<Response<null>>(ENDPOINTS.auth.register, data)
        .then((res) => res.data),
    onSuccess,
    onError: (error) => {
      onError(
        error.response?.data ?? { message: "An unexpected error occurred" }
      );
    },
  });
}
