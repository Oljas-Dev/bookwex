import { memo } from "react";
import { useBookings } from "../contexts/useBookings";
import {
  LESSON_DURATIONS,
  type LessonDuration,
} from "../contexts/BookingContextData";

const DurationSelector = memo(() => {
  const { setDuration, setBuffer, duration } = useBookings();
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <label htmlFor="lessonDuration">Lesson duration</label>
        {/* <select
          id="lessonDuration"
          className="p-2 border text-sm rounded"
          onChange={(e) => setDuration(Number(e.target.value))}
        >
          <option value="30">30</option>
          <option value="45">45</option>
          <option value="60">60</option>
        </select> */}
        <select
          value={duration}
          onChange={(e) =>
            setDuration(Number(e.target.value) as LessonDuration)
          }
        >
          {LESSON_DURATIONS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="lessonDuration">Buffer between lessons</label>
        <select
          id="lessonDuration"
          className={`p-2 border text-sm rounded`}
          defaultValue={0}
          onChange={(e) => setBuffer(Number(e.target.value))}
        >
          <option value="0">none</option>
          <option value="5">5 min</option>
          <option value="10">10 min</option>
          <option value="15">15 min</option>
        </select>
      </div>
    </div>
  );
});

export { DurationSelector };
