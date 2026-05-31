import { useAuth } from "../../contexts/useAuth";
import EditPersonalInfo from "./features/EditPersonalInfo";
import { toParamStr } from "../../helpers/features";
import { useNavigate } from "react-router-dom";
import type { DialogStateProps } from "../calendarComponents/CheckTimeSlots";
import { useBookings } from "../../contexts/useBookings";
import useBookedSlots from "../../api/features/useBookedSlots";
import { useCancelBooking } from "../calendarComponents/features/useCancelBooking";
import PopUpDialog from "../calendarComponents/ui/PopUpDialog";
import { rawDialogData } from "../../helpers/variables";
import { useProfileById } from "../../api/features/useProfileById";
import dayjs from "dayjs";
import LessonsSection from "./LessonsSection";
import ProfileSection from "./ProfileSection";

export default function StudentDashboard() {
  const { loading } = useAuth();

  const { closeDialog, dialogConfig, dialogFormRef } = useBookings();
  const { cancelBooking } = useCancelBooking();
  const { bookedSlots } = useBookedSlots();

  const navigate = useNavigate();

  const currentBookedSlot = bookedSlots?.find(
    (slot) => slot?.slot_id === dialogConfig?.lessonId,
  );

  const { teacher: currentTeacher } = useProfileById(
    currentBookedSlot?.user_id,
  );

  if (loading) return <p>loading student's data...</p>;

  const formattedCurrentDay = dayjs(currentBookedSlot?.start_time).format(
    "MMMM DD",
  );

  const dialogData: DialogStateProps = {
    ...rawDialogData,
    cancel: {
      ...rawDialogData.cancel,
      h2: `Cancel your lesson on ${formattedCurrentDay}`,
    },
  };

  function handleDialog() {
    if (!dialogConfig) return;

    if (dialogConfig.type === "chat") {
      navigate(
        `/teacher/${toParamStr(currentTeacher?.full_name)}/chat-room/${dialogConfig.lessonId}`,
      );
    }

    if (dialogConfig.type === "cancel") {
      cancelBooking({
        bookingId: currentBookedSlot?.id,
      });
    }

    closeDialog();
  }

  return (
    <>
      <ProfileSection />
      <LessonsSection />
      <EditPersonalInfo dialogFormRef={dialogFormRef} />

      <PopUpDialog
        h2={dialogData[dialogConfig?.type || "chat"]?.h2}
        popUpMessage={dialogData[dialogConfig?.type || "chat"]?.popUpMessage}
        btnText={dialogData[dialogConfig?.type || "chat"]?.btnText}
        fn={handleDialog}
      />
    </>
  );
}
