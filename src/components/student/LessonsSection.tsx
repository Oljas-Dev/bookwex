import useStudent from "../../api/features/useStudent";
import { useAuth } from "../../contexts/useAuth";
import type { BookedCard, LessonCard } from "../../types/ui";
import { useTeachersLessons } from "./features/useTeachersLessons";
import LessonCardsContainer from "./ui/lessons-card/LessonCardsContainer";
import StudentLessons from "./ui/lessons-card/StudentLessons";
import TeacherLessons from "./ui/teachers-card/TeacherLessons";

export default function LessonsSection() {
  const { isTeacher } = useAuth();
  const { bookedLessons, loadingTeachersLessons } = useTeachersLessons();
  const { student, isPendingStudent } = useStudent();

  if (loadingTeachersLessons || isPendingStudent)
    return <p>loading your lessons...</p>;

  const bookedCards: BookedCard[] | undefined = bookedLessons?.map(
    (booking) => ({
      lessonId: booking.id,
      slotId: booking.slot_id,
      teacherId: booking.user_id,
      studentName: booking.full_name,
      startTime: booking.start_time,
      duration: booking.duration,
      studentsAvatar: booking.student.avatar_url,
      hasUnreadMessages: false,
    }),
  );

  const lessonCards: LessonCard[] | undefined = bookedLessons?.map(
    (lesson) => ({
      lessonId: lesson.id,
      slotId: lesson.slot_id,
      teacherId: lesson.user_id,
      startTime: lesson.start_time,
      duration: lesson.duration,
    }),
  );
  const teachersLessons = bookedCards ? bookedCards : [];
  const filteredTeachersLessons = teachersLessons?.filter(
    (l) => l?.teacherId === student?.id,
  );

  return (
    <section className="self-start flex flex-col gap-6 px-10 w-full">
      {isTeacher && teachersLessons?.length && (
        <LessonCardsContainer h2={"Lessons with your students:"}>
          <TeacherLessons lessons={filteredTeachersLessons} />
        </LessonCardsContainer>
      )}

      {lessonCards && (
        <LessonCardsContainer h2={"Your lessons:"}>
          <StudentLessons lessons={lessonCards} />
        </LessonCardsContainer>
      )}
    </section>
  );
}
