import { useMsgContext } from "../../contexts/useMsgContext";
import type { Message } from "./features/useSendMessage";
import { Link, useNavigate, useParams } from "react-router-dom";

import dayjs from "dayjs";
import { ArrowLeft } from "react-bootstrap-icons";
import { useUpdateStatus } from "./features/useUpdateStatus";
import { useUser } from "../../api/features/useUser";
import { AvatarPlaceholder } from "../avatars/features/AvatarPlaceholder";
import { getAvatarUrl } from "../avatars/features/useAvatar";
import { capitalizeAllFirst } from "../../helpers/features";

export default function MyChats() {
  const { user } = useUser();
  const { incomingMessages, isLoadingMsg } = useMsgContext();
  const { changeStatus } = useUpdateStatus();
  const { teacherName } = useParams();

  const navigate = useNavigate();

  if (isLoadingMsg) return <p>loading messages... </p>;
  if (!teacherName) return <p>Teacher not found</p>;

  // console.log(incomingMessages[0]?.sender);

  const grouped = (incomingMessages ?? []).reduce<Record<string, Message[]>>(
    (acc, item) => {
      (acc[item.lesson_id] ??= []).push(item);
      return acc;
    },
    {},
  );

  // message display
  const messages = Object.values(grouped).map((group) => {
    const lastMessage = group.at(-1);

    if (!lastMessage) return null;

    const createdAt = dayjs(lastMessage.created_at).format("HH:mm");

    return (
      <Link
        to={`/teacher/${teacherName}/chat-room/${lastMessage.lesson_id}`}
        key={lastMessage.id}
        onClick={() => {
          if (!user?.id) return;

          changeStatus({
            lessonId: lastMessage.lesson_id,
            userId: user?.id,
          });
        }}
      >
        <div
          className={`${
            lastMessage.is_read ? "" : "border-2 border-green-600"
          } flex items-center gap-2 bg-jade p-2 rounded`}
        >
          <AvatarPlaceholder
            styles="w-16 h-16"
            avatarUrl={getAvatarUrl(lastMessage.sender?.avatar_url)}
          />

          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              {capitalizeAllFirst(
                lastMessage.sender?.full_name ?? "Unknown user",
              )}
              <span
                className={`${
                  lastMessage.is_read ? "text-jet/50" : "text-green-600"
                }`}
              >
                {createdAt}
              </span>
            </div>

            <span className="text-sm text-jet/50">{lastMessage.text}</span>
          </div>
        </div>
      </Link>
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
          onClick={() => navigate(-1)}
        />
      </div>
      <h2 className="text-center">Messages</h2>
      <div className="flex flex-col gap-2 text-lg mt-4">{messages}</div>
    </div>
  );
}
