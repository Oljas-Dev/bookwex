import type { JSX } from "@emotion/react/jsx-runtime";
import dayjs from "dayjs";
import DisplayLessonInfo from "../students-card/DisplayLessonInfo";
import type { LessonCard } from "../../../../types/ui";
import TeacherIdentity from "../students-card/TeacherIdentity";
import { Link } from "react-router-dom";
import { useClearUnreadCount } from "../../../chats/features/useClearUnreadCount";
import LessonStatusForm from "../teachers-card/LessonStatusForm";

export default function StudentDisputedLessons({
  cards,
}: {
  cards: LessonCard[] | undefined;
}) {
  const { clearUnread } = useClearUnreadCount();
  const upcomingLessons = cards?.filter(
    (lesson) => lesson.status === "disputed" && lesson.viewerRole === "student",
  );

  const lessonsJSX: JSX.Element[] = [];

  const orderedByStartTime = [...(upcomingLessons ?? [])].sort(
    (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf(),
  );

  orderedByStartTime?.forEach((lesson) => {
    lessonsJSX.push(
      <div
        className="flex justify-between items-center flex-wrap px-4 py-2 bg-orange-200 rounded max-[600px]:flex-col max-[600px]:gap-2"
        key={lesson.lessonId}
      >
        <div className="flex gap-6 max-[600px]:flex-col max-[600px]:gap-2">
          <TeacherIdentity lesson={lesson} />

          <DisplayLessonInfo
            duration={lesson.duration}
            startTime={lesson.startTime}
          />
        </div>

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
      </div>,
    );
  });
  return (
    <div className="flex flex-col gap-3">
      {orderedByStartTime.length > 0
        ? lessonsJSX
        : "There are no disputed lessons👍"}
    </div>
  );
}
