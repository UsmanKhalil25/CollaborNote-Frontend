import { createContext, useState, useEffect, useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";
import { api } from "@/api";
import { ENDPOINTS } from "@/config/api-config.ts";

import { Response } from "@/types/api";

interface AuthContextType {
  token: string | null;
  user: User | null;
  loading: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

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
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("auth_token");
    }
    return null;
  });
  const [user, setUser] = useState<User | null>(null);

  const { data, isLoading: isUserLoading } = useQuery<User | null>({
    queryKey: ["user", token],
    queryFn: async () => {
      if (!token) return null;
      const response = await api.get<Response<UserData>>(
        ENDPOINTS.users.current
      );
      return response.data.data.user;
    },
    enabled: !!token,
  });

  useEffect(() => {
    setUser(data ?? null);
  }, [data]);

  useLayoutEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => api.interceptors.request.eject(requestInterceptor);
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
            if (typeof window !== "undefined") {
              sessionStorage.setItem("auth_token", newToken);
            }

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            if (typeof window !== "undefined") {
              sessionStorage.removeItem("auth_token");
            }
            setToken(null);
            setUser(null);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(responseInterceptor);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (token) {
      sessionStorage.setItem("auth_token", token);
    } else {
      sessionStorage.removeItem("auth_token");
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading: isUserLoading,
        setToken,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
