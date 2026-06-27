import dayjs from "dayjs";
import { Check2, Check2All } from "react-bootstrap-icons";
import type { Message } from "../../../types/chats";
import { useAuth } from "../../../contexts/useAuth";

export default function ChatsMessages({ message }: { message: Message }) {
  const { user } = useAuth();

  const messageFromMe = user?.id === message.senderId;
  const createdAt = dayjs(message.createdAt).format("HH:mm");

  return (
    <div
      className={`${messageFromMe ? "bg-jade ml-auto" : "bg-jet/10"} max-w-fit py-1 px-4 rounded`}
    >
      <p className="text-base">{message.text}</p>
      <span className="flex justify-end gap-1">
        <p className="text-jet/50">{createdAt}</p>
        {/* show if messages from you were read 
            for later: status: "sending" | "sent" | "delivered" | "seen"
            | Status    | UI      
            | --------- | ------- 
            | sending   | clock      
            | sent      | ✔         
            | delivered | ✔✔ gray  
            | seen      | ✔✔ blue  

        */}
        {messageFromMe &&
          (message.isRead ? <Check2All size={16} /> : <Check2 size={16} />)}
      </span>
    </div>
  );
}
