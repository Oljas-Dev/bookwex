import { useContext } from "react";
import { UsersContext } from "./AuthContextData";

export function useAuth() {
  const context = useContext(UsersContext);

  if (context === undefined) {
    throw new Error("Context cannot be used outside Provider");
  }

  return context;
}
