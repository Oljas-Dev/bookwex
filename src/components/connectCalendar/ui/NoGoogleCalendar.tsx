import { supabase } from "../../../api/supabase/supabase";
import Button from "../../../ui/Button";
import googleIcon from "./../../../assets/google-icon.png";

export default function NoGoogleCalendar() {
  async function googleCal() {
    const { data, error } = await supabase.functions.invoke("google-auth");

    if (error) {
      console.error(error);
      return;
    }

    window.location.href = data.url;
  }
  return (
    <div className="flex flex-col gap-4 [&_p]:text-lg">
      <h2>Connect to your Google calendar and stay synchronized</h2>
      <div className="pl-8">
        <p>Your Google Calendar is not connected yet.</p>
        <p>
          To connect your calendar just click the button below and allow Bookwex
          to synchronize with Google Calendar.
        </p>
      </div>

      <Button fn={googleCal} styles="flex gap-2 items-center w-fit">
        connect
        <img src={googleIcon} alt="google icon" /> calendar
      </Button>
    </div>
  );
}
