import type { BookedCard, LessonCard } from "../../../../types/ui";
import { useUpdateLessonOutcome } from "../../features/useUpdateLessonOutcome";

export default function LessonConfirmed({
  lesson,
}: {
  lesson: BookedCard | LessonCard;
}) {
  const { updateOutcome, isPending } = useUpdateLessonOutcome();

  function changeStatusBack(lessonId: string) {
    updateOutcome({
      bookingId: lessonId,
      role: lesson.viewerRole === "teacher" ? "teacher" : "student",
      outcome: "pending",
    });
  }
  return (
    <div className="flex flex-col gap-1 text-right">
      <p>
        You've confirmed lesson as{" "}
        <strong>
          {lesson.viewerRole === "teacher"
            ? lesson.teacherOutcome
            : lesson.studentOutcome}
        </strong>
      </p>
      <p>
        Waiting for {lesson.viewerRole === "teacher" ? "student" : "teacher"} to
        confirm
      </p>
      <p
        onClick={() => changeStatusBack(lesson.lessonId)}
        className="hover:text-amber-100 cursor-pointer"
      >
        {isPending ? "changing..." : "change status?"}
      </p>
    </div>
  );
}
