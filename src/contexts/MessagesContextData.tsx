import { createContext } from "react";
import type { Message } from "../types/chats";

interface MessagesContextProps {
  hasUnreadMessages: boolean | undefined;
  incomingMessages: Message[] | undefined;
  isLoadingMsg: boolean | undefined;
}

export const MessagesContext = createContext({} as MessagesContextProps);
