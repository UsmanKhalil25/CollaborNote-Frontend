import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { ENDPOINTS } from "@/config/api-config";
import { api } from "@/api";
import { Response, ErrorResponse } from "@/types/api";

export function useLogoutUser({
  onSuccess,
  onError,
}: {
  onSuccess: (response: Response<null>) => void;
  onError: (error: ErrorResponse) => void;
}) {
  return useMutation<Response<null>, AxiosError<ErrorResponse>>({
    mutationFn: () =>
      api.post<Response<null>>(ENDPOINTS.auth.logout).then((res) => res.data),
    onSuccess,
    onError: (error) => {
      onError(
        error.response?.data ?? { message: "An unexpected error occurred" }
      );
    },
  });
}
