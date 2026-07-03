import { ArrowLeft, CalendarEvent, PersonFill } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { formatLessonDate } from "../../../helpers/features";
import { useAuth } from "../../../contexts/useAuth";

export default function ChatsHeader({
  startTime,
  duration,
  teacherName,
}: {
  startTime: string;
  duration: number;
  teacherName: string;
}) {
  const { profile } = useAuth();

  const navigate = useNavigate();

  const currentDay = dayjs(startTime).format("MMMM D");

  const derivedEndTime = dayjs(startTime).add(duration, "minutes").format();

  const startLessonTime = formatLessonDate(
    startTime,
    profile?.timezone,
    "HH:mm",
  );
  const endLessonTime = formatLessonDate(
    derivedEndTime,
    profile?.timezone,
    "HH:mm",
  );

  return (
    <div>
      {/* Navigational panel for chats page */}
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-jet/20 max-w-fit px-2 rounded-lg hover:bg-jet/10 cursor-pointer">
          <ArrowLeft
            style={{
              alignSelf: "start",
            }}
            onClick={() => navigate(-1)}
          />
        </div>
        <Link
          to={`/teacher/${teacherName}`}
          className="hover:scale-110 active:scale-90"
        >
          <CalendarEvent size={24} />
        </Link>
        <a href="/profile" className="hover:scale-110 active:scale-90">
          <PersonFill size={24} />
        </a>
      </div>

      {/* Chats header */}
      <div className="text-center max-[400px]:text-2xl">
        Discuss your lesson on {currentDay} <br />
        from {startLessonTime} - {endLessonTime}
      </div>
    </div>
  );
}
