import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/useAuth";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useCards } from "../../features/context/useCards";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function DisplayLessonInfo({
  startTime,
  duration,
}: {
  startTime: string;
  duration: number;
}) {
  const { profile } = useAuth();
  const { lessonStatus } = useCards();
  const [timeLeft, setTimeLeft] = useState("");
  const [quickStatus, setQuickStatus] = useState("");

  const end = dayjs(startTime).add(duration, "minute");
  const day = dayjs(startTime).tz(profile?.timezone).format("DD");
  const month = dayjs(startTime).tz(profile?.timezone).format("MMMM");
  const from = dayjs(startTime).tz(profile?.timezone).format("HH:mm");

  // Calculate time before lesson
  // const timezoneFormat = formatLessonDate(startTime, profile?.timezone);

  useEffect(() => {
    const update = () => {
      const currentNow = dayjs();

      setTimeLeft(dayjs(startTime).fromNow());

      if (currentNow.isAfter(dayjs(startTime)) && currentNow.isBefore(end)) {
        setQuickStatus("in progress");
      } else {
        setQuickStatus("starts");
      }
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [startTime, end]);

  return (
    <div className="flex flex-col items-center justify-between">
      <p>
        Lesson on{" "}
        <strong>
          {day} of {month} at {from}
        </strong>
      </p>
      <p>
        {lessonStatus === "upcoming" ? quickStatus : "finished"} {timeLeft}
      </p>
      <p>
        Duration: <strong>{duration}min.</strong>
      </p>
    </div>
  );
}
