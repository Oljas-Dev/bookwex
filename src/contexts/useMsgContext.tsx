import { useContext } from "react";
import { MessagesContext } from "./MessagesContextData";

export function useMsgContext() {
  const context = useContext(MessagesContext);

  if (!context) {
    console.error("Context cannot be used outside Provider");
  }

  return context;
}
