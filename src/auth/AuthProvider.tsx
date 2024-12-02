import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useLayoutEffect } from "react";

import { AuthContext } from "@/auth/auth-context.ts";
import { User } from "@/types/user";
import { api } from "@/api";
import { ENDPOINTS } from "@/config/api-config.ts";

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
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

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

      const ws = new WebSocket(`ws://localhost:8000/api/ws?token=${token}`);

      setSocket(ws);

      ws.onmessage = (event) => {
        const message = event.data;
        console.log("Received message:", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      ws.onopen = () => {
        console.log("WebSocket connection established.");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed.");
      };

      return () => {
        ws.close();
      };
    } else {
      sessionStorage.removeItem("auth_token");
      if (socket) {
        socket.close();
      }
    }
  }, [token]);

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.error("WebSocket is not open.");
    }
  };

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
    <AuthContext.Provider
      value={{
        token,
        user,
        socket,
        setToken,
        setUser,
        setSocket,
        sendMessage,
        messages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
