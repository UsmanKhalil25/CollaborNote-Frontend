import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "@/router";
import { AuthProvider } from "@/auth/AuthProvider.tsx";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}
