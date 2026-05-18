import type { User } from "@supabase/supabase-js";
import { createContext } from "react";

export interface MyTeacherProps {
  full_name: string;
  subject: string;
}

type ProfileType = {
  id: string;
  email: string;
  role: string;
  created_at: Date;
  full_name: string;
  avatar_url: string;
  is_public: boolean;
  my_teachers: MyTeacherProps[];
};

type AuthContextType = {
  user: User | null;
  profile: ProfileType | null;
  loading: boolean;

  isAuthenticated: boolean;
  isStudent: boolean;
  isTeacher: boolean;
};

// export const UsersContext = createContext<AuthContextType | null>(null);
export const UsersContext = createContext({} as AuthContextType);
