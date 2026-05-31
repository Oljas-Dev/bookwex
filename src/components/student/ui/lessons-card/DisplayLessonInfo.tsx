import dayjs from "dayjs";
import { formatLessonDate } from "../../../../helpers/features";
import { useEffect, useState } from "react";

export default function DisplayLessonInfo({
  startTime,
  duration,
}: {
  startTime: string;
  duration: number;
}) {
  const [timeLeft, setTimeLeft] = useState("");

  const day = dayjs(startTime).format("DD");
  const month = dayjs(startTime).format("MMMM");
  const from = dayjs(startTime).format("HH:mm");

  // Calculate time before lesson
  const timezoneFormat = formatLessonDate(startTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(dayjs(timezoneFormat).fromNow());
    }, 1000);

    return () => clearInterval(interval);
  }, [timezoneFormat]);

  return (
    <div className="flex flex-col justify-around">
      <p>
        Lesson on{" "}
        <strong>
          {day} of {month} at {from}
        </strong>
      </p>
      <p>starts {timeLeft}</p>
      <p>
        Duration: <strong>{duration}min.</strong>
      </p>
    </div>
  );
}
