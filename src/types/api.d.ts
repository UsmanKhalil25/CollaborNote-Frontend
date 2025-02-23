export interface Response<T> {
  data: T;
  message: string;
  status: string;
}

export interface ErrorResponse {
  message: string;
  error?: {
    details?: Array<{
      path: string;
      message: string;
    }>;
  };
}

export interface Error {
  message: string;
}
