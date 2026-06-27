import type { lessonStatuses } from "../../features/context/LessonsContextData";
import { useCards } from "../../features/context/useCards";

export default function CardsNavigation() {
  const { lessonStatus, setLessonStatus } = useCards();

  function bookingConfig(status: lessonStatuses) {
    setLessonStatus(status);
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => bookingConfig("upcoming")}
        className={`${lessonStatus === "upcoming" && "bg-jet text-jade"}`}
      >
        upcoming
      </button>
      <button
        onClick={() => bookingConfig("pending")}
        className={`${lessonStatus === "pending" && "bg-jet text-jade"}`}
      >
        pending
      </button>
      <button
        onClick={() => bookingConfig("completed")}
        className={`${lessonStatus === "completed" && "bg-jet text-jade"}`}
      >
        completed
      </button>
      <button
        onClick={() => bookingConfig("disputed")}
        className={`${lessonStatus === "disputed" && "bg-jet text-jade"}`}
      >
        disputed
      </button>
    </div>
  );
}
