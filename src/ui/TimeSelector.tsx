import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import { memo } from "react";
import { useBookings } from "../contexts/useBookings";

const TimeSelector = memo(() => {
  const { startTime, setStartTime, endTime, setEndTime } = useBookings();
  return (
    <div className="flex flex-col gap-1">
      <p className="text-lg font-semibold">
        Here you can set your working hours
      </p>
      <div className="flex justify-between">
        {/* To be refactored */}
        <div className="flex flex-col gap-1">
          <p>Please set the start point</p>
          <TimePicker
            label="from"
            value={startTime}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            onChange={(value) => setStartTime(value)}
          />
        </div>

        {/* To be refactored */}
        <div className="flex flex-col gap-1">
          <p>Please set the end point</p>
          <TimePicker
            label="to"
            value={endTime}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            onChange={(value) => setEndTime(value)}
          />
        </div>
      </div>
    </div>
  );
});

export { TimeSelector };
