import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { Slot } from "../../contexts/BookingContextData";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBookings } from "../../contexts/useBookings";
import { useAuth } from "../../contexts/useAuth";
import { useBookedSlots } from "../../api/features/useBookedSlots";
import type { Dispatch, SetStateAction } from "react";
import type { DialogStateProps } from "./CheckTimeSlots";
import useProfile from "../../api/features/useProfile";

dayjs.extend(utc);

export default function DayWithSlots({
  slot,
  openDialog,
  setDialogState,
}: {
  slot: Slot;
  openDialog: (slotId: string) => void;
  setDialogState: Dispatch<SetStateAction<keyof DialogStateProps>>;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated, isStudent, isTeacher, user } = useAuth();
  const { profile } = useProfile();
  const { setNoUserError } = useBookings();
  const { data: bookedSlots } = useBookedSlots();

  console.log(bookedSlots);

  const navigate = useNavigate();

  // Authentication checks and permissions
  const booked = slot?.status === "booked";

  // Other teachers cannot see delete button of other teachers
  const currentTeacherCheck = isTeacher && user?.id === profile?.id;

  // Students can work only with own bookings
  const findCurrentUserBooking = bookedSlots?.some(
    (bookedSlot) => bookedSlot.slot_id === slot.id,
  );

  const startTime = dayjs.utc(slot.start_time).format("HH:mm");
  const endTime = dayjs.utc(slot.end_time).format("HH:mm");

  // Users cannot cancel their bookings 12 hours before the lesson starts
  const hoursLeft = dayjs(slot?.start_time).diff(dayjs(), "minute") / 60;

  const canCancel = hoursLeft >= 12;

  function handleSlotClick() {
    if (!user) {
      setNoUserError(true);
      return;
    }

    searchParams.set("lessonId", slot.id);
    setSearchParams(searchParams);
    navigate(searchParams.toString());
  }

  return (
    <>
      <div
        className={`flex flex-col items-center py-2 rounded ${booked ? "bg-jade-light/40 [&_p]:text-jet/50 hover:bg-jade-light/40 hover:[&_p]:text-jet/50" : "bg-jade cursor-pointer hover:bg-jet/80 hover:[&_p]:text-jade"} card`}
        onClick={
          slot.status === "available" ? () => handleSlotClick() : () => null
        }
      >
        <div className="flex justify-between items-center w-full px-3">
          <p>
            {startTime} - {endTime} {slot.status}
          </p>
          {/* Right side options */}
          <div className="p-0">
            {booked &&
              isAuthenticated &&
              findCurrentUserBooking &&
              canCancel && (
                <button
                  className="iconBtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDialogState("cancel");
                    openDialog(slot.id);
                  }}
                >
                  <i className="bi bi-x-octagon icon hover:text-jade"></i>
                </button>
              )}
            {booked && isAuthenticated && findCurrentUserBooking && (
              <button
                className="iconBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  setDialogState("chat");
                  openDialog(slot.id);
                }}
              >
                <i className="bi bi-card-text icon hover:text-jade"></i>
              </button>
            )}
            {currentTeacherCheck && !isStudent && !booked && (
              <button
                className="iconBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  setDialogState("delete");
                  openDialog(slot.id);
                }}
              >
                <i className="bi bi-trash3-fill icon hover:text-jade"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
