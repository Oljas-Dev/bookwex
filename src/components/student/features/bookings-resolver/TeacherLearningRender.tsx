import { useBookedSlots } from "../../../../api/features/useBookedSlots";
import type { LessonCard } from "../../../../types/ui";
import MyCompletedLessons from "../../ui/teachers-card/MyCompletedLessons";
import MyDisputedLessons from "../../ui/teachers-card/MyDisputedLessons";
import MyLessons from "../../ui/teachers-card/MyLessons";
import MyPendingLessons from "../../ui/teachers-card/MyPendingLessons";
import { useCards } from "../context/useCards";

export default function TeacherLearningRender() {
  const { data } = useBookedSlots();
  const { lessonStatus } = useCards();

  const lessonCards: LessonCard[] | undefined = data?.map((lesson) => ({
    lessonId: lesson.id,
    slotId: lesson.slot_id,
    teacherId: lesson.teacher?.id,
    startTime: lesson.startTime,
    duration: lesson.duration,
    viewerRole: lesson.viewerRole,
    studentOutcome: lesson.student_outcome,
    teacherOutcome: lesson.teacher_outcome,
    teacherAvatar: lesson.teacher?.avatar,
    teacherName: lesson.teacher?.name,
    status: lesson.status,
  }));

  if (lessonStatus === "upcoming") return <MyLessons cards={lessonCards} />;

  if (lessonStatus === "pending")
    return <MyPendingLessons cards={lessonCards} />;

  if (lessonStatus === "completed")
    return <MyCompletedLessons cards={lessonCards} />;

  if (lessonStatus === "disputed")
    return <MyDisputedLessons cards={lessonCards} />;
}
