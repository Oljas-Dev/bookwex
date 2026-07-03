import type { JSX } from "@emotion/react/jsx-runtime";
import dayjs from "dayjs";
import DisplayLessonInfo from "../students-card/DisplayLessonInfo";
import type { LessonCard } from "../../../../types/ui";
import TeacherIdentity from "../students-card/TeacherIdentity";
import { Check2All } from "react-bootstrap-icons";
import ShowLessonRating from "../../../reviewsSection/ui/ShowLessonRating";

export default function StudentCompletedLessons({
  cards,
}: {
  cards: LessonCard[] | undefined;
}) {
  const upcomingLessons = cards?.filter(
    (lesson) =>
      lesson.status === "completed" && lesson.viewerRole === "student",
  );

  const lessonsJSX: JSX.Element[] = [];

  const orderedByStartTime = [...(upcomingLessons ?? [])].sort(
    (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf(),
  );

  orderedByStartTime?.forEach((lesson) => {
    lessonsJSX.push(
      <div
        className="flex justify-between items-center flex-wrap px-4 py-2 bg-orange-200 rounded max-[600px]:flex-col max-[600px]:gap-3"
        key={lesson.lessonId}
      >
        <div className="flex gap-6 max-[600px]:flex-col max-[600px]:gap-2">
          <TeacherIdentity lesson={lesson} />

          <DisplayLessonInfo
            duration={lesson.duration}
            startTime={lesson.startTime}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="flex gap-2 justify-end">
            <p>Lesson completed </p>
            <Check2All size={20} />
          </span>
          <ShowLessonRating
            lessonId={lesson.lessonId}
            teacherId={lesson.teacherId}
          />
        </div>
      </div>,
    );
  });

  return (
    <div className="flex flex-col gap-3">
      {orderedByStartTime.length > 0
        ? lessonsJSX
        : "There are no completed lessons"}
    </div>
  );
}
