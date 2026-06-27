import type { JSX } from "@emotion/react/jsx-runtime";
import dayjs from "dayjs";
import type { BookedCard } from "../../../../types/ui";
import LessonGroup from "./LessonGroup";
import CardOptions from "./CardOptions";

export default function TeacherUpcomingLessons({
  cards,
}: {
  cards: BookedCard[] | undefined;
}) {
  const upcomingLessons = cards?.filter(
    (lesson) => lesson.status === "booked" && lesson.viewerRole === "teacher",
  );

  const lessonsJSX: JSX.Element[] = [];

  const orderedByStartTime = [...(upcomingLessons ?? [])].sort(
    (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf(),
  );

  orderedByStartTime?.forEach((lesson, i) => {
    lessonsJSX.push(
      <article
        className="flex justify-between items-center flex-wrap px-4 py-2 bg-jade rounded"
        key={i}
      >
        <LessonGroup lesson={lesson} />
        <CardOptions lesson={lesson} />
      </article>,
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
