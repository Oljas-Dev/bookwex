import { type ReactNode } from "react";
import { useMessageStatus } from "../components/chats/features/useMessageStatus";
import { MessagesContext } from "./MessagesContextData";
import { useUser } from "../api/features/useUser";

export function MessagesProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const { msgStatus, isPending: isLoadingMsg } = useMessageStatus();

  // const myMessages = msgStatus?.filter(
  //   (message) => message.sender_id !== user?.id,
  // );

  // const isRead = myMessages?.every((message) => message.is_read);
  const incomingMessages = msgStatus?.filter(
    (message) => message.sender_id !== user?.id,
  );

  const hasUnreadMessages = incomingMessages?.some(
    (message) => !message.is_read,
  );

  // console.log(user, hasUnreadMessages);

  return (
    <MessagesContext.Provider
      value={{ hasUnreadMessages, incomingMessages, isLoadingMsg }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
