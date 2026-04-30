import { createContext } from "react";

interface UsersProps {
  isAuthenticated: boolean;
  isStudent: boolean;
  isTeacher: boolean;
}

export const UsersContext = createContext({} as UsersProps);
