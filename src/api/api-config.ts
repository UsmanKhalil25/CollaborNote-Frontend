import { HTTP_METHODS } from "@/constants";

export async function apiRequest<T>(
  route: string,
  method: string = HTTP_METHODS.GET,
  body: object | null = null,
  headers: HeadersInit = { "Content-Type": "application/json" },
): Promise<T> {
  const response = await fetch(route, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || "Something went wrong");
  }

  return response.json();
}
