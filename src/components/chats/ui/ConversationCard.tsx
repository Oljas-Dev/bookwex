import { Link } from "react-router-dom";
import type { Conversation } from "../../../types/chats";
import { useAuth } from "../../../contexts/useAuth";
import { AvatarPlaceholder } from "../../avatars/features/AvatarPlaceholder";
import { getAvatarUrl } from "../../avatars/features/useAvatar";
import { capitalizeAllFirst } from "../../../helpers/features";
import dayjs from "dayjs";
import { useClearUnreadCount } from "../features/useClearUnreadCount";
import { useUpdateStatus } from "../features/useUpdateStatus";

export default function ConversationCard({ card }: { card: Conversation }) {
  const { user } = useAuth();
  const { clearUnread } = useClearUnreadCount();
  const { changeStatus } = useUpdateStatus();

  const createdAt = dayjs(card?.lastMessageAt).format("HH:mm");

  return (
    <Link
      to={`/chat-room/${card.bookingId}`}
      onClick={() => {
        if (!user?.id) return;

        clearUnread({
          bookingId: card.bookingId,
          role: card.viewerRole,
        });
        changeStatus({
          bookingId: card.bookingId,
          userId: user?.id,
        });
      }}
    >
      <div
        className={`${
          card.unreadCount ? "border-2 border-green-600" : ""
        } flex items-center gap-2 bg-jade p-2 rounded`}
      >
        <AvatarPlaceholder
          styles="w-16 h-16"
          avatarUrl={getAvatarUrl(card.participant?.avatar)}
        />

        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            {capitalizeAllFirst(card.participant?.name ?? "Unknown user")}
            <span
              className={`${
                card?.unreadCount ? "text-green-600" : "text-jet/50"
              }`}
            >
              {createdAt}
            </span>
          </div>

          <span className="text-sm text-jet/50">{card.lastMessage}</span>
        </div>
      </div>
    </Link>
  );
}
