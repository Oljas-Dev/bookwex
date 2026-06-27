import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "react-bootstrap-icons";
import { useConversations } from "./features/useConversations";
import ConversationCard from "./ui/ConversationCard";

export default function MyChats() {
  const { data: conversations, isPending } = useConversations();

  const navigate = useNavigate();

  if (isPending) return <p>loading messages... </p>;

  return (
    <div className="w-full px-4 py-6">
      <div className="bg-jet/20 max-w-fit px-2 rounded-lg hover:bg-jet/10">
        <ArrowLeft
          style={{
            alignSelf: "start",
            marginBottom: "16px",
            cursor: "pointer",
          }}
          onClick={() => navigate(-1)}
        />
      </div>
      <h2 className="text-center">Messages</h2>
      <div className="flex flex-col gap-2 text-lg mt-4">
        {conversations?.map((conversation) => {
          return (
            <ConversationCard
              card={conversation}
              key={conversation.bookingId}
            />
          );
        })}
      </div>
    </div>
  );
}
