import type { JSX } from "@emotion/react/jsx-runtime";
import LessonGroup from "./LessonGroup";
import CardOptions from "./CardOptions";
import type { BookedCard } from "../../../../types/ui";
import dayjs from "dayjs";

export default function TeacherLessons({
  lessons,
}: {
  lessons: BookedCard[] | undefined;
}) {
  const lessonsJSX: JSX.Element[] = [];

  const orderedByStartTime = [...(lessons ?? [])].sort(
    (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf(),
  );

  orderedByStartTime?.forEach((lesson, i) => {
    lessonsJSX.push(
      <div
        className="flex justify-between items-center flex-wrap px-4 py-2 bg-jade rounded"
        key={i}
      >
        <LessonGroup lesson={lesson} />
        <CardOptions lesson={lesson} />
      </div>,
    );
  });
  return <div className="flex flex-col gap-3">{lessonsJSX}</div>;
}
