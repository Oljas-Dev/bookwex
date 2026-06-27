import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useBookings } from "../../../../contexts/useBookings";
import type { LessonCard } from "../../../../types/ui";
import { useConversations } from "../../../chats/features/useConversations";

export default function CardFunctionality({ lesson }: { lesson: LessonCard }) {
  const { data: conversations } = useConversations();
  const { openDialog } = useBookings();

  const conversation = conversations?.find(
    (c) => c.bookingId === lesson.lessonId,
  );

  const hasUnreadLessonMessages = (conversation?.unreadCount ?? 0) > 0;

  // Users cannot cancel their bookings 12 hours before the lesson starts
  const hoursLeft = dayjs(lesson?.startTime).diff(dayjs(), "minute") / 60;

  const canCancel = hoursLeft >= 12;

  return (
    <div className="flex flex-col gap-2 [&_button]:px-2 [&_button]:py-1 [&_button]:text-[16px] card">
      <div className="flex justify-center items-center">
        {canCancel && (
          <button
            className="iconBtn"
            onClick={() => openDialog(lesson?.slotId, "cancel")}
          >
            <i className="bi bi-x-octagon icon hover:text-amber-100"></i>
          </button>
        )}

        <Link to={`/chat-room/${lesson.lessonId}`}>
          <button className="iconBtn">
            <i
              className={`bi ${
                hasUnreadLessonMessages
                  ? "bi-envelope text-green-700"
                  : "bi-card-text hover:text-amber-100"
              } icon`}
            ></i>
          </button>
        </Link>

        {/* {hasUnreadLessonMessages ? (
          <Link to={`/teacher/${toParamStr(lesson?.teacherName)}/chat-room`}>
            <button className="iconBtn">
              <i className="bi bi-envelope icon text-green-700"></i>
            </button>
          </Link>
        ) : (
          <Link
            to={`/teacher/${toParamStr(lesson?.teacherName)}/chat-room/${lesson?.lessonId}`}
          >
            <button className="iconBtn">
              <i className="bi bi-card-text icon hover:text-amber-100"></i>
            </button>
          </Link>
        )} */}
      </div>
    </div>
  );
}
