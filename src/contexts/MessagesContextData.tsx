import { createContext } from "react";
import type { Message } from "../components/chats/features/useSendMessage";

interface MessagesContextProps {
  hasUnreadMessages: boolean | undefined;
  incomingMessages: Message[] | undefined;
  isLoadingMsg: boolean | undefined;
}

export const MessagesContext = createContext({} as MessagesContextProps);
