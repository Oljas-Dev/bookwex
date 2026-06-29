import dayjs from "dayjs";
import { useBookings } from "../../../../contexts/useBookings";
import { Link } from "react-router-dom";
import type { BookedCard } from "../../../../types/ui";
import { useConversations } from "../../../chats/features/useConversations";
import useCurrentUser from "../../../../api/features/useCurrentUser";

export default function CardOptions({ lesson }: { lesson: BookedCard }) {
  const { data: conversations } = useConversations();
  const { data: currentUser } = useCurrentUser();
  const { openDialog } = useBookings();

  const conversation = conversations?.find(
    (c) => c.bookingId === lesson.lessonId,
  );

  const hasUnreadLessonMessages = (conversation?.unreadCount ?? 0) > 0;

  // Users cannot cancel their bookings 12 hours before the lesson starts
  const hoursLeft = dayjs(lesson.startTime).diff(dayjs(), "minute") / 60;

  const canCancel = hoursLeft >= 12;

  const conferenceLink = currentUser?.conference_link;

  return (
    <div className="flex flex-col gap-2 [&_button]:px-2 [&_button]:py-1 [&_button]:text-[16px] card">
      <button
        onClick={() => console.log("conference started")}
        disabled={!conferenceLink}
      >
        <a href={conferenceLink} target="_blank">
          start zoom
        </a>
      </button>
      <div className="flex justify-center items-center">
        {canCancel && (
          <button
            className="iconBtn"
            onClick={() => openDialog(lesson.slotId, "cancel")}
          >
            <i className="bi bi-x-octagon icon hover:text-amber-100"></i>
          </button>
        )}

        <Link to={`/chat-room/${lesson.lessonId}`}>
          <button className="iconBtn">
            <i
              className={`bi bi-envelope icon ${
                hasUnreadLessonMessages
                  ? "text-green-700"
                  : "hover:text-amber-100"
              }`}
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
