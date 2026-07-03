import type { JSX } from "@emotion/react/jsx-runtime";
import dayjs from "dayjs";
import type { BookedCard } from "../../../../types/ui";
import LessonGroup from "./LessonGroup";
import LessonStatuses from "./LessonStatuses";

export default function TeacherCompletedLessons({
  cards,
}: {
  cards: BookedCard[] | undefined;
}) {
  const completedLessons = cards?.filter(
    (lesson) =>
      lesson.status === "completed" && lesson.viewerRole === "teacher",
  );

  const lessonsJSX: JSX.Element[] = [];

  const orderedByStartTime = [...(completedLessons ?? [])].sort(
    (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf(),
  );

  orderedByStartTime?.forEach((lesson, i) => {
    lessonsJSX.push(
      <article
        className="flex justify-between items-center px-4 py-2 bg-orange-200 rounded max-[600px]:flex-col max-[600px]:gap-3"
        key={i}
      >
        <LessonGroup lesson={lesson} />
        <LessonStatuses rating={lesson.rating} />
      </article>,
    );
  });
  return (
    <div className="flex flex-col gap-3">
      {orderedByStartTime.length > 0
        ? lessonsJSX
        : "There are no completed lessons yet"}
    </div>
  );
}
