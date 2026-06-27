import { useBookings } from "../contexts/useBookings";
import type { RecurringFormState } from "../contexts/BookingContextData";
import { useState, type FormEvent } from "react";
import { DateSelector } from "../ui/DateSelector";
import { FormWeekDays } from "../ui/FormWeekDays";
import { TimeSelector } from "../ui/TimeSelector";
import { DurationSelector } from "../ui/DurationSelector";
import { useNavigate } from "react-router-dom";
import useInsertlots from "../api/features/useInsertSlots";
import useProfile from "../api/features/useProfile";
import { toParamStr } from "../helpers/features";

export default function Planner() {
  const [noDatesError, setNoDatesError] = useState(false);
  const [noWeekDayError, setNoWeekDayError] = useState(false);
  const [noHoursError, setNoHoursError] = useState(false);
  const [noDurationError, setNoDurationError] = useState(false);
  const { insert, isInserting } = useInsertlots();

  const { profile } = useProfile();

  const {
    startDate,
    endDate,
    startTime,
    endTime,
    duration,
    buffer,
    uniqueSelectedDays,
    generateSlots,
    filterAvailableSlots,
    bookedSlots,
    setSelectedDays,
  } = useBookings();

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!startDate || !endDate) {
      setNoDatesError(true);
      return;
    } else setNoDatesError(false);
    if (uniqueSelectedDays.length === 0) {
      setNoWeekDayError(true);
      return;
    } else setNoWeekDayError(false);
    if (!startTime || !endTime) {
      setNoHoursError(true);
      return;
    } else if (
      !startTime.isValid() ||
      !endTime.isValid() ||
      !endTime.isAfter(startTime)
    ) {
      setNoHoursError(true);
      return;
    } else setNoHoursError(false);
    if (duration <= 0) {
      setNoDurationError(true);
      return;
    } else setNoDurationError(false);

    const newSlots: RecurringFormState = {
      startDate,
      endDate,
      selectedDays: uniqueSelectedDays,
      startTime,
      endTime,
      duration,
      buffer,

      exceptions: [
        { type: "exclude", date: "" },
        {
          type: "override",
          date: "",
          startTime: "",
          endTime: "",
        },
      ],
    };

    const generatedSlots = generateSlots(newSlots);

    const filteredSlots = filterAvailableSlots(generatedSlots, bookedSlots);

    insert(filteredSlots, {
      onSuccess: () => {
        setSelectedDays([]);
        navigate(`/teacher/${toParamStr(profile?.full_name)}`);
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 text-center w-[60%]"
      id="datePickerForm"
    >
      <h2>Create a reccuring schedule of your lessons</h2>
      <div className="flex flex-col gap-10 w-full">
        <p className="text-lg font-bold">Choose your working period</p>

        <DateSelector />
        {noDatesError && (
          <p className="text-red-400 -mb-8">Start and end dates are required</p>
        )}
        <hr className={`${noDatesError ? "border-red-400" : ""}`} />

        <FormWeekDays />
        {noWeekDayError && (
          <p className="text-red-400 -mb-8">Please choose your working days</p>
        )}
        <hr className={`${noWeekDayError ? "border-red-400" : ""}`} />

        <TimeSelector />
        {noHoursError && (
          <p className="text-red-400 -mb-8">
            Please select a valid time range. The end time must be later than
            the start time
          </p>
        )}
        <hr className={`${noHoursError ? "border-red-400" : ""}`} />

        <DurationSelector />
        {noDurationError && (
          <p className="text-red-400 -mb-8">
            Please choose duration of your lessons
          </p>
        )}

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="cursor-pointer py-1"
            disabled={isInserting}
          >
            {isInserting ? "creating new lessons..." : "save"}
          </button>
          <button type="reset" className="py-1" onClick={() => navigate(-1)}>
            cancel
          </button>
        </div>
      </div>
    </form>
  );
}
