import { useBookedSlots } from "../../../../api/features/useBookedSlots";
import type { LessonCard } from "../../../../types/ui";
import MyStudentLessons from "../../ui/students-card/MyStudentLessons";
import StudentCompletedLessons from "../../ui/students-card/StudentCompletedLessons";
import StudentDisputedLessons from "../../ui/students-card/StudentDisputedLessons";
import StudentPendingLessons from "../../ui/students-card/StudentPendingLessons";
import { useCards } from "../context/useCards";

export default function StudentLearningRender() {
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
    conferenceLink: lesson.teacher?.conferenceLink,
  }));

  if (lessonStatus === "upcoming")
    return <MyStudentLessons cards={lessonCards} />;

  if (lessonStatus === "pending")
    return <StudentPendingLessons cards={lessonCards} />;

  if (lessonStatus === "completed")
    return <StudentCompletedLessons cards={lessonCards} />;

  if (lessonStatus === "disputed")
    return <StudentDisputedLessons cards={lessonCards} />;
}
