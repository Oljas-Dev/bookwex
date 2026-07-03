import { useParams } from "react-router-dom";
import { Send } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";
import { useSendMessage } from "./features/useSendMessage";
import ChatsMessages from "./ui/ChatsMessages";
import ChatsHeader from "./ui/ChatsHeader";
import { useChatRoom } from "./features/useChatRoom";
import { useAuth } from "../../contexts/useAuth";
import { useClearUnreadCount } from "./features/useClearUnreadCount";

export default function Chats() {
  const { user } = useAuth();
  const { lessonId } = useParams();
  const { data: chatData, isLoading } = useChatRoom(lessonId);
  const { clearUnread } = useClearUnreadCount();
  const [messageInput, setMessageInput] = useState("");

  // const viewerRole =
  //   chatData?.booking.teacher?.id === user?.id ? "teacher" : "student";

  let viewerRole: "teacher" | "student" | undefined;

  if (!chatData) {
    viewerRole = undefined;
  } else if (chatData.booking.teacher.id === user?.id) {
    viewerRole = "teacher";
  } else {
    viewerRole = "student";
  }

  const { mutate: sendMessage, isPending } = useSendMessage();

  function unreadCallback() {
    if (!viewerRole) return;

    clearUnread({
      bookingId: chatData?.booking?.id,
      role: viewerRole,
    });
  }

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatData?.messages]);

  useEffect(unreadCallback, [
    chatData,
    viewerRole,
    clearUnread,
    isLoading,
    chatData?.booking?.id,
  ]);

  if (!lessonId) {
    return <p>Lesson not found</p>;
  }

  if (isLoading) return <p>Loading chat...</p>;

  if (!chatData) return <p>Chat not found</p>;

  const safeLessonId = lessonId;

  // Send message
  function handleSendMessage() {
    sendMessage({
      bookingId: safeLessonId,
      text: messageInput.trim(),
    });
    setMessageInput("");
  }

  // Send message with keyDown "Enter"
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const trimmed = messageInput.trim();

      sendMessage({
        bookingId: safeLessonId,
        text: trimmed,
      });

      setMessageInput("");
    }
  }

  return (
    <div className="flex flex-col items-between gap-2 h-screen w-full px-4 py-6">
      <ChatsHeader
        duration={chatData.booking.duration}
        startTime={chatData.booking.start_time}
        teacherName={chatData.booking.teacher?.full_name}
      />

      <div className="flex-1 min-h-0 overflow-y-auto border-t border-b p-2">
        <div className="flex flex-col gap-2 items-end">
          {chatData?.messages?.map((message) => (
            <ChatsMessages key={message.id} message={message} />
          ))}

          <div ref={bottomRef} />
        </div>
      </div>
      {/* <div className="flex-1 flex flex-col gap-2 justify-end items-end p-2 border-t border-b overflow-auto">
        {chatData?.messages?.map((message) => (
          <ChatsMessages message={message} key={message.id} />
        ))}
      </div> */}

      <div className="relative w-full">
        <textarea
          id="chatText"
          value={messageInput}
          placeholder="Type a message..."
          className="text-lg pt-2 pl-2 border border-jet rounded w-full"
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="absolute right-0 top-[17%] bg-transparent border-0"
          onClick={handleSendMessage}
          disabled={isPending}
        >
          <Send />
        </button>
      </div>
    </div>
  );
}
