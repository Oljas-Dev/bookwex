import type { JSX } from "@emotion/react/jsx-runtime";
import dayjs from "dayjs";
import type { LessonCard } from "../../../../types/ui";
import TeacherIdentity from "./TeacherIdentity";
import DisplayLessonInfo from "./DisplayLessonInfo";
import CardFunctionality from "./CardFunctionality";

export default function MyStudentLessons({
  cards,
}: {
  cards: LessonCard[] | undefined;
}) {
  const upcomingLessons = cards?.filter(
    (lesson) => lesson.status === "booked" && lesson.viewerRole === "student",
  );

  const lessonsJSX: JSX.Element[] = [];

  const orderedByStartTime = [...(upcomingLessons ?? [])].sort(
    (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf(),
  );

  orderedByStartTime?.forEach((lesson) => {
    lessonsJSX.push(
      <div
        className="flex justify-between items-center flex-wrap px-4 py-2 bg-jade rounded max-[600px]:flex-col max-[600px]:gap-3"
        key={lesson.lessonId}
      >
        <div className="flex gap-6 max-[600px]:flex-col max-[600px]:gap-2">
          <TeacherIdentity lesson={lesson} />
          <DisplayLessonInfo
            duration={lesson.duration}
            startTime={lesson.startTime}
          />
        </div>
        <CardFunctionality lesson={lesson} />
      </div>,
    );
  });

  return (
    <div className="flex flex-col gap-3">
      {orderedByStartTime.length > 0
        ? lessonsJSX
        : "There are no upcoming lessons"}
    </div>
  );
}
