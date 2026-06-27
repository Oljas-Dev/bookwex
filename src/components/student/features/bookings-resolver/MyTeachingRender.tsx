import { useBookedSlots } from "../../../../api/features/useBookedSlots";
import type { BookedCard } from "../../../../types/ui";
import TeacherCompletedLessons from "../../ui/teachers-card/TeacherCompletedLessons";
import TeacherDisputedLessons from "../../ui/teachers-card/TeacherDisputedLessons";
import TeacherPendingLessons from "../../ui/teachers-card/TeacherPendingLessons";
import TeacherUpcomingLessons from "../../ui/teachers-card/TeacherUpcomingLessons";
import { useCards } from "../context/useCards";

export default function MyTeaching() {
  const { data } = useBookedSlots();
  const { lessonStatus } = useCards();

  const bookedCards: BookedCard[] | undefined = data?.map((booking) => ({
    lessonId: booking.id,
    slotId: booking.slot_id,
    teacherId: booking.teacher?.id,
    studentName: booking.student?.name,
    teacherName: booking.teacher?.name,
    startTime: booking.startTime,
    duration: booking.duration,
    studentsAvatar: booking.student?.avatar,
    hasUnreadMessages: false,
    teacherOutcome: booking.teacher_outcome,
    studentOutcome: booking.student_outcome,
    status: booking.status,
    viewerRole: booking.viewerRole,
    rating: booking.rating,
  }));

  if (lessonStatus === "upcoming")
    return <TeacherUpcomingLessons cards={bookedCards} />;

  if (lessonStatus === "pending")
    return <TeacherPendingLessons cards={bookedCards} />;

  if (lessonStatus === "completed")
    return <TeacherCompletedLessons cards={bookedCards} />;

  if (lessonStatus === "disputed")
    return <TeacherDisputedLessons cards={bookedCards} />;
}
