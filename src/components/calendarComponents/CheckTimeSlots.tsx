import { Link, useNavigate, useParams } from "react-router-dom";
import DayWithSlots from "./DayWithSlots";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ArrowLeft } from "react-bootstrap-icons";
import { useLessons } from "../../api/features/useLessons";
import { useBookings } from "../../contexts/useBookings";
import PopUpDialog from "./ui/PopUpDialog";
import { useBookedSlots } from "../../api/features/useBookedSlots";
import { useAuth } from "../../contexts/useAuth";
import { useState } from "react";
import { useCancelBooking } from "./features/useCancelBooking";
import { useDeleteSlot } from "./features/useDeleteSlot";
import { useTeachers } from "../../api/features/useTeachers";
import { toNormalStr } from "../../helpers/features";

dayjs.extend(utc);

interface DialogDataProps {
  h2: string;
  popUpMessage: string;
  btnText: string;
}

export interface DialogStateProps {
  delete?: DialogDataProps;
  chat: DialogDataProps;
  cancel: DialogDataProps;
}

export default function CheckTimeSlots() {
  const [dialogState, setDialogState] =
    useState<keyof DialogStateProps>("chat");
  const { dayId, teacherName } = useParams();

  const { profiles } = useTeachers();

  const currentTeacher = profiles?.find(
    (teacher) => toNormalStr(teacher.full_name) === toNormalStr(teacherName),
  );
  const { user, setCurrentTeacherId } = useAuth();
  const { lessons } = useLessons(currentTeacher?.id);

  const { noUserError, setSelectedSlot, dialogRef, selectedSlot, closeDialog } =
    useBookings();
  const { cancelBooking } = useCancelBooking();
  const { deleteSlot } = useDeleteSlot();
  const { data: bookedSlots } = useBookedSlots();

  const navigate = useNavigate();
  const now = dayjs().format("YYYY-MM-DD HH:mm");

  if (!lessons) return <p>waiting for lessons to load...</p>;

  // Get current students name to show in pop up
  const currentBookedSlot = bookedSlots?.find(
    (slot) => slot?.slot_id === selectedSlot,
  );

  const currentDay = dayId?.slice(-10);
  const formatedCurrentDay = dayjs(currentDay).format("MMMM D");

  const dialogData = {
    delete: {
      h2: "Delete lesson",
      popUpMessage: `Do you really want to delete lesson from ${formatedCurrentDay}?`,
      btnText: "delete",
    },
    chat: {
      // h2: "Connect with " + currentUserName,
      h2: "Open chat",
      popUpMessage:
        "If you want to make changes to the booking you can start a discussion",
      btnText: "open discussion",
    },
    cancel: {
      h2: `Cancel your lesson on ${formatedCurrentDay}`,
      popUpMessage: "By proceeding you cancel your booking",
      btnText: "cancel booking",
    },
  };

  const currentSlots = lessons
    .filter((slot) =>
      dayjs(now).add(5, "minute").isAfter(slot.start_time) ? null : slot,
    )
    .filter((slot) => slot.start_time.substring(0, 10) === currentDay)
    .sort(
      (a, b) =>
        dayjs.utc(a.start_time).valueOf() - dayjs.utc(b.start_time).valueOf(),
    );

  const teacherId = currentSlots[0].user_id;

  const slot = currentSlots.find((slot) => slot?.id === selectedSlot);

  // Open dialog window
  function openDialog(slotId: string) {
    dialogRef?.current?.showModal();
    setSelectedSlot(slotId);
  }

  // handle current lesson slot
  function handleDialog() {
    if (!selectedSlot) return;

    // Depending on dialogState status open a chat room for discussions, cancellation window or deletion window
    if (dialogState === "chat") {
      navigate(`/teacher/${teacherName}/chat-room/${slot.id}`);
    } else if (dialogState === "cancel") {
      cancelBooking({ bookingId: currentBookedSlot?.id });
    } else {
      deleteSlot({ userId: user?.id, slotId: slot.id });
    }

    closeDialog();
  }

  return (
    <section className="flex justify-center w-full px-4 py-6">
      <div className="w-[50%] relative max-[600px]:w-[90%] max-[400px]:w-full">
        <div className="bg-jet/20 max-w-fit px-2 rounded-lg hover:bg-jet/10">
          <ArrowLeft
            style={{
              alignSelf: "start",
              marginBottom: "16px",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/teacher/${teacherName}`)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2>Book lessons on {formatedCurrentDay}</h2>
          <p className="font-semibold">Available time slots</p>
          {currentSlots!.length > 0 ? (
            currentSlots?.map((slot) => {
              return (
                <DayWithSlots
                  slot={slot}
                  openDialog={openDialog}
                  setDialogState={setDialogState}
                  teacherId={slot.user_id}
                  key={slot.id}
                />
              );
            })
          ) : (
            <div className="text-xl">All lessons have expired</div>
          )}

          {noUserError && (
            <p>
              Please{" "}
              <Link
                to={`/login`}
                className="text-blue-800"
                onClick={() => setCurrentTeacherId(teacherId)}
              >
                login
              </Link>{" "}
              or{" "}
              <Link
                to={`/signup`}
                className="text-blue-800"
                onClick={() => setCurrentTeacherId(teacherId)}
              >
                sign up
              </Link>{" "}
              to continue with booking
            </p>
          )}
        </div>
        <PopUpDialog
          h2={dialogData[dialogState].h2}
          popUpMessage={dialogData[dialogState].popUpMessage}
          btnText={dialogData[dialogState].btnText}
          fn={() => handleDialog()}
        />
      </div>
    </section>
  );
}
