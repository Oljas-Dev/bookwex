import type { User } from "@supabase/supabase-js";
import { createContext, type Dispatch, type SetStateAction } from "react";

export interface MyTeacherProps {
  full_name: string;
  subject: string;
}

export type Profile = {
  id: string;
  full_name: string | undefined;
  avatar_url: string | null;
  my_teachers: string[] | null;
  timezone?: string | undefined;
};

export type ProfileType = {
  id: string;
  email: string;
  role: string;
  created_at: Date;
  full_name: string;
  avatar_url: string;
  is_public: boolean;
  my_teachers: string[];
};

type AuthContextType = {
  user: User | null;
  profile: ProfileType | null;
  profiles: ProfileType[] | undefined;
  currentTeacher: (teacherName: string | undefined) => ProfileType;
  currentTeacherId: string;
  setCurrentTeacherId: Dispatch<SetStateAction<string>>;

  loading: boolean;
  isAuthenticated: boolean;
  isStudent: boolean;
  isTeacher: boolean;
};

// export const UsersContext = createContext<AuthContextType | null>(null);
export const UsersContext = createContext({} as AuthContextType);
