import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useLessons } from "../../api/features/useLessons";
import { useBookings } from "../../contexts/useBookings";
import PopUpDialog from "./ui/PopUpDialog";
import { useBookedSlots } from "../../api/features/useBookedSlots";
import { useAuth } from "../../contexts/useAuth";
import { useState } from "react";
import { useCancelBooking } from "./features/useCancelBooking";
import { useDeleteSlot } from "./features/useDeleteSlot";
import BackButton from "../../ui/BackButton";
import AvailableSlots from "./ui/AvailableSlots";

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
  const { cancelBooking } = useCancelBooking();
  const { deleteSlot } = useDeleteSlot();
  const { data: bookedSlots } = useBookedSlots();

  const { dayId, teacherName, teacherId } = useParams();

  const [dialogState, setDialogState] =
    useState<keyof DialogStateProps>("chat");

  const { user, setCurrentTeacherId } = useAuth();
  const { lessons } = useLessons(teacherId);

  const { setSelectedSlot, dialogRef, selectedSlot, closeDialog } =
    useBookings();

  const navigate = useNavigate();
  const now = dayjs().format("YYYY-MM-DD HH:mm");

  if (!lessons) return <p>waiting for lessons to load...</p>;

  // Get current students name to show in pop up
  const currentBookedSlot = bookedSlots?.find(
    (slot) => slot?.slot_id === selectedSlot,
  );
  const formatedCurrentDay = dayjs(dayId).format("MMMM D");

  const dialogData = {
    delete: {
      h2: "Delete lesson",
      popUpMessage: `Do you really want to delete lesson from ${formatedCurrentDay}?`,
      btnText: "delete",
    },
    chat: {
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
    .filter((slot) => slot.start_time.substring(0, 10) === dayId)
    .sort(
      (a, b) =>
        dayjs.utc(a.start_time).valueOf() - dayjs.utc(b.start_time).valueOf(),
    );

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
      navigate(`/chat-room/${slot.id}`);
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
        <BackButton teacherName={teacherName} />
        <AvailableSlots
          openDialog={openDialog}
          setCurrentTeacherId={setCurrentTeacherId}
          setDialogState={setDialogState}
          slots={currentSlots}
        />
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
