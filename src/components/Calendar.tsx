import { useNavigate } from "react-router-dom";
// import { sendEmail } from "../api/emails/useResendEmail";
import MonthsSlider from "./calendarComponents/MonthsSlider";
import ShowCurrentMonth from "./calendarComponents/ShowCurrentMonth";
import ShowNextMonth from "./calendarComponents/ShowNextMonth";
import ShowPreviousMonth from "./calendarComponents/ShowPreviousMonth";
import WeekDays from "./calendarComponents/WeekDays";
import useProfile from "../api/features/useProfile";
import { useAuth } from "../contexts/useAuth";
import { toParamStr } from "../helpers/features";

export default function Calendar({
  teacherId,
}: {
  teacherId: string | undefined;
}) {
  const { canEditProfile, user } = useAuth();
  const { profile } = useProfile();

  const navigate = useNavigate();

  if (!profile) return <p>Waiting for profile to load...</p>;

  return (
    <div
      id="calendar"
      className="bg-jade text-jet text-center w-full px-10 pt-6 pb-15"
    >
      <MonthsSlider />
      <WeekDays />
      <div className="calendar-grid">
        <ShowPreviousMonth />
        <ShowCurrentMonth />
        <ShowNextMonth />
      </div>
      {canEditProfile(teacherId) && (
        <button
          onClick={() =>
            navigate(`/teacher/${toParamStr(profile?.full_name)}/planner`)
          }
        >
          plan your lessons
        </button>
      )}
      {!user && (
        <p>"You are not logged in, please log in to book your lessons!"</p>
      )}
    </div>
  );
}

{
  /* <button onClick={handleSendEmail}>send email</button> */
}
