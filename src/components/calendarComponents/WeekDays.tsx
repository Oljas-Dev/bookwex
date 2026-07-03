import { useBookings } from "../../contexts/useBookings";

type WeekDays = {
  name: string;
  id: number;
};

export default function WeekDays({
  styles,
  fn,
}: {
  styles?: string;
  fn?: boolean;
}) {
  const { selectedDays, setSelectedDays } = useBookings();
  const weekdaysArr: WeekDays[] = [
    {
      name: "Su",
      id: 0,
    },
    {
      name: "Mo",
      id: 1,
    },
    {
      name: "Tu",
      id: 2,
    },
    {
      name: "We",
      id: 3,
    },
    {
      name: "Th",
      id: 4,
    },
    {
      name: "Fr",
      id: 5,
    },
    {
      name: "St",
      id: 6,
    },
  ];

  function handleSelectDays(dayId: number) {
    setSelectedDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((id) => id !== dayId)
        : [...prev, dayId],
    );
  }
  return (
    <div className={`calendar-grid ${styles}`}>
      {weekdaysArr.map((day) => (
        <div
          key={day.id}
          className={`${
            selectedDays.includes(day.id)
              ? "font-semibold underline bg-jet/15"
              : ""
          } flex items-center justify-center w-8 h-8 rounded-full`}
          onClick={fn ? () => handleSelectDays(day.id) : undefined}
        >
          <p>{day.name}</p>
        </div>
      ))}
      {/* {weekdaysArr.map((day, i) => (
        <div
          className={`${selectedDays.some((day) => day === weekdaysArr[i].id) && "font-semibold underline bg-jet/15"} flex items-center justify-center w-8 h-8  rounded-full`}
          onClick={fn ? () => handleSelectDays(i) : () => null}
          key={i}
        >
          <p>{day.name}</p>
        </div>
      ))} */}
    </div>
  );
}
