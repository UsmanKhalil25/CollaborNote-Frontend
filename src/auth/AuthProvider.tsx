import { useState, useEffect, useLayoutEffect } from "react";
import { AuthContext } from "@/auth/auth-context.ts";
import { User } from "@/types/user";
import { api } from "@/api";
import { ENDPOINTS } from "@/config/api-config.ts";
import { useQuery } from "@tanstack/react-query";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface TokenData {
  access_token: string;
}

interface UserData {
  user: User;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const storedToken = sessionStorage.getItem("auth_token");
  const [token, setToken] = useState<string | null>(storedToken);
  const [user, setUser] = useState<User | null>(null);

  const { data, refetch } = useQuery<User | null>({
    queryKey: ["user", token],
    queryFn: async (): Promise<User | null> => {
      if (!token) return null;

      const response = await api.get<Response<UserData>>(
        ENDPOINTS.users.current
      );

      return response.data.data.user;
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("auth_token", token);
    } else {
      sessionStorage.removeItem("auth_token");
    }
  }, [token]);

  useLayoutEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const res = await api.post<Response<TokenData>>(
              ENDPOINTS.auth.refresh
            );
            const newToken = res.data.data.access_token;

            setToken(newToken);

            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            await refetch();

            return api(originalRequest);
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
            setToken(null);
            setUser(null);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [refetch]);

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
