import type { JSX } from "@emotion/react/jsx-runtime";
import dayjs from "dayjs";
import type { BookedCard } from "../../../../types/ui";
import LessonGroup from "./LessonGroup";
import LessonStatusForm from "./LessonStatusForm";
import { Link } from "react-router-dom";
import { useClearUnreadCount } from "../../../chats/features/useClearUnreadCount";

export default function TeacherDisputedLessons({
  cards,
}: {
  cards: BookedCard[] | undefined;
}) {
  const { clearUnread } = useClearUnreadCount();

  const disputedLessons = cards?.filter(
    (lesson) => lesson.status === "disputed" && lesson.viewerRole === "teacher",
  );

  const lessonsJSX: JSX.Element[] = [];

  const orderedByStartTime = [...(disputedLessons ?? [])].sort(
    (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf(),
  );

  orderedByStartTime?.forEach((lesson, i) => {
    lessonsJSX.push(
      <article
        className="flex justify-between items-center px-4 py-2 bg-orange-200 rounded max-[600px]:flex-col max-[600px]:gap-3"
        key={i}
      >
        <LessonGroup lesson={lesson} />

        <div className="flex gap-2 items-center">
          <p>
            start a{" "}
            <Link
              to={`/chat-room/${lesson.lessonId}`}
              onClick={() =>
                clearUnread({
                  bookingId: lesson.lessonId,
                  role: lesson.viewerRole,
                })
              }
            >
              <strong>discussion</strong>
            </Link>{" "}
            or change status
          </p>

          {lesson.teacherOutcome === "no_show" && (
            <LessonStatusForm lesson={lesson} />
          )}
        </div>
      </article>,
    );
  });
  return (
    <div className="flex flex-col gap-3">
      {orderedByStartTime.length > 0 ? lessonsJSX : "There are no disputes👍"}
    </div>
  );
}
