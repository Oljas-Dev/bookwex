import { useNavigate, useParams } from "react-router-dom";
// import { capitalizeAllFirst, toNormalStr } from "../../helpers/features";
import {
  ArrowLeft,
  CalendarEvent,
  PersonFill,
  Send,
} from "react-bootstrap-icons";
import { useLessons } from "../../api/features/useLessons";
import dayjs from "dayjs";
import { useState } from "react";
import { useSendMessage } from "./features/useSendMessage";
import { useMessages } from "./features/useMessages";
import ChatsMessages from "./ui/ChatsMessages";
import { formatLessonDate } from "../../helpers/features";

export default function Chats() {
  const [messageInput, setMessageInput] = useState("");
  const { teacherName, lessonId } = useParams();
  const { lessons } = useLessons();

  const { mutate: sendMessage, isPending } = useSendMessage();
  const { data: messages, isLoading } = useMessages(lessonId);

  const navigate = useNavigate();

  if (!lessonId) {
    return <p>Lesson not found</p>;
  }

  const safeLessonId = lessonId;

  const currentLesson = lessons?.find((lesson) => lesson.id === safeLessonId);
  const currentDay = dayjs.utc(currentLesson?.start_time).format("MMMM D");

  console.log(formatLessonDate(currentLesson?.start_time));

  const startTime = formatLessonDate(currentLesson?.start_time, "HH:mm");
  const endTime = formatLessonDate(currentLesson?.end_time, "HH:mm");

  // Send message
  function handleSendMessage() {
    sendMessage({
      lessonId: safeLessonId,
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
        lessonId: safeLessonId,
        text: trimmed,
      });

      setMessageInput("");
    }
  }

  return (
    <div className="flex flex-col gap-2 h-screen w-full px-4 py-6">
      <div>
        {/* Navigational panel for chats page */}
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-jet/20 max-w-fit px-2 rounded-lg hover:bg-jet/10 cursor-pointer">
            <ArrowLeft
              style={{
                alignSelf: "start",
              }}
              onClick={() => navigate(-1)}
            />
          </div>
          <a
            href={`/teacher/${teacherName}`}
            className="hover:scale-110 active:scale-90"
          >
            <CalendarEvent size={24} />
          </a>
          <a href="/student" className="hover:scale-110 active:scale-90">
            <PersonFill size={24} />
          </a>
        </div>

        {/* Chats header */}
        <div className="text-center">
          Discuss your lesson on {currentDay} <br />
          from {startTime} - {endTime}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 justify-end items-end p-2 border-t border-b">
        {messages?.map((message) => (
          <ChatsMessages message={message} key={message.id} />
        ))}
      </div>

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
          disabled={isPending || isLoading}
        >
          <Send />
        </button>
      </div>
    </div>
  );
}
