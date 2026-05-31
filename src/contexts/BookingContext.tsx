import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useRef, useState, type ReactNode } from "react";
import {
  BookingContext,
  type DialogConfigTypes,
  type RecurringFormState,
  type Slot,
} from "./BookingContextData";
import { useAuth } from "./useAuth";
import type { DialogStateProps } from "../components/calendarComponents/CheckTimeSlots";
// import { getHoursAndMinutes } from "../helpers/functions";

dayjs.extend(utc);

export function BookingContextProvider({ children }: { children: ReactNode }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState<0 | 30 | 60 | 45>(30);
  const [buffer, setBuffer] = useState<number>(0);
  // Errors with booking
  const [noUserError, setNoUserError] = useState(false);
  // Dialog window
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [dialogConfig, setDialogConfig] = useState<DialogConfigTypes | null>(
    null,
  );

  const { user } = useAuth();

  // Dialogs used in app
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const dialogFormRef = useRef<HTMLDialogElement | null>(null);

  // Close by clicking on button
  const closeDialog = (): void => {
    dialogRef?.current?.close();
    setSelectedSlot(null);
  };

  // function expiredSlotsCheck() {
  //   const now = dayjs().format("YYYY-MM-DD HH:mm");
  //   const slotsFromStorage = JSON.parse(localStorage.getItem("slots"));

  //   if (!slotsFromStorage) return [];

  //   const newSlots: Slot[] = [];

  //   // Check whether the slot is outdated
  //   const noExpiredSlots = slotsFromStorage.forEach((slot: Slot) => {
  //     const outdatedSlot = dayjs(now).add(5, "minute").isAfter(slot.start);
  //     if (outdatedSlot) {
  //       slot.status = "expired";
  //     }
  //     newSlots.push(slot);
  //   });

  //   return newSlots;
  // }

  // Getting rid of repeating numbers in selectedDays array
  const uniqueSelectedDays: number[] = [...new Set(selectedDays)];

  const formState: RecurringFormState = {
    startDate,
    endDate,
    selectedDays,
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

  const bookedSlots: Slot[] = [
    {
      id: "b1",
      user_id: "tutor-1",
      start_time: "2026-04-03T07:00:00.000Z",
      end_time: "2026-04-03T10:00:00.000Z",
      duration: 30,
      status: "booked",
    },
  ];

  function openDialog(lessonId: string, type: keyof DialogStateProps) {
    setDialogConfig({
      lessonId,
      type,
    });

    dialogRef?.current?.showModal();
  }

  // generate free slots in schedule
  function generateSlots(form: RecurringFormState): Slot[] {
    if (!form) {
      throw new Error("Form contain no values");
    }

    const slots: Slot[] = [];

    if (
      !form.startDate ||
      !form.endDate ||
      !form.startTime ||
      !form.endTime ||
      form.duration <= 0
    ) {
      return slots;
    }

    let currentDate = dayjs.utc(form.startDate);
    const endDate = dayjs.utc(form.endDate);

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
      const dateStr = currentDate.format("YYYY-MM-DD");
      const dayOfWeek = currentDate.day();

      const exception = form.exceptions?.find(
        (excep) => excep.date === dateStr,
      );

      // skip excluded days
      if (exception?.type === "exclude") {
        currentDate = currentDate.add(1, "day");
        continue;
      }

      // determine if we should generate slots
      const isSelectedDay = form.selectedDays.includes(dayOfWeek);
      const isOverride = exception?.type === "override";

      if (isSelectedDay || isOverride) {
        const startTime = isOverride ? exception.startTime : form.startTime;
        const endTime = isOverride ? exception.endTime : form.endTime;

        let currentTime = dayjs.utc(`${dateStr}T${startTime}:00Z`);
        const dayEndTime = dayjs.utc(`${dateStr}T${endTime}:00Z`);

        while (true) {
          const slotEnd = currentTime.add(form.duration, "minute");

          // Generation breaks if time left is not enough for a whole lesson
          if (slotEnd.isAfter(dayEndTime)) break;

          slots.push({
            id: crypto.randomUUID(),
            user_id: user!.id,
            start_time: currentTime.toISOString(),
            end_time: slotEnd.toISOString(),
            duration: form.duration,
            buffer: form.buffer ?? 0,
            status: "available",
          });

          currentTime = slotEnd.add(form.buffer, "minute");
        }
      }

      currentDate = currentDate.add(1, "day");
    }
    return slots;
  }

  const generatedSlots = generateSlots(formState);

  function isOverlapping(slot: Slot, booked: Slot) {
    return (
      dayjs(slot.start_time).isBefore(dayjs(booked.end_time)) &&
      dayjs(slot.end_time).isAfter(dayjs(booked.start_time))
    );
  }

  function filterAvailableSlots(slots: Slot[], bookedSlots: Slot[]): Slot[] {
    const slotsWithStatus = slots.map((slot) => {
      const isBooked = bookedSlots.some((booked) =>
        isOverlapping(slot, booked),
      );

      return {
        ...slot,
        status: isBooked ? "booked" : "available",
      };
    });
    return slotsWithStatus;
  }

  const availableSlots = filterAvailableSlots(generatedSlots, bookedSlots);

  // const testTiming = (timeArr: Slot[]) => {
  //   const res = timeArr.map(
  //     (slot) =>
  //       " from " +
  //       getHoursAndMinutes(new Date(Date.parse(slot.start))) +
  //       " till " +
  //       getHoursAndMinutes(new Date(Date.parse(slot.end))),
  //   );

  //   return res;
  // };

  // const isPast = dayjs().isAfter(dayjs("2026-03-27T16:54:00.000Z"));

  // console.log(isPast);
  // console.log(availableSlots);

  return (
    <BookingContext.Provider
      value={{
        selectedSlot,
        dialogRef,
        dialogConfig,
        dialogFormRef,
        uniqueSelectedDays,
        bookedSlots,
        availableSlots,
        startDate,
        endDate,
        startTime,
        endTime,
        selectedDays,
        duration,
        buffer,
        noUserError,
        setSelectedSlot,
        setNoUserError,
        setStartDate,
        setStartTime,
        setSelectedDays,
        setEndDate,
        setEndTime,
        setDuration,
        setBuffer,
        generateSlots,
        filterAvailableSlots,
        closeDialog,
        openDialog,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
