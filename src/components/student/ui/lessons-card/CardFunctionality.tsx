import { Link } from "react-router-dom";
import { toParamStr } from "../../../../helpers/features";
import { useMsgContext } from "../../../../contexts/useMsgContext";
import { useProfileById } from "../../../../api/features/useProfileById";
import dayjs from "dayjs";
import { useBookings } from "../../../../contexts/useBookings";
import type { LessonCard } from "../../../../types/ui";

export default function CardFunctionality({ lesson }: { lesson: LessonCard }) {
  const { incomingMessages } = useMsgContext();
  const { openDialog } = useBookings();
  const { teacher: teacherProfile } = useProfileById(lesson?.teacherId);

  const hasUnreadLessonMessages = incomingMessages?.some(
    (m) => m.lesson_id === lesson?.slotId && !m.is_read,
  );

  // console.log(lesson?.user_id);

  const teacherName = teacherProfile?.full_name;

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

        {hasUnreadLessonMessages ? (
          <Link to={`/teacher/${toParamStr(teacherName)}/chat-room`}>
            <button className="iconBtn">
              <i className="bi bi-envelope icon text-green-700"></i>
            </button>
          </Link>
        ) : (
          <button
            className="iconBtn"
            onClick={() => openDialog(lesson?.slotId, "chat")}
          >
            <i className="bi bi-card-text icon hover:text-amber-100"></i>
          </button>
        )}
      </div>
    </div>
  );
}
