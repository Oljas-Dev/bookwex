import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useLessons } from "../api/features/useLessons";
import { useBookLesson } from "../api/features/useBookLesson";
import type { Slot } from "../contexts/BookingContextData";

dayjs.extend(utc);

export default function BookingConfirmation() {
  const { lessons } = useLessons();
  const { bookLesson, isBooking } = useBookLesson();
  const { lessonId } = useParams();
  const navigate = useNavigate();

  if (!lessons) {
    return <p>Is Loading...</p>;
  }
  const idParams = lessonId?.substring(9);

  const currentLesson = lessons?.filter((lesson) => lesson.id === idParams);

  const currentLessonDate = dayjs
    .utc(currentLesson![0].start_time)
    .format("MMMM D");
  const currentLessonStartTime = dayjs
    .utc(currentLesson![0].start_time)
    .format("HH:mm");
  const currentLessonEndTime = dayjs
    .utc(currentLesson![0].end_time)
    .format("HH:mm");

  const currentLessonDuration = currentLesson![0].duration;

  // Changes status in 'slots' to 'booked' and creates new row in 'bookings' table with students data
  function handleBooking(id: Slot[]) {
    // Showing or sending message of cancellation deadline
    const cancellationDeadline = dayjs(currentLesson[0].start_time)
      .subtract(12, "hour")
      .format("MMMM D, HH:mm");

    const lessonId = id[0].id;
    bookLesson({ lessonId });

    navigate(-1);
    console.log(`Cancellations close on ${cancellationDeadline}`);
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
