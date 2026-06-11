import { useAuth } from "../../contexts/useAuth";
import type { BookedCard, LessonCard, MapperBooking } from "../../types/ui";
// import { useTeachersLessons } from "./features/useTeachersLessons";
import LessonCardsContainer from "./ui/lessons-card/LessonCardsContainer";
import StudentLessons from "./ui/lessons-card/StudentLessons";
import TeacherLessons from "./ui/teachers-card/TeacherLessons";

export default function LessonsSection({
  bookedLessons,
}: {
  bookedLessons: MapperBooking[] | undefined;
}) {
  const { profile, loading, isTeacher } = useAuth();

  if (loading) return <p>loading your lessons...</p>;

  const bookedCards: BookedCard[] | undefined = bookedLessons?.map(
    (booking) => ({
      lessonId: booking.id,
      slotId: booking.slot_id,
      teacherId: booking.teacher?.id,
      studentName: booking.student?.name,
      startTime: booking.startTime,
      duration: booking.duration,
      studentsAvatar: booking.student?.avatar,
      hasUnreadMessages: false,
    }),
  );

  const lessonCards: LessonCard[] | undefined = bookedLessons?.map(
    (lesson) => ({
      lessonId: lesson.id,
      slotId: lesson.slot_id,
      teacherId: lesson.teacher?.id,
      startTime: lesson.startTime,
      duration: lesson.duration,
    }),
  );
  const teachersLessons = bookedCards ? bookedCards : [];

  const filteredTeachersLessons = teachersLessons.filter(
    (l) => l?.teacherId === profile?.id,
  );

  return (
    <section className="self-start flex flex-col gap-6 px-10 w-full">
      {isTeacher && teachersLessons?.length && (
        <LessonCardsContainer h2={"Lessons with your students:"}>
          <TeacherLessons lessons={filteredTeachersLessons} />
        </LessonCardsContainer>
      )}

      {lessonCards !== undefined && lessonCards?.length > 0 && (
        <LessonCardsContainer h2={"Your lessons:"}>
          <StudentLessons lessons={lessonCards} />
        </LessonCardsContainer>
      )}
    </section>
  );
}
