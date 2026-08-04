import { supabase } from "../../../api/supabase/supabase";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { formatLessonDate } from "../../../helpers/features";
import Button from "../../../ui/Button";

import { useNavigate } from "react-router-dom";
import { googleCalendarDisconnected } from "../../../api/emails/googleCalendarDisconnected";
import type { ProfileType } from "../../../contexts/AuthContextData";

export default function ActiveGoogleCalendar({
  syncDate,
  profile,
}: {
  syncDate: string;
  profile: ProfileType | null;
}) {
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
        await googleCalendarDisconnected({
          teacherEmail: profile?.email,
        });

        toast.success(
          data.message ??
            "Google Calendar disconnected, confirmation email has been sent",
        );
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
      <h2>Your Google Calendar is synchronized 👍</h2>

      <div className="pl-8 flex flex-col gap-3">
        <p>Your Google Calendar is connected 🟢</p>

        <p>
          Bookwex uses your calendar connection to synchronize availability,
          prevent double bookings, and add your Bookwex lessons to your
          calendar.
        </p>

        <p>
          Last synchronization: {formatedSyncDate} {formatedSyncTime}
        </p>

        <p>
          You can disconnect Google Calendar anytime. After disconnecting,
          synchronization will stop and your calendar connection data will be
          removed.
        </p>
      </div>

      <Button fn={disconnectGoogle} styles="flex gap-2 items-center w-fit">
        Disconnect Google calendar
      </Button>
    </div>
  );
}
