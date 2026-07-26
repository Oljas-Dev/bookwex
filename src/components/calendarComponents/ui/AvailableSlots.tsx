import { useParams } from "react-router-dom";
import DayWithSlots from "../DayWithSlots";
import NoUserError from "./NoUserError";
import type { Slot } from "../../../contexts/BookingContextData";
import { useBookings } from "../../../contexts/useBookings";
import type { Dispatch, SetStateAction } from "react";
import type { DialogStateProps } from "../CheckTimeSlots";

export default function AvailableSlots({
  slots,
  openDialog,
  setDialogState,
  setCurrentTeacherId,
}: {
  slots: Slot[];
  openDialog: (slotId: string) => void;
  setCurrentTeacherId: Dispatch<SetStateAction<string>>;
  setDialogState: Dispatch<SetStateAction<keyof DialogStateProps>>;
}) {
  const { teacherId, dayId } = useParams();
  const { noUserError } = useBookings();

  if (!teacherId) return <p>teacher is not found</p>;

  return (
    <div className="flex flex-col gap-2">
      <h2>Book lessons on {dayId}</h2>
      <p className="font-semibold">Available time slots</p>
      {slots.length > 0 ? (
        slots?.map((slot) => {
          return (
            <DayWithSlots
              slot={slot}
              openDialog={openDialog}
              setDialogState={setDialogState}
              teacherId={teacherId}
              key={slot.id}
            />
          );
        })
      ) : (
        <div className="text-xl">There are no lessons for this date</div>
      )}

      {noUserError && (
        <NoUserError
          setCurrentTeacherId={setCurrentTeacherId}
          teacherId={teacherId}
        />
      )}
    </div>
  );
}
