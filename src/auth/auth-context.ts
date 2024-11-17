import { createContext } from "react";
import { User } from "@/types/user";

interface AuthContextType {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: any | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
