import { memo } from "react";
import WeekDays from "../components/calendarComponents/WeekDays";

const FormWeekDays = memo(() => {
  return (
    <div className="max-[400px]:px-6">
      <p className="text-lg font-bold">
        Now let's choose days of week when you plan to work
      </p>
      <WeekDays styles={`cursor-pointer`} fn={true} />
    </div>
  );
});

export { FormWeekDays };
