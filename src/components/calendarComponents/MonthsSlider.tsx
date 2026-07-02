import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import localeData from "dayjs/plugin/localeData";
import { useCalendar } from "../../contexts/CalendarContext";
import { useMediaQuery } from "@mui/material";

dayjs.extend(localizedFormat);
dayjs.extend(localeData);

export default function MonthsSlider() {
  const { handlePreviousMonth, currentMonth, handleNextMonth } = useCalendar();

  const now = dayjs(currentMonth);

  const isTablet = useMediaQuery("(max-width:600px)");

  // Get previous month with possibility to make multylingual
  const prevMonthName = now
    .subtract(1, "month")
    .locale("en")
    .format(isTablet ? "MMM" : "MMMM");
  const nextMonthName = now
    .add(1, "month")
    .locale("en")
    .format(isTablet ? "MMM" : "MMMM");

  return (
    <div className="flex justify-between">
      <div onClick={handlePreviousMonth}>
        <h2 className="text-jade-light cursor-pointer">{prevMonthName}</h2>
      </div>
      <h2>
        {currentMonth.toLocaleString("default", { month: "long" })}{" "}
        <span>{currentMonth.getFullYear()}</span>
      </h2>
      <div onClick={handleNextMonth}>
        <h2 className="text-jade-light cursor-pointer">{nextMonthName}</h2>
      </div>
    </div>
  );
}
