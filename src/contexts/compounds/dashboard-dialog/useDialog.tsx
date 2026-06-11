import { useContext } from "react";
import { DialogContext } from "./DialogTypes";

export function useDialog() {
  const context = useContext(DialogContext);

  if (context === undefined) {
    throw new Error("DialogContext cannot be used outside the Provider");
  }

  return context;
}
