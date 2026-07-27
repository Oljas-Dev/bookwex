import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useLessons } from "../api/features/useLessons";
import { useBookLesson } from "../api/features/useBookLesson";
import type { Slot } from "../contexts/BookingContextData";
import { useBookingConfirmation } from "../api/emails/useBookingConfirmation";
import { bookingConfirmationEmail } from "../api/emails/bookingConfirmation";

dayjs.extend(utc);

export default function BookingConfirmation() {
  const { lessonId, teacherId } = useParams();
  const { lessons } = useLessons(teacherId);
  const { bookLesson, isBooking } = useBookLesson();

  const lessonIdSubstring = lessonId?.substring(9);
  const { data, isLoading } = useBookingConfirmation(lessonIdSubstring);

  const navigate = useNavigate();

  if (!lessons || !data || isLoading) {
    return <p>Is Loading...</p>;
  }

  const currentLesson: Slot[] = lessons?.filter(
    (lesson) => lesson.id === lessonIdSubstring,
  );

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
        <h2>Booking Confirmation on {bookingDate}</h2>
        <div>
          <h3 className="text-left">Lesson duration</h3>
          <p className="bg-jade items-center py-2 rounded">
            {currentLessonDuration} minutes
          </p>
        </div>

        <div>
          <h3 className="text-left">Lesson time</h3>
          <p className="bg-jade items-center py-2 rounded">
            from <strong>{studentStartTime}</strong> to{" "}
            <strong>{studentEndTime}</strong>
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
