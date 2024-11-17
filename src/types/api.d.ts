interface Response<T> {
  data: T;
  message: string;
  status: string;
}

interface Error {
  message: string;
}
