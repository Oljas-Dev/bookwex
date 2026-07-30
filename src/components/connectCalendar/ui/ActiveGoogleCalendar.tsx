import { supabase } from "../../../api/supabase/supabase";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { formatLessonDate } from "../../../helpers/features";
import { useAuth } from "../../../contexts/useAuth";
import Button from "../../../ui/Button";

import googleIcon from "./../../../assets/google-icon.png";
import { useNavigate } from "react-router-dom";

export default function ActiveGoogleCalendar({
  syncDate,
}: {
  syncDate: string;
}) {
  const { profile } = useAuth();

  const navigate = useNavigate();

  const formatedSyncDate = syncDate
    ? dayjs(syncDate).format("DD.MM.YYYY")
    : "no sync yet";

  const formatedSyncTime = syncDate
    ? `at ${formatLessonDate(syncDate, profile?.timezone, "HH:mm")}`
    : "";

  async function disconnectGoogle() {
    const confirmed = window.confirm(
      "Disconnect Google Calendar? Your synchronized busy times will be removed.",
    );

    if (!confirmed) return;

    try {
      const { data, error } =
        await supabase.functions.invoke("google-disconnect");

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data?.success) {
        toast.success(data.message ?? "Google Calendar disconnected");
        navigate("/profile");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to disconnect Google Calendar",
      );
    }
  }

  return (
    <div className="flex flex-col gap-4 [&_p]:text-lg">
      <h2>Your calendars are synchronized 👍</h2>
      <div className="pl-8">
        <p>Your Google Calendar is connected 🟢</p>
        <p>
          Last time synchronized {formatedSyncDate} {formatedSyncTime}
        </p>
      </div>

      <Button fn={disconnectGoogle} styles="flex gap-2 items-center w-fit">
        disconnect
        <img src={googleIcon} alt="google icon" /> calendar
      </Button>
    </div>
  );
}
