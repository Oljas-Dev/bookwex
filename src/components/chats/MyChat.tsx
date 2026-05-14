// import { useMessages } from "./features/useMessages";

import type { JSX } from "@emotion/react/jsx-runtime";
import { useMsgContext } from "../../contexts/useMsgContext";
import type { Message } from "./features/useSendMessage";
import { Link, useNavigate, useParams } from "react-router-dom";

import avatar from "../../assets/avatar.png";
import dayjs from "dayjs";
import { ArrowLeft } from "react-bootstrap-icons";
import { useUpdateStatus } from "./features/useUpdateStatus";
import { useUser } from "../../api/features/useUser";

export default function MyChats() {
  const { user } = useUser();
  const { incomingMessages, isLoadingMsg } = useMsgContext();
  const { changeStatus } = useUpdateStatus();
  const { teacherName } = useParams();
  //   const { data: messages } = useMessages(
  //     "143fd9b3-6965-4abb-9083-9df386c0ed63",
  //   );

  const navigate = useNavigate();

  if (isLoadingMsg) return <p>loading messages... </p>;

  const grouped = incomingMessages!.reduce<Record<string, Message[]>>(
    (acc, item) => {
      (acc[item!.lesson_id] = acc[item!.lesson_id] || []).push(item);
      return acc;
    },
    {},
  );

  const messages: JSX.Element[] = [];

  // message display
  Object.values(grouped).forEach((group) => {
    const lastMessage = group.at(-1);

    if (!lastMessage) return null;

    const created_at = dayjs(lastMessage.created_at).format("HH:mm");

    messages.push(
      <Link
        to={`/teacher/${teacherName}/chat-room/${lastMessage.lesson_id}`}
        key={lastMessage.id}
        onClick={() =>
          changeStatus({
            lessonId: lastMessage.lesson_id,
            userId: user?.id,
          })
        }
      >
        <div
          className={`${
            lastMessage.is_read ? "" : "border-2 border-green-600"
          } flex items-center gap-2 bg-jade p-2 rounded`}
        >
          <img
            src={avatar}
            alt="Teacher Avatar"
            className="w-16 h-16 object-cover rounded-full"
          />

          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              {lastMessage.sender_id}
              <span
                className={`${
                  lastMessage.is_read ? "text-jet/50" : "text-green-600"
                }`}
              >
                {created_at}
              </span>
            </div>

            <span className="text-sm text-jet/50">{lastMessage.text}</span>
          </div>
        </div>
      </Link>,
    );
  });

  return (
    <div className="w-full px-4 py-6">
      <div className="bg-jet/20 max-w-fit px-2 rounded-lg hover:bg-jet/10">
        <ArrowLeft
          style={{
            alignSelf: "start",
            marginBottom: "16px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/teacher/${teacherName}`)}
        />
      </div>
      <h2 className="text-center">Messages</h2>
      <div className="flex flex-col gap-2 text-lg mt-4">{messages}</div>
    </div>
  );
}
