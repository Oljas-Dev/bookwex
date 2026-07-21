import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useLessons } from "../api/features/useLessons";
import { useBookLesson } from "../api/features/useBookLesson";
import type { Slot } from "../contexts/BookingContextData";
import { toNormalStr } from "../helpers/features";
import { useBookingConfirmation } from "../api/emails/useBookingConfirmation";
import { bookingConfirmationEmail } from "../api/emails/bookingConfirmation";
import { useTeachers } from "../api/features/useTeachers";

dayjs.extend(utc);

export default function BookingConfirmation() {
  const { teacherName } = useParams();

  const { profiles } = useTeachers();

  const currentTeacher = profiles?.find(
    (teacher) => toNormalStr(teacher.full_name) === toNormalStr(teacherName),
  );

  const { lessons } = useLessons(currentTeacher?.id);
  const { bookLesson, isBooking } = useBookLesson();
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useBookingConfirmation(lessonId?.substring(9));

  if (!lessons || !data || isLoading) {
    return <p>Is Loading...</p>;
  }

  const idParams = lessonId?.substring(9);

  const currentLesson: Slot[] = lessons?.filter(
    (lesson) => lesson.id === idParams,
  );

  const currentLessonDate = dayjs
    .utc(currentLesson![0].start_time)
    .format("MMMM D");
  const currentLessonStartTime = dayjs
    .utc(currentLesson![0].start_time)
    .format("HH:mm");
  const currentLessonEndTime = dayjs
    .utc(currentLesson![0].end_time)
    .format("HH:mm");

  const bookingDate = dayjs.utc(data.startTime).format("MMMM D");

  const lessonStart = dayjs.utc(data.startTime);
  const lessonEnd = lessonStart.add(data.duration, "minute");

  const studentStartTime = lessonStart.tz(data.studentTimezone).format("HH:mm");

  const studentEndTime = lessonEnd.tz(data.studentTimezone).format("HH:mm");

  const teacherStartTime = lessonStart.tz(data.teacherTimezone).format("HH:mm");

  const teacherEndTime = lessonEnd.tz(data.teacherTimezone).format("HH:mm");

  const currentLessonDuration = currentLesson![0].duration;

  // Changes status in 'slots' to 'booked' and creates new row in 'bookings' table with students data
  function handleBooking(slot: Slot[]) {
    const email = {
      bookingDate,
      studentStartTime,
      teacherStartTime,
      studentEndTime,
      teacherEndTime,
      studentEmail: data?.studentEmail,
      teacherEmail: data?.teacherEmail,
      teacherName: data?.teacherName,
    };

    const lessonId = slot[0].id;
    bookLesson({ lessonId });
    bookingConfirmationEmail(email);

    navigate(-1);
  }

  return (
    <section className="flex justify-center w-full px-4 py-6">
      <div className="flex flex-col gap-4 w-[50%] text-center max-[700px]:w-[90%] max-[400px]:w-full">
        <h2>Booking Confirmation on {currentLessonDate}</h2>
        <div>
          <h3 className="text-left">Lesson duration</h3>
          <p className="bg-jade items-center py-2 rounded">
            {currentLessonDuration} minutes
          </p>
        </div>

        <div>
          <h3 className="text-left">Lesson time</h3>
          <p className="bg-jade items-center py-2 rounded">
            from <strong>{currentLessonStartTime}</strong> to{" "}
            <strong>{currentLessonEndTime}</strong>
          </p>
        </div>

        <div className="flex justify-between">
          <button onClick={() => navigate(-1)}>cancel</button>
          <button
            className="bg-jade hover:bg-jade/70 disabled:bg-jet/10"
            onClick={() => handleBooking(currentLesson)}
            disabled={isBooking}
          >
            {isBooking ? "booking..." : "book"}
          </button>
        </div>
      </div>
    </section>
  );
}
