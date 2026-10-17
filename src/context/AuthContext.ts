import { createContext } from "react";
import type { ActionResult, User } from "../types";

export interface ProfileUpdate {
  name: string;
  email: string;
  password?: string;
}

export interface AuthContextValue {
  currentUser: User | null;
  signedOut: boolean;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<ActionResult>;
  login: (email: string, password: string) => Promise<ActionResult>;
  logout: () => void;
  updateProfile: (update: ProfileUpdate) => Promise<ActionResult>;
  deleteAccount: () => void;
  updateUserLoyalty: (user: User) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
