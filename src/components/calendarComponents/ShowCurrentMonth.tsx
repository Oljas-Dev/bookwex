import { useNavigate, useSearchParams } from "react-router-dom";
import type { Slot } from "../../contexts/BookingContextData";
import { useCalendar } from "../../contexts/CalendarContext";
import SmallBlock from "../../ui/SmallBlock";
import type { JSX } from "@emotion/react/jsx-runtime";
import { useLessons } from "../../api/features/useLessons";
import { useAuth } from "../../contexts/useAuth";

export default function ShowCurrentMonth({
  teacherId,
}: {
  teacherId: string | undefined;
}) {
  const { isTeacher } = useAuth();
  const { currentMonth, daysInMonth, isToday } = useCalendar();
  const [searchParams, setSearchParams] = useSearchParams();
  const { lessons } = useLessons(teacherId);

  // console.log(lessons);

  const navigate = useNavigate();

  const daysArr = Array.from({ length: daysInMonth }, (_, i) =>
    createDaysObj(i),
  );

  function createDaysObj(i: number) {
    const month = (currentMonth.getMonth() + 1).toString().padStart(2, "0");
    const day = (i + 1).toString().padStart(2, "0");

    const id = `${currentMonth.getFullYear()}-${month}-${day}`;
    const dayObj = {
      id,
    };

    return dayObj;
  }

  function handleSelectedDay(id: string) {
    searchParams.set("dayId", id);
    setSearchParams(searchParams);
    navigate("bookLesson/" + searchParams.toString());
  }

  const days: JSX.Element[] = [];

  daysArr.forEach((day, i) => {
    const bookedSlots = lessons?.some(
      (slot: Slot) => slot.start_time.substring(0, 10) === day.id,
    );

    const greenSlots = lessons?.some(
      (slot: Slot) =>
        slot.start_time.substring(0, 10) === day.id &&
        slot.status === "available",
    );

    days.push(
      <SmallBlock
        styles={`${isToday(i + 1) ? "font-semibold" : ""} ${isTeacher && bookedSlots && "cursor-pointer"} ${greenSlots && "text-green-day cursor-pointer"}  mb-7`}
        onClick={
          greenSlots || isTeacher ? () => handleSelectedDay(day.id) : () => null
        }
        key={i}
      >
        {i + 1}
      </SmallBlock>,
    );
  });

  return <>{days}</>;
}
