import type { JSX } from "@emotion/react/jsx-runtime";
import dayjs from "dayjs";
import DisplayLessonInfo from "../students-card/DisplayLessonInfo";
import type { LessonCard } from "../../../../types/ui";
import TeacherIdentity from "../students-card/TeacherIdentity";
import LessonStatusForm from "./LessonStatusForm";
import LessonConfirmed from "./LessonConfirmed";

export default function MyPendingLessons({
  cards,
}: {
  cards: LessonCard[] | undefined;
}) {
  const upcomingLessons = cards?.filter(
    (lesson) =>
      lesson.status === "awaiting_confirmation" &&
      lesson.viewerRole === "student",
  );

  const lessonsJSX: JSX.Element[] = [];

  const orderedByStartTime = [...(upcomingLessons ?? [])].sort(
    (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf(),
  );

  orderedByStartTime?.forEach((lesson) => {
    lessonsJSX.push(
      <div
        className="flex justify-between items-center flex-wrap px-4 py-2 bg-jade rounded"
        key={lesson.lessonId}
      >
        <div className="flex gap-6">
          <TeacherIdentity lesson={lesson} />

          <DisplayLessonInfo
            duration={lesson.duration}
            startTime={lesson.startTime}
          />
        </div>
        {lesson.studentOutcome === "pending" ? (
          <LessonStatusForm lesson={lesson} />
        ) : (
          <LessonConfirmed lesson={lesson} />
        )}
      </div>,
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
