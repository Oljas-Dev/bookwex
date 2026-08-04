import { googleCalendarConnected } from "../../../api/emails/googleCalendarConnected";
import { supabase } from "../../../api/supabase/supabase";
import Button from "../../../ui/Button";

export default function NoGoogleCalendar({
  teacherEmail,
}: {
  teacherEmail: string | undefined;
}) {
  async function googleCal() {
    const { data, error } = await supabase.functions.invoke("google-auth");

    if (error) {
      console.error(error);
      return;
    }

    await googleCalendarConnected({
      teacherEmail,
    });
    window.location.href = data.url;
  }

  return (
    <div className="flex flex-col gap-4 [&_p]:text-lg">
      <h2>Connect your Google Calendar and stay synchronized</h2>

      <div className="pl-8 flex flex-col gap-3">
        <p>Your Google Calendar is not connected yet.</p>

        <p>
          Connect your calendar to let Bookwex synchronize your availability,
          help prevent double bookings, and add your Bookwex lessons to your
          Google Calendar.
        </p>

        <p>
          Bookwex only accesses calendar information necessary for scheduling
          features. Your calendar data is not used for advertising or shared
          with third parties.
        </p>

        <p>
          You can disconnect Google Calendar at any time from your profile
          settings.
        </p>
      </div>

      <Button fn={googleCal} styles="flex gap-2 items-center w-fit">
        connect Google calendar
      </Button>
    </div>
  );
}
