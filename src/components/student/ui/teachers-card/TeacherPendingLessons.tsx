import type { JSX } from "@emotion/react/jsx-runtime";
import dayjs from "dayjs";
import LessonGroup from "./LessonGroup";
import LessonStatusForm from "./LessonStatusForm";
import LessonConfirmed from "./LessonConfirmed";
import type { BookedCard } from "../../../../types/ui";

export default function TeacherPendingLessons({
  cards,
}: {
  cards: BookedCard[] | undefined;
}) {
  const upcomingLessons = cards?.filter(
    (lesson) =>
      lesson.status === "awaiting_confirmation" &&
      lesson.viewerRole === "teacher",
  );

  const lessonsJSX: JSX.Element[] = [];

  const orderedByStartTime = [...(upcomingLessons ?? [])].sort(
    (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf(),
  );

  orderedByStartTime?.forEach((lesson) => {
    lessonsJSX.push(
      <article
        className="flex justify-between items-center px-4 py-2 bg-jade rounded max-[600px]:flex-col max-[600px]:gap-3"
        key={lesson.lessonId}
      >
        <LessonGroup lesson={lesson} />
        {lesson.teacherOutcome === "pending" ? (
          <LessonStatusForm lesson={lesson} />
        ) : (
          <LessonConfirmed lesson={lesson} />
        )}
      </article>,
    );
  });
  return (
    <div className="flex flex-col gap-3">
      {orderedByStartTime.length > 0
        ? lessonsJSX
        : "There are no lessons awaiting your confirmation"}
    </div>
  );
}
