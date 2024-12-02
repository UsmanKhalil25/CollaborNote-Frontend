import { User } from "@/types/user";
import { createContext } from "react";

interface AuthContextType {
  token: string | null;
  user: User | null;
  socket: WebSocket | null;
  messages: string[];
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setSocket: (socket: WebSocket | null) => void;
  sendMessage: (message: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
