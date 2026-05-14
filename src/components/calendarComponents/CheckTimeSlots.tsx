import { Link, useNavigate, useParams } from "react-router-dom";
import DayWithSlots from "./DayWithSlots";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ArrowLeft } from "react-bootstrap-icons";
import { useLessons } from "../../api/features/useLessons";
import { useBookings } from "../../contexts/useBookings";
import PopUpDialog from "./ui/PopUpDialog";
import useBookedSlots from "../../api/features/useBookedSlots";
import { useAuth } from "../../contexts/useAuth";
import useProfile from "../../api/features/useProfile";
import { toParamStr } from "../../helpers/features";

dayjs.extend(utc);

export default function CheckTimeSlots() {
  const { profile } = useProfile();
  const { isStudent } = useAuth();
  const { lessons } = useLessons();
  const { noUserError, setSelectedSlot, dialogRef, selectedSlot, closeDialog } =
    useBookings();
  const { bookedSlots } = useBookedSlots();
  const { dayId, teacherName } = useParams();
  const navigate = useNavigate();
  const now = dayjs().format("YYYY-MM-DD HH:mm");

  if (!lessons) return <p>waiting for lessons to load...</p>;

  const currentDay = dayId?.slice(-10);
  const formatedCurrentDay = dayjs(currentDay).format("MMMM D");

  const currentSlots = lessons
    .filter((slot) =>
      dayjs(now).add(5, "minute").isAfter(slot.start_time) ? null : slot,
    )
    .filter((slot) => slot.start_time.substring(0, 10) === currentDay)
    .sort(
      (a, b) =>
        Number(dayjs.utc(a.start_time).format("HH")) -
        Number(dayjs.utc(b.start_time).format("HH")),
    );

  const slot = currentSlots.find((slot) => slot?.id === selectedSlot);

  // Get current students name to show in pop up
  const currentStudent = bookedSlots?.find(
    (slot) => slot?.slot_id === selectedSlot,
  );
  const studentsName = currentStudent?.full_name;

  const currentUserName = isStudent ? teacherName : studentsName;
  // console.log(currentUserName);

  // Get the lesson slot status to show correct pop up
  const bookedSlot = () => {
    return slot?.status === "booked";
  };

  // Open dialog window
  function openDialog(slotId: string) {
    dialogRef?.current?.showModal();
    setSelectedSlot(slotId);
  }

  // handle current lesson slot
  function handleDelete() {
    if (!selectedSlot) return;

    // Depending on lesson slot status open a chat room for discussions, or deleting it
    if (bookedSlot()) {
      navigate(
        `/teacher/${toParamStr(profile?.full_name)}/chat-room/${slot.id}`,
      );
    } else {
      console.log("slot was not deleted, it is just a test");
    }

    // deleteSlot(selectedSlot.id); // your API call
    closeDialog();
  }

  return (
    <div className="w-[50%] relative">
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
          currentSlots?.map((slot) => (
            <DayWithSlots slot={slot} openDialog={openDialog} key={slot.id} />
          ))
        ) : (
          <div className="text-xl">All lessons have expired</div>
        )}

        {noUserError && (
          <p>
            Please{" "}
            <Link to={"/login"} className="text-blue-800">
              login
            </Link>{" "}
            or{" "}
            <Link to={"/signup"} className="text-blue-800">
              sign up
            </Link>{" "}
            to continue with booking
          </p>
        )}
      </div>
      <PopUpDialog
        h2={`${bookedSlot() ? "Connect with " + currentUserName : "Delete lesson"}`}
        popUpMessage={`${bookedSlot() ? "If you want to make changes to the booking you can start a discussion" : "Do you really want to delete lesson from 07:00 - 08:00?"}`}
        btnText={`${bookedSlot() ? "open discussion" : "delete"}`}
        fn={() => handleDelete()}
      />
    </div>
  );
}
