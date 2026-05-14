import dayjs from "dayjs";
import { useUser } from "../../../api/features/useUser";
import type { Message } from "../features/useSendMessage";
import { Check2, Check2All } from "react-bootstrap-icons";

export default function ChatsMessages({ message }: { message: Message }) {
  const { user } = useUser();

  const messageFromMe = user?.id === message.sender_id;
  const created_at = dayjs(message.created_at).format("HH:mm");

  return (
    <div
      className={`${messageFromMe ? "bg-jade ml-auto" : "bg-jet/10"} max-w-fit py-1 px-4 rounded`}
    >
      <p className="text-base">{message.text}</p>
      <span className="flex justify-end gap-1">
        <p className="text-jet/50">{created_at}</p>
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
          (message.is_read ? <Check2All size={16} /> : <Check2 size={16} />)}
      </span>
    </div>
  );
}
